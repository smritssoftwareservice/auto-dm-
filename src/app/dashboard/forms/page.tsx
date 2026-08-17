'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FormInput, Plus, ExternalLink, CheckCircle2, 
  Trash2, Eye, FileText 
} from 'lucide-react';
import { DEMO_FORMS } from '@/lib/mock-data';
import { Form } from '@/types';

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>(DEMO_FORMS);

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <FormInput className="w-8 h-8 text-blue-400" /> Lead Capture Forms
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Build custom forms that capture lead information and automatically create CRM records upon submission.
          </p>
        </div>

        <button
          onClick={() => alert('Custom Form Builder Modal Initialized')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Lead Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forms.map(form => (
          <div key={form.id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase">
                {form.fields.length} Custom Fields
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {form.submissionsCount} Submissions
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{form.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{form.description}</p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Form Fields:</span>
              {form.fields.map(f => (
                <div key={f.id} className="flex items-center justify-between text-[11px] p-2 bg-slate-900 rounded border border-white/5">
                  <span className="font-semibold text-white">{f.label}</span>
                  <span className="text-purple-400 font-mono">{f.fieldType}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <Link
                href={`/f/${form.id}`}
                target="_blank"
                className="text-purple-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Public Form Link <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
