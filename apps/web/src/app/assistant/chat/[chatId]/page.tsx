'use client';

import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { ChatWindow } from '@/components/assistant/ChatWindow';

export default function ChatConversationPage() {
  const params = useParams();
  const chatId = params?.chatId as string;

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return (
    <AppShell>
      <ChatWindow conversationId={chatId} />
    </AppShell>
  );
}
