'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatHistoryPanel } from './ChatHistoryPanel';

interface Props {
  conversationId: string;
  conversationTitle?: string;
}

export function ChatThreeDotsMenu({ conversationId, conversationTitle = 'Chat' }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [pinned, setPinned] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState('');
  const [creating, setCreating] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }

  async function handleNewChat() {
    setCreating(true);
    const res = await fetch('/api/chat/conversations', { method: 'POST' });
    const data = await res.json();
    setCreating(false);
    setOpen(false);
    if (data.conversation) {
      router.push(`/assistant/chat/${data.conversation.id}`);
    }
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
    router.push('/assistant/chat');
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-xl leading-none hover:bg-neutral-100 active:bg-neutral-200"
      >
        ⋮
      </button>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-2 text-xs text-white shadow-lg">
          {toast}
        </div>
      )}

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="fixed right-3 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
            {renaming ? (
              <div className="p-3">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New name"
                  autoFocus
                  className="w-full rounded-lg border border-neutral-300 px-2 py-2 text-sm"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setRenaming(false)}
                    className="flex-1 rounded-lg border border-neutral-200 py-1.5 text-xs font-medium text-neutral-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRename}
                    className="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowHistory(true);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">🕒</span> Chat History
                </button>
                <button
                  onClick={handleNewChat}
                  disabled={creating}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">➕</span> New Chat
                </button>

                <div className="my-1 border-t border-neutral-100" />

                <button
                  onClick={() => setRenaming(true)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">✏️</span> Rename This Chat
                </button>
                <button
                  onClick={handlePin}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">📌</span> {pinned ? 'Unpin This Chat' : 'Pin This Chat'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">📤</span> Share This Chat
                </button>
                <button
                  onClick={handleSaveToMemory}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-700 active:bg-neutral-100"
                >
                  <span className="w-5 text-center">💾</span> Save to Memory
                </button>

                <div className="my-1 border-t border-neutral-100" />

                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 active:bg-red-50"
                >
                  <span className="w-5 text-center">🗑</span> Delete This Chat
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {showHistory && <ChatHistoryPanel onClose={() => setShowHistory(false)} />}
    </div>
  );
      }
