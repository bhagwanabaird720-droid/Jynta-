'use client';

import type { ReactNode } from 'react';

interface CardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Card — Jynta Main Card Component
 * Mobile: Vertical Stack me use hota hai
 * Desktop: Grid me use hota hai (parent Grid layout decide karta hai)
 */
export function Card({ icon, title, description, onClick, className = '' }: CardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-2xl border border-neutral-200
        bg-white p-5 text-left shadow-sm transition-all
        hover:shadow-md hover:-translate-y-0.5
        w-full ${className}`}
    >
      {icon && <div className="text-2xl">{icon}</div>}
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && <p className="text-sm text-neutral-500">{description}</p>}
    </button>
  );
}
