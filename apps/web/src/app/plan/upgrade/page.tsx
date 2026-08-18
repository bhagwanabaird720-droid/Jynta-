import { AppShell } from '@/components/layout/AppShell';

const plans = [
  { name: 'Free', price: '₹0/mo', features: ['Basic Chat', '5 Creates/day'] },
  { name: 'Pro', price: '₹499/mo', features: ['Unlimited Chat', 'Unlimited Creates', 'Priority Support'] },
];

export default function UpgradePlanPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-xl font-bold text-neutral-900">Upgrade Plan</h1>
        <div className="mt-4 flex flex-col gap-3">
          {plans.map((p) => (
            <div key={p.name} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="font-bold text-neutral-900">{p.name}</p>
              <p className="text-sm text-neutral-500">{p.price}</p>
              <ul className="mt-2 text-xs text-neutral-500">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
