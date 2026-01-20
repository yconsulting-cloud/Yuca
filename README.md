# 🎨 Yuca Photos Produit - Générateur IA

Photos professionnelles générées par IA pour votre e-commerce.

## 📋 Fonctionnalités

✅ **4 packs disponibles:**
- Pack Découverte: 5 photos (GRATUIT pour test)
- Pack Essentiel: 10 photos (14.99€) - Verrouillé
- Pack Professionnel: 25 photos (29.99€) - Verrouillé  
- Pack Premium: 50 photos (49.99€) - Verrouillé

✅ **Caractéristiques:**
- Interface en français
- Upload d'image produit
- Génération automatique avec différents arrière-plans
- Téléchargement ZIP de toutes les photos
- Paiement Stripe intégré
- Design moderne et responsive

---

## 🚀 Installation Rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configuration des variables d'environnement

Copier `.env.example` vers `.env.local`:

```bash
cp .env.example .env.local
```

Remplir avec vos clés:

```env
# OBLIGATOIRE - Fal.ai
FAL_KEY=fal_xxxxxxxxx

# OBLIGATOIRE - Stripe (pour paiement)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# OPTIONNEL - Turnstile (bot protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxxxx
TURNSTILE_SECRET_KEY=xxxxx

# URL de votre site
NEXT_PUBLIC_APP_URL=https://madebyyuca.com
```

### 3. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🔑 Obtenir vos clés API

### Fal.ai (OBLIGATOIRE)

