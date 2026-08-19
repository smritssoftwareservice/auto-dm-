import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  try {
    const conversations = await prisma.conversation.findMany({
      where: { organizationId: session.organizationId },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' },
        },
        lead: true,
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    return NextResponse.json({ conversations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch conversations' }, { status: 500 });
  }
}
