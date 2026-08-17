'use client';

import React, { useState } from 'react';
import { X, Check, Image as ImageIcon, Video, Layers, Search, Sparkles } from 'lucide-react';

export interface InstagramPostItem {
  id: string;
  image: string;
  caption: string;
  date: string;
  type: 'POST' | 'REEL' | 'CAROUSEL';
  likesCount?: number;
  commentsCount?: number;
}

export const MOCK_INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: 'post_1',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    caption: 'Comment "GUIDE" to get my free 10-step AI Instagram Growth Blueprint 🚀👇',
    date: '2 hours ago',
    type: 'POST',
    likesCount: 1420,
    commentsCount: 388,
  },
  {
    id: 'post_2',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    caption: 'How I turned 5,000 followers into $24,000/mo using Auto-DMs! Comment "PRICE" for details 🔥',
    date: 'Yesterday',
    type: 'REEL',
    likesCount: 3890,
    commentsCount: 912,
  },
  {
    id: 'post_3',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    caption: 'Complete Claude 3.5 Sonnet prompt template for resume optimization. Comment "PROMPT" below!',
    date: '3 days ago',
    type: 'CAROUSEL',
    likesCount: 2100,
    commentsCount: 450,
  },
  {
    id: 'post_4',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    caption: 'New SaaS feature launch! Comment "DEMO" to get instant access to the simulator.',
    date: '5 days ago',
    type: 'POST',
    likesCount: 890,
    commentsCount: 176,
  },
];

interface PostSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPostId?: string;
  onSelectPost: (post: InstagramPostItem) => void;
}

export default function PostSelectorModal({
  isOpen,
  onClose,
  selectedPostId,
  onSelectPost,
}: PostSelectorModalProps) {
  const [selected, setSelected] = useState<InstagramPostItem>(
    MOCK_INSTAGRAM_POSTS.find(p => p.id === selectedPostId) || MOCK_INSTAGRAM_POSTS[0]
  );
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = MOCK_INSTAGRAM_POSTS.filter(p =>
    p.caption.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    onSelectPost(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" /> Select Instagram Post
            </h3>
            <p className="text-xs text-slate-400">
              Choose the post or reel where comments will trigger this Auto-DM workflow.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Mode Badge & Search */}
        <div className="p-4 border-b border-white/10 space-y-3 bg-slate-900">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> DEMO MODE: Mock Instagram Content
            </span>
            <span className="text-slate-400">Meta API integration supported</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search post captions or keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {filtered.map(post => {
            const isSelected = selected.id === post.id;
            return (
              <div
                key={post.id}
                onClick={() => setSelected(post)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-600/20'
                    : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-slate-800">
                    <img
                      src={post.image}
                      alt="Instagram preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 right-1 p-1 rounded bg-black/70 text-white text-[9px] font-bold uppercase">
                      {post.type === 'REEL' ? <Video className="w-3 h-3 text-pink-400" /> : <ImageIcon className="w-3 h-3 text-purple-400" />}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1 text-left">
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {post.date}
                    </span>
                    <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                      {post.caption}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                  <span>❤️ {post.likesCount?.toLocaleString()}</span>
                  <span>💬 {post.commentsCount?.toLocaleString()} comments</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded bg-purple-500 text-white font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Footer */}
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
            <Check className="w-4 h-4" /> Save Selection
          </button>
        </div>
      </div>
    </div>
  );
}
