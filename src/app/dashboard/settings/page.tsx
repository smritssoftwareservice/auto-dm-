'use client';

import React, { useState } from 'react';
import { Settings, Key, Bell, Shield, Save, CreditCard, Sparkles, Zap, CheckCircle2, ExternalLink } from 'lucide-react';
import { DEMO_ORGANIZATION } from '@/lib/mock-data';

export default function SettingsPage() {
  const [name, setName] = useState(DEMO_ORGANIZATION.name);
  const [category, setCategory] = useState(DEMO_ORGANIZATION.businessCategory || 'Creator');
  const [metaAppId, setMetaAppId] = useState('');
  const [metaAppSecret, setMetaAppSecret] = useState('');
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-purple-400" /> Organization & API Keys Settings
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Manage general workspace configurations, Webhook security tokens, Stripe payment keys, and zero-cost AI API credentials.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Organization Settings & API Keys Saved Successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8 text-xs">
        {/* Section 1: Business Profile */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" /> General Business Profile
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Organization Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Business Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Zero-Cost Free AI Keys */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Free AI Provider Credentials
            </h2>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              Zero-Cost Modes
            </span>
          </div>

          <p className="text-slate-400 text-[11px]">
            No credit card is required. Get a 100% free Google Gemini or Groq API key to power ultra-fast responses.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300 block">Google Gemini Free API Key</label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-[10px] flex items-center gap-0.5"
                >
                  Get Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={e => setGeminiApiKey(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Built-in Local Smart AI Engine</label>
              <input
                type="text"
                readOnly
                value="Zero-Cost Local Engine Active (No Key Needed)"
                className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl px-3 py-2.5 text-emerald-400 font-medium cursor-not-allowed text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Meta Instagram Webhook Keys */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Key className="w-4 h-4 text-purple-400" /> Meta / Instagram API Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Meta App ID (Optional for Live Graph API)</label>
              <input
                type="text"
                placeholder="1234567890..."
                value={metaAppId}
                onChange={e => setMetaAppId(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Meta App Secret</label>
              <input
                type="password"
                placeholder="Secret key..."
                value={metaAppSecret}
                onChange={e => setMetaAppSecret(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Meta Webhook Verify Secret Token</label>
            <input
              type="text"
              readOnly
              value="dmflow_webhook_verify_token_123"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-purple-300 font-mono"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Use this verify token when configuring Meta Webhook subscriptions in Meta Developer Console.
            </span>
          </div>
        </div>

        {/* Section 4: Stripe Payment Keys */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <CreditCard className="w-4 h-4 text-amber-400" /> Stripe Test Mode Billing Keys
          </h2>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Stripe Publishable Key (Test Mode)</label>
            <input
              type="text"
              placeholder="pk_test_..."
              value={stripePublishableKey}
              onChange={e => setStripePublishableKey(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30"
        >
          <Save className="w-4 h-4" /> Save All Settings & Keys
        </button>
      </form>
    </div>
  );
}
