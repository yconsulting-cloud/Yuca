// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success/'],
    },
    sitemap: 'https://madebyyuca.com/sitemap.xml',
  };
}
