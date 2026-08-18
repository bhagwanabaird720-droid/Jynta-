'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';

const languages = ['English', 'हिंदी (Hindi)', 'Spanish', 'French'];

export default function LanguagePage() {
  const [selected, setSelected] = useState('English');

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🌍 Language</h1>
        <p className="mt-1 text-sm text-neutral-500">App Language</p>
        <div className="mt-4 flex flex-col gap-2">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setSelected(l)}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
                selected === l
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-neutral-200 text-neutral-700'
              }`}
            >
              {l}
              {selected === l && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
