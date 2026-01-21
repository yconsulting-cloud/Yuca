'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import './shopshots.css';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const PLANS = [
  {
    id: 'pack-3',
    name: 'Pack Découverte',
    images: 3,
    price: 0,
    priceId: null,
    popular: false,
    locked: false,
  },
  {
    id: 'pack-10',
    name: 'Pack Essentiel',
    images: 10,
    price: 14.99,
    priceId: 'price_xxx',
    popular: false,
    locked: true,
  },
  {
    id: 'pack-25',
    name: 'Pack Professionnel',
    images: 25,
    price: 29.99,
    priceId: 'price_xxx',
    popular: true,
    locked: true,
  },
  {
    id: 'pack-50',
    name: 'Pack Premium',
    images: 50,
    price: 49.99,
    priceId: 'price_xxx',
    popular: false,
    locked: true,
  },
];

export default function ShopshotsClient() {
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const progressFillRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Veuillez sélectionner une image valide'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('L\'image est trop grande (max 10MB)'); return; }
    setProductImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setProductImagePreview(reader.result);
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSelectPlan = (plan) => {
    if (plan.locked) { setError('Ce pack sera bientôt disponible !'); return; }
    setSelectedPlan(plan); setError(null);
  };

  const handleGenerate = async () => {
    if (!productImage) { setError('Veuillez télécharger une photo de votre produit'); return; }
    if (!productDescription.trim()) { setError('Veuillez décrire votre produit'); return; }
    if (selectedPlan.price > 0 && selectedPlan.locked) { setError('Ce pack n\'est pas encore disponible'); return; }
    if (selectedPlan.price > 0) { handlePayment(); return; }
    await generatePhotos();
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId: selectedPlan.id, priceId: selectedPlan.priceId }) });
      const { url } = await response.json(); window.location.href = url;
    } catch (err) { setError('Erreur lors du paiement. Réessayez.'); }
  };

  const generatePhotos = async () => {
    setIsGenerating(true);
    setProgress(3);
    setGeneratedImages([]);
    setError(null);

    let prog = 3;
    // smoother progression: approach soft cap (97) with decreasing increments
    const progInterval = setInterval(() => {
      if (prog >= 97) { prog = 97; setProgress(prog); return; }
      const delta = prog < 60 ? (1 + Math.random() * 6) : Math.max(0.4, (100 - prog) * 0.03 + Math.random() * 0.6);
      prog = Math.min(97, Math.round((prog + delta) * 10) / 10);
      setProgress(prog);
    }, 400);

    try {
      const base64Image = await fileToBase64(productImage);
      const response = await fetch('/api/generate-photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageData: base64Image, description: productDescription, count: selectedPlan.images }) });
      if (!response.ok) throw new Error('Erreur lors de la génération');
      const data = await response.json();
      // ensure a visible transition to 100%
      setProgress(99);
      setTimeout(() => setProgress(100), 250);
      setGeneratedImages(data.images || []);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Une erreur est survenue. Réessayez.');
      setProgress(0);
    } finally {
      clearInterval(progInterval);
      setIsGenerating(false);
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });

  useEffect(() => { if (progressFillRef.current) progressFillRef.current.style.setProperty('--w', `${progress}%`); }, [progress]);

  const downloadAllAsZip = async () => {
    if (!generatedImages || generatedImages.length === 0) return;
    try {
      const response = await fetch('/api/download-zip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ images: generatedImages }) });
      if (!response.ok) throw new Error('Erreur lors de la préparation du ZIP');
      const blob = await response.blob(); saveAs(blob, `yuca-photos-produit-${Date.now()}.zip`);
    } catch (err) { console.error('Download ZIP error:', err); setError('Impossible de préparer le ZIP. Réessayez.'); }
  };

  return (
    <div className="shopshots-page">
      <header className="site-header">
        <div className="container">
          <div className="header-left">
            <a href="/" className="nav__logo" aria-label="Yuca - Accueil">Yuca<span>.</span></a>
            <div className="divider-vertical" />
            <div className="header-sub">Shopshots</div>
          </div>
          <div className="header-right-links">
            <a href="/" className="nav-link btn btn-outline">Nos autres services</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero__bg"></div>
        <div className="hero__grid"></div>
        <div className="hero__glow"></div>
        <div className="hero__content container">
          <div className="hero__badge" style={{display:'none'}}></div>
          <h1 className="hero__title">Transformez votre photo en <span className="hero__title-gradient">dizaines de variantes</span></h1>
          <p className="hero__subtitle">Téléchargez une photo, obtenez des images professionnelles pour votre e‑commerce et réseaux sociaux en quelques minutes.</p>
          <div className="hero__ctas">
            <button className="hero__cta hero__cta--primary btn btn-accent" onClick={() => fileInputRef.current?.click()}>Téléverser une photo</button>
            <button className="hero__cta hero__cta--secondary btn btn-outline" onClick={() => window.location.href = '/#faq'}>Comment ça marche</button>
          </div>
        </div>
      </section>

      <main className="main-container">
        <div className="plans-section">
          <h3 className="section-title">Choisissez votre pack</h3>

          <div className="plans-grid">
            {PLANS.map((plan) => (
              <div key={plan.id} onClick={() => handleSelectPlan(plan)} className={`plan-card ${plan.locked ? 'locked' : ''} ${selectedPlan.id === plan.id ? 'selected' : ''}`}>
                {plan.popular && <div className="badge-popular">POPULAIRE</div>}
                {plan.locked && <div className="badge-soon">BIENTÔT</div>}
                <div>
                  <h4 className="plan-name">{plan.name}</h4>
                  <div className="plan-price">{plan.price === 0 ? 'GRATUIT' : `${plan.price}€`}</div>
                  <p className="plan-desc">{plan.images} photos professionnelles</p>
                  <ul className="plan-features"><li>✓ Différents arrière-plans</li><li>✓ Qualité HD</li><li>✓ Téléchargement ZIP</li><li>✓ Utilisation commerciale</li></ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-title--small">1. Téléchargez votre photo produit</h3>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden-file-input" />
          <div onClick={() => fileInputRef.current?.click()} className={`upload-drop ${productImagePreview ? 'has-preview' : ''}`}>
            {productImagePreview ? (
              <div><Image src={productImagePreview} alt="Preview" className="preview-img" width={600} height={400} /></div>
            ) : (
              <div><div className="upload-emoji">📸</div><p className="upload-instruction">Cliquez pour télécharger une image</p><p className="upload-sub">JPG, PNG (max 10MB)</p></div>
            )}
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-title--small">2. Décrivez votre produit</h3>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Ex: Bouteille d'eau en acier inoxydable, couleur bleue marine" maxLength={200} className="description-textarea" />
          <div className="muted-right">{productDescription.length}/200</div>
        </div>

        {error && <div className="error-box">⚠️ {error}</div>}

        {isGenerating && (
          <div className="progress-card progress-top">
            <div className="progress-bar" aria-hidden="true"><div className="progress-fill" ref={progressFillRef} style={{width: `${progress}%`}} /></div>
            <p className="progress-text">Génération des photos... {Math.round(progress)}%</p>
          </div>
        )}

        <div className="generate-wrap">
          <button onClick={handleGenerate} disabled={isGenerating || !productImage || !productDescription.trim()} className={`generate-btn ${isGenerating || !productImage || !productDescription.trim() ? 'disabled' : 'enabled'}`}>
            {isGenerating ? <span className="btn-loading"><span className="spinner" />Génération en cours...</span> : `Générer ${selectedPlan.images} photos ${selectedPlan.price > 0 ? `(${selectedPlan.price}€)` : '(Gratuit)'} `}
          </button>
          {selectedPlan.price === 0 && <p className="generate-note">🎉 Pack gratuit pour tester le service !</p>}
        </div>

        {generatedImages.length > 0 && (
          <div className="generated-card">
            <div className="generated-header"><h3 className="generated-title">Vos photos sont prêtes ! 🎉</h3><button onClick={downloadAllAsZip} className="download-btn">📥 Télécharger tout (ZIP)</button></div>
            <div className="image-grid">{generatedImages.map((img, index) => (<div key={index} className="image-tile"><img src={img.url} alt={`Photo ${index + 1}`} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }} /></div>))}</div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer__content">
          <a href="/" className="footer__logo">Yuca<span>.</span></a>
            <p>Basé en France – intervention à distance dans le monde entier.</p>
          <nav className="footer__links">
              <a href="/#services" className="footer__link">Services</a>
              <a href="/#tarifs" className="footer__link">Tarifs</a>
              <a href="/#contact" className="footer__link">Contact</a>
              <a href="/mentions-legales.html" className="footer__link">Mentions légales</a>
              <a href="/politique-confidentialite.html" className="footer__link">Politique de confidentialité</a>
          </nav>
        </div>
          <div className="footer__bottom">
            <p>© <span id="year"></span> Yuca. Sites web & Assistant personnalisé </p>
            <div className="footer__social">
                <a href="https://www.instagram.com/madebyyuca/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 11.37 7 4 4 0 0 1 16 11.37z" />
                    <circle cx="17.5" cy="6.5" r="0.5" />
                  </svg>
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
}
