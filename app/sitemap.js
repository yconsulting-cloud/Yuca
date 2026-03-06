// app/sitemap.js
export default function sitemap() {
  const now = new Date();
  return [
    { url: 'https://madebyyuca.com/', lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://madebyyuca.com/shopshots', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];
}
