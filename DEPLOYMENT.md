# 🚀 GUIDE DE DÉPLOIEMENT COMPLET

## ⚡ Déploiement Rapide (10 minutes)

### ÉTAPE 1: Préparer le projet localement

```bash
# 1. Télécharger le projet
cd yuca-product-photos

# 2. Installer les dépendances
npm install

# 3. Créer .env.local
cp .env.example .env.local

# 4. Éditer .env.local avec vos clés (voir ci-dessous)
```

---

### ÉTAPE 2: Obtenir les clés API

#### A) Fal.ai (OBLIGATOIRE - Génération d'images)

1. Aller sur: https://fal.ai/dashboard
2. Cliquer "Sign Up" (ou "Login" si compte existe)
3. Aller dans "API Keys"
4. Cliquer "Create API Key"
5. Copier la clé (commence par `fal_`)
6. Coller dans `.env.local`:
   ```
   FAL_KEY=fal_votre_cle_ici
   ```

**💰 Ajouter du crédit:**
- Aller dans "Billing"
- Ajouter 10-20€ pour commencer
- ~0.05€ par image générée

#### B) Stripe (OBLIGATOIRE - Paiements)

1. Aller sur: https://dashboard.stripe.com
2. Créer un compte (ou login)
3. **MODE TEST d'abord:**
   - Aller dans "Développeurs" → "Clés API"
   - Basculer en mode "Test" (toggle en haut à droite)
   - Copier:
     - Clé publiable (`pk_test_...`)
     - Clé secrète (`sk_test_...`)
   - Coller dans `.env.local`:
     ```
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
     STRIPE_SECRET_KEY=sk_test_xxx
     ```

**📦 Créer les produits Stripe:**

1. Dans Stripe Dashboard → "Produits" → "Ajouter un produit"

2. **Produit 1: Pack Essentiel**
   - Nom: "Pack Essentiel - 10 Photos"
   - Prix: 14.99 EUR
   - Type: Paiement unique
   - Sauvegarder
   - **Copier le Price ID** (`price_xxx`)

3. **Produit 2: Pack Professionnel**
   - Nom: "Pack Professionnel - 25 Photos"
   - Prix: 29.99 EUR
   - Sauvegarder
   - Copier le Price ID

4. **Produit 3: Pack Premium**
   - Nom: "Pack Premium - 50 Photos"
   - Prix: 49.99 EUR
   - Sauvegarder
   - Copier le Price ID

5. **Ajouter les Price IDs dans le code:**

Éditer `app/page.js` ligne 18-46:

```javascript
const PLANS = [
  {
    id: 'pack-5',
    name: 'Pack Découverte',
    images: 5,
    price: 0,
    priceId: null,
    locked: false,
  },
  {
    id: 'pack-10',
    name: 'Pack Essentiel',
    images: 10,
    price: 14.99,
    priceId: 'price_XXX_VOTRE_PRICE_ID', // ← Coller ici
    locked: false, // ← Mettre false pour activer
  },
  {
    id: 'pack-25',
    name: 'Pack Professionnel',
    images: 25,
    price: 29.99,
    priceId: 'price_XXX_VOTRE_PRICE_ID', // ← Coller ici
    popular: true,
    locked: false,
  },
  {
    id: 'pack-50',
    name: 'Pack Premium',
    images: 50,
    price: 49.99,
    priceId: 'price_XXX_VOTRE_PRICE_ID', // ← Coller ici
    locked: false,
  },
];
```

---

### ÉTAPE 3: Tester en local

```bash
npm run dev
```

Ouvrir: http://localhost:3000

**Test du pack gratuit:**
1. Télécharger une photo produit (ex: bouteille, chaussure)
2. Décrire: "Bouteille d'eau bleue"
3. Sélectionner "Pack Découverte" (GRATUIT)
4. Cliquer "Générer"
5. Attendre 1-2 minutes
6. Télécharger le ZIP

✅ Si ça marche → Passer à l'étape 4
❌ Si erreur → Vérifier `.env.local` et FAL_KEY

**Test du paiement Stripe:**
1. Sélectionner "Pack Essentiel" (14.99€)
2. Cliquer "Générer"
3. Redirigé vers Stripe
4. Utiliser carte test: `4242 4242 4242 4242`
5. Date: 12/34, CVC: 123
6. Valider
7. Redirigé vers page succès

✅ Si paiement fonctionne → Prêt pour production!

---

### ÉTAPE 4: Déployer sur Vercel

#### A) Créer un repo GitHub

```bash
# 1. Initialiser git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Commit
git commit -m "Initial commit - Yuca Photos Produit"

# 4. Créer repo sur GitHub
# Aller sur github.com → New repository
# Nom: yuca-photos-produit
# Ne PAS initialiser avec README

# 5. Push
git remote add origin https://github.com/VOTRE-USERNAME/yuca-photos-produit.git
git branch -M main
git push -u origin main
```

#### B) Déployer sur Vercel

1. Aller sur: https://vercel.com
2. Cliquer "Import Project"
3. Sélectionner "Import Git Repository"
4. Choisir votre repo `yuca-photos-produit`
5. Configuration:
   - Framework: Next.js (auto-détecté)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. **IMPORTANT - Ajouter les variables d'environnement:**

Cliquer "Environment Variables" et ajouter:

```
FAL_KEY=fal_votre_cle
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_APP_URL=https://yuca-photos-produit.vercel.app
```

