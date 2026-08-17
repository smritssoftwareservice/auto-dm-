'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, MessageSquare, Zap, DollarSign, ArrowUpRight, 
  MousePointer, Play, Plus, TrendingUp, Sparkles, Activity, CheckCircle2
} from 'lucide-react';
import { 
  DEMO_ANALYTICS, DEMO_LEADS, DEMO_CONVERSATIONS, 
  DEMO_AUTOMATIONS, DEMO_ORGANIZATION 
} from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function MainDashboardPage() {
  const stats = [
    { label: 'Total CRM Leads', value: formatNumber(DEMO_ANALYTICS.totalLeads), change: '+18.4%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'New Conversations', value: formatNumber(DEMO_ANALYTICS.totalConversations), change: '+24.1%', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
    { label: 'Conversion Rate', value: `${DEMO_ANALYTICS.conversionRate}%`, change: '+3.2%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Total Revenue', value: formatCurrency(DEMO_ANALYTICS.revenue), change: '+31.0%', icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'AI Responses', value: formatNumber(DEMO_ANALYTICS.aiResponsesCount), change: '+42.5%', icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Active Automations', value: DEMO_AUTOMATIONS.length, change: '100% Active', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Link-in-Bio Views', value: formatNumber(DEMO_ANALYTICS.linkViews), change: '+12.8%', icon: MousePointer, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
  ];

  const recentActivities = [
    { type: 'LEAD', title: 'New Lead Captured', desc: 'Rahul Sharma (@rahul_tech_coach) scored 88 (Hot)', time: '5 mins ago', badge: 'NEW LEAD', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { type: 'CONVERSATION', title: 'Automation Triggered', desc: 'Keyword PRICE matched on Post #101', time: '12 mins ago', badge: 'AUTOMATION', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
    { type: 'PURCHASE', title: 'Digital Product Purchase', desc: 'Sneha Patel bought 1-on-1 Consultation ($299)', time: '1 hour ago', badge: 'REVENUE', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { type: 'FORM', title: 'Form Submission', desc: 'Consultation booking form filled by Priya Roy', time: '2 hours ago', badge: 'FORM', badgeColor: 'bg-blue-500/20 text-blue-300' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome Back, Vamshi 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Organization <strong className="text-purple-400">{DEMO_ORGANIZATION.name}</strong> • @demo_creator is active and capturing leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/simulator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-950/80 border border-purple-500/40 hover:bg-purple-900/80 transition-all shadow-md"
          >
            <Play className="w-4 h-4 text-purple-300 fill-purple-300" /> Event Simulator
          </Link>
          <Link
            href="/dashboard/automations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Automation
          </Link>
        </div>
      </div>

      {/* Top 7 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.slice(0, 4).map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`glass-card p-5 rounded-2xl border ${stat.bg} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className={`p-2 rounded-xl bg-slate-900 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.slice(4).map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`glass-card p-4 rounded-xl border ${stat.bg} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-slate-900 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">{stat.label}</span>
                  <span className="text-lg font-extrabold text-white">{stat.value}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Analytics Overview */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" /> Weekly Growth Analytics
              </h3>
              <p className="text-xs text-slate-400">Leads captured and revenue generated over the past 7 days</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300">Last 7 Days</span>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-4 pt-2">
            {DEMO_ANALYTICS.chartData.map((item, idx) => {
              const maxLeads = 50;
              const barWidth = Math.min(100, Math.max(10, (item.leads / maxLeads) * 100));
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400 w-16">{item.date}</span>
                    <span className="text-purple-300 font-bold">{item.leads} Leads</span>
                    <span className="text-amber-400 font-bold">{formatCurrency(item.revenue)}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">Recent Activity</h3>
            <Link href="/dashboard/leads" className="text-xs text-purple-400 hover:underline">View CRM</Link>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5 hover:border-purple-500/20 transition-all">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${act.badgeColor}`}>
                    {act.badge}
                  </span>
                  <span className="text-[10px] text-slate-500">{act.time}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{act.title}</h4>
                <p className="text-[11px] text-slate-400">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
