---
version: alpha
name: Concreto y LED
description: >-
  Sistema de diseño para sitios de barbería. Un interior industrial oscuro (concreto, acero, cuero)
  encendido por una sola luz cálida, con el movimiento físico e interrumpible de las interfaces de Apple.
  Nació en el proyecto Keicy Barber Club y está escrito para reutilizarse con otra marca.
colors:
  background: "#000000"
  surface-sunken: "#09090B"
  surface: "#18181B"
  surface-raised: "#27272A"
  fill-subtle: "#FFFFFF08"
  outline: "#FFFFFF12"
  on-background: "#FFFFFF"
  text: "#F4F4F5"
  text-body: "#D4D4D8"
  text-muted: "#9F9FA9"
  text-faint: "#71717B"
  accent: "#FFB900"
  accent-soft: "#FFD230"
  accent-glow: "#F59E0B"
  accent-highlight: "#FDE68A"
  accent-tint: "#FFB90017"
  led-core: "#FFF1D6"
  on-accent: "#000000"
  status-open: "#00D492"
  glass: "#0A0A0B9E"
  glass-chip: "#18181B8C"
  glass-button: "#FFFFFF12"
  scrim: "#000000B3"
typography:
  display-xl:
    fontFamily: Grenze Gotisch
    fontSize: 15rem
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Grenze Gotisch
    fontSize: 5.25rem
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: -0.01em
  display-md:
    fontFamily: Grenze Gotisch
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.005em
  statement:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: -0.03em
  title-lg:
    fontFamily: Inter
    fontSize: 1.625rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.022em
  title-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.018em
  body-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: -0.012em
  body-md:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.012em
  body-sm:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: -0.012em
  button:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.006em
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.004em
  eyebrow:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.22em
  wordmark-tag:
    fontFamily: Inter
    fontSize: 0.95rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.5em
rounded:
  led: 3px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 28px
  2xl: 32px
  full: 9999px
spacing:
  gutter: 16px
  gutter-wide: 24px
  container: 72rem
  nav-height: 56px
  grid-gap: 16px
  card-padding: 24px
  card-padding-lg: 32px
  section-y: 96px
  section-y-wide: 144px
components:
  nav:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label-lg}"
    height: 56px
  nav-link-active:
    backgroundColor: "#FFFFFF14"
    textColor: "{colors.on-background}"
    rounded: "{rounded.full}"
  button-glass:
    backgroundColor: "{colors.glass-button}"
    textColor: "{colors.on-background}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 56px
    padding: 0 28px
  button-glass-sm:
    backgroundColor: "{colors.glass-button}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 36px
    padding: 0 16px
  button-solid:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 52px
  button-solid-hover:
    backgroundColor: "{colors.accent-soft}"
  button-icon:
    backgroundColor: "{colors.glass-chip}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    size: 48px
  status-pill:
    backgroundColor: "{colors.glass-chip}"
    textColor: "{colors.text}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 32px
    padding: 0 14px
  chip:
    backgroundColor: "{colors.fill-subtle}"
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    height: 40px
    padding: 0 16px
  chip-selected:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
  day-chip:
    backgroundColor: "{colors.fill-subtle}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    width: 68px
    height: 64px
  day-chip-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  card-service:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.xl}"
    padding: 24px
  card-service-featured:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: 32px
  icon-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.accent-soft}"
    rounded: "{rounded.md}"
    size: 48px
  option-row:
    backgroundColor: "{colors.fill-subtle}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.md}"
    padding: 12px
  option-row-selected:
    backgroundColor: "{colors.accent-tint}"
  panel:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.xl}"
    padding: 40px
  photo-thumb:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  photo-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
  sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.2xl}"
    width: 34rem
  footer:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-muted}"
---

# Concreto y LED

Sistema de diseño del sitio construido para Keicy Barber Club. Este documento describe la interfaz
completa para poder llevarla a otra barbería: qué es cada pieza, con qué valores está hecha, cómo se
mueve y qué hay que cambiar para que deje de ser Keicy. La lista de cambios está al final, en
**Rebranding**.

Los títulos de sección están en inglés porque son los que define el formato DESIGN.md; el contenido
está en español.

## Overview

La idea es un local industrial de noche, encendido por una sola luz. Todo sale de tres decisiones:

1. **Superficies oscuras y mates, con textura.** Negro puro de fondo y grises carbón encima. Nada es
   liso del todo: las superficies llevan grano de concreto y, de fondo, una malla metálica tenue.
2. **Un solo acento, y siempre se comporta como luz.** El ámbar brilla, se derrama sobre el piso y se
   refleja en los bordes. Casi nunca se usa como pintura plana.
3. **Todo lo que se mueve tiene peso.** Resortes en vez de duraciones fijas, inercia al soltar,
   resistencia en los bordes, y cualquier animación se puede agarrar o revertir a mitad de camino.

El resultado mezcla dos registros a propósito: la rudeza del local (tipografía gótica, concreto, acero)
y la precisión de Apple (espacio negativo, vidrio esmerilado, bordes muy redondeados, texto limpio).

