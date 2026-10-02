// Servicios y precios tomados del catálogo de Weibook (COP).
// `price: null` se muestra como "A consultar".

export const services = [
  {
    id: 'corte',
    name: 'Corte de cabello',
    icon: 'scissors',
    price: 35000,
    minutes: 60,
    summary: 'El corte de la casa, con todo lo que hace la diferencia.',
    includes: ['Asesoría de imagen', 'Mascarilla de puntos negros', 'Lavado', 'Bebida'],
    featured: true,
  },
  {
    id: 'corte-barba',
    name: 'Corte y barba',
    icon: 'beard',
    price: 50000,
    minutes: 60,
    summary: 'Corte completo y barba perfilada con vapor ozono.',
    includes: ['Vapor ozono', 'Asesoría de imagen', 'Mascarilla de puntos negros', 'Bebida'],
    featured: true,
  },
  {
    id: 'corte-premium',
    name: 'Corte premium',
    icon: 'gem',
    price: 50000,
    minutes: 60,
    summary: 'Para un cambio extremo o un corte trabajado solo a tijera.',
    includes: ['Cambio de look', 'Corte a tijera'],
    featured: true,
  },
  {
    id: 'corte-diseno',
    name: 'Corte con diseño',
    icon: 'razor',
    price: 40000,
    priceNote: 'Desde',
    minutes: 60,
    summary: 'Líneas y figuras a navaja. Básico $40.000 · Premium $45.000.',
  },
  {
    id: 'corte-cejas',
    name: 'Corte y cejas',
    icon: 'brow',
    price: 42000,
    minutes: 60,
    summary: 'Tu corte de siempre con cejas limpias y definidas.',
  },
  {
    id: 'facial-premium',
    name: 'Limpieza facial premium',
    icon: 'sparkle',
    price: 50000,
    minutes: 60,
    summary: 'Agua micelar, exfoliación, vapor ozono, velo facial, mascarilla y masaje capilar.',
  },
  {
    id: 'color',
    name: 'Color',
    icon: 'droplet',
    price: null,
    minutes: 180,
    summary: 'Colorimetría y tinte con un especialista del equipo.',
  },
  {
    id: 'barba',
    name: 'Barba',
    icon: 'beard',
    price: 30000,
    minutes: null,
    summary: 'Perfilado, rebaje y contorno a navaja.',
  },
  {
    id: 'puntas',
    name: 'Corte de puntas',
    icon: 'comb',
    price: 30000,
    minutes: 20,
    summary: 'Para ellas: mantenimiento de puntas sin perder largo.',
  },
];

export const extras = [
  { name: 'Cejas', price: 7000 },
  { name: 'Línea en ceja', price: 3000 },
  { name: 'Diseño básico', price: 5000 },
  { name: 'Diseño premium', price: 10000 },
  { name: 'Exfoliación', price: 15000 },
  { name: 'Depilación de nariz u oídos', price: 15000 },
  { name: 'Combo nariz y oídos', price: 20000 },
  { name: 'Limpieza facial básica', price: 25000 },
  { name: 'Velo facial', price: 25000 },
];

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

export const formatPrice = (price) => (price == null ? 'A consultar' : cop.format(price).replace(/\s/g, ''));

export const formatMinutes = (minutes) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
};
