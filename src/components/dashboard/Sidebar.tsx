'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Zap, Play, MessageSquare, Bot, 
  Users, Link2, ShoppingBag, FormInput, Megaphone, Layers, 
  BarChart3, UserPlus, CreditCard, Settings, ShieldCheck, LogOut
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/InstagramIcon';
import { DEMO_ORGANIZATION } from '@/lib/mock-data';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Instagram', href: '/dashboard/instagram', icon: InstagramIcon },
  { label: 'Automations', href: '/dashboard/automations', icon: Zap },
  { label: 'IG Simulator', href: '/dashboard/simulator', icon: Play, badge: 'DEMO' },
  { label: 'Inbox', href: '/dashboard/inbox', icon: MessageSquare, count: 1 },
  { label: 'AI Agent', href: '/dashboard/ai-agent', icon: Bot },
  { label: 'Leads CRM', href: '/dashboard/leads', icon: Users },
  { label: 'Link in Bio', href: '/dashboard/link-in-bio', icon: Link2 },
  { label: 'Products', href: '/dashboard/products', icon: ShoppingBag },
  { label: 'Forms', href: '/dashboard/forms', icon: FormInput },
  { label: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
  { label: 'Templates', href: '/dashboard/templates', icon: Layers },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Team', href: '/dashboard/team', icon: UserPlus },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Admin Panel', href: '/dashboard/admin', icon: ShieldCheck, badge: 'ADMIN' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white block leading-tight">Smrits <span className="gradient-text">AutoDM</span></span>
            <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider block">{DEMO_ORGANIZATION.name}</span>
          </div>
        </Link>

        {/* Navigation List */}
        <nav className="space-y-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    item.badge === 'DEMO' ? 'bg-purple-500/30 text-purple-300' : 'bg-pink-500/30 text-pink-300'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count && (
                  <span className="text-[10px] bg-pink-500 text-white font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Box */}
      <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
            alt="Avatar" 
            className="w-8 h-8 rounded-full object-cover border border-purple-500/40" 
          />
          <div className="text-left overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">Vamshi Krishna</span>
            <span className="text-[10px] text-slate-400 block truncate">vamshi@dmflow.ai</span>
          </div>
        </div>
        <Link href="/login" className="text-slate-400 hover:text-red-400 transition-colors p-1" title="Log Out">
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
