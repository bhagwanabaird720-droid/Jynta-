'use client';

import { useParams } from 'next/navigation';

export default function ChatConversationPage() {
  const params = useParams();
  const chatId = params?.chatId as string;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h1 className="text-sm font-medium text-neutral-500">Chat: {chatId}</h1>
      </div>
      <div className="flex-1 p-6">
        <p className="text-center text-neutral-400">Conversation area — coming soon.</p>
      </div>
    </div>
  );
}
