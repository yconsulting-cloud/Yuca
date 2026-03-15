import '../globals.css';
import { Inter, Sora } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--ff-body',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--ff-display',
});

export default function PartenaireLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  );
}
