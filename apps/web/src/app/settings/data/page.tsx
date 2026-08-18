import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@jynta/ui';

export default function DataBackupPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">📊 Data & Backup</h1>
        <div className="mt-4 flex flex-col gap-3">
          <Button variant="outline">Export Data</Button>
          <Button variant="outline">Import Data</Button>
          <Button variant="outline">Backup Now</Button>
        </div>
      </div>
    </AppShell>
  );
}
