import { useTranslations } from 'next-intl';
import LazyLandingClient from './LazyLandingClient';
import LocaleSwitcher from './LocaleSwitcher';

export default function Landing() {
  const tn = useTranslations('nav');
  const th = useTranslations('hero');
  const tm = useTranslations('marquee');
  const ts = useTranslations('services');
  const ta = useTranslations('assistant');
  const tsi = useTranslations('site');
  const tf = useTranslations('features');
  const tp = useTranslations('process');
  const tpr = useTranslations('pricing');
  const tc = useTranslations('cta');
  const tco = useTranslations('contact');
  const tfo = useTranslations('footer');

  const marqueeItems = tm.raw('items');
  const assistantFeatures = ta.raw('features');
  const siteFeatures = tsi.raw('features');

  return (
    <>
      <LazyLandingClient />
      <nav className="nav" id="nav" role="navigation" aria-label={tn('ariaLabel')}>
        <a href="#" className="nav__logo" aria-label={tn('logoAriaLabel')}>Yuca<span>.</span></a>
        <ul className="nav__links">
          <li><a href="#services" className="nav__link">{tn('services')}</a></li>
          <li><a href="#comment" className="nav__link">{tn('process')}</a></li>
          <li><a href="#tarifs" className="nav__link">{tn('pricing')}</a></li>
          <li><a href="#contact" className="nav__link">{tn('contact')}</a></li>
          <li><a href="/shopshots" className="nav__link nav__link--accent">{tn('shopshots')}</a></li>
        </ul>
        <div className="nav__right">
          <LocaleSwitcher />
          <a href="#contact" className="nav__cta">{tn('cta')}</a>
        </div>
        <button className="nav__burger" id="navBurger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </nav>
      <div className="nav-overlay" id="navOverlay" data-visible="false"></div>
      <nav className="nav-mobile" id="navMobile" data-open="false">
        <button className="nav-mobile__close" id="navMobileClose" type="button" aria-label="Fermer le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <ul>
          <li><a href="#services">{tn('services')}</a></li>
          <li><a href="#comment">{tn('process')}</a></li>
          <li><a href="#tarifs">{tn('pricing')}</a></li>
          <li><a href="#contact">{tn('contact')}</a></li>
          <li><a href="/shopshots">{tn('shopshots')}</a></li>
        </ul>
        <a href="#contact" className="nav-mobile__cta">{tn('mobileCta')}</a>
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
              {th('badge')}
            </div>
            <h1 className="hero__title">
              {th('titleLine1')}<br />
              <span className="hero__title-gradient">{th('titleGradient')}</span><br />
              {th('titleLine3')}
            </h1>
            <p className="hero__subtitle">{th('subtitle')}</p>
            <div className="hero__ctas">
              <a href="#contact" className="hero__cta hero__cta--primary">
                {th('ctaPrimary')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#services" className="hero__cta hero__cta--secondary">{th('ctaSecondary')}</a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">{th('statDaysValue')}<span>{th('statDaysSuffix')}</span></span>
                <span className="hero__stat-label">{th('statDaysLabel')}</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">{th('stat247Value')}<span>{th('stat247Suffix')}</span></span>
                <span className="hero__stat-label">{th('stat247Label')}</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">{th('statFreeValue')}<span>{th('statFreeSuffix')}</span></span>
                <span className="hero__stat-label">{th('statFreeLabel')}</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <picture>
              <source srcSet="/images/hero-dashboard.avif" type="image/avif" />
              <source srcSet="/images/hero-dashboard.webp" type="image/webp" />
              <img className="hero__visual-img" src="/images/hero-dashboard.jpg" alt={th('imgAlt')} width="600" height="380" loading="eager" fetchpriority="high" />
            </picture>
            <div className="hero__visual-float hero__visual-float--1">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <p className="hero__visual-float-text">{th('floatNewMsg')}</p>
              <p className="hero__visual-float-sub">{th('floatReplying')}</p>
            </div>
            <div className="hero__visual-float hero__visual-float--2">
              <svg className="hero__visual-float-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <p className="hero__visual-float-text">{th('floatAppt')}</p>
              <p className="hero__visual-float-sub">{th('floatAuto')}</p>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────── */}
        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(i => (
              <div key={i} className="marquee-content">
                {marqueeItems.map((item, j) => (
                  <span key={j} className="marquee-item">
                    <svg className="marquee-star" viewBox="0 0 12 12" fill="currentColor"><path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12l1.5-4.5L0 4.5h4.5z"/></svg>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section className="section" id="services">
          <div className="section__header" data-reveal>
            <span className="section__label">{ts('sectionLabel')}</span>
            <h2 className="section__title">{ts('sectionTitle')}</h2>
            <p className="section__subtitle">{ts('sectionSubtitle')}</p>
          </div>
          <div className="container">
            <div className="value__grid value__grid--three">

              <div className="value-card" data-reveal data-reveal-delay="100">
                <div className="value-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                </div>
                <span className="service-card__tag">{ts('digital.tag')}</span>
                <h3 className="value-card__title">{ts('digital.title')}</h3>
                <p className="value-card__desc">{ts('digital.desc')}</p>
                <a href="#tarifs" className="value-card__link">
                  {ts('digital.cta')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              <div className="value-card" data-reveal data-reveal-delay="200">
                <div className="value-card__icon value-card__icon--amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
                <span className="service-card__tag service-card__tag--tool">{ts('shopshots.tag')}</span>
                <h3 className="value-card__title">{ts('shopshots.title')}</h3>
                <p className="value-card__desc">{ts('shopshots.desc')}</p>
                <a href="/shopshots" className="value-card__link">
                  {ts('shopshots.cta')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

              <div className="value-card" data-reveal data-reveal-delay="300">
                <div className="value-card__icon value-card__icon--purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
                </div>
                <span className="service-card__tag service-card__tag--studio">{ts('content.tag')}</span>
                <h3 className="value-card__title">{ts('content.title')}</h3>
                <p className="value-card__desc">{ts('content.desc')}</p>
                <a href="#contact" className="value-card__link">
                  {ts('content.cta')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

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
                  <img className="image-text__img" src="/images/assistant.jpg" alt={ta('imgAlt')} width="700" height="467" loading="lazy" />
                </picture>
                <div className="image-text__float image-text__float--stats">
                  <span className="image-text__float-value">24/7</span>
                  <span className="image-text__float-label">{ta('floatLabel')}</span>
                </div>
              </div>
              <div className="image-text__content">
                <span className="section__label">{ta('sectionLabel')}</span>
                <h2 className="image-text__title">{ta('title')}</h2>
                <p className="image-text__desc">{ta('desc')}</p>
                <ul className="image-text__list">
                  {assistantFeatures.map((feat, i) => (
                    <li key={i} className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {feat}</li>
                  ))}
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
                  <img className="image-text__img" src="/images/site.jpg" alt={tsi('imgAlt')} width="700" height="467" loading="lazy" />
                </picture>
              </div>
              <div className="image-text__content">
                <span className="section__label">{tsi('sectionLabel')}</span>
                <h2 className="image-text__title">{tsi('title')}</h2>
                <p className="image-text__desc">{tsi('desc')}</p>
                <ul className="image-text__list">
                  {siteFeatures.map((feat, i) => (
                    <li key={i} className="image-text__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES DARK ────────────────────────────────── */}
        <section className="section section--dark">
          <div className="section__header" data-reveal>
            <span className="section__label">{tf('sectionLabel')}</span>
            <h2 className="section__title">{tf('sectionTitle')}</h2>
            <p className="section__subtitle">{tf('sectionSubtitle')}</p>
          </div>
          <div className="container">
            <div className="bento__grid">
              <article className="feature-card bento-card bento-card--wide" data-reveal data-reveal-delay="100">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
                <h3 className="feature-card__title">{tf('seo.title')}</h3>
                <p className="feature-card__desc">{tf('seo.desc')}</p>
              </article>
              <article className="feature-card bento-card" data-reveal data-reveal-delay="200">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
                <h3 className="feature-card__title">{tf('alerts.title')}</h3>
                <p className="feature-card__desc">{tf('alerts.desc')}</p>
              </article>
              <article className="feature-card bento-card" data-reveal data-reveal-delay="300">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <h3 className="feature-card__title">{tf('ssl.title')}</h3>
                <p className="feature-card__desc">{tf('ssl.desc')}</p>
              </article>
              <article className="feature-card bento-card bento-card--wide" data-reveal data-reveal-delay="400">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                <h3 className="feature-card__title">{tf('photos.title')}</h3>
                <p className="feature-card__desc">{tf('photos.desc')}</p>
              </article>
              <article className="feature-card bento-card" data-reveal data-reveal-delay="500">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <h3 className="feature-card__title">{tf('design.title')}</h3>
                <p className="feature-card__desc">{tf('design.desc')}</p>
              </article>
              <article className="feature-card bento-card bento-card--wide" data-reveal data-reveal-delay="600">
                <div className="feature-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
                <h3 className="feature-card__title">{tf('support.title')}</h3>
                <p className="feature-card__desc">{tf('support.desc')}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="section" id="comment">
          <div className="section__header" data-reveal>
            <span className="section__label">{tp('sectionLabel')}</span>
            <h2 className="section__title">{tp('sectionTitle')}</h2>
            <p className="section__subtitle">{tp('sectionSubtitle')}</p>
          </div>
          <div className="container">
            <div className="process__grid">
              {[1, 2, 3, 4].map((n, i) => (
                <div key={n} className="process-step" data-reveal data-reveal-delay={String((i + 1) * 100)}>
                  <div className="process-step__number">{n}</div>
                  <h3 className="process-step__title">{tp(`step${n}.title`)}</h3>
                  <p className="process-step__desc">{tp(`step${n}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TARIFS ───────────────────────────────────────── */}
        <section className="section" style={{background: '#f8fafc'}} id="tarifs">
          <div className="section__header" data-reveal>
            <span className="section__label">{tpr('sectionLabel')}</span>
            <h2 className="section__title">{tpr('sectionTitle')}</h2>
            <p className="section__subtitle">{tpr('sectionSubtitle')}</p>
          </div>
          <div className="container">

            <div className="pricing__group" data-reveal>
              <div className="pricing__group-header">
                <span className="pricing__group-tag">{tpr('digitalGroup.tag')}</span>
                <h3 className="pricing__group-title">{tpr('digitalGroup.title')}</h3>
                <p className="pricing__group-desc">{tpr('digitalGroup.desc')}</p>
              </div>
              <div className="services__grid services__grid--two" style={{marginBottom: 'var(--sp-16)'}}>
                <article className="service-card" data-reveal>
                  <div className="service-card__header">
                    <h3 className="service-card__title">{tpr('essential.title')}</h3>
                    <p className="service-card__subtitle">{tpr('essential.subtitle')}</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">{tpr('essential.priceValue')}</span>
                    <span className="service-card__price-period">{tpr('essential.pricePeriod')}</span>
                  </div>
                  <ul className="service-card__features">
                    {tpr.raw('essential.features').map((f, i) => (
                      <li key={i} className="service-card__feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {f}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--secondary">{tpr('essential.cta')}</a>
                </article>
                <article className="service-card service-card--featured" data-reveal data-reveal-delay="200">
                  <span className="service-card__badge">{tpr('pro.badge')}</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">{tpr('pro.title')}</h3>
                    <p className="service-card__subtitle">{tpr('pro.subtitle')}</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">{tpr('pro.priceValue')}</span>
                    <span className="service-card__price-period">{tpr('pro.pricePeriod')}</span>
                  </div>
                  <ul className="service-card__features">
                    {tpr.raw('pro.features').map((f, i) => (
                      <li key={i} className={`service-card__feature${i < 4 ? ' service-card__feature--highlight' : ''}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {f}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--primary">{tpr('pro.cta')}</a>
                </article>
              </div>
            </div>

            <div className="pricing__group pricing__group--secondary" data-reveal>
              <div className="pricing__group-header">
                <span className="pricing__group-tag pricing__group-tag--other">{tpr('addonsGroup.tag')}</span>
                <h3 className="pricing__group-title">{tpr('addonsGroup.title')}</h3>
                <p className="pricing__group-desc">{tpr('addonsGroup.desc')}</p>
              </div>
              <div className="services__grid services__grid--two">
                <article className="service-card" data-reveal>
                  <span className="service-card__tag service-card__tag--tool">{tpr('shopshots.tag')}</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">{tpr('shopshots.title')}</h3>
                    <p className="service-card__subtitle">{tpr('shopshots.subtitle')}</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value">{tpr('shopshots.priceValue')}</span>
                    <span className="service-card__price-period">{tpr('shopshots.pricePeriod')}</span>
                  </div>
                  <ul className="service-card__features">
                    {tpr.raw('shopshots.features').map((f, i) => (
                      <li key={i} className={`service-card__feature${i === 0 ? ' service-card__feature--highlight' : ''}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {f}</li>
                    ))}
                  </ul>
                  <a href="/shopshots" className="service-card__cta service-card__cta--secondary">{tpr('shopshots.cta')}</a>
                </article>
                <article className="service-card" data-reveal data-reveal-delay="200">
                  <span className="service-card__tag service-card__tag--studio">{tpr('contentu.tag')}</span>
                  <div className="service-card__header">
                    <h3 className="service-card__title">{tpr('contentu.title')}</h3>
                    <p className="service-card__subtitle">{tpr('contentu.subtitle')}</p>
                  </div>
                  <div className="service-card__price">
                    <span className="service-card__price-value service-card__price-value--text">{tpr('contentu.priceValue')}</span>
                    <span className="service-card__price-period">{tpr('contentu.pricePeriod')}</span>
                  </div>
                  <ul className="service-card__features">
                    {tpr.raw('contentu.features').map((f, i) => (
                      <li key={i} className={`service-card__feature${i === 0 ? ' service-card__feature--highlight' : ''}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> {f}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="service-card__cta service-card__cta--secondary">{tpr('contentu.cta')}</a>
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
            <h2 className="cta-section__title">{tc('title')}</h2>
            <p className="cta-section__subtitle">{tc('subtitle')}</p>
            <a href="https://calendar.app.google/Eqx9iTGgPerCmj2u6" className="cta-section__btn" target="_blank" rel="noopener noreferrer">
              {tc('btn')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact__grid">
              <div className="contact__info" data-reveal>
                <h2 className="contact__info-title">{tco('title')}</h2>
                <p className="contact__info-desc">{tco('desc')}</p>
              </div>
              <form className="contact__form" id="contactForm" data-reveal data-reveal-delay="200" data-success-msg={tco('successMsg')}>
                <div className="form__row">
                  <div className="form__group"><label className="form__label" htmlFor="name">{tco('labelName')}</label><input className="form__input" type="text" id="name" name="name" required /></div>
                  <div className="form__group"><label className="form__label" htmlFor="email">{tco('labelEmail')}</label><input className="form__input" type="email" id="email" name="email" required /></div>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="phone">{tco('labelPhone')}</label>
                  <input className="form__input" type="tel" id="phone" name="phone" placeholder={tco('phonePlaceholder')} />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="business">{tco('labelBusiness')}</label>
                  <select className="form__select" id="business" name="business" required>
                    <option value="">{tco('selectDefault')}</option>
                    <option value="restaurant">{tco('businessOptions.restaurant')}</option>
                    <option value="cave-epicerie">{tco('businessOptions.cave')}</option>
                    <option value="artisan">{tco('businessOptions.artisan')}</option>
                    <option value="coach">{tco('businessOptions.coach')}</option>
                    <option value="formateur">{tco('businessOptions.formateur')}</option>
                    <option value="therapie">{tco('businessOptions.therapie')}</option>
                    <option value="consultant">{tco('businessOptions.consultant')}</option>
                    <option value="createur">{tco('businessOptions.createur')}</option>
                    <option value="service">{tco('businessOptions.service')}</option>
                    <option value="autre">{tco('businessOptions.other')}</option>
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="offer">{tco('labelOffer')}</label>
                  <select className="form__select" id="offer" name="offer">
                    <option value="">{tco('selectDefault')}</option>
                    <option value="digital-essentiel">{tco('offerOptions.essential')}</option>
                    <option value="digital-pro">{tco('offerOptions.pro')}</option>
                    <option value="shopshots">{tco('offerOptions.shopshots')}</option>
                    <option value="contenu">{tco('offerOptions.content')}</option>
                    <option value="ne-sait-pas">{tco('offerOptions.unknown')}</option>
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="project">{tco('labelProject')}</label>
                  <textarea className="form__textarea" id="project" name="project" placeholder={tco('projectPlaceholder')}></textarea>
                </div>
                <button className="form__submit" type="submit">{tco('submit')}</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous contacter sur WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}

      <footer className="footer">
        <div className="footer__content">
          <a href="#" className="footer__logo">Yuca<span>.</span></a>
          <p>{tfo('tagline')}</p>
          <nav className="footer__links">
            <a href="#services" className="footer__link">{tfo('services')}</a>
            <a href="#tarifs" className="footer__link">{tfo('pricing')}</a>
            <a href="#contact" className="footer__link">{tfo('contact')}</a>
            <a href="/mentions-legales.html" className="footer__link">{tfo('legal')}</a>
            <a href="/politique-confidentialite.html" className="footer__link">{tfo('privacy')}</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© <span id="year"></span> {tfo('copyright')}</p>
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
