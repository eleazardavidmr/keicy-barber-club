import { useBooking } from '../context/booking';
import { site, whatsappUrl } from '../data/site';
import { groupedHours } from '../lib/hours';
import Wordmark from './ui/Wordmark';
import Icon from './ui/Icon';

const hours = groupedHours();
const linkClass = 'text-[0.9375rem] text-zinc-400 transition-colors duration-200 hover:text-white';

function Column({ title, children }) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-semibold tracking-[0.01em] text-zinc-200">{title}</h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const { openBooking } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="concrete relative overflow-hidden bg-zinc-950">
      {/* Edge light instead of a hard rule */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] md:gap-10">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-zinc-400">
              {site.motto}. Barbería en el norte de Cali.
            </p>
            <div className="mt-6 flex gap-2">
              {site.social.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${s.handle}`}
                  className="press grid size-11 place-items-center rounded-full bg-white/[0.05] text-zinc-300 ring-1 ring-white/[0.07] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon name={s.id} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <Column title="Explorar">
            <li><a href="#servicios" className={linkClass}>Servicios y precios</a></li>
            <li><a href="#espacio" className={linkClass}>Nuestro espacio</a></li>
            <li><a href="#visitanos" className={linkClass}>Cómo llegar</a></li>
            <li>
              <button type="button" onClick={() => openBooking()} className={`${linkClass} rounded-sm`}>
                Reservar una cita
              </button>
            </li>
          </Column>

          <Column title="Contacto">
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {site.address.street}
                <br />
                {site.address.area}, Cali
              </a>
            </li>
            <li><a href={`tel:+${site.phone.e164}`} className={`${linkClass} tabular-nums`}>{site.phone.display}</a></li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
              </a>
            </li>
          </Column>

          <Column title="Horario">
            {hours.map((h) => (
              <li key={h.label} className="text-[0.9375rem]">
                <span className="block text-zinc-300">{h.label}</span>
                <span className="block text-zinc-500 tabular-nums">{h.time}</span>
              </li>
            ))}
          </Column>
        </div>

        <div className="mt-16 flex flex-col gap-3 text-[0.8125rem] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Keicy Barber Club · Cali, Colombia</p>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-300">
            Reservas en línea con Weibook ↗
          </a>
        </div>
      </div>

      {/* The name, cut by the bottom of the page like a sign seen from below */}
      <div aria-hidden="true" className="pointer-events-none flex h-[clamp(5rem,17vw,13rem)] justify-center overflow-hidden select-none">
        <span className="font-display text-[clamp(10rem,36vw,28rem)] leading-[0.8] font-bold tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)] [background-image:linear-gradient(to_bottom,rgb(255_255_255/0.07),transparent_75%)] [-webkit-background-clip:text] [background-clip:text]">
          Keicy
        </span>
      </div>
    </footer>
  );
}
