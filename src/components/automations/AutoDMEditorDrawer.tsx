'use client';

import React, { useState } from 'react';
import { 
  X, Edit3, Clock, UserPlus, MessageSquare, Image as ImageIcon, 
  ChevronDown, CheckCircle2, PauseCircle, Play, Sparkles, ExternalLink, ShieldAlert
} from 'lucide-react';
import { Automation, AutoDMConfig } from '@/types';
import PostSelectorModal, { InstagramPostItem, MOCK_INSTAGRAM_POSTS } from './PostSelectorModal';
import CommentConditionModal from './CommentConditionModal';
import DelayModal from './DelayModal';
import FollowStepModal from './FollowStepModal';
import PublicReplyModal from './PublicReplyModal';
import FinalDMModal, { DEFAULT_FINAL_DM_TEMPLATE } from './FinalDMModal';

interface AutoDMEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  automation: Automation;
  onUpdateAutomation: (updated: Automation) => void;
}

export default function AutoDMEditorDrawer({
  isOpen,
  onClose,
  automation,
  onUpdateAutomation,
}: AutoDMEditorDrawerProps) {
  // State for config
  const [currentConfig, setCurrentConfig] = useState<AutoDMConfig>(
    automation.autoDmConfig || {
      postId: MOCK_INSTAGRAM_POSTS[0].id,
      postImage: MOCK_INSTAGRAM_POSTS[0].image,
      postCaption: MOCK_INSTAGRAM_POSTS[0].caption,
      postType: MOCK_INSTAGRAM_POSTS[0].type,
      commentCondition: 'ANY',
      keywords: ['GUIDE', 'PRICE'],
      delaySeconds: 30,
      followMessageText: "Almost there !\n\nPlease visit my profile and tap follow to continue 😁",
      profileUrl: "https://instagram.com/mybusiness",
      visitProfileText: "Visit Profile",
      followingButtonText: "I'm following ✅",
      publicReplyText: "@user Sent you a message! Check it out!",
      finalDmText: DEFAULT_FINAL_DM_TEMPLATE,
    }
  );

  // Active step modals
  const [activeModal, setActiveModal] = useState<
    'NONE' | 'POST' | 'CONDITION' | 'DELAY' | 'FOLLOW' | 'REPLY' | 'FINAL_DM'
  >('NONE');

  // Confirmation dialog for disable
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);

  if (!isOpen) return null;

  // Selected post item
  const selectedPost =
    MOCK_INSTAGRAM_POSTS.find(p => p.id === currentConfig.postId) || MOCK_INSTAGRAM_POSTS[0];

  const updateConfig = (partial: Partial<AutoDMConfig>) => {
    const nextConfig = { ...currentConfig, ...partial };
    setCurrentConfig(nextConfig);
    onUpdateAutomation({
      ...automation,
      autoDmConfig: nextConfig,
      postId: nextConfig.postId,
      postCaption: nextConfig.postCaption,
      postImage: nextConfig.postImage,
      triggerKeyword: nextConfig.keywords?.[0] || 'KEYWORD',
    });
  };

  const handleToggleStatus = () => {
    const nextStatus = automation.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    onUpdateAutomation({ ...automation, status: nextStatus });
    setShowDisableConfirm(false);
  };

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside className="fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] md:w-[500px] bg-[#090a0f] border-l border-white/10 shadow-2xl flex flex-col justify-between text-left animate-slide-left">
        {/* 1. STICKY TOP HEADER */}
        <header className="h-16 px-6 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Edit Automation
            </h2>
            <span className="text-[10px] text-slate-400 block font-mono">
              ID: {automation.id} &bull; {automation.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* 2. SCROLLABLE MIDDLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs custom-scrollbar">
          {/* Status Indicator */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10">
            <span className="text-slate-400 font-medium">Automation Status:</span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              automation.status === 'ACTIVE' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {automation.status === 'ACTIVE' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
              {automation.status}
            </span>
          </div>

          {/* Connected Vertical Workflow Container */}
          <div className="flex flex-col items-center space-y-5 relative">
            
            {/* STEP 1: TRIGGER - WHEN SOMEONE COMMENTS ON THIS SPECIFIC POST */}
            <div className="w-full space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                WHEN SOMEONE...
              </span>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">comments on this specific post</span>
                  <button
                    onClick={() => setActiveModal('POST')}
                    className="w-7 h-7 rounded-full bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                    title="Edit Selected Post"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Selected Post Preview Card */}
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800 relative">
                    <img src={selectedPost.image} alt="Post" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-0.5 p-0.5 rounded bg-black/80 text-[8px] font-bold text-purple-300 uppercase">
                      {selectedPost.type}
                    </span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <span className="text-[10px] text-slate-500 block font-mono">{selectedPost.date}</span>
                    <p className="text-slate-300 text-[11px] line-clamp-2 leading-snug">{selectedPost.caption}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOW CONNECTOR ARROW */}
            <div className="w-0.5 h-5 bg-purple-500/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-purple-400 -mt-1" />
            </div>

            {/* STEP 2: COMMENT CONDITION */}
            <div className="w-full space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                and comments...
              </span>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold text-xs font-mono">
                      [{currentConfig.commentCondition === 'ANY' ? 'Any comment' : currentConfig.keywords.join(', ')}]
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {currentConfig.commentCondition === 'ANY' ? 'Triggers on every comment' : 'Triggers on specific keyword match'}
                  </span>
                </div>

                <button
                  onClick={() => setActiveModal('CONDITION')}
                  className="w-7 h-7 rounded-full bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                  title="Edit Comment Condition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* FLOW CONNECTOR ARROW */}
            <div className="w-0.5 h-5 bg-purple-500/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-purple-400 -mt-1" />
            </div>

            {/* STEP 3: DELAY STEP */}
            <div className="w-full space-y-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">
                      then wait {currentConfig.delaySeconds} seconds after the trigger
                    </span>
                    <span className="text-[10px] text-slate-400 block">Simulated delay for natural conversation flow</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal('DELAY')}
                  className="w-7 h-7 rounded-full bg-amber-600/30 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                  title="Edit Delay Duration"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* FLOW CONNECTOR ARROW */}
            <div className="w-0.5 h-5 bg-purple-500/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-purple-400 -mt-1" />
            </div>

            {/* STEP 4: FOLLOW REQUEST STEP */}
            <div className="w-full space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                then ask them to follow you
              </span>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300 text-[11px]">Follow Prompt DM Bubble</span>
                  <button
                    onClick={() => setActiveModal('FOLLOW')}
                    className="w-7 h-7 rounded-full bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                    title="Edit Follow Message & Buttons"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Message Bubble Preview */}
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-white text-xs whitespace-pre-wrap leading-relaxed">
                  {currentConfig.followMessageText}
                </div>

                {/* Two CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-center font-bold text-xs text-slate-200 flex items-center justify-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                    {currentConfig.visitProfileText}
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-center font-bold text-xs text-purple-300 flex items-center justify-center gap-1.5">
                    {currentConfig.followingButtonText}
                  </div>
                </div>
              </div>
            </div>

            {/* FLOW CONNECTOR ARROW */}
            <div className="w-0.5 h-5 bg-purple-500/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-purple-400 -mt-1" />
            </div>

            {/* STEP 5: PUBLIC COMMENT REPLY STEP */}
            <div className="w-full space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                leave a reply to their comment on the post
              </span>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300 text-[11px]">Public Comment Thread</span>
                  <button
                    onClick={() => setActiveModal('REPLY')}
                    className="w-7 h-7 rounded-full bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                    title="Edit Public Reply"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2 text-[11px]">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[9px] shrink-0">
                      U
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-white">@demo_user</strong>: "This is a comment"
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pl-4 border-l-2 border-purple-500/40">
                    <div className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[9px] shrink-0">
                      Y
                    </div>
                    <div className="text-purple-300">
                      <strong className="text-white">You</strong>: "{currentConfig.publicReplyText}"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOW CONNECTOR ARROW */}
            <div className="w-0.5 h-5 bg-purple-500/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-purple-400 -mt-1" />
            </div>

            {/* STEP 6: FINAL DM STEP */}
            <div className="w-full space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                Once they follow, send them the following DM
              </span>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300 text-[11px]">Final Payload DM</span>
                  <button
                    onClick={() => setActiveModal('FINAL_DM')}
                    className="w-7 h-7 rounded-full bg-pink-600/30 hover:bg-pink-600 border border-pink-500/40 text-pink-300 hover:text-white flex items-center justify-center transition-all shadow-md"
                    title="Edit Final DM Payload"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/80 to-pink-950/80 border border-pink-500/40 text-white text-xs whitespace-pre-wrap leading-relaxed">
                  {currentConfig.finalDmText}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. FIXED STICKY BOTTOM ACTION BUTTON */}
        <footer className="p-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-md shrink-0 z-10">
          {automation.status === 'ACTIVE' ? (
            <button
              onClick={() => setShowDisableConfirm(true)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-red-300 bg-red-950/60 border border-red-500/40 hover:bg-red-900/80 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PauseCircle className="w-4 h-4" /> Disable Automation
            </button>
          ) : (
            <button
              onClick={handleToggleStatus}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> Enable Automation
            </button>
          )}
        </footer>
      </aside>

      {/* STEP EDIT MODALS */}
      <PostSelectorModal
        isOpen={activeModal === 'POST'}
        onClose={() => setActiveModal('NONE')}
        selectedPostId={currentConfig.postId}
        onSelectPost={post => updateConfig({
          postId: post.id,
          postImage: post.image,
          postCaption: post.caption,
          postType: post.type,
        })}
      />

      <CommentConditionModal
        isOpen={activeModal === 'CONDITION'}
        onClose={() => setActiveModal('NONE')}
        conditionType={currentConfig.commentCondition}
        keywords={currentConfig.keywords}
        onSave={(condType, kws) => updateConfig({
          commentCondition: condType,
          keywords: kws,
        })}
      />

      <DelayModal
        isOpen={activeModal === 'DELAY'}
        onClose={() => setActiveModal('NONE')}
        currentDelaySeconds={currentConfig.delaySeconds}
        onSave={secs => updateConfig({ delaySeconds: secs })}
      />

      <FollowStepModal
        isOpen={activeModal === 'FOLLOW'}
        onClose={() => setActiveModal('NONE')}
        followMessageText={currentConfig.followMessageText}
        profileUrl={currentConfig.profileUrl}
        visitProfileText={currentConfig.visitProfileText}
        followingButtonText={currentConfig.followingButtonText}
        onSave={data => updateConfig(data)}
      />

      <PublicReplyModal
        isOpen={activeModal === 'REPLY'}
        onClose={() => setActiveModal('NONE')}
        publicReplyText={currentConfig.publicReplyText}
        onSave={text => updateConfig({ publicReplyText: text })}
      />

      <FinalDMModal
        isOpen={activeModal === 'FINAL_DM'}
        onClose={() => setActiveModal('NONE')}
        finalDmText={currentConfig.finalDmText}
        onSave={text => updateConfig({ finalDmText: text })}
      />

      {/* DISABLE CONFIRMATION DIALOG */}
      {showDisableConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Disable this automation?</h4>
              <p className="text-xs text-slate-400 mt-1">
                The workflow will be paused and will stop detecting Instagram comments.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowDisableConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleStatus}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 shadow-lg shadow-red-600/30"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
