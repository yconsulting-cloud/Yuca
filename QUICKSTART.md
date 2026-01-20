# ⚡ DÉMARRAGE RAPIDE - 5 MINUTES

## 🎯 Pour tester MAINTENANT (sans déploiement)

### 1. Installation (2 minutes)

```bash
# Dans votre terminal
cd yuca-product-photos
npm install
```

### 2. Configuration (2 minutes)

Créer le fichier `.env.local`:

```bash
# Copier le template
cp .env.example .env.local
```

Éditer `.env.local` et ajouter SEULEMENT:

```env
FAL_KEY=votre_cle_fal_ici
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Obtenir FAL_KEY:**
1. Aller sur https://fal.ai/dashboard
2. S'inscrire (gratuit)
3. Créer une clé API
4. Copier dans `.env.local`
5. Ajouter 5-10€ de crédit

**Les clés Stripe ne sont PAS nécessaires pour tester le pack gratuit!**

### 3. Lancer (1 minute)

```bash
npm run dev
```

Ouvrir: http://localhost:3000

### 4. Tester (1 minute)

1. Télécharger une photo produit
2. Écrire: "Bouteille d'eau bleue"
3. Cliquer "Générer 5 photos (Gratuit)"
4. Attendre 1-2 minutes
5. ✅ Télécharger le ZIP!

**Coût:** ~0.25€ (5 images × 0.05€)

---

## 💳 Pour activer les paiements

### Étape 1: Obtenir les clés Stripe

1. https://dashboard.stripe.com
2. Mode "Test"
3. Développeurs → Clés API
4. Copier les clés de test

### Étape 2: Ajouter dans `.env.local`

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

### Étape 3: Créer les produits Stripe

1. Stripe → Produits → Ajouter
2. Créer 3 produits: 14.99€, 29.99€, 49.99€
3. Copier les Price IDs

### Étape 4: Modifier le code

Dans `app/page.js` ligne 22, 31, 39:

```javascript
priceId: 'price_VOTRE_ID_ICI'
locked: false  // Activer le pack
```

### Étape 5: Tester le paiement

1. Relancer: `npm run dev`
2. Sélectionner pack payant
3. Carte test: `4242 4242 4242 4242`
4. ✅ Fonctionne!

---

## 🚀 Pour déployer sur internet

Voir le fichier `DEPLOYMENT.md` (guide complet)

**Résumé ultra-rapide:**

```bash
# 1. Push sur GitHub
git init
git add .
git commit -m "Initial"
git push

# 2. Importer sur Vercel
# → vercel.com
# → Import Git Repository
# → Ajouter variables d'environnement
# → Deploy!

# 3. Accéder au site
# → yuca-photos.vercel.app
```

---

## ❓ FAQ Express

**Q: Combien ça coûte par image?**
A: ~0.05€ via Fal.ai

**Q: Je dois payer Vercel?**
A: Non, le plan gratuit suffit largement

**Q: Je dois payer Stripe?**
A: Non, juste les frais de transaction (1.5% + 0.25€)

**Q: Ça marche sur mobile?**
A: Oui, 100% responsive

**Q: Combien je peux gagner?**
A: Pack Pro (29.99€) - coût (1.25€) = ~28€ de profit par vente

**Q: Le pack gratuit est vraiment gratuit pour les clients?**
A: Oui, mais ça vous coûte 0.25€ par test

---

## 🎯 C'EST TOUT!

Vous êtes prêt à générer des photos produit par IA!

**Besoin d'aide?** Lire README.md ou DEPLOYMENT.md
