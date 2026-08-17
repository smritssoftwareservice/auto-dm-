import { NextRequest, NextResponse } from 'next/server';
import { processInstagramTriggerEvent } from '@/lib/automations/engine';
import { prisma } from '@/lib/prisma';

// GET - Meta Webhook Handshake / Verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'dmflow_webhook_verify_token_123';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Meta Webhook Verified Successfully]');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification token mismatch' }, { status: 403 });
}

// POST - Meta Live Webhook Event Notification (Incoming DM / Comment / Mention)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Log raw incoming event
    console.log('[Meta Instagram Event Received]:', JSON.stringify(body, null, 2));

    // Store raw webhook payload in database error/audit log if available
    try {
      if (prisma.webhookEvent) {
        await prisma.webhookEvent.create({
          data: {
            eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            provider: 'instagram',
            type: body.entry?.[0]?.messaging?.[0] ? 'INSTAGRAM_DM' : 'INSTAGRAM_COMMENT',
            payload: JSON.stringify(body),
            status: 'PROCESSED',
          },
        });
      }
    } catch {
      // Ignore DB error fallback for dev environment
    }

    // Process Meta Instagram Messenger Entry
    if (body.object === 'instagram' || body.object === 'page') {
      for (const entry of body.entry || []) {
        // Handle DM Events
        if (entry.messaging) {
          for (const msgEvent of entry.messaging) {
            const senderId = msgEvent.sender?.id;
            const messageText = msgEvent.message?.text || '';

            if (senderId && messageText) {
              const result = await processInstagramTriggerEvent({
                organizationId: 'org_demo_123',
                instagramUsername: `user_${senderId.slice(-4)}`,
                triggerType: 'INSTAGRAM_DM_KEYWORD',
                keyword: messageText.split(' ')[0] || messageText,
                userText: messageText,
              });

              // Send Real Instagram DM if Graph API Token is Configured
              const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
              if (pageAccessToken && result.sentMessageText) {
                await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    recipient: { id: senderId },
                    message: { text: result.sentMessageText },
                  }),
                });
              }
            }
          }
        }

        // Handle Comment Events
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === 'comments') {
              const commentText = change.value?.text || '';
              const fromUsername = change.value?.from?.username || 'ig_user';

              await processInstagramTriggerEvent({
                organizationId: 'org_demo_123',
                instagramUsername: fromUsername,
                triggerType: 'INSTAGRAM_COMMENT_KEYWORD',
                keyword: commentText.split(' ')[0] || commentText,
                userText: commentText,
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
  } catch (error) {
    console.error('[Meta Webhook Error]:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
