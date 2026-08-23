'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@jynta/ui';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

export default function ChatListPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch('/api/chat/conversations')
      .then((res) => res.json())
      .then((data) => setConversations(data.conversations || []));
  }, []);

  async function handleNewChat() {
    setCreating(true);
    const res = await fetch('/api/chat/conversations', { method: 'POST' });
    const data = await res.json();
    setCreating(false);
    if (data.conversation) {
      router.push(`/assistant/chat/${data.conversation.id}`);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-neutral-900">💬 Chat</h1>
          <Button onClick={handleNewChat} loading={creating} variant="primary">
            + New Chat
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {conversations.length === 0 && (
            <p className="text-center text-sm text-neutral-400">No chats yet. Start a new one!</p>
          )}
          {conversations.map((c) => (
            <a
              key={c.id}
              href={`/assistant/chat/${c.id}`}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
