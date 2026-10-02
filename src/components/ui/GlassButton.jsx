import { useRef } from 'react';

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-14 px-7 text-[1.0625rem]',
};

// Frosted glass with a warm LED rim; a soft light follows the pointer across the surface.
export default function GlassButton({ children, size = 'lg', className = '', as: Comp = 'button', ...props }) {
  const ref = useRef(null);

  const trackLight = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Comp
      ref={ref}
      onPointerMove={trackLight}
      className={`btn-glass inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[-0.01em] text-white select-none ${sizes[size]} ${className}`}
      {...(Comp === 'button' ? { type: 'button' } : null)}
      {...props}
    >
      <span className="btn-glass__spot" aria-hidden="true" />
      {children}
    </Comp>
  );
}
