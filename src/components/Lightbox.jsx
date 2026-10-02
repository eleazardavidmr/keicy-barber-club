import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import Icon from './ui/Icon';
import { spring, project, rubberband, clamp, createVelocityTracker, DRAG_THRESHOLD } from '../lib/physics';
import { useModalLock } from '../lib/useModalLock';

const GAP = 24;
const FRAME_ASPECT = 0.87; // every photo in the set is ~0.86–0.88 wide/tall
const THUMB_RADIUS = 24;
const OPEN_RADIUS = 20;
const crossFade = { duration: 0.24, ease: 'easeOut' };

function fitRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const narrow = vw < 768;
  const side = narrow ? 12 : 112;
  const top = narrow ? 64 : 76;
  const bottom = narrow ? 100 : 108;
  const maxH = vh - top - bottom;
  let width = Math.min(vw - side * 2, 720);
  let height = width / FRAME_ASPECT;
  if (height > maxH) {
    height = maxH;
    width = height * FRAME_ASPECT;
  }
  return { left: (vw - width) / 2, top: top + (maxH - height) / 2, width, height };
}

/**
 * A photo viewer that behaves like Photos: the picture lifts out of its thumbnail and
 * flies back into it, swipes page with momentum, and can be flicked away mid-gesture.
 */