**Alcance.** Sitio de una sola página, solo modo oscuro, en español, mobile-first.
**Stack.** React 19, Tailwind CSS v4, Motion 13 (`motion/react`), Vite. Fuentes autoalojadas con Fontsource.

### Qué es del sistema y qué era de Keicy

| Capa | Se reutiliza tal cual | Salió de Keicy: se reemplaza |
| --- | --- | --- |
| Estructura | Las 7 secciones, la navegación, la hoja de reservas, el visor de fotos | Nada |
| Movimiento | Todo (`src/lib/physics.js` y los gestos) | Nada |
| Neutros y vidrio | Escala zinc, `glass`, `glass-chip`, grano | Nada |
| Acento | La regla "el acento es luz" | El tono ámbar: era el color de sus LED |
| Tipografía | Inter para todo el texto | Grenze Gotisch: se eligió por parecerse a su logo |
| Motivos | La idea de "una fuente de luz + dos materiales" | La lámpara cuadrada colgante y la malla metálica: eran de su local |
| Contenido | Los esquemas de datos | Nombre, fotos, dirección, teléfono, precios, barberos, calificación, textos |

## Colors

| Rol | Token | Valor | Tailwind | Dónde se usa |
| --- | --- | --- | --- | --- |
| Fondo de página | `background` | `#000000` | `bg-black` | `body`, hero, lightbox |
| Superficie hundida | `surface-sunken` | `#09090B` | `zinc-950` | Footer, panel de complementos |
| Superficie | `surface` | `#18181B` | `zinc-900` | Tarjetas, hoja de reservas, marcos de foto |
| Superficie elevada | `surface-raised` | `#27272A` | `zinc-800` | Casillas de ícono |
| Relleno sutil | `fill-subtle` | blanco 3 % | `bg-white/[0.03]` | Filas y chips sin seleccionar |
| Filete | `outline` | blanco 6–8 % | `ring-white/[0.07]` | Borde de 1 px de casi todo |
| Títulos | `on-background` | `#FFFFFF` | `text-white` | H1–H3, precios, nombres |
| Texto base | `text` | `#F4F4F5` | `zinc-100` | Color por defecto del `body` |
| Entradilla | `text-body` | `#D4D4D8` | `zinc-300` | Párrafo del hero, listas "incluye" |
| Secundario | `text-muted` | `#9F9FA9` | `zinc-400` | Descripciones, enlaces en reposo |
| Metadatos | `text-faint` | `#71717B` | `zinc-500` | Duraciones, pies de foto, copyright |
| Acento | `accent` | `#FFB900` | `amber-400` | Botón sólido, checks, íconos, foco |
| Acento suave | `accent-soft` | `#FFD230` | `amber-300` | Antetítulos, enlaces, íconos de servicio |
| Resplandor | `accent-glow` | `#F59E0B` | — (rgb a mano) | Todas las sombras y halos de luz |
| Reflejo | `accent-highlight` | `#FDE68A` | — (rgb a mano) | Borde superior del botón de vidrio |
| Núcleo del LED | `led-core` | `#FFF1D6` | — (rgb a mano) | Línea del tubo LED |
| Abierto | `status-open` | `#00D492` | `emerald-400` | Punto de "Abierto" y nada más |

Reglas:

- **Las superficies suben por pasos**: negro → `zinc-950` → `zinc-900` → `zinc-800`. No hay grises intermedios inventados.
- **Bordes de 1 px blancos al 6–8 %** (`ring-1 ring-white/[0.07]`) en lugar de bordes de color. Separan sin dibujar una caja.
- **El acento como relleno plano aparece en un solo tipo de sitio**: lo que ya está confirmado o es la acción final (botón "Reservar en línea" de la hoja, día seleccionado, check de la fila elegida). En todo lo demás es texto, ícono o resplandor.
- **Selección** = tinte del acento al 9 % + filete del acento al 45 %. No se rellena la fila.
- **El verde solo significa "abierto".** Cerrado es un punto `zinc-500`, no rojo.
- **Hay dos familias de ámbar en el código.** Las clases (`amber-300/400`) usan la paleta de Tailwind v4; los halos están escritos a mano en rgb con el ámbar clásico (`245 158 11`, `251 191 36`, `253 230 138`). Se ven como un solo color, pero al cambiar de acento hay que cambiar las dos (ver Rebranding).
- **Contraste.** `text-muted` da 8,0:1 sobre negro y 6,7:1 sobre `surface`. `text-faint` da 4,3:1 sobre negro y 3,7:1 sobre `surface`: queda por debajo de AA (4,5:1) para texto pequeño. Hoy se usa en duraciones y pies de foto; no lo uses para nada que haya que leer sí o sí, y en un proyecto nuevo conviene subir esos textos a `text-muted`.

## Typography

Dos voces. **Display** (Grenze Gotisch, peso 600) habla poco y fuerte: el nombre y los títulos.
**Texto** (Inter variable con eje óptico) hace todo lo demás.

