import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CLIENT_LOGO_MARQUEE_ITEMS, ClientLogosSection } from './ClientLogosSection';

describe('ClientLogosSection', () => {
  it('renders the heading', () => {
    render(<ClientLogosSection />);
    expect(screen.getByRole('heading', { level: 2, name: "Who we've built for" })).toBeInTheDocument();
  });

  it('duplicates the logo set so the marquee loops seamlessly', () => {
    render(<ClientLogosSection />);
    expect(screen.getAllByRole('img')).toHaveLength(CLIENT_LOGO_MARQUEE_ITEMS.length * 2);
  });

  it('gives every logo alt text and a unique src in the source list', () => {
    const srcs = CLIENT_LOGO_MARQUEE_ITEMS.map((c) => c.src);
    expect(new Set(srcs).size).toBe(srcs.length);
    expect(CLIENT_LOGO_MARQUEE_ITEMS.every((c) => c.alt.trim().length > 0)).toBe(true);
  });

  it('labels the marquee region', () => {
    render(<ClientLogosSection />);
    expect(screen.getByLabelText('Client logos')).toBeInTheDocument();
  });
});
