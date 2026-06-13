const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const videoDir = path.join(__dirname, '../.artifacts/videos');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: videoDir,
    },
  });

  const page = await context.newPage({
    viewport: { width: 1280, height: 720 }
  });

  try {
    console.log('Recording video walkthrough...');

    // Landing page
    console.log('1. Landing Page');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Sign up
    console.log('2. Sign Up Page');
    await page.click('text=Sign Up');
    await page.waitForTimeout(1500);

    // Back to landing
    console.log('3. Back to Landing');
    await page.click('text=Sign in');
    await page.waitForTimeout(1500);

    // Sign in
    console.log('4. Sign In Page');
    await page.waitForTimeout(1500);

    // Dashboard (demo)
    console.log('5. Dashboard');
    await page.goto('http://localhost:3000/demo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Scroll down to see more of dashboard
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000);

    // Habits page
    console.log('6. Habits Page');
    await page.click('text=Habits');
    await page.waitForTimeout(2000);

    // Entries page
    console.log('7. Entries Page');
    await page.click('text=Entries');
    await page.waitForTimeout(2500);

    // Scroll down to see more entries
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(1500);

    console.log('✓ Video recorded successfully!');

    // Close and save video
    await context.close();

    // List the video file
    const files = fs.readdirSync(videoDir);
    console.log('Video saved to:', videoDir);
    console.log('Files:', files);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
