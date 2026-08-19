import { AIProvider } from './provider';
import { MockAIProvider } from './mock-provider';
import { OpenAIProvider } from './openai-provider';
import { GeminiAIProvider } from './gemini-provider';
import { GroqAIProvider } from './groq-provider';
import { OpenRouterAIProvider } from './openrouter-provider';
import { APP_CONFIG } from '../config';
import { AIConfiguration } from '@/types';

export function getAIProvider(customConfig?: Partial<AIConfiguration>): AIProvider {
  const providerType = customConfig?.provider || APP_CONFIG.aiProvider;
  const apiKey = customConfig?.apiKey || APP_CONFIG.aiApiKey;

  // 1. Google Gemini Free Tier API Key (Recommended 100% Free)
  if (providerType === 'gemini' || APP_CONFIG.geminiApiKey) {
    const keyToUse = customConfig?.apiKey || APP_CONFIG.geminiApiKey || apiKey;
    if (keyToUse && keyToUse !== 'sk-demo-key') {
      return new GeminiAIProvider(keyToUse, customConfig?.modelName || 'gemini-2.0-flash');
    }
  }

  // 2. Groq Free Tier API Key (Ultra-fast Llama 3)
  if (providerType === 'groq' || APP_CONFIG.groqApiKey) {
    const keyToUse = customConfig?.apiKey || APP_CONFIG.groqApiKey || apiKey;
    if (keyToUse && keyToUse !== 'sk-demo-key') {
      return new GroqAIProvider(keyToUse, customConfig?.modelName || 'llama-3.3-70b-versatile');
    }
  }

  // 3. OpenRouter Free Tier Models
  if (providerType === 'openrouter' || APP_CONFIG.openrouterApiKey) {
    const keyToUse = customConfig?.apiKey || APP_CONFIG.openrouterApiKey || apiKey;
    if (keyToUse && keyToUse !== 'sk-demo-key') {
      return new OpenRouterAIProvider(keyToUse, customConfig?.modelName || 'google/gemini-2.0-flash-exp:free');
    }
  }

  // 4. OpenAI (Paid Key if user provided one)
  if (providerType === 'openai' && apiKey && apiKey !== 'sk-demo-key') {
    return new OpenAIProvider(apiKey);
  }

  // 5. Zero-Cost Smart Local AI Engine (Out-of-the-box fallback, 100% Free)
  return new MockAIProvider();
}
