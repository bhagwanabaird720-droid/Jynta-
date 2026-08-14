/**
 * Jynta Responsive Breakpoints — Single Source of Truth
 *
 * Mobile   (<768px)         → Sidebar Hidden (Overlay), Cards Vertical
 * Tablet   (768px–1024px)   → Sidebar Collapsed Default, Cards 2-Column
 * Desktop  (>1024px)        → Sidebar Full Open Default, Cards 3-4 Column
 */

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaQuery = {
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  wide: `(min-width: ${breakpoints.wide}px)`,
} as const;
