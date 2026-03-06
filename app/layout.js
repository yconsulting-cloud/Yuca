import './globals.css';
import { Inter, Sora } from 'next/font/google';

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

export const metadata = {
  title: 'Yuca — Site web, visuels & contenu pour commerces',
  description: 'Site sur mesure, photos produit professionnelles et création de contenu pour restaurateurs, caves à vin, artisans et commerces locaux.',
  keywords: [
    'site web commerce local',
    'site web restaurant',
    'photos produit professionnel',
    'création contenu réseaux sociaux',
    'vitrine en ligne artisan',
    'Yuca',
    'made by yuca',
  ].join(', '),
  authors: [{ name: 'Yuca', url: 'https://madebyyuca.com' }],
  creator: 'Yuca',
  publisher: 'Made by Yuca',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://madebyyuca.com'),
  alternates: {
    canonical: 'https://madebyyuca.com',
  },
    openGraph: {
    title: 'Yuca — Site web, visuels & contenu pour commerces',
    description: 'Site sur mesure, photos produit professionnelles et création de contenu pour restaurateurs, caves à vin, artisans et commerces locaux.',
    url: 'https://madebyyuca.com',
    siteName: 'Yuca',
    images: [
      { url: '/og-image.avif', width: 1200, height: 630, alt: 'Yuca — Site web, visuels & contenu pour commerces' },
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'Yuca — Site web, visuels & contenu pour commerces' },
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Yuca — Site web, visuels & contenu pour commerces' },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
    twitter: {
    card: 'summary_large_image',
    title: 'Yuca — Site web, visuels & contenu pour commerces',
    description: 'Site sur mesure, photos produit pro et création de contenu pour restaurateurs, caves à vin, artisans et commerces locaux.',
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
  verification: {
    google: '', // ajouter le code Google Search Console ici si nécessaire
  },
};

import CookieConsentServer from './components/CookieConsentServer';
import dynamic from 'next/dynamic';

const DeferredWidgets = dynamic(() => import('./components/DeferredWidgetsClient'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Schema.org JSON-LD pour SEO */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Yuca',
              url: 'https://madebyyuca.com',
              description: 'Site web sur mesure, photos produit professionnelles et création de contenu pour commerces locaux, restaurateurs et artisans.',
              provider: { '@type': 'Organization', name: 'Yuca', url: 'https://madebyyuca.com' },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable}`}>
        <CookieConsentServer />
        <DeferredWidgets />
        {children}
      </body>
    </html>
  );
}
