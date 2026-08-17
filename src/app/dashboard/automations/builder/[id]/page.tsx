'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, Save, Play, Plus, Trash2, ArrowLeft, Bot, 
  MessageSquare, Clock, Tag, UserPlus, HelpCircle, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { DEMO_AUTOMATIONS } from '@/lib/mock-data';
import { AutomationNode } from '@/types';

export default function AutomationBuilderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const existing = DEMO_AUTOMATIONS.find(a => a.id === params.id) || DEMO_AUTOMATIONS[0];

  const [name, setName] = useState(existing.name);
  const [keyword, setKeyword] = useState(existing.triggerKeyword || 'PRICE');
  const [nodes, setNodes] = useState<AutomationNode[]>(existing.nodes);
  const [selectedNode, setSelectedNode] = useState<AutomationNode | null>(nodes[0] || null);

  const addNode = (type: AutomationNode['type'], label: string) => {
    const newNode: AutomationNode = {
      id: `n_${Date.now()}`,
      type,
      position: { x: 250, y: nodes.length * 120 + 50 },
      data: {
        label,
        messageText: type === 'message' ? 'Hey {{first_name}} 👋 Thanks for reaching out! Here is the link...' : undefined,
        tagName: type === 'add_tag' ? 'New Lead' : undefined,
        leadScoreAdd: type === 'add_tag' ? 20 : undefined,
      },
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const updateSelectedData = (key: string, val: any) => {
    if (!selectedNode) return;
    setNodes(prev => prev.map(n => {
      if (n.id === selectedNode.id) {
        const updated = { ...n, data: { ...n.data, [key]: val } };
        setSelectedNode(updated);
        return updated;
      }
      return n;
    }));
  };

  const handleSave = () => {
    alert(`Automation "${name}" saved successfully!`);
    router.push('/dashboard/automations');
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col -m-6 md:-m-8">
      {/* Top Builder Control Header */}
      <header className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/automations" className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent text-base font-bold text-white focus:outline-none border-b border-transparent focus:border-purple-500"
            />
            <span className="text-[10px] text-slate-400 block -mt-1">Visual Workflow Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400 font-medium">Trigger Keyword:</span>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value.toUpperCase())}
              className="bg-transparent text-purple-400 font-mono font-bold w-16 focus:outline-none uppercase"
            />
          </div>

          <Link
            href="/dashboard/simulator"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" /> Test in Simulator
          </Link>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" /> Save & Activate
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Palette Bar */}
        <aside className="w-64 glass-panel border-r border-white/10 p-4 space-y-4 shrink-0 overflow-y-auto text-left">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Add Workflow Nodes</span>
          <div className="space-y-2">
            {[
              { type: 'message', label: 'Send DM Message', icon: MessageSquare, color: 'text-purple-400' },
              { type: 'ai_response', label: 'AI Agent Handover', icon: Bot, color: 'text-pink-400' },
              { type: 'delay', label: 'Wait Delay', icon: Clock, color: 'text-amber-400' },
              { type: 'add_tag', label: 'Tag Lead & Add Score', icon: Tag, color: 'text-emerald-400' },
              { type: 'create_lead', label: 'Create CRM Lead', icon: UserPlus, color: 'text-blue-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => addNode(item.type as any, item.label)}
                  className="w-full p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-purple-500/40 text-xs font-semibold text-white flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Canvas Flow Diagram */}
        <div className="flex-1 bg-[#050508] p-8 overflow-y-auto flex flex-col items-center space-y-6 relative">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">START TRIGGER</span>
            <div className="px-5 py-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-bold shadow-lg flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" /> Instagram Comment contains "{keyword}"
            </div>
          </div>

          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Connection Arrow */}
              <div className="flex flex-col items-center text-purple-500/40">
                <div className="w-0.5 h-6 bg-purple-500/40" />
                <ChevronRight className="w-4 h-4 rotate-90 -mt-2" />
              </div>

              {/* Node Card */}
              <div
                onClick={() => setSelectedNode(node)}
                className={`w-80 glass-card p-4 rounded-2xl border text-left cursor-pointer transition-all relative group ${
                  selectedNode?.id === node.id 
                    ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-xl shadow-purple-600/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Step {idx + 1}: {node.type.replace('_', ' ')}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-xs font-bold text-white">{node.data.label}</h4>
                {node.data.messageText && (
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 bg-slate-900/60 p-2 rounded border border-white/5 font-mono">
                    "{node.data.messageText}"
                  </p>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Right Configuration Inspector Drawer */}
        {selectedNode && (
          <aside className="w-80 glass-panel border-l border-white/10 p-6 space-y-6 shrink-0 overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Configure Selected Step</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                {selectedNode.type}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Step Label</label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={e => updateSelectedData('label', e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {selectedNode.type === 'message' && (
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Direct Message Copy</label>
                  <textarea
                    rows={4}
                    value={selectedNode.data.messageText || ''}
                    onChange={e => updateSelectedData('messageText', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Available variables: &#123;&#123;first_name&#125;&#125;, &#123;&#123;link&#125;&#125;</span>
                </div>
              )}

              {selectedNode.type === 'add_tag' && (
                <>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">CRM Tag Name</label>
                    <input
                      type="text"
                      value={selectedNode.data.tagName || ''}
                      onChange={e => updateSelectedData('tagName', e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Add Lead Score Points</label>
                    <input
                      type="number"
                      value={selectedNode.data.leadScoreAdd || 20}
                      onChange={e => updateSelectedData('leadScoreAdd', parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
