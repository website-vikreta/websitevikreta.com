/**
 * Production Viewport Matrix for Website Vikreta UI Testing.
 * Mirrors the exact mobile-first specifications used across real devices.
 */
export interface ViewportDefinition {
  name: string;
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export const PRODUCTION_VIEWPORTS: ViewportDefinition[] = [
  { name: 'mobile-small (320px)', width: 320, height: 568, deviceType: 'mobile' },
  { name: 'mobile-standard (375px)', width: 375, height: 667, deviceType: 'mobile' },
  { name: 'mobile-modern (390px)', width: 390, height: 844, deviceType: 'mobile' },
  { name: 'mobile-large (430px)', width: 430, height: 932, deviceType: 'mobile' },
  { name: 'tablet-portrait (768px)', width: 768, height: 1024, deviceType: 'tablet' },
  { name: 'laptop-compact (1024px)', width: 1024, height: 768, deviceType: 'desktop' },
  { name: 'desktop-standard (1440px)', width: 1440, height: 900, deviceType: 'desktop' },
];