| Token | Fuente | Tamaño | Peso | Interlineado | Tracking | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| `display-xl` | Display | `clamp(5.75rem, 25vw, 15rem)` | 600 | 0.8 | −0.02em | Nombre en el hero |
| `display-lg` | Display | `clamp(2.75rem, 7vw, 5.25rem)` | 600 | 0.95 | −0.01em | H2 de cada sección |
| `display-md` | Display | `clamp(2rem, 4.5vw, 3rem)` | 600 | 1 | −0.005em | H3 destacado ("Complementos") |
| `statement` | Inter | `clamp(1.875rem, 4.6vw, 3.5rem)` | 600 | 1.14 | −0.03em | Frase del manifiesto |
| `title-lg` | Inter | 1.625–1.75rem | 600 | 1.25 | −0.022em | Tarjeta destacada, título de la hoja, menú móvil |
| `title-md` | Inter | 1.25rem | 600 | 1.4 | −0.018em | Título de tarjeta |
| `body-lg` | Inter | 1.125rem → 1.25rem (md) | 400 | 1.625 | −0.012em | Entradillas |
| `body-md` | Inter | 1.0625rem (17 px) | 400 | 1.5 | −0.012em | Texto base |
| `body-sm` | Inter | 0.9375rem | 400 | 1.625 | −0.012em | Descripciones, listas |
| `button` | Inter | 1.0625rem | 600 | 1 | −0.01em | Botones grandes |
| `label-lg` | Inter | 0.875rem | 500 | 1.4 | −0.006em | Enlaces de navegación, botón pequeño |
| `label-md` | Inter | 0.8125rem | 500–600 | 1.4 | −0.004em | Chips, pies de foto, leyendas |
| `eyebrow` | Inter | 0.75rem | 600 | 1 | +0.22em, mayúsculas | Antetítulo de sección |
| `wordmark-tag` | Inter | `clamp(0.7rem, 1.6vw, 0.95rem)` | 600 | 1 | +0.5em, mayúsculas | "BARBER CLUB" bajo el nombre |

Reglas:

- **El tracking depende del tamaño**: negativo y cada vez más cerrado al crecer; positivo solo en mayúsculas pequeñas. Nunca un `letter-spacing` fijo para todo.
- **El interlineado va al revés que el tamaño**: 0.8–1 en display, 1.5–1.625 en texto.
- **La fuente display es solo para el nombre y títulos cortos** (unas 5 palabras). Nunca en párrafos, botones, precios ni formularios.
- **Cifras** (precios, horas, contador de fotos) siempre con `tabular-nums`.
- Títulos con `text-balance`, párrafos con `text-pretty`.
- El cuerpo es 17 px, no 16: es la medida de texto de Apple y aquí da el aire que pide el fondo negro.
- Tamaños de fuente y espaciado en `rem`, para respetar el tamaño de texto del usuario.

Carga: `@fontsource-variable/inter/opsz.css` y `@fontsource-variable/grenze-gotisch`, importadas en `src/main.jsx`. Las familias se declaran en `@theme` dentro de `src/index.css` (`--font-sans`, `--font-display`).

## Layout

**Contenedor.** `max-w-6xl` (72rem) centrado, con márgenes de 16 px que pasan a 24 px desde `sm`. El manifiesto usa `max-w-5xl`; las cabeceras de sección, `max-w-3xl`.

**Ritmo vertical.** Secciones con `py-24` (96 px) que pasan a `md:py-36` (144 px). El manifiesto respira más: `py-28` → `md:py-44`. Entre cabecera y contenido: `mt-14` → `md:mt-20`.

**Puntos de corte** (los de Tailwind): `sm` 640, `md` 768, `lg` 1024. Se diseña primero para móvil.

**Estructura de la página**, en orden:

| # | Sección | `id` | Componente | Qué hace |
| --- | --- | --- | --- | --- |
| — | Navegación | — | `Navbar` | Fija, 56 px, vidrio |
| 1 | Hero | `inicio` | `Hero` | Nombre dentro de la lámpara LED, estado abierto/cerrado, CTA. `min-h-[100svh]` |
| 2 | Vitrina | — | `Showcase` | 3 fotos que se abren en abanico mientras la sección queda fija (`240svh`) |
| 3 | Manifiesto | — | `Manifesto` | Una frase que se enciende palabra por palabra |
| 4 | Servicios | `servicios` | `Services` | 3 tarjetas destacadas + 6 normales + panel de complementos |
| 5 | Espacio | `espacio` | `Space` | Galería en mosaico + 4 materiales |
| 6 | Visítanos | `visitanos` | `Visit` | Dirección, horario, contacto y foto de fachada |
| — | Pie | — | `Footer` | 4 columnas y el nombre gigante cortado |

**Rejillas.**

- Servicios destacados: 1 columna → 3 desde `md`. Resto: 1 → 2 (`sm`) → 3 (`lg`). Separación 16 px → 20 px.
- Galería: 2 columnas → 4 desde `md`, filas automáticas de 10.5rem / 13rem / 14.5rem / 16.5rem, separación 12 px → 16 px. Cada foto declara su tamaño (`col-span-2 row-span-2`, `row-span-2` o `col-span-2`) y con 7 fotos el mosaico cierra sin huecos en ambos anchos.
- Visítanos: 1 columna → 2 desde `md`, separación 64 px → 80 px.
- Pie: `1.4fr 1fr 1.2fr 1.2fr` desde `md`.

