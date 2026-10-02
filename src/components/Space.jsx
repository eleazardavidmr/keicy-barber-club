import { useCallback, useRef, useState } from 'react';
import { photos } from '../data/gallery';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Lightbox from './Lightbox';

const materials = [
  {
    name: 'Concreto',
    text: 'Paredes en acabado de concreto que le dejan el protagonismo al corte.',
    swatch: 'concrete relative bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500',
  },
  {
    name: 'Acero',
    text: 'Malla metálica y estructura negra a la vista, sin disimular nada.',
    swatch:
      'bg-zinc-950 ring-1 ring-white/15 [background-image:linear-gradient(to_right,rgb(255_255_255/0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.22)_1px,transparent_1px)] [background-size:7px_7px]',
  },
  {
    name: 'Cuero',
    text: 'Sofás negros en el lounge y pantalla grande para la espera.',
    swatch: 'bg-[radial-gradient(circle_at_32%_26%,#52525b,#18181b_45%,#000_80%)] ring-1 ring-white/10',
  },
  {
    name: 'Luz cálida',
    text: 'LED ámbar en la recepción, los espejos y sobre cada estación.',
    swatch: 'bg-[radial-gradient(circle_at_50%_40%,#fffbeb,#fcd34d_35%,#f59e0b_75%)] shadow-[0_0_28px_6px_rgb(245_158_11/0.45)]',
  },
];

export default function Space() {
  const [viewer, setViewer] = useState(null); // { start, current }
  const thumbs = useRef([]);

  const getThumb = useCallback((i) => thumbs.current[i], []);
  const onIndexChange = useCallback((i) => setViewer((v) => v && { ...v, current: i }), []);
  const onClosed = useCallback(() => setViewer(null), []);

  return (
    <section id="espacio" aria-labelledby="espacio-title" className="relative isolate py-24 md:py-36">
      {/* The partition mesh, faintly, behind the section */}
      <div
        aria-hidden="true"
        className="mesh absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_70%,transparent)] opacity-60"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nuestro espacio" title={<span id="espacio-title">Concreto, acero y luz cálida.</span>}>
          Un salón industrial con alma de lounge. Toca cualquier foto para verla de cerca; desliza para pasar y arrastra
          hacia abajo para cerrar.
        </SectionHeader>

        <div className="mt-14 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:mt-20 md:auto-rows-[14.5rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[16.5rem]">
          {photos.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 4) * 0.05} className={photo.span}>
              <button
                ref={(el) => (thumbs.current[i] = el)}
                type="button"
                onClick={() => setViewer({ start: i, current: i })}
                aria-label={`Ver foto: ${photo.title}`}
                style={{ opacity: viewer?.current === i ? 0 : 1 }}
                className="press group relative block size-full overflow-hidden rounded-[1.5rem] bg-zinc-900 ring-1 ring-white/[0.07]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-full object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.035]"
                  style={{ objectPosition: photo.focus }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="glass-chip absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium tracking-[-0.004em] text-white md:bottom-4 md:left-4">
                  {photo.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06} className="flex gap-4 lg:flex-col">
              <span aria-hidden="true" className={`block size-11 shrink-0 overflow-hidden rounded-full ${m.swatch}`} />
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.016em] text-white">{m.name}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-pretty text-zinc-400">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {viewer && (
        <Lightbox
          photos={photos}
          startIndex={viewer.start}
          getThumb={getThumb}
          onIndexChange={onIndexChange}
          onClosed={onClosed}
        />
      )}
    </section>
  );
}
