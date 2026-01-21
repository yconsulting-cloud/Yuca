"use client";

import { useEffect } from 'react';

export default function CookieConsent() {
  useEffect(() => {
    const el = document.getElementById('cookie-consent-ssr') || document.querySelector('.cookie-consent-wrap');
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    function hide() {
      try {
        if (el) {
          el.style.display = 'none';
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
        }
      } catch (e) {}
    }

    function show() {
      try {
        if (el) {
          el.style.display = 'flex';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.pointerEvents = 'auto';
        }
      } catch (e) {}
    }

    function accept() {
      try {
        localStorage.setItem('yuca_cookie_consent', '1');
        document.cookie = `yuca_cookie_consent=1; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch (e) {}
      hide();
    }

    try {
      if (isLocal) {
        // In local dev always show the consent bar regardless of stored value
        show();
      } else {
        const consent = localStorage.getItem('yuca_cookie_consent');
        if (!consent) show();
        else hide();
      }
    } catch (e) {
      show();
    }

    if (el) {
      const btn = el.querySelector('#cookie-consent-accept') || el.querySelector('.cookie-consent-btn');
      const onAcceptClick = () => {
        accept();
        if (!isLocal) hide();
      };
      if (btn) btn.addEventListener('click', onAcceptClick);
      return () => { if (btn) btn.removeEventListener('click', onAcceptClick); };
    }
  }, []);

  return null;
}
