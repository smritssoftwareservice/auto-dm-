'use client';

import React, { useState } from 'react';
import { X, Check, UserPlus, Link2, MessageSquare, AlertCircle } from 'lucide-react';

interface FollowStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  followMessageText: string;
  profileUrl: string;
  visitProfileText: string;
  followingButtonText: string;
  onSave: (data: {
    followMessageText: string;
    profileUrl: string;
    visitProfileText: string;
    followingButtonText: string;
  }) => void;
}

export default function FollowStepModal({
  isOpen,
  onClose,
  followMessageText,
  profileUrl,
  visitProfileText,
  followingButtonText,
  onSave,
}: FollowStepModalProps) {
  const [msg, setMsg] = useState(
    followMessageText || "Almost there !\n\nPlease visit my profile and tap follow to continue 😁"
  );
  const [url, setUrl] = useState(profileUrl || "https://instagram.com/mybusiness");
  const [btn1, setBtn1] = useState(visitProfileText || "Visit Profile");
  const [btn2, setBtn2] = useState(followingButtonText || "I'm following ✅");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      followMessageText: msg,
      profileUrl: url,
      visitProfileText: btn1,
      followingButtonText: btn2,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-400" /> Edit Follow Request Step
            </h3>
            <p className="text-xs text-slate-400">
              Customize the message and 2-button CTA sent to request a profile follow.
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
          {/* Follow Request Message Copy */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" /> Follow Request Message Copy
            </label>
            <textarea
              rows={4}
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Almost there ! Please visit my profile and tap follow to continue 😁"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
            />
          </div>

          {/* Profile URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
              <Link2 className="w-4 h-4 text-purple-400" /> Instagram Profile Link
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://instagram.com/your_username"
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          {/* Two-Button CTA Labels */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-950/80 border border-white/10">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Call-To-Action (CTA) Buttons
            </span>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">
                  Button 1 Label (Profile Link Button)
                </label>
                <input
                  type="text"
                  value={btn1}
                  onChange={e => setBtn1(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">
                  Button 2 Label (Follow Confirmation Button)
                </label>
                <input
                  type="text"
                  value={btn2}
                  onChange={e => setBtn2(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Meta API Note */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-2.5 text-[11px] text-purple-300">
            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Meta API Compliance</strong>: In Demo Mode, clicking "I'm following ✅" instantly simulates the follow state. In live production mode, official supported Meta Graph API interaction rules apply.
            </span>
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
            <Check className="w-4 h-4" /> Save Follow Step
          </button>
        </div>
      </div>
    </div>
  );
}
