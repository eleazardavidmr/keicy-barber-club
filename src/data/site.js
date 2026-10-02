// Datos públicos del negocio (Instagram @keicy_barber_club y su página de reservas en Weibook).
// Si algo cambia en el local, este es el único archivo que hay que tocar.

export const site = {
  name: 'Keicy Barber Club',
  motto: 'Bienvenido al club',

  address: {
    street: 'Av. 4 Norte #49N–150',
    area: 'Vipasa',
    city: 'Cali, Valle del Cauca',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Keicy Barber Club, Avenida 4 Norte 49N-150, Cali'),

  // Reservas en línea con disponibilidad real (barbero, día y hora)
  bookingUrl: 'https://book.weibook.co/keicy-barber-club',

  phone: {
    display: '+57 317 171 3526',
    e164: '573171713526',
  },

  social: [
    { id: 'instagram', label: 'Instagram', handle: '@keicy_barber_club', url: 'https://www.instagram.com/keicy_barber_club/' },
    { id: 'tiktok', label: 'TikTok', handle: '@keicy.barber.club', url: 'https://www.tiktok.com/@keicy.barber.club' },
  ],

  // Calificación pública en Weibook (actualízala de vez en cuando)
  rating: { value: 4.9, count: 338, source: 'Weibook' },

  timeZone: 'America/Bogota',

  // 0 = domingo … 6 = sábado. Formato 24 h.
  hours: {
    0: { open: '10:00', close: '18:00' },
    1: { open: '10:00', close: '20:00' },
    2: { open: '10:00', close: '20:00' },
    3: { open: '10:00', close: '20:00' },
    4: { open: '10:00', close: '20:00' },
    5: { open: '10:00', close: '20:00' },
    6: { open: '10:00', close: '20:00' },
  },
};

export const barbers = ['Nicolás', 'Gabriel', 'Daniel', 'Danny'];

export const whatsappUrl = (text) =>
  `https://wa.me/${site.phone.e164}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
