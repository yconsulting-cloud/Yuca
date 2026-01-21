export const metadata = {
  title: 'Yuca — Marketing (Landing)',
  description: 'Marketing landing integrated into the Next app',
};

import LazyLandingClient from './LazyLandingClient';
import Image from 'next/image';

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
          <li><a href="/shopshots" className="nav__link" style={{textDecoration: 'underline'}}>Shopshots <span style={{fontWeight:500, marginLeft:6}}>(Nouveauté)</span></a></li>
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
          <li><a href="/shopshots" style={{textDecoration: 'underline'}}>Shopshots <span style={{fontWeight:500, marginLeft:6}}>(Nouveauté)</span></a></li>
        </ul>
        <a href="#contact" className="nav-mobile__cta">Devis gratuit</a>
      </nav>

      <main id="main">
        <section className="hero">
          <div className="hero__bg"></div>
          <div className="hero__grid"></div>
          <div className="hero__glow"></div>
          <div className="hero__content">
            <div className="hero__badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg> Sites web nouvelle génération</div>
            <h1 className="hero__title">Votre site pro livré en <span className="hero__title-gradient">10 jours</span>.<br/>Yuca répond à vos clients 24/7.</h1>
            <p className="hero__subtitle">Artisans, commerçants, restaurateurs : obtenez un site moderne qui répond, informe et prend les demandes, même quand vous êtes occupé.</p>
            <div className="hero__ctas">
              <a href="#contact" className="hero__cta hero__cta--primary">Demander un devis gratuit <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              <a href="#services" className="hero__cta hero__cta--secondary">Voir les offres</a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat"><span className="hero__stat-value">10<span>j</span></span><span className="hero__stat-label">Délai de livraison</span></div>
              <div className="hero__stat"><span className="hero__stat-value">24<span>/7</span></span><span className="hero__stat-label">Assistant Yuca actif</span></div>
              <div className="hero__stat"><span className="hero__stat-value">0<span>€</span></span><span className="hero__stat-label">Devis & conseils</span></div>
            </div>
          </div>
          <div className="hero__visual">
            <picture>
              <source srcSet="/images/hero-dashboard.avif" type="image/avif" />
              <source srcSet="/images/hero-dashboard.webp" type="image/webp" />
              <img className="hero__visual-img" src="/images/hero-dashboard.jpg" alt="Dashboard moderne" width="600" height="380" loading="eager" fetchpriority="high" />
            </picture>
            <div className="hero__visual-float hero__visual-float--1">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p className="hero__visual-float-text">Votre Assistant</p>
              <p className="hero__visual-float-sub">Répond 24/7</p>
            </div>
            <div className="hero__visual-float hero__visual-float--2">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <p className="hero__visual-float-text">RDV auto</p>
              <p className="hero__visual-float-sub">Sans effort</p>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section__header" data-reveal>
            <span className="section__label">Pourquoi Yuca</span>
            <h2 className="section__title">Tout ce qu'il faut pour être visible en ligne</h2>
            <p className="section__subtitle">Un site web professionnel couplé à des outils intelligents qui travaillent pour vous.</p>
          </div>
          <div className="container">
            <div className="value__grid">
              <article className="value-card" data-reveal data-reveal-delay="100">
                <div className="value-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
                <h3 className="value-card__title">Un site qui vous ressemble</h3>
                <p className="value-card__desc"> Un site professionnel adapté à votre activité. Rapide, lisible sur mobile, visible sur Google.</p>
              </article>
              <article className="value-card" data-reveal data-reveal-delay="200">
                <div className="value-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <h3 className="value-card__title">Yuca répond pour vous</h3>
                <p className="value-card__desc">Horaires, tarifs, disponibilités... Vos clients ont une réponse immédiate, même à 3h du matin.</p>
              </article>
              <article className="value-card" data-reveal data-reveal-delay="300">
                <div className="value-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
                <h3 className="value-card__title">Moins d'appels, plus de clients</h3>
                <p className="value-card__desc">Devis, RDV, réservations : vos clients passent à l'action directement depuis votre site.</p>
              </article>
              <article className="value-card" data-reveal data-reveal-delay="400">
                <div className="value-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                <h3 className="value-card__title">En ligne dans 10 jours</h3>
                <p className="value-card__desc">Vous nous envoyez vos infos, on s'occupe de tout. Pas de délais interminables.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" style={{background: '#f8fafc'}}>
          <div className="container">
            <div className="image-text" data-reveal>
              <div className="image-text__visual">
                <picture>
                  <source srcSet="/images/assistant.avif" type="image/avif" />
                  <source srcSet="/images/assistant.webp" type="image/webp" />
                  <img className="image-text__img" src="/images/assistant.jpg" alt="Assistant IA conversationnel" width="700" height="467" loading="lazy" />
                </picture>
                <div className="image-text__float image-text__float--stats">
                  <span className="image-text__float-value">24/7</span>
                  <span className="image-text__float-label">Toujours actif</span>
                </div>
              </div>
              <div className="image-text__content">
                <span className="section__label">Yuca répond pour vous</span>
                <h2 className="image-text__title">Même à 3h du matin, vos clients ont une réponse.</h2>
                <p className="image-text__desc">Yuca connaît votre activité par cœur. Horaires, tarifs, services, disponibilités... Vos clients obtiennent une réponse immédiate. Vous ne ratez plus aucune demande.</p>
                <ul className="image-text__list">
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Formé spécifiquement sur votre activité</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Répond naturellement en français ou en anglais</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Transfère les demandes vers vous si nécessaire</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Aucune maintenance de votre côté</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
                <h2 className="image-text__title">Un site qui vous ressemble et qui convertit</h2>
                <p className="image-text__desc">Pas de template générique. Chaque site est conçu sur mesure pour refléter votre identité et convaincre vos visiteurs de vous contacter. Optimisé pour Google, rapide, beau sur mobile.</p>
                <ul className="image-text__list">
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Design moderne et professionnel</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Optimisé pour le référencement local</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Parfait sur mobile et tablette</li>
                  <li className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg> Fiche Google My Business incluse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <div className="section__header" data-reveal>
            <span className="section__label">Inclus dans chaque offre</span>
            <h2 className="section__title">Tout pour réussir en ligne</h2>
            <p className="section__subtitle">Des outils concrets qui font la différence pour votre business.</p>
          </div>
          <div className="container">
            <div className="features__grid">
              <article className="feature-card" data-reveal data-reveal-delay="100">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
                <h3 className="feature-card__title">SEO & Google Maps</h3>
                <p className="feature-card__desc">Votre site optimisé pour apparaître dans les recherches locales. Fiche Google My Business créée et optimisée.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="200">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
                <h3 className="feature-card__title">Notifications</h3>
                <p className="feature-card__desc">Recevez un email ou SMS dès qu'un client vous contacte ou prend rendez-vous. Ne ratez rien.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="300">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <h3 className="feature-card__title">Site sécurisé (HTTPS)</h3>
                <p className="feature-card__desc">Certificat SSL inclus. Vos visiteurs voient le cadenas vert, signe de confiance.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="400">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                <h3 className="feature-card__title">Design & Réseaux</h3>
                <p className="feature-card__desc">Images, visuels et intégrations sociales pour valoriser vos produits et services.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="500">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <h3 className="feature-card__title">Retouches & Variantes</h3>
                <p className="feature-card__desc">Traitement photo et variantes pour présenter chaque produit sous son meilleur angle.</p>
              </article>
              <article className="feature-card" data-reveal data-reveal-delay="600">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
                <h3 className="feature-card__title">Support & Formation</h3>
                <p className="feature-card__desc">Assistance et formation pour tirer le meilleur parti de vos outils Yuca.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="comment">
          <div className="section__header" data-reveal>
            <span className="section__label">Comment ça marche</span>
            <h2 className="section__title">4 étapes simples</h2>
            <p className="section__subtitle">Vous nous parlez de votre activité, nous nous occupons de tout le reste.</p>
          </div>
          <div className="container">
            <div className="process__grid">
              <div className="process-step" data-reveal data-reveal-delay="100">
                <div className="process-step__number">1</div>
                <h3 className="process-step__title">Échange découverte</h3>
                <p className="process-step__desc">15 min pour comprendre votre activité et vos besoins. Gratuit.</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="200">
                <div className="process-step__number">2</div>
                <h3 className="process-step__title">Maquette & devis</h3>
                <p className="process-step__desc">Nous vous montrons le design. Prix fixe, sans surprise.</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="300">
                <div className="process-step__number">3</div>
                <h3 className="process-step__title">Création (7 jours)</h3>
                <p className="process-step__desc">Développement du site et configuration de votre assistant Yuca</p>
              </div>
              <div className="process-step" data-reveal data-reveal-delay="400">
                <div className="process-step__number">4</div>
                <h3 className="process-step__title">Mise en ligne</h3>
                <p className="process-step__desc">Votre site est live. Les clients arrivent.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{background: '#f8fafc'}} id="tarifs">
          <div className="section__header" data-reveal>
            <span className="section__label">Tarifs clairs</span>
            <h2 className="section__title">Un investissement, pas un abonnement</h2>
            <p className="section__subtitle">Vous payez une fois. Le site est à vous.</p>
          </div>
          <div className="container">
            <div className="services__grid">
                     <article className="service-card" data-reveal>
                        <div className="service-card__header">
                            <h3 className="service-card__title">Assistant Yuca</h3>
                            <p className="service-card__subtitle">Votre assistant client automatique 24/7</p>
                        </div>
                        <div className="service-card__price">
                            <span className="service-card__price-value">490€</span>
                            <span className="service-card__price-period">paiement unique</span>
                        </div>
                        <ul className="service-card__features">
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Assistant Yuca personnalisé</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Réponses instantanées 24/7</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Adapté à votre activité</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Intégration sur votre site web</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Configuration du ton et des réponses</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> 1 mois de support inclus</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Mise en ligne sous 3 jours</li>
                        </ul>
                        <a href="#contact" className="service-card__cta service-card__cta--secondary">Choisir Assistant IA</a>
                    </article>
                    <article className="service-card" data-reveal>
                        <div className="service-card__header">
                            <h3 className="service-card__title">Essentiel</h3>
                            <p className="service-card__subtitle">Votre présence en ligne professionnelle</p>
                        </div>
                        <div className="service-card__price">
                            <span className="service-card__price-value">590€</span>
                            <span className="service-card__price-period">paiement unique</span>
                        </div>
                        <ul className="service-card__features">
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Site one-page responsive</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Design sur mesure</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Optimisation Google (SEO)</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Formulaire de contact</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Fiche Google My Business</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> 1 mois de support inclus</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Livraison 7 jours</li>
                        </ul>
                        <a href="#contact" className="service-card__cta service-card__cta--secondary">Choisir Essentiel</a>
                    </article>
                    <article className="service-card service-card--featured" data-reveal data-reveal-delay="200">
                        <span className="service-card__badge">Recommandé</span>
                        <div className="service-card__header">
                            <h3 className="service-card__title">Pro + Assistant Yuca</h3>
                            <p className="service-card__subtitle">Site complet avec automatisation</p>
                        </div>
                        <div className="service-card__price">
                            <span className="service-card__price-value">990€</span>
                            <span className="service-card__price-period">paiement unique</span>
                        </div>
                        <ul className="service-card__features">
                            <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Tout Essentiel inclus</li>
                            <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Assitant Yuca 24/7 personnalisé</li>
                            <li className="service-card__feature service-card__feature--highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Système de réservation auto</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Site multi-pages (jusqu'à 5)</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Notifications email/SMS</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> 3 mois de support inclus</li>
                            <li className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Livraison 10 jours</li>
                        </ul>
                        <a href="#contact" className="service-card__cta service-card__cta--primary">Choisir Pro + Assistant Yuca</a>
                    </article>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-section__bg"></div>
          <div className="cta-section__glow"></div>
          <div className="cta-section__content" data-reveal>
            <h2 className="cta-section__title">Prêt à optimiser votre présence digitale ?</h2>
            <p className="cta-section__subtitle">Échange gratuit de 30 min. On parle de votre projet, sans jargon.</p>
            <a href="#contact" className="cta-section__btn">Réserver mon appel <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="contact__grid">
              <div className="contact__info" data-reveal>
                <h2 className="contact__info-title">Parlons de votre projet</h2>
                <p className="contact__info-desc">Remplissez le formulaire ou contactez-moi directement. Nous répondons sous 24h.</p>
              </div>
              <form className="contact__form" id="contactForm" data-reveal data-reveal-delay="200">
                  <div className="form__row">
                    <div className="form__group"><label className="form__label" htmlFor="name">Nom *</label><input className="form__input" type="text" id="name" name="name" required /></div>
                    <div className="form__group"><label className="form__label" htmlFor="email">Email *</label><input className="form__input" type="email" id="email" name="email" required /></div>
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="phone">Téléphone</label>
                    <input className="form__input" type="tel" id="phone" name="phone" placeholder="Pour être rappelé" />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="business">Votre activité *</label>
                    <select className="form__select" id="business" name="business" required>
                      <option value="">Sélectionner</option>
                      <option value="restaurant">Restaurant / Traiteur</option>
                      <option value="artisan">Artisan (plombier, électricien...)</option>
                      <option value="commerce">Commerce local</option>
                      <option value="service">Prestataire de service</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="offer">Offre qui vous intéresse</label>
                    <select className="form__select" id="offer" name="offer">
                      <option value="">Sélectionner</option>
                      <option value="assistant">Assistant Yuca (490€)</option>
                      <option value="essentiel">Essentiel (590€)</option>
                      <option value="pro-ia">Pro + Assistant Yuca (990€)</option>
                      <option value="ne-sait-pas">Je ne sais pas encore</option>
                    </select>
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="project">Parlez-moi de votre projet</label>
                    <textarea className="form__textarea" id="project" name="project" placeholder="Votre activité, vos besoins..."></textarea>
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
            <p>Basé en France – intervention à distance dans le monde entier.</p>
          <nav className="footer__links">
              <a href="#services" className="footer__link">Services</a>
              <a href="#tarifs" className="footer__link">Tarifs</a>
              <a href="#contact" className="footer__link">Contact</a>
              <a href="/mentions-legales.html" className="footer__link">Mentions légales</a>
              <a href="/politique-confidentialite.html" className="footer__link">Politique de confidentialité</a>
          </nav>
        </div>
          <div className="footer__bottom">
            <p>© <span id="year"></span> Yuca. Sites web & Assistant personnalisé </p>
            <div className="footer__social">
                {/* LinkedIn hidden for now */}
                <a href="https://www.instagram.com/madebyyuca/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
