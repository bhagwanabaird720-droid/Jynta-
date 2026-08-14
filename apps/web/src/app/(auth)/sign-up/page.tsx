'use client';

import { Button } from '@jynta/ui';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-bold text-neutral-900">👋 Welcome to Jynta</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">Create your AI Workspace.</p>

        <form className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="👤 Full Name"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="email"
            placeholder="📧 Email"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="🔒 Confirm Password"
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />

          <label className="flex items-center gap-2 text-xs text-neutral-600">
            <input type="checkbox" /> I agree to Terms & Privacy Policy
          </label>

          <Button type="submit" variant="primary">
            Create Account
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <a href="/sign-in" className="text-blue-600">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
