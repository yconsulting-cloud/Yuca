import { notFound } from 'next/navigation';
import PartenaireClient from './PartenaireClient';
import '../partenaire.css';

function slugToName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Basic slug validation: only lowercase letters, numbers, hyphens
function isValidSlug(slug) {
  return /^[a-z0-9-]{1,60}$/.test(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return {};
  const partnerName = slugToName(slug);
  return {
    title: `Offre exclusive recommandée par ${partnerName} — Yuca`,
    description: `${partnerName} vous offre un audit digital gratuit + maquette personnalisée avec Yuca. Site web professionnel livré en 7 jours.`,
    robots: { index: false, follow: false },
  };
}

const S = {
  page: { minHeight: '100vh', background: 'var(--c-bg)', fontFamily: 'var(--ff-body)' },
  banner: {
    background: 'linear-gradient(135deg, #0a0a0b 0%, #141416 100%)',
    color: '#fff',
    padding: '.75rem var(--pad)',
    textAlign: 'center',
    fontSize: '.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
  },
  bannerBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
    background: 'rgba(0,217,255,.15)', border: '1px solid rgba(0,217,255,.3)',
    borderRadius: '9999px', padding: '.2rem .75rem', fontSize: '.8rem',
    fontWeight: 600, color: 'var(--c-accent)',
  },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1.25rem var(--pad)', borderBottom: '1px solid var(--c-border)',
    background: 'var(--c-bg-alt)',
  },
  logo: {
    fontFamily: 'var(--ff-display)', fontSize: '1.4rem', fontWeight: 700,
    letterSpacing: '-.02em', color: 'var(--c-primary)', textDecoration: 'none',
  },
  logoSpan: { color: 'var(--c-accent)' },
  navCta: {
    padding: '.6rem 1.4rem', background: 'var(--c-accent)', color: 'var(--c-bg-dark)',
    borderRadius: '9999px', fontWeight: 600, fontSize: '.875rem', textDecoration: 'none',
  },
  main: { maxWidth: '1100px', margin: '0 auto', padding: '3.5rem var(--pad) 5rem' },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start',
  },
  left: {},
  pill: {
    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
    background: 'rgba(0,217,255,.08)', border: '1px solid rgba(0,217,255,.2)',
    borderRadius: '9999px', padding: '.3rem .9rem',
    fontSize: '.8rem', fontWeight: 600, color: 'var(--c-accent-dark)',
    marginBottom: '1.25rem',
  },
  h1: {
    fontFamily: 'var(--ff-display)', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
    fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.03em',
    color: 'var(--c-primary)', marginBottom: '1rem',
  },
  h1Accent: {
    background: 'linear-gradient(135deg, var(--c-accent) 0%, #0099ff 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  },
  sub: { fontSize: '1.1rem', color: 'var(--c-text-sec)', lineHeight: 1.7, marginBottom: '2rem' },
  gifts: { display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '2.5rem' },
  giftItem: {
    display: 'flex', alignItems: 'flex-start', gap: '.875rem',
    padding: '1rem 1.25rem', background: 'var(--c-bg-alt)',
    border: '1px solid var(--c-border)', borderRadius: 'var(--rad-lg)',
  },
  giftIcon: {
    width: '36px', height: '36px', borderRadius: '9px',
    background: 'rgba(0,217,255,.1)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  },
  giftTitle: { fontWeight: 600, fontSize: '.95rem', color: 'var(--c-primary)', marginBottom: '.1rem' },
  giftDesc: { fontSize: '.82rem', color: 'var(--c-text-sec)' },
  divider: {
    display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0',
    color: 'var(--c-text-ter)', fontSize: '.875rem',
  },
  dividerLine: { flex: 1, height: '1px', background: 'var(--c-border)' },
  altBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
    padding: '1rem', border: '1.5px solid var(--c-border)', borderRadius: 'var(--rad-full)',
    color: 'var(--c-text)', fontWeight: 600, fontSize: '.95rem', textDecoration: 'none',
    transition: 'all .2s', background: 'var(--c-bg-alt)',
  },
  right: {
    position: 'sticky', top: '5rem',
    background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
    borderRadius: 'var(--rad-xl)', padding: '2rem', boxShadow: '0 8px 40px rgba(0,0,0,.07)',
  },
  formTitle: {
    fontFamily: 'var(--ff-display)', fontSize: '1.2rem', fontWeight: 700,
    marginBottom: '.4rem', color: 'var(--c-primary)',
  },
  formSub: { fontSize: '.875rem', color: 'var(--c-text-sec)', marginBottom: '1.5rem' },
  trustRow: {
    display: 'flex', gap: '.75rem', marginTop: '1.5rem', justifyContent: 'center',
    flexWrap: 'wrap',
  },
  trustItem: {
    display: 'flex', alignItems: 'center', gap: '.35rem',
    fontSize: '.78rem', color: 'var(--c-text-ter)',
  },
  footer: {
    borderTop: '1px solid var(--c-border)', padding: '2rem var(--pad)',
    textAlign: 'center', fontSize: '.8rem', color: 'var(--c-text-ter)',
  },
};

