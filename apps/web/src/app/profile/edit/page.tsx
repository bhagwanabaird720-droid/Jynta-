'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@jynta/ui';
import { useAuth } from '@/hooks/useAuth';

export default function EditProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setFullName(user.full_name);
  }, [user]);

  async function handleSave() {
    setLoading(true);
    setSaved(false);
    await fetch('/api/profile/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName }),
    });
    setLoading(false);
    setSaved(true);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">✏️ Edit Profile</h1>

        <div className="mt-6 flex flex-col gap-3">
          <label className="text-sm font-medium text-neutral-600">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />

          <label className="mt-2 text-sm font-medium text-neutral-600">Email</label>
          <input
            value={user?.email || ''}
            disabled
            className="rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-400"
          />

          {saved && <p className="text-sm text-green-600">Saved successfully ✓</p>}

          <Button onClick={handleSave} loading={loading} variant="primary" className="mt-2">
            Save Changes
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
