// API Route: Generate Product Photos
// /app/api/generate-photos/route.js

import { NextResponse } from 'next/server';

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

    const { imageData, description, count } = await req.body.json();

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

    // Limiter le nombre d'images strictement
    const imagesToGenerate = Math.min(Math.max(1, count || 5), 50);
    const images = [];

    // Sélectionner les templates selon le nombre demandé
    const selectedTemplates = BACKGROUND_TEMPLATES.slice(0, imagesToGenerate);

    // Générer les photos
    for (let i = 0; i < selectedTemplates.length; i++) {
      const template = selectedTemplates[i];
      const fullPrompt = template.prompt.replace('{product}', description);

      try {
        // Appel à Fal.ai FLUX 2 Pro
        const falResponse = await fetch('https://fal.run/fal-ai/flux-pro/v1.1', {
          method: 'POST',
          headers: {
            'Authorization': `Key ${process.env.FAL_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: fullPrompt,
            image_url: imageData,
            image_size: 'square_hd',
            num_inference_steps: 28,
            guidance_scale: 3.5,
            num_images: 1,
            enable_safety_checker: true,
            safety_tolerance: '2',
            output_format: 'jpeg',
          }),
        });

        if (!falResponse.ok) {
          console.error(`Fal.ai error for image ${i}:`, await falResponse.text());
          continue;
        }

        const result = await falResponse.json();

        if (result.images && result.images[0]) {
          images.push({
            url: result.images[0].url,
            background: template.name,
          });
        }

      } catch (err) {
        console.error(`Error generating image ${i}:`, err);
        // Continue même si une image échoue
      }
    }

    if (images.length === 0) {
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
    return NextResponse.json(
      { error: 'Erreur lors de la génération' },
      { status: 500 }
    );
  }
}
