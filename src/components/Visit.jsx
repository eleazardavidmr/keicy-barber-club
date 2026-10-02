import { useBooking } from '../context/booking';
import { site, whatsappUrl } from '../data/site';
import { photoById } from '../data/gallery';
import { groupedHours, useOpenStatus } from '../lib/hours';
import Reveal from './ui/Reveal';
import GlassButton from './ui/GlassButton';
import Icon from './ui/Icon';

const hours = groupedHours();

export default function Visit() {
  const { openBooking } = useBooking();
  const status = useOpenStatus();
  const facade = photoById.fachada;

  return (
    <section id="visitanos" aria-labelledby="visitanos-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal as="p" className="eyebrow text-led">
            Visítanos
          </Reveal>
          <Reveal as="h2" delay={0.05} id="visitanos-title" className="display-lg mt-5 text-balance text-white">
            Te esperamos en Vipasa.
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-8">
            <div className="flex gap-4">
              <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-amber-400" />
              <div>
                <p className="font-medium text-white">{site.address.street}</p>
                <p className="text-zinc-400">
                  {site.address.area} · {site.address.city}
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex items-center gap-1 rounded-full text-[0.9375rem] font-medium text-amber-300 transition-colors hover:text-amber-200"
                >
                  Cómo llegar
                  <Icon
                    name="arrowUpRight"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-amber-400" />
              <div className="flex-1">
                <p className="flex items-center gap-2 font-medium text-white">
                  <span
                    className={`size-1.5 rounded-full ${status.open ? 'bg-emerald-400 shadow-[0_0_8px_2px_rgb(52_211_153/0.55)]' : 'bg-zinc-500'}`}
                  />
                  {status.label}
                </p>
                <dl className="mt-3 max-w-sm divide-y divide-white/[0.06]">
                  {hours.map((h) => {
                    const today = h.days.includes(status.today);
                    return (
                      <div key={h.label} className="flex items-baseline justify-between gap-4 py-2.5 text-[0.9375rem]">
                        <dt className={`whitespace-nowrap ${today ? 'text-white' : 'text-zinc-400'}`}>
                          {h.label}
                          {today && <span className="ml-2 text-[0.6875rem] font-semibold tracking-[0.08em] text-amber-400">HOY</span>}
                        </dt>
                        <dd className={`whitespace-nowrap tabular-nums ${today ? 'font-medium text-white' : 'text-zinc-400'}`}>
                          {h.time}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-5">
            <GlassButton onClick={() => openBooking()}>
              Reserva tu cita
              <Icon name="arrowRight" className="size-4.5" strokeWidth={2} />
            </GlassButton>
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl('Hola, Keicy Barber Club 👋')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className="press glass-chip grid size-12 place-items-center rounded-full text-zinc-200 transition-colors hover:text-white"
              >
                <Icon name="chat" className="size-5" />
              </a>
              <a
                href={`tel:+${site.phone.e164}`}
                aria-label={`Llamar al ${site.phone.display}`}
                className="press glass-chip grid size-12 place-items-center rounded-full text-zinc-200 transition-colors hover:text-white"
              >
                <Icon name="phone" className="size-5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md md:max-w-none">
          {/* Offset LED frame, the same light that hangs over the name up top */}
          <span aria-hidden="true" className="led absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] opacity-70 md:translate-x-6 md:translate-y-6" />
          <figure className="relative overflow-hidden rounded-[2rem] bg-zinc-900 ring-1 ring-white/10">
            <img
              src={facade.src}
              alt={facade.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
              style={{ objectPosition: facade.focus }}
            />
            <figcaption className="glass-chip absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-white">
              La fachada, de noche
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
