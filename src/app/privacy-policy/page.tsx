import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | DMFlow AI - Meta Compliant SaaS',
  description: 'Official Privacy Policy for DMFlow AI Instagram Auto-DM and CRM SaaS platform.',
};

export default function PrivacyPolicyPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Meta Platform & API Compliant Policy
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs md:text-sm text-slate-400">Effective Date: August 19, 2026</p>
      </div>

      {/* Policy Content Body */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 space-y-8 text-xs md:text-sm leading-relaxed text-slate-300">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" /> 1. Meta / Instagram Graph API Access & Data Protection
          </h2>
          <p>
            DMFlow AI connects to Meta Instagram Professional accounts exclusively through official Meta Graph API endpoints (`https://graph.facebook.com/v19.0/`).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>We <strong>never</strong> request, store, or scrape user Instagram passwords.</li>
            <li>Authentication is handled entirely via Meta's official OAuth authorization dialog (`dialog/oauth`).</li>
            <li>We request only the minimum required permissions: <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded">instagram_basic</code>, <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded">instagram_manage_messages</code>, and <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded">instagram_manage_comments</code>.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-pink-400" /> 2. Information We Collect
          </h2>
          <p>
            When you register for DMFlow AI or authorize your Instagram account, we collect the following data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Account Registration</span>
              <p className="text-slate-400">User full name, work email address, and encrypted PBKDF2 password hashes.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Instagram Account Data</span>
              <p className="text-slate-400">Instagram username, Business User ID, profile avatar URL, and encrypted Graph API access tokens.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Automation Leads & Messages</span>
              <p className="text-slate-400">Public Instagram handles, message text, and lead tags collected during automated DM responses.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="font-bold text-white block">Technical Logs</span>
              <p className="text-slate-400">IP address, session tokens, and webhook event idempotency IDs.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 3. Multi-Tenant Data Isolation & Security
          </h2>
          <p>
            All customer data, CRM leads, and conversation histories are strictly isolated per organization using <code className="text-purple-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded">organizationId</code> scoping. Customer data is never shared or commingled across accounts.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" /> 4. Data Retention & Deletion Rights
          </h2>
          <p>
            Users may disconnect their Instagram accounts or request complete deletion of their account data at any time by contacting <a href="mailto:support@dmflow.ai" className="text-purple-400 underline">support@dmflow.ai</a> or using the account deletion control inside Dashboard Settings.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-1">
          <span className="font-bold text-purple-200 block">Trademark & Affiliation Disclaimer</span>
          <p>
            DMFlow AI is an independent software application developed by Smrits Software Service. Instagram and Meta are registered trademarks of Meta Platforms, Inc.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500 border-t border-white/10 pt-6">
        © 2026 DMFlow AI. All rights reserved. • <Link href="/terms" className="hover:underline text-slate-400">Terms of Service</Link>
      </div>
    </div>
  );
}
