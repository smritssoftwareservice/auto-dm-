'use client';

import React, { useState } from 'react';
import { X, Check, Clock, Timer } from 'lucide-react';

interface DelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDelaySeconds: number;
  onSave: (delaySeconds: number) => void;
}

export const PRESET_DELAYS = [
  { label: '0 seconds (Instant)', seconds: 0 },
  { label: '5 seconds', seconds: 5 },
  { label: '10 seconds', seconds: 10 },
  { label: '30 seconds (Recommended)', seconds: 30 },
  { label: '1 minute', seconds: 60 },
  { label: '5 minutes', seconds: 300 },
  { label: '10 minutes', seconds: 600 },
  { label: '30 minutes', seconds: 1800 },
  { label: '1 hour', seconds: 3600 },
];

export default function DelayModal({
  isOpen,
  onClose,
  currentDelaySeconds,
  onSave,
}: DelayModalProps) {
  const [selectedSeconds, setSelectedSeconds] = useState(currentDelaySeconds || 30);
  const [customInput, setCustomInput] = useState(
    PRESET_DELAYS.some(p => p.seconds === currentDelaySeconds) ? '' : String(currentDelaySeconds)
  );

  if (!isOpen) return null;

  const handleSave = () => {
    let finalSeconds = selectedSeconds;
    if (customInput.trim()) {
      const parsed = parseInt(customInput.trim());
      if (!isNaN(parsed) && parsed >= 0) {
        finalSeconds = parsed;
      }
    }
    onSave(finalSeconds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Edit Delay Step
            </h3>
            <p className="text-xs text-slate-400">
              Set how long to wait after the comment trigger before executing the follow request.
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
        <div className="p-6 space-y-5 text-left">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Preset Delay Options
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_DELAYS.map(preset => {
              const isSelected = selectedSeconds === preset.seconds && !customInput;
              return (
                <button
                  key={preset.seconds}
                  onClick={() => {
                    setSelectedSeconds(preset.seconds);
                    setCustomInput('');
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                      : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span>{preset.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>

          {/* Custom Duration Input */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-2">
              <Timer className="w-4 h-4 text-amber-400" /> Custom Delay (Seconds)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 45"
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
            <span className="text-[10px] text-slate-400 block">
              Entering a custom duration will override the preset delay option above.
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
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg shadow-amber-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Save Delay
          </button>
        </div>
      </div>
    </div>
  );
}
