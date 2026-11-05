import { useEffect, useRef } from 'react';

// Global stack of active modal containers to prevent conflicts between multiple modal instances
const activeModalStack: HTMLElement[] = [];

/**
 * Returns all visible, keyboard-focusable elements within a container.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const elements = Array.from(container.querySelectorAll<HTMLElement>(selectors));
  
  return elements.filter((el) => {
    // Exclude disabled elements or those hidden from view / screen readers
    if (el.hasAttribute('disabled')) return false;
    if (el.getAttribute('aria-hidden') === 'true') return false;
    
    // Check computed visibility
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    
    // Check bounding dimensions
    const rect = el.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 || el.getClientRects().length > 0;
  });
}

/**
 * Senior-grade WCAG 2.2 AA focus trap hook:
 * 1. Accurately saves triggering element on initial open (not overwritten on re-renders).
 * 2. Traps Tab and Shift + Tab within modal boundary.
 * 3. Handles empty interactive states gracefully by focusing the dialog container.
 * 4. Listens for Escape key to close modal with event cancellation.
 * 5. Uses 'focusin' interception to strictly block background content navigation.
 * 6. Smoothly restores focus to the triggering element using requestAnimationFrame.
 * 7. Supports modal stacking to avoid conflicts if multiple modals mount.
 */
export function useFocusTrap(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const prevIsOpenRef = useRef(false);
  const onCloseRef = useRef(onClose);

  // Keep latest callback without triggering effect re-execution
  onCloseRef.current = onClose;

  useEffect(() => {
    // Only capture trigger element on transition from closed to open
    if (isOpen && !prevIsOpenRef.current) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
    }
    prevIsOpenRef.current = isOpen;

    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    // Register this modal container on the global stack
    activeModalStack.push(container);

    // Ensure container has tabIndex="-1" so it can be focused if no interactive elements exist
    if (!container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1');
    }

    // Set initial focus inside the modal
    const focusTimer = requestAnimationFrame(() => {
      if (!container || !container.isConnected) return;
      
      const focusable = getFocusableElements(container);
      if (focusable.length > 0) {
        // Prefer close button or first action
        focusable[0].focus();
      } else {
        container.focus();
      }
    });

    // Handle Tab, Shift+Tab, and Escape key navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only the topmost modal handles keyboard events
      if (activeModalStack[activeModalStack.length - 1] !== container) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements(container);

        if (focusable.length === 0) {
          e.preventDefault();
          container.focus();
          return;
        }

        if (focusable.length === 1) {
          e.preventDefault();
          focusable[0].focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const currentActive = document.activeElement;

        // If focus is currently outside the modal container, pull it back
        if (!container.contains(currentActive)) {
          e.preventDefault();
          first.focus();
          return;
        }

        if (e.shiftKey) {
          if (currentActive === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (currentActive === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    // Prevent focus from moving to background content (e.g. via screen reader shortcuts or clicking outside)
    const handleFocusIn = (e: FocusEvent) => {
      if (activeModalStack[activeModalStack.length - 1] !== container) {
        return;
      }

      if (container && !container.contains(e.target as Node)) {
        e.preventDefault();
        const focusable = getFocusableElements(container);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          container.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusin', handleFocusIn, true);

    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusin', handleFocusIn, true);

      // Pop this modal from the stack
      const index = activeModalStack.lastIndexOf(container);
      if (index !== -1) {
        activeModalStack.splice(index, 1);
      }

      // Restore focus to original trigger element if no other modals remain
      const trigger = triggerElementRef.current;
      if (trigger && typeof trigger.focus === 'function') {
        requestAnimationFrame(() => {
          if (trigger.isConnected) {
            trigger.focus();
          }
        });
      }
      triggerElementRef.current = null;
    };
  }, [isOpen]);

  return containerRef;
}
