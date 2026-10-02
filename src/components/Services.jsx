import { useBooking } from '../context/booking';
import { services, extras, formatPrice, formatMinutes } from '../data/services';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Icon from './ui/Icon';

const featured = services.filter((s) => s.featured);
const others = services.filter((s) => !s.featured);

const trackSpot = (e) => {
  if (e.pointerType !== 'mouse') return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

function ServiceCard({ service, large = false, delay = 0 }) {
  const { openBooking } = useBooking();
  const duration = formatMinutes(service.minutes);

  return (
    <Reveal delay={delay} className="h-full">
      <article
        onPointerMove={trackSpot}
        className={`group concrete relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-zinc-900 ring-1 ring-white/[0.07] transition-[translate,scale,box-shadow] duration-500 ease-out-quint has-[button:active]:scale-[0.985] has-[button:active]:duration-75 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-amber-400 ${
          large ? 'p-7 md:p-8' : 'p-6'
        }`}
      >
        {/* LED catching the top edge */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent transition-opacity duration-500 ${
            large ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />
        {/* Warm light that follows the pointer (under the grain, over the surface) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgb(245_158_11/0.09),transparent_60%)] group-hover:opacity-100"
        />

        <span
          className={`grid place-items-center rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-800/60 text-amber-300 ring-1 ring-white/[0.06] ${
            large ? 'size-14' : 'size-12'
          }`}
        >
          <Icon name={service.icon} className={large ? 'size-7' : 'size-6'} />
        </span>

        <h3
          className={`mt-6 font-semibold text-white ${
            large ? 'text-[1.625rem] leading-tight tracking-[-0.022em]' : 'text-xl tracking-[-0.018em]'
          }`}
        >
          {service.name}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-zinc-400">{service.summary}</p>

        {large && service.includes && (
          <ul className="mt-6 space-y-2.5" aria-label="Incluye">
            {service.includes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] text-zinc-300">
                <Icon name="check" className="size-4 shrink-0 text-amber-400" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className={`mt-auto flex items-end justify-between gap-4 ${large ? 'pt-10' : 'pt-8'}`}>
          <div>
            {service.priceNote && <p className="text-xs font-medium text-zinc-500">{service.priceNote}</p>}
            <p className={`font-semibold text-white tabular-nums ${large ? 'text-[1.75rem] tracking-[-0.025em]' : 'text-xl tracking-[-0.02em]'}`}>
              {formatPrice(service.price)}
            </p>
            {duration && (
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-[0.8125rem] text-zinc-500">
                <Icon name="clock" className="size-3.5" />
                {duration}
              </p>
            )}
          </div>
          {/* Stretched over the whole card: the card is the target, the pill is its label */}
          <button
            type="button"
            onClick={() => openBooking(service.id)}
            aria-label={`Reservar ${service.name}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/[0.07] px-4 text-sm font-semibold text-white ring-1 ring-white/[0.08] transition-colors duration-300 outline-none group-hover:bg-amber-400 group-hover:text-black group-hover:ring-amber-400 after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']"
          >
            Reservar
            <Icon name="arrowRight" className="size-4" strokeWidth={2} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Servicios" title={<span id="servicios-title">El menú del club</span>}>
          Precios en pesos colombianos. El corte de la casa ya incluye asesoría de imagen, lavado y una bebida.
        </SectionHeader>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {featured.map((s, i) => (
            <ServiceCard key={s.id} service={s} large delay={i * 0.06} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 md:gap-5 lg:grid-cols-3">
          {others.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={(i % 3) * 0.06} />
          ))}
        </div>

        <Reveal className="concrete relative mt-4 overflow-hidden rounded-[1.75rem] bg-zinc-950 p-6 ring-1 ring-white/[0.07] md:mt-5 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="display-md text-white">Complementos</h3>
            <p className="text-[0.9375rem] text-zinc-500">Súmalos a cualquier servicio.</p>
          </div>
          <dl className="mt-8 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {extras.map((x) => (
              <div key={x.name} className="flex items-baseline gap-3 border-t border-white/[0.06] py-3.5">
                <dt className="text-[0.9375rem] text-zinc-300">{x.name}</dt>
                <span aria-hidden="true" className="flex-1 translate-y-[-0.2em] border-b border-dotted border-white/10" />
                <dd className="text-[0.9375rem] font-semibold text-white tabular-nums">{formatPrice(x.price)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
