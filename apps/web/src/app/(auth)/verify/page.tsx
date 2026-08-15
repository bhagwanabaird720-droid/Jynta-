'use client';

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-neutral-900">✉️ Verify Your Email</h1>
        <p className="mt-2 text-sm text-neutral-500">
          We've sent a verification link to your email. Please check your inbox.
        </p>
      </div>
    </div>
  );
}
