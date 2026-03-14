import { getTranslations } from 'next-intl/server';

export default async function SuccessPage({ searchParams, params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'success' });
  const sessionId = searchParams?.session_id || '';

  return (
    <main>
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <div className="hero__badge">{t('badge')}</div>
          <h1 className="hero__title">{t('title')}</h1>
          <p className="hero__subtitle">
            {sessionId ? t('subtitleRef', { id: sessionId }) : t('subtitle')}
          </p>
          <div className="hero__ctas">
            <a className="hero__cta hero__cta--primary" href="/">{t('backHome')}</a>
            <a className="hero__cta hero__cta--secondary" href="/contact">{t('contact')}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
