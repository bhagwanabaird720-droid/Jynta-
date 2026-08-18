import { AppShell } from '@/components/layout/AppShell';

const accounts = [
  { icon: '📧', label: 'Google', connected: false },
  { icon: '💬', label: 'WhatsApp', connected: false },
];

export default function ConnectedAccountsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🔗 Connected Accounts</h1>
        <div className="mt-4 flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
          {accounts.map((a) => (
            <div key={a.label} className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <span>{a.icon}</span>
                {a.label}
              </span>
              <span className="text-xs text-neutral-400">Not Connected</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
