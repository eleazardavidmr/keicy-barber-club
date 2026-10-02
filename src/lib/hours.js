import { useEffect, useState } from 'react';
import { site } from '../data/site';

export const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// "20:00" → "8 p. m.", "19:30" → "7:30 p. m."
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 || 12;
  const time = m ? `${h12}:${String(m).padStart(2, '0')}` : String(h12);
  return `${time} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}

// Always evaluated in Cali's time, wherever the visitor is.
function nowInShop(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return { day: WEEKDAY_INDEX[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function getOpenStatus(hours = site.hours, date = new Date()) {
  const { day, minutes } = nowInShop(date);
  const today = hours[day];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, today: day, label: `Abierto · Cierra a las ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, today: day, label: `Cerrado · Abre hoy a las ${formatTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (!next) continue;
    const when = i === 1 ? 'mañana' : `el ${DAY_NAMES[(day + i) % 7].toLowerCase()}`;
    return { open: false, today: day, label: `Cerrado · Abre ${when} a las ${formatTime(next.open)}` };
  }
  return { open: false, today: day, label: 'Cerrado' };
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

// Collapses identical consecutive days: "Lunes – Sábado · 10:00 a. m. – 8:00 p. m."
export function groupedHours(hours = site.hours) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];
  for (const d of order) {
    const h = hours[d];
    const key = h ? `${h.open}-${h.close}` : 'closed';
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.days.push(d);
    else groups.push({ key, days: [d], hours: h });
  }
  return groups.map(({ days, hours: h }) => ({
    days,
    label: days.length > 1 ? `${DAY_NAMES[days[0]]} – ${DAY_NAMES[days[days.length - 1]]}` : DAY_NAMES[days[0]],
    time: h ? `${formatTime(h.open)} – ${formatTime(h.close)}` : 'Cerrado',
  }));
}
