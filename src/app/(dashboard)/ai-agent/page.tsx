'use client';

import React, { useState } from 'react';
import { 
  Bot, Sparkles, BookOpen, Plus, Save, Trash2, 
  CheckCircle2, HelpCircle, FileText, AlertCircle 
} from 'lucide-react';
import { DEMO_AI_CONFIG, DEMO_KNOWLEDGE_BASE } from '@/lib/mock-data';
import { KnowledgeDocument } from '@/types';

export default function AIAgentPage() {
  const [config, setConfig] = useState(DEMO_AI_CONFIG);
  const [kbDocs, setKbDocs] = useState<KnowledgeDocument[]>(DEMO_KNOWLEDGE_BASE);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'FAQ' | 'PRODUCT' | 'POLICY' | 'GENERAL'>('FAQ');
  const [newContent, setNewContent] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddKbDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const doc: KnowledgeDocument = {
      id: `kb_${Date.now()}`,
      organizationId: config.organizationId,
      title: newTitle,
      category: newCategory,
      content: newContent,
      updatedAt: new Date().toISOString(),
    };

    setKbDocs(prev => [doc, ...prev]);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteDoc = (id: string) => {
    setKbDocs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-pink-400" /> AI Agent & Knowledge Base
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Train your 24/7 AI chatbot assistant with custom business rules, FAQs, and strict boundaries.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save AI Configuration
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Assistant Configuration & Knowledge Base Updated Successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Agent Settings Form */}
        <form onSubmit={handleSaveConfig} className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="w-5 h-5 text-purple-400" /> Core Agent Profile & Instructions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Agent Name</label>
              <input
                type="text"
                value={config.agentName}
                onChange={e => setConfig({ ...config, agentName: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Personality & Tone</label>
              <select
                value={config.tone}
                onChange={e => setConfig({ ...config, tone: e.target.value as any })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Friendly">Friendly & Approachable</option>
                <option value="Professional">Professional & Direct</option>
                <option value="Casual">Casual & Conversational</option>
                <option value="Sales">High-Intent Sales Focused</option>
                <option value="Expert">Authoritative Expert</option>
              </select>
            </div>
          </div>

          <div className="text-xs space-y-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Business Description</label>
              <textarea
                rows={2}
                value={config.businessDescription}
                onChange={e => setConfig({ ...config, businessDescription: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Master Prompt Instructions</label>
              <textarea
                rows={4}
                value={config.instructions}
                onChange={e => setConfig({ ...config, instructions: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Strict Fallback Response (Missing Info)</label>
              <textarea
                rows={2}
                value={config.fallbackMessage}
                onChange={e => setConfig({ ...config, fallbackMessage: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">AI will NEVER invent false prices or policies. It uses this fallback when data is unavailable.</span>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Human Handoff Trigger Message</label>
              <input
                type="text"
                value={config.handoffMessage}
                onChange={e => setConfig({ ...config, handoffMessage: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </form>

        {/* Right Column: Knowledge Base Editor */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 text-xs">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <BookOpen className="w-5 h-5 text-pink-400" /> Knowledge Base Documents
          </h2>

          {/* Add New Document Form */}
          <form onSubmit={handleAddKbDoc} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
            <span className="font-bold text-white block">Add Knowledge Document</span>
            <input
              type="text"
              placeholder="Title (e.g. Masterclass Price)"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="FAQ">FAQ</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="POLICY">POLICY</option>
              <option value="GENERAL">GENERAL</option>
            </select>
            <textarea
              rows={3}
              placeholder="Content details, prices, refund rules..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Document
            </button>
          </form>

          {/* Documents List */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-400 block">Existing Documents ({kbDocs.length})</span>
            {kbDocs.map(doc => (
              <div key={doc.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5 relative group">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate max-w-[180px]">{doc.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold">
                      {doc.category}
                    </span>
                    <button onClick={() => handleDeleteDoc(doc.id)} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-2">{doc.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
