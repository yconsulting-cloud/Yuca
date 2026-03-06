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
  title: {
    default: 'Yuca — Site web, photos produit et contenu pour commerces',
    template: '%s | Yuca',
  },
  description: 'Yuca crée des sites web sur mesure, génère des photos produit par IA et produit du contenu pour restaurants, caves à vin, artisans et commerces locaux. Made by Yuca.',
  keywords: [
    'site web commerce local',
    'site web restaurant',
    'création site web artisan',
    'photos produit professionnel',
    'photos produit IA',
    'vitrine en ligne commerce',
    'référencement local restaurant',
    'assistant IA commerce',
    'Yuca',
    'Yuca Digital',
    'madebyyuca',
    'made by yuca',
  ].join(', '),
  authors: [{ name: 'Yuca', url: 'https://madebyyuca.com' }],
  creator: 'Yuca',
  publisher: 'Yuca',
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
    title: 'Yuca — Site web, photos produit et contenu pour commerces',
    description: 'Site web sur mesure, photos produit par IA et création de contenu pour restaurants, caves à vin, artisans et commerces locaux. Made by Yuca.',
    url: 'https://madebyyuca.com',
    siteName: 'Yuca',
    images: [
      { url: '/og-image.avif', width: 1200, height: 630, alt: 'Yuca — agence digitale pour commerces locaux' },
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'Yuca — agence digitale pour commerces locaux' },
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Yuca — agence digitale pour commerces locaux' },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuca — Site web, photos produit et contenu pour commerces',
    description: 'Site web sur mesure, photos produit par IA et création de contenu pour restaurants, caves à vin, artisans et commerces locaux.',
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
    google: '',
  },
};

import CookieConsentServer from './components/CookieConsentServer';
import dynamic from 'next/dynamic';

const DeferredWidgets = dynamic(() => import('./components/DeferredWidgetsClient'), { ssr: false });

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://madebyyuca.com/#organization',
  name: 'Yuca',
  alternateName: ['Made by Yuca', 'madebyyuca', 'Yuca Digital'],
  url: 'https://madebyyuca.com',
  logo: 'https://madebyyuca.com/logo.png',
  description: 'Yuca est une agence digitale spécialisée pour les commerces locaux. Nous créons des sites web sur mesure, générons des photos produit par IA avec Shopshots, et produisons du contenu pour restaurants, caves à vin, artisans et commerçants.',
  foundingLocation: { '@type': 'Place', addressCountry: 'FR' },
  areaServed: 'FR',
  sameAs: ['https://www.instagram.com/madebyyuca/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Yuca',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yuca Digital Essentiel',
          description: 'Site web sur mesure + assistant IA 24/7 + Google My Business + emailing. Setup 590€, abonnement 49€/mois.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yuca Digital Pro',
          description: 'Tout le forfait Essentiel + Shopshots inclus + campagne email mensuelle + gestion des avis Google + rapport mensuel. Setup 590€, abonnement 79€/mois.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Shopshots',
          description: 'Générateur de photos produit professionnelles par IA. Sans studio ni photographe. Dès 9€ le pack 10 visuels ou 29€/mois pour 50 visuels.',
          url: 'https://madebyyuca.com/shopshots',
        },
      },
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
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://madebyyuca.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que Yuca ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yuca (aussi connu sous le nom Made by Yuca, madebyyuca.com) est une agence digitale française spécialisée dans la création de sites web pour les commerces locaux : restaurants, caves à vin, artisans, épiceries fines et commerçants. Yuca propose trois services : Yuca Digital (site web + assistant IA + présence Google), Shopshots (générateur de photos produit par IA) et Création de contenu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la création d\'un site web pour un commerce ou un restaurant ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yuca propose deux formules : Yuca Digital Essentiel à 590€ de setup + 49€/mois, et Yuca Digital Pro à 590€ de setup + 79€/mois. Les deux incluent un site web sur mesure, un assistant IA disponible 24h/24, la configuration Google My Business et la maintenance. Le forfait Pro inclut en plus Shopshots, une campagne email mensuelle et la gestion des avis Google.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment créer des photos produit professionnelles sans studio photo ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avec Shopshots de Yuca, vous uploadez une simple photo de votre produit et l\'IA génère des visuels professionnels prêts à publier. Sans studio, sans photographe. Dès 9€ le pack 10 visuels, 19€ le pack 30 visuels, ou 29€/mois pour 50 visuels. Shopshots est inclus dans le forfait Yuca Digital Pro.',
      },
    },
    {
      '@type': 'Question',
      name: 'En combien de temps mon site web est-il mis en ligne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yuca met votre site en ligne en 7 jours. Le processus comprend un échange découverte de 15 minutes, une maquette avec devis fixe, puis la création et mise en ligne complète en une semaine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Yuca travaille avec quels types de commerces ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yuca travaille principalement avec des commerces locaux : restaurants, caves à vin, épiceries fines, artisans, boulangers, fleuristes et tout type de commerce de proximité. L\'offre est conçue pour des professionnels qui veulent une présence en ligne efficace sans s\'occuper de la technique.',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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
        <CookieConsentServer />
        <DeferredWidgets />
        {children}
      </body>
    </html>
  );
}
