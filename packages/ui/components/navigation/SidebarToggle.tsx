'use client';

interface SidebarToggleProps {
  onClick: () => void;
}

/**
 * SidebarToggle — ☰ Button
 * Mobile: Sidebar Show/Hide (Overlay)
 * Desktop: Sidebar Full <-> Collapsed
 */
export function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Sidebar"
      className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-neutral-100"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}
