'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Link2, Eye, Plus, Trash2, Globe, ExternalLink, 
  Sparkles, CheckCircle2, Save, MoveUp, MoveDown 
} from 'lucide-react';
import { DEMO_LINK_PAGE } from '@/lib/mock-data';
import { LinkBlock, BlockType } from '@/types';

export default function LinkInBioEditorPage() {
  const [page, setPage] = useState(DEMO_LINK_PAGE);
  const [blocks, setBlocks] = useState<LinkBlock[]>(DEMO_LINK_PAGE.blocks);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<BlockType>('LINK');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSavePage = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const addBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const block: LinkBlock = {
      id: `b_${Date.now()}`,
      type: newType,
      title: newTitle,
      url: newUrl || undefined,
      enabled: true,
      order: blocks.length + 1,
    };

    setBlocks(prev => [...prev, block]);
    setNewTitle('');
    setNewUrl('');
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const toggleBlock = (id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));
  };

  return (
    <div className="space-y-8 text-left max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Link2 className="w-8 h-8 text-emerald-400" /> Link-in-Bio Builder
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Public Link Page: <strong className="text-purple-400 font-mono">http://localhost:3000/bio/{page.username}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/bio/${page.username}`}
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-purple-400" /> Preview Live Page <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleSavePage}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save & Publish
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Link-in-Bio Page Updated & Published Successfully!
        </div>
      )}

      {/* Builder Layout: Left Controls, Right Phone Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Settings & Block Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile & Theme Config */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white">Profile Details & Theme</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Page Title</label>
                <input
                  type="text"
                  value={page.title}
                  onChange={e => setPage({ ...page, title: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Theme Palette</label>
                <select
                  value={page.theme}
                  onChange={e => setPage({ ...page, theme: e.target.value as any })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="glass">Glassmorphism (Dark)</option>
                  <option value="midnight">Midnight Purple</option>
                  <option value="emerald">Emerald Neon</option>
                  <option value="sunset">Sunset Gradient</option>
                  <option value="minimal">Minimalist Monokai</option>
                </select>
              </div>
            </div>
            <div className="text-xs">
              <label className="font-semibold text-slate-300 block mb-1">Bio Text</label>
              <textarea
                rows={2}
                value={page.bio}
                onChange={e => setPage({ ...page, bio: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Add Block Form */}
          <form onSubmit={addBlock} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
            <h2 className="text-base font-bold text-white">Add New Content Block</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Block Title (e.g. 🎓 AI Masterclass)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 sm:col-span-2"
              />
              <select
                value={newType}
                onChange={e => setNewType(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="LINK">Custom Link</option>
                <option value="HEADER">Section Header</option>
                <option value="PRODUCT">Product Link</option>
                <option value="FORM">Form Lead Capture</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Target URL (e.g. /p/ai-masterclass)"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Block to Bio Page
            </button>
          </form>

          {/* Block Reordering & Toggle List */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
            <h2 className="text-base font-bold text-white">Manage Link Blocks ({blocks.length})</h2>
            <div className="space-y-3">
              {blocks.map(b => (
                <div key={b.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{b.title}</span>
                    <span className="text-[10px] text-purple-400 font-mono">{b.type} • {b.url || 'Header'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleBlock(b.id)} className={`text-[10px] px-2 py-0.5 rounded font-bold ${b.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                      {b.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                    <button onClick={() => removeBlock(b.id)} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Mobile Device Mockup */}
        <div className="flex justify-center">
          <div className="w-80 h-[580px] bg-[#09090b] border-4 border-slate-800 rounded-[40px] p-4 shadow-2xl overflow-y-auto flex flex-col justify-between text-center relative space-y-4">
            <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />
            
            <div className="space-y-3">
              <img src={page.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-purple-500" />
              <div>
                <h3 className="text-sm font-bold text-white">{page.title}</h3>
                <p className="text-[11px] text-slate-400 px-2 mt-1">{page.bio}</p>
              </div>

              {/* Render Blocks */}
              <div className="space-y-2 pt-2">
                {blocks.filter(b => b.enabled).map(b => (
                  <div
                    key={b.id}
                    className={`p-3 rounded-xl text-xs font-bold shadow transition-all ${
                      b.type === 'HEADER'
                        ? 'bg-transparent text-purple-400 text-left border-b border-white/10 uppercase tracking-wider text-[10px]'
                        : b.type === 'PRODUCT'
                        ? 'bg-purple-600 text-white hover:opacity-90'
                        : 'bg-slate-900 border border-white/10 text-slate-200'
                    }`}
                  >
                    {b.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] text-slate-600 pb-2">
              Powered by DMFlow AI Link-in-Bio
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