1. Aller sur [https://fal.ai/dashboard](https://fal.ai/dashboard)
2. S'inscrire / Se connecter
3. Créer une clé API
4. Copier dans `.env.local` → `FAL_KEY`

**Coût:** ~0.05€ par image générée

### Stripe (OBLIGATOIRE pour paiement)

1. Aller sur [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. S'inscrire / Se connecter
3. Aller dans "Développeurs" → "Clés API"
4. Copier:
   - Clé publique → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Clé secrète → `STRIPE_SECRET_KEY`

**Important:** Commencer avec clés de TEST (`pk_test_` et `sk_test_`)

### Créer les produits Stripe

1. Aller dans Stripe Dashboard → "Produits"
2. Créer 3 produits:
   - **Pack Essentiel**: 14.99€
   - **Pack Professionnel**: 29.99€
   - **Pack Premium**: 49.99€
3. Copier les **Price ID** (commence par `price_xxx`)
4. Les ajouter dans `app/page.js` ligne 13-50:

```javascript
{
  id: 'pack-10',
  name: 'Pack Essentiel',
  images: 10,
  price: 14.99,
  priceId: 'price_xxxVOTRE_PRICE_ID', // ← ICI
  popular: false,
  locked: true,
},
```

---

## 🎯 Activer les packs payants

Par défaut, seul le pack gratuit (5 photos) fonctionne.

Pour activer les autres:

1. Créer les produits dans Stripe
2. Copier les Price IDs
3. Dans `app/page.js`, changer `locked: true` → `locked: false`:

```javascript
{
  id: 'pack-10',
  ...
  locked: false, // ← Changer ici
},
```

---

## 📁 Structure du projet

```
yuca-product-photos/
├── app/
│   ├── api/
│   │   ├── generate-photos/
│   │   │   └── route.js          # Génération photos avec Fal.ai
│   │   └── create-checkout/
│   │       └── route.js          # Création session Stripe
│   ├── success/
│   │   └── page.js               # Page après paiement réussi
│   ├── layout.js                 # Layout principal
│   └── page.js                   # Page d'accueil (interface principale)
├── .env.example                  # Template variables d'environnement
├── .env.local                    # VOS variables (à créer)
├── package.json                  # Dépendances
├── next.config.js               # Configuration Next.js
└── README.md                     # Ce fichier
```

---

## 🧪 Tester le pack gratuit

1. Lancer le projet: `npm run dev`
2. Aller sur [http://localhost:3000](http://localhost:3000)
3. Télécharger une photo produit
4. Décrire le produit
5. Sélectionner "Pack Découverte" (GRATUIT)
6. Cliquer "Générer 5 photos"
7. Attendre 1-2 minutes
8. Télécharger le ZIP

**Coût pour vous:** 5 × 0.05€ = 0.25€ (Fal.ai)

---

## 💳 Tester le paiement Stripe

### Mode TEST (clés de test)

1. Utiliser la carte test de Stripe:
   - Numéro: `4242 4242 4242 4242`
   - Date: N'importe quelle date future
   - CVC: N'importe quel 3 chiffres
   - Code postal: N'importe lequel

2. Le paiement sera simulé (AUCUN ARGENT réel)

### Mode PRODUCTION (clés réelles)

⚠️ **ATTENTION:** Utilisez vos vraies clés Stripe (`pk_live_` et `sk_live_`)

Stripe prendra:
- Frais: 1.5% + 0.25€ par transaction
- Exemple: 14.99€ → Vous recevez ~14.50€

---

## 🚀 Déploiement sur Vercel

### 1. Push sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/yuca-photos.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. "Import Project"
3. Sélectionner votre repo GitHub
4. Ajouter les variables d'environnement:
   - `FAL_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (sera https://madebyyuca.com)
5. Deploy!

### 3. Configurer le domaine

1. Dans Vercel → Settings → Domains
2. Ajouter `madebyyuca.com`
3. Suivre les instructions DNS

---

## 💰 Coûts estimés

### Par génération:

**Pack Découverte (5 photos):**
- Coût Fal.ai: 5 × 0.05€ = 0.25€
- Prix client: GRATUIT
- Votre perte: -0.25€

**Pack Essentiel (10 photos):**
- Coût Fal.ai: 10 × 0.05€ = 0.50€
- Prix client: 14.99€
- Frais Stripe: ~0.50€
- **Profit: ~14€**

**Pack Professionnel (25 photos):**
- Coût Fal.ai: 25 × 0.05€ = 1.25€
- Prix client: 29.99€
- Frais Stripe: ~0.70€
- **Profit: ~28€**

**Pack Premium (50 photos):**
- Coût Fal.ai: 50 × 0.05€ = 2.50€
- Prix client: 49.99€
- Frais Stripe: ~1€
- **Profit: ~46€**

### Projection mensuelle:

**Scénario conservateur:**
- 10 clients/mois × Pack Pro (29.99€)
- Revenu: 300€
- Coûts: 30€ (Fal.ai + Stripe)
- **Profit: 270€/mois**

**Scénario optimiste:**
- 50 clients/mois
- Mix: 20 Essentiel + 25 Pro + 5 Premium
- Revenu: 1,500€
- Coûts: 100€
- **Profit: 1,400€/mois**

---

## 🐛 Résolution de problèmes

### "FAL_KEY not configured"
→ Vérifier que `FAL_KEY` est dans `.env.local`

### "Stripe error"
→ Vérifier vos clés Stripe
→ Vérifier que les Price IDs sont corrects

### Images ne se génèrent pas
→ Vérifier la console (F12)
→ Vérifier les logs Vercel
→ Vérifier le crédit Fal.ai

### "Payment failed"
→ Utiliser la carte test Stripe: 4242 4242 4242 4242

---

## 📞 Support

**Problème technique?**
→ Vérifier les logs dans la console
→ Vérifier Vercel logs

**Questions sur Stripe?**
→ [https://support.stripe.com](https://support.stripe.com)

**Questions sur Fal.ai?**
→ [https://fal.ai/docs](https://fal.ai/docs)

---

## 📜 License

Propriété de Made by Yuca © 2026

---

## 🎉 C'est tout !

Votre générateur de photos produit est prêt.

**Pour commencer:**
1. `npm install`
2. Créer `.env.local` avec vos clés
3. `npm run dev`
4. Tester avec le pack gratuit
5. Déployer sur Vercel quand prêt!

**Bonne chance ! 🚀**