**Capas** (`z-index`): vitrina 10, navegación 50, hoja de reservas 70, visor 80, enlace "saltar al contenido" 90.

**Detalles que sostienen el resto.**

- Alturas a pantalla completa en `svh`, no `vh`, para que la barra del navegador móvil no las rompa.
- `section[id]` lleva `scroll-margin-top: 4.5rem` para que los anclajes no queden bajo la navegación.
- `scrollbar-gutter: stable` en `html`: bloquear el scroll al abrir un modal no mueve la página.
- Todo el sitio vive dentro de `<div id="page">`. La hoja y el visor se montan fuera, en `body`, y mientras están abiertos `#page` recibe `inert`.
- Fotos de contenido siempre en `aspect-[4/5]`, con `object-position` propio por foto (`focus` en `gallery.js`).

## Elevation & Depth

La profundidad se construye con **material y luz**, no con sombras grises.

| Material | Clase | Receta | Dónde |
| --- | --- | --- | --- |
| Concreto | `concrete` | `::before` con dos ruidos SVG (`feTurbulence`): grano fino (frecuencia 0.85) y manchas lentas (0.004 × 0.009), en gris, opacidad 7 % | Hero, tarjetas, hoja, footer |
| Malla | `mesh` | Cuadrícula de líneas blancas: celda de 28 px al 3.5 % dentro de marcos de 224 px al 7 %. Siempre con una máscara que la desvanece | Fondo del hero y de Espacio |
| Vidrio | `glass` | `rgb(10 10 11 / .62)` + `blur(24px) saturate(170%)` | Navegación, menú móvil |
| Vidrio pequeño | `glass-chip` | `rgb(24 24 27 / .55)` + `blur(16px) saturate(160%)` + filete interior blanco 8 % y luz superior 10 % | Píldoras, etiquetas sobre fotos, botones de ícono |
| Vidrio con luz | `.btn-glass` | Blanco 7 % + `blur(20px) saturate(170%)`, borde degradado ámbar (más claro arriba), halo ámbar debajo | CTA principal |
| LED | `led` | Línea de 1.5 px `#FFF1D6` + 4 halos exteriores (1, 10, 36 y 110 px) + 2 interiores, en ámbar | Lámpara del hero, marco de la fachada |
| Texto encendido | `text-led` | `amber-300` + `text-shadow` ámbar de 18 px y 2 px | Antetítulos, palabras clave del manifiesto |

Sombras:

- **Negras, grandes y recogidas** (extensión negativa): `0 40px 80px -30px rgb(0 0 0 / .9)` en fotos, `0 30px 60px -30px` en tarjetas al pasar el cursor, `0 -20px 80px -20px` en la hoja.
- **Sombra de color solo en lo que emite luz**: el botón de vidrio, el botón sólido, el LED.

Reglas:

- **Nunca vidrio sobre vidrio.** Si una superficie translúcida cae sobre otra, una de las dos pasa a sólida.
- **Una tarea modal oscurece el fondo** (hoja: negro 70 %; visor: negro 100 %). El menú móvil usa 60 %.
- **Bordes de scroll, no divisores**: bajo la navegación hay un degradado de 32 px que aparece al hacer scroll; el cuerpo de la hoja se desvanece arriba y abajo con una máscara. El footer se separa con una línea de luz en degradado, no con un borde.
- **El vidrio se materializa**: la barra entra con desenfoque y tinte a la vez (500 ms); el menú móvil entra con escala, opacidad y `blur(10px → 0)`.
- **Luz en el borde superior**: las tarjetas destacadas llevan una línea de 1 px en degradado ámbar arriba; las normales la muestran al pasar el cursor.

## Shapes

| Radio | Valor | Uso |
| --- | --- | --- |
| `led` | 3 px | Solo el tubo LED. Es la única forma con esquina viva |
| `sm` | 12 px | Casilla de ícono dentro de la hoja |
| `md` | 16 px | Filas de opción, casillas de ícono, chips de día |
| `lg` | 24 px | Miniaturas de la galería |
| `xl` | 28 px | Tarjetas, paneles, fotos de la vitrina |
| `2xl` | 32 px | Hoja de reservas, marco de la fachada |
| `full` | píldora | Todo lo que se pulsa: botones, chips, enlaces de navegación |

- La foto abierta en el visor usa 20 px y vuelve a 24 px al regresar a su miniatura.
- **Íconos**: familia propia en `src/components/ui/Icon.jsx`. Rejilla de 24 px, trazo de 1.5 (2 en flechas y cierres pequeños), extremos y uniones redondeados, sin relleno. Servicios: `scissors`, `beard`, `gem`, `razor`, `brow`, `sparkle`, `droplet`, `comb`. Interfaz: flechas, `close`, `check`, `pin`, `clock`, `phone`, `chat`, `calendar`, `star`, `instagram`, `tiktok`.
- **Área táctil mínima de 44 px** en todo control. Los botones de ícono miden 44–48 px.

## Motion

