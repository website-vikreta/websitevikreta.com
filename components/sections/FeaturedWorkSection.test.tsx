import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedWorkSection } from './FeaturedWorkSection';
import { CASE_STUDY_GRID, FEATURED_CASE_STUDY } from '@/lib/work-data';

describe('FeaturedWorkSection', () => {
  it('uses the default heading and landmark label', () => {
    render(<FeaturedWorkSection />);
    expect(screen.getByRole('region', { name: 'Featured Work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Proof over promises.' })).toBeInTheDocument();
  });

  it('accepts a custom heading, id and aria-label (used by /work)', () => {
    render(<FeaturedWorkSection id="work" heading="Our work" ariaLabel="All work" />);
    expect(screen.getByRole('region', { name: 'All work' })).toHaveAttribute('id', 'work');
    expect(screen.getByRole('heading', { name: 'Our work' })).toBeInTheDocument();
  });

  it('links the featured study and every grid study to its case-study page', () => {
    const { container } = render(<FeaturedWorkSection />);
    for (const study of [FEATURED_CASE_STUDY, ...CASE_STUDY_GRID]) {
      expect(container.querySelector(`a[href="/work/${study.slug}"]`)).toBeInTheDocument();
    }
  });
});
