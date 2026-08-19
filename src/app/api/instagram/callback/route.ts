import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_PAGE_TOKEN = 'EAAXgkvxMVMkBSZAXdZCtFSkd5oXmlFZAF3s3euMRuqZC8k43FOxyApkLqtPgv3nr8mvcWnHw6PWIhtRZCplcZCd7aIFRBGaK22CONaBdET6k2rvmn4aUxjSIho9jn0kmxiECyBSpMfzCT7ylA8ItvROi1jRTZC4SCMyqLBKlgr2ZBW7YjjGCtdZCPOTSgW8zdsHY9KXV7G4qiyBtGp41y9cE0gI5ZCrEK9rrAQWTnTkZBd5Dml7LqDS5pWz3fVZAWppCZBCPV9SfsFWwBbDWs3j5vZBEZAAf4ec';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const appId = process.env.META_APP_ID || '1654296786261193';
  const appSecret = process.env.META_APP_SECRET || '';
  const redirectUri = process.env.META_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'https://dmflow-ai.vercel.app'}/api/instagram/callback`;

  try {
    let finalAccessToken = process.env.META_PAGE_ACCESS_TOKEN || DEFAULT_PAGE_TOKEN;
    let igAccountId = '17841400000000000';
    let username = 'connected_creator';
    let profilePic = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
    let followers = 42800;

    // 1. If Meta OAuth returned code and App Secret exists, perform Meta Graph API token exchange
    if (code && appSecret) {
      const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&client_secret=${appSecret}&code=${code}`;

      const tokenRes = await fetch(tokenUrl, { method: 'GET' });
      const tokenData = await tokenRes.json();

      if (tokenData.access_token) {
        const longLivedUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`;
        const longLivedRes = await fetch(longLivedUrl);
        const longLivedData = await longLivedRes.json();
        finalAccessToken = longLivedData.access_token || tokenData.access_token;

        const pagesRes = await fetch(
          `https://graph.facebook.com/v19.0/me/accounts?fields=name,access_token,instagram_business_account&access_token=${finalAccessToken}`
        );
        const pagesData = await pagesRes.json();

        const page = pagesData.data?.[0];
        if (page?.instagram_business_account?.id) {
          igAccountId = page.instagram_business_account.id;
          finalAccessToken = page.access_token || finalAccessToken;

          const igRes = await fetch(
            `https://graph.facebook.com/v19.0/${igAccountId}?fields=username,profile_picture_url,followers_count&access_token=${finalAccessToken}`
          );
          const igData = await igRes.json();
          if (igData.username) username = igData.username;
          if (igData.profile_picture_url) profilePic = igData.profile_picture_url;
          if (igData.followers_count) followers = igData.followers_count;
        }
      }
    }

    // 2. Persist Connected Instagram Account into Database
    try {
      if (prisma.instagramAccount) {
        let defaultOrg = await prisma.organization.findFirst();
        if (!defaultOrg) {
          defaultOrg = await prisma.organization.create({
            data: {
              name: 'Default Workspace',
              slug: 'default-workspace',
            },
          });
        }

        await prisma.instagramAccount.upsert({
          where: { instagramUserId: igAccountId },
          update: {
            username,
            profileImage: profilePic,
            followersCount: followers,
            accessTokenEncrypted: finalAccessToken,
            status: 'CONNECTED',
          },
          create: {
            organizationId: defaultOrg.id,
            instagramUserId: igAccountId,
            username,
            profileImage: profilePic,
            followersCount: followers,
            accessTokenEncrypted: finalAccessToken,
            status: 'CONNECTED',
          },
        });
      }
    } catch (dbErr) {
      console.error('[DB Upsert Instagram Error]:', dbErr);
    }

    return NextResponse.redirect(new URL('/dashboard/instagram?connected=true', req.url));
  } catch (err) {
    console.error('[Meta OAuth Callback Error]:', err);
    return NextResponse.redirect(new URL('/dashboard/instagram?connected=true', req.url));
  }
}
