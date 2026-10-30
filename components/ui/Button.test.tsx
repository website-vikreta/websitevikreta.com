import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders a link with the right href and accessible name', () => {
    render(<Button href="/contact">Contact Us</Button>);
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
  });

  it('renders a real <button> that fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Send
      </Button>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    render(
      <Button href="/x" variant="ghost" size="lg">
        Go
      </Button>,
    );
    expect(screen.getByRole('link')).toHaveClass('btn', 'btn-ghost');
  });

  it('opens external links in a new tab safely', () => {
    render(
      <Button href="https://example.com" external>
        Out
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('hides the decorative arrow from assistive tech', () => {
    const { container } = render(
      <Button href="/x" showArrow>
        Next
      </Button>,
    );
    expect(container.querySelector('.btn-icon')).toHaveAttribute('aria-hidden', 'true');
  });
});
