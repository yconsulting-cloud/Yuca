import { getTranslations } from 'next-intl/server';
import Landing from '../components/Landing';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://madebyyuca.com';

  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
    alternates: {
      canonical: locale === 'fr' ? base : `${base}/en`,
      languages: {
        'fr': base,
        'en': `${base}/en`,
        'x-default': base,
      },
    },
  };
}

export default function Page() {
  return <Landing />;
}