⚠️ **Pour l'instant, utiliser les clés TEST de Stripe** (`pk_test_` et `sk_test_`)

7. Cliquer "Deploy"
8. Attendre 2-3 minutes
9. ✅ Site déployé!

#### C) Tester le site en production

1. Cliquer sur le lien Vercel (ex: `yuca-photos-produit.vercel.app`)
2. Tester le pack gratuit
3. Tester un paiement (avec carte test)
4. Vérifier que tout fonctionne

---

### ÉTAPE 5: Connecter votre domaine

#### A) Dans Vercel

1. Aller dans votre projet Vercel
2. Settings → Domains
3. Ajouter `madebyyuca.com`

#### B) Configuration DNS

Vercel vous donnera des instructions, généralement:

**Si domaine chez OVH, Gandi, etc:**

Ajouter un enregistrement CNAME:
```
Type: CNAME
Nom: @
Valeur: cname.vercel-dns.com
```

**Attendre 5-30 minutes** pour propagation DNS

#### C) Mettre à jour l'URL

Dans Vercel → Settings → Environment Variables:

Modifier:
```
NEXT_PUBLIC_APP_URL=https://madebyyuca.com
```

Redéployer le projet.

---

### ÉTAPE 6: PASSER EN MODE PRODUCTION (€€€)

⚠️ **UNIQUEMENT quand vous êtes prêt à accepter de vrais paiements!**

#### A) Activer Stripe en mode LIVE

1. Dans Stripe Dashboard
2. Basculer en mode "Live" (toggle en haut)
3. Aller dans "Développeurs" → "Clés API"
4. Copier les clés LIVE:
   - `pk_live_xxx`
   - `sk_live_xxx`

#### B) Recréer les produits en LIVE

1. Aller dans "Produits"
2. Créer les mêmes 3 produits (14.99€, 29.99€, 49.99€)
3. Copier les nouveaux Price IDs (en LIVE)

#### C) Mettre à jour Vercel

1. Vercel → Settings → Environment Variables
2. Modifier:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   STRIPE_SECRET_KEY=sk_live_xxx
   ```
3. Redéployer

4. Modifier le code `app/page.js` avec les nouveaux Price IDs LIVE

5. Commit + Push:
   ```bash
   git add .
   git commit -m "Production Stripe keys"
   git push
   ```

#### D) Configurer les webhooks Stripe (IMPORTANT)

1. Dans Stripe Dashboard → "Développeurs" → "Webhooks"
2. Ajouter un endpoint: `https://madebyyuca.com/api/webhook`
3. Sélectionner événements:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copier le "Signing secret" (`whsec_xxx`)
5. Ajouter dans Vercel:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

---

## ✅ CHECKLIST FINALE

Avant de lancer publiquement:

- [ ] Pack gratuit fonctionne
- [ ] Paiements Stripe fonctionnent (mode test)
- [ ] Génération d'images fonctionne
- [ ] Téléchargement ZIP fonctionne
- [ ] Site accessible sur madebyyuca.com
- [ ] Clés Stripe en mode LIVE configurées
- [ ] Webhooks Stripe configurés
- [ ] Crédit Fal.ai suffisant (50-100€)
- [ ] Testé sur mobile
- [ ] CGV et mentions légales ajoutées

---

## 💰 BUDGET INITIAL RECOMMANDÉ

**Pour lancer:**
- Fal.ai: 50€ (génération de ~1,000 images)
- Stripe: 0€ (pas de frais fixes)
- Vercel: 0€ (plan gratuit suffit)
- Domaine: 10€/an (si pas déjà acheté)

**Total: ~60€**

**Rentabilisé après:** 2-3 ventes (Pack Pro à 29.99€)

---

## 📊 SUIVI DES PERFORMANCES

### Dashboard Stripe
- Voir les paiements reçus
- Voir les packs les plus vendus
- Exports comptables

### Vercel Analytics
- Nombre de visiteurs
- Pages les plus visitées
- Taux de conversion

### Fal.ai Dashboard
- Nombre d'images générées
- Coûts en temps réel
- Erreurs de génération

---

## 🐛 PROBLÈMES FRÉQUENTS

### "Failed to generate photos"
→ Vérifier crédit Fal.ai
→ Vérifier FAL_KEY dans Vercel

### "Payment failed"
→ Vérifier Price IDs
→ Vérifier clés Stripe (LIVE vs TEST)

### "Site not accessible"
→ Vérifier DNS (attendre 30 min max)
→ Vérifier domaine dans Vercel

### "Images ne téléchargent pas"
→ Vérifier console navigateur (F12)
→ Problème CORS possible

---

## 📞 AIDE

**Documentation:**
- Next.js: https://nextjs.org/docs
- Stripe: https://stripe.com/docs
- Fal.ai: https://fal.ai/docs
- Vercel: https://vercel.com/docs

**Support:**
- Stripe: https://support.stripe.com
- Vercel: https://vercel.com/support

---

## 🎉 C'EST PARTI !

Votre générateur est maintenant:
✅ Déployé sur https://madebyyuca.com
✅ Prêt à accepter des paiements
✅ Opérationnel 24/7

**Prochaines étapes:**
1. Promouvoir sur réseaux sociaux
2. Contacter des e-commerçants
3. Créer des exemples avant/après
4. Optimiser le SEO
5. Ajouter des témoignages clients

**Bonne chance ! 🚀💰**
