'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';

const items = ['AI Messages', 'Completed Tasks', 'Automation Updates', 'Learning Updates', 'Security Alerts'];

export default function NotificationSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((i) => [i, true]))
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🔔 Notification Settings</h1>
        <div className="mt-4 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
          {items.map((i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-neutral-700">{i}</span>
              <button
                onClick={() => setEnabled((prev) => ({ ...prev, [i]: !prev[i] }))}
                className={`h-6 w-11 rounded-full transition-colors ${
                  enabled[i] ? 'bg-blue-600' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white transition-transform ${
                    enabled[i] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
