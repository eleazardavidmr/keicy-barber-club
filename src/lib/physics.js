// Motion physics, following Apple's "Designing Fluid Interfaces".
// Springs are described by bounce (≈ 1 − damping ratio) and visualDuration (≈ response).

export const spring = {
  // Default for UI: critically damped, no overshoot.
  smooth: { type: 'spring', bounce: 0, visualDuration: 0.4 },
  snappy: { type: 'spring', bounce: 0, visualDuration: 0.28 },
  // Calm entrances for content scrolling into view.
  reveal: { type: 'spring', bounce: 0, visualDuration: 0.7 },
  // Only after a gesture that carried momentum (flick, throw, drag release): damping ≈ 0.8.
  momentum: { type: 'spring', bounce: 0.2, visualDuration: 0.32 },
  // Hanging objects (the LED lamp): Apple's rotation spring, damping 0.8 / response 0.4.
  sway: { type: 'spring', bounce: 0.2, visualDuration: 0.4 },
};

// Where a flick will come to rest — the same exponential decay as scroll deceleration.
export function project(velocity, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

// Progressive resistance past a boundary: the further you pull, the less it follows.
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Pointer velocity from a short history of samples, so a pause before release reads as ~0.
export function createVelocityTracker(windowMs = 90) {
  let samples = [];
  return {
    reset() {
      samples = [];
    },
    add(x, y, t = performance.now()) {
      samples.push({ x, y, t });
      while (samples.length > 2 && t - samples[0].t > windowMs) samples.shift();
    },
    get() {
      if (samples.length < 2) return { x: 0, y: 0 };
      const a = samples[0];
      const b = samples[samples.length - 1];
      const dt = (b.t - a.t) / 1000;
      return dt > 0 ? { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt } : { x: 0, y: 0 };
    },
  };
}

// Gesture slop before committing to a direction.
export const DRAG_THRESHOLD = 10;
