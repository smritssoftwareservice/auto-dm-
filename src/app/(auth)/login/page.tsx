'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, Lock, Mail, Chrome } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('vamshi@dmflow.ai');
  const [password, setPassword] = useState('demo123456');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DMFlow <span className="gradient-text">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white pt-2">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your organization dashboard & CRM</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-purple-400 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#09090b] px-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold absolute">Or</span>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
        >
          <Chrome className="w-4 h-4 text-blue-400" /> Continue with Google
        </button>

        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
          <span className="text-xs text-purple-300">
            💡 Quick Demo Credentials pre-filled! Click <strong>Sign In</strong> to proceed.
          </span>
        </div>

        <p className="text-xs text-center text-slate-400">
          Don't have an account? <Link href="/signup" className="text-purple-400 font-semibold hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
