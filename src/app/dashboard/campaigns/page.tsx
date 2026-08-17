'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Megaphone, Plus, Eye, MousePointer, Users, CheckCircle2 } from 'lucide-react';
import { DEMO_CAMPAIGNS } from '@/lib/mock-data';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(DEMO_CAMPAIGNS);

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-pink-400" /> Marketing Campaigns
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Track lead magnet launches, course promos, and Instagram post comment campaigns.
          </p>
        </div>

        <button
          onClick={() => alert('New Campaign Setup Wizard Initialized')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold text-[10px] uppercase">
                {camp.type}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {camp.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{camp.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{camp.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-slate-900 border border-white/5">
              <div>
                <span className="text-slate-500 text-[10px] block">Views</span>
                <span className="text-white font-extrabold">{camp.views.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Clicks</span>
                <span className="text-purple-300 font-extrabold">{camp.clicks.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Leads</span>
                <span className="text-emerald-400 font-extrabold">{camp.leadsCaptured}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
