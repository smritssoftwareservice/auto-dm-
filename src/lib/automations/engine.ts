import { Automation, Conversation, Lead, Message } from '@/types';
import { DEMO_AUTOMATIONS, DEMO_CONVERSATIONS, DEMO_LEADS, DEMO_AI_CONFIG, DEMO_KNOWLEDGE_BASE } from '../mock-data';
import { getAIProvider } from '../ai';

export interface TriggerExecutionPayload {
  organizationId: string;
  instagramUsername: string;
  userAvatar?: string;
  triggerType: 'INSTAGRAM_COMMENT_KEYWORD' | 'INSTAGRAM_DM_KEYWORD';
  keyword: string;
  postId?: string;
  commentId?: string;
  userText?: string;
}

export interface TriggerExecutionResult {
  automationTriggered: boolean;
  automationId?: string;
  automationName?: string;
  matchedKeyword?: string;
  sentMessageText?: string;
  leadCreatedOrUpdated?: Lead;
  conversationUpdated?: Conversation;
  aiHandled: boolean;
  handoffTriggered: boolean;
}

export async function processInstagramTriggerEvent(
  payload: TriggerExecutionPayload
): Promise<TriggerExecutionResult> {
  const { keyword, instagramUsername, userText, triggerType } = payload;
  const normalizedKeyword = keyword.trim().toUpperCase();

  // 1. Find matching active automation
  const matchedAutomation = DEMO_AUTOMATIONS.find(a => 
    a.status === 'ACTIVE' && 
    a.triggerType === triggerType &&
    a.triggerKeyword?.toUpperCase() === normalizedKeyword
  );

  if (!matchedAutomation) {
    return {
      automationTriggered: false,
      aiHandled: false,
      handoffTriggered: false,
    };
  }

  // 2. Locate or initialize conversation
  let conv = DEMO_CONVERSATIONS.find(c => c.instagramUsername.toLowerCase() === instagramUsername.toLowerCase());
  
  if (!conv) {
    conv = {
      id: `conv_${Date.now()}`,
      organizationId: payload.organizationId,
      instagramUsername,
      userAvatar: payload.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      aiMode: 'ACTIVE',
      lastMessageText: userText || keyword,
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      messages: [],
    };
    DEMO_CONVERSATIONS.push(conv);
  }

  // 3. Record incoming message
  const userMsg: Message = {
    id: `m_${Date.now()}_in`,
    conversationId: conv.id,
    sender: 'INSTAGRAM_USER',
    text: userText || keyword,
    timestamp: new Date().toISOString(),
    delivered: true,
  };
  conv.messages.push(userMsg);

  // 4. Evaluate Automation Nodes
  let replyText = '';
  let leadScoreAdd = 20;
  let tagToAdd = 'Instagram Lead';
  let isAI = false;
  let handoff = false;

  const msgNode = matchedAutomation.nodes.find(n => n.type === 'message');
  if (msgNode?.data?.messageText) {
    replyText = msgNode.data.messageText.replace('{{first_name}}', instagramUsername.split('_')[0] || 'there');
  }

  const aiNode = matchedAutomation.nodes.find(n => n.type === 'ai_response');
  if (aiNode || !replyText) {
    isAI = true;
    const aiProvider = getAIProvider();
    const aiResult = await aiProvider.generateResponse({
      userMessage: userText || keyword,
      conversationHistory: conv.messages,
      aiConfig: DEMO_AI_CONFIG,
      knowledgeBase: DEMO_KNOWLEDGE_BASE,
    });
    replyText = aiResult.replyText;
    if (aiResult.leadScoreAdjustment) leadScoreAdd = aiResult.leadScoreAdjustment;
    if (aiResult.tagsToAdd?.[0]) tagToAdd = aiResult.tagsToAdd[0];
    if (aiResult.shouldHandoff) handoff = true;
  }

  // 5. Send automated reply
  const outMsg: Message = {
    id: `m_${Date.now()}_out`,
    conversationId: conv.id,
    sender: isAI ? 'AI_AGENT' : 'SYSTEM',
    text: replyText,
    timestamp: new Date().toISOString(),
    delivered: true,
  };
  conv.messages.push(outMsg);
  conv.lastMessageText = replyText;
  conv.lastMessageAt = new Date().toISOString();

  // 6. Update or Create Lead
  let lead = DEMO_LEADS.find(l => l.instagramUsername.toLowerCase() === instagramUsername.toLowerCase());
  if (!lead) {
    lead = {
      id: `lead_${Date.now()}`,
      organizationId: payload.organizationId,
      name: instagramUsername.replace('_', ' ').toUpperCase(),
      instagramUsername,
      status: 'NEW',
      leadScore: leadScoreAdd,
      tags: [tagToAdd, matchedAutomation.name],
      createdAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
    };
    DEMO_LEADS.push(lead);
    conv.leadId = lead.id;
  } else {
    lead.leadScore = Math.min(100, lead.leadScore + leadScoreAdd);
    if (!lead.tags.includes(tagToAdd)) lead.tags.push(tagToAdd);
    lead.lastInteractionAt = new Date().toISOString();
  }

  // Increment execution counter
  matchedAutomation.executionCount += 1;

  return {
    automationTriggered: true,
    automationId: matchedAutomation.id,
    automationName: matchedAutomation.name,
    matchedKeyword: normalizedKeyword,
    sentMessageText: replyText,
    leadCreatedOrUpdated: lead,
    conversationUpdated: conv,
    aiHandled: isAI,
    handoffTriggered: handoff,
  };
}
