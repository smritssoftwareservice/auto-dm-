'use client';

import React, { useState } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, Sparkles, Image as ImageIcon, 
  MessageSquare, Clock, UserPlus, Send, Play, Layers
} from 'lucide-react';
import { Automation, AutoDMConfig } from '@/types';
import { MOCK_INSTAGRAM_POSTS } from './PostSelectorModal';
import { DEFAULT_FINAL_DM_TEMPLATE } from './FinalDMModal';

interface CreateAutomationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNewAutomation: (automation: Automation) => void;
}

export default function CreateAutomationWizard({
  isOpen,
  onClose,
  onSaveNewAutomation,
}: CreateAutomationWizardProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('Instagram Auto-DM Campaign');
  const [selectedPost, setSelectedPost] = useState(MOCK_INSTAGRAM_POSTS[0]);
  const [conditionType, setConditionType] = useState<'ANY' | 'CONTAINS' | 'EXACT' | 'MULTIPLE'>('CONTAINS');
  const [keywordsInput, setKeywordsInput] = useState('GUIDE, PRICE');
  const [delaySeconds, setDelaySeconds] = useState(30);
  const [followMsg, setFollowMsg] = useState("Almost there !\n\nPlease visit my profile and tap follow to continue 😁");
  const [profileUrl, setProfileUrl] = useState('https://instagram.com/mybusiness');
  const [btn1, setBtn1] = useState('Visit Profile');
  const [btn2, setBtn2] = useState("I'm following ✅");
  const [publicReply, setPublicReply] = useState('@user Sent you a message! Check it out!');
  const [finalDm, setFinalDm] = useState(DEFAULT_FINAL_DM_TEMPLATE);

  if (!isOpen) return null;

  const keywordsList = keywordsInput.split(',').map(k => k.trim().toUpperCase()).filter(Boolean);

  const handleFinish = () => {
    const autoDmConfig: AutoDMConfig = {
      postId: selectedPost.id,
      postImage: selectedPost.image,
      postCaption: selectedPost.caption,
      postType: selectedPost.type,
      commentCondition: conditionType,
      keywords: keywordsList.length > 0 ? keywordsList : ['GUIDE'],
      delaySeconds,
      followMessageText: followMsg,
      profileUrl,
      visitProfileText: btn1,
      followingButtonText: btn2,
      publicReplyText: publicReply,
      finalDmText: finalDm,
    };

    const newAuto: Automation = {
      id: `auto_${Date.now()}`,
      organizationId: 'org_demo_123',
      name,
      description: `Auto-DM on post: "${selectedPost.caption.slice(0, 40)}..."`,
      status: 'ACTIVE',
      triggerType: 'INSTAGRAM_COMMENT_KEYWORD',
      triggerKeyword: keywordsList[0] || 'GUIDE',
      postId: selectedPost.id,
      postCaption: selectedPost.caption,
      postImage: selectedPost.image,
      autoDmConfig,
      executionCount: 0,
      conversionCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: [],
    };

    onSaveNewAutomation(newAuto);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-left">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Create Auto-DM Campaign
            </h3>
            <p className="text-xs text-slate-400">Step {step} of 8 &bull; Configure comment-to-DM workflow</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-slate-950 h-1.5 flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all ${
                i + 1 <= step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/5'
              }`}
            />
          ))}
        </div>

        {/* Wizard Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 1: Select Target Instagram Post
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Automation Name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-bold mb-3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_INSTAGRAM_POSTS.map(post => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`p-3 rounded-xl border cursor-pointer flex gap-3 ${
                      selectedPost.id === post.id
                        ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30'
                        : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img src={post.image} alt="post" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <span className="text-[10px] text-purple-400 font-bold uppercase">{post.type}</span>
                      <p className="text-slate-300 text-[11px] line-clamp-2">{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 2: Choose Comment Condition
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ANY', title: 'Any Comment' },
                  { id: 'CONTAINS', title: 'Contains Keyword' },
                  { id: 'EXACT', title: 'Exact Keyword' },
                  { id: 'MULTIPLE', title: 'Multiple Keywords' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setConditionType(item.id as any)}
                    className={`p-3 rounded-xl border font-bold ${
                      conditionType === item.id ? 'bg-purple-950/40 border-purple-500 text-white' : 'bg-slate-950/60 border-white/10 text-slate-400'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {conditionType !== 'ANY' && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Trigger Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={keywordsInput}
                    onChange={e => setKeywordsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 3: Set Delay Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 5, 10, 30, 60, 300].map(secs => (
                  <button
                    key={secs}
                    onClick={() => setDelaySeconds(secs)}
                    className={`p-3 rounded-xl border text-center font-bold ${
                      delaySeconds === secs ? 'bg-amber-950/40 border-amber-500 text-amber-200' : 'bg-slate-950/60 border-white/10 text-slate-400'
                    }`}
                  >
                    {secs === 0 ? '0s (Instant)' : `${secs}s`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 4: Follow Request Message
              </label>
              <textarea
                rows={4}
                value={followMsg}
                onChange={e => setFollowMsg(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 5: Configure CTA Buttons
              </label>
              <input
                type="text"
                placeholder="Profile URL"
                value={profileUrl}
                onChange={e => setProfileUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-2"
              />
              <input
                type="text"
                placeholder="Button 1 Label"
                value={btn1}
                onChange={e => setBtn1(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-2"
              />
              <input
                type="text"
                placeholder="Button 2 Label"
                value={btn2}
                onChange={e => setBtn2(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 6: Public Comment Reply
              </label>
              <input
                type="text"
                value={publicReply}
                onChange={e => setPublicReply(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Step 7: Create Final Payload DM
              </label>
              <textarea
                rows={6}
                value={finalDm}
                onChange={e => setFinalDm(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
              />
            </div>
          )}

          {step === 8 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block text-emerald-400">
                Step 8: Review Flow & Activate
              </label>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3 font-mono text-[11px] text-slate-300">
                <div>&bull; <strong>Campaign Name:</strong> {name}</div>
                <div>&bull; <strong>Trigger Post:</strong> {selectedPost.caption.slice(0, 50)}...</div>
                <div>&bull; <strong>Keywords:</strong> [{keywordsList.join(', ')}]</div>
                <div>&bull; <strong>Delay:</strong> {delaySeconds}s</div>
                <div>&bull; <strong>Public Reply:</strong> "{publicReply}"</div>
                <div>&bull; <strong>Status:</strong> ACTIVE</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(prev => prev - 1)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-white/10 disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 8 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1 shadow-lg shadow-purple-600/30"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/30 hover:opacity-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Activate Automation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
