import { AppShell } from '@/components/layout/AppShell';

const items = [
  { icon: '🔑', label: 'Password' },
  { icon: '🔐', label: 'Two-Factor Authentication' },
  { icon: '📱', label: 'Active Sessions' },
  { icon: '🗂', label: 'Data Permissions' },
  { icon: '🕒', label: 'Login History' },
];

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🔒 Privacy & Security</h1>
        <div className="mt-4 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
          {items.map((i) => (
            <div
              key={i.label}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700"
            >
              <span>{i.icon}</span>
              {i.label}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
