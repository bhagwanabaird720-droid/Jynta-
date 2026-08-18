'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';

const options = ['Light', 'Dark', 'System'];

export default function ThemePage() {
  const [selected, setSelected] = useState('System');

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🎨 Theme</h1>
        <div className="mt-4 flex flex-col gap-2">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => setSelected(o)}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
                selected === o
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-neutral-200 text-neutral-700'
              }`}
            >
              {o}
              {selected === o && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
