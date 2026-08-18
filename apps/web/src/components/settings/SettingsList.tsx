const categories = [
  { icon: '🌍', label: 'Language', href: '/settings/language' },
  { icon: '🎨', label: 'Theme', href: '/settings/theme' },
  { icon: '🤖', label: 'AI Preferences', href: '/settings/ai' },
  { icon: '🔒', label: 'Privacy & Security', href: '/settings/privacy' },
  { icon: '🔔', label: 'Notifications', href: '/settings/notifications' },
  { icon: '💾', label: 'Storage', href: '/settings/storage' },
  { icon: '📊', label: 'Data & Backup', href: '/settings/data' },
  { icon: 'ℹ️', label: 'About Jynta', href: '/settings/about' },
];

export function SettingsList() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-xl font-bold text-neutral-900">⚙️ Settings</h1>
      <div className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
        {categories.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <span className="flex items-center gap-3">
              <span>{c.icon}</span>
              {c.label}
            </span>
            <span className="text-neutral-300">›</span>
          </a>
        ))}
      </div>
    </div>
  );
}
