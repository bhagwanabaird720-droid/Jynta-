'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';

export default function AIPreferencesPage() {
  const [responseLength, setResponseLength] = useState('Balanced');
  const [creativity, setCreativity] = useState(50);

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🤖 AI Preferences</h1>

        <div className="mt-6">
          <label className="text-sm font-medium text-neutral-600">Response Length</label>
          <div className="mt-2 flex gap-2">
            {['Short', 'Balanced', 'Detailed'].map((o) => (
              <button
                key={o}
                onClick={() => setResponseLength(o)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                  responseLength === o
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-neutral-200 text-neutral-700'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-neutral-600">Creativity Level: {creativity}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </div>
      </div>
    </AppShell>
  );
}
