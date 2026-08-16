'use client';

import { useAuth } from '@/hooks/useAuth';

const modules = [
  { icon: '🏠', label: 'Home', href: '/home' },
  { icon: '🟦', label: 'Assistant', href: '/assistant' },
  { icon: '🟩', label: 'Memory', href: '/memory' },
  { icon: '🟨', label: 'Automation', href: '/automation' },
  { icon: '🔌', label: 'Connect', href: '/connect' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
];

const bottomLinks = [
  { icon: '🔔', label: 'Notifications', href: '/notifications' },
  { icon: '💎', label: 'Plan', href: '/plan' },
  { icon: '👤', label: 'Profile', href: '/profile' },
];

export function AppSidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col p-4">
      <p className="mb-4 px-2 text-lg font-bold text-blue-600">JYNTA</p>

      <nav className="flex flex-1 flex-col gap-1">
        {modules.map((m) => (
          <a
            key={m.href}
            href={m.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <span>{m.icon}</span>
            {m.label}
          </a>
        ))}
      </nav>

      <div className="mt-4 border-t border-neutral-200 pt-4">
        {bottomLinks.map((b) => (
          <a
            key={b.href}
            href={b.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <span>{b.icon}</span>
            {b.label}
          </a>
        ))}
        {user && (
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>
        )}
      </div>
    </div>
  );
}
