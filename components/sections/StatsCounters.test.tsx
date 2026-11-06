import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCounters } from './StatsCounters';

describe('StatsCounters', () => {
  it('renders the section heading', () => {
    render(<StatsCounters />);
    expect(screen.getByRole('heading', { level: 2, name: 'The Numbers So Far' })).toBeInTheDocument();
  });

  it('renders four stats, each as a labelled region', () => {
    render(<StatsCounters />);
    // 1 section landmark + 4 stat regions
    expect(screen.getAllByRole('region')).toHaveLength(5);
  });

  it('keeps real values in the DOM for crawlers (no 0-start flash)', () => {
    render(<StatsCounters />);
    expect(screen.getByRole('region', { name: /Years working.*: 5\+/ })).toHaveTextContent('5+');
    expect(screen.getByRole('region', { name: /Projects shipped.*: 68\+/ })).toHaveTextContent('68+');
    expect(screen.getByRole('region', { name: /Saved for clients.*: 6360\+hrs/ })).toHaveTextContent('6360+hrs');
  });

  it('announces the infinity stat as unlimited', () => {
    render(<StatsCounters />);
    expect(screen.getByRole('region', { name: /Tools we can use.*: unlimited/ })).toBeInTheDocument();
  });

  it('applies a custom background class', () => {
    render(<StatsCounters bgClassName="bg-black" />);
    expect(screen.getByRole('region', { name: 'Impact Statistics' })).toHaveClass('bg-black');
  });
});
