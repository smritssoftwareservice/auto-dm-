'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Bell, HelpCircle, ChevronDown, Command, 
  Sparkles, CheckCircle2, User, Building, LogOut, X
} from 'lucide-react';
import { DEMO_ORGANIZATION, DEMO_LEADS, DEMO_AUTOMATIONS, DEMO_PRODUCTS } from '@/lib/mock-data';
import { APP_CONFIG } from '@/lib/config';

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredLeads = DEMO_LEADS.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.instagramUsername.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAutomations = DEMO_AUTOMATIONS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredProducts = DEMO_PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between sticky top-0 z-40">
        {/* Organization Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-white">
            <Building className="w-4 h-4 text-purple-400" />
            <span>{DEMO_ORGANIZATION.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">PRO</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-400" /> Demo Mode
          </span>
        </div>

        {/* Center Search Input (Ctrl + K) */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-3 bg-slate-900/80 border border-white/10 hover:border-purple-500/40 text-slate-400 px-4 py-2 rounded-xl text-xs w-72 justify-between transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search CRM, automations...</span>
          </div>
          <kbd className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-0.5 font-mono">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-pink-500 absolute top-1.5 right-1.5 ring-2 ring-slate-900" />
            </button>

            {/* Notification Popup Menu */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-white/15 p-4 shadow-2xl z-50 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-white">Recent Notifications</span>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-300">🔥 New Hot Lead</span>
                      <span className="text-[10px] text-slate-500">5m ago</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">Rahul Sharma (@rahul_tech_coach) commented "PRICE".</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-300">💰 Digital Purchase</span>
                      <span className="text-[10px] text-slate-500">1h ago</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">Sneha Patel purchased 1-on-1 Consultation ($299).</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a 
            href="#help" 
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors" 
            title="Help Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Ctrl + K Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="glass-panel w-full max-w-xl rounded-2xl border border-white/20 p-4 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search leads, automations, products..."
                  className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-slate-500"
                />
              </div>
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-4 pr-1 text-xs">
              {/* Leads */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Leads</span>
                <div className="space-y-1">
                  {filteredLeads.map(lead => (
                    <Link
                      key={lead.id}
                      href="/dashboard/leads"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 rounded-lg bg-slate-900/60 hover:bg-purple-950/40 flex items-center justify-between transition-colors"
                    >
                      <span className="font-semibold text-white">{lead.name} (@{lead.instagramUsername})</span>
                      <span className="text-[10px] text-purple-400">Score: {lead.leadScore}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Automations */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Automations</span>
                <div className="space-y-1">
                  {filteredAutomations.map(auto => (
                    <Link
                      key={auto.id}
                      href="/dashboard/automations"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 rounded-lg bg-slate-900/60 hover:bg-purple-950/40 flex items-center justify-between transition-colors"
                    >
                      <span className="font-semibold text-white">{auto.name}</span>
                      <span className="text-[10px] text-emerald-400">Keyword: {auto.triggerKeyword}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
