'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, RefreshCw, ShieldAlert, 
  ExternalLink, Key, AlertCircle, Play, Sparkles, Zap, ShieldCheck
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';
import { DEMO_INSTAGRAM_ACCOUNT } from '@/lib/mock-data';

function InstagramContent() {
  const searchParams = useSearchParams();
  const [account, setAccount] = useState(DEMO_INSTAGRAM_ACCOUNT);
  const [connecting, setConnecting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [customHandle, setCustomHandle] = useState('vamshi_ai');

  useEffect(() => {
    const error = searchParams?.get('error');
    const connected = searchParams?.get('connected');

    if (connected === 'true') {
      setNotice('✅ Live Meta Instagram Account Connected Successfully!');
    } else if (error === 'missing_meta_app_id') {
      setNotice('⚠️ Meta App ID is not configured in .env. Switched to Zero-Cost Sandbox Mode.');
    } else if (error === 'oauth_denied') {
      setNotice('❌ Meta OAuth authorization was canceled or denied.');
    }
  }, [searchParams]);

  const handleConnectLiveMeta = () => {
    setConnecting(true);
    window.location.href = '/api/instagram/connect';
  };

  const handleConnectSandbox = (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);

    setTimeout(() => {
      setAccount({
        ...account,
        username: customHandle.replace('@', ''),
        status: 'CONNECTED',
      });
      setConnecting(false);
      setShowConnectModal(false);
      setNotice(`✅ Zero-Cost Sandbox Account @${customHandle.replace('@', '')} Linked Successfully!`);
    }, 800);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <InstagramIcon className="w-8 h-8 text-pink-400" /> Instagram Account Connection
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Manage your connected Meta Instagram Professional account, sandbox modes, and Graph API access tokens.
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" /> Connect / Switch Account
        </button>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-slate-400 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Main Connection Card */}
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
                42.8k Followers • Professional Account Linked • Graph API Token Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reconnect Account
            </button>
            <Link
              href="/dashboard/simulator"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Open IG Simulator
            </Link>
          </div>
        </div>

        {/* Required Meta API Capabilities & Permissions Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Official Meta Graph API Permissions Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_basic</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_manage_messages</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">instagram_manage_comments</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-medium">pages_messaging</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
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

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-6 md:p-8 rounded-3xl max-w-lg w-full space-y-6 text-left relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <InstagramIcon className="w-6 h-6 text-pink-400" /> Connect Instagram Account
              </h3>
              <button onClick={() => setShowConnectModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option A: Live Meta OAuth */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <span className="font-bold text-white block text-sm flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-purple-400" /> Option 1: Official Meta Facebook OAuth
                </span>
                <p className="text-slate-400 text-[11px]">
                  Opens official Facebook login window (`https://www.facebook.com/v19.0/dialog/oauth`). Requires `META_APP_ID` in settings or `.env`.
                </p>
                <button
                  type="button"
                  onClick={handleConnectLiveMeta}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all"
                >
                  {connecting ? 'Opening Meta OAuth...' : 'Launch Meta OAuth Login'}
                </button>
              </div>

              {/* Option B: Zero-Cost Sandbox Mode */}
              <form onSubmit={handleConnectSandbox} className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                <span className="font-bold text-white block text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Option 2: Instant Zero-Cost Sandbox Mode (Recommended)
                </span>
                <p className="text-slate-400 text-[11px]">
                  No Meta App ID required. Connect a simulated handle immediately to test all AI automations and comments.
                </p>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={customHandle}
                    onChange={e => setCustomHandle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold transition-all"
                >
                  {connecting ? 'Connecting Sandbox...' : '⚡ Link Zero-Cost Sandbox Account'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstagramPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading Instagram Settings...</div>}>
      <InstagramContent />
    </Suspense>
  );
}