Los valores viven en `src/lib/physics.js`. Un resorte se describe con `bounce` (≈ 1 − amortiguación) y `visualDuration` (≈ respuesta), no con duración fija.

| Resorte | `bounce` | `visualDuration` | Cuándo |
| --- | --- | --- | --- |
| `smooth` | 0 | 0.40 s | Por defecto: abrir, cerrar, mover |
| `snappy` | 0 | 0.28 s | Cambios pequeños (ícono del menú) |
| `reveal` | 0 | 0.70 s | Contenido que entra al hacer scroll |
| `momentum` | 0.2 | 0.32 s | Solo tras un gesto con impulso (soltar un arrastre) |
| `sway` | 0.2 | 0.40 s | Objetos que cuelgan (la lámpara) |

Curvas para lo que no es espacial (luz, opacidad): `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)`.

Reglas de gesto:

- **Respuesta al presionar, no al soltar**: `scale(0.97)` en 60 ms (clase `press` y `.btn-glass`).
- **Umbral de 10 px** antes de decidir si un gesto es horizontal o vertical; después, seguimiento 1:1.
- **Velocidad** medida sobre los últimos 90 ms del puntero, y entregada al resorte al soltar.
- **Se decide con la proyección**, no con la posición: `posición + (v/1000) · 0.998 / (1 − 0.998)`.
- **Bordes elásticos**: `rubberband(exceso, dimensión, 0.55)`. Nunca un tope seco.
- **Interrumpible siempre**: al tocar algo en movimiento se detiene la animación y el gesto sigue desde donde está en pantalla.
- **Rebote solo si hubo impulso.** Un menú que aparece no rebota; una hoja que sueltas, sí.
- **Entra y sale por el mismo camino**, y nace del elemento que lo abrió.
- **Nada en bucle.** El brillo del botón pasa una vez al entrar el cursor; no hay pulsos ni vaivenes.

Efectos ligados al scroll (todos reversibles):

| Efecto | Rango | Valores |
| --- | --- | --- |
| El hero se aleja | toda su altura | `y` 0 → 140 px, escala 1 → 0.94, opacidad 1 → 0 al 65 % |
| Vitrina fija | 240svh, fijo 140svh | abanico entre 8 % y 62 %; pies de foto entre 50 % y 68 % |
| Manifiesto | del 85 % al 50 % de la pantalla | opacidad por palabra 0.14 → 1 |
| Entrada de contenido (`Reveal`) | una vez, al 12 % del borde inferior | opacidad 0 → 1, `y` 28 → 0, escalonado 50–60 ms |

Preferencias del usuario:

- **`prefers-reduced-motion`**: `MotionConfig reducedMotion="user"` deja solo fundidos. El hero no se desplaza, la vitrina no se fija y muestra el abanico ya abierto, el manifiesto aparece encendido, y hoja y visor abren y cierran con un fundido de ~230 ms. El arrastre directo se mantiene.
- **`prefers-reduced-transparency`**: el vidrio pasa a `zinc-900` sólido, sin desenfoque.
- **`prefers-contrast: more`**: fondo negro sólido y contorno blanco al 60 %.

## Components

### Navbar
Barra fija de 56 px. Transparente arriba del todo; a los 12 px de scroll entra el vidrio. Marca a la izquierda, enlaces centrados (desde `md`), botón de vidrio pequeño "Reservar" a la derecha en todos los anchos.
- El enlace activo lleva una píldora blanca al 8 % que **se desliza** de un enlace a otro (`layoutId`, resorte `smooth`). La sección activa es la que cruza el centro de la pantalla.
- Móvil: botón de 44 px con dos líneas que giran a una X. El menú es un panel de vidrio que crece desde la esquina del botón (escala 0.96 → 1, `y` −8 → 0, desenfoque 10 → 0) y vuelve a ella. Enlaces a 1.75rem, punto ámbar en el activo, CTA a todo el ancho. Cierra con Escape, al elegir, o al pasar a `md`.

### Wordmark
El nombre en display y una etiqueta en mayúsculas muy abiertas. Dos tamaños: `sm` (navegación y pie, nombre a 1.65rem con la etiqueta al lado desde `sm`) y `xl` (hero, `display-xl` con la etiqueta debajo).

### GlassButton (CTA principal)
Píldora de vidrio con borde ámbar y halo. Tamaños `sm` 36 px, `md` 44 px, `lg` 56 px.
- Cursor encima: el halo crece, una franja de luz cruza una vez (900 ms) y un foco radial de 140 px sigue al puntero (variables `--mx`, `--my`).
- Presionado: `scale(0.97)` inmediato.
- Hay un solo CTA de vidrio por pantalla. A su lado, la acción secundaria es un enlace de texto en `accent-soft` con chevron.

### Botón sólido
Píldora `accent` con texto negro, 52 px, sombra ámbar. Es la acción final dentro de la hoja ("Reservar en línea"). Al pasar el cursor: `accent-soft`.

