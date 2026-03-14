import { getTranslations } from 'next-intl/server';

export default async function CookieConsentServer() {
  const t = await getTranslations('cookie');
  return (
    <div className="cookie-consent-wrap" id="cookie-consent-ssr">
      <div className="cookie-consent-card">
        <div className="cookie-consent-text">{t('text')}</div>
        <div>
          <button id="cookie-consent-accept" className="cookie-consent-btn">{t('accept')}</button>
        </div>
      </div>
    </div>
  );
}
