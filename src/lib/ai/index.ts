import { AIProvider } from './provider';
import { MockAIProvider } from './mock-provider';
import { OpenAIProvider } from './openai-provider';
import { APP_CONFIG } from '../config';

export function getAIProvider(): AIProvider {
  if (APP_CONFIG.mode === 'demo' || APP_CONFIG.aiProvider === 'mock') {
    return new MockAIProvider();
  }

  if (APP_CONFIG.aiProvider === 'openai') {
    return new OpenAIProvider(APP_CONFIG.aiApiKey);
  }

  return new MockAIProvider();
}
