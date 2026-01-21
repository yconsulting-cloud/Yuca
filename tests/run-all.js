const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:3001';

async function checkPage(page, path) {
  const url = `${BASE}${path}`;
  console.log('\nVisiting', url);
  const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
  const status = res && res.status ? res.status() : 'unknown';
  console.log('  status:', status);

  const currentPath = new URL(page.url()).pathname;
  console.log('  final path:', currentPath);

  const checks = [];

  // cookie server markup
  const cookie = await page.$('#cookie-consent-ssr, .cookie-consent-wrap');
  checks.push(['cookie', !!cookie]);

  // chat trigger
  const chat = await page.$('#chatTrigger');
  checks.push(['chat', !!chat]);

  // hero
  const hero = await page.$('.hero');
  checks.push(['hero', !!hero]);

  // global css link
  const css = await page.$('link[href*="/_next/static/css/app/layout.css"]');
  checks.push(['layout.css', !!css]);

  for (const [name, ok] of checks) {
    console.log(`  ${name}:`, ok ? 'OK' : 'MISSING');
  }

  return { path: currentPath, status, checks };
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pages = ['/', '/shopshots', '/services', '/consulting', '/success'];
  let failed = false;

  for (const p of pages) {
    try {
      const result = await checkPage(page, p);
      // treat missing css or hero as a failure for marketing pages
      const requireHero = p === '/' || p === '/shopshots';
      const layoutOk = result.checks.find(c => c[0] === 'layout.css')[1];
      const heroOk = result.checks.find(c => c[0] === 'hero')[1];

      if (requireHero && (!layoutOk || !heroOk)) {
        console.error(`  ✖ Visual/stylesheet check failed for ${p}`);
        failed = true;
      }

      // /services and /consulting should redirect to '/'
      if (p === '/services' || p === '/consulting') {
        if (result.path !== '/') {
          console.error(`  ✖ Expected ${p} to redirect to / but got ${result.path}`);
          failed = true;
        }
      }
    } catch (e) {
      console.error('  Error visiting', p, e.stack || e.message);
      failed = true;
    }
  }

  await browser.close();
  if (failed) {
    console.error('\nOne or more checks failed.');
    process.exit(1);
  }

  console.log('\nAll checks passed.');
  process.exit(0);
})();
