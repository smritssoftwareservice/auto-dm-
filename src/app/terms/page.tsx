import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | DMFlow AI - Meta Compliant SaaS',
  description: 'Terms of Service for DMFlow AI Instagram Auto-DM SaaS platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 p-6 md:p-12 text-left max-w-4xl mx-auto space-y-8">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            DMFlow <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        <Link
          href="/login"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all"
        >
          Sign In
        </Link>
      </div>

      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Meta Platform & API Terms
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs md:text-sm text-slate-400">Effective Date: August 19, 2026</p>
      </div>

      {/* Official Compliance Guarantee Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/30 to-pink-950/40 border border-purple-500/30 p-5 rounded-2xl flex items-start gap-3 shadow-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Official Meta Platform & API Compliance Guarantee</h3>
          <p className="text-xs text-purple-200 font-medium leading-relaxed">
            "DMFlow AI connects exclusively through official Meta Graph API endpoints. We never scrape credentials, use headless browser automation, or violate platform messaging limits."
          </p>
        </div>
      </div>

      {/* Terms Body */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 space-y-6 text-xs md:text-sm leading-relaxed text-slate-300">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DMFlow AI, you agree to be bound by these Terms of Service and all applicable laws and Meta platform guidelines.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white">2. Meta API & Platform Compliance</h2>
          <p>
            Users must comply with Meta’s Community Standards and Developer Policies. You agree not to send spam, unauthorized bulk commercial communications, or prohibited content using our automated workflow tools.
          </p>
        </section>

        <section className="space-y-2 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white">3. Platform Independence & Disclaimer</h2>
          <p className="text-purple-300 font-medium">
            DMFlow AI is an independent software application designed to interact with Meta Graph APIs. DMFlow AI is not endorsed, directly affiliated, maintained, authorized, or sponsored by Meta Platforms, Inc. or Instagram.
          </p>
        </section>
      </div>
    </div>
  );
}
