'use client';

import { AppShell } from '@/components/layout/AppShell';
import { HomeCards } from '@/components/home/HomeCards';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-neutral-400">Loading...</div>;
  }

  const isLoggedIn = !!user;

  return (
    <AppShell>
      <div className="px-6 pt-6 pb-4 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          {isLoggedIn ? `Welcome Back, ${user?.full_name} 👋` : 'Welcome to Jynta 👋'}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          One AI. One System. Unlimited Possibilities.
        </p>
      </div>

      <HomeCards isLoggedIn={isLoggedIn} />

      <p className="mt-8 pb-6 text-center text-xs text-neutral-400">
        AI Assistant · AI Memory · AI Automation
      </p>
    </AppShell>
  );
}
