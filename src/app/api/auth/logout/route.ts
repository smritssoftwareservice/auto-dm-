import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  await clearSessionCookie();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
