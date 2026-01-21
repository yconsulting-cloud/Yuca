export default function CookieConsentServer() {
  return (
    <div className="cookie-consent-wrap" id="cookie-consent-ssr">
      <div className="cookie-consent-card">
        <div className="cookie-consent-text">
          Nous utilisons des cookies pour améliorer votre expérience et fournir
          les fonctionnalités de téléchargement. En poursuivant, vous acceptez
          notre utilisation des cookies.
        </div>
        <div>
          <button id="cookie-consent-accept" className="cookie-consent-btn">Accepter</button>
        </div>
      </div>
    </div>
  );
}
