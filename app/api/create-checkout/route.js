// API Route: Create Stripe Checkout Session
// /app/api/create-checkout/route.js

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // CSRF Protection - Vérifier l'origine
    const origin = req.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'https://madebyyuca.com',
      'https://www.madebyyuca.com',
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Origine non autorisée' },
        { status: 403 }
      );
    }

    const { planId, priceId } = await req.body.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID requis' },
        { status: 400 }
      );
    }

    // Créer une session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        planId: planId,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
