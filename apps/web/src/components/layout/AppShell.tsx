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
    <div className="min-h-screen bg-neutral-50">
      <TopBar isLoggedIn={isLoggedIn} onMenuClick={() => setSidebarOpen(true)} />
      {isLoggedIn && (
        <Sidebar isOpen={sidebarOpen} isCollapsed={false} onClose={() => setSidebarOpen(false)}>
          <AppSidebar />
        </Sidebar>
      )}
      <main>{children}</main>
    </div>
  );
}
