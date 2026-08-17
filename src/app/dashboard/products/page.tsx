'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Plus, DollarSign, ExternalLink, 
  CheckCircle2, Edit, Trash2 
} from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { DigitalProduct } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<DigitalProduct[]>(DEMO_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(49);
  const [type, setType] = useState<'Course' | 'Digital' | 'Consultation' | 'Service'>('Course');
  const [desc, setDesc] = useState('');

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const prod: DigitalProduct = {
      id: `prod_${Date.now()}`,
      organizationId: 'org_vamshi_digital',
      title,
      description: desc || 'High-converting digital offer.',
      price,
      currency: 'USD',
      type,
      productUrl: `https://dmflow.ai/p/${title.toLowerCase().replace(/ /g, '-')}`,
      salesCount: 0,
      revenue: 0,
      status: 'ACTIVE',
    };

    setProducts(prev => [prod, ...prev]);
    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-8 text-left max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-amber-400" /> Digital Products & Offers
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Create courses, e-books, and 1-on-1 consultations linked directly to Instagram automations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Digital Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                  {prod.type}
                </span>
                <span className="text-lg font-extrabold text-white">
                  {formatCurrency(prod.price)}
                </span>
              </div>

              {prod.imageUrl && (
                <img src={prod.imageUrl} alt={prod.title} className="w-full h-32 rounded-xl object-cover border border-white/10" />
              )}

              <div>
                <h3 className="text-base font-bold text-white">{prod.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Sales</span>
                  <span className="text-white font-extrabold">{prod.salesCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Revenue</span>
                  <span className="text-emerald-400 font-extrabold">{formatCurrency(prod.revenue)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <a href={prod.productUrl} target="_blank" className="text-purple-400 hover:underline flex items-center gap-1 font-semibold">
                Checkout Link <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={addProduct} className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">Add New Product</h3>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Price ($ USD)</label>
              <input
                type="number"
                required
                value={price}
                onChange={e => setPrice(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Product Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Course">Course</option>
                <option value="Digital">Digital PDF / Ebook</option>
                <option value="Consultation">1-on-1 Consultation</option>
                <option value="Service">Service Package</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white shadow"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
