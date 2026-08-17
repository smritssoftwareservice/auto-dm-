'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, MousePointer, MessageSquare } from 'lucide-react';
import { DEMO_ANALYTICS } from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" /> Deep Analytics & Conversion Reports
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time breakdown of Instagram automation executions, lead conversion rates, and revenue.
          </p>
        </div>

        <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold">
          {['7d', '30d', '90d'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                period === p ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-purple-500/20 space-y-2">
          <span className="text-xs text-slate-400">Total Leads Captured</span>
          <div className="text-2xl font-extrabold text-white">{formatNumber(DEMO_ANALYTICS.totalLeads)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+18.4% vs last period</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-pink-500/20 space-y-2">
          <span className="text-xs text-slate-400">Conversion Rate</span>
          <div className="text-2xl font-extrabold text-white">{DEMO_ANALYTICS.conversionRate}%</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+3.2% vs last period</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-amber-500/20 space-y-2">
          <span className="text-xs text-slate-400">Product Revenue</span>
          <div className="text-2xl font-extrabold text-white">{formatCurrency(DEMO_ANALYTICS.revenue)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+31.0% vs last period</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-blue-500/20 space-y-2">
          <span className="text-xs text-slate-400">AI Responses Sent</span>
          <div className="text-2xl font-extrabold text-white">{formatNumber(DEMO_ANALYTICS.aiResponsesCount)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+42.5% vs last period</span>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Daily Performance Breakdown</h2>
        <div className="space-y-4 pt-2">
          {DEMO_ANALYTICS.chartData.map((item, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-400">{item.date}</span>
                <span className="text-purple-300">{item.conversations} DMs</span>
                <span className="text-emerald-400 font-bold">{item.leads} Leads</span>
                <span className="text-amber-400 font-bold">{formatCurrency(item.revenue)}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                <div 
                  className="bg-purple-600 h-full transition-all"
                  style={{ width: `${(item.leads / 50) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
