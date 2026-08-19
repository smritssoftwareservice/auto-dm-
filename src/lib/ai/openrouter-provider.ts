import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';
import { MockAIProvider } from './mock-provider';

export class OpenRouterAIProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;
  private fallback: MockAIProvider;

  constructor(apiKey: string, modelName: string = 'google/gemini-2.0-flash-exp:free') {
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.fallback = new MockAIProvider();
  }

  async generateResponse(input: AIResponseInput): Promise<AIResponseOutput> {
    if (!this.apiKey || this.apiKey === 'sk-demo-key') {
      return this.fallback.generateResponse(input);
    }

    try {
      const kbText = input.knowledgeBase
        .map(kb => `[${kb.category}] ${kb.title}: ${kb.content}`)
        .join('\n');

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://dmflow.ai',
          'X-Title': 'DMFlow AI',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: [
            {
              role: 'system',
              content: `You are ${input.aiConfig.agentName}. Business: ${input.aiConfig.businessDescription}. Tone: ${input.aiConfig.tone}. Instructions: ${input.aiConfig.instructions}. KNOWLEDGE BASE: ${kbText}. STRICT RULE: Never invent false prices or policies. If user wants human handoff, reply with [HANDOFF].`,
            },
            ...input.conversationHistory.map(m => ({
              role: m.sender === 'INSTAGRAM_USER' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: input.userMessage },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.warn('[OpenRouter AI API Error, falling back to Smart Local AI Engine]');
        return this.fallback.generateResponse(input);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || input.aiConfig.fallbackMessage;

      const shouldHandoff = reply.includes('[HANDOFF]') || reply.toLowerCase().includes('talk to human');
      const cleanReply = reply.replace('[HANDOFF]', '').trim();

      return {
        replyText: cleanReply,
        intentDetected: 'OPENROUTER_FREE_MODEL_GENERATED',
        leadScoreAdjustment: 15,
        tagsToAdd: ['OpenRouter AI Engaged'],
        shouldHandoff,
        confidence: 0.92,
      };
    } catch (err) {
      console.error('[OpenRouter AI Provider Exception]:', err);
      return this.fallback.generateResponse(input);
    }
  }
}
