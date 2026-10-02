import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import Icon from './ui/Icon';
import { services, formatPrice, formatMinutes } from '../data/services';
import { site, barbers, whatsappUrl } from '../data/site';
import { spring, project, rubberband, clamp, createVelocityTracker, DRAG_THRESHOLD } from '../lib/physics';
import { useModalLock } from '../lib/useModalLock';

const crossFade = { duration: 0.22, ease: 'easeOut' };
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function upcomingDays(count = 7) {
  const short = new Intl.DateTimeFormat('es-CO', { weekday: 'short' });
  const long = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  const today = new Date();
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    if (!site.hours[d.getDay()]) continue;
    days.push({
      key: d.toDateString(),
      label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : capitalize(short.format(d).replace('.', '')),
      date: d.getDate(),
      long: long.format(d),
    });
  }
  return days;
}

const priceLabel = (s) => (s.priceNote ? `${s.priceNote} ${formatPrice(s.price)}` : formatPrice(s.price));

function buildMessage({ service, barber, day }) {
  const lines = ['Hola, Keicy Barber Club 👋', 'Quiero reservar una cita.'];
  if (service) lines.push(`• Servicio: ${service.name} (${priceLabel(service)})`);
  if (barber) lines.push(`• Barbero: ${barber}`);
  if (day) lines.push(`• Día: ${day.long}`);
  lines.push('¿Qué horarios tienen disponibles?');
  return lines.join('\n');
}

