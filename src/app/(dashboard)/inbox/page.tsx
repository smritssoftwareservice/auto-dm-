'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, Bot, UserCheck, Send, Tag, 
  Search, ShieldAlert, CheckCircle2, User, Sparkles, AlertCircle 
} from 'lucide-react';
import { DEMO_CONVERSATIONS, DEMO_LEADS } from '@/lib/mock-data';
import { Conversation, Message } from '@/types';
import { formatDate } from '@/lib/utils';

export default function InboxPage() {
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || '');
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'HOT'>('ALL');
  const [replyText, setReplyText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeLead = DEMO_LEADS.find(l => l.id === activeConv?.leadId) || DEMO_LEADS[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConv) return;

    const newMsg: Message = {
      id: `m_${Date.now()}`,
      conversationId: activeConv.id,
      sender: 'HUMAN_AGENT',
      text: replyText,
      timestamp: new Date().toISOString(),
      delivered: true,
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessageText: replyText,
          lastMessageAt: new Date().toISOString(),
          messages: [...c.messages, newMsg],
        };
      }
      return c;
    }));

    setReplyText('');
  };

  const toggleAIMode = (mode: 'ACTIVE' | 'PAUSED' | 'HANDOFF') => {
    if (!activeConv) return;
    setConversations(prev => prev.map(c => {
      if (c.id === activeConv.id) return { ...c, aiMode: mode };
      return c;
    }));
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col -m-6 md:-m-8">
      {/* Inbox Outer Shell */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Conversation List */}
        <aside className="w-80 glass-panel border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
          {/* Header & Filter Tabs */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" /> DM Inbox
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                {conversations.length} Active
              </span>
            </div>

            <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold">
              {['ALL', 'UNREAD', 'HOT'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    filter === f ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Cards */}
          <div className="divide-y divide-white/5 text-left">
            {conversations.map(conv => {
              const isSelected = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-4 cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected ? 'bg-purple-950/40 border-l-4 border-purple-500' : 'hover:bg-white/5'
                  }`}
                >
                  <img
                    src={conv.userAvatar}
                    alt={conv.instagramUsername}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">@{conv.instagramUsername}</span>
                      <span className="text-[10px] text-slate-500">{formatDate(conv.lastMessageAt)}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessageText}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        conv.aiMode === 'ACTIVE' ? 'bg-pink-500/20 text-pink-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {conv.aiMode === 'ACTIVE' ? '🤖 AI Active' : '👤 Human Takeover'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Column: Chat Thread */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#050508]">
          {/* Thread Header */}
          <div className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={activeConv?.userAvatar}
                alt={activeConv?.instagramUsername}
                className="w-9 h-9 rounded-full object-cover border border-purple-500/40"
              />
              <div>
                <span className="text-sm font-bold text-white block">@{activeConv?.instagramUsername}</span>
                <span className="text-[10px] text-slate-400 block">Instagram DM Thread</span>
              </div>
            </div>

            {/* AI Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-1 rounded-xl text-xs">
              <button
                onClick={() => toggleAIMode('ACTIVE')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeConv?.aiMode === 'ACTIVE' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> AI Active
              </button>
              <button
                onClick={() => toggleAIMode('PAUSED')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeConv?.aiMode === 'PAUSED' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> Human Takeover
              </button>
            </div>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
            {activeConv?.messages.map(msg => {
              const isUser = msg.sender === 'INSTAGRAM_USER';
              const isAI = msg.sender === 'AI_AGENT';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
                    <span>{isUser ? `@${activeConv.instagramUsername}` : isAI ? '🤖 Vamshi AI Assistant' : '👤 You (Human Agent)'}</span>
                    <span>• {formatDate(msg.timestamp)}</span>
                  </div>
                  <div
                    className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-sm'
                        : isAI
                        ? 'bg-purple-950/60 border border-purple-500/40 text-purple-100 rounded-tr-sm shadow-md'
                        : 'bg-pink-600 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 glass-panel flex items-center gap-3">
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={`Send message to @${activeConv?.instagramUsername}...`}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Send DM
            </button>
          </form>
        </div>

        {/* Right Column: Customer Lead Sidebar */}
        <aside className="w-72 glass-panel border-l border-white/10 p-6 space-y-6 shrink-0 overflow-y-auto text-left">
          <div className="text-center space-y-2 border-b border-white/10 pb-4">
            <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/40 mx-auto p-0.5">
              <img src={activeConv?.userAvatar} alt="User" className="w-full h-full rounded-full object-cover" />
            </div>
            <h3 className="text-sm font-bold text-white">{activeLead?.name || activeConv?.instagramUsername}</h3>
            <span className="text-xs text-purple-400 font-medium">@{activeConv?.instagramUsername}</span>
          </div>

          {/* Lead Score & Status */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">CRM Lead Score</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px]">
                {activeLead?.leadScore || 85} / 100
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 font-medium">Status</span>
              <span className="text-purple-300 font-bold">{activeLead?.status || 'QUALIFIED'}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Lead Details</span>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 block">Email</span>
              <span className="text-white font-medium">{activeLead?.email || 'Not captured yet'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 block">Budget</span>
              <span className="text-emerald-400 font-medium">{activeLead?.budget || '$500 - $1,000'}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Tags</span>
            <div className="flex flex-wrap gap-1.5">
              {(activeLead?.tags || ['Masterclass Prospect', 'Hot Lead']).map((tag, idx) => (
                <span key={idx} className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-medium text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
