'use client';

import { useAuth } from '@/hooks/useAuth';

const sections = [
  { icon: '✏️', label: 'Edit Profile', href: '/profile/edit' },
  { icon: '💎', label: 'Subscription', href: '/plan' },
  { icon: '🔗', label: 'Connected Accounts', href: '/profile/accounts' },
  { icon: '🔒', label: 'Security', href: '/profile/security' },
  { icon: '📊', label: 'Activity', href: '/profile/activity' },
];

export function ProfileContent() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="p-6 text-center text-neutral-400">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-lg font-bold text-neutral-900">{user.full_name}</h1>
          <p className="text-sm text-neutral-500">{user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            Free Plan
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <span>{s.icon}</span>
            {s.label}
          </a>
        ))}
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
