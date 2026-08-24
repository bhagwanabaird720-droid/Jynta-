'use client';

import { useState } from 'react';

const options = [
  { icon: '🖼', label: 'Image' },
  { icon: '📄', label: 'PDF' },
  { icon: '📁', label: 'Document' },
  { icon: '🎥', label: 'Video' },
  { icon: '📎', label: 'File' },
];

export function AttachMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-500"
      >
        +
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-12 left-0 z-50 w-44 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
            {options.map((o) => (
              <button
                key={o.label}
                onClick={() => {
                  alert(`${o.label} upload coming soon`);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
              >
                <span>{o.icon}</span>
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
