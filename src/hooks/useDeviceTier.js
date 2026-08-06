import { useState, useEffect } from 'react';

export const useDeviceTier = () => {
  const [tier, setTier] = useState('full'); // 'full' | 'reduced' | 'minimal'

  useEffect(() => {
    let newTier = 'full';

    // 1. Check navigator.deviceMemory if available
    if (navigator.deviceMemory) {
      if (navigator.deviceMemory <= 4) {
        newTier = 'reduced';
      }
      if (navigator.deviceMemory <= 2) {
        newTier = 'minimal';
      }
    }

    // 2. Check hardwareConcurrency if available
    if (navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 4 && newTier === 'full') {
        newTier = 'reduced';
      }
    }
    
    // 3. Fallback heuristics for mobile/touch
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
       // Often a proxy for mobile which might need reduced overhead
       // We won't automatically force minimal, but we could cap at reduced.
       if (newTier === 'full') {
           newTier = 'reduced';
       }
    }

    setTier(newTier);
  }, []);

  return tier;
};
