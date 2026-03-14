import '../globals.css';
import { Inter, Sora } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import CookieConsentServer from '../components/CookieConsentServer';
import dynamic from 'next/dynamic';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--ff-body',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--ff-display',
});

const DeferredWidgets = dynamic(() => import('../components/DeferredWidgetsClient'), { ssr: false });

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://madebyyuca.com';

  return {
    title: {
      default: t('layoutTitle'),
      template: t('layoutTitleTemplate'),
    },
    description: t('layoutDesc'),
    keywords: t('layoutKeywords'),
    authors: [{ name: 'Yuca', url: base }],
    creator: 'Yuca',
    publisher: 'Yuca',
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(base),
    alternates: {
      canonical: locale === 'fr' ? base : `${base}/en`,
      languages: {
        'fr': base,
        'en': `${base}/en`,
        'x-default': base,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDesc'),
      url: locale === 'fr' ? base : `${base}/en`,
      siteName: 'Yuca',
      images: [
        { url: '/og-image.avif', width: 1200, height: 630, alt: t('ogImgAlt') },
        { url: '/og-image.webp', width: 1200, height: 630, alt: t('ogImgAlt') },
        { url: '/og-image.jpg', width: 1200, height: 630, alt: t('ogImgAlt') },
      ],
      locale: t('ogLocale'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDesc'),
      creator: '@madebyyuca',
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: { google: '' },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': 'https://madebyyuca.com/#organization',
    name: 'Yuca',
    alternateName: ['Made by Yuca', 'madebyyuca', 'Yuca Digital'],
    url: 'https://madebyyuca.com',
    logo: 'https://madebyyuca.com/logo-full-yuca-nobg.png',
    description: t('schemaOrgDesc'),
    address: { '@type': 'PostalAddress', addressCountry: 'FR' },
    foundingLocation: { '@type': 'Place', addressCountry: 'FR' },
    areaServed: ['FR', 'GB', 'US', 'CA', 'AU'],
    sameAs: ['https://www.instagram.com/madebyyuca/'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('schemaCatalogName'),
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yuca Digital Essentiel', description: t('schemaEssentielDesc') } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yuca Digital Pro', description: t('schemaProDesc') } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopshots', description: t('schemaShopshotsDesc'), url: 'https://madebyyuca.com/shopshots' } },
      ],
    },
  };

  const schemaWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://madebyyuca.com/#website',
    name: 'Yuca',
    url: 'https://madebyyuca.com',
    publisher: { '@id': 'https://madebyyuca.com/#organization' },
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4, 5].map((n) => ({
      '@type': 'Question',
      name: t(`faq${n}Q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`faq${n}A`) },
    })),
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preload" as="image" href="/images/hero-dashboard.avif" type="image/avif" />
        <style>{`/* Critical above-the-fold CSS inlined to improve LCP */
      :root{--pad:clamp(1.5rem,5vw,6%)}
      .nav{position:fixed;top:0;left:0;right:0;padding:16px var(--pad);background:transparent}
      .nav__logo{font-family:var(--ff-display);font-size:1.25rem;font-weight:700}
      .hero{min-height:100vh;display:flex;align-items:center;gap:clamp(3rem,6vw,5rem);padding:clamp(5.5rem,13vh,8rem) var(--pad) clamp(3rem,8vh,5rem);position:relative;overflow:hidden}
      .hero__content{flex:1;min-width:0;max-width:620px;z-index:2}
      .hero__title{font-size:clamp(1.8rem,4vw,3.25rem);line-height:1.05;margin:0 0 .5rem}
      .hero__subtitle{margin:0 0 1rem;color:var(--c-text-sec)}
      .hero__visual{flex:0 0 44%;max-width:540px;position:relative}
      .hero__visual-img{display:block;width:100%;height:auto;object-fit:cover;border-radius:16px}
      .hero__badge,.hero__ctas,.hero__stats{visibility:visible}
      `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      </head>
      <body className={`${inter.variable} ${sora.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <CookieConsentServer />
          <DeferredWidgets />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
