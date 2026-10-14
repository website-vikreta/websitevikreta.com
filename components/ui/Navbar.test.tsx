import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

const SERVICE_HREFS = [
  '/services/ai-automations',
  '/services/web-development',
  '/services/web-mobile-app-development',
  '/services/uiux-design',
  '/services/digital-marketing',
];

describe('Navbar', () => {
  beforeEach(() => {
    setPath('/about');
    setScrollY(0);
  });

  it('exposes the main navigation landmark and a Contact CTA', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Contact Us' })[0]).toHaveAttribute('href', '/contact');
  });

  it('lists every service in the dropdown', () => {
    render(<Navbar />);
    const panel = document.querySelector('.dropdown-panel') as HTMLElement;
    const hrefs = within(panel)
      .getAllByRole('menuitem', { hidden: true })
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(SERVICE_HREFS);
  });

  it('marks the current section link as active', () => {
    setPath('/blog/some-post');
    render(<Navbar />);
    const blog = screen.getAllByRole('link', { name: 'Blog' })[0];
    expect(blog).toHaveClass('active');
  });

  it('toggles the services dropdown via keyboard and closes on Escape', async () => {
    render(<Navbar />);
    const trigger = within(screen.getByRole('banner')).getByRole('button', { name: /^Services/ });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens and closes the mobile drawer and locks body scroll', async () => {
    render(<Navbar />);
    const drawer = document.getElementById('mobile-drawer')!;
    expect(drawer).toHaveClass('translate-x-full');

    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(drawer).toHaveClass('translate-x-0');
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.click(within(drawer).getByRole('button', { name: 'Close navigation' }));
    expect(drawer).toHaveClass('translate-x-full');
    expect(document.body.style.overflow).toBe('');
  });

  it('expands the mobile services accordion', async () => {
    render(<Navbar />);
    const drawer = document.getElementById('mobile-drawer')!;
    const toggle = within(drawer).getByRole('button', { name: /^Services/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('compresses the bar after scrolling past 40px', () => {
    render(<Navbar />);
    const bar = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(bar).toHaveClass('h-20');

    act(() => {
      setScrollY(100);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(bar).toHaveClass('h-14');
  });

  it('hides the desktop links on the home page until the user scrolls', () => {
    setPath('/');
    render(<Navbar />);
    const list = screen.getAllByRole('list')[0];
    expect(list).toHaveClass('opacity-0');

    act(() => {
      setScrollY(100);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(list).toHaveClass('opacity-100');
  });
});

function setPath(path: string) {
  vi.mocked(usePathname).mockReturnValue(path);
}

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
}
