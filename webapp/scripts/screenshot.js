const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 }
  });

  const screenshotDir = path.join(__dirname, '../.artifacts/screenshots');

  try {
    // Landing page
    console.log('Capturing landing page...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, '01-landing-page.png') });

    // Sign up page
    console.log('Capturing sign up page...');
    await page.goto('http://localhost:3000/sign-up', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, '02-sign-up.png') });

    // Sign in page
    console.log('Capturing sign in page...');
    await page.goto('http://localhost:3000/sign-in', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotDir, '03-sign-in.png') });

    console.log('Screenshots saved successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
