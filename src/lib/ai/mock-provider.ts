import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';

export class MockAIProvider implements AIProvider {
  async generateResponse(input: AIResponseInput): Promise<AIResponseOutput> {
    const { userMessage, knowledgeBase, aiConfig } = input;
    const lowerMsg = userMessage.toLowerCase().trim();

    // 1. Check for pricing / discount intent
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('discount') || lowerMsg.includes('coupon') || lowerMsg.includes('how much')) {
      const priceDoc = knowledgeBase.find(kb => kb.title.toLowerCase().includes('curriculum') || kb.content.toLowerCase().includes('cost'));
      const text = priceDoc 
        ? `${priceDoc.content} Feel free to use code DMFlow30 for 30% off!`
        : `Our AI Growth Masterclass is $149 ($104 with coupon DMFlow30) and 1-on-1 Consultation is $299.`;
      
      return {
        replyText: text,
        intentDetected: 'INQUIRE_PRICING',
        leadScoreAdjustment: 25,
        tagsToAdd: ['Pricing Inquirer', 'Hot Prospect'],
        shouldHandoff: false,
        confidence: 0.95,
      };
    }

    // 2. Check for consultation / call intent
    if (lowerMsg.includes('call') || lowerMsg.includes('consultation') || lowerMsg.includes('zoom') || lowerMsg.includes('book')) {
      const callDoc = knowledgeBase.find(kb => kb.title.toLowerCase().includes('consultation'));
      return {
        replyText: callDoc 
          ? `${callDoc.content}` 
          : `You can book a 60-minute intensive 1-on-1 Zoom strategy session directly here: https://dmflow.ai/f/book-call`,
        intentDetected: 'BOOK_CONSULTATION',
        leadScoreAdjustment: 35,
        tagsToAdd: ['Consultation Prospect'],
        shouldHandoff: false,
        confidence: 0.92,
      };
    }

    // 3. Check for refund / policy intent
    if (lowerMsg.includes('refund') || lowerMsg.includes('guarantee') || lowerMsg.includes('policy')) {
      const policyDoc = knowledgeBase.find(kb => kb.category === 'POLICY');
      return {
        replyText: policyDoc 
          ? policyDoc.content 
          : 'All digital masterclasses and tools come with a full 14-day money-back guarantee.',
        intentDetected: 'INQUIRE_POLICY',
        shouldHandoff: false,
        confidence: 0.90,
      };
    }

    // 4. Human Handoff trigger keywords
    if (lowerMsg.includes('human') || lowerMsg.includes('agent') || lowerMsg.includes('real person') || lowerMsg.includes('talk to vamshi')) {
      return {
        replyText: aiConfig.handoffMessage || "Connecting you with Vamshi's team right now! Standard response time is under 15 minutes.",
        intentDetected: 'HUMAN_HANDOFF',
        shouldHandoff: true,
        confidence: 1.0,
      };
    }

    // 5. General match attempt in Knowledge Base
    const matchedDoc = knowledgeBase.find(kb => 
      kb.content.toLowerCase().includes(lowerMsg) || kb.title.toLowerCase().includes(lowerMsg)
    );

    if (matchedDoc) {
      return {
        replyText: `Here is what I found in our records: ${matchedDoc.content}`,
        intentDetected: 'KNOWLEDGE_RETRIEVAL',
        shouldHandoff: false,
        confidence: 0.85,
      };
    }

    // 6. Strict Fallback - Never invent facts
    return {
      replyText: aiConfig.fallbackMessage || "I don't have that exact detail handy yet, but I've notified our team to connect with you directly!",
      intentDetected: 'UNKNOWN_FALLBACK',
      shouldHandoff: false,
      confidence: 0.50,
    };
  }
}
