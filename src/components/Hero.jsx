import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useBooking } from '../context/booking';
import { useOpenStatus } from '../lib/hours';
import { site } from '../data/site';
import { spring } from '../lib/physics';
import GlassButton from './ui/GlassButton';
import Wordmark from './ui/Wordmark';
import Icon from './ui/Icon';

const powerOn = { duration: 1.6, ease: [0.22, 1, 0.36, 1] };

// The square LED pendants that hang over every station, hung here over the name.
function LedLamp({ swing }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      style={{ rotate: swing, transformOrigin: '50% -70vh' }}
      className="pointer-events-none absolute -inset-x-[12%] -top-[16%] -bottom-[22%] sm:-inset-x-[16%]"
    >
      {/* Suspension cables */}
      {['left-[9%]', 'right-[9%]'].map((pos) => (
        <motion.span
          key={pos}
          className={`absolute bottom-full ${pos} h-[100vh] w-px origin-bottom bg-gradient-to-t from-zinc-400/40 via-zinc-500/15 to-transparent`}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...spring.reveal, delay: 0.1 }}
        />
      ))}
      {/* The tube itself: dark until it powers on */}
      <span className="absolute inset-0 rounded-[3px] border-[1.5px] border-zinc-700/70" />
      <motion.span
        className="led absolute inset-0 rounded-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...powerOn, delay: 0.45 }}
      />
      {/* Light spilling onto the floor below */}
      <motion.span
        className="absolute -inset-x-[30%] top-[70%] -bottom-[60%] bg-[radial-gradient(ellipse_at_50%_20%,rgb(245_158_11/0.22),transparent_60%)] blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...powerOn, delay: 0.7 }}
      />
    </motion.div>
  );
}

function OpenStatus() {
  const status = useOpenStatus();
  return (
    <p className="glass-chip inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[0.8125rem] font-medium tracking-[-0.004em] text-zinc-200">
      <span
        className={`size-1.5 rounded-full ${
          status.open ? 'bg-emerald-400 shadow-[0_0_10px_2px_rgb(52_211_153/0.6)]' : 'bg-zinc-500'
        }`}
      />
      {status.label}
    </p>
  );
}

export default function Hero() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // The lamp answers the pointer like something hanging: a small, springy swing.
  const tilt = useMotionValue(0);
  const swing = useSpring(tilt, spring.sway);
  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const nx = e.clientX / window.innerWidth - 0.5;
    tilt.set(nx * -1.6);
  };

  // As the page scrolls, the hero recedes: slower than the page, dimming as it goes.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => tilt.set(0)}
      className="concrete relative overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="mesh absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,#000_5%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-b from-transparent via-black/70 to-black"
      />

      <motion.div
        style={reduce ? { opacity: contentOpacity } : { y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4 pt-28 pb-40 text-center sm:px-6 md:pb-48"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.reveal, delay: 0.2 }}
        >
          <OpenStatus />
        </motion.div>

        <div className="relative mt-16 sm:mt-20">
          <LedLamp swing={swing} />
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.97 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ ...powerOn, delay: 0.15 }}
            className="relative px-2 [text-shadow:0_0_60px_rgb(245_158_11/0.18)]"
          >
            <Wordmark size="xl" />
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.reveal, delay: 0.75 }}
          className="mt-20 max-w-xl text-lg leading-relaxed text-pretty text-zinc-300 sm:mt-24 md:text-xl"
        >
          Corte, barba y asesoría de imagen en el norte de Cali.
          <span className="text-zinc-500"> Con una bebida mientras esperas tu turno.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.reveal, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
        >
          <GlassButton onClick={() => openBooking()}>
            Reserva tu cita
            <Icon name="arrowRight" className="size-4.5" strokeWidth={2} />
          </GlassButton>
          <a
            href="#servicios"
            className="group inline-flex items-center gap-1 rounded-full text-[1.0625rem] font-medium text-amber-300 transition-colors hover:text-amber-200"
          >
            Ver servicios y precios
            <Icon name="chevronRight" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 inline-flex items-center gap-1.5 text-sm tracking-[-0.006em] text-zinc-500"
        >
          <Icon name="star" className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-zinc-300">{site.rating.value.toLocaleString('es-CO')}</span>
          <span>· {site.rating.count} reseñas en {site.rating.source}</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
