'use client';

import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};

// Plans de tarification
const PLANS = [
  {
    id: 'pack-5',
    name: 'Pack Découverte',
    images: 5,
    price: 0, // Gratuit pour test
    priceId: null,
    popular: false,
    locked: false,
  },
  {
    id: 'pack-10',
    name: 'Pack Essentiel',
    images: 10,
    price: 14.99,
    priceId: 'price_xxx', // À remplacer avec votre Stripe Price ID
    popular: false,
    locked: true, // Verrouillé pour l'instant
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

export default function Home() {
  // State
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Gérer l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image est trop grande (max 10MB)');
      return;
    }

    setProductImage(file);
    
    // Créer un aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  // Sélectionner un plan
  const handleSelectPlan = (plan) => {
    if (plan.locked) {
      setError('Ce pack sera bientôt disponible !');
      return;
    }
    setSelectedPlan(plan);
    setError(null);
  };

  // Générer les photos
  const handleGenerate = async () => {
    // Validation
    if (!productImage) {
      setError('Veuillez télécharger une photo de votre produit');
      return;
    }

    if (!productDescription.trim()) {
      setError('Veuillez décrire votre produit');
      return;
    }

    if (selectedPlan.price > 0 && selectedPlan.locked) {
      setError('Ce pack n\'est pas encore disponible');
      return;
    }

    // Si payant, rediriger vers Stripe
    if (selectedPlan.price > 0) {
      handlePayment();
      return;
    }

    // Générer (pack gratuit)
    await generatePhotos();
  };

  // Paiement Stripe
  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          priceId: selectedPlan.priceId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError('Erreur lors du paiement. Réessayez.');
    }
  };

  // Générer les photos
  const generatePhotos = async () => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImages([]);
    setError(null);

    try {
      // Convertir l'image en base64
      const base64Image = await fileToBase64(productImage);

      // Appeler l'API de génération
      const response = await fetch('/api/generate-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: base64Image,
          description: productDescription,
          count: selectedPlan.images,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      const data = await response.json();
      setGeneratedImages(data.images);
      setProgress(100);

    } catch (err) {
      console.error('Generation error:', err);
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Convertir fichier en base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Télécharger toutes les photos en ZIP
  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    
    for (let i = 0; i < generatedImages.length; i++) {
      try {
        const response = await fetch(generatedImages[i].url);
        const blob = await response.blob();
        zip.file(`photo-produit-${i + 1}.jpg`, blob);
      } catch (err) {
        console.error('Error downloading image:', err);
      }
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `yuca-photos-produit-${Date.now()}.zip`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .btn {
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.4);
        }
        
        .btn:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .plan-card {
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        
        .plan-card:hover:not(.locked) {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 217, 255, 0.25);
        }
        
        .plan-card.locked {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        .yuca-cyan {
          color: #00D9FF;
        }
        
        .yuca-bg-cyan {
          background: #00D9FF;
        }
        
        .yuca-gradient {
          background: linear-gradient(135deg, #00D9FF 0%, #00BCD4 100%);
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #f0f0f0',
        padding: '20px 0',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#000',
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}>
              Yuca<span style={{ color: '#00D9FF' }}>.</span>
            </h1>
            <div style={{
              height: '30px',
              width: '2px',
              background: '#e0e0e0',
            }} />
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0,
              fontWeight: '500',
            }}>
              Photos Produit IA
            </p>
          </div>
          
          <a 
            href="https://madebyyuca.com" 
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.color = '#00D9FF'}
            onMouseOut={(e) => e.target.style.color = '#666'}
          >
            ← Retour au site
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
        
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '30px',
            padding: '8px 20px',
            marginBottom: '25px',
          }}>
            <span style={{
              color: '#00D9FF',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}>
              • Photos produit IA
            </span>
          </div>
          
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#000',
            marginBottom: '15px',
            lineHeight: '1.1',
          }}>
            Transformez votre photo en{' '}
            <span style={{ color: '#00D9FF' }}>dizaines de variantes</span>
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400',
          }}>
            Téléchargez une photo, obtenez des images professionnelles
            pour votre e-commerce et réseaux sociaux en quelques minutes.
          </p>
        </div>

        {/* Plans de tarification */}
        <div style={{
          marginBottom: '50px',
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '30px',
          }}>
            Choisissez votre pack
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className={`plan-card ${plan.locked ? 'locked' : ''}`}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  border: selectedPlan.id === plan.id ? '3px solid #000' : '2px solid #e0e0e0',
                  position: 'relative',
                  boxShadow: selectedPlan.id === plan.id ? '0 8px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#00D9FF',
                    color: '#000',
                    padding: '6px 18px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 15px rgba(0, 217, 255, 0.4)',
                  }}>
                    POPULAIRE
                  </div>
                )}
                
                {plan.locked && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#ffc107',
                    color: '#000',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    BIENTÔT
                  </div>
                )}
                
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '10px',
                  }}>
                    {plan.name}
                  </h4>
                  
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    marginBottom: '5px',
                  }}>
                    {plan.price === 0 ? 'GRATUIT' : `${plan.price}€`}
                  </div>
                  
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '20px',
                  }}>
                    {plan.images} photos professionnelles
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: '#666',
                  }}>
                    <li style={{ marginBottom: '8px' }}>✓ Différents arrière-plans</li>
                    <li style={{ marginBottom: '8px' }}>✓ Qualité HD</li>
                    <li style={{ marginBottom: '8px' }}>✓ Téléchargement ZIP</li>
                    <li style={{ marginBottom: '8px' }}>✓ Utilisation commerciale</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '700',
            marginBottom: '20px',
          }}>
            1. Téléchargez votre photo produit
          </h3>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: productImagePreview ? '#f9f9f9' : 'white',
              transition: 'all 0.3s ease',
            }}
          >
            {productImagePreview ? (
              <div>
                <img 
                  src={productImagePreview} 
                  alt="Preview" 
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                  }}
                />
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Cliquez pour changer l'image
                </p>
              </div>
            ) : (
              <div>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '15px',
                }}>📸</div>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '5px',
                }}>
                  Cliquez pour télécharger une image
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#999',
                }}>
                  JPG, PNG (max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '700',
            marginBottom: '20px',
          }}>
            2. Décrivez votre produit
          </h3>
          
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Ex: Bouteille d'eau en acier inoxydable, couleur bleue marine"
            maxLength={200}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '15px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <div style={{
            textAlign: 'right',
            fontSize: '12px',
            color: '#999',
            marginTop: '5px',
          }}>
            {productDescription.length}/200
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            color: '#c00',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Generate Button */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !productImage || !productDescription.trim()}
            className="btn"
            style={{
              background: isGenerating || !productImage || !productDescription.trim() 
                ? '#e0e0e0' 
                : '#00D9FF',
              color: isGenerating || !productImage || !productDescription.trim()
                ? '#999'
                : '#000',
              padding: '18px 50px',
              borderRadius: '50px',
              fontSize: '17px',
              fontWeight: '800',
              boxShadow: isGenerating || !productImage || !productDescription.trim()
                ? 'none'
                : '0 8px 25px rgba(0, 217, 255, 0.4)',
              letterSpacing: '0.3px',
            }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="spinner" style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(0,0,0,0.2)',
                  borderTop: '3px solid #000',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}>
                </span>
                Génération en cours...
              </span>
            ) : (
              `Générer ${selectedPlan.images} photos ${selectedPlan.price > 0 ? `(${selectedPlan.price}€)` : '(Gratuit)'}`
            )}
          </button>
          
          {selectedPlan.price === 0 && (
            <p style={{
              marginTop: '10px',
              fontSize: '13px',
              color: '#666',
            }}>
              🎉 Pack gratuit pour tester le service !
            </p>
          )}
        </div>

        {/* Progress */}
        {isGenerating && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#f0f0f0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: '#00D9FF',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
              }} />
            </div>
            <p style={{
              textAlign: 'center',
              marginTop: '15px',
              color: '#666',
              fontSize: '14px',
            }}>
              Génération des photos... {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                margin: 0,
              }}>
                Vos photos sont prêtes ! 🎉
              </h3>
              
              <button
                onClick={downloadAllAsZip}
                className="btn"
                style={{
                  background: '#00D9FF',
                  color: '#000',
                  padding: '14px 35px',
                  borderRadius: '50px',
                  fontSize: '15px',
                  fontWeight: '800',
                  letterSpacing: '0.3px',
                  boxShadow: '0 6px 20px rgba(0, 217, 255, 0.3)',
                }}
              >
                📥 Télécharger tout (ZIP)
              </button>
            </div>
            
            <div className="image-grid">
              {generatedImages.map((img, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={img.url}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        borderTop: '1px solid #f0f0f0',
        padding: '40px 20px',
        marginTop: '100px',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '15px' }}>
          <span style={{
            fontSize: '24px',
            fontWeight: '900',
            color: '#000',
          }}>
            Yuca<span style={{ color: '#00D9FF' }}>.</span>
          </span>
        </div>
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: 0,
          fontWeight: '500',
        }}>
          © 2026 Made by Yuca • Photos générées par IA • 
          <a href="https://madebyyuca.com" style={{ 
            color: '#00D9FF', 
            marginLeft: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}>
            madebyyuca.com
          </a>
        </p>
      </footer>
    </div>
  );
}
