import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServicesBentoGrid } from './ServicesBentoGrid';

const SERVICES = [
  ['AI Automation & Workflow Optimization', '/services/ai-automations'],
  ['Website Development', '/services/web-development'],
  ['UI/UX Design', '/services/uiux-design'],
  ['Web & Mobile Apps / CRM Systems', '/services/web-mobile-app-development'],
  ['Digital Marketing / SEO & GEO', '/services/digital-marketing'],
] as const;

describe('ServicesBentoGrid', () => {
  it('renders the two-line section heading', () => {
    render(<ServicesBentoGrid />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.map((h) => h.textContent)).toEqual([
      "We don't build pages.",
      'We build systems.',
    ]);
  });

  it('renders all five service cards in order', () => {
    render(<ServicesBentoGrid />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(SERVICES.map(([title]) => title));
  });

  it.each(SERVICES)('"%s" card links to %s', (title, href) => {
    render(<ServicesBentoGrid />);
    const card = screen.getByRole('heading', { level: 3, name: title }).closest('article')!;
    expect(card.querySelector(`a[href="${href}"]`)).toBeInTheDocument();
  });

  it('gives each card image alt text equal to its title', () => {
    render(<ServicesBentoGrid />);
    for (const [title] of SERVICES) {
      expect(screen.getByRole('img', { name: title })).toBeInTheDocument();
    }
  });
});
