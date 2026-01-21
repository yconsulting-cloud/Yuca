const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    name: 'hero-dashboard',
  },
  {
    url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80',
    name: 'assistant',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    name: 'site',
  },
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

async function run() {
  const outDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const img of images) {
    const jpgPath = path.join(outDir, `${img.name}.jpg`);
    const webpPath = path.join(outDir, `${img.name}.webp`);
    const avifPath = path.join(outDir, `${img.name}.avif`);
    console.log('Fetching', img.url);
    try {
      await download(img.url, jpgPath);
      console.log('Saved', jpgPath);
      await sharp(jpgPath).resize(1200, 760, { fit: 'cover' }).webp({ quality: 80 }).toFile(webpPath);
      console.log('Wrote', webpPath);
      await sharp(jpgPath).resize(1200, 760, { fit: 'cover' }).avif({ quality: 50 }).toFile(avifPath);
      console.log('Wrote', avifPath);
    } catch (err) {
      console.error('Error processing', img.url, err.message);
    }
  }
}

run().catch(err => { console.error(err); process.exit(1); });
