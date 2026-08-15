export default function MarketingHomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-blue-600">JYNTA</h1>
        <p className="mt-2 text-neutral-500">One AI. One System. Unlimited Possibilities.</p>
        <a
          href="/home"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
