'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function formatContent(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-3">
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
    </div>
  );
}

export function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadingHistory(true);
    fetch(`/api/chat/${conversationId}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .finally(() => setLoadingHistory(false));
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  async function handleSend() {
    if (!input.trim() || sending) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch(`/api/chat/${conversationId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } finally {
      setSending(false);
    }
  }

  function handleCopy(id: string, content: string) {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="flex h-[85vh] flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {loadingHistory && (
          <div className="flex flex-col gap-3">
            <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-neutral-100" />
            <div className="ml-auto h-10 w-1/2 animate-pulse rounded-2xl bg-neutral-100" />
          </div>
        )}

        {!loadingHistory && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <span className="text-3xl">💬</span>
            <p className="text-sm text-neutral-400">Start the conversation...</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`group mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex max-w-[80%] flex-col gap-1">
              <div
                className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-900'
                }`}
              >
                {formatContent(m.content)}
              </div>
              <button
                onClick={() => handleCopy(m.id, m.content)}
                className="self-start text-xs text-neutral-400 opacity-0 transition-opacity hover:text-neutral-600 group-hover:opacity-100"
              >
                {copiedId === m.id ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          </div>
        ))}

        {sending && (
          <div className="mb-3 flex justify-start">
            <div className="rounded-2xl bg-neutral-100">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-neutral-200 p-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type Message..."
            disabled={sending}
            className="flex-1 rounded-full border border-neutral-300 px-4 py-2.5 text-sm disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
        }
