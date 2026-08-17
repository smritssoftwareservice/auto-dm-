'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, MessageSquare, Instagram, Zap, Bot, 
  Users, CheckCircle2, ArrowRight, RefreshCcw, Sparkles 
} from 'lucide-react';
import { processInstagramTriggerEvent, TriggerExecutionResult } from '@/lib/automations/engine';
import { DEMO_ORGANIZATION } from '@/lib/mock-data';

export default function EventSimulatorPage() {
  const [triggerType, setTriggerType] = useState<'INSTAGRAM_COMMENT_KEYWORD' | 'INSTAGRAM_DM_KEYWORD'>('INSTAGRAM_COMMENT_KEYWORD');
  const [username, setUsername] = useState('rahul_demo');
  const [keywordText, setKeywordText] = useState('PRICE');
  const [userText, setUserText] = useState('Can I get a discount if I enroll today?');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriggerExecutionResult | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);

    const execResult = await processInstagramTriggerEvent({
      organizationId: DEMO_ORGANIZATION.id,
      instagramUsername: username.replace('@', ''),
      triggerType,
      keyword: keywordText,
      userText: triggerType === 'INSTAGRAM_DM_KEYWORD' ? userText : keywordText,
    });

    setLoading(false);
    setResult(execResult);
  };

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Play className="w-8 h-8 text-purple-400 fill-purple-400" /> Demo Instagram Event Simulator
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Test comment-to-DM triggers, AI chatbot answers, and lead scoring in real-time without needing a live Meta API key.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Simulator Controls */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" /> Simulate Incoming Interaction
          </h2>

          {/* Trigger Event Type Switch */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              onClick={() => { setTriggerType('INSTAGRAM_COMMENT_KEYWORD'); setKeywordText('PRICE'); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                triggerType === 'INSTAGRAM_COMMENT_KEYWORD' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Post Comment Event
            </button>
            <button
              onClick={() => { setTriggerType('INSTAGRAM_DM_KEYWORD'); setKeywordText('COURSE'); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                triggerType === 'INSTAGRAM_DM_KEYWORD' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Message Event
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Simulated Follower Username</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-7 pr-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                {triggerType === 'INSTAGRAM_COMMENT_KEYWORD' ? 'Comment Keyword' : 'Trigger Keyword'}
              </label>
              <input
                type="text"
                value={keywordText}
                onChange={e => setKeywordText(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-purple-500"
                placeholder="PRICE"
              />
            </div>

            {triggerType === 'INSTAGRAM_DM_KEYWORD' && (
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Follower DM Text</label>
                <textarea
                  rows={3}
                  value={userText}
                  onChange={e => setUserText(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Executing Engine...' : '⚡ Trigger Simulation Event'}
          </button>
        </div>

        {/* Right Column: Real-time Execution Output */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" /> Backend Engine Execution Log
          </h2>

          {!result ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-white/10 text-center space-y-3">
              <Play className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                Click <strong>Trigger Simulation Event</strong> to process an event through the DMFlow AI automation engine.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs text-left">
              {/* Trigger Status */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automation Triggered!
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                    Matched: {result.matchedKeyword}
                  </span>
                </div>
                <p className="text-slate-300">
                  Automation: <strong>{result.automationName}</strong>
                </p>
              </div>

              {/* DM Sent Output */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block">
                  {result.aiHandled ? '🤖 AI Agent DM Reply' : '⚡ Static Automation DM'}
                </span>
                <p className="text-slate-200 text-sm font-medium leading-relaxed">
                  "{result.sentMessageText}"
                </p>
              </div>

              {/* CRM Lead Created/Updated */}
              {result.leadCreatedOrUpdated && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" /> CRM Lead Updated
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                      Score: {result.leadCreatedOrUpdated.leadScore} / 100
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                    <div>Lead Name: <strong>{result.leadCreatedOrUpdated.name}</strong></div>
                    <div>Handle: <strong>@{result.leadCreatedOrUpdated.instagramUsername}</strong></div>
                    <div>Status: <strong>{result.leadCreatedOrUpdated.status}</strong></div>
                    <div>Tags: <strong>{result.leadCreatedOrUpdated.tags.join(', ')}</strong></div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <Link 
                  href="/dashboard/inbox" 
                  className="text-purple-400 font-semibold hover:underline flex items-center gap-1"
                >
                  View in Inbox <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
