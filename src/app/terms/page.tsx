import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-12 text-left max-w-4xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">DMFlow <span className="gradient-text">AI</span></span>
      </Link>

      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last updated: August 17, 2026</p>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 text-xs leading-relaxed text-slate-300">
        <h2 className="text-sm font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By creating an account on DMFlow AI, you agree to comply with all terms, usage limits, and platform rules outlined herein.
        </p>

        <h2 className="text-sm font-bold text-white">2. Meta API Compliance</h2>
        <p>
          Users must not send spam, offensive content, or violate Meta Instagram Platform Guidelines through automated workflows.
        </p>

        <h2 className="text-sm font-bold text-white">3. Disclaimer</h2>
        <p className="text-purple-300 font-semibold">
          DMFlow AI is an independent software product and is not endorsed by or affiliated with Meta Platforms, Inc. or Instagram unless officially applicable.
        </p>
      </div>
    </div>
  );
}
