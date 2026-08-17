'use client';

import React from 'react';
import { ShieldCheck, Activity, Users, Building, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { DEMO_LEADS, DEMO_AUTOMATIONS } from '@/lib/mock-data';

export default function AdminPanelPage() {
  const orgs = [
    { id: '1', name: 'Vamshi Digital', plan: 'PRO', users: 3, executions: 342, status: 'ACTIVE' },
    { id: '2', name: 'Rahul Coaching Lab', plan: 'FREE', users: 1, executions: 42, status: 'ACTIVE' },
    { id: '3', name: 'Sneha Design Studio', plan: 'BUSINESS', users: 5, executions: 2140, status: 'ACTIVE' },
  ];

  const errorLogs = [
    { id: 'e1', route: '/api/webhooks/instagram', error: 'Signature mismatch verification timeout', time: '10 mins ago' },
    { id: 'e2', route: '/api/ai/generate', error: 'OpenAI API rate limit fallback to Mock AI', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-pink-400" /> Super Admin Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Global system health monitor, webhooks audit log, and organization management.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
          Super Admin Access
        </span>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="glass-card p-4 rounded-xl border border-emerald-500/20 space-y-1">
          <span className="text-slate-400">System Status</span>
          <div className="text-base font-extrabold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 99.98% Operational
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-purple-500/20 space-y-1">
          <span className="text-slate-400">Total Organizations</span>
          <div className="text-base font-extrabold text-white">412</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-blue-500/20 space-y-1">
          <span className="text-slate-400">Active Webhooks / min</span>
          <div className="text-base font-extrabold text-white">1,490 events</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-amber-500/20 space-y-1">
          <span className="text-slate-400">Errors Logged (24h)</span>
          <div className="text-base font-extrabold text-amber-400">2 events</div>
        </div>
      </div>

      {/* Global Organizations Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white">Global Platform Organizations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-3">Organization</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Users</th>
                <th className="p-3">Monthly Executions</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {orgs.map(o => (
                <tr key={o.id} className="hover:bg-purple-950/20">
                  <td className="p-3 font-bold text-white">{o.name}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">{o.plan}</span></td>
                  <td className="p-3">{o.users} members</td>
                  <td className="p-3">{o.executions}</td>
                  <td className="p-3"><span className="text-emerald-400 font-bold">{o.status}</span></td>
                  <td className="p-3 text-right">
                    <button onClick={() => alert(`Viewing org ${o.name}`)} className="text-purple-400 hover:underline">Inspect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Error Logs */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> Recent Application Errors
        </h2>
        <div className="space-y-2">
          {errorLogs.map(err => (
            <div key={err.id} className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-mono text-purple-400 font-bold">{err.route}</span>
                <p className="text-slate-300 text-[11px] mt-0.5">{err.error}</p>
              </div>
              <span className="text-slate-500 text-[10px]">{err.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
