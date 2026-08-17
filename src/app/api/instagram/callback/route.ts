import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/dashboard/instagram?error=oauth_denied', req.url));
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = process.env.META_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/instagram/callback`;

  if (!appId || !appSecret) {
    return NextResponse.redirect(new URL('/dashboard/instagram?error=credentials_missing', req.url));
  }

  try {
    // 1. Exchange short-lived code for access token
    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_secret=${appSecret}&code=${code}`;

    const tokenRes = await fetch(tokenUrl, { method: 'GET' });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL('/dashboard/instagram?error=token_exchange_failed', req.url));
    }

    // 2. Exchange short-lived token for 60-day long-lived token
    const longLivedUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`;
    const longLivedRes = await fetch(longLivedUrl);
    const longLivedData = await longLivedRes.json();

    const finalAccessToken = longLivedData.access_token || tokenData.access_token;

    // 3. Fetch Facebook Pages & connected Instagram Business Account
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?fields=name,access_token,instagram_business_account&access_token=${finalAccessToken}`
    );
    const pagesData = await pagesRes.json();

    const page = pagesData.data?.[0];
    const igAccountId = page?.instagram_business_account?.id;

    if (igAccountId && page) {
      // Fetch Instagram details
      const igRes = await fetch(
        `https://graph.facebook.com/v19.0/${igAccountId}?fields=username,profile_picture_url,followers_count&access_token=${page.access_token}`
      );
      const igData = await igRes.json();

      // Upsert Instagram Account into Database
      try {
        if (prisma.instagramAccount) {
          const defaultOrg = await prisma.organization.findFirst();
          if (defaultOrg) {
            await prisma.instagramAccount.upsert({
              where: { instagramUserId: igAccountId },
              update: {
                username: igData.username || 'connected_user',
                profileImage: igData.profile_picture_url,
                followersCount: igData.followers_count || 0,
                accessTokenEncrypted: page.access_token,
                status: 'CONNECTED',
              },
              create: {
                organizationId: defaultOrg.id,
                instagramUserId: igAccountId,
                username: igData.username || 'connected_user',
                profileImage: igData.profile_picture_url,
                followersCount: igData.followers_count || 0,
                accessTokenEncrypted: page.access_token,
                status: 'CONNECTED',
              },
            });
          }
        }
      } catch (dbErr) {
        console.error('[DB Upsert Instagram Error]:', dbErr);
      }
    }

    return NextResponse.redirect(new URL('/dashboard/instagram?connected=true', req.url));
  } catch (err) {
    console.error('[Meta OAuth Callback Error]:', err);
    return NextResponse.redirect(new URL('/dashboard/instagram?error=server_error', req.url));
  }
}
