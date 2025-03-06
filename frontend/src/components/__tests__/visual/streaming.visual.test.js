import { render } from '@testing-library/react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';
import { StreamingFilter, StreamingAvailability } from '../../';

expect.extend({ toMatchImageSnapshot });

describe('Streaming Components Visual Regression', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterEach(async () => {
    await page.close();
  });

  describe('StreamingFilter', () => {
    const viewports = [
      { width: 1280, height: 720, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 812, name: 'mobile' }
    ];

    test.each(viewports)('renders correctly on $name', async ({ width, height, name }) => {
      await page.setViewport({ width, height });
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--default');
      
      // Wait for component to be fully rendered
      await page.waitForSelector('[data-testid="streaming-filter"]');
      
      // Take screenshot
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: `streaming-filter-${name}`
      });
    });

    test('shows selected services correctly', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--with-selected-services');
      await page.waitForSelector('[data-testid="streaming-filter"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-filter-selected'
      });
    });

    test('displays loading state', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--loading');
      await page.waitForSelector('[data-testid="loading-spinner"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-filter-loading'
      });
    });

    test('shows error state', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--error');
      await page.waitForSelector('[data-testid="error-message"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-filter-error'
      });
    });
  });

  describe('StreamingAvailability', () => {
    test('renders all streaming options correctly', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--default');
      await page.waitForSelector('[data-testid="streaming-availability"]');
      
      // Wait for prices to load
      await page.waitForSelector('[data-testid="price-tag"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-all'
      });
    });

    test('shows correct currency for different regions', async () => {
      // US View
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--default');
      await page.waitForSelector('[data-testid="price-tag"]');
      
      const usImage = await page.screenshot();
      expect(usImage).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-us'
      });

      // UK View
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--ukregion');
      await page.waitForSelector('[data-testid="price-tag"]');
      
      const ukImage = await page.screenshot();
      expect(ukImage).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-uk'
      });
    });

    test('displays leaving soon indicator', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--default');
      await page.waitForSelector('[data-testid="leaving-soon"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-leaving-soon'
      });
    });

    test('shows best viewing option', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--default');
      await page.waitForSelector('[data-testid="best-option"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-best-option'
      });
    });
  });

  describe('Dark Mode', () => {
    beforeEach(async () => {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' }
      ]);
    });

    test('StreamingFilter renders correctly in dark mode', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--default');
      await page.waitForSelector('[data-testid="streaming-filter"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-filter-dark'
      });
    });

    test('StreamingAvailability renders correctly in dark mode', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--dark-theme');
      await page.waitForSelector('[data-testid="streaming-availability"]');
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-dark'
      });
    });
  });

  describe('Animation States', () => {
    test('StreamingFilter hover states', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingfilter--default');
      await page.waitForSelector('[data-testid="streaming-filter"]');

      // Hover over service button
      await page.hover('[data-testid="service-netflix"]');
      await page.waitForTimeout(500); // Wait for hover animation
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-filter-hover'
      });
    });

    test('StreamingAvailability price transitions', async () => {
      await page.goto('http://localhost:6006/iframe.html?id=components-streamingavailability--default');
      await page.waitForSelector('[data-testid="streaming-availability"]');

      // Change region to trigger price update animation
      await page.select('[data-testid="region-selector"]', 'GB');
      await page.waitForTimeout(500); // Wait for transition
      
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'streaming-availability-price-transition'
      });
    });
  });
});
