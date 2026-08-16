'use client';

import { useState } from 'react';
import { Sidebar } from '@jynta/ui';
import { TopBar } from '@/components/layout/TopBar';
import { HomeCards } from '@/components/home/HomeCards';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-neutral-400">Loading...</div>;
  }

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar isLoggedIn={isLoggedIn} onMenuClick={() => setSidebarOpen(true)} />

      {isLoggedIn && (
        <Sidebar isOpen={sidebarOpen} isCollapsed={false} onClose={() => setSidebarOpen(false)}>
          <div className="p-4">
            <p className="font-bold text-blue-600">JYNTA</p>
            <p className="mt-4 text-sm text-neutral-600">{user?.full_name}</p>
            <button onClick={logout} className="mt-4 text-sm text-red-600">
              Logout
            </button>
          </div>
        </Sidebar>
      )}

      <div className="px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          {isLoggedIn ? `Welcome Back, ${user?.full_name} 👋` : 'Welcome to Jynta 👋'}
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
