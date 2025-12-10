'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration errors
    const body = document.body;
    const attributesToRemove = [
      'data-atm-ext-installed',
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed',
      'cz-shortcut-listen',
    ];

    attributesToRemove.forEach(attr => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });
  }, []);

  return null;
}
