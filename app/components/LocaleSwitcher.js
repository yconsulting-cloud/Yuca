'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="locale-switcher" aria-label="Changer de langue / Switch language">
      <button
        className={`locale-btn${locale === 'fr' ? ' locale-btn--active' : ''}`}
        onClick={() => switchLocale('fr')}
        disabled={isPending}
        aria-pressed={locale === 'fr'}
        title="Français"
      >
        🇫🇷
      </button>
      <button
        className={`locale-btn${locale === 'en' ? ' locale-btn--active' : ''}`}
        onClick={() => switchLocale('en')}
        disabled={isPending}
        aria-pressed={locale === 'en'}
        title="English"
      >
        🇬🇧
      </button>
    </div>
  );
}


