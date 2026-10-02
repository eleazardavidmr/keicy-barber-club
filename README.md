# Keicy Barber Club

Sitio web de la barbería, hecho con React, Tailwind CSS v4 y Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist para publicar
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Dirección, teléfono, horarios, redes, enlace de Weibook | `src/data/site.js` |
| Servicios, precios y complementos | `src/data/services.js` |
| Fotos de la galería y su encuadre | `src/data/gallery.js` + `src/assets/photos/` |
| Colores, tipografía y materiales (concreto, malla, LED) | `src/index.css` |
| Física de las animaciones (resortes, inercia, rebote) | `src/lib/physics.js` |

## Reservas

"Reserva tu cita" abre una hoja con los servicios. Desde ahí la persona sigue a
**Weibook** (disponibilidad real de barbero y hora) o a **WhatsApp** con su
selección ya escrita en el mensaje.