export default function Lightbox({ photos, startIndex, getThumb, onIndexChange, onClosed }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(startIndex);
  const indexRef = useRef(startIndex);
  useModalLock(true, () => getThumb(indexRef.current));
  const frameRef = useRef(null);
  const closeRef = useRef(null);
  const closing = useRef(false);
  const pending = useRef(0); // page turn in flight (−1, 0, +1)
  const pageToken = useRef(0);

  // Geometry of the current photo, plus the two gestures layered on top of it.
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const fw = useMotionValue(1);
  const fh = useMotionValue(1);
  const fr = useMotionValue(THUMB_RADIUS);
  const tx = useMotionValue(0); // paging
  const dx = useMotionValue(0); // dismiss drag
  const dy = useMotionValue(0);
  const presence = useMotionValue(0); // backdrop
  const chrome = useMotionValue(0); // controls and neighbouring photos
  const fade = useMotionValue(1); // current photo, for non-spatial exits

  const step = () => fw.get() + GAP;
  const dragDown = useTransform(() => clamp(dy.get() / (window.innerHeight * 0.5)));
  const backdrop = useTransform(() => presence.get() * (1 - dragDown.get() * 0.9));
  const controls = useTransform(() => chrome.get() * (1 - clamp(dragDown.get() * 2.5)));
  const scale = useTransform(() => 1 - clamp(dy.get() / window.innerHeight) * 0.45);
  const currentX = useTransform(() => tx.get() + dx.get());
  // Photos dim as they slide away from the centre, so a neighbour arrives at full strength.
  const dimAt = (offset) => 1 - 0.75 * clamp(Math.abs(offset) / step());
  const currentOpacity = useTransform(() => fade.get() * dimAt(tx.get()));
  const prevLeft = useTransform(() => fx.get() - step());
  const nextLeft = useTransform(() => fx.get() + step());
  const prevOpacity = useTransform(() => controls.get() * dimAt(tx.get() - step()));
  const nextOpacity = useTransform(() => controls.get() * dimAt(tx.get() + step()));

  const setGeometry = (r) => {
    fx.set(r.left);
    fy.set(r.top);
    fw.set(r.width);
    fh.set(r.height);
  };

  // ── Open: lift out of the thumbnail ───────────────────────────────────
  useLayoutEffect(() => {
    const target = fitRect();
    const from = getThumb(startIndex)?.getBoundingClientRect();
    closeRef.current?.focus({ preventScroll: true });

    if (reduce || !from) {
      setGeometry(target);
      fr.set(OPEN_RADIUS);
      fade.set(0);
      animate(fade, 1, crossFade);
      animate(presence, 1, crossFade);
      animate(chrome, 1, crossFade);
      return;
    }
    setGeometry(from);
    fr.set(THUMB_RADIUS);
    animate(fx, target.left, spring.smooth);
    animate(fy, target.top, spring.smooth);
    animate(fw, target.width, spring.smooth);
    animate(fh, target.height, spring.smooth);
    animate(fr, OPEN_RADIUS, spring.smooth);
    animate(presence, 1, { duration: 0.35, ease: 'easeOut' });
    animate(chrome, 1, { duration: 0.3, delay: 0.22, ease: 'easeOut' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (i) => {
    indexRef.current = i;
    setIndex(i);
    onIndexChange(i);
  };

  // Land a page turn that is still in flight, re-basing the offset so nothing moves on screen.
  const settle = () => {
    const k = pending.current;
    if (!k) return;
    pending.current = 0;
    tx.stop();
    const before = tx.get();
    flushSync(() => goTo(indexRef.current + k));
    tx.set(before + k * step());
  };

  const page = (k, velocity = 0) => {
    if (closing.current) return;
    settle();
    const target = indexRef.current + k;
    const transition = { ...(velocity ? spring.momentum : spring.smooth), velocity };
    if (k === 0 || target < 0 || target >= photos.length) {
      animate(tx, 0, transition);
      return;
    }
    pending.current = k;
    const token = ++pageToken.current;
    animate(tx, -k * step(), transition).finished.then(() => {
      if (pageToken.current === token) settle();
    });
  };

  // ── Close: fly back into the thumbnail, inheriting the gesture's velocity ──
  const close = (velocity = { x: 0, y: 0 }) => {
    if (closing.current) return;
    settle();
    closing.current = true;

    const thumb = getThumb(indexRef.current);
    thumb?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    const to = thumb?.getBoundingClientRect();

    // Start from what is on screen right now: fold the drag transforms into the geometry.
    // (Computed from the motion values, not the DOM, which may still be a frame behind.)
    const s = scale.get();
    const cx = fx.get() + fw.get() / 2 + currentX.get();
    const cy = fy.get() + fh.get() / 2 + dy.get();
    const now = { left: cx - (fw.get() * s) / 2, top: cy - (fh.get() * s) / 2, width: fw.get() * s, height: fh.get() * s };
    presence.set(backdrop.get());
    chrome.set(controls.get());
    [fx, fy, fw, fh, tx, dx, dy].forEach((v) => v.stop());
    fr.set(fr.get() * s);
    tx.set(0);
    dx.set(0);
    dy.set(0);
    setGeometry(now);

    animate(chrome, 0, { duration: 0.15 });
    const onScreen = to && to.bottom > 0 && to.top < window.innerHeight;
    if (reduce || !onScreen) {
      animate(presence, 0, crossFade);
      animate(fade, 0, crossFade).finished.then(onClosed);
      return;
    }
    Promise.all(
      [
        animate(fx, to.left, { ...spring.smooth, velocity: velocity.x }),
        animate(fy, to.top, { ...spring.smooth, velocity: velocity.y }),
        animate(fw, to.width, spring.smooth),
        animate(fh, to.height, spring.smooth),
        animate(fr, THUMB_RADIUS, spring.smooth),
        animate(presence, 0, { duration: 0.32, ease: 'easeOut' }),
      ].map((a) => a.finished),
    ).then(onClosed);
  };

  // Latest handlers for listeners registered once.
  const api = useRef(null);
  api.current = { close, page };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') api.current.close();
      else if (e.key === 'ArrowRight') api.current.page(1);
      else if (e.key === 'ArrowLeft') api.current.page(-1);
    };
    const onResize = () => {
      if (closing.current) return;
      api.current.page(0);
      setGeometry(fitRect());
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Gestures: one recognizer decides between paging (x) and dismissing (y) ──
  const [tracker] = useState(createVelocityTracker);
  const gesture = useRef(null);

  const onPointerDown = (e) => {
    if (closing.current || e.button !== 0) return;
    settle();
    [tx, dx, dy].forEach((v) => v.stop()); // grab whatever is moving, where it is
    gesture.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      tx0: tx.get(),
      dx0: dx.get(),
      dy0: dy.get(),
      axis: null,
      onPhoto: frameRef.current?.contains(e.target),
    };
    tracker.reset();
    tracker.add(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    tracker.add(e.clientX, e.clientY);
    const mx = e.clientX - g.x0;
    const my = e.clientY - g.y0;
    if (!g.axis) {
      if (Math.hypot(mx, my) < DRAG_THRESHOLD) return;
      g.axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (g.axis === 'x') {
      const i = indexRef.current;
      let next = g.tx0 + mx;
      const atEdge = (next > 0 && i === 0) || (next < 0 && i === photos.length - 1);
      if (atEdge) next = Math.sign(next) * rubberband(Math.abs(next), window.innerWidth);
      tx.set(next);
    } else {
      const next = g.dy0 + my;
      dy.set(next < 0 ? -rubberband(-next, window.innerHeight) : next);
      dx.set(g.dx0 + mx);
    }
  };

  const onPointerUp = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    gesture.current = null;

    if (!g.axis) {
      if (!g.onPhoto && e.type !== 'pointercancel') return close();
      page(0); // a tap that caught something mid-flight: let it finish settling
      animate(dx, 0, spring.smooth);
      animate(dy, 0, spring.smooth);
      return;
    }

    tracker.add(e.clientX, e.clientY);
    const v = e.type === 'pointercancel' ? { x: 0, y: 0 } : tracker.get();

    if (g.axis === 'x') {
      // Page to wherever the flick is headed, one photo at most.
      const projected = tx.get() + project(v.x);
      page(clamp(-Math.round(projected / step()), -1, 1), v.x);
    } else if (dy.get() + project(v.y) > window.innerHeight * 0.18) {
      close(v);
    } else {
      animate(dy, 0, { ...spring.momentum, velocity: v.y });
      animate(dx, 0, { ...spring.momentum, velocity: v.x });
    }
  };

  const slides = [-1, 0, 1]
    .map((k) => ({ k, i: index + k }))
    .filter(({ i }) => i >= 0 && i < photos.length);
  const photo = photos[index];

  return createPortal(
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Galería de fotos del club">
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: backdrop }} />

      <div
        className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {slides.map(({ k, i }) => {
          const p = photos[i];
          const current = k === 0;
          return (
            <motion.div
              key={p.id}
              ref={current ? frameRef : undefined}
              aria-hidden={!current}
              className="absolute overflow-hidden bg-zinc-900 will-change-transform"
              style={
                current
                  ? { left: fx, top: fy, width: fw, height: fh, borderRadius: fr, x: currentX, y: dy, scale, opacity: currentOpacity, zIndex: 1 }
                  : { left: k < 0 ? prevLeft : nextLeft, top: fy, width: fw, height: fh, borderRadius: fr, x: tx, opacity: k < 0 ? prevOpacity : nextOpacity }
              }
            >
              <img
                src={p.src}
                alt={current ? p.alt : ''}
                draggable={false}
                decoding="async"
                className="size-full object-cover"
                style={{ objectPosition: p.focus }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Controls float on their own layer and step aside while you drag */}
      <motion.div style={{ opacity: controls }} className="pointer-events-none absolute inset-0">
        <button
          ref={closeRef}
          type="button"
          onClick={() => close()}
          aria-label="Cerrar galería"
          className="press glass-chip pointer-events-auto absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 grid size-11 place-items-center rounded-full text-white md:top-5 md:right-6"
        >
          <Icon name="close" className="size-5" strokeWidth={1.75} />
        </button>

        {[
          { k: -1, icon: 'chevronLeft', label: 'Foto anterior', side: 'left-6' },
          { k: 1, icon: 'chevronRight', label: 'Foto siguiente', side: 'right-6' },
        ].map(({ k, icon, label, side }) => {
          const disabled = index + k < 0 || index + k >= photos.length;
          return (
            <button
              key={k}
              type="button"
              onClick={() => page(k)}
              disabled={disabled}
              aria-label={label}
              className={`press glass-chip pointer-events-auto absolute top-1/2 ${side} hidden size-12 -translate-y-1/2 place-items-center rounded-full text-white transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 md:grid`}
            >
              <Icon name={icon} className="size-5" strokeWidth={2} />
            </button>
          );
        })}

        <div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex justify-center md:bottom-8">
          <p className="glass-chip flex h-11 items-center gap-3 rounded-full pr-5 pl-4 text-[0.9375rem]" aria-live="polite">
            <span className="font-semibold text-white">{photo.title}</span>
            <span className="h-4 w-px bg-white/15" />
            <span className="text-zinc-400 tabular-nums">
              {index + 1} / {photos.length}
            </span>
          </p>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
