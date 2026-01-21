const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function run() {
  const BASE = process.env.BASE_URL || 'http://localhost:3000';
  const paths = ['/', '/shopshots', '/success', '/consulting'];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const client = await context.newCDPSession(page);

  console.log('Starting CSS rule usage tracking...');
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  await client.send('CSS.startRuleUsageTracking');

  for (const p of paths) {
    const url = new URL(p, BASE).toString();
    console.log('Visiting', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle' , timeout: 30000});
      // allow some idle time for deferred widgets to load
      await page.waitForTimeout(1200);
    } catch (e) {
      console.warn('Failed to load', url, e.message);
    }
  }

  console.log('Stopping CSS rule usage tracking...');
  const { ruleUsage } = await client.send('CSS.stopRuleUsageTracking');

  // Group by stylesheetId
  const usageBySheet = new Map();
  for (const r of ruleUsage) {
    if (!usageBySheet.has(r.styleSheetId)) usageBySheet.set(r.styleSheetId, []);
    usageBySheet.get(r.styleSheetId).push(r);
  }

  const outDir = path.join(__dirname, 'coverage');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let totalOriginal = 0;
  let totalUsed = 0;
  const outParts = [];

  for (const [styleSheetId, ranges] of usageBySheet.entries()) {
    try {
      const { text, sourceURL } = await client.send('CSS.getStyleSheetText', { styleSheetId });
      const originalSize = text.length;
      totalOriginal += originalSize;

      // sort ranges and merge used ranges
      const usedRanges = ranges.filter(r => r.used).map(r => ({ start: r.startOffset, end: r.endOffset }));
      usedRanges.sort((a,b) => a.start - b.start);
      const merged = [];
      for (const r of usedRanges) {
        if (!merged.length || r.start > merged[merged.length-1].end) merged.push(r);
        else merged[merged.length-1].end = Math.max(merged[merged.length-1].end, r.end);
      }

      let usedText = '';
      for (const m of merged) {
        usedText += text.slice(m.start, m.end) + '\n';
      }

      totalUsed += usedText.length;

      const header = `/* stylesheet: ${sourceURL || styleSheetId} (orig ${originalSize} bytes, used ${usedText.length} bytes) */\n`;
      outParts.push(header + usedText);
    } catch (e) {
      console.warn('Could not get stylesheet text for', styleSheetId, e.message);
    }
  }

  const outPath = path.join(outDir, 'used-styles.css');
  fs.writeFileSync(outPath, outParts.join('\n'));

  console.log(`Wrote trimmed CSS to ${outPath}`);
  console.log(`Total original CSS scanned: ${totalOriginal} bytes`);
  console.log(`Total used CSS extracted: ${totalUsed} bytes`);

  await client.detach();
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
