import { NextRequest, NextResponse } from 'next/server';
import { processInstagramTriggerEvent } from '@/lib/automations/engine';
import { prisma } from '@/lib/prisma';
import { verifyMetaSignature, sendInstagramDM, replyToInstagramComment } from '@/lib/meta/instagram';
import { checkEntitlement, recordUsageEvent } from '@/lib/subscriptions/entitlements';

const FALLBACK_PAGE_TOKEN = 'EAAXgkvxMVMkBSZAXdZCtFSkd5oXmlFZAF3s3euMRuqZC8k43FOxyApkLqtPgv3nr8mvcWnHw6PWIhtRZCplcZCd7aIFRBGaK22CONaBdET6k2rvmn4aUxjSIho9jn0kmxiECyBSpMfzCT7ylA8ItvROi1jRTZC4SCMyqLBKlgr2ZBW7YjjGCtdZCPOTSgW8zdsHY9KXV7G4qiyBtGp41y9cE0gI5ZCrEK9rrAQWTnTkZBd5Dml7LqDS5pWz3fVZAWppCZBCPV9SfsFWwBbDWs3j5vZBEZAAf4ec';

// GET - Meta Webhook Handshake / Verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = 
    process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 
    process.env.META_WEBHOOK_VERIFY_TOKEN || 
    'dmflow_webhook_verify_token_123';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Meta Instagram Webhook Verification Success]');
    return new NextResponse(challenge || '', { 
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.json({ error: 'Verification token mismatch' }, { status: 403 });
}

// POST - Meta Live Webhook Event Notification (Incoming DM / Comment / Mention)
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const appSecret = process.env.META_APP_SECRET || '';

    // 1. Verify HMAC Signature (if Meta App Secret is configured)
    if (appSecret && !verifyMetaSignature(rawBody, signature, appSecret)) {
      console.warn('[Meta Webhook Signature Verification Failed]');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody || '{}');

    // 2. Process Meta Instagram Messenger & Comments
    if (body.object === 'instagram' || body.object === 'page') {
      for (const entry of body.entry || []) {
        const entryIgId = entry.id;

        // Resolve Organization from connected Instagram Account in database
        let targetOrgId = 'default_org';
        let accessTokenEncrypted: string | null = null;

        if (entryIgId) {
          const igAccount = await prisma.instagramAccount.findFirst({
            where: { instagramUserId: entryIgId, status: 'CONNECTED' },
            include: { organization: true },
          });

          if (igAccount) {
            targetOrgId = igAccount.organizationId;
            accessTokenEncrypted = igAccount.accessTokenEncrypted;
          } else {
            const firstOrg = await prisma.organization.findFirst();
            if (firstOrg) targetOrgId = firstOrg.id;
          }
        }

        // Handle DM Events
        if (entry.messaging) {
          for (const msgEvent of entry.messaging) {
            const eventId = msgEvent.message?.mid || `${msgEvent.sender?.id}_${msgEvent.timestamp}`;

            // Database Idempotency Check
            try {
              const existingEvent = await prisma.webhookEvent.findUnique({
                where: { eventId },
              });

              if (existingEvent) {
                console.log(`[Meta Webhook] Idempotent skip for duplicate eventId: ${eventId}`);
                continue;
              }

              await prisma.webhookEvent.create({
                data: {
                  eventId,
                  provider: 'instagram',
                  type: 'INSTAGRAM_DM',
                  payload: JSON.stringify(msgEvent),
                  status: 'PROCESSED',
                },
              });
            } catch {
              // Ignore DB constraint race condition
            }

            const senderId = msgEvent.sender?.id;
            const messageText = msgEvent.message?.text || '';

            if (senderId && messageText) {
              const entitlement = await checkEntitlement(targetOrgId, 'MESSAGES');
              if (!entitlement.allowed) {
                console.warn(`[Meta Webhook] Entitlement check failed for org ${targetOrgId}: ${entitlement.error}`);
                continue;
              }

              const result = await processInstagramTriggerEvent({
                organizationId: targetOrgId,
                instagramUsername: `user_${senderId.slice(-4)}`,
                triggerType: 'INSTAGRAM_DM_KEYWORD',
                keyword: messageText.split(' ')[0] || messageText,
                userText: messageText,
              });

              // Must use a Page Access Token, NOT an App Secret
              const accessToken = accessTokenEncrypted || process.env.META_PAGE_ACCESS_TOKEN || FALLBACK_PAGE_TOKEN;
              if (accessToken && result.sentMessageText) {
                await sendInstagramDM({
                  recipientId: senderId,
                  messageText: result.sentMessageText,
                  accessToken,
                });

                await recordUsageEvent(targetOrgId, 'INSTAGRAM_DM_SENT', 1);
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
                const eventId = `comment_${commentId}`;

                try {
                  const existingEvent = await prisma.webhookEvent.findUnique({ where: { eventId } });
                  if (existingEvent) continue;

                  await prisma.webhookEvent.create({
                    data: {
                      eventId,
                      provider: 'instagram',
                      type: 'INSTAGRAM_COMMENT',
                      payload: JSON.stringify(change.value),
                      status: 'PROCESSED',
                    },
                  });
                } catch {
                  // Ignore race
                }

                const entitlement = await checkEntitlement(targetOrgId, 'MESSAGES');
                if (!entitlement.allowed) continue;

                const result = await processInstagramTriggerEvent({
                  organizationId: targetOrgId,
                  instagramUsername: fromUsername,
                  triggerType: 'INSTAGRAM_COMMENT_KEYWORD',
                  keyword: commentText.split(' ')[0] || commentText,
                  userText: commentText,
                  commentId,
                });

                const accessToken = accessTokenEncrypted || process.env.META_PAGE_ACCESS_TOKEN || FALLBACK_PAGE_TOKEN;
                if (accessToken && result.sentMessageText) {
                  await replyToInstagramComment({
                    commentId,
                    replyText: result.sentMessageText,
                    accessToken,
                  });

                  await recordUsageEvent(targetOrgId, 'INSTAGRAM_COMMENT_REPLY', 1);
                }
              }
            }
          }
        }
      }
    }

    return new NextResponse('EVENT_RECEIVED', { status: 200 });
  } catch (error: any) {
    console.error('[Meta Production Webhook Error]:', error);
    try {
      await prisma.errorLog.create({
        data: {
          route: '/api/webhooks/instagram',
          error: error.message || 'Webhook processing failed',
          stack: error.stack,
        },
      });
    } catch {
      // Ignore DB error
    }

    return new NextResponse('EVENT_RECEIVED', { status: 200 });
  }
}
