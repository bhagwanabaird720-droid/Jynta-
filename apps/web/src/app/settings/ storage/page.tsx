import { AppShell } from '@/components/layout/AppShell';

export default function StoragePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">💾 Storage</h1>
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Used</span>
            <span>0 MB of 5 GB</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-[1%] bg-blue-600" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
