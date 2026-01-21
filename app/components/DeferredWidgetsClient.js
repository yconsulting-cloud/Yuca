"use client";
import { useEffect, useState } from 'react';

export default function DeferredWidgetsClient() {
  const [Widgets, setWidgets] = useState({ Chat: null, Cookie: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;

    const load = async () => {
      try {
        const [chatMod, cookieMod] = await Promise.all([
          import('./ChatWidget').catch(() => ({})),
          import('./CookieConsent').catch(() => ({})),
        ]);
        if (!cancelled) {
          setWidgets({ Chat: chatMod.default ?? null, Cookie: cookieMod.default ?? null });
        }
      } catch (e) {
        // ignore
      }
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => load(), { timeout: 1500 });
      return () => { cancelled = true; if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id); };
    }

    const t = setTimeout(load, 800);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  const Chat = Widgets.Chat;
  const Cookie = Widgets.Cookie;

  return (
    <>
      {Cookie ? <Cookie /> : null}
      {Chat ? <Chat /> : null}
    </>
  );
}
