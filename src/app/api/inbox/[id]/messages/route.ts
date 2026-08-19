import { NextRequest, NextResponse } from 'next/server';
import { requireAuthContext } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { checkEntitlement, recordUsageEvent } from '@/lib/subscriptions/entitlements';
import { sendInstagramDM } from '@/lib/meta/instagram';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, errorResponse } = await requireAuthContext(req);
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await req.json();
  const { text, aiMode } = body;

  try {
    // Ensure conversation belongs to authenticated user's organization
    const conversation = await prisma.conversation.findFirst({
      where: { id, organizationId: session.organizationId },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found or unauthorized' }, { status: 404 });
    }

    // Toggle AI mode if requested
    if (aiMode) {
      const updatedConv = await prisma.conversation.update({
        where: { id },
        data: { aiMode },
      });
      return NextResponse.json({ success: true, conversation: updatedConv });
    }

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    // Check message entitlement
    const entitlement = await checkEntitlement(session.organizationId, 'MESSAGES');
    if (!entitlement.allowed) {
      return NextResponse.json({ error: entitlement.error }, { status: 403 });
    }

    // Create message in database
    const message = await prisma.message.create({
      data: {
        conversationId: id,
        sender: 'HUMAN_AGENT',
        text,
        delivered: true,
      },
    });

    // Update conversation last message timestamp
    await prisma.conversation.update({
      where: { id },
      data: {
        lastMessageText: text,
        lastMessageAt: new Date(),
        status: 'ACTIVE',
      },
    });

    // Send real Instagram DM if Instagram account access token is available
    const igAccount = await prisma.instagramAccount.findFirst({
      where: { organizationId: session.organizationId, status: 'CONNECTED' },
    });

    if (igAccount?.accessTokenEncrypted && igAccount?.instagramUserId) {
      await sendInstagramDM({
        recipientId: conversation.instagramUsername,
        messageText: text,
        accessToken: igAccount.accessTokenEncrypted,
      });
    }

    // Record usage
    await recordUsageEvent(session.organizationId, 'INSTAGRAM_DM_SENT', 1);

    return NextResponse.json({ success: true, message });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to send message' }, { status: 500 });
  }
}
