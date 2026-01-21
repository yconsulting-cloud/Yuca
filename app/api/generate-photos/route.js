// API Route: Generate Product Photos
// /app/api/generate-photos/route.js

import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

// Templates de prompts pour différents arrière-plans
const BACKGROUND_TEMPLATES = [
  {
    name: 'Bureau en bois',
    prompt: 'Professional product photography of {product}, placed on rustic wooden desk, natural lighting, warm tones, commercial photography, high quality, 4k',
  },
  {
    name: 'Fond blanc minimaliste',
    prompt: 'Professional product photography of {product}, clean white background, studio lighting, minimalist, commercial quality, sharp focus, 4k',
  },
  {
    name: 'Style lifestyle moderne',
    prompt: 'Professional lifestyle photography of {product}, in modern home setting, soft natural light, styled background, elegant composition, commercial quality',
  },
  {
    name: 'Ambiance naturelle',
    prompt: 'Professional product photography of {product}, outdoor natural setting, greenery background, natural daylight, fresh atmosphere, high quality',
  },
  {
    name: 'Table de cuisine',
    prompt: 'Professional product photography of {product}, on modern kitchen counter, bright natural light, home environment, clean aesthetic, 4k',
  },
];

// Rate limiting simple (en mémoire)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 heure
  const maxRequests = 10; // Max 10 requêtes/heure
  
  const userRequests = rateLimitMap.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(req) {
  try {
    // 1. RATE LIMITING
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez dans 1 heure.' },
        { status: 429 }
      );
    }

    const { imageData, description, count, productNameExact } = await req.json();

    // 2. VALIDATION STRICTE
    if (!imageData || !description) {
      return NextResponse.json(
        { error: 'Image et description requises' },
        { status: 400 }
      );
    }

    // Vérifier format base64
    if (!imageData.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Format d\'image invalide' },
        { status: 400 }
      );
    }

    // Vérifier taille de l'image (base64)
    const sizeInBytes = (imageData.length * 3) / 4;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB > 10) {
      return NextResponse.json(
        { error: 'Image trop grande (max 10MB)' },
        { status: 400 }
      );
    }

    // Valider description
    if (description.length < 5 || description.length > 500) {
      return NextResponse.json(
        { error: 'Description invalide (5-500 caractères)' },
        { status: 400 }
      );
    }

    // productNameExact if present should not be empty and used verbatim
    if (productNameExact && (productNameExact.length < 1 || productNameExact.length > 200)) {
      return NextResponse.json(
        { error: 'productNameExact invalide (1-200 caractères)' },
        { status: 400 }
      );
    }

    // Bloquer contenu suspect
    const suspiciousWords = ['<script', 'javascript:', 'onerror=', 'onclick='];
    const lowerDesc = description.toLowerCase();
    if (suspiciousWords.some(word => lowerDesc.includes(word))) {
      return NextResponse.json(
        { error: 'Contenu non autorisé' },
        { status: 400 }
      );
    }

    if (!process.env.FAL_KEY) {
      console.error('FAL_KEY not configured');
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Limiter le nombre d'images strictement (par défaut 3 pour la version gratuite)
    const imagesToGenerate = Math.min(Math.max(1, count || 3), 50);
    const images = [];
    const falErrors = [];

    // Sélectionner les templates selon le nombre demandé
    // If the requested count is greater than available templates, cycle through templates
    const selectedTemplates = Array.from({ length: imagesToGenerate }).map((_, idx) => BACKGROUND_TEMPLATES[idx % BACKGROUND_TEMPLATES.length]);

    // Initialize Fal client with credentials from env
    fal.config({ credentials: process.env.FAL_KEY });

    // Générer les photos using official Fal client (queue/subscribe flow)
    for (let i = 0; i < selectedTemplates.length; i++) {
      const template = selectedTemplates[i];
      // Prefer an explicit exact product name if provided by the client
      const exactName = productNameExact && productNameExact.trim().length > 0 ? productNameExact : description;
      // Wrap the product literal in guillemets to discourage any auto-translation/normalization
      const productLiteral = `«${exactName}»`;
      const replaced = template.prompt.replace('{product}', productLiteral);
      const fullPrompt = replaced + '\n\nIMPORTANT: Preserve the main object exactly as in the provided image. Do not change its shape, color, texture, or details. Only change the background and scene around the object to match the described setting. Do NOT translate, normalize, anglicize, alter spelling, remove diacritics, or otherwise modify the product name/term provided by the user; use it VERBATIM as: ' + productLiteral + " (exact match, case and accents preserved).";

      try {
        const subResult = await fal.subscribe('fal-ai/flux-2-pro/edit', {
          input: {
            prompt: fullPrompt,
            image_urls: [imageData],
            image_size: 'auto',
            output_format: 'jpeg',
            safety_tolerance: '2',
            enable_safety_checker: true,
          },
          logs: true,
        });

        // subResult.data should follow schema: { images: [{ url }] }
        const resData = subResult?.data;
        if (resData && resData.images && resData.images[0] && resData.images[0].url) {
          images.push({ url: resData.images[0].url, background: template.name });
        } else {
          const msg = `Fal.ai returned unexpected shape for image ${i}: ${JSON.stringify(resData)}`;
          console.error(msg);
          falErrors.push(msg);
        }

      } catch (err) {
        const msg = `Fal.ai client error for image ${i}: ${String(err)}`;
        console.error(msg);
        falErrors.push(msg);
        // continue to next template
      }
    }

    if (images.length === 0) {
      if (process.env.DEBUG_API_ERRORS === '1' && falErrors.length > 0) {
        return NextResponse.json(
          { error: 'Aucune image générée', details: falErrors },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Aucune image générée' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      images,
      count: images.length,
    });

  } catch (error) {
    console.error('Generation error:', error);

    if (process.env.DEBUG_API_ERRORS === '1') {
      const details = {
        message: String(error?.message || error),
        stack: error?.stack,
      };

      return NextResponse.json(
        { error: 'Erreur lors de la génération', details },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur lors de la génération' },
      { status: 500 }
    );
  }
}
