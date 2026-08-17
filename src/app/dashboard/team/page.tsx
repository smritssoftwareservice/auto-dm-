'use client';

import React, { useState } from 'react';
import { UserPlus, Plus, ShieldCheck, Mail, CheckCircle2, User } from 'lucide-react';
import { UserRole } from '@/types';

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: '1', name: 'Vamshi Krishna', email: 'vamshi@dmflow.ai', role: 'OWNER' as UserRole, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: '2', name: 'Ananya Rao', email: 'ananya@dmflow.ai', role: 'ADMIN' as UserRole, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { id: '3', name: 'Kiran Kumar', email: 'kiran@dmflow.ai', role: 'AGENT' as UserRole, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  ]);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('AGENT');
  const [showModal, setShowModal] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setMembers(prev => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      },
    ]);

    setEmail('');
    setShowModal(false);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-purple-400" /> Team & Member Roles
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Manage organization members and role permissions (Owner, Admin, Agent, Viewer).
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Invite Team Member
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-purple-950/20 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-purple-500/40" />
                  <span className="font-bold text-white text-sm">{m.name}</span>
                </td>
                <td className="p-4 text-slate-400">{m.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase ${
                    m.role === 'OWNER' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    m.role === 'ADMIN' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {m.role}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-400 text-[11px]">
                  {m.role === 'OWNER' ? 'Full Control + Billing' : m.role === 'ADMIN' ? 'Manage Automations & CRM' : 'Manage Inbox & DMs'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleInvite} className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">Invite Team Member</h3>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Role Permission</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="ADMIN">ADMIN (Full management)</option>
                <option value="AGENT">AGENT (Inbox & Conversations)</option>
                <option value="VIEWER">VIEWER (Read-only analytics)</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white shadow"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
