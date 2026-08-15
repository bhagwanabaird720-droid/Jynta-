export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
      <p className="text-sm text-neutral-500">Coming soon.</p>
    </div>
  );
}
