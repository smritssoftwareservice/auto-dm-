'use client';

import React, { useState } from 'react';
import { X, Check, MessageSquare, Plus, Trash2, Tag } from 'lucide-react';

interface CommentConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditionType: 'ANY' | 'CONTAINS' | 'EXACT' | 'MULTIPLE';
  keywords: string[];
  onSave: (conditionType: 'ANY' | 'CONTAINS' | 'EXACT' | 'MULTIPLE', keywords: string[]) => void;
}

export default function CommentConditionModal({
  isOpen,
  onClose,
  conditionType,
  keywords,
  onSave,
}: CommentConditionModalProps) {
  const [selectedType, setSelectedType] = useState(conditionType);
  const [keywordList, setKeywordList] = useState<string[]>(keywords.length > 0 ? keywords : ['GUIDE', 'PRICE']);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  if (!isOpen) return null;

  const handleAddKeyword = () => {
    if (!newKeywordInput.trim()) return;
    const clean = newKeywordInput.trim().toUpperCase();
    if (!keywordList.includes(clean)) {
      setKeywordList(prev => [...prev, clean]);
    }
    setNewKeywordInput('');
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywordList(prev => prev.filter(k => k !== kw));
  };

  const handleSave = () => {
    onSave(selectedType, keywordList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" /> Edit Comment Condition
            </h3>
            <p className="text-xs text-slate-400">
              Configure which comments will trigger this Auto-DM automation flow.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-left">
          {/* Condition Type Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Trigger Matching Mode
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'ANY', title: 'Any Comment', desc: 'Trigger on every single comment left on the post' },
                { id: 'CONTAINS', title: 'Contains Keyword', desc: 'Trigger if comment contains specific word(s)' },
                { id: 'EXACT', title: 'Exact Keyword Match', desc: 'Trigger only if comment is exact keyword' },
                { id: 'MULTIPLE', title: 'Multiple Keywords', desc: 'Trigger on any keyword in your list' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedType(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                    selectedType === item.id
                      ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30'
                      : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-bold text-white block">{item.title}</span>
                  <span className="text-[10px] text-slate-400 block leading-tight">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keywords Manager (if not ANY) */}
          {selectedType !== 'ANY' && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-950/80 border border-white/10">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
                <span>Trigger Keywords</span>
                <span className="text-[10px] text-purple-400 font-mono font-normal">
                  {keywordList.length} keywords configured
                </span>
              </label>

              {/* Keyword Badges */}
              <div className="flex flex-wrap gap-2">
                {keywordList.map(kw => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs flex items-center gap-2"
                  >
                    <Tag className="w-3 h-3 text-purple-400" />
                    {kw}
                    <button
                      onClick={() => handleRemoveKeyword(kw)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Keyword Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Enter keyword (e.g. GUIDE, PRICE, COURSE)..."
                  value={newKeywordInput}
                  onChange={e => setNewKeywordInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Save Condition
          </button>
        </div>
      </div>
    </div>
  );
}
