import { AIConfiguration, KnowledgeDocument, Lead } from '@/types';

export interface AIResponseInput {
  userMessage: string;
  conversationHistory: { sender: string; text: string }[];
  aiConfig: AIConfiguration;
  knowledgeBase: KnowledgeDocument[];
  lead?: Lead;
}

export interface AIResponseOutput {
  replyText: string;
  intentDetected: string;
  leadScoreAdjustment?: number;
  tagsToAdd?: string[];
  shouldHandoff: boolean;
  confidence: number;
}

export interface AIProvider {
  generateResponse(input: AIResponseInput): Promise<AIResponseOutput>;
}
