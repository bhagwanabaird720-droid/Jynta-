'use client';

import { useState } from 'react';

interface Props {
  conversationId: string;
  conversationTitle?: string;
}

export function ChatThreeDotsMenu({ conversationId, conversationTitle = 'Chat' }: Props) {
  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [pinned, setPinned] = useState(false);
  const [toast, setToast] = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }

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

  async function handlePin() {
    const newPinned = !pinned;
    setPinned(newPinned);
    await fetch(`/api/chat/conversations/${conversationId}/pin`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: newPinned }),
    });
    showToast(newPinned ? 'Pinned ✓' : 'Unpinned');
    setOpen(false);
  }

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    showToast('Link copied ✓');
    setOpen(false);
  }

  async function handleSaveToMemory() {
    await fetch('/api/memory/save-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, title: conversationTitle }),
    });
    showToast('Saved to Memory ✓');
    setOpen(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this chat?')) return;
    await fetch(`/api/chat/conversations/${conversationId}`, { method: 'DELETE' });
    window.location.href = '/assistant/chat';
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-neutral-100"
      >
        ⋮
      </button>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-2 text-xs text-white shadow-lg">
          {toast}
        </div>
      )}

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
                  onClick={handlePin}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  📌 {pinned ? 'Unpin Chat' : 'Pin Chat'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  📤 Share
                </button>
                <button
                  onClick={handleSaveToMemory}
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
