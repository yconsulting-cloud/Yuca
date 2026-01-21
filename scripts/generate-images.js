// Usage: node scripts/generate-images.js
// Generates WebP and AVIF variants of public/og-image.jpg using sharp
// Requires: npm install sharp

const fs = require('fs');
const path = require('path');

async function main() {
  const sharp = require('sharp');
  const src = path.join(process.cwd(), 'public', 'og-image.jpg');
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }

  const outWebp = path.join(process.cwd(), 'public', 'og-image.webp');
  const outAvif = path.join(process.cwd(), 'public', 'og-image.avif');

  try {
    await sharp(src).resize(1200, 630, { fit: 'cover' }).webp({ quality: 80 }).toFile(outWebp);
    console.log('Wrote', outWebp);
  } catch (err) {
    console.error('Failed to write WebP:', err.message);
  }

  try {
    await sharp(src).resize(1200, 630, { fit: 'cover' }).avif({ quality: 50 }).toFile(outAvif);
    console.log('Wrote', outAvif);
  } catch (err) {
    console.error('Failed to write AVIF:', err.message);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
