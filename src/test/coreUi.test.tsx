import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { ContactSection } from '../components/ContactSection';
import { CinematicHeroCharacter } from '../components/CinematicHeroCharacter';
import { useScrollProgress } from '../hooks/useScrollProgress';

function ScrollProgressHarness() {
  const { progress, activeSection } = useScrollProgress();
  return (
    <div>
      <span data-testid="progress-val">{Math.round(progress)}</span>
      <span data-testid="section-val">{activeSection}</span>
    </div>
  );
}

describe('Core UI, accessibility, scroll progress, and contact form behavior', () => {
  beforeEach(() => {
    document.documentElement.className = 'dark';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('switches language (EN/FA + LTR/RTL) and theme (dark/light)', () => {
    render(<App />);

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Toggle Language
    const langBtn = screen.getAllByRole('button', { name: /Switch language/i })[0];
    fireEvent.click(langBtn);
    expect(document.documentElement.lang).toBe('fa');
    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getByText('زینب صوفی')).toBeInTheDocument();

    // Toggle Theme
    const themeBtn = screen.getAllByRole('button', { name: /تغییر تم|Switch Theme/i })[0];
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders ScrollProgressBar with progressbar semantics separate from active-section button', () => {
    const heroEl = document.createElement('section');
    heroEl.id = 'projects';
    const scrollSpy = vi.fn();
    heroEl.scrollIntoView = scrollSpy;
    document.body.appendChild(heroEl);

    render(<ScrollProgressBar lang="en" progress={42.4} activeSection="projects" />);

    const progressbar = screen.getByRole('progressbar');
    const sectionBtn = screen.getByRole('button', { name: /Active section: Projects/i });

    expect(progressbar).toHaveAttribute('aria-valuenow', '42');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).not.toContainElement(sectionBtn);

    fireEvent.click(sectionBtn);
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

    heroEl.remove();
  });

  it('calculates scroll progress percentage and active section from viewport scroll position', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });

    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true });

    const skillsEl = document.createElement('section');
    skillsEl.id = 'skills';
    Object.defineProperty(skillsEl, 'offsetTop', { value: 600, configurable: true });
    document.body.appendChild(skillsEl);

    render(<ScrollProgressHarness />);

    expect(screen.getByTestId('progress-val')).toHaveTextContent('50');
    expect(screen.getByTestId('section-val')).toHaveTextContent('skills');

    act(() => {
      (window as unknown as { scrollY: number }).scrollY = 1000;
      fireEvent.scroll(window);
    });
    expect(screen.getByTestId('progress-val')).toHaveTextContent('100');

    skillsEl.remove();
  });

  it('validates ContactSection inputs, clarifies client-side mailto behavior, and encodes mailto URL', () => {
    const originalLocation = window.location;
    const assignMock = { href: '' };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: assignMock,
    });

    render(<ContactSection lang="en" />);

    // Notice clarifies no backend call is made
    expect(screen.getByText(/no message is sent to a backend server/i)).toBeInTheDocument();

    // Invalid empty submit shows validation alert
    fireEvent.click(screen.getByRole('button', { name: /Open in Email Client/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Invalid email format rejected
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Sara' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: /Open in Email Client/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Valid submit builds encoded mailto draft
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'sara@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Open in Email Client/i }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(assignMock.href).toContain('mailto:z.soofi.n@gmail.com');
    expect(assignMock.href).toContain('subject=Portfolio%20Inquiry%20from%20Sara');
    expect(assignMock.href).toContain('Hello%20there');

    // Payload preview clearly labeled as integration preview
    fireEvent.click(screen.getByRole('button', { name: /Preview API Payload/i }));
    expect(screen.getByText(/Sample API Integration Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/API Integration Preview — not called/i)).toBeInTheDocument();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('respects prefers-reduced-motion in CinematicHeroCharacter', () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_event: string, cb: EventListenerOrEventListenerObject) => {
        changeHandler = cb as (e: MediaQueryListEvent) => void;
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<CinematicHeroCharacter lang="en" />);
    const heroImg = screen.getByAltText('Zeinab Soufi - Backend Developer Illustration');
    expect(heroImg.className).toContain('scale-100');
    expect(heroImg).toHaveAttribute('src', '/assets/portfolio/hero_girl_clean.png');

    // Switching reduced motion off enables live animation classes
    act(() => {
      changeHandler?.({ matches: false } as MediaQueryListEvent);
    });
    expect(heroImg.className).toContain('scale-[1.01]');
  });
});
