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
  title: 'Yuca — Votre partenaire digital complet',
  description: 'Site web sur mesure, chatbot IA 24/7, visuels produit et création de contenu pour commerces locaux, restaurateurs, artisans. On gère tout pour vous.',
  keywords: [
    'partenaire digital',
    'site web commerce local',
    'chatbot IA restaurant',
    'visuels produit IA',
    'création contenu',
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
    title: 'Yuca — Votre partenaire digital complet',
    description: 'Site sur mesure + chatbot IA + visuels produit + contenu. L\'écosystème digital pour commerces locaux et restaurateurs.',
    url: 'https://madebyyuca.com',
    siteName: 'Yuca',
    images: [
      { url: '/og-image.avif', width: 1200, height: 630, alt: 'Yuca — Partenaire digital complet' },
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'Yuca — Partenaire digital complet' },
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Yuca — Partenaire digital complet' },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
    twitter: {
    card: 'summary_large_image',
    title: 'Yuca — Votre partenaire digital complet',
    description: 'Site + chatbot IA + visuels + contenu pour commerces locaux et restaurateurs.',
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
      .hero{min-height:100vh;display:flex;align-items:center;padding:clamp(5.5rem,13vh,8rem) var(--pad) clamp(3rem,8vh,5rem);position:relative;overflow:hidden}
      .hero__content{max-width:580px;z-index:2}
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
              description: 'Partenaire digital complet pour commerces locaux : site web, chatbot IA, visuels produit et création de contenu.',
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
