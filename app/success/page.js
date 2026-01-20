'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Vérifier la session (optionnel)
      setTimeout(() => setLoading(false), 1000);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p>Vérification du paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '100px 20px',
        textAlign: 'center',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '60px 40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '20px',
          }}>
            ✅
          </div>
          
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '15px',
            color: '#000',
          }}>
            Paiement réussi !
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.6',
          }}>
            Merci pour votre achat ! Vous pouvez maintenant générer vos photos produit.
          </p>
          
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: '#00D9FF',
              color: '#000',
              padding: '16px 45px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '16px',
              boxShadow: '0 8px 25px rgba(0, 217, 255, 0.4)',
              letterSpacing: '0.3px',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Commencer à générer
          </a>
          
          <p style={{
            fontSize: '13px',
            color: '#999',
            marginTop: '30px',
          }}>
            Un email de confirmation vous a été envoyé.
          </p>
        </div>
      </div>
    </div>
  );
}
