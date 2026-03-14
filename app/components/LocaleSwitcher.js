'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next) {
    if (next === locale) return;
    startTransition(() => {
      // Strip current locale prefix if present, then add new one
      let path = pathname;
      if (path.startsWith('/en')) {
        path = path.slice(3) || '/';
      }
      const newPath = next === 'en' ? `/en${path === '/' ? '' : path}` : path || '/';
      router.push(newPath);
    });
  }

  return (
    <div className="locale-switcher" aria-label={t('ariaLabel')}>
      <button
        className={`locale-btn${locale === 'fr' ? ' locale-btn--active' : ''}`}
        onClick={() => switchLocale('fr')}
        disabled={isPending}
        aria-pressed={locale === 'fr'}
      >
        {t('fr')}
      </button>
      <span className="locale-sep" aria-hidden="true">/</span>
      <button
        className={`locale-btn${locale === 'en' ? ' locale-btn--active' : ''}`}
        onClick={() => switchLocale('en')}
        disabled={isPending}
        aria-pressed={locale === 'en'}
      >
        {t('en')}
      </button>
    </div>
  );
}
