'use client';

import React, { useState } from 'react';
import { X, Check, MessageSquare, Link2, Sparkles, AlertCircle } from 'lucide-react';

interface FinalDMModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalDmText: string;
  onSave: (finalDmText: string) => void;
}

export const DEFAULT_FINAL_DM_TEMPLATE = `Here are the steps:

Step 1: Upload your Resume in Claude
Step 2: Copy and paste the job description in Claude
Step 3: Paste the below prompt

Prompt:
"I have attached my resume along with the job descriptions for the roles I want to apply for. Your task is to customize my resume for maximum ATS match score."`;

export default function FinalDMModal({
  isOpen,
  onClose,
  finalDmText,
  onSave,
}: FinalDMModalProps) {
  const [text, setText] = useState(
    finalDmText || DEFAULT_FINAL_DM_TEMPLATE
  );

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-pink-400" /> Edit Final Direct Message (DM)
            </h3>
            <p className="text-xs text-slate-400">
              Customize the message sent automatically to the Instagram user once follow eligibility is verified.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-left">
          {/* DM Editor Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
              <span>Final DM Copy</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {text.length} characters
              </span>
            </label>
            <textarea
              rows={8}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter your final DM payload message..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 font-sans leading-relaxed"
            />
          </div>

          {/* Variables & Snippets */}
          <div className="space-y-2 p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Quick Snippets & Templates
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setText(DEFAULT_FINAL_DM_TEMPLATE)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 hover:border-pink-500/40 text-[11px] text-pink-300 font-bold"
              >
                + Claude Resume Prompt Template
              </button>
              <button
                onClick={() => setText(prev => prev + '\n\n👉 Access link: https://your-link.com')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 hover:border-pink-500/40 text-[11px] text-slate-300"
              >
                + Add Link Button
              </button>
            </div>
          </div>

          {/* DM Bubble Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Instagram DM Bubble Preview
            </span>
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl rounded-tr-sm text-white text-xs whitespace-pre-wrap leading-relaxed shadow-lg">
                {text || 'Here is your automated DM response!'}
              </div>
            </div>
          </div>
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
            <Check className="w-4 h-4" /> Save Final DM
          </button>
        </div>
      </div>
    </div>
  );
}
