import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Reveal from './ui/Reveal';

const text =
  'Bienvenido al club. Un lugar de concreto, acero y luz cálida, donde cada corte empieza con una asesoría y termina en el detalle que te hace volver.';
const words = text.split(' ');
const accent = new Set([9, 10]); // "luz cálida,"

function Word({ children, progress, range, lit, glow }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={lit ? undefined : { opacity }} className={glow ? 'text-led' : 'text-white'}>
      {children}
    </motion.span>
  );
}

// The statement lights up word by word as it crosses the screen, like the LEDs coming on.
export default function Manifesto() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });

  return (
    <section aria-labelledby="manifesto" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6 md:py-44">
      <Reveal as="p" className="eyebrow text-led">
        El club
      </Reveal>
      <p
        id="manifesto"
        ref={ref}
        className="mt-8 text-[clamp(1.875rem,4.6vw,3.5rem)] leading-[1.14] font-semibold tracking-[-0.03em] text-balance"
      >
        {words.map((word, i) => (
          <span key={i}>
            <Word
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              lit={reduce}
              glow={accent.has(i)}
            >
              {word}
            </Word>{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
