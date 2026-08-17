'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, MessageSquare, Zap, Users, Link2, ShoppingBag, 
  BarChart3, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, 
  Play, HelpCircle, Layers, Star, ChevronRight
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'automation' | 'ai' | 'crm' | 'bio'>('automation');
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-pink-600/10 to-blue-600/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-purple-900/15 blur-[160px] pointer-events-none rounded-full" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">DMFlow <span className="gradient-text">AI</span></span>
              <span className="text-[10px] uppercase tracking-widest text-purple-400 font-semibold block -mt-1">Instagram AI SaaS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#demo" className="hover:text-purple-400 transition-colors">Interactive Demo</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard/simulator" 
              className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3.5 py-2 rounded-lg hover:bg-purple-900/60 transition-all"
            >
              ⚡ Try Demo Mode
            </Link>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 hover:opacity-95 hover:scale-[1.02] transition-all"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-medium mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Next-Gen Instagram Automation & AI CRM Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          Turn Instagram Followers Into <span className="gradient-text">Paying Customers</span> With AI.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Combine Instagram comment-to-DM triggers, 24/7 AI chatbot assistants, lead scoring CRM, creator Link-in-Bio, and automated digital product checkouts in one commercial SaaS.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 rounded-2xl shadow-xl shadow-purple-600/30 hover:scale-[1.03] transition-all"
          >
            Start Free Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/dashboard/simulator" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-slate-200 glass-panel hover:bg-white/10 px-8 py-4 rounded-2xl border border-white/10 transition-all"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400" /> Explore Interactive Demo
          </Link>
        </div>

        {/* Feature Highlights Pill Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-slate-400 font-medium border-y border-white/5 py-4 max-w-4xl mx-auto">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta Official API Ready</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero-Cost Demo Mode</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Tenant CRM</span>
        </div>
      </section>

      {/* Interactive Workflow Visual Preview */}
      <section id="demo" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Experience How DMFlow AI Operates</h2>
          <p className="text-slate-400 text-sm mt-2">See how incoming post comments automatically convert into qualified CRM leads.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl glass-panel border border-white/10 gap-2">
            {[
              { id: 'automation', label: '1. Comment-to-DM Trigger', icon: Zap },
              { id: 'ai', label: '2. AI Agent Chatbot', icon: Bot },
              { id: 'crm', label: '3. CRM Lead Scoring', icon: Users },
              { id: 'bio', label: '4. Link-in-Bio & Products', icon: Link2 },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Frame */}
        <div className="glass-panel rounded-2xl border border-white/15 p-6 md:p-8 shadow-2xl relative">
          {activeTab === 'automation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                  Instant DM Automation
                </span>
                <h3 className="text-2xl font-bold text-white">Turn Keywords Into Instant Direct Messages</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  When a follower comments <strong className="text-purple-400">"PRICE"</strong> or <strong className="text-purple-400">"GUIDE"</strong> on your post, DMFlow AI immediately sends a personalized DM with access links, discounts, and lead capture questions.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Instant Meta-compliant message delivery</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Dynamic variables like &#123;&#123;first_name&#125;&#125;</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Real-time campaign tracking & conversion stats</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-purple-500/20 space-y-4 bg-slate-950/80">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center font-bold text-purple-300 text-xs">
                      IG
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">@demo_creator</span>
                      <span className="text-[10px] text-slate-400">Reel Comment Trigger</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">Active</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-white/5 space-y-2">
                  <div className="text-xs text-slate-300 font-medium flex justify-between">
                    <span>💬 User Comment:</span>
                    <span className="text-purple-400 font-bold">"PRICE"</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Post: "🚀 AI Growth Masterclass 2026 is LIVE!"</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Automated DM Response:</span>
                  <p className="text-xs text-slate-200">"Hey Rahul 👋 Thanks for commenting! Here is your 30% discount access link to the Masterclass: https://dmflow.ai/p/ai-masterclass"</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold border border-pink-500/30">
                  Strict AI Chatbot Assistant
                </span>
                <h3 className="text-2xl font-bold text-white">24/7 Intelligent Customer Support</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your AI assistant handles inquiries using your custom Knowledge Base (curriculum, pricing, FAQs, policies). It never invents fake prices or false promises and hands off to humans seamlessly when needed.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Trained on your FAQs & product docs</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Customizable tones (Friendly, Sales, Expert)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> Auto-handoff for complex inquiries</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-pink-500/20 space-y-3 bg-slate-950/80">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-pink-400" /> Vamshi AI Assistant
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-medium">Friendly Tone</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 max-w-[85%]">
                    Does the masterclass include Instagram DM triggers setup?
                  </div>
                  <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-100 max-w-[85%] ml-auto">
                    Yes! Module 4 covers setting up comment-to-DM keywords, visual workflows, and lead scoring step-by-step.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 max-w-[85%]">
                    Can I get a discount?
                  </div>
                  <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-100 max-w-[85%] ml-auto">
                    Absolue! Use code <strong className="text-pink-300 font-bold">DMFlow30</strong> at checkout for 30% off!
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
                  Built-In Lead CRM
                </span>
                <h3 className="text-2xl font-bold text-white">Automatically Capture & Score Every Prospect</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every interaction creates or updates a lead record in your organization's CRM. Categorize leads with scores (0-100), custom fields, status tags, and export to CSV anytime.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Hot, Warm & Cold score categorization</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Custom field support (Budget, Niche, Location)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> CSV Export & Team member assignments</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-blue-500/20 space-y-3 bg-slate-950/80">
                <div className="text-xs font-bold text-white flex items-center justify-between border-b border-white/10 pb-3">
                  <span>CRM Lead Record</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px]">Score: 88 (Hot)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded border border-white/5">
                    <span className="text-slate-500 text-[10px] block">Name</span>
                    <span className="text-white font-medium">Rahul Sharma</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-white/5">
                    <span className="text-slate-500 text-[10px] block">Instagram</span>
                    <span className="text-purple-400 font-medium">@rahul_tech_coach</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-white/5">
                    <span className="text-slate-500 text-[10px] block">Budget</span>
                    <span className="text-emerald-400 font-medium">$500 - $1,000</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-white/5">
                    <span className="text-slate-500 text-[10px] block">Status</span>
                    <span className="text-blue-300 font-medium">Qualified Lead</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bio' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  Creator Link-in-Bio
                </span>
                <h3 className="text-2xl font-bold text-white">Sell Courses & Collect Leads Directly</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Replace basic link bio tools with a dynamic high-converting page. Embed product cards, consultation booking forms, free guide downloads, and social icons under your custom URL.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Public URL: dmflow.ai/@username</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Built-in product checkout & lead forms</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live mobile preview & theme builder</div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border border-emerald-500/20 max-w-xs mx-auto bg-slate-950/90 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mx-auto p-0.5">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Vamshi Krishna</h4>
                  <p className="text-[11px] text-slate-400">@demo_creator • Creator & Educator</p>
                </div>
                <div className="space-y-2 text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-between">
                    <span>🎓 AI Growth Masterclass</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">$149</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 font-medium flex items-center justify-between">
                    <span>⚡ 1-on-1 VIP Consultation</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">$299</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Primary Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Everything You Need To Automate Instagram & Capture Sales
          </h2>
          <p className="text-slate-400 text-base">
            Engineered specifically for creators, agencies, real-estate agents, educators, and SaaS businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              color: 'from-purple-500 to-indigo-500',
              title: 'Comment & DM Automations',
              desc: 'Automatically reply to post/reel comments and DMs containing target keywords. Send links instantly.',
            },
            {
              icon: Bot,
              color: 'from-pink-500 to-rose-500',
              title: 'Custom AI Assistant',
              desc: 'Train an AI agent on your exact FAQs, pricing, and curriculum. Hand off to human agents whenever requested.',
            },
            {
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              title: 'Multi-Tenant Lead CRM',
              desc: 'Store contact info, budget, lead scores (0-100), and custom field data across your entire team.',
            },
            {
              icon: Link2,
              color: 'from-emerald-500 to-teal-500',
              title: 'Link-in-Bio Builder',
              desc: 'High-converting link page with embedded products, forms, header blocks, and click analytics.',
            },
            {
              icon: ShoppingBag,
              color: 'from-amber-500 to-orange-500',
              title: 'Digital Products & Checkout',
              desc: 'Sell digital courses, consultation calls, e-books, and services with Stripe test mode support.',
            },
            {
              icon: BarChart3,
              color: 'from-violet-500 to-purple-500',
              title: 'Deep Analytics Engine',
              desc: 'Track total leads, conversion rates, AI responses, link clicks, and revenue over 7, 30, or 90 days.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all text-left space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Step-by-Step */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-400 font-bold uppercase text-xs tracking-widest block mb-2">Simple Setup</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">How DMFlow AI Drives Sales in 3 Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 relative space-y-4">
            <span className="text-5xl font-extrabold gradient-text block">01</span>
            <h3 className="text-xl font-bold text-white">Connect Instagram & AI</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect your official Instagram account via Meta OAuth and configure your AI assistant tone and knowledge base.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 relative space-y-4">
            <span className="text-5xl font-extrabold gradient-text block">02</span>
            <h3 className="text-xl font-bold text-white">Launch Automation Trigger</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Set up a comment keyword trigger like "PRICE" or "COURSE" on your latest Instagram post or reel.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 relative space-y-4">
            <span className="text-5xl font-extrabold gradient-text block">03</span>
            <h3 className="text-xl font-bold text-white">Watch Leads & Sales Grow</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              DMFlow AI responds 24/7, qualifies lead scores, saves contacts in CRM, and drives traffic to your Link-in-Bio checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Flexible Plans For Every Business</h2>
          <p className="text-slate-400 text-base">Start free in Demo Mode or upgrade to expand your automation limits.</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-xs font-semibold ${pricingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
            <button 
              onClick={() => setPricingCycle(pricingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-purple-900/60 p-1 border border-purple-500/30 flex items-center transition-all"
            >
              <div className={`w-4 h-4 rounded-full bg-purple-400 transition-all ${pricingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-semibold ${pricingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual (Save 20%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: 'FREE',
              price: 0,
              desc: 'Ideal for trying out the platform & demo simulator.',
              features: ['1 Workspace', '1 Instagram Account', '3 Automations', '100 Executions/mo', '100 CRM Leads', 'Basic Link-in-Bio'],
              cta: 'Start Free',
              highlight: false,
            },
            {
              name: 'PRO',
              price: pricingCycle === 'monthly' ? 29 : 23,
              desc: 'Perfect for growing creators and solo coaches.',
              features: ['3 Workspaces', '3 Instagram Accounts', '25 Automations', '5,000 Executions/mo', '2,500 CRM Leads', 'Custom AI Agent', 'Products & Forms'],
              cta: 'Upgrade to Pro',
              highlight: true,
            },
            {
              name: 'BUSINESS',
              price: pricingCycle === 'monthly' ? 79 : 63,
              desc: 'For high-volume creators & medium brands.',
              features: ['10 Workspaces', '10 Instagram Accounts', '100 Automations', '25,000 Executions/mo', '15,000 CRM Leads', 'Priority AI Response', 'Team Accounts'],
              cta: 'Get Business',
              highlight: false,
            },
            {
              name: 'AGENCY',
              price: pricingCycle === 'monthly' ? 199 : 159,
              desc: 'For marketing agencies & multi-brand networks.',
              features: ['50 Workspaces', '50 Instagram Accounts', 'Unlimited Automations', '100,000 Executions/mo', '100,000 CRM Leads', 'Dedicated Support', 'Admin Dashboard Access'],
              cta: 'Contact Agency',
              highlight: false,
            },
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-6 border text-left flex flex-col justify-between transition-all ${
                plan.highlight 
                  ? 'glass-panel border-purple-500 shadow-xl shadow-purple-600/20 scale-[1.03]' 
                  : 'glass-card border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {plan.highlight && (
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-slate-400 text-xs mt-1 min-h-[32px]">{plan.desc}</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-slate-400 text-xs">/month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link 
                href="/signup" 
                className={`w-full py-3 rounded-xl text-center text-xs font-bold transition-all ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 hover:opacity-95' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5 text-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm mt-2">Everything you need to know about Meta compliance, AI & Demo Mode.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Does DMFlow AI use official Meta Instagram APIs?',
              a: 'Yes. DMFlow AI is built strictly on official Meta Graph API capabilities and Webhooks. We never ask for your Instagram password, and we do not use password scraping or unofficial browser automation.',
            },
            {
              q: 'Can I try DMFlow AI without connecting a live Instagram account?',
              a: 'Absolutely! DMFlow AI comes with a built-in Demo Mode and Interactive Instagram Simulator where you can simulate post comments, DMs, AI chatbot replies, and lead capture instantly.',
            },
            {
              q: 'What happens if the AI agent does not know an answer?',
              a: 'DMFlow AI features strict AI boundary rules. It never invents prices or policies. If an answer is missing from your Knowledge Base, it uses your configured fallback response and triggers a human handoff notification.',
            },
            {
              q: 'How does the CRM lead scoring work?',
              a: 'Leads receive a score from 0 to 100 based on their interaction history (e.g., commenting "PRICE" adds 25 points, inquiring about consultations adds 35 points). Leads are tagged as Hot, Warm, or Cold automatically.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="glass-card rounded-xl p-6 border border-white/10 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" /> {faq.q}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="glass-panel p-10 md:p-14 rounded-3xl border border-purple-500/30 relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready To Automate Your Instagram Sales Engine?</h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Join thousands of creators, educators, real estate agents, and agencies converting Instagram interactions into real revenue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all"
            >
              Get Started For Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard/simulator" 
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-slate-200 glass-panel px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Test Live Simulator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 max-w-7xl mx-auto text-xs text-slate-500 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-[10px]">DM</div>
            <span className="text-slate-300 font-bold text-sm">DMFlow AI</span>
            <span>© 2026 DMFlow AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/dashboard/simulator" className="hover:text-slate-300">Demo Mode</Link>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 text-center md:text-left">
          Disclaimer: DMFlow AI is an independent software product and is not endorsed by or affiliated with Meta Platforms, Inc. or Instagram unless officially applicable. All product names, logos, and brands are property of their respective owners.
        </p>
      </footer>
    </div>
  );
}
