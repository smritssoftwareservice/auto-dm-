import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/instagram/callback`;

  if (!appId) {
    // If Meta App ID is not configured, redirect back with error status
    return NextResponse.redirect(new URL('/dashboard/instagram?error=missing_meta_app_id', req.url));
  }

  const scope = [
    'instagram_basic',
    'instagram_manage_messages',
    'pages_show_list',
    'pages_manage_metadata',
  ].join(',');

  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=code`;

  return NextResponse.redirect(authUrl);
}
