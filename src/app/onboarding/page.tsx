'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, Check, ArrowRight, ArrowLeft, Bot, 
  Link2, Sparkles, Building, Briefcase, UserCheck
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';

const CATEGORIES = [
  'Creator', 'Influencer', 'Coach', 'Agency', 'Real Estate',
  'Education', 'SaaS', 'E-commerce', 'Restaurant', 'Consultant', 'Other'
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [roleCategory, setRoleCategory] = useState('Creator');
  const [businessName, setBusinessName] = useState('Vamshi Digital');
  const [igHandle, setIgHandle] = useState('demo_creator');
  const [connectedIg, setConnectedIg] = useState(true);
  const [agentName, setAgentName] = useState('Vamshi Assistant');
  const [agentTone, setAgentTone] = useState('Friendly');
  const [bioTitle, setBioTitle] = useState('Vamshi Krishna | AI & Automation');
  const [automationKeyword, setAutomationKeyword] = useState('PRICE');

  const nextStep = () => setStep(prev => Math.min(9, prev + 1));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const handleFinish = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col justify-between p-6">
      {/* Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bold text-lg text-white">DMFlow <span className="gradient-text">AI</span> Setup</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-medium">Step {step} of 9</span>
          <button onClick={() => router.push('/dashboard')} className="text-xs text-slate-400 hover:text-white underline">
            Skip to Dashboard
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-8">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300"
          style={{ width: `${(step / 9) * 100}%` }}
        />
      </div>

      {/* Main Wizard Container */}
      <div className="max-w-xl mx-auto w-full glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl my-auto text-left space-y-6">
        
        {/* STEP 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Welcome to DMFlow AI</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Let's set up your automated Instagram sales funnel, AI agent, CRM, and Link-in-Bio in under 2 minutes.
            </p>
          </div>
        )}

        {/* STEP 2: Category */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">What best describes your business?</h2>
            <p className="text-xs text-slate-400">We will tailor your AI agent instructions and templates based on your role.</p>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setRoleCategory(cat)}
                  className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                    roleCategory === cat 
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-md' 
                      : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span>{cat}</span>
                  {roleCategory === cat && <Check className="w-4 h-4 text-purple-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Business Name */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">What is your business or brand name?</h2>
            <p className="text-xs text-slate-400">This will be shown on your CRM lead cards and AI Chatbot signature.</p>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                placeholder="e.g., Vamshi Digital Academy"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Instagram Handle */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">What is your Instagram handle?</h2>
            <p className="text-xs text-slate-400">Enter the handle where you plan to trigger comment-to-DM automations.</p>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Instagram Username</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 text-sm">@</span>
                <input
                  type="text"
                  value={igHandle}
                  onChange={e => setIgHandle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  placeholder="demo_creator"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Connect Instagram */}
        {step === 5 && (
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg">
              <InstagramIcon className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Connect Official Meta Instagram API</h2>
            <p className="text-xs text-slate-400">
              Uses official Meta OAuth permissions. We never ask for your Instagram password.
            </p>
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Target Handle: @{igHandle}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Demo Connected</span>
              </div>
              <p className="text-[11px] text-slate-300">
                In Demo Mode, @{igHandle} is automatically linked to the real-time Instagram Simulator.
              </p>
            </div>
          </div>
        )}

        {/* STEP 6: Create AI Agent */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Configure Your 24/7 AI Chatbot Assistant</h2>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Agent Name</label>
              <input
                type="text"
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Personality & Tone</label>
              <select
                value={agentTone}
                onChange={e => setAgentTone(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Friendly">Friendly & Approachable</option>
                <option value="Professional">Professional & Direct</option>
                <option value="Casual">Casual & Conversational</option>
                <option value="Sales">High-Intent Sales Focused</option>
                <option value="Expert">Authoritative Expert</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 7: Link in Bio */}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Initialize Link-in-Bio Profile Page</h2>
            <p className="text-xs text-slate-400">Public URL will be: <strong className="text-purple-400">dmflow.ai/@{igHandle}</strong></p>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Profile Title</label>
              <input
                type="text"
                value={bioTitle}
                onChange={e => setBioTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {/* STEP 8: Create First Automation */}
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Create First Comment Keyword Trigger</h2>
            <p className="text-xs text-slate-400">When users comment this word on your post, DMFlow AI sends an immediate DM.</p>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Keyword</label>
              <input
                type="text"
                value={automationKeyword}
                onChange={e => setAutomationKeyword(e.target.value.toUpperCase())}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-purple-500"
                placeholder="PRICE"
              />
            </div>
          </div>
        )}

        {/* STEP 9: Finish */}
        {step === 9 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Setup Complete!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your organization <strong className="text-purple-300">{businessName}</strong> is ready. Your AI agent <strong className="text-purple-300">{agentName}</strong> and Instagram trigger <strong className="text-purple-300">"{automationKeyword}"</strong> are initialized.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white py-2 px-3 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 9 ? (
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 py-2.5 px-5 rounded-xl shadow-lg shadow-purple-600/30 hover:opacity-95"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/30 hover:opacity-95"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-500 py-2">
        DMFlow AI Multi-Tenant Onboarding Engine
      </div>
    </div>
  );
}