export default async function PartenairePage({ params }) {
  const { slug } = await params;

  if (!isValidSlug(slug)) notFound();

  const partnerName = slugToName(slug);

  return (
    <div style={S.page}>
      {/* Top banner */}
      <div style={S.banner}>
        <span style={S.bannerBadge}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>
          Offre exclusive
        </span>
        <span>Recommandé par <strong>{partnerName}</strong> — Audit digital offert</span>
      </div>

      {/* Nav */}
      <nav style={S.nav} role="navigation">
        <a href="https://madebyyuca.com" style={S.logo}>
          Yuca<span style={S.logoSpan}>.</span>
        </a>
        <a href="https://calendar.app.google/Eqx9iTGgPerCmj2u6" style={S.navCta} target="_blank" rel="noopener noreferrer">
          Appel gratuit →
        </a>
      </nav>

      <main style={S.main}>
        <div style={S.grid} className="partenaire-grid">

          {/* Left col */}
          <div style={S.left}>
            <div style={S.pill}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Recommandé par {partnerName}
            </div>

            <h1 style={S.h1}>
              Votre présence en ligne,{' '}
              <span style={S.h1Accent}>prête en 7 jours.</span>
            </h1>

            <p style={S.sub}>
              {partnerName} vous offre un audit complet de votre présence digitale, gratuitement, sans engagement.
              Voici ce que vous recevez dès aujourd&apos;hui :
            </p>

            <div style={S.gifts}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  ),
                  title: 'Audit de votre présence en ligne',
                  desc: 'Google, réseaux sociaux, site actuel — on analyse tout et on vous dit exactement ce qui manque.',
                  delay: '0',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  ),
                  title: 'Maquette personnalisée de votre site',
                  desc: 'Une vraie maquette à votre nom, dans votre secteur, prête en 24h — avant même que vous signiez quoi que ce soit.',
                  delay: '100',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14 19.79 19.79 0 0 1 1.59 5.4 2 2 0 0 1 3.56 3.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 18.3"/></svg>
                  ),
                  title: 'Appel conseil de 15 minutes',
                  desc: 'On vous présente les recommandations et on répond à toutes vos questions. Sans jargon, sans pression.',
                  delay: '200',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={S.giftItem}>
                  <div style={S.giftIcon}>{icon}</div>
                  <div>
                    <div style={S.giftTitle}>{title}</div>
                    <div style={S.giftDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof row */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
              {[
                { value: '7j', label: 'délai de livraison' },
                { value: '0€', label: 'engagement requis' },
                { value: '24h', label: 'pour votre maquette' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, color: 'var(--c-primary)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--c-text-sec)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col — form */}
          <div style={S.right} className="partenaire-right">
            <div style={S.formTitle}>Recevoir mon audit gratuit</div>
            <div style={S.formSub}>
              Remplissez en 30 secondes, je m&apos;occupe du reste.
            </div>

            <PartenaireClient slug={slug} partnerName={partnerName} />

            <div style={S.divider}>
              <div style={S.dividerLine} />
              <span>ou directement</span>
              <div style={S.dividerLine} />
            </div>

            <a
              href="https://calendar.app.google/Eqx9iTGgPerCmj2u6"
              target="_blank"
              rel="noopener noreferrer"
              style={S.altBtn}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Réserver un appel de 15 min
            </a>

            <div style={S.trustRow}>
              {['Sans engagement', 'Réponse en 24h', 'Gratuit'].map(t => (
                <div key={t} style={S.trustItem}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer style={S.footer}>
        <a href="https://madebyyuca.com" style={{ color: 'inherit', fontWeight: 600 }}>madebyyuca.com</a>
        {' '}· Site web · Visuels · Contenu · Recommandé par {partnerName}
      </footer>
    </div>
  );
}
