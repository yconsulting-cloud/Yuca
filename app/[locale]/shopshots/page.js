import { getTranslations } from 'next-intl/server';
import ShopshotsClient from '../../shopshots/ShopshotsClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://madebyyuca.com';

  return {
    title: t('shopshotsTitle'),
    description: t('shopshotsDesc'),
    alternates: {
      canonical: locale === 'fr' ? `${base}/shopshots` : `${base}/en/shopshots`,
      languages: {
        'fr': `${base}/shopshots`,
        'en': `${base}/en/shopshots`,
        'x-default': `${base}/shopshots`,
      },
    },
  };
}

export default function ShopshotsPage() {
  return <ShopshotsClient />;
}
