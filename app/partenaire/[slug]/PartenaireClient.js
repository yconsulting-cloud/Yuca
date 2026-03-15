'use client';
import { useState } from 'react';

const S = {
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  label: { display: 'block', fontSize: '.875rem', fontWeight: 600, marginBottom: '.35rem', color: 'var(--c-text)' },
  input: {
    width: '100%', padding: '.75rem 1rem', border: '1.5px solid var(--c-border)',
    borderRadius: 'var(--rad)', fontFamily: 'var(--ff-body)', fontSize: '1rem',
    color: 'var(--c-text)', background: 'var(--c-bg-alt)', transition: 'border-color .2s',
    outline: 'none',
  },
  btn: {
    padding: '1rem 2rem', background: 'var(--c-accent)', color: 'var(--c-bg-dark)',
    border: 'none', borderRadius: 'var(--rad-full)', fontWeight: 700, fontSize: '1.05rem',
    cursor: 'pointer', transition: 'all .2s', fontFamily: 'var(--ff-body)',
  },
  btnDisabled: { opacity: .65, cursor: 'wait' },
  err: { color: '#ef4444', fontSize: '.875rem', textAlign: 'center' },
  success: { textAlign: 'center', padding: '2rem 1.5rem' },
  successIcon: { fontSize: '3rem', marginBottom: '1rem' },
  successTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '.5rem' },
  successSub: { color: 'var(--c-text-sec)', marginBottom: '1.5rem' },
  calBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
    padding: '1rem 2rem', background: 'var(--c-accent)', color: 'var(--c-bg-dark)',
    borderRadius: 'var(--rad-full)', fontWeight: 700, fontSize: '1rem',
    textDecoration: 'none', transition: 'all .2s',
  },
};

export default function PartenaireClient({ slug, partnerName }) {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '' });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: `partenaire-${slug}` }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={S.success}>
        <div style={S.successIcon}>✅</div>
        <h2 style={S.successTitle}>C&apos;est parti !</h2>
        <p style={S.successSub}>
          Je vous envoie votre audit sous peu et vous recontacte dans les 24h avec des recommandations concrètes.
        </p>
        <a
          href="https://calendar.app.google/Eqx9iTGgPerCmj2u6"
          target="_blank"
          rel="noopener noreferrer"
          style={S.calBtn}
        >
          Réserver un appel maintenant
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={S.form}>
      <div style={S.row}>
        <div>
          <label style={S.label}>Prénom &amp; Nom</label>
          <input
            style={S.input}
            type="text"
            required
            placeholder="Marie Martin"
            value={form.name}
            onChange={set('name')}
          />
        </div>
        <div>
          <label style={S.label}>Email</label>
          <input
            style={S.input}
            type="email"
            required
            placeholder="marie@monentreprise.fr"
            value={form.email}
            onChange={set('email')}
          />
        </div>
      </div>

      <div>
        <label style={S.label}>Téléphone <span style={{ fontWeight: 400, color: 'var(--c-text-ter)' }}>(optionnel)</span></label>
        <input
          style={S.input}
          type="tel"
          placeholder="+33 6 XX XX XX XX"
          value={form.phone}
          onChange={set('phone')}
        />
      </div>

      <div>
        <label style={S.label}>Votre activité</label>
        <select
          style={{ ...S.input, appearance: 'auto' }}
          required
          value={form.business}
          onChange={set('business')}
        >
          <option value="">Choisir votre secteur...</option>
          <option value="restaurant">Restaurant / Café / Bar</option>
          <option value="cave-epicerie">Cave / Épicerie fine</option>
          <option value="artisan">Artisan / Commerce local</option>
          <option value="coach">Coach / Thérapeute</option>
          <option value="formateur">Formateur / Consultant</option>
          <option value="service">Prestataire de service</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ ...S.btn, ...(status === 'loading' ? S.btnDisabled : {}) }}
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Recevoir mon audit gratuit →'}
      </button>

      {status === 'error' && (
        <p style={S.err}>
          Une erreur s&apos;est produite. Réessayez ou écrivez à{' '}
          <a href="mailto:contact@madebyyuca.com" style={{ color: 'var(--c-accent)' }}>contact@madebyyuca.com</a>
        </p>
      )}

      <p style={{ fontSize: '.75rem', color: 'var(--c-text-ter)', textAlign: 'center' }}>
        Recommandé par <strong style={{ color: 'var(--c-text-sec)' }}>{partnerName}</strong> · Aucun engagement
      </p>
    </form>
  );
}
