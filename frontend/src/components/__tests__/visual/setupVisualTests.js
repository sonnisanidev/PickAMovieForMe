import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const customConfig = {
  // Threshold for pixel difference
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  // Allow for small anti-aliasing differences
  blur: 2,
  // Update snapshots automatically in CI when changes are intentional
  updateSnapshot: process.env.CI && process.env.UPDATE_SNAPSHOTS === 'true'
};

const beforeScreenshot = (page) => {
  // Wait for all images to load
  return page.evaluate(async () => {
    const selectors = [
      // Wait for streaming service logos
      'img[alt*="logo"]',
      // Wait for movie posters
      'img[alt*="poster"]',
      // Wait for loading states to resolve
      '[data-testid="loading-spinner"]',
      // Wait for price updates
      '[data-testid*="price"]'
    ];

    await Promise.all(
      selectors.map(selector =>
        Promise.race([
          document.querySelector(selector)?.complete,
          new Promise(resolve => setTimeout(resolve, 2000))
        ])
      )
    );
  });
};

// Configure image snapshot matching
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customConfig,
  customSnapshotsDir: '__image_snapshots__'
});

expect.extend({ toMatchImageSnapshot });

// Initialize Storyshots with Puppeteer
initStoryshots({
  suite: 'Visual Regression Tests',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006',
    beforeScreenshot,
    getMatchOptions: () => ({
      customConfig,
      blur: 2,
      failureThreshold: 0.01,
      failureThresholdType: 'percent'
    })
  })
});
