'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatEntryPage() {
  const router = useRouter();

  useEffect(() => {
    async function startNewChat() {
      const res = await fetch('/api/chat/conversations', { method: 'POST' });
      const data = await res.json();
      if (data.conversation) {
        router.replace(`/assistant/chat/${data.conversation.id}`);
      }
    }
    startNewChat();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center text-neutral-400">
      Starting new chat...
    </div>
  );
}
