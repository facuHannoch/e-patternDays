const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 }
  });

  const screenshotDir = path.join(__dirname, '../.artifacts/screenshots');

  // Ensure directory exists
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const pages = [
    { url: 'http://localhost:3000', filename: '01-landing-page.png', name: 'Landing Page' },
    { url: 'http://localhost:3000/sign-up', filename: '02-sign-up.png', name: 'Sign Up' },
    { url: 'http://localhost:3000/sign-in', filename: '03-sign-in.png', name: 'Sign In' },
    { url: 'http://localhost:3000/demo', filename: '04-dashboard.png', name: 'Dashboard' },
    { url: 'http://localhost:3000/demo/habits', filename: '05-habits.png', name: 'Habits' },
    { url: 'http://localhost:3000/demo/entries', filename: '06-entries.png', name: 'Entries' },
  ];

  try {
    for (const p of pages) {
      console.log(`Capturing ${p.name}...`);
      await page.goto(p.url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotDir, p.filename) });
      console.log(`✓ ${p.name}`);
    }

    console.log('\n✓ All screenshots saved to:', screenshotDir);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
