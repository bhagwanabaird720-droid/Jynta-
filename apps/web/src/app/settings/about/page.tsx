import { AppShell } from '@/components/layout/AppShell';

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-neutral-900">ℹ️ About Jynta</h1>
        <p className="mt-2 text-sm text-neutral-500">Version 0.1.0</p>
        <div className="mt-6 flex flex-col gap-2 text-sm text-blue-600">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/help">Help Center</a>
        </div>
      </div>
    </AppShell>
  );
}
