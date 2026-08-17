import { AppMode } from '@/types';

export const APP_CONFIG = {
  name: 'DMFlow AI',
  tagline: 'Turn Instagram Followers Into Customers With AI.',
  version: '1.0.0',
  mode: (process.env.NEXT_PUBLIC_APP_MODE || 'demo') as AppMode,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // AI Settings
  aiProvider: process.env.AI_PROVIDER || 'mock',
  aiApiKey: process.env.AI_API_KEY || '',
  
  // Stripe Test Settings
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  
  // Meta Instagram API Settings
  metaAppId: process.env.META_APP_ID || '',
  metaRedirectUri: process.env.META_REDIRECT_URI || 'http://localhost:3000/api/instagram/callback',
  
  // Usage limits
  plans: {
    FREE: {
      workspaces: 1,
      instagramAccounts: 1,
      automations: 3,
      executionsPerMonth: 100,
      leadsLimit: 100,
      priceMonthly: 0,
    },
    PRO: {
      workspaces: 3,
      instagramAccounts: 3,
      automations: 25,
      executionsPerMonth: 5000,
      leadsLimit: 2500,
      priceMonthly: 29,
    },
    BUSINESS: {
      workspaces: 10,
      instagramAccounts: 10,
      automations: 100,
      executionsPerMonth: 25000,
      leadsLimit: 15000,
      priceMonthly: 79,
    },
    AGENCY: {
      workspaces: 50,
      instagramAccounts: 50,
      automations: 1000,
      executionsPerMonth: 100000,
      leadsLimit: 100000,
      priceMonthly: 199,
    },
  },
};
