// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://madebyyuca.com/photos-produit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://madebyyuca.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
