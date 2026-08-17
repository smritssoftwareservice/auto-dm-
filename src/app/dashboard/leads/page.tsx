'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Download, Plus, Search, Filter, 
  Tag, Edit, Trash2, CheckCircle2, ChevronDown, Sparkles 
} from 'lucide-react';
import { DEMO_LEADS } from '@/lib/mock-data';
import { Lead, LeadStatus } from '@/types';

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | LeadStatus>('ALL');
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldType, setCustomFieldType] = useState('Text');

  const filtered = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.instagramUsername.toLowerCase().includes(search.toLowerCase()) ||
                          (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = 'Name,Instagram,Email,Phone,Status,Score,Tags\n';
    const rows = filtered.map(l => `"${l.name}","@${l.instagramUsername}","${l.email || ''}","${l.phone || ''}","${l.status}",${l.leadScore},"${l.tags.join(';')}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dmflow-leads-export-${Date.now()}.csv`;
    a.click();
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px]">🔥 Hot ({score})</span>;
    if (score >= 45) return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">⚡ Warm ({score})</span>;
    return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-extrabold text-[10px]">❄️ Cold ({score})</span>;
  };

  return (
    <div className="space-y-8 text-left max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" /> Multi-Tenant Lead CRM
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Capture, score, tag, and export contacts collected across Instagram DMs & forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCustomFieldModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-purple-400" /> Custom Lead Fields
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lead name, handle, email..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {['ALL', 'NEW', 'QUALIFIED', 'INTERESTED', 'CONVERTED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                statusFilter === st ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* CRM Leads Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Contact / Instagram</th>
                <th className="p-4">Lead Score</th>
                <th className="p-4">Status</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Last Interaction</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="p-4">
                    <div>
                      <span className="font-bold text-white block text-sm">{lead.name}</span>
                      <span className="text-purple-400 font-medium">@{lead.instagramUsername}</span>
                      {lead.email && <span className="text-slate-500 block text-[11px] mt-0.5">{lead.email}</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    {getScoreBadge(lead.leadScore)}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-purple-300 font-bold text-[10px]">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-emerald-400">
                    {lead.budget || 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {lead.tags.map((tg, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px]">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">
                    {new Date(lead.lastInteractionAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="/dashboard/inbox"
                      className="px-3 py-1.5 rounded-lg bg-purple-600/30 text-purple-300 font-bold hover:bg-purple-600 hover:text-white transition-all inline-block"
                    >
                      Chat DM
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Lead Field Modal */}
      {showCustomFieldModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">Create Custom Lead Field</h3>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Field Name</label>
              <input
                type="text"
                value={customFieldName}
                onChange={e => setCustomFieldName(e.target.value)}
                placeholder="e.g. Property Type / Target Niche"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Field Type</label>
              <select
                value={customFieldType}
                onChange={e => setCustomFieldType(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Text">Text</option>
                <option value="Number">Number</option>
                <option value="Boolean">Yes / No (Boolean)</option>
                <option value="Date">Date</option>
                <option value="Select">Dropdown Select</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCustomFieldModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => { alert(`Custom Field "${customFieldName}" created!`); setShowCustomFieldModal(false); }}
                className="flex-1 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white shadow"
              >
                Save Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