### Píldora de estado
`glass-chip` de 32 px con un punto de 6 px (verde con halo si está abierto, gris si no) y el texto "Abierto · Cierra a las 8 p. m." o "Cerrado · Abre mañana a las 10 a. m.". Se calcula en la zona horaria del local y se actualiza cada 30 s (`src/lib/hours.js`).

### Lámpara LED (hero)
Un rectángulo `led` que enmarca el nombre, colgado de dos cables de 1 px. Sobresale del nombre 12–16 % a los lados, 16 % arriba y 22 % abajo.
- Al cargar: los cables bajan, el tubo se enciende en 1.6 s y la luz se derrama debajo. Sin parpadeos.
- Con ratón: se mece hasta ±0.8° alrededor de un punto 70vh más arriba, con el resorte `sway`.

### SectionHeader
Antetítulo (`eyebrow` + `text-led`) → H2 en `display-lg` (20 px debajo) → entradilla opcional en `body-lg`, `text-muted`, máximo 2xl (24 px debajo). Alineado a la izquierda.

### Showcase (vitrina fija)
Tres fotos 4:5 con radio de 28 px. La sección mide 240svh y su interior queda fijo a pantalla completa.
- Empiezan como un mazo: la central al frente a escala 1.08, las laterales detrás a 0.9, giradas ±5° y oscurecidas al 55 %.
- En escritorio se abren a un tríptico (laterales a ±108 % de su ancho y 11 % más abajo; central 11 % más arriba). En móvil, a un abanico solapado (±46 %, ±7°, escala 0.84).
- Mientras se abren crece un charco de luz ámbar debajo y al final aparecen los pies de foto.
- Ancho de foto: `min(62vw, 19rem, (100svh − 11rem) × 0.8)` en móvil; `min(28vw, 22rem, (100svh − 14rem) × 0.8)` desde `md`. El tope por altura evita que se corten en pantallas bajas.

### Manifesto
Una sola frase en `statement`, precedida de un antetítulo. Cada palabra pasa de 14 % a 100 % de opacidad según avanza el scroll; una o dos palabras clave llevan `text-led`.

### ServiceCard
Tarjeta `surface` con grano, radio 28 px, filete blanco 7 %. Contenido: casilla de ícono → título → resumen → (solo destacadas) lista "incluye" con checks ámbar → abajo, precio en grande, duración con ícono de reloj, y píldora "Reservar".
- **Toda la tarjeta es el botón**: la píldora se estira con un `::after` que cubre la tarjeta.
- Cursor encima: sube 4 px, gana sombra, aparece una luz ámbar al 9 % que sigue al puntero y la píldora se vuelve ámbar con texto negro (500 ms).
- Presionada: `scale(0.985)`.
- Destacada: relleno 28–32 px, ícono de 56 px, título `title-lg`, línea de luz superior siempre visible.
- Precio sin definir → "A consultar". `priceNote` ("Desde") va encima en pequeño.

### Panel de complementos
Panel `surface-sunken` con título en `display-md` y una lista de nombre, línea de puntos y precio, en 1 → 2 → 3 columnas.

### Galería y visor (Lightbox)
Miniaturas con radio de 24 px, degradado negro abajo y etiqueta `glass-chip`. Cursor encima: la foto crece a 1.035 en 700 ms.
- **Abrir**: la foto sale de su miniatura y crece hasta su tamaño (máx. 720 px de ancho) con el resorte `smooth`; la miniatura queda oculta mientras tanto.
- **Pasar**: arrastre horizontal con inercia, una foto como máximo por gesto, borde elástico en la primera y la última. También flechas del teclado y botones laterales desde `md`. Las fotos vecinas se atenúan al 25 % según se alejan del centro.
- **Cerrar**: arrastrar hacia abajo (la foto se encoge hasta 0.55 y el fondo se aclara con el dedo); se cierra si la proyección supera el 18 % del alto. También Escape, el botón o tocar fuera. La foto vuelve a **su** miniatura heredando la velocidad del gesto, aunque hayas cambiado de foto.
- Controles en capa aparte: cerrar (44 px, arriba a la derecha), anterior/siguiente (48 px) y una píldora inferior "Título | 3 / 7". Se apartan al arrastrar.
- El foco vuelve a la miniatura de la foto en la que terminaste.

### Materiales
Fila de 4 elementos (1 → 2 → 4 columnas): muestra circular de 44 px, nombre en 1.125rem y una línea de texto. Las muestras se pintan con CSS, sin imágenes.

### BookingSheet (hoja de reservas)
Hoja inferior `surface` con grano. En móvil ocupa el ancho, con radio superior de 32 px y hasta 92svh. Desde `md` flota centrada a 24 px del borde, con 34rem de ancho y radio completo.
- **Cabecera** (zona de arrastre): asa de 40 × 6 px, antetítulo, título y botón de cierre de 36 px.
- **Cuerpo** con scroll propio: *Servicio* (filas de radio con ícono, nombre, duración y precio), *Barbero* (chips, opcional) y *Día* (7 chips de 68 × 64 px en fila deslizable, opcional).
- **Pie fijo**: resumen (servicio y precio), botón sólido "Reservar en línea" (abre el sistema de reservas externo), botón secundario "WhatsApp" (mensaje ya redactado con la selección) y una línea explicativa.
- Abre con `smooth` desde abajo y el fondo se oscurece en proporción a lo que la hoja ha subido. Se cierra con el fondo, Escape, el botón o arrastrando: si la proyección supera el 45 % de su altura, sale con la velocidad del dedo; si no, vuelve con `momentum`. Tirar hacia arriba opone resistencia.
- Abierta desde una tarjeta, llega con ese servicio ya elegido y a la vista.
- Cualquier botón "Reservar" del sitio la abre con `useBooking().openBooking(serviceId?)`.

