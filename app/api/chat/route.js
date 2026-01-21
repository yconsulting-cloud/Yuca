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

    if (isAllowedOrigin(origin)) {
      // allowed
    } else {
      return NextResponse.json({ error: 'Origine non autorisée' }, { status: 403 });
    }

    const { messages, system } = await req.json();

    const today = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const systemWithDate = `Nous sommes le ${today}. ${system}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemWithDate,
        messages: messages
      })
    });

    const data = await response.json();
    return NextResponse.json(data, { headers: { 'Access-Control-Allow-Origin': origin } });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
