'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Zap, ShieldCheck, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config';

export default function BillingPage() {
  const currentPlan = APP_CONFIG.plans.PRO;

  const handleStripeCheckout = (planName: string) => {
    alert(`Stripe Test Mode Checkout initialized for ${planName} Plan! (sk_test_51...)`);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-purple-400" /> Subscription & Usage Billing
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Manage your Stripe subscription tier, usage execution limits, and invoices.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">Current Active Plan</span>
            <h2 className="text-xl font-bold text-white">PRO Plan ($29/month)</h2>
          </div>

          <button
            onClick={() => alert('Stripe Customer Portal Redirected')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Manage Stripe Subscription <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Usage Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs pt-2">
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-slate-400">Monthly Executions</span>
              <span className="text-white font-bold">342 / 5,000</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[7%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-slate-400">CRM Leads Saved</span>
              <span className="text-white font-bold">1,284 / 2,500</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full w-[51%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <span className="text-slate-400">Automations Active</span>
              <span className="text-white font-bold">3 / 25</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[12%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans Switcher */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Upgrade Subscription Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'PRO', price: '$29', limit: '5,000 executions/mo', active: true },
            { name: 'BUSINESS', price: '$79', limit: '25,000 executions/mo', active: false },
            { name: 'AGENCY', price: '$199', limit: '100,000 executions/mo', active: false },
          ].map(p => (
            <div key={p.name} className={`glass-card p-6 rounded-2xl border ${p.active ? 'border-purple-500 shadow-lg shadow-purple-600/20' : 'border-white/10'} space-y-4 text-xs`}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-base">{p.name}</span>
                {p.active && <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">CURRENT</span>}
              </div>
              <div className="text-2xl font-extrabold text-white">{p.price}<span className="text-slate-500 text-xs">/mo</span></div>
              <p className="text-slate-400">{p.limit}</p>
              {!p.active && (
                <button
                  onClick={() => handleStripeCheckout(p.name)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow transition-all"
                >
                  Upgrade via Stripe Test
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
