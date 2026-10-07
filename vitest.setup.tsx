import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);

// jsdom gaps used by motion/react and the components under test.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', NoopObserver);
vi.stubGlobal('ResizeObserver', NoopObserver);
window.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;
if (!document.fonts) Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() } });

vi.mock('next/image', () => ({
  default: ({
    fill: _fill, // eslint-disable-line @typescript-eslint/no-unused-vars
    priority: _priority, // eslint-disable-line @typescript-eslint/no-unused-vars
    unoptimized: _unoptimized, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

// GSAP drives only visual reveals; stub it so components mount synchronously.
vi.mock('@/lib/gsap', () => {
  const chain: Record<string, unknown> = {};
  chain.to = () => chain;
  const gsap = {
    context: (fn?: () => void) => {
      fn?.();
      return { add: (cb: () => void) => cb(), revert: () => {} };
    },
    set: () => {},
    to: () => ({ kill: () => {}, timeScale: () => {} }),
    timeline: () => chain,
  };
  return { gsap, ScrollTrigger: {}, SplitText: {} };
});
vi.mock('@/lib/gsap/reveals', () => ({
  useGsapSection: () => {},
  revealLines: () => {},
  prefersReducedMotion: () => false,
}));
