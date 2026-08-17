'use client';

import React, { useState } from 'react';
import { X, Check, MessageSquare, AtSign, Sparkles } from 'lucide-react';

interface PublicReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  publicReplyText: string;
  onSave: (publicReplyText: string) => void;
}

export default function PublicReplyModal({
  isOpen,
  onClose,
  publicReplyText,
  onSave,
}: PublicReplyModalProps) {
  const [text, setText] = useState(
    publicReplyText || "@user Sent you a message! Check it out!"
  );

  if (!isOpen) return null;

  const handleInsertVariable = (varName: string) => {
    setText(prev => prev + ' ' + varName);
  };

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" /> Edit Public Comment Reply
            </h3>
            <p className="text-xs text-slate-400">
              Set the public response left under the user's comment on your Instagram post.
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
        <div className="p-6 space-y-5 text-left">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
              <AtSign className="w-4 h-4 text-purple-400" /> Public Comment Reply Text
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="@user Sent you a message! Check it out!"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
            />
          </div>

          {/* Quick Insert Variables */}
          <div className="space-y-2 p-3 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Quick Variables
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '@user Mention', value: '@user' },
                { label: '{{username}}', value: '{{username}}' },
                { label: 'Check DMs 📩', value: 'Check DMs 📩' },
                { label: 'Sent you details! ✨', value: 'Sent you details! ✨' },
              ].map(v => (
                <button
                  key={v.value}
                  onClick={() => handleInsertVariable(v.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 hover:border-purple-500/40 text-[11px] font-mono text-purple-300 transition-all"
                >
                  + {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Realistic Comment Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Public Comment Thread Preview
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600/40 text-white font-bold flex items-center gap-1 justify-center text-[10px]">
                  U
                </div>
                <div className="bg-slate-900 p-2 rounded-xl border border-white/5 flex-1">
                  <span className="font-bold text-white block text-[11px]">@instagram_user</span>
                  <p className="text-slate-300 text-[11px]">Awesome guide! Can I get the link?</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pl-6">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-[10px]">
                  Y
                </div>
                <div className="bg-purple-950/60 border border-purple-500/30 p-2 rounded-xl flex-1">
                  <span className="font-bold text-purple-300 block text-[11px]">Your Account</span>
                  <p className="text-white text-[11px]">{text || '@user Sent you a message! Check it out!'}</p>
                </div>
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
            <Check className="w-4 h-4" /> Save Public Reply
          </button>
        </div>
      </div>
    </div>
  );
}
