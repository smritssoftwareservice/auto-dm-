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

      {/* Official Compliance Declaration Highlight Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/30 to-pink-950/40 border border-purple-500/30 p-5 rounded-2xl flex items-start gap-3 shadow-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Official Meta Platform & API Compliance Guarantee</h3>
          <p className="text-xs text-purple-200 font-medium leading-relaxed">
            "DMFlow AI connects exclusively through official Meta Graph API endpoints. We never scrape credentials, use headless browser automation, or violate platform messaging limits."
          </p>
        </div>
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
            <Eye className="w-4 h-4 text-purple-400" /> 2. Data We Collect & Storage Limits
          </h2>
          <p>
            We store only the metadata strictly necessary to execute user-configured automations, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>Encrypted Meta Page Access Tokens for authenticated Graph API calls.</li>
            <li>Incoming comment & direct message metadata required to deliver automated replies.</li>
            <li>Lead profile handles & interaction logs created within your DMFlow workspace.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" /> 3. Data Deletion & User Rights (Data Deletion Callback)
          </h2>
          <p>
            Users can revoke access at any time through their Facebook / Instagram Settings or by requesting complete account deletion from DMFlow AI settings.
            Upon access revocation or deletion, all stored tokens and conversation logs are permanently purged within 24 hours.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> 4. Security & Compliance
          </h2>
          <p>
            All data in transit is encrypted using TLS 1.3. Session cookies use strict HTTP-only, SameSite encryption.
            DMFlow AI complies with Meta Developer Policies and Meta Platform Terms.
          </p>
        </section>
      </div>
    </div>
  );
}
