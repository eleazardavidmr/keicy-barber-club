import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useBooking } from '../context/booking';
import { spring } from '../lib/physics';
import Wordmark from './ui/Wordmark';
import GlassButton from './ui/GlassButton';

const links = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'espacio', label: 'Espacio' },
  { id: 'visitanos', label: 'Visítanos' },
];

// Wayfinding: which section is crossing the middle of the viewport.
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((s) => observer.observe(s));
    const top = document.getElementById('inicio');
    const topObserver = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), {
      rootMargin: '-45% 0px -50% 0px',
    });
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [ids]);
  return active;
}

const ids = links.map((l) => l.id);

export default function Navbar() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* The material arrives (blur + tint together) once content starts scrolling underneath */}
      <div
        aria-hidden="true"
        className={`glass absolute inset-0 transition-opacity duration-500 ease-out-quint ${solid ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Scroll edge effect instead of a hard divider */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-full h-8 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-500 ${
          scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <nav aria-label="Principal" className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="press -ml-1 rounded-lg px-1 py-1" aria-label="Keicy Barber Club, inicio" onClick={() => setMenuOpen(false)}>
          <Wordmark />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id} className="relative">
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]"
                  transition={spring.smooth}
                />
              )}
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'location' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm font-medium tracking-[-0.006em] transition-colors duration-200 ${
                  active === link.id ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <GlassButton size="sm" onClick={() => openBooking()}>
            Reservar
          </GlassButton>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="press relative -mr-2 grid size-11 place-items-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-white"
                animate={menuOpen ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={spring.snappy}
              />
              <motion.span
                className="absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-white"
                animate={menuOpen ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={spring.snappy}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu-scrim"
              className="fixed inset-0 top-14 -z-10 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Grows out of the menu button and goes back into it */}
            <motion.div
              key="menu"
              id="mobile-menu"
              className="glass relative origin-top-right overflow-hidden border-b border-white/[0.06] md:hidden"
              initial={{ opacity: 0, scale: 0.96, y: -8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, y: -8, filter: 'blur(10px)' }}
              transition={spring.smooth}
            >
              <ul className="px-6 pt-4 pb-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring.smooth, delay: 0.03 * i + 0.04 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="press flex items-center justify-between py-3.5 text-[1.75rem] font-semibold tracking-[-0.024em] text-white"
                    >
                      {link.label}
                      <span className={`size-1.5 rounded-full ${active === link.id ? 'bg-amber-400' : 'bg-transparent'}`} />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="px-6 pt-2 pb-6">
                <GlassButton
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                >
                  Reserva tu cita
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
