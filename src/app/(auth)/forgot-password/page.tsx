'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DMFlow <span className="gradient-text">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white pt-2">Reset Your Password</h1>
          <p className="text-xs text-slate-400">Enter your account email to receive a password reset link.</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Reset Link Sent!</h3>
            <p className="text-xs text-slate-300">We emailed instructions to <strong className="text-emerald-300">{email}</strong>.</p>
            <Link href="/login" className="inline-block pt-2 text-xs text-purple-400 hover:underline">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              Send Reset Link <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-xs text-center text-slate-400">
          Remember your password? <Link href="/login" className="text-purple-400 font-semibold hover:underline">Back to Sign in</Link>
        </p>
      </div>
    </div>
  );
}
