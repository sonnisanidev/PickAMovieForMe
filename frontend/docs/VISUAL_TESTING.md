# Visual Regression Testing Guide

## Overview
This guide covers our visual regression testing setup for the streaming and theme components using Storybook, Jest, and Puppeteer.

## Setup

### Dependencies
```json
{
  "@storybook/addon-storyshots": "^7.0.0",
  "@storybook/addon-storyshots-puppeteer": "^7.0.0",
  "jest-image-snapshot": "^6.0.0",
  "puppeteer": "^19.0.0"
}
```

### Configuration
- Location: `src/components/__tests__/visual/setupVisualTests.js`
- Snapshot directory: `__image_snapshots__`
- Threshold: 1% pixel difference
- Anti-aliasing handling: 2px blur

## Running Tests

### Local Development
```bash
# Start Storybook
npm run storybook

# Run visual tests
npm run test:visual

# Update snapshots
npm run test:visual -- -u
```

### CI/CD
```bash
# Start Storybook in CI
npm run storybook:ci

# Run visual tests
npm run test:visual:ci
```

## Test Coverage

### ThemeToggle Component
- Theme switching animation
- Icon transitions
- Button hover and focus states
- Shadow effects
- Position across different viewports
- System theme preference detection
- Dark/Light mode states
- Accessibility indicators
- Loading and transition states

### StreamingFilter Component
- Viewport responsiveness (desktop, tablet, mobile)
- Selected services state
- Loading state
- Error state
- Dark mode
- Hover animations
- Filter combinations

### StreamingAvailability Component
- All streaming options
- Regional pricing (US/UK)
- "Leaving soon" indicator
- Best viewing option
- Dark mode
- Price transitions
- Loading states

## Best Practices

### 1. Snapshot Management
- Keep baseline snapshots in version control
- Review visual changes in PR discussions
- Update snapshots only for intentional changes

### 2. Viewport Testing
- Test across multiple device sizes
- Include both portrait and landscape
- Consider different pixel densities

### 3. Component States
- Test all interactive states
- Include loading/error states
- Test with different data combinations

### 4. Theme Testing
- Test in both light and dark modes
- Verify color contrast
- Check accessibility indicators

### 5. Animation Testing
- Capture key animation frames
- Test hover states
- Verify transitions

## Troubleshooting

### Common Issues

1. Flaky Tests
```javascript
// Increase wait time for animations
await page.waitForTimeout(1000);

// Wait for specific elements
await page.waitForSelector('[data-testid="price-tag"]');
```

2. Different Operating Systems
```javascript
// Use relative thresholds
failureThresholdType: 'percent'
```

3. Font Rendering
```javascript
// Add font loading wait
await page.evaluate(() => document.fonts.ready);
```

### CI Pipeline Integration

```yaml
# Example GitHub Actions workflow
jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Start Storybook
        run: npm run storybook:ci &
      - name: Run visual tests
        run: npm run test:visual:ci
      - name: Upload diff artifacts
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: image-snapshots
          path: src/components/__tests__/visual/__image_snapshots__/__diff_output__
```

## Maintenance

### Regular Tasks
1. Review and update baseline snapshots quarterly
2. Clean up unused snapshots
3. Verify threshold values
4. Update dependencies

### Performance Optimization
1. Use component-specific selectors
2. Minimize test durations
3. Parallelize test execution
4. Implement smart caching

## Future Improvements

1. Integration with visual testing services
2. Automated accessibility checks
3. Cross-browser testing
4. Performance metrics collection
5. Component-specific threshold adjustments
