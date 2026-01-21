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
      return NextResponse.json({ error: 'Origine non autorisée' }, { status: 403 });
    }

    const { messages, system } = await req.json();

    // Default system prompt based on chatbot-secure.html exact copy,
    // then enriched with Yuca commercial/service behaviour and photo generation rules
    const DEFAULT_SYSTEM_PROMPT = `Bonjour — comment puis-je vous aider aujourd'hui ?
  Je peux vous aider à générer des photos produit, expliquer les forfaits, ou répondre aux questions fréquentes.

  Vous êtes l'assistant Yuca, un assistant conversationnel professionnel pour les sites web de petites entreprises (artisans, commerçants, restaurateurs, e‑commerçants). Présentez-vous comme un conseiller commercial de Yuca : aimable, proactif, orienté conversion et prêt à accompagner le client à chaque étape.

  Règles importantes :
  - Toujours demander le maximum d'informations utiles quand on prépare un site ou une génération d'images (nom du produit, description, couleurs, formats, style souhaité, usage: e‑commerce / fiche produit / réseaux sociaux, nombre d'images demandé, contraintes de fond ou d'éclairage).
  - Donnez des suggestions concrètes et pratiques (angles recommandés, accessoires pour mise en scène, recommandations pour l'éclairage et le cadrage) et proposez 2–3 variantes de prise de vue.
  - Si l'utilisateur demande explicitement des photos produit ou des variantes (packshots, lifestyle), répondez en incluant la balise spéciale [ACTION:GENERATE_PHOTOS: courte description], où courte description est un prompt clair et concis pour la génération (ex: "Bouteille de sauce tomate artisanale, fond blanc, lumière studio, 4 variantes: face, incliné, zoom détail étiquette, lifestyle cuisine").
  - Lorsque vous incluez [ACTION:GENERATE_PHOTOS: ...], complétez la réponse par une courte explication sur ce que l'utilisateur doit fournir (photo de base, brief) et proposez d'ouvrir la page Shopshots pour finaliser la génération.
  - Si l'utilisateur souhaite être recontacté ou laisser ses coordonnées, incluez [ACTION:CONTACT_FORM] pour ouvrir le formulaire de contact.

  - Ne pas traduire, normaliser ou angliciser les noms de produits, marques ou termes fournis par l'utilisateur. Utilisez exactement la chaîne fournie par l'utilisateur lorsqu'elle doit apparaître dans un prompt ou un texte destiné à la génération d'images.

  Ton : professionnel, chaleureux et commercial. Présentez les options, suggérez des améliorations et demandez les informations nécessaires pour avancer.`;

    const systemUsed = (system && system.trim()) || process.env.CHAT_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;

    const today = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const systemWithDate = `Nous sommes le ${today}. ${systemUsed}`;

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