### Visítanos
Dos columnas. Izquierda: antetítulo, H2, dirección con ícono y enlace "Cómo llegar", estado y horario agrupado (la fila de hoy en blanco con la marca "HOY" en ámbar), CTA y dos botones de ícono (WhatsApp y llamada). Derecha: foto 4:5 con radio de 32 px y, desplazado 16–24 px detrás, un marco `led` al 70 %.

### Footer
Fondo `surface-sunken` con grano. Columnas: marca con lema y redes (botones de 44 px), Explorar, Contacto, Horario. Debajo, copyright y enlace al sistema de reservas. Al final, el nombre gigante en display, solo contorno (1 px blanco al 8 %) con un relleno que se desvanece, cortado por el borde de la página.

### Foco y selección
Foco visible: contorno de 2 px `accent` separado 3 px. Selección de texto: `accent-glow` al 35 % con texto blanco.

## Do's and Don'ts

**Sí**

- Trata el acento como luz: que brille, se derrame y se refleje.
- Deja mucho negro alrededor de lo importante. El espacio vacío es parte del diseño.
- Da respuesta al presionar y sigue el dedo 1:1 en todo lo que se arrastra.
- Usa `smooth` por defecto y guarda el rebote para después de un gesto.
- Saca los materiales y el motivo de luz del local real. Si el local no tiene malla metálica, el sitio tampoco.
- Mantén una sola acción principal por pantalla.
- Pon todo dato del negocio en `src/data/`, nunca escrito dentro de un componente.
- Prueba en una pantalla baja (unos 600 px de alto), además de en móvil y escritorio.

**No**

- No añadas un segundo color de acento ni uses el acento para rellenar áreas grandes.
- No uses la fuente display en párrafos, botones, precios o formularios.
- No pongas vidrio sobre vidrio ni bordes de 1 px de color sólido.
- No animes en bucle: nada de pulsos, vaivenes ni brillos continuos.
- No bloquees la interacción durante una transición.
- No cierres ni abras nada con un camino de salida distinto al de entrada.
- No uses `text-faint` (`zinc-500`) para información que haya que leer.
- No inventes reseñas, calificaciones ni testimonios. La calificación que se muestre debe tener fuente.
- No uses sombras grises suaves para "elevar": aquí eleva la luz o la sombra negra recogida.

## Rebranding

Antes de mostrar o publicar esto para otra barbería hay que sacar todo lo de Keicy. El repositorio
contiene sus fotos reales, su dirección, teléfono, precios, nombres de barberos y calificación: nada
de eso puede salir con otro nombre.

### 1. Parámetros de marca

Decide estos nueve valores primero; el resto es mecánico.

| Parámetro | En Keicy | Cómo elegirlo |
| --- | --- | --- |
| Nombre y etiqueta | "Keicy" + "Barber Club" | El nombre corto en display; el resto, en la etiqueta |
| Voz display | Grenze Gotisch 600 | Una fuente que recoja el logo real. Tiene que aguantar 15rem y leerse en un H2 |
| Luz (acento) | Ámbar de sus LED | El color de la luz real del local (neón rojo, blanco frío, verde…) |
| Motivo de luz | Lámpara LED cuadrada colgante | El objeto luminoso más reconocible del local. Si no hay ninguno, el marco sirve como letrero de neón genérico |
| Material con grano | Concreto | Lo que domine las paredes |
| Material con patrón | Malla metálica | Un patrón que exista en el local (ladrillo, listones, azulejo) o ninguno |
| Lema | "Bienvenido al club" | El suyo |
| Ciudad, zona horaria, moneda | Cali, `America/Bogota`, COP (`es-CO`) | Los del nuevo local |
| Reservas | Weibook + WhatsApp | Su sistema, o solo WhatsApp |

### 2. Datos

| Archivo | Qué cambiar |
| --- | --- |
| `src/data/site.js` | `name`, `motto`, `address`, `mapsUrl`, `bookingUrl`, `phone`, `social`, `rating` (o quitarla), `timeZone`, `hours`, `barbers` |
| `src/data/services.js` | `services` (`id`, `name`, `icon`, `price`, `minutes`, `summary`, `includes?`, `featured?`, `priceNote?`), `extras`, y el formateador de moneda (`es-CO` / `COP`) |
| `src/data/gallery.js` + `src/assets/photos/` | Las 7 fotos con `id`, `title`, `alt`, `span` y `focus` |

Sobre las fotos:

