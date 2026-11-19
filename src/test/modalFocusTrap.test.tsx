import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, within, waitFor } from '@testing-library/react';
import App from '../App';
import { AboutModal } from '../components/AboutModal';

describe('Modal accessibility and focus trap behavior', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      return window.setTimeout(() => cb(performance.now()), 0);
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
      window.clearTimeout(id);
    });
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 120,
      height: 32,
      top: 0,
      left: 0,
      bottom: 32,
      right: 120,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = '';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  it('moves focus into opened modal, traps Tab and Shift+Tab, closes on Escape, and restores trigger focus', async () => {
    const onClose = vi.fn();
    const trigger = document.createElement('button');
    trigger.textContent = 'Open About';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { rerender } = render(
      <AboutModal isOpen={true} lang="en" onClose={onClose} onScrollToContact={vi.fn()} />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const modalContainer = dialog.firstElementChild as HTMLElement;
    const buttons = within(modalContainer).getAllByRole('button');
    const firstBtn = buttons[0];
    const lastBtn = buttons[buttons.length - 1];

    // Initial focus moved inside the modal
    await waitFor(() => {
      expect(document.activeElement).toBe(firstBtn);
    });

    // Tab from last focusable element wraps to first
    lastBtn.focus();
    expect(document.activeElement).toBe(lastBtn);
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(firstBtn);

    // Shift+Tab from first focusable element wraps to last
    firstBtn.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastBtn);

    // Escape invokes onClose
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    // Closing restores focus back to original trigger
    rerender(
      <AboutModal isOpen={false} lang="en" onClose={onClose} onScrollToContact={vi.fn()} />
    );
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
    trigger.remove();
  });

  it('locks background scrolling while a modal is open and supports RTL Persian mode', async () => {
    render(<App />);

    // Switch to Persian RTL mode
    const langToggle = screen.getAllByRole('button', { name: /Switch language/i })[0];
    fireEvent.click(langToggle);
    expect(document.documentElement.lang).toBe('fa');
    expect(document.documentElement.dir).toBe('rtl');

    // Open CV Modal via header button
    const cvTrigger = screen.getAllByRole('button', { name: /دریافت رزومه/i })[0];
    cvTrigger.focus();
    fireEvent.click(cvTrigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    // Tab navigation inside RTL modal
    const modalContainer = dialog.firstElementChild as HTMLElement;
    const modalButtons = within(modalContainer).getAllByRole('button');
    const firstModalBtn = modalButtons[0];
    const lastModalBtn = modalButtons[modalButtons.length - 1];

    await waitFor(() => {
      expect(document.activeElement).toBe(firstModalBtn);
    });
    lastModalBtn.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(firstModalBtn);

    const closeBtn = screen.getAllByRole('button', { name: 'بستن' })[0];
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    await waitFor(() => {
      expect(document.activeElement).toBe(cvTrigger);
    });
  });
});
