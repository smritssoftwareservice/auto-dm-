'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_LINK_PAGE } from '@/lib/mock-data';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function PublicBioPage({ params }: { params: { username: string } }) {
  const page = DEMO_LINK_PAGE;

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col items-center justify-between p-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md my-auto space-y-6 text-center relative z-10">
        {/* Profile Avatar & Header */}
        <div className="space-y-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mx-auto p-1 shadow-2xl shadow-purple-600/30">
            <img 
              src={page.avatarUrl} 
              alt={page.title} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{page.title}</h1>
            <p className="text-xs text-purple-400 font-medium mt-0.5">@{page.username}</p>
            <p className="text-xs text-slate-300 max-w-xs mx-auto mt-2 leading-relaxed">{page.bio}</p>
          </div>
        </div>

        {/* Link Blocks */}
        <div className="space-y-3 pt-2">
          {page.blocks.filter(b => b.enabled).map(b => {
            if (b.type === 'HEADER') {
              return (
                <h2 key={b.id} className="text-xs font-bold text-purple-400 uppercase tracking-widest text-left pt-3 border-b border-white/10 pb-1">
                  {b.title}
                </h2>
              );
            }

            return (
              <a
                key={b.id}
                href={b.url || '#'}
                target={b.url?.startsWith('http') ? '_blank' : '_self'}
                className={`w-full p-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-between shadow-lg group ${
                  b.type === 'PRODUCT'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.02] shadow-purple-600/30'
                    : 'glass-card border border-white/10 text-slate-100 hover:border-purple-500/40 hover:bg-white/10'
                }`}
              >
                <div className="text-left">
                  <span className="block text-sm font-bold">{b.title}</span>
                  {b.content && <span className="text-[11px] text-slate-300 font-normal block mt-0.5">{b.content}</span>}
                </div>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="py-4 text-center text-xs text-slate-500 flex items-center gap-1.5 justify-center">
        <span>Powered by</span>
        <Link href="/" className="font-bold text-white hover:text-purple-400">DMFlow AI</Link>
      </div>
    </div>
  );
}
