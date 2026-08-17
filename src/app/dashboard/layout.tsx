import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNav from '@/components/dashboard/TopNav';
import DemoBanner from '@/components/common/DemoBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col text-slate-100">
      <DemoBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          <TopNav />
          <main className="p-6 md:p-8 flex-1 bg-[#09090b]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
