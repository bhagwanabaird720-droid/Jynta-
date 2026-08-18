import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@jynta/ui';

export default function SecurityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">🔒 Security</h1>
        <div className="mt-4 flex flex-col gap-3">
          <Button variant="outline">Change Password</Button>
          <Button variant="outline">Enable Two-Factor Authentication</Button>
        </div>
      </div>
    </AppShell>
  );
}
