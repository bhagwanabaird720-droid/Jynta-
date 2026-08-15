'use client';

import { Button } from '@jynta/ui';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-bold text-neutral-900">🔒 Set New Password</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">
          Enter your new password below.
        </p>

        <form className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            placeholder="🔒 New Password"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="🔒 Confirm New Password"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <Button type="submit" variant="primary">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
