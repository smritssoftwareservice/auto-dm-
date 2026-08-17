import crypto from 'crypto';

export interface MetaSendDMOptions {
  recipientId: string;
  messageText: string;
  accessToken: string;
  buttons?: Array<{
    type: 'web_url' | 'postback';
    title: string;
    url?: string;
    payload?: string;
  }>;
}

export interface MetaReplyCommentOptions {
  commentId: string;
  replyText: string;
  accessToken: string;
}

/**
 * Validates incoming Meta Webhook X-Hub-Signature-256 header using HMAC-SHA256
 */
export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string
): boolean {
  if (!signatureHeader || !appSecret) return true; // Skip validation if secret is not set in dev

  const [algorithm, signature] = signatureHeader.split('=');
  if (algorithm !== 'sha256' || !signature) return false;

  const hmac = crypto.createHmac('sha256', appSecret);
  const digest = hmac.update(rawBody, 'utf8').digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

/**
 * Sends a Direct Message (DM) to an Instagram user via Meta Graph API v19.0
 */
export async function sendInstagramDM(options: MetaSendDMOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { recipientId, messageText, accessToken, buttons } = options;

  if (!accessToken) {
    return { success: false, error: 'Missing Meta Page Access Token' };
  }

  try {
    let messagePayload: any = { text: messageText };

    // If interactive CTA buttons are attached
    if (buttons && buttons.length > 0) {
      messagePayload = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: messageText,
            buttons: buttons.map(b => ({
              type: b.type,
              title: b.title,
              url: b.url,
              payload: b.payload,
            })),
          },
        },
      };
    }

    const res = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: messagePayload,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error('[Meta API DM Error]:', data.error);
      return { success: false, error: data.error?.message || 'Meta API DM call failed' };
    }

    return { success: true, messageId: data.message_id };
  } catch (err: any) {
    console.error('[Meta Network Exception]:', err);
    return { success: false, error: err?.message || 'Network exception while sending Instagram DM' };
  }
}

/**
 * Posts a public comment reply under an Instagram post comment via Meta Graph API v19.0
 */
export async function replyToInstagramComment(options: MetaReplyCommentOptions): Promise<{ success: boolean; commentId?: string; error?: string }> {
  const { commentId, replyText, accessToken } = options;

  if (!accessToken || !commentId) {
    return { success: false, error: 'Missing commentId or accessToken' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${encodeURIComponent(commentId)}/replies?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: replyText,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error('[Meta Comment Reply Error]:', data.error);
      return { success: false, error: data.error?.message || 'Failed to post public comment reply' };
    }

    return { success: true, commentId: data.id };
  } catch (err: any) {
    console.error('[Meta Comment Network Error]:', err);
    return { success: false, error: err?.message || 'Network exception replying to comment' };
  }
}
