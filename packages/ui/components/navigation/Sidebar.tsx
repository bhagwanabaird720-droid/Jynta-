'use client';

import type { ReactNode } from 'react';
import { useBreakpoint } from '@jynta/hooks';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Sidebar — Jynta Global Navigation
 *
 * Mobile (<768px):  isOpen=true par Full-screen Overlay khulti hai, onClose se band hoti hai
 * Desktop (>=1024px): Hamesha Visible — isCollapsed se Icon-only <-> Full Width Toggle hoti hai
 */
export function Sidebar({ isOpen, isCollapsed, onClose, children }: SidebarProps) {
  const device = useBreakpoint();
  const isMobile = device === 'mobile';

  if (isMobile) {
    if (!isOpen) return null;
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
        <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg">
          {children}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-r border-neutral-200 bg-white
        transition-all duration-250 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {children}
    </aside>
  );
}
