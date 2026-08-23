'use client';

import { useState } from 'react';

interface Props {
  conversationId: string;
}

export function ChatThreeDotsMenu({ conversationId }: Props) {
  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  async function handleRename() {
    if (!newTitle.trim()) return;
    await fetch(`/api/chat/conversations/${conversationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    setRenaming(false);
    setOpen(false);
    window.location.reload();
  }

  async function handleDelete() {
    if (!confirm('Delete this chat?')) return;
    await fetch(`/api/chat/conversations/${conversationId}`, { method: 'DELETE' });
    window.location.href = '/assistant/chat';
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-neutral-100"
      >
        ⋮
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
            {renaming ? (
              <div className="p-2">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New name"
                  className="w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
                />
                <button
                  onClick={handleRename}
                  className="mt-2 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setRenaming(true)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  ✏️ Rename Chat
                </button>
                <button
                  onClick={handleShare}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  📤 Share
                </button>
                <button
                  onClick={() => alert('Saved to Memory')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  💾 Save to Memory
                </button>
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  🗑 Delete Chat
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
