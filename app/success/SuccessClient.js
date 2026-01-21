'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // your logic here (fetch, confirm payment, etc.)
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <div className="hero__badge">Commande reçue</div>
          <h1 className="hero__title">Merci — paiement confirmé</h1>
          <p className="hero__subtitle">Votre paiement a bien été traité. Référence : {sessionId}</p>
          <div className="hero__ctas">
            <a className="hero__cta hero__cta--primary" href="/">Retour à l'accueil</a>
            <a className="hero__cta hero__cta--secondary" href="/contact">Nous contacter</a>
          </div>
        </div>
      </section>
    </main>
  )
}
