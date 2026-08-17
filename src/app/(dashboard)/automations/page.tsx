'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Plus, Play, Layers, CheckCircle2, PauseCircle, 
  FileText, Search, MoreVertical, Edit3, Trash2
} from 'lucide-react';
import { DEMO_AUTOMATIONS } from '@/lib/mock-data';
import { AutomationStatus } from '@/types';

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(DEMO_AUTOMATIONS);
  const [filter, setFilter] = useState<'ALL' | AutomationStatus>('ALL');

  const filtered = automations.filter(a => filter === 'ALL' || a.status === filter);

  const toggleStatus = (id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus: AutomationStatus = a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-purple-400" /> Instagram Automations
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Build comment-to-DM triggers, keyword responses, and AI conversation funnels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/templates"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-400" /> Starter Templates
          </Link>
          <Link
            href="/dashboard/automations/builder/new"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Visual Automation Builder
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold">
          {['ALL', 'ACTIVE', 'PAUSED', 'DRAFT'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === tab ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filtered.length} Automations
        </span>
      </div>

      {/* Automations Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(auto => (
          <div key={auto.id} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 ${
                  auto.status === 'ACTIVE' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {auto.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                  {auto.status}
                </span>
                <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {auto.triggerKeyword || 'KEYWORD'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{auto.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{auto.description}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Executions</span>
                  <span className="text-white font-extrabold">{auto.executionCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Conversions</span>
                  <span className="text-emerald-400 font-extrabold">{auto.conversionCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <button
                onClick={() => toggleStatus(auto.id)}
                className="text-slate-400 hover:text-white font-medium"
              >
                {auto.status === 'ACTIVE' ? 'Pause' : 'Activate'}
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/simulator"
                  className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-400"
                  title="Test in Simulator"
                >
                  <Play className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/dashboard/automations/builder/${auto.id}`}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit Flow
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
