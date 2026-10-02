import sala from '../assets/photos/sala.webp';
import estacion from '../assets/photos/estacion.webp';
import recepcion from '../assets/photos/recepcion.webp';
import lounge from '../assets/photos/lounge.webp';
import fachada from '../assets/photos/fachada.webp';
import tocador from '../assets/photos/tocador.webp';
import salon from '../assets/photos/salon.webp';

// Orden pensado para la cuadrícula: 4 columnas en escritorio, 2 en móvil.
// `span` define cuánto ocupa cada foto; `focus` ajusta el encuadre de los recortes.
export const photos = [
  {
    id: 'sala',
    src: sala,
    title: 'La sala',
    alt: 'Sofá de cuero negro frente a la pared de concreto con el logo de Keicy Barber Club',
    span: 'col-span-2 row-span-2',
    focus: '50% 50%',
  },
  {
    id: 'estacion',
    src: estacion,
    title: 'La silla',
    alt: 'Barbero perfilando un degradado bajo una lámpara LED cuadrada',
    span: 'row-span-2',
    focus: '30% 50%',
  },
  {
    id: 'recepcion',
    src: recepcion,
    title: 'Recepción',
    alt: 'Mostrador de recepción con repisas iluminadas en LED ámbar y productos de cuidado',
    span: 'row-span-2',
    focus: '40% 50%',
  },
  {
    id: 'lounge',
    src: lounge,
    title: 'Lounge',
    alt: 'Cliente descansando en el sofá frente a una pantalla grande mientras espera su turno',
    span: 'col-span-2',
    focus: '50% 42%',
  },
  {
    id: 'fachada',
    src: fachada,
    title: 'Fachada',
    alt: 'Fachada negra del local de noche, con la puerta de vidrio y el letrero de Keicy',
    span: 'row-span-2',
    focus: '50% 60%',
  },
  {
    id: 'tocador',
    src: tocador,
    title: 'Tocador',
    alt: 'Baño con espejo redondo retroiluminado y enredadera, que refleja el salón',
    span: 'row-span-2',
    focus: '60% 40%',
  },
  {
    id: 'salon',
    src: salon,
    title: 'El salón',
    alt: 'Vista del salón: malla metálica, sillas de barbero, techo industrial y lámparas colgantes',
    span: 'col-span-2',
    focus: '50% 52%',
  },
];

export const photoById = Object.fromEntries(photos.map((p) => [p.id, p]));
