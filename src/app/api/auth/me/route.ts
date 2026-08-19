import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
      },
    });

    const organization = await prisma.organization.findUnique({
      where: { id: session.organizationId },
      include: {
        instagramAccounts: {
          select: {
            id: true,
            username: true,
            status: true,
            followersCount: true,
          },
        },
        subscriptions: {
          select: {
            plan: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({
      authenticated: true,
      user,
      organization,
      session,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}
