'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from '@jynta/ui';
import { TopBar } from '@/components/layout/TopBar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-50 text-neutral-400">
        Loading...
      </div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <TopBar isLoggedIn={isLoggedIn} onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        {isLoggedIn && (
          <Sidebar isOpen={sidebarOpen} isCollapsed={false} onClose={() => setSidebarOpen(false)}>
            <AppSidebar />
          </Sidebar>
        )}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
