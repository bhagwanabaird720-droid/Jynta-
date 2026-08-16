'use client';

import { useState } from 'react';
import { Button } from '@jynta/ui';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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
        <h1 className="text-center text-xl font-bold text-neutral-900">👋 Welcome Back</h1>
        <p className="mt-1 text-center text-sm text-neutral-500">Continue your AI journey.</p>

        {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-neutral-600">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password" className="text-blue-600">
              Forgot Password
            </a>
          </div>

          <Button type="submit" variant="primary" loading={loading}>
            Log In
          </Button>
          <a href="/sign-up">
            <Button type="button" variant="outline" className="w-full">
              Create New Account
            </Button>
          </a>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-400">Or continue with</div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          <button className="rounded-lg border border-neutral-300 py-2 text-xs">Google</button>
          <button className="rounded-lg border border-neutral-300 py-2 text-xs">Apple</button>
          <button className="rounded-lg border border-neutral-300 py-2 text-xs">Microsoft</button>
          <button className="rounded-lg border border-neutral-300 py-2 text-xs">GitHub</button>
        </div>
      </div>
    </div>
  );
}
