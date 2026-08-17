'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layers, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const STARTER_TEMPLATES = [
  { id: 't_guide', title: 'FREE GUIDE / EBOOK PDF', keyword: 'GUIDE', desc: 'Captures follower email in exchange for instant PDF download DM.', category: 'Lead Magnet' },
  { id: 't_course', title: 'COURSE PROMO FUNNEL', keyword: 'COURSE', desc: 'Qualifies user intent and drives traffic to course checkout page.', category: 'Education' },
  { id: 't_coaching', title: '1-ON-1 COACHING CALL', keyword: 'COACH', desc: 'Asks goal questions and shares Zoom strategy booking link.', category: 'Coaching' },
  { id: 't_realty', title: 'REAL ESTATE LISTINGS', keyword: 'HOUSE', desc: 'Sends property brochure & price sheet to prospective buyers.', category: 'Real Estate' },
  { id: 't_saas', title: 'SAAS DEMO BOOKING', keyword: 'DEMO', desc: 'Schedules product walkthrough calls with sales team.', category: 'SaaS' },
  { id: 't_agency', title: 'AGENCY CLIENT ONBOARDING', keyword: 'AGENCY', desc: 'Collects budget & project requirements automatically.', category: 'Agency' },
];

export default function TemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (title: string) => {
    alert(`Template "${title}" deployed into your organization!`);
    router.push('/dashboard/automations');
  };

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Layers className="w-8 h-8 text-purple-400" /> One-Click Starter Templates
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Deploy pre-configured comment-to-DM triggers, lead fields, and AI prompt instructions instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STARTER_TEMPLATES.map(tpl => (
          <div key={tpl.id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase">
                  {tpl.category}
                </span>
                <span className="font-mono text-xs font-bold text-pink-400">
                  Trigger: "{tpl.keyword}"
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{tpl.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tpl.desc}</p>
              </div>
            </div>

            <button
              onClick={() => handleUseTemplate(tpl.title)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> USE TEMPLATE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
