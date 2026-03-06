import ShopshotsClient from './ShopshotsClient';

export const metadata = {
  title: 'Shopshots — Photos produit professionnelles par IA | Yuca',
  description: 'Créez des photos produit professionnelles en quelques clics grâce à l\'IA. Sans studio ni photographe. Dès 9€ le pack 10 visuels. Inclus dans Yuca Digital Pro.',
  alternates: {
    canonical: 'https://madebyyuca.com/shopshots',
  },
};

export default function ShopshotsPage() {
  return <ShopshotsClient />;
}
