'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, RefreshCw, ShieldAlert, 
  ExternalLink, Key, AlertCircle, Play
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';
import { DEMO_INSTAGRAM_ACCOUNT } from '@/lib/mock-data';

export default function InstagramPage() {
  const [account, setAccount] = useState(DEMO_INSTAGRAM_ACCOUNT);

  const handleReconnect = () => {
    alert('In Production Mode, this opens official Meta OAuth dialog (https://www.facebook.com/v18.0/dialog/oauth).');
  };

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <InstagramIcon className="w-8 h-8 text-pink-400" /> Instagram Account Connection
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Manage your connected Meta Instagram Professional account and Graph API access tokens.
        </p>
      </div>

      {/* Connection Card */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={account.profileImage} 
              alt={account.username} 
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-500/50 shadow-lg" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">@{account.username}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                42.8k Followers • Business Account Linked • Token Valid
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReconnect}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reconnect OAuth
            </button>
            <Link
              href="/dashboard/simulator"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Open Simulator
            </Link>
          </div>
        </div>

        {/* Required Meta API Capabilities & Permissions Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white">Official Meta Graph API Permissions Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_basic</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_manage_messages</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_manage_comments</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">pages_messaging</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-purple-200">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            <span>Meta API Safety & Compliance Standard</span>
          </div>
          <p>
            DMFlow AI connects exclusively through official Meta Graph API endpoints. We never scrape credentials, use headless browser automation, or violate platform messaging limits.
          </p>
        </div>
      </div>
    </div>
  );
}
