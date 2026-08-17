'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Play, ShieldAlert } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config';

export default function DemoBanner() {
  if (APP_CONFIG.mode !== 'demo') return null;

  return (
    <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 border-b border-purple-500/30 px-4 py-2 text-xs flex items-center justify-between text-purple-200 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-bold uppercase tracking-wider text-[10px] border border-purple-400/40">
          DEMO MODE
        </span>
        <span>
          Running with simulated Instagram events & zero-cost mock AI. No real API keys required.
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/simulator"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow"
        >
          <Play className="w-3 h-3 fill-white" /> Open IG Event Simulator
        </Link>
      </div>
    </div>
  );
}
