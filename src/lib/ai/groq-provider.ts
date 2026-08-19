import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';
import { MockAIProvider } from './mock-provider';

export class GroqAIProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;
  private fallback: MockAIProvider;

  constructor(apiKey: string, modelName: string = 'llama-3.3-70b-versatile') {
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

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
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
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        console.warn('[Groq AI API Error, falling back to Smart Local AI Engine]');
        return this.fallback.generateResponse(input);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || input.aiConfig.fallbackMessage;

      const shouldHandoff = reply.includes('[HANDOFF]') || reply.toLowerCase().includes('talk to human');
      const cleanReply = reply.replace('[HANDOFF]', '').trim();

      return {
        replyText: cleanReply,
        intentDetected: 'GROQ_LLAMA3_GENERATED',
        leadScoreAdjustment: 15,
        tagsToAdd: ['Groq AI Engaged'],
        shouldHandoff,
        confidence: 0.94,
      };
    } catch (err) {
      console.error('[Groq AI Provider Exception]:', err);
      return this.fallback.generateResponse(input);
    }
  }
}
