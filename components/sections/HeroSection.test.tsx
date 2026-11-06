import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

vi.mock('@/components/ui/UpworkBadge', () => ({
  UpworkBadge: () => <div data-testid="upwork-badge" />,
}));

describe('HeroSection', () => {
  it('exposes the full headline to assistive tech on a single h1', () => {
    render(<HeroSection />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveAttribute('aria-label', "We don't just execute. We think first.");
  });

  it('splits the headline into one masked span per word', () => {
    const { container } = render(<HeroSection />);
    const words = [...container.querySelectorAll('.word-inner')].map((w) => w.textContent);
    expect(words).toEqual(['We', "don't", 'just', 'execute.', 'We', 'think', 'first.']);
  });

  it('accents only the word "think"', () => {
    const { container } = render(<HeroSection />);
    const accented = [...container.querySelectorAll<HTMLElement>('.word-inner')].filter(
      (w) => w.style.color,
    );
    expect(accented).toHaveLength(1);
    expect(accented[0]).toHaveTextContent('think');
  });

  it('links the primary CTA to /contact and the secondary to /work', () => {
    render(<HeroSection />);
    expect(screen.getByRole('link', { name: /Talk to Us/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'See our work' })).toHaveAttribute('href', '/work');
  });

  it('is the #main-content skip-link target and renders the Upwork badge', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('section#main-content')).toHaveAttribute(
      'aria-label',
      'Hero Website Vikreta',
    );
    expect(screen.getByTestId('upwork-badge')).toBeInTheDocument();
  });
});