- La vitrina usa los `id` `sala`, `estacion` y `recepcion`; Visítanos usa `fachada`. Conserva esos `id` o actualiza `Showcase.jsx` y `Visit.jsx`.
- El mosaico está calculado para **7 fotos** con esos `span`. Con otro número hay que rehacer los `span`.
- El visor asume proporción 0.87 (ancho/alto) en `FRAME_ASPECT` de `Lightbox.jsx`. Cámbialo si las fotos nuevas son distintas.
- Las de Keicy miden unos 690 px de ancho y se ven blandas en pantallas grandes. Pide al menos 1600 px.

### 3. Nombre y textos escritos en componentes

| Dónde | Qué |
| --- | --- |
| `src/components/ui/Wordmark.jsx` | "Keicy" y "Barber Club" |
| `src/components/Footer.jsx` | Nombre gigante, copyright, "Barbería en el norte de Cali", enlace "con Weibook" |
| `src/components/Navbar.jsx` | `aria-label` de la marca; nombres de los enlaces si cambian las secciones |
| `src/components/Hero.jsx` | Entradilla ("…en el norte de Cali", "una bebida mientras esperas") y la línea de calificación |
| `src/components/Manifesto.jsx` | La frase, el antetítulo "El club" y los índices de las palabras encendidas (`accent`) |
| `src/components/Services.jsx` | Título "El menú del club" y la entradilla sobre lo que incluye el corte |
| `src/components/Space.jsx` | Título, entradilla y los 4 materiales (nombre, texto y muestra) |
| `src/components/Visit.jsx` | "Te esperamos en Vipasa.", pie de la foto, saludo de WhatsApp |
| `src/components/BookingSheet.jsx` | Antetítulo, saludo del mensaje de WhatsApp, línea sobre Weibook |
| `src/components/Showcase.jsx`, `Lightbox.jsx` | `aria-label` con "el club" |
| `index.html` | `<title>`, descripción y etiquetas Open Graph |
| `public/favicon.svg` | La "K" dentro del marco LED |
| `package.json`, `README.md` | Nombre del proyecto |

Comprobación final: buscar `keicy`, `cali`, `vipasa`, `weibook` y `club` en todo el proyecto no debe devolver nada que no quieras.

### 4. Acento

El color está en dos formas y hay que cambiar ambas:

- **Clases de Tailwind** `amber-*` en `BookingSheet`, `Hero`, `Navbar`, `Services`, `Visit` y dos usos en `src/index.css` (foco y `text-led`).
- **rgb escritos a mano** (`245 158 11`, `251 191 36`, `253 230 138`, `255 241 214`, `255 236 200`, `255 245 220`): 19 líneas en `src/index.css` (`led`, `text-led`, `.btn-glass`, selección) y una o dos en `BookingSheet`, `Hero`, `Services`, `Showcase` y `Space`.

Lo más limpio en el proyecto nuevo es definir el acento una vez en `@theme` (por ejemplo `--color-accent-200…500` y un `--accent-rgb` para los halos) y apuntar todo ahí. Con un acento frío o muy saturado, baja la opacidad de los halos: el ámbar aguanta más brillo que un rojo o un azul.

### 5. Fuente display

1. Instala la nueva (`@fontsource-variable/<fuente>` o `@fontsource/<fuente>`) y desinstala `@fontsource-variable/grenze-gotisch`.
2. Cambia la importación en `src/main.jsx` y `--font-display` en `src/index.css`.
3. Revisa `display-xl`: el `line-height: 0.8` y la posición de la lámpara (`-top-[16%] -bottom-[22%]` en `Hero.jsx`) están ajustados a Grenze Gotisch. Otra fuente pedirá otros números.
4. Revisa el nombre gigante del footer (altura del recorte `clamp(5rem, 17vw, 13rem)`).

### 6. Motivos

| Motivo | Dónde vive | Si no aplica al nuevo local |
| --- | --- | --- |
| Lámpara LED colgante | `LedLamp` en `Hero.jsx`, clase `led` | Quita los cables y queda un marco de neón; o cámbialo por el objeto luminoso del local |
| Marco LED desplazado | `Visit.jsx` | Se mantiene o se quita; no afecta al resto |
| Malla metálica | Clase `mesh`, usada en `Hero.jsx` y `Space.jsx` | Sustituye el patrón en `src/index.css` o elimina los dos `div` |
| Grano de concreto | Clase `concrete` | Sirve para casi cualquier pared; se puede dejar |
| Lista de materiales | `materials` en `Space.jsx` | Reescríbela con los materiales reales |

### 7. Reservas

La hoja termina en dos salidas: un enlace externo (`site.bookingUrl`) y WhatsApp (`whatsappUrl(mensaje)`).
Si la nueva barbería solo usa WhatsApp, quita el botón sólido y convierte el de WhatsApp en la acción
principal. Si no tiene barberos con nombre, vacía `barbers` y elimina ese bloque.

### 8. Repositorio

- Crea un repositorio nuevo: el remoto actual es `keicy-barber-club`.
- Borra `dist/` y vuelve a compilar; la compilación guardada lleva el contenido de Keicy.
- En `src/index.css` hay tres definiciones sin uso que se pueden borrar: `headline`, `hairline` y `--ease-apple`.
