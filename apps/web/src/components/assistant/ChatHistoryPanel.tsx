'use client';

import { useEffect, useState, useRef } from 'react';

interface Conversation {
  id: string;
  title: string;
}

export function ChatHistoryPanel({ onClose }: { onClose: () => void }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/chat/conversations')
      .then((res) => res.json())
      .then((data) => setConversations(data.conversations || []))
      .finally(() => setLoading(false));
  }, []);

  function startPress(id: string) {
    timerRef.current = setTimeout(() => setActiveId(id), 500);
  }

  function cancelPress() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this chat?')) return;
    await fetch(`/api/chat/conversations/${id}`, { method: 'DELETE' });
    setActiveId(null);
    setConversations((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleRenameSave(id: string) {
    if (!renameText.trim()) return;
    await fetch(`/api/chat/conversations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: renameText }),
    });
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title: renameText } : c)));
    setRenamingId(null);
    setActiveId(null);
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full rounded-t-2xl bg-white p-4 max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <h2 className="text-base font-bold text-neutral-900">🕒 Chat History</h2>
          <button onClick={onClose} className="text-neutral-400">✕</button>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {loading && <p className="text-center text-sm text-neutral-400">Loading...</p>}
          {!loading && conversations.length === 0 && (
            <p className="text-center text-sm text-neutral-400">No chats yet.</p>
          )}
          {conversations.map((c) => (
            <div key={c.id} className="relative">
              {renamingId === c.id ? (
                <div className="flex gap-2 rounded-xl border border-neutral-200 p-2">
                  <input
                    value={renameText}
                    onChange={(e) => setRenameText(e.target.value)}
                    className="flex-1 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => handleRenameSave(c.id)}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Save
                  </button>
                </div>
              ) : activeId === c.id ? (
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <span className="text-sm text-neutral-700">{c.title}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setRenamingId(c.id);
                        setRenameText(c.title);
                      }}
                      className="text-xs font-medium text-blue-600"
                    >
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="text-xs font-medium text-red-600">
                      🗑
                    </button>
                    <button onClick={() => setActiveId(null)} className="text-xs font-medium text-neutral-400">
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <a
                  href={`/assistant/chat/${c.id}`}
                  onTouchStart={() => startPress(c.id)}
                  onTouchEnd={cancelPress}
                  onMouseDown={() => startPress(c.id)}
                  onMouseUp={cancelPress}
                  onMouseLeave={cancelPress}
                  className="block rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {c.title}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                    }
