import { AppShell } from '@/components/layout/AppShell';

const sections = [
  { icon: '💬', title: 'Chat', desc: 'AI से बात करें', href: '/assistant/chat' },
  { icon: '🎨', title: 'Create', desc: 'नई चीज़ बनाएँ', href: '/assistant/create' },
  { icon: '📚', title: 'Learn', desc: 'AI से सीखें', href: '/assistant/learn' },
];

export default function AssistantPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-neutral-900">🟦 Assistant</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md"
            >
              <div className="text-2xl">{s.icon}</div>
              <h3 className="mt-2 font-semibold text-neutral-900">{s.title}</h3>
              <p className="text-sm text-neutral-500">{s.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
