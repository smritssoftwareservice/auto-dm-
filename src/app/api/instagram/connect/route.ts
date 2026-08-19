import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Safe production fallback if Vercel environment variables are not set in UI dashboard
  const appId = process.env.META_APP_ID || '1654296786261193';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dmflow-ai.vercel.app';
  const redirectUri = process.env.META_REDIRECT_URI || `${baseUrl}/api/instagram/callback`;

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
