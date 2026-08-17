'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_FORMS } from '@/lib/mock-data';
import { CheckCircle2, Zap, Send } from 'lucide-react';

export default function PublicFormPage({ params }: { params: { formId: string } }) {
  const form = DEMO_FORMS.find(f => f.id === params.formId) || DEMO_FORMS[0];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 text-left space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center mx-auto shadow-lg">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{form.title}</h1>
          {form.description && <p className="text-xs text-slate-400">{form.description}</p>}
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Thank You!</h3>
            <p className="text-xs text-slate-300">Your submission has been recorded. Our team will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {form.fields.map(field => (
              <div key={field.id}>
                <label className="font-semibold text-slate-300 block mb-1.5">{field.label}</label>
                {field.fieldType === 'SELECT' ? (
                  <select
                    required={field.required}
                    onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select option...</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.fieldType === 'EMAIL' ? 'email' : 'text'}
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              Submit Response <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-white/10">
          Powered by DMFlow AI Forms
        </div>
      </div>
    </div>
  );
}
