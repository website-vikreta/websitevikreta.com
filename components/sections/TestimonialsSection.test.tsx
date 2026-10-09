import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestimonialsSection } from './TestimonialsSection';

describe('TestimonialsSection', () => {
  it('shows the first testimonial initially', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('11 hrs')).toBeInTheDocument();
    expect(screen.getByText(/Saved per week/)).toBeInTheDocument();
  });

  it('renders one labelled switcher button per testimonial', () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByRole('button').map((b) => b.getAttribute('aria-label'))).toEqual([
      'View Darcy McGilvery, Simpli Home testimonial',
      'View Co-founder, AP Cleanco testimonial',
      'View Co-founder, Sustainable Bitcoin Protocol testimonial',
    ]);
  });

  it('switches testimonial when an avatar is clicked', async () => {
    render(<TestimonialsSection />);
    await userEvent.click(screen.getByRole('button', { name: /AP Cleanco/ }));
    // AnimatePresence mode="wait" swaps after the exit animation finishes.
    expect(await screen.findByText('3 weeks')).toBeInTheDocument();
    expect(screen.queryByText('11 hrs')).not.toBeInTheDocument();
  });
});
