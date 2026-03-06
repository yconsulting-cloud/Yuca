import Landing from './components/Landing';

export const metadata = {
  title: 'Yuca — Création de site web pour commerces et restaurants',
  description: 'Yuca crée votre site web sur mesure, gère votre présence Google et génère vos photos produit par IA. Pour restaurants, caves à vin, artisans et commerces locaux. Dès 49€/mois.',
  alternates: {
    canonical: 'https://madebyyuca.com',
  },
};

export default function Page() {
  return <Landing />;
}
