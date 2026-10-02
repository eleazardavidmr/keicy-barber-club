import { useLayoutEffect } from 'react';

// While a modal surface is up: freeze page scroll, make the page inert so focus and
// screen readers stay inside the modal, and hand focus back where it came from on close
// (or to `getReturnTarget()` when the modal knows a better place, e.g. the photo you ended on).
export function useModalLock(active, getReturnTarget) {
  useLayoutEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const page = document.getElementById('page');
    const returnFocus = document.activeElement;
    const prevOverflow = html.style.overflow;

    html.style.overflow = 'hidden';
    page?.setAttribute('inert', '');

    return () => {
      html.style.overflow = prevOverflow;
      page?.removeAttribute('inert');
      const target = getReturnTarget?.() ?? returnFocus;
      if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
}
