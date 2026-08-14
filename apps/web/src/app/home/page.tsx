'use client';

import { useState } from 'react';
import { Sidebar } from '@jynta/ui';
import { TopBar } from '@/components/layout/TopBar';
import { HomeCards } from '@/components/home/HomeCards';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Real auth state services/auth se aayega — abhi ke liye false
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar isLoggedIn={isLoggedIn} onMenuClick={() => setSidebarOpen(true)} />

      {isLoggedIn && (
        <Sidebar isOpen={sidebarOpen} isCollapsed={false} onClose={() => setSidebarOpen(false)}>
          <p className="p-4 font-bold text-blue-600">JYNTA</p>
        </Sidebar>
      )}

      <div className="px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          {isLoggedIn ? 'Welcome Back 👋' : 'Welcome to Jynta 👋'}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          One AI. One System. Unlimited Possibilities.
        </p>
      </div>

      <HomeCards isLoggedIn={isLoggedIn} />

      <p className="mt-8 text-center text-xs text-neutral-400">
        AI Assistant · AI Memory · AI Automation
      </p>
    </div>
  );
}
