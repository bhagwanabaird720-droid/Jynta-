import { AppShell } from '@/components/layout/AppShell';

export default function ActivityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">📊 Activity</h1>
        <p className="mt-4 text-center text-sm text-neutral-400">No recent activity yet.</p>
      </div>
    </AppShell>
  );
}
