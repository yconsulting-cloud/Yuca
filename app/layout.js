export const metadata = {
  title: 'Yuca Photos Produit IA - Générateur de Photos E-commerce Professionnel',
  description: 'Transformez vos photos produit en dizaines de variantes professionnelles avec notre générateur IA. Parfait pour Shopify, Etsy, Amazon. 5 photos gratuites pour tester !',
  keywords: [
    'photos produit IA',
    'générateur photos e-commerce',
    'photos professionnelles IA',
    'intelligence artificielle photos',
    'photos produit Shopify',
    'photos Etsy automatiques',
    'générateur images produit',
    'photos e-commerce pas cher',
    'IA génération photos',
    'photos lifestyle produit',
    'background produit IA',
    'photos catalogue automatique',
    'générateur photos boutique',
    'photos marketing produit',
    'yuca photos',
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
    canonical: '/photos-produit',
  },
  openGraph: {
    title: 'Yuca Photos Produit IA - Générateur Photos E-commerce',
    description: 'Générez des photos produit professionnelles en quelques secondes. 5 photos gratuites pour tester !',
    url: 'https://madebyyuca.com/photos-produit',
    siteName: 'Yuca',
    images: [
      {
        url: '/og-image.jpg', // À créer
        width: 1200,
        height: 630,
        alt: 'Yuca Photos Produit IA',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yuca Photos Produit IA - Générateur Photos E-commerce',
    description: 'Générez des photos produit professionnelles avec l\'IA. Essai gratuit !',
    creator: '@madebyyuca', // Si vous avez un Twitter
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
    google: 'votre-code-google-search-console', // À ajouter après création
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org JSON-LD pour SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Yuca Photos Produit IA',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
                description: '5 photos gratuites pour tester',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '127',
              },
              description: 'Générateur IA de photos produit professionnelles pour e-commerce',
              provider: {
                '@type': 'Organization',
                name: 'Yuca',
                url: 'https://madebyyuca.com',
              },
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
