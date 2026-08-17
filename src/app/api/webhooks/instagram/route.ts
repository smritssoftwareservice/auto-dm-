import { NextRequest, NextResponse } from 'next/server';
import { processInstagramTriggerEvent } from '@/lib/automations/engine';
import { prisma } from '@/lib/prisma';
import { verifyMetaSignature, sendInstagramDM, replyToInstagramComment } from '@/lib/meta/instagram';

// In-memory idempotency cache to prevent processing duplicate Meta webhook deliveries
const processedEventIds = new Set<string>();

// GET - Meta Webhook Handshake / Verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'dmflow_webhook_verify_token_123';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Meta Webhook Verification Success]');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification token mismatch' }, { status: 403 });
}

// POST - Meta Live Webhook Event Notification (Incoming DM / Comment / Mention)
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const appSecret = process.env.META_APP_SECRET || '';

    // 1. Verify HMAC Signature
    if (appSecret && !verifyMetaSignature(rawBody, signature, appSecret)) {
      console.warn('[Meta Webhook Signature Verification Failed]');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    // 2. Process Meta Instagram Messenger & Comments
    if (body.object === 'instagram' || body.object === 'page') {
      for (const entry of body.entry || []) {
        // Handle DM Events
        if (entry.messaging) {
          for (const msgEvent of entry.messaging) {
            const eventId = msgEvent.message?.mid || `${msgEvent.sender?.id}_${msgEvent.timestamp}`;
            
            // Idempotency check
            if (processedEventIds.has(eventId)) {
              continue;
            }
            processedEventIds.add(eventId);

            // Keep cache size bounded
            if (processedEventIds.size > 2000) {
              const first = processedEventIds.values().next().value;
              if (first) processedEventIds.delete(first);
            }

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

              // Dispatch real Instagram Graph API DM
              const accessToken = process.env.META_PAGE_ACCESS_TOKEN || process.env.META_APP_SECRET;
              if (accessToken && result.sentMessageText) {
                await sendInstagramDM({
                  recipientId: senderId,
                  messageText: result.sentMessageText,
                  accessToken,
                });
              }
            }
          }
        }

        // Handle Comment Events
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === 'comments') {
              const commentId = change.value?.id;
              const commentText = change.value?.text || '';
              const fromUsername = change.value?.from?.username || 'ig_user';

              if (commentId && commentText) {
                const result = await processInstagramTriggerEvent({
                  organizationId: 'org_demo_123',
                  instagramUsername: fromUsername,
                  triggerType: 'INSTAGRAM_COMMENT_KEYWORD',
                  keyword: commentText.split(' ')[0] || commentText,
                  userText: commentText,
                  commentId,
                });

                // Reply publicly to Instagram Comment if configured
                const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
                if (accessToken && result.sentMessageText) {
                  await replyToInstagramComment({
                    commentId,
                    replyText: result.sentMessageText,
                    accessToken,
                  });
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'EVENT_PROCESSED' }, { status: 200 });
  } catch (error) {
    console.error('[Meta Production Webhook Error]:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
