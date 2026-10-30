import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechnologiesSection } from './TechnologiesSection';

describe('TechnologiesSection', () => {
  it('renders the heading', () => {
    render(<TechnologiesSection />);
    expect(screen.getByRole('heading', { level: 3, name: 'The AI stack we actually use.' })).toBeInTheDocument();
  });

  it('shows each tool logo twice for the seamless loop', () => {
    render(<TechnologiesSection />);
    expect(screen.getAllByRole('img', { name: 'OpenAI' })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'Claude AI' })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'n8n' })).toHaveLength(2);
  });

  it('gives every logo non-empty alt text', () => {
    render(<TechnologiesSection />);
    for (const img of screen.getAllByRole('img')) {
      expect(img.getAttribute('alt')).toBeTruthy();
    }
  });
});
