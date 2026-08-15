export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold text-neutral-900">404 — Page Not Found</h1>
      <a href="/home" className="text-sm text-blue-600">Go back home</a>
    </div>
  );
}
