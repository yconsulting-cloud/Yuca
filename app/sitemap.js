// app/sitemap.js
export default function sitemap() {
  const now = new Date();
  const base = 'https://madebyyuca.com';

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${base}/`,
          en: `${base}/en`,
        },
      },
    },
    {
      url: `${base}/shopshots`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${base}/shopshots`,
          en: `${base}/en/shopshots`,
        },
      },
    },
  ];
}
