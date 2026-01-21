// app/sitemap.js
export default function sitemap() {
  const now = new Date();
  return [
    { url: 'https://madebyyuca.com/', lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://madebyyuca.com/consulting', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://madebyyuca.com/services', lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: 'https://madebyyuca.com/shopshots', lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://madebyyuca.com/success', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
