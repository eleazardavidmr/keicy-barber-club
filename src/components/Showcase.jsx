import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { photoById } from '../data/gallery';
import { useMediaQuery } from '../lib/useMediaQuery';

const trio = [
  { photo: photoById.sala, depth: 70, offset: 'md:mt-24' },
  { photo: photoById.estacion, depth: 20, offset: '' },
  { photo: photoById.recepcion, depth: 70, offset: 'md:mt-24' },
];

function Frame({ photo, progress, depth, className = '' }) {
  const reduce = useReducedMotion();
  // On phones the frames sit in a swipeable row, so they stay put vertically.
  const wide = useMediaQuery('(min-width: 768px)');
  const y = useTransform(progress, [0, 1], [depth, -depth]);
  return (
    <motion.figure style={reduce || !wide ? undefined : { y }} className={`shrink-0 snap-center ${className}`}>
      <div className="overflow-hidden rounded-[1.75rem] bg-zinc-900 ring-1 ring-white/[0.08] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <img
          src={photo.src}
          alt={photo.alt}
          width="690"
          height="795"
          loading="eager"
          decoding="async"
          className="aspect-[4/5] w-full object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      <figcaption className="mt-3.5 pl-1 text-[0.8125rem] font-medium tracking-[-0.004em] text-zinc-500">{photo.title}</figcaption>
    </motion.figure>
  );
}

// A first look at the shop, rising over the fold. Side frames drift more than the
// center one, so the three read as layers of depth rather than a flat strip.
export default function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} aria-label="Un vistazo al club" className="relative z-10 -mt-28 pb-10 md:-mt-36 md:pb-24">
      <div className="no-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 sm:px-6 md:grid md:snap-none md:grid-cols-3 md:items-start md:gap-6 md:overflow-visible md:pb-0">
        {trio.map(({ photo, depth, offset }) => (
          <Frame
            key={photo.id}
            photo={photo}
            progress={scrollYProgress}
            depth={depth}
            className={`w-[72vw] max-w-[22rem] md:w-auto md:max-w-none ${offset}`}
          />
        ))}
      </div>
    </section>
  );
}
