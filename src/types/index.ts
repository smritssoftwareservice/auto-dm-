export type AppMode = 'demo' | 'development' | 'production';

export type UserRole = 'OWNER' | 'ADMIN' | 'AGENT' | 'VIEWER';

export type InstagramStatus = 'CONNECTED' | 'DISCONNECTED' | 'TOKEN_EXPIRED' | 'NEEDS_RECONNECT';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  instagramUsername?: string;
  businessCategory?: string;
  createdAt: string;
  plan: 'FREE' | 'PRO' | 'BUSINESS' | 'AGENCY';
}

export interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
}

export interface InstagramAccount {
  id: string;
  organizationId: string;
  instagramUserId: string;
  username: string;
  profileImage?: string;
  status: InstagramStatus;
  followersCount?: number;
  tokenExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type TriggerType = 
  | 'INSTAGRAM_COMMENT_KEYWORD'
  | 'INSTAGRAM_DM_KEYWORD'
  | 'NEW_CONVERSATION'
  | 'FORM_SUBMISSION'
  | 'LINK_CLICK'
  | 'PRODUCT_PURCHASE';

export type AutomationStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ERROR';

export interface AutomationNodeData {
  label: string;
  keyword?: string;
  messageText?: string;
  delayMinutes?: number;
  tagName?: string;
  leadScoreAdd?: number;
  aiInstructions?: string;
}

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'message' | 'ai_response' | 'condition' | 'delay' | 'add_tag' | 'create_lead' | 'handoff' | 'end';
  position: { x: number; y: number };
  data: AutomationNodeData;
}

export interface Automation {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  status: AutomationStatus;
  triggerType: TriggerType;
  triggerKeyword?: string;
  postId?: string;
  postCaption?: string;
  nodes: AutomationNode[];
  executionCount: number;
  conversionCount: number;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'INTERESTED' | 'CONVERTED' | 'LOST';

export interface CustomFieldValue {
  fieldId: string;
  fieldName: string;
  value: string;
}

export interface Lead {
  id: string;
  organizationId: string;
  name: string;
  instagramUsername: string;
  email?: string;
  phone?: string;
  company?: string;
  budget?: string;
  status: LeadStatus;
  leadScore: number; // 0 - 100
  tags: string[];
  notes?: string;
  customFields?: CustomFieldValue[];
  createdAt: string;
  lastInteractionAt: string;
}

export type MessageSender = 'INSTAGRAM_USER' | 'AI_AGENT' | 'HUMAN_AGENT' | 'SYSTEM';

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  delivered: boolean;
  metaData?: Record<string, any>;
}

export interface Conversation {
  id: string;
  organizationId: string;
  instagramUsername: string;
  userAvatar?: string;
  leadId?: string;
  assignedTo?: string;
  status: 'UNREAD' | 'ACTIVE' | 'ARCHIVED' | 'HANDOFF';
  aiMode: 'ACTIVE' | 'PAUSED' | 'HANDOFF';
  lastMessageText: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}

export interface AIConfiguration {
  id: string;
  organizationId: string;
  agentName: string;
  businessDescription: string;
  websiteUrl?: string;
  tone: 'Professional' | 'Friendly' | 'Casual' | 'Sales' | 'Expert';
  instructions: string;
  fallbackMessage: string;
  handoffMessage: string;
  status: 'ACTIVE' | 'PAUSED';
}

export interface KnowledgeDocument {
  id: string;
  organizationId: string;
  title: string;
  category: 'FAQ' | 'PRODUCT' | 'POLICY' | 'GENERAL';
  content: string;
  updatedAt: string;
}

export type BlockType = 
  | 'LINK' 
  | 'HEADER' 
  | 'TEXT' 
  | 'IMAGE' 
  | 'VIDEO' 
  | 'PRODUCT' 
  | 'FORM' 
  | 'WHATSAPP' 
  | 'EMAIL' 
  | 'SOCIALS';

export interface LinkBlock {
  id: string;
  type: BlockType;
  title: string;
  url?: string;
  content?: string;
  iconName?: string;
  enabled: boolean;
  order: number;
  metadata?: Record<string, any>;
}

export interface LinkPage {
  id: string;
  organizationId: string;
  username: string;
  title: string;
  bio: string;
  avatarUrl: string;
  theme: 'midnight' | 'emerald' | 'sunset' | 'glass' | 'minimal';
  blocks: LinkBlock[];
  viewsCount: number;
  clicksCount: number;
  published: boolean;
}

export interface DigitalProduct {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: 'Digital' | 'Course' | 'Consultation' | 'Service' | 'External Link';
  productUrl: string;
  imageUrl?: string;
  salesCount: number;
  revenue: number;
  status: 'ACTIVE' | 'DRAFT';
}

export interface FormField {
  id: string;
  label: string;
  fieldType: 'TEXT' | 'EMAIL' | 'PHONE' | 'NUMBER' | 'SELECT' | 'CHECKBOX';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface Form {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  fields: FormField[];
  submissionsCount: number;
  createdAt: string;
}

export interface Campaign {
  id: string;
  organizationId: string;
  name: string;
  type: 'Lead Magnet' | 'Product Launch' | 'Course Promo' | 'Coaching Session' | 'Real Estate';
  description: string;
  ctaText: string;
  linkUrl: string;
  views: number;
  clicks: number;
  leadsCaptured: number;
  status: 'ACTIVE' | 'DRAFT' | 'COMPLETED';
  createdAt: string;
}

export interface AnalyticsSummary {
  totalLeads: number;
  newLeads7d: number;
  totalConversations: number;
  aiResponsesCount: number;
  conversionRate: number;
  revenue: number;
  linkViews: number;
  formSubmissions: number;
  chartData: {
    date: string;
    leads: number;
    conversations: number;
    revenue: number;
  }[];
}
