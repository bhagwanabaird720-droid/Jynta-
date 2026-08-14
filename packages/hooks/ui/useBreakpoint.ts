'use client';

import { useEffect, useState } from 'react';
import { breakpoints } from '@jynta/design-system/tokens/breakpoints';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * useBreakpoint — Jynta ka Responsive Hook
 *
 * < 768px      → mobile  (Sidebar Hidden/Overlay)
 * 768–1024px   → tablet  (Sidebar Collapsed Default)
 * > 1024px     → desktop (Sidebar Full Open Default)
 */
export function useBreakpoint(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('mobile');

  useEffect(() => {
    function calculate() {
      const width = window.innerWidth;
      if (width >= breakpoints.desktop) {
        setDevice('desktop');
      } else if (width >= breakpoints.tablet) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    }

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  return device;
}
