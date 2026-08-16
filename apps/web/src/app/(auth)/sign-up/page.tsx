'use client';

import { useState } from 'react';
import { Button } from '@jynta/ui';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    window.location.href = '/home';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-xl font-bold text-neutral-900">👋 Welcome to Jynta</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">Create your AI Workspace.</p>

        {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="👤 Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />
          <input
            type="password"
            placeholder="🔒 Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm"
          />

          <label className="flex items-center gap-2 text-xs text-neutral-600">
            <input type="checkbox" required /> I agree to Terms & Privacy Policy
          </label>

          <Button type="submit" variant="primary" loading={loading}>
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
