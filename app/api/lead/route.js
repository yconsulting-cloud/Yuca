import { NextResponse } from 'next/server';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isAllowedOrigin(origin) {
  return (
    origin &&
    (origin.endsWith('.madebyyuca.com') ||
    origin === 'https://madebyyuca.com' ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1'))
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 200 });
}

export async function POST(req) {
  try {
    const origin = req.headers.get('origin');

    if (!isAllowedOrigin(origin)) {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, phone, business, project, source, offer } = body;

    // 1. Add contact to Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          NOM: name,
          TELEPHONE: phone,
          ACTIVITE: business,
          PROJET: project,
          SOURCE: source || 'site',
          OFFRE: offer || ''
        },
        listIds: [5],
        updateEnabled: true
      })
    });

    // 2. Send notification email
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify({
        sender: { name: 'Yuca Site', email: process.env.NOTIFICATION_EMAIL },
        to: [{ email: process.env.NOTIFICATION_EMAIL }],
        subject: `🎯 Nouveau lead Yuca : ${escapeHtml(name)}`,
        htmlContent: `
                    <h2>Nouveau lead !</h2>
                    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
                    <p><strong>Téléphone :</strong> ${escapeHtml(phone) || 'Non renseigné'}</p>
                    <p><strong>Activité :</strong> ${escapeHtml(business) || 'Non renseignée'}</p>
                    <p><strong>Offre souhaitée :</strong> ${escapeHtml(offer) || 'Non renseignée'}</p>
                    <p><strong>Projet :</strong> ${escapeHtml(project) || 'Non renseigné'}</p>
                    <p><strong>Source :</strong> ${escapeHtml(source) || 'Site'}</p>
                `
      })
    });

    // 3. Send confirmation email to the lead
    if (email) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || ''
          },
          body: JSON.stringify({
            sender: { name: 'Yuca', email: process.env.NOTIFICATION_EMAIL },
            to: [{ email: email, name: name || '' }],
            subject: `Votre demande Yuca ✅`,
            htmlContent: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
                <h2 style="color: #6c47ff;">Merci ${escapeHtml(name)} !</h2>
                <p>J'ai bien reçu votre demande et vous recontacte <strong>sous 24h</strong> avec des recommandations concrètes pour votre activité.</p>
                <p style="margin-top: 24px;">En attendant, vous pouvez directement réserver un créneau de 15 minutes :</p>
                <p style="margin: 16px 0;">
                  <a href="https://calendar.app.google/Eqx9iTGgPerCmj2u6" style="background: #6c47ff; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    Réserver un appel gratuit →
                  </a>
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
                <p style="font-size: 12px; color: #999;">Yuca — Site web · Visuels · Contenu · <a href="https://madebyyuca.com" style="color: #6c47ff;">madebyyuca.com</a></p>
              </div>
            `
          })
        });
      } catch (e) {
        console.error('Confirmation email error:', e);
      }
    }

    return NextResponse.json({ success: true }, { headers: { 'Access-Control-Allow-Origin': origin } });

  } catch (error) {
    console.error('Brevo error:', error);
    return NextResponse.json({ error: 'Error saving lead' }, { status: 500 });
  }
}
