# DMFlow AI - Turn Instagram Followers Into Customers With AI

> **Tagline**: Turn Instagram Followers Into Customers With AI.
> 
> **DMFlow AI** is a production-ready SaaS combining Instagram lead generation, AI agent chatbots, visual automation workflows, multi-tenant CRM, creator Link-in-Bio builder, digital products, lead forms, and analytics.

---

## 🌟 Key Features

* **Visual Automation Builder**: Node-based editor for comment-to-DM keywords, AI handoff, lead scoring, and delays.
* **Interactive Demo Instagram Event Simulator**: Test comments ("PRICE", "COURSE") and DM replies in real-time without needing live Meta credentials.
* **Strict AI Chatbot Assistant**: Trained on custom Knowledge Base (FAQs, products, policies). Never invents false prices or fake promises; automatically hands off to human agents when requested.
* **Multi-Tenant Lead CRM**: Categorize contacts with lead scores (0-100), Hot/Warm/Cold badges, tags, custom fields, and CSV export.
* **Creator Link-in-Bio Builder**: Live mobile device preview, public URL `/@username`, custom buttons, product cards, and form embeds.
* **Digital Products & Checkout**: Sell courses, consultation calls, e-books, and services with Stripe test mode support.
* **Custom Form Builder**: Lead capture forms with dropdowns, text inputs, and automatic CRM lead creation upon submission.
* **Marketing Campaigns & Templates**: 1-click starter templates (Ebook, Real Estate, Coaching, SaaS Demo, Course Promo).
* **Deep Analytics**: Track leads, DM responses, conversion rates, link clicks, and revenue over time.
* **Super Admin Panel**: Monitor global system health, webhooks audit log, organizations, error logs, and user roles.

---

## 🚀 Quick Start (Zero-Cost Setup)

### Prerequisites
* Node.js v18.x or v20.x installed
* npm package manager

### 1. Clone & Install Dependencies
```bash
cd C:\Users\dell\.gemini\antigravity-ide\scratch\dmflow-ai
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
AUTH_SECRET="dmflow_ai_super_secret_auth_key_32_chars_min"
AI_PROVIDER=mock
AI_API_KEY=sk-demo-key
```

### 3. Initialize Prisma Database
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Exploring Demo Mode

1. Visit [http://localhost:3000](http://localhost:3000) to see the high-converting SaaS landing page.
2. Click **Sign In** or **Try Demo Mode** (pre-filled demo credentials: `vamshi@dmflow.ai`).
3. Go to **IG Simulator** (`/dashboard/simulator`) to simulate comments like `PRICE` or `COURSE`. Watch the real-time AI reply and CRM lead score bump!
4. Navigate to **Link in Bio** (`/dashboard/link-in-bio`) and preview your live public link page at `/bio/demo_creator`.

---

## 🛠️ Tech Stack & Free Resource Strategy

* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Glassmorphism UI tokens.
* **Backend**: Next.js Server Actions / API Routes, Prisma ORM, Web Crypto API.
* **Database**: PostgreSQL (Supabase Free Tier ready) / SQLite for local demo execution.
* **AI Provider**: `AIProvider` abstraction with zero-cost `MockAIProvider` and replaceable `OpenAIProvider`.
* **Payments**: Stripe Test Mode.
* **Deployment**: Vercel Free Tier compatible.

---

## 📋 Available NPM Commands

* `npm run dev` - Start local Next.js development server
* `npm run build` - Build production bundle
* `npm run start` - Run production build
* `npm run lint` - Run ESLint code checks
* `npm run typecheck` - Run TypeScript compiler checks

---

## 🛡️ Meta API Safety & Disclaimer

DMFlow AI connects exclusively through official Meta Graph API endpoints and Webhooks. We never request Instagram passwords, nor do we use credential scraping or unofficial browser automation.

*Disclaimer: DMFlow AI is an independent software product and is not endorsed by or affiliated with Meta Platforms, Inc. or Instagram unless officially applicable.*
