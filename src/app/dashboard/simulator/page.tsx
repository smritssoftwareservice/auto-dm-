'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, MessageSquare, Zap, Users, CheckCircle2, ArrowRight, 
  Sparkles, ExternalLink, Clock, Send, ShieldCheck, Heart, MessageCircle, Share2
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';
import { processInstagramTriggerEvent, TriggerExecutionResult } from '@/lib/automations/engine';
import { DEMO_ORGANIZATION, DEMO_AUTOMATIONS } from '@/lib/mock-data';

export default function EventSimulatorPage() {
  const [username, setUsername] = useState('demo_user');
  const [commentText, setCommentText] = useState('student');
  const [simStep, setSimStep] = useState<'IDLE' | 'COMMENT_DETECTED' | 'WAITING_DELAY' | 'FOLLOW_REQUEST_SENT' | 'FOLLOW_VERIFIED' | 'COMPLETED'>('IDLE');
  const [delayProgress, setDelayProgress] = useState(0);
  const [result, setResult] = useState<TriggerExecutionResult | null>(null);

  const targetAuto = DEMO_AUTOMATIONS[0];
  const config = targetAuto.autoDmConfig;

  // Handle Simulation Start
  const handleStartSimulation = async () => {
    setSimStep('COMMENT_DETECTED');
    setDelayProgress(0);

    // Run Engine in background
    const execResult = await processInstagramTriggerEvent({
      organizationId: DEMO_ORGANIZATION.id,
      instagramUsername: username.replace('@', ''),
      triggerType: 'INSTAGRAM_COMMENT_KEYWORD',
      keyword: commentText,
      userText: commentText,
    });
    setResult(execResult);

    // Simulate 30-Second Delay step progression (fast-forwarded for UI responsiveness in 3 seconds)
    setSimStep('WAITING_DELAY');
  };

  // Progress delay timer
  useEffect(() => {
    if (simStep === 'WAITING_DELAY') {
      const interval = setInterval(() => {
        setDelayProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setSimStep('FOLLOW_REQUEST_SENT');
            return 100;
          }
          return prev + 25;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [simStep]);

  // Click Follow Confirmation ("I'm following ✅")
  const handleConfirmFollowing = () => {
    setSimStep('FOLLOW_VERIFIED');
    setTimeout(() => {
      setSimStep('COMPLETED');
    }, 1200);
  };

  const handleReset = () => {
    setSimStep('IDLE');
    setDelayProgress(0);
    setResult(null);
  };

  return (
    <div className="space-y-8 text-left max-w-6xl">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Play className="w-8 h-8 text-purple-400 fill-purple-400" /> Interactive Instagram Auto-DM Simulator
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Test the complete Auto-DM workflow step-by-step (Comment &rarr; 30s Delay &rarr; Follow Request &rarr; Public Reply &rarr; Final DM).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all"
        >
          Reset Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Simulated Instagram Feed & Comment Box */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-400" /> Simulated Instagram Post
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                DEMO SIMULATION
              </span>
            </div>

            {/* Post Card */}
            <div className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shadow-xl">
              <div className="p-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-xs">
                  Y
                </div>
                <div>
                  <span className="font-bold text-white text-xs block">demo_creator</span>
                  <span className="text-[10px] text-slate-400 block">Original Post</span>
                </div>
              </div>

              <div className="h-48 bg-slate-800 relative">
                <img
                  src={config?.postImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-4 text-slate-300 text-xs">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                  <Share2 className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-200 line-clamp-2">
                  {config?.postCaption || 'Comment "GUIDE" to get my free 10-step AI Instagram Growth Blueprint 🚀👇'}
                </p>

                {/* Simulated Public Comment Reply Thread */}
                {(simStep === 'FOLLOW_VERIFIED' || simStep === 'COMPLETED') && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2 text-[11px] animate-fade-in">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Public Comment Thread
                    </span>
                    <div className="flex items-start gap-2">
                      <strong className="text-white">@{username}</strong>: "{commentText}"
                    </div>
                    <div className="flex items-start gap-2 pl-3 border-l-2 border-purple-500 text-purple-300">
                      <strong className="text-white">You</strong>: "{config?.publicReplyText || '@user Sent you a message! Check it out!'}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Controls */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Simulated User</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={simStep !== 'IDLE'}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Comment Text</label>
                  <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    disabled={simStep !== 'IDLE'}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartSimulation}
            disabled={simStep !== 'IDLE'}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Simulate Comment Event
          </button>
        </div>

        {/* Right Column: Live Simulated Instagram DM Phone View */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" /> Instagram DM Preview Window
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">
              Step: {simStep}
            </span>
          </div>

          <div className="flex-1 bg-slate-950 border border-white/10 rounded-2xl p-4 space-y-4 min-h-[380px] flex flex-col justify-between overflow-y-auto">
            {simStep === 'IDLE' && (
              <div className="m-auto text-center space-y-2 text-slate-500 text-xs">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-700" />
                <p>Waiting for simulated comment trigger...</p>
              </div>
            )}

            {/* Step 2: 30s Delay Simulation Progress */}
            {simStep === 'WAITING_DELAY' && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2 text-xs text-left animate-fade-in">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" /> Waiting 30-Second Trigger Delay...
                  </span>
                  <span>{delayProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full transition-all duration-300" 
                    style={{ width: `${delayProgress}%` }} 
                  />
                </div>
              </div>
            )}

            {/* Step 3: Follow Request Message Bubble & 2 CTA Buttons */}
            {(simStep === 'FOLLOW_REQUEST_SENT' || simStep === 'FOLLOW_VERIFIED' || simStep === 'COMPLETED') && (
              <div className="space-y-3 animate-fade-in text-left">
                {/* Follow Request DM */}
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-white/10 text-white text-xs whitespace-pre-wrap max-w-[90%] leading-relaxed">
                  {config?.followMessageText || "Almost there !\n\nPlease visit my profile and tap follow to continue 😁"}
                </div>

                {/* 2 CTA Buttons */}
                {simStep === 'FOLLOW_REQUEST_SENT' && (
                  <div className="space-y-2 max-w-[90%]">
                    <a
                      href={config?.profileUrl || "https://instagram.com/demo_creator"}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/40 text-center font-bold text-xs text-slate-200 flex items-center justify-center gap-1.5 transition-all block"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                      {config?.visitProfileText || 'Visit Profile'}
                    </a>

                    <button
                      onClick={handleConfirmFollowing}
                      className="w-full p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-center font-bold text-xs text-white shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {config?.followingButtonText || "I'm following ✅"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4 & 5: Final DM Payload */}
            {(simStep === 'FOLLOW_VERIFIED' || simStep === 'COMPLETED') && (
              <div className="space-y-2 animate-fade-in text-right">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  ✓ Follow Verified &bull; Final DM Delivered
                </span>
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs whitespace-pre-wrap leading-relaxed shadow-lg text-left">
                  {config?.finalDmText || 'Here are your steps!'}
                </div>
              </div>
            )}

            {/* Engine Log Summary */}
            {simStep === 'COMPLETED' && result && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-left space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Auto-DM Workflow Complete!
                  </span>
                </div>
                <p className="text-slate-300">
                  Captured Lead: <strong>@{username}</strong> &bull; Lead Score: <strong>+{result.leadCreatedOrUpdated?.leadScore || 20} pts</strong>
                </p>
                <div className="pt-1 flex justify-end">
                  <Link href="/dashboard/leads" className="text-purple-400 font-semibold hover:underline flex items-center gap-1">
                    View in CRM <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
