import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';

export class MockAIProvider implements AIProvider {
  async generateResponse(input: AIResponseInput): Promise<AIResponseOutput> {
    const { userMessage, knowledgeBase, aiConfig } = input;
    const lowerMsg = userMessage.toLowerCase().trim();
    const words = lowerMsg.split(/\s+/).filter(w => w.length > 2);

    // 1. Human Handoff Triggers
    const handoffKeywords = ['human', 'agent', 'real person', 'talk to vamshi', 'support', 'owner', 'manager', 'person', 'help me live'];
    if (handoffKeywords.some(kw => lowerMsg.includes(kw))) {
      return {
        replyText: aiConfig.handoffMessage || "Connecting you with Vamshi's team right now! Standard response time is under 15 minutes.",
        intentDetected: 'HUMAN_HANDOFF',
        shouldHandoff: true,
        confidence: 1.0,
      };
    }

    // 2. Check for pricing / discount / buy intent
    const pricingKeywords = ['price', 'cost', 'discount', 'coupon', 'how much', 'buy', 'purchase', 'fees', 'pricing', 'offer', 'deal'];
    if (pricingKeywords.some(kw => lowerMsg.includes(kw))) {
      const priceDoc = knowledgeBase.find(kb => 
        kb.title.toLowerCase().includes('price') || 
        kb.title.toLowerCase().includes('curriculum') || 
        kb.content.toLowerCase().includes('cost') ||
        kb.category === 'PRODUCT'
      );
      
      const text = priceDoc 
        ? `${priceDoc.content} Special deal: Use code "DMFLOW30" at checkout for 30% off!`
        : `Our AI Growth Masterclass is $149 ($104 with coupon DMFLOW30) and 1-on-1 Strategy Session is $299.`;
      
      return {
        replyText: text,
        intentDetected: 'INQUIRE_PRICING',
        leadScoreAdjustment: 25,
        tagsToAdd: ['Pricing Inquirer', 'Hot Prospect'],
        shouldHandoff: false,
        confidence: 0.95,
      };
    }

    // 3. Consultation / Call intent
    const callKeywords = ['call', 'consultation', 'zoom', 'book', 'schedule', 'meeting', 'calendar', 'session'];
    if (callKeywords.some(kw => lowerMsg.includes(kw))) {
      const callDoc = knowledgeBase.find(kb => 
        kb.title.toLowerCase().includes('consultation') || 
        kb.content.toLowerCase().includes('zoom')
      );
      
      return {
        replyText: callDoc 
          ? `${callDoc.content}` 
          : `You can book a 60-minute intensive 1-on-1 strategy call with Vamshi directly here: https://dmflow.ai/f/book-call`,
        intentDetected: 'BOOK_CONSULTATION',
        leadScoreAdjustment: 35,
        tagsToAdd: ['Consultation Prospect', 'High Value'],
        shouldHandoff: false,
        confidence: 0.92,
      };
    }

    // 4. Refund / Policy intent
    const policyKeywords = ['refund', 'guarantee', 'policy', 'return', 'terms', 'privacy', 'cancel', 'subscription'];
    if (policyKeywords.some(kw => lowerMsg.includes(kw))) {
      const policyDoc = knowledgeBase.find(kb => kb.category === 'POLICY');
      return {
        replyText: policyDoc 
          ? policyDoc.content 
          : 'All digital masterclasses and tools come with a full 14-day no-questions-asked money-back guarantee.',
        intentDetected: 'INQUIRE_POLICY',
        shouldHandoff: false,
        confidence: 0.90,
      };
    }

    // 5. Intelligent Knowledge Base Scoring (Word overlap & Semantic relevance)
    let bestMatchDoc = null;
    let maxScore = 0;

    for (const doc of knowledgeBase) {
      const docText = `${doc.title} ${doc.content}`.toLowerCase();
      let matchScore = 0;

      for (const word of words) {
        if (docText.includes(word)) {
          matchScore += word.length > 5 ? 3 : 1;
        }
      }

      if (docText.includes(lowerMsg)) {
        matchScore += 10;
      }

      if (matchScore > maxScore) {
        maxScore = matchScore;
        bestMatchDoc = doc;
      }
    }

    if (bestMatchDoc && maxScore >= 2) {
      return {
        replyText: `${bestMatchDoc.content}`,
        intentDetected: `KB_MATCH_${bestMatchDoc.category}`,
        leadScoreAdjustment: 10,
        tagsToAdd: ['Engaged User'],
        shouldHandoff: false,
        confidence: Math.min(0.90, 0.60 + maxScore * 0.05),
      };
    }

    // 6. General Greeting / Small Talk
    const greetingKeywords = ['hi', 'hello', 'hey', 'start', 'good morning', 'good evening', 'who are you'];
    if (greetingKeywords.some(kw => lowerMsg === kw || lowerMsg.startsWith(kw))) {
      return {
        replyText: `Hey there! 👋 I am ${aiConfig.agentName}. ${aiConfig.businessDescription}. How can I assist you today?`,
        intentDetected: 'GREETING',
        leadScoreAdjustment: 5,
        shouldHandoff: false,
        confidence: 0.90,
      };
    }

    // 7. Strict Fallback - Never invent false facts
    return {
      replyText: aiConfig.fallbackMessage || "I don't have that exact detail handy in our current knowledge base, but I've notified our team to get back to you shortly!",
      intentDetected: 'UNKNOWN_FALLBACK',
      shouldHandoff: false,
      confidence: 0.50,
    };
  }
}
