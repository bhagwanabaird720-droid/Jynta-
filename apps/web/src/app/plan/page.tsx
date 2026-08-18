import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@jynta/ui';

export default function PlanPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">💎 Plan</h1>
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Current Plan</p>
          <p className="text-lg font-bold text-neutral-900">Free</p>
          <a href="/plan/upgrade">
            <Button variant="primary" className="mt-4 w-full">
              Upgrade Plan
            </Button>
          </a>
        </div>
      </div>
    </AppShell>
  );
}
