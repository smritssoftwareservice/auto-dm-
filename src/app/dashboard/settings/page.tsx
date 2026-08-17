'use client';

import React, { useState } from 'react';
import { Settings, Key, Bell, Shield, Save } from 'lucide-react';
import { DEMO_ORGANIZATION } from '@/lib/mock-data';

export default function SettingsPage() {
  const [name, setName] = useState(DEMO_ORGANIZATION.name);
  const [category, setCategory] = useState(DEMO_ORGANIZATION.businessCategory || 'Creator');
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
          <Settings className="w-8 h-8 text-purple-400" /> Organization Settings
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Manage general workspace configurations, Webhook security tokens, and profile preferences.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          Organization Settings Saved Successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 text-xs">
        <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">General Business Profile</h2>
        
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

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" /> Webhook Verification Secret
          </h2>
          <div>
            <label className="font-semibold text-slate-300 block mb-1">Meta Webhook Token</label>
            <input
              type="password"
              readOnly
              value="dmflow_webhook_verify_token_123"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-slate-400 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center gap-2 shadow"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </form>
    </div>
  );
}
