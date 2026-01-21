import { NextResponse } from 'next/server';

function isAllowedOrigin(origin) {
  return (
    !origin ||
    origin.endsWith('.madebyyuca.com') ||
    origin === 'https://madebyyuca.com' ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1')
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
    const { name, email, phone, business, project, source } = body;

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
          SOURCE: source || 'site'
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
        sender: { name: 'Yuca Site', email: 'yuca.consulting@gmail.com' },
        to: [{ email: 'yuca.consulting@gmail.com' }],
        subject: `🎯 Nouveau lead Yuca : ${name}`,
        htmlContent: `
                    <h2>Nouveau lead !</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <p><strong>Activité :</strong> ${business || 'Non renseignée'}</p>
                    <p><strong>Projet :</strong> ${project || 'Non renseignée'}</p>
                    <p><strong>Source :</strong> ${source || 'Site'}</p>
                `
      })
    });

    return NextResponse.json({ success: true }, { headers: { 'Access-Control-Allow-Origin': origin } });

  } catch (error) {
    console.error('Brevo error:', error);
    return NextResponse.json({ error: 'Error saving lead' }, { status: 500 });
  }
}