export default function BookingSheet({ open, serviceId, onClose }) {
  const reduce = useReducedMotion();

  // Stay mounted through the exit so the sheet can leave the way it came in.
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);
  useModalLock(mounted);

  const sheetRef = useRef(null);
  const bodyRef = useRef(null);
  const travel = useRef(1); // distance from rest to fully off-screen
  const entered = useRef(false);
  const exitVelocity = useRef(0);

  const y = useMotionValue(0);
  const opacity = useMotionValue(1);
  // The scrim dims in step with how far the sheet is up — dragging it down lifts the dim with your finger.
  const scrim = useTransform(() => opacity.get() * (1 - clamp(y.get() / travel.current)));

  const [selected, setSelected] = useState(serviceId);
  const [barber, setBarber] = useState(null);
  const [dayKey, setDayKey] = useState(null);
  const days = useMemo(() => (open ? upcomingDays() : []), [open]);

  useEffect(() => {
    if (!open) return;
    setSelected(serviceId ?? null);
    setBarber(null);
    setDayKey(null);
  }, [open, serviceId]);

  // Enter / exit. Each run animates from wherever the sheet is right now, so a close
  // that is interrupted by a re-open simply turns around.
  useLayoutEffect(() => {
    if (!mounted) return;
    travel.current = sheetRef.current.offsetHeight + 32;
    let cancelled = false;
    let anim;

    if (open) {
      if (!entered.current) {
        entered.current = true;
        if (reduce) {
          y.set(0);
          opacity.set(0);
        } else {
          opacity.set(1);
          y.set(travel.current);
        }
        sheetRef.current.focus({ preventScroll: true });
        if (serviceId) {
          bodyRef.current
            ?.querySelector(`[data-service="${serviceId}"]`)
            ?.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
      anim = reduce ? animate(opacity, 1, crossFade) : animate(y, 0, spring.smooth);
    } else {
      const velocity = exitVelocity.current;
      exitVelocity.current = 0;
      anim = reduce
        ? animate(opacity, 0, crossFade)
        : animate(y, travel.current, { ...spring.smooth, velocity });
      anim.finished.then(() => {
        if (cancelled) return;
        entered.current = false;
        setMounted(false);
      });
    }

    return () => {
      cancelled = true;
      anim.stop();
    };
  }, [open, mounted, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // ── Drag to dismiss ────────────────────────────────────────────────────
  const [tracker] = useState(createVelocityTracker);
  const gesture = useRef(null);

  const onPointerDown = (e) => {
    if (!open || e.button !== 0 || e.target.closest('button, a')) return;
    y.stop(); // catch it mid-flight
    gesture.current = { id: e.pointerId, startY: e.clientY, originY: y.get(), active: false };
    // Safe to capture right away: presses on the close button never start a gesture.
    e.currentTarget.setPointerCapture(e.pointerId);
    tracker.reset();
    tracker.add(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    tracker.add(e.clientX, e.clientY);
    const dy = e.clientY - g.startY;
    if (!g.active) {
      if (Math.abs(dy) < DRAG_THRESHOLD) return;
      g.active = true;
      travel.current = sheetRef.current.offsetHeight + 32;
    }
    const next = g.originY + dy;
    // Pulling up past the resting point resists instead of hard-stopping.
    y.set(next < 0 ? -rubberband(-next, travel.current) : next);
  };

  const onPointerUp = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    gesture.current = null;

    if (!g.active) {
      if (Math.abs(y.get()) > 0.5) animate(y, 0, spring.smooth); // a tap that caught it mid-flight
      return;
    }
    tracker.add(e.clientX, e.clientY);
    const velocity = e.type === 'pointercancel' ? 0 : tracker.get().y;
    // Decide with the projected resting point, not where the finger let go.
    if (y.get() + project(velocity) > travel.current * 0.45) {
      exitVelocity.current = velocity;
      onClose();
    } else {
      animate(y, 0, { ...spring.momentum, velocity });
    }
  };

  if (!mounted) return null;

  const service = services.find((s) => s.id === selected);
  const day = days.find((d) => d.key === dayKey);
  const message = buildMessage({ service, barber, day });

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <motion.div className="absolute inset-0 bg-black/70" style={{ opacity: scrim }} onClick={onClose} />

      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        style={{ y, opacity }}
        className="concrete absolute inset-x-0 bottom-0 mx-auto flex max-h-[92svh] w-full flex-col rounded-t-[2rem] bg-zinc-900 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.07] outline-none will-change-transform max-md:after:absolute max-md:after:inset-x-0 max-md:after:top-full max-md:after:h-[40vh] max-md:after:bg-zinc-900 md:bottom-6 md:max-h-[min(88svh,52rem)] md:max-w-[34rem] md:rounded-[2rem]"
      >
        {/* Grab zone */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="shrink-0 cursor-grab touch-none px-6 pt-2.5 pb-3 select-none active:cursor-grabbing"
        >
          <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" aria-hidden="true" />
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-led">Keicy Barber Club</p>
              <h2 id="booking-title" className="mt-2.5 text-[1.75rem] leading-tight font-semibold tracking-[-0.022em] text-white">
                Reserva tu cita
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="press grid size-9 shrink-0 place-items-center rounded-full bg-white/8 text-zinc-300 transition-colors hover:bg-white/14 hover:text-white"
            >
              <Icon name="close" className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Options */}
        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-6 pt-2 pb-8 [scrollbar-color:rgb(255_255_255/0.14)_transparent] [scrollbar-width:thin] [mask-image:linear-gradient(to_bottom,transparent,#000_12px,#000_calc(100%-28px),transparent)]"
        >
          <fieldset>
            <legend className="text-[0.8125rem] font-semibold tracking-[0.01em] text-zinc-400">Servicio</legend>
            <div className="mt-3 space-y-2">
              {services.map((s) => {
                const active = s.id === selected;
                return (
                  <label
                    key={s.id}
                    data-service={s.id}
                    className={`press flex cursor-pointer items-center gap-4 rounded-2xl p-3 pr-4 ring-1 transition-[background-color,box-shadow] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber-400 ${
                      active ? 'bg-amber-400/[0.09] ring-amber-400/45' : 'bg-white/[0.03] ring-white/[0.06] hover:bg-white/[0.06]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={active}
                      onChange={() => setSelected(s.id)}
                      className="sr-only"
                    />
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                        active ? 'bg-amber-400/15 text-amber-300' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <Icon name={s.icon} className="size-[1.375rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-white">{s.name}</span>
                      <span className="block text-sm tracking-[-0.006em] text-zinc-400">
                        {[formatMinutes(s.minutes), priceLabel(s)].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                        active ? 'bg-amber-400 text-black' : 'ring-[1.5px] ring-white/20 ring-inset'
                      }`}
                    >
                      {active && <Icon name="check" className="size-3.5" strokeWidth={2.5} />}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-[0.8125rem] font-semibold tracking-[0.01em] text-zinc-400">
              Barbero <span className="font-normal text-zinc-500">· opcional</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {[null, ...barbers].map((b) => (
                <Chip key={b ?? 'any'} active={barber === b} onClick={() => setBarber(b)}>
                  {b ?? 'Sin preferencia'}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-[0.8125rem] font-semibold tracking-[0.01em] text-zinc-400">
              Día <span className="font-normal text-zinc-500">· opcional</span>
            </legend>
            <div className="no-scrollbar fade-x -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-1">
              {days.map((d) => {
                const active = d.key === dayKey;
                return (
                  <button
                    key={d.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDayKey(active ? null : d.key)}
                    className={`press flex h-16 w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-2xl ring-1 transition-colors duration-200 ${
                      active ? 'bg-amber-400 text-black ring-amber-400' : 'bg-white/[0.03] text-zinc-200 ring-white/[0.06] hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className={`text-xs font-medium ${active ? 'text-black/70' : 'text-zinc-400'}`}>{d.label}</span>
                    <span className="text-lg leading-tight font-semibold tabular-nums">{d.date}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Actions */}
        <div className="shrink-0 px-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-baseline justify-between gap-4 text-sm" aria-live="polite">
            <span className="truncate text-zinc-400">{service ? service.name : 'Elige un servicio o continúa sin elegir'}</span>
            {service && <span className="shrink-0 font-semibold text-white tabular-nums">{priceLabel(service)}</span>}
          </div>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex h-13 items-center justify-center gap-2 rounded-full bg-amber-400 sm:flex-1 font-semibold text-black shadow-[0_10px_36px_-10px_rgba(245,158,11,0.8)] transition-colors hover:bg-amber-300"
            >
              Reservar en línea
              <Icon name="arrowUpRight" className="size-4.5" strokeWidth={2} />
            </a>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="press glass-chip flex h-13 items-center justify-center gap-2 rounded-full px-6 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="chat" className="size-5" />
              WhatsApp
            </a>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed tracking-normal text-zinc-500">
            En línea eliges barbero y hora con disponibilidad real. Por WhatsApp enviamos tu selección.
          </p>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

function Chip({ active, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`press h-10 rounded-full px-4 text-[0.9375rem] font-medium ring-1 transition-colors duration-200 ${
        active ? 'bg-white text-black ring-white' : 'bg-white/[0.03] text-zinc-200 ring-white/[0.08] hover:bg-white/[0.07]'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
