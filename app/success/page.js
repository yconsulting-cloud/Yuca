export default function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id || '';

  return (
    <main>
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <div className="hero__badge">Commande reçue</div>
          <h1 className="hero__title">Merci — paiement confirmé</h1>
          <p className="hero__subtitle">Votre paiement a bien été traité{sessionId ? ` — Référence : ${sessionId}` : '.'}</p>
          <div className="hero__ctas">
            <a className="hero__cta hero__cta--primary" href="/">Retour à l'accueil</a>
            <a className="hero__cta hero__cta--secondary" href="/contact">Nous contacter</a>
          </div>
        </div>
      </section>
    </main>
  );
}
