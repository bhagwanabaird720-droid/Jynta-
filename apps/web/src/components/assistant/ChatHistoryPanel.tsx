'use client';

import { useEffect, useState } from 'react';

interface Conversation {
  id: string;
  title: string;
}

export function ChatHistoryPanel({ onClose }: { onClose: () => void }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/chat/conversations')
      .then((res) => res.json())
      .then((data) => setConversations(data.conversations || []))
      .finally(() => setLoading(false));
  }, []);

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
            <a
              key={c.id}
              href={`/assistant/chat/${c.id}`}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
