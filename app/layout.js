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
  title: 'Yuca Photos Produit - Générateur de Photos E-commerce Professionnel',
  title: 'Yuca — Sites web & Assistant personnalisé',
  description: 'Création de sites professionnels couplés à un assistant conversationnel qui répond à vos clients 24/7. Sites rapides, optimisés SEO, prêts à convertir.',
  keywords: [
    'création site web',
    'assistant conversationnel',
    'site professionnel',
    'site e-commerce',
    'assistant 24/7',
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
    title: 'Yuca — Sites web & Assistant personnalisé',
    description: 'Site web professionnel + assistant IA. Obtenez un site moderne, référencé et un assistant qui répond pour vous 24/7.',
    url: 'https://madebyyuca.com',
    siteName: 'Yuca',
    images: [
      { url: '/og-image.avif', width: 1200, height: 630, alt: 'Yuca — Sites web & Assistant' },
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'Yuca — Sites web & Assistant' },
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Yuca — Sites web & Assistant' },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
    twitter: {
    card: 'summary_large_image',
    title: 'Yuca — Sites web & Assistant personnalisé',
    description: 'Site professionnel + assistant IA pour gérer vos clients 24/7.',
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
      .hero{min-height:60vh;display:flex;align-items:center;justify-content:space-between;padding:48px 1.5rem;position:relative;overflow:visible}
      .hero__content{max-width:640px;z-index:2}
      .hero__title{font-size:clamp(1.8rem,4vw,3.25rem);line-height:1.05;margin:0 0 .5rem}
      .hero__subtitle{margin:0 0 1rem;color:var(--c-text-sec)}
      .hero__visual{width:48%;min-width:280px;position:relative}
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
              description: 'Création de sites web professionnels couplée à un assistant conversationnel qui répond à vos clients.',
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
