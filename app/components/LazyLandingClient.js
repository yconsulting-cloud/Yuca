"use client";
import { useEffect, useState } from 'react';

export default function LazyLandingClient() {
  const [Loaded, setLoaded] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;

    const load = () => {
      import('./LandingClient').then(mod => {
        if (!cancelled) setLoaded(() => mod.default ?? mod);
      }).catch(() => {});
    };

    // On small screens or touch devices, hydrate immediately so the burger works fast
    const isSmall = window.matchMedia && (window.matchMedia('(max-width: 900px)').matches || window.matchMedia('(hover: none)').matches);
    if (isSmall) {
      load();
      return () => { cancelled = true; };
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => load(), { timeout: 1000 });
      return () => { cancelled = true; cancelIdleCallback(id); };
    }

    const t = setTimeout(load, 600);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  if (!Loaded) return null;
  return <Loaded />;
}
