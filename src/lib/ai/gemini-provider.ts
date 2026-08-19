import { AIProvider, AIResponseInput, AIResponseOutput } from './provider';
import { MockAIProvider } from './mock-provider';

export class GeminiAIProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;
  private fallback: MockAIProvider;

  constructor(apiKey: string, modelName: string = 'gemini-2.0-flash') {
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

      const systemPrompt = `You are ${input.aiConfig.agentName}, an AI chatbot assistant for ${input.aiConfig.businessDescription}.
Tone: ${input.aiConfig.tone}.
Instructions: ${input.aiConfig.instructions}

KNOWLEDGE BASE:
${kbText}

CRITICAL RULES:
1. Never invent false prices, discounts, or policies not present in the Knowledge Base.
2. If the user asks for a real human, agent, or Vamshi, output: [HANDOFF]
3. Keep responses helpful, concise (under 3 sentences for Instagram DM), and engaging.`;

      const contents = [
        ...input.conversationHistory.map(m => ({
          role: m.sender === 'INSTAGRAM_USER' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        {
          role: 'user',
          parts: [{ text: input.userMessage }],
        },
      ];

      // Try gemini-2.0-flash, fallback to gemini-1.5-flash if needed
      let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
      
      let response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 350,
          },
        }),
      });

      if (!response.ok && this.modelName === 'gemini-2.0-flash') {
        // Fallback endpoint to 1.5-flash
        endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350,
            },
          }),
        });
      }

      if (!response.ok) {
        console.warn('[Gemini AI API Error, falling back to Smart Local AI Engine]');
        return this.fallback.generateResponse(input);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!rawText) {
        return this.fallback.generateResponse(input);
      }

      const shouldHandoff = rawText.includes('[HANDOFF]') || rawText.toLowerCase().includes('connecting you with');
      const cleanReply = rawText.replace('[HANDOFF]', '').trim();

      return {
        replyText: cleanReply || input.aiConfig.fallbackMessage,
        intentDetected: 'GEMINI_AI_GENERATED',
        leadScoreAdjustment: 15,
        tagsToAdd: ['AI Engaged'],
        shouldHandoff,
        confidence: 0.95,
      };
    } catch (err) {
      console.error('[Gemini AI Provider Exception]:', err);
      return this.fallback.generateResponse(input);
    }
  }
}
