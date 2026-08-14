'use client';

import { SidebarToggle } from '@jynta/ui';

interface TopBarProps {
  isLoggedIn: boolean;
  onMenuClick: () => void;
}

export function TopBar({ isLoggedIn, onMenuClick }: TopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <SidebarToggle onClick={onMenuClick} />
        <span className="text-lg font-bold text-blue-600">JYNTA</span>
      </div>

      {!isLoggedIn && (
        <div className="flex gap-2">
          <a
            href="/sign-in"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium"
          >
            Log In
          </a>
          <a
            href="/sign-up"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
}
