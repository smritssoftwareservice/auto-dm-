import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';
import { MockAIProvider } from './mock-provider';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private fallback: MockAIProvider;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fallback = new MockAIProvider();
  }

  async generateResponse(input: AIResponseInput): Promise<AIResponseOutput> {
    if (!this.apiKey || this.apiKey === 'sk-demo-key') {
      return this.fallback.generateResponse(input);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are ${input.aiConfig.agentName}. Business: ${input.aiConfig.businessDescription}. Tone: ${input.aiConfig.tone}. Instructions: ${input.aiConfig.instructions}. KNOWLEDGE BASE: ${JSON.stringify(input.knowledgeBase)}. STRICT RULE: Do not make up prices or policies not present in Knowledge Base.`,
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
        return this.fallback.generateResponse(input);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || input.aiConfig.fallbackMessage;

      return {
        replyText: reply,
        intentDetected: 'OPENAI_GENERATED',
        shouldHandoff: false,
        confidence: 0.90,
      };
    } catch {
      return this.fallback.generateResponse(input);
    }
  }
}
