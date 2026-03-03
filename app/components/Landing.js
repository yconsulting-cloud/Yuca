export const metadata = {
  title: 'Yuca — Site web, visuels & contenu pour commerces',
  description: 'Site sur mesure, photos produit professionnelles et création de contenu pour restaurateurs, caves à vin, artisans et commerces locaux.',
};

import LazyLandingClient from './LazyLandingClient';

export default function Landing() {
  return (
    <>
      <LazyLandingClient />
      <nav className="nav" id="nav" role="navigation" aria-label="Navigation principale">
        <a href="#" className="nav__logo" aria-label="Yuca - Accueil">Yuca<span>.</span></a>
        <ul className="nav__links">
          <li><a href="#services" className="nav__link">Services</a></li>
          <li><a href="#comment" className="nav__link">Process</a></li>
          <li><a href="#tarifs" className="nav__link">Tarifs</a></li>
          <li><a href="#contact" className="nav__link">Contact</a></li>
          <li><a href="/shopshots" className="nav__link nav__link--accent">Shopshots</a></li>
        </ul>
        <a href="#contact" className="nav__cta">Devis gratuit</a>
        <button className="nav__burger" id="navBurger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </nav>
      <div className="nav-overlay" id="navOverlay" data-visible="false"></div>
      <nav className="nav-mobile" id="navMobile" data-open="false">
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#comment">Process</a></li>
          <li><a href="#tarifs">Tarifs</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/shopshots">Shopshots</a></li>
        </ul>
        <a href="#contact" className="nav-mobile__cta">Devis gratuit</a>
      </nav>

      <main id="main">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero__bg"></div>
          <div className="hero__grid"></div>
          <div className="hero__glow"></div>
          <div className="hero__content">
            <div className="hero__badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>
              Restaurants · Caves · Artisans · Commerces
            </div>
            <h1 className="hero__title">
              La présence en ligne<br />
              <span className="hero__title-gradient">qui vous fait gagner</span><br />
              de nouveaux clients.
            </h1>
            <p className="hero__subtitle">
              Site sur mesure, photos produit pro, contenu créatif — trois expertises pour faire rayonner votre commerce, sans que vous ayez à vous en occuper.
            </p>
            <div className="hero__ctas">
              <a href="#contact" className="hero__cta hero__cta--primary">
                Obtenir un devis gratuit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#services" className="hero__cta hero__cta--secondary">Voir nos offres</a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">7<span>j</span></span>
                <span className="hero__stat-label">Site en ligne</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">24<span>/7</span></span>
                <span className="hero__stat-label">Pour vos clients</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">0<span>€</span></span>
                <span className="hero__stat-label">Devis & conseils</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <picture>
              <source srcSet="/images/hero-dashboard.avif" type="image/avif" />
              <source srcSet="/images/hero-dashboard.webp" type="image/webp" />
              <img className="hero__visual-img" src="/images/hero-dashboard.jpg" alt="Dashboard Yuca" width="600" height="380" loading="eager" fetchpriority="high" />
            </picture>
            <div className="hero__visual-float hero__visual-float--1">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p className="hero__visual-float-text">Nouveau message</p>
              <p className="hero__visual-float-sub">Réponse en cours…</p>
            </div>
            <div className="hero__visual-float hero__visual-float--2">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <p className="hero__visual-float-text">RDV confirmé</p>
              <p className="hero__visual-float-sub">Automatiquement</p>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="section" id="services">
          <div className="section__header" data-reveal>
            <span className="section__label">Nos expertises</span>
            <h2 className="section__title">Trois façons de briller en ligne</h2>
            <p className="section__subtitle">Des services distincts, pensés pour compléter votre présence selon vos besoins — ensemble ou séparément.</p>
          </div>
          <div className="container">
            <div className="services__grid">

              {/* Yuca Digital */}
              <article className="service-card service-card--primary-offer" data-reveal data-reveal-delay="100">
                <span className="service-card__tag">Forfait complet</span>
                <div className="service-card__header">
                  <h3 className="service-card__title">Yuca Digital</h3>
                  <p className="service-card__subtitle">Site sur mesure + assistant + présence Google</p>
                </div>
                <div className="service-card__price">
                  <span className="service-card__price-value">590€</span>
                  <span className="service-card__price-period">setup + à partir de 49€/mois</span>
                </div>
                <ul className="service-card__features">
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Site web sur mesure, rapide et mobile</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Assistant disponible 24h/24 pour vos clients</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Google My Business configuré & optimisé</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Emailing & alertes clients inclus</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Maintenance & support inclus</li>
                </ul>
                <a href="#tarifs" className="service-card__cta service-card__cta--primary">Voir les formules</a>
              </article>

              {/* Shopshots */}
              <article className="service-card" data-reveal data-reveal-delay="200">
                <span className="service-card__tag service-card__tag--tool">Outil en autonomie</span>
                <div className="service-card__header">
                  <h3 className="service-card__title">Shopshots</h3>
                  <p className="service-card__subtitle">Photos produit pro — sans studio ni photographe</p>
                </div>
                <div className="service-card__price">
                  <span className="service-card__price-value">9€</span>
                  <span className="service-card__price-period">à partir de / 10 visuels</span>
                </div>
                <ul className="service-card__features">
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Packshots & visuels produit qualité pro</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Plusieurs décors & ambiances au choix</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Téléchargement immédiat en ZIP</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Utilisable partout : site, réseaux, menus</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Essai gratuit disponible</li>
                </ul>
                <a href="/shopshots" className="service-card__cta service-card__cta--secondary">Essayer Shopshots</a>
              </article>

              {/* Création de contenu */}
              <article className="service-card" data-reveal data-reveal-delay="300">
                <span className="service-card__tag service-card__tag--studio">Studio créatif</span>
                <div className="service-card__header">
                  <h3 className="service-card__title">Création de contenu</h3>
                  <p className="service-card__subtitle">Vidéo, photo, réseaux sociaux — clé en main</p>
                </div>
                <div className="service-card__price">
                  <span className="service-card__price-value">Sur devis</span>
                  <span className="service-card__price-period">service sur mesure</span>
                </div>
                <ul className="service-card__features">
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Vidéos courtes & contenus réseaux sociaux</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Séances photo professionnelles</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Calendrier éditorial clé en main</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Adapté à votre identité & votre cible</li>
                  <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Pilotage & publication inclus</li>
                </ul>
                <a href="#contact" className="service-card__cta service-card__cta--secondary">Demander un devis</a>
              </article>

            </div>
          </div>
        </section>

        {/* ── ASSISTANT ────────────────────────────────────── */}
        <section className="section" style={{background: '#f8fafc'}}>
          <div className="container">
            <div className="image-text" data-reveal>
              <div className="image-text__visual">
                <picture>
                  <source srcSet="/images/assistant.avif" type="image/avif" />
                  <source srcSet="/images/assistant.webp" type="image/webp" />
                  <img className="image-text__img" src="/images/assistant.jpg" alt="Assistant conversationnel Yuca" width="700" height="467" loading="lazy" />
                </picture>
                <div className="image-text__float image-text__float--stats">
                  <span className="image-text__float-value">24/7</span>
                  <span className="image-text__float-label">Toujours disponible</span>
                </div>
              </div>
              <div className="image-text__content">
                <span className="section__label">Yuca répond pour vous</span>
                <h2 className="image-text__title">Même à 3h du matin, vos clients ont une réponse.</h2>
                <p className="image-text__desc">Votre assistant connaît votre activité par cœur — horaires, tarifs, services, disponibilités. Vos clients obtiennent une réponse immédiate. Vous ne ratez plus aucune opportunité.</p>
                <ul className="image-text__list">
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Formé spécifiquement sur votre activité</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Répond en français et en anglais</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Transfère les demandes vers vous si besoin</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Zéro maintenance de votre côté</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SITE ─────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="image-text image-text--reverse" data-reveal>
              <div className="image-text__visual">
                <picture>
                  <source srcSet="/images/site.avif" type="image/avif" />
                  <source srcSet="/images/site.webp" type="image/webp" />
                  <img className="image-text__img" src="/images/site.jpg" alt="Site web professionnel" width="700" height="467" loading="lazy" />
                </picture>
              </div>
              <div className="image-text__content">
                <span className="section__label">Site web</span>
                <h2 className="image-text__title">Un site qui vous ressemble — et qui convainc.</h2>
                <p className="image-text__desc">Pas de template générique. Chaque site est conçu sur mesure pour refléter votre identité et transformer vos visiteurs en clients. Optimisé pour Google, rapide, impeccable sur mobile.</p>
                <ul className="image-text__list">
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Design moderne, pensé pour votre clientèle</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Optimisé pour le référencement local</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Parfait sur mobile et tablette</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Fiche Google My Business optimisée</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES DARK ────────────────────────────────── */}
        <section className="section section--dark">
          <div className="section__header" data-reveal>
            <span className="section__label">Inclus avec Yuca Digital</span>
            <h2 className="section__title">Tout ce qu'il faut pour être trouvé, contacté et choisi.</h2>
            <p className="section__subtitle">Chaque détail est pris en charge. Vous, vous vous concentrez sur ce que vous faites de mieux.</p>
          </div>
          <div className="container">
            <div className="features__grid">
              <article className="feature-card" data-reveal data-reveal-delay="100">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
                <h3 className="feature-card__title">SEO & Google Maps</h3>
                <p className="feature-card__desc">Votre site optimisé pour apparaître en premier dans les recherches locales. Fiche Google My Business créée et configurée.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="200">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
                <h3 className="feature-card__title">Alertes en temps réel</h3>
                <p className="feature-card__desc">Un email ou SMS dès qu'un client vous contacte ou prend rendez-vous. Ne ratez plus aucune opportunité.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="300">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <h3 className="feature-card__title">Site sécurisé (HTTPS)</h3>
                <p className="feature-card__desc">Certificat SSL inclus. Vos visiteurs voient le cadenas de confiance — gage de sérieux pour votre commerce.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="400">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                <h3 className="feature-card__title">Design & Réseaux</h3>
                <p className="feature-card__desc">Visuels, intégrations sociales et identité visuelle pour mettre vos produits et services en valeur.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="500">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <h3 className="feature-card__title">Photos & Visuels</h3>
                <p className="feature-card__desc">Retouches et mises en scène de vos produits pour une présentation irréprochable sur votre site et vos réseaux.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="600">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
                <h3 className="feature-card__title">Support & Formation</h3>
                <p className="feature-card__desc">On vous accompagne à chaque étape et vous formons à piloter votre présence en toute autonomie.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="section" id="comment">
          <div className="section__header" data-reveal>
            <span className="section__label">Comment ça marche</span>
            <h2 className="section__title">De zéro à en ligne en 7 jours.</h2>
            <p className="section__subtitle">Un process rodé, sans jargon technique. Vous parlez de votre commerce — on s'occupe du reste.</p>
          </div>
          <div className="container">
            <div className="process__grid">
              <div className="process-step" data-reveal data-reveal-delay="100">
                <div className="process-step__number">1</div>
                <h3 className="process-step__title">Échange découverte</h3>
                <p className="process-step__desc">15 min pour comprendre votre activité, vos ambitions et vos besoins. Gratuit, sans engagement.</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="200">
                <div className="process-step__number">2</div>
                <h3 className="process-step__title">Maquette & devis fixe</h3>
                <p className="process-step__desc">On vous présente le design de votre site. Prix ferme, aucune surprise en cours de route.</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="300">
                <div className="process-step__number">3</div>
                <h3 className="process-step__title">Création en 7 jours</h3>
                <p className="process-step__desc">Développement du site et configuration complète de votre assistant et de votre présence Google.</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="400">
                <div className="process-step__number">4</div>
                <h3 className="process-step__title">Mise en ligne</h3>
                <p className="process-step__desc">Votre site est live. Vos clients vous trouvent. On reste là si vous avez besoin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TARIFS ───────────────────────────────────────── */}
        <section className="section" style={{background: '#f8fafc'}} id="tarifs">
          <div className="section__header" data-reveal>
            <span className="section__label">Tarifs clairs</span>
            <h2 className="section__title">Des formules adaptées à chaque besoin</h2>
            <p className="section__subtitle">Pas de frais cachés, pas de mauvaise surprise. Ce que vous voyez, c'est ce que vous payez.</p>
          </div>
          <div className="container">

            {/* Groupe Yuca Digital */}
            <div className="pricing__group" data-reveal>
              <div className="pricing__group-header">
                <span className="pricing__group-tag">Forfait complet</span>
                <h3 className="pricing__group-title">Yuca Digital</h3>
                <p className="pricing__group-desc">Votre présence en ligne complète, gérée pour vous chaque mois.</p>
              </div>
              <div className="services__grid services__grid--two" style={{marginBottom: 'var(--sp-16)'}}>
                <article className="service-card" data-reveal>
                  <div className="service-card__header">
                    <h3 className="service-card__title">Essentiel</h3>
                    <p className="service-card__subtitle">Site + assistant + maintenance + support</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">590€</span>
                    <span className="service-card__price-period">setup + 49€/mois</span>
                  </div>
                  <ul className="service-card__features">
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Site web sur mesure responsive</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Assistant conversationnel 24h/24</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Google My Business configuré</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Emailing Brevo configuré</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Maintenance & support inclus</li>
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--secondary">Choisir Essentiel</a>
                </article>
                <article className="service-card service-card--featured" data-reveal data-reveal-delay="200">
                  <span className="service-card__badge">Recommandé</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">Pro</h3>
                    <p className="service-card__subtitle">Essentiel + email marketing + avis Google</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">590€</span>
                    <span className="service-card__price-period">setup + 79€/mois</span>
                  </div>
                  <ul className="service-card__features">
                    <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Tout l'Essentiel inclus</li>
                    <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> 1 campagne email/mois</li>
                    <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Gestion des avis Google</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Rapport mensuel de performance</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Support prioritaire</li>
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--primary">Choisir Pro</a>
                </article>
              </div>
            </div>

            {/* Shopshots + Contenu */}
            <div className="pricing__group pricing__group--secondary" data-reveal>
              <div className="pricing__group-header">
                <span className="pricing__group-tag pricing__group-tag--other">Autres services</span>
                <h3 className="pricing__group-title">Shopshots & Création de contenu</h3>
                <p className="pricing__group-desc">Utilisables seuls ou en complément de Yuca Digital.</p>
              </div>
              <div className="services__grid services__grid--two">
                <article className="service-card" data-reveal>
                  <span className="service-card__tag service-card__tag--tool">Outil en autonomie</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">Shopshots</h3>
                    <p className="service-card__subtitle">Photos produit pro — sans studio</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">9€</span>
                    <span className="service-card__price-period">à partir de / pack 10 visuels</span>
                  </div>
                  <ul className="service-card__features">
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Pack 10 visuels : 9€</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Pack 30 visuels : 19€</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Abonnement 20 visuels/mois : 29€/mois</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> HD, usage commercial inclus</li>
                  </ul>
                  <a href="/shopshots" className="service-card__cta service-card__cta--secondary">Essayer Shopshots</a>
                </article>
                <article className="service-card" data-reveal data-reveal-delay="200">
                  <span className="service-card__tag service-card__tag--studio">Studio créatif</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">Création de contenu</h3>
                    <p className="service-card__subtitle">Vidéo, photo, réseaux — entièrement géré</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">Sur devis</span>
                    <span className="service-card__price-period">service sur mesure</span>
                  </div>
                  <ul className="service-card__features">
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Vidéos & contenus réseaux sociaux</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Séances photo professionnelles</li>
                    <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Calendrier éditorial & publication</li>
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--secondary">Demander un devis</a>
                </article>
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-section__bg"></div>
          <div className="cta-section__glow"></div>
          <div className="cta-section__content" data-reveal>
            <h2 className="cta-section__title">Prenons 15 minutes pour parler de votre commerce.</h2>
            <p className="cta-section__subtitle">Un échange gratuit, sans engagement. On vous dit concrètement ce qu'on peut faire pour vous.</p>
            <a href="#contact" className="cta-section__btn">
              Réserver un échange gratuit
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact__grid">
              <div className="contact__info" data-reveal>
                <h2 className="contact__info-title">Parlons de votre projet</h2>
                <p className="contact__info-desc">Remplissez le formulaire. On revient vers vous sous 24h avec des recommandations concrètes, adaptées à votre activité.</p>
              </div>
              <form className="contact__form" id="contactForm" data-reveal data-reveal-delay="200">
                <div className="form__row">
                  <div className="form__group"><label className="form__label" htmlFor="name">Nom *</label><input className="form__input" type="text" id="name" name="name" required /></div>
                  <div className="form__group"><label className="form__label" htmlFor="email">Email *</label><input className="form__input" type="email" id="email" name="email" required /></div>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="phone">Téléphone</label>
                  <input className="form__input" type="tel" id="phone" name="phone" placeholder="Pour être rappelé rapidement" />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="business">Votre activité *</label>
                  <select className="form__select" id="business" name="business" required>
                    <option value="">Sélectionner</option>
                    <option value="restaurant">Restaurant / Traiteur</option>
                    <option value="cave-epicerie">Cave à vin / Épicerie fine</option>
                    <option value="artisan">Artisan</option>
                    <option value="commerce">Commerce local</option>
                    <option value="service">Prestataire de service</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="offer">Ce qui vous intéresse</label>
                  <select className="form__select" id="offer" name="offer">
                    <option value="">Sélectionner</option>
                    <option value="digital-essentiel">Yuca Digital Essentiel (590€ + 49€/mois)</option>
                    <option value="digital-pro">Yuca Digital Pro (590€ + 79€/mois)</option>
                    <option value="shopshots">Shopshots — photos produit</option>
                    <option value="contenu">Création de contenu (sur devis)</option>
                    <option value="ne-sait-pas">Je ne sais pas encore</option>
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="project">Votre projet en quelques mots</label>
                  <textarea className="form__textarea" id="project" name="project" placeholder="Votre activité, vos besoins, vos questions…"></textarea>
                </div>
                <button className="form__submit" type="submit">Envoyer ma demande</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="footer__content">
          <a href="#" className="footer__logo">Yuca<span>.</span></a>
          <p>Basé en France — intervention à distance dans le monde entier.</p>
          <nav className="footer__links">
            <a href="#services" className="footer__link">Services</a>
            <a href="#tarifs" className="footer__link">Tarifs</a>
            <a href="#contact" className="footer__link">Contact</a>
            <a href="/mentions-legales.html" className="footer__link">Mentions légales</a>
            <a href="/politique-confidentialite.html" className="footer__link">Confidentialité</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© <span id="year"></span> Yuca. Site web · Visuels · Contenu.</p>
          <div className="footer__social">
            <a href="https://www.instagram.com/madebyyuca/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 11.37 7 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="0.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
