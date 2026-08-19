'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, MessageSquare, Zap, DollarSign, ArrowUpRight, 
  MousePointer, Play, Plus, TrendingUp, Sparkles, Activity, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function MainDashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [meRes, analyticsRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/analytics'),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          setUserData(meData);
        }

        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setAnalytics(analyticsData);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalLeads = analytics?.totalLeads || 0;
  const totalConversations = analytics?.totalConversations || 0;
  const conversionRate = analytics?.conversionRate || 0;
  const revenue = analytics?.revenue || 0;
  const aiResponsesCount = analytics?.aiResponsesCount || 0;
  const linkViews = analytics?.linkViews || 0;
  const chartData = analytics?.chartData || [];

  const stats = [
    { label: 'Total CRM Leads', value: formatNumber(totalLeads), change: 'Live Data', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'New Conversations', value: formatNumber(totalConversations), change: 'Live Data', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, change: 'Real-time', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Total Revenue', value: formatCurrency(revenue), change: 'Test Mode', icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'AI Responses', value: formatNumber(aiResponsesCount), change: 'AI Engine', icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Link-in-Bio Views', value: formatNumber(linkViews), change: 'Public Link', icon: MousePointer, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
  ];

  const userName = userData?.user?.name || 'Creator';
  const orgName = userData?.organization?.name || 'Your Workspace';
  const connectedAccount = userData?.organization?.instagramAccounts?.[0];

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome Back, {userName} 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Workspace: <strong className="text-purple-400">{orgName}</strong> • {connectedAccount ? `@${connectedAccount.username} connected` : 'Connect Instagram to start capturing leads'}
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
            href="/dashboard/automations/builder/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Automation
          </Link>
        </div>
      </div>

      {/* Top Metrics Cards Grid */}
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
                <span className="text-xs font-semibold text-purple-400 flex items-center gap-0.5">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <span className="text-xs font-semibold text-purple-400">{stat.change}</span>
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
          {chartData.length > 0 ? (
            <div className="space-y-4 pt-2">
              {chartData.map((item: any, idx: number) => {
                const maxLeads = 20;
                const barWidth = Math.min(100, Math.max(8, (item.leads / maxLeads) * 100));
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
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              No daily chart activity recorded yet. Connect Instagram and trigger your first comment to watch analytics update live!
            </div>
          )}
        </div>

        {/* Right Column: Status & Onboarding Feed */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">System Status</h3>
            <Link href="/dashboard/leads" className="text-xs text-purple-400 hover:underline">View CRM</Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Meta Webhooks</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">READY</span>
              </div>
              <p className="text-slate-400 text-[11px]">Meta verification token active. Subscriptions listening.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">AI Assistant Engine</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">ACTIVE</span>
              </div>
              <p className="text-slate-400 text-[11px]">Strict Knowledge Base guardrails enforcing zero hallucination.</p>
            </div>

            {!connectedAccount && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <span className="font-bold block flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> Action Needed
                </span>
                <p className="text-slate-300 text-[11px]">
                  Connect your Instagram account to start receiving comments and automated DM requests.
                </p>
                <Link
                  href="/dashboard/instagram"
                  className="inline-block px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition-all"
                >
                  Connect Instagram Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
