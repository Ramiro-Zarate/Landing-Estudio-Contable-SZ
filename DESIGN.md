# DESIGN.md

Sistema de diseño del sitio **Estudio Contable SZ** (landing, es_AR). Este documento es la fuente de verdad del sistema visual; los tokens viven en `src/styles/global.css` y los componentes los consumen vía CSS modules.

## Modo

**Persuade** — landing de marketing que debe generar confianza y pedir acción ("Solicitar Consulta", formulario de contacto, WhatsApp). El diseño es el producto: seriedad profesional + calidez de estudio familiar.

## Identidad

- Tonada "confiable y cercana": rojo profundo de acento sobre neutros casi blancos y grafito.
- Navegación ancla de una página; acciones: header CTA, form de contacto y botón flotante de WhatsApp.
- Marca: **Estudio Contable SZ** · CUIT 20-29027177-1 · Burzaco, Buenos Aires.

## Tipografía

Cargadas vía Google Fonts en `src/layouts/Layout.astro` (preconnect + 2 `<link>`).

| Rol | Fuente | Pesos | Tokens |
|---|---|---|---|
| Headings | Space Grotesk | 300–700 (se usa 700) | `--font-heading` |
| Body / UI | Inter | 100–900 (se usa 400–600) | `--font-body` |

**Escala tipográfica** (token → uso):

| Token | Valor | Uso |
|---|---|---|
| `--fs-display` | 4rem / 64px | H1 hero (`.heroTitle`) |
| `--fs-3xl` | 34px | Headings de sección (About, Servicios, Contacto) |
| `--fs-2xl` | 36px | Números de stats (`.abStatNum`) |
| `--fs-28` | 28px | Títulos de modal |
| `--fs-22` | 22px | Título de modal en ≤640px |
| `--fs-2xl` (priv) | 2.25rem / 36px | H1 de `/privacidad` |
| `--fs-lg` | 1.3rem | Descripción hero |
| `--text-base` | 15px | Intros de sección |
| `--text-sm2` | 14px | Detalle modal, items |
| `--text-sm` | 13px | Descripciones de cards |
| `--text-xs` | 12px | Badges, labels de stats |
| `--fs-sm` | 0.875rem | Footer, copyright, legal |
| `--fs-xs` | 0.75rem | Labels del contacto |

Line-heights: hero 1, headings 1.15, body 1.6–1.75.

## Paleta

Tokens en `src/styles/global.css`.

### Core (existentes)

| Token | Valor | Uso |
|---|---|---|
| `--bg-color` | `#fbfbfe` | Fondo base |
| `--bg-alt` | `#f3f3f5` | Fondo alterno (Servicios, Contacto) |
| `--text-color` | `#050316` | Texto principal / tooltip WhatsApp |
| `--primary-color` | `#9d1a15` | Acento rojo (CTA, iconos, bordes hover) |
| `--secondary-color` | `#ede7e0` | Chips de iconos / hover suaves |
| `--hover-color` | `#cacaca` | (reserva) |

### Semánticos (agregados para estandarizar mágicos)

| Token | Valor | Uso |
|---|---|---|
| `--primary-hover` | `#6b1210` | Hover de botones y links primarios |
| `--text-muted` | `#5a5a6e` | Textos secundarios (footer, subtítulos, contact) |
| `--text-soft` | `#4a4a5a` | Textos de intros / detalle modal |
| `--border` | `#e5e0d8` | Bordes de cards y stats |
| `--border-input` | `#d0ccc7` | Bordes de inputs |
| `--placeholder` | `#999` | Placeholders de formulario |
| `--white` | `#fff` | Fondo de cards y texto sobre primario |
| `--whatsapp` | `#25D366` | Botón flotante de WhatsApp |
| `--focus-ring` | `rgba(157,26,21,.1)` | Anillo de foco de inputs |

### Estados

- Primario hover → `--primary-hover` (`#6b1210`), `translateY(-1px/-2px)` + sombra.
- Cards hover → borde `--primary-color`, `translateY(-2/-3px)`, barra de acento inferior animada, chip de icono pasa a `--primary-color` con SVG en `--white`.

## Layout

| Token | Valor | Uso |
|---|---|---|
| `--container-max` | 1100px | Ancho máximo de contenido en secciones y header |
| `--content-max` | 720px | Ancho de lectura en `/privacidad` |
| `--section-padding-y` | 5rem | Padding vertical de secciones |
| `--section-padding-y-mobile` | 3rem | Idem en ≤768px |
| `--pad-x` | 1.5rem | Padding lateral de secciones |
| `--pad-x-mobile` | 1rem | Idem en ≤768px |

- Secciones centradas: `max-width: var(--container-max); margin-inline: auto;`.
- Header: `padding-inline: max(var(--pad-x), calc((100vw - var(--container-max)) / 2))`.
- Hero: sección a 70vh con overlay lineal `rgba(10,10,10,.82→.35)`, contenido en `--container-max`.
- Breakpoints: 768px (header/contacto), 640px (modal/privacidad responsive).

## Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4px | Botones de header |
| `--radius-md` | 6px | Inputs, submit |
| `--radius-lg` | 8px | Chips de iconos, tooltip |
| `--radius-xl` | 12px | Cards, stats, iconos de modal |
| `--radius-2xl` | 16px | Contenedor del modal |
| `--radius-pill` | 999px | Badges, pills |
| `--radius-full` | 50% | Botón WhatsApp |

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-header` | `0 4px 30px rgba(0,0,0,.06)` | Header sticky |
| `--shadow-modal` | `0 25px 50px -12px rgba(0,0,0,.25)` | Modal de servicios |
| `--shadow-whatsapp` | `0 4px 12px rgba(0,0,0,.25)` | Botón flotante |

## Componentes

- **Header** (`.header`) — sticky, blanco translúcido, altura 4.5rem, nav con underline animado al hover. Menú hamburguesa fullscreen en ≤768px. CTA "Solicitar Consulta".
- **Hero** — imagen `fondo_hero.webp` + overlay oscuro, badge pill, H1 display, CTA primario.
- **About** — badge, H2 con `<em>` en primario, intro larga, grid de 4 valores con SVG chips, divider, grid de 4 stats.
- **Servicios / Consultoría** — grid `auto-fit minmax(180px,1fr)` de cards clickeables (2s hover o click) que abren modal flip con detalle + "Qué incluye". Fondo alterno. Consultoría es la especialización en Agencias de Viajes y Turismo.
- **Contacto** — grid `1fr 300px`: form (EmailJS, nombre/email/mensaje) + datos (dirección, teléfono, email).
- **Footer** — centrado, copyright dinámico, link legal, data fiscal en texto + QR fiscal de AFIP (pendiente corrección, ver AGENTS.md).
- **WhatsApp** — botón flotante 60px fijo abajo-derecha, tooltip al hover, `#25D366`.
- **Privacidad** — página de lectura en `--content-max`, jerarquía h1→h2→h3 con `--font-heading`, links en primario, `code` en mono.

## Notas

- No hay comentarios en código (regla del repo).
- Fuentes de Google Fonts: actualizar CSP en `vercel.json` solo si se agregan orígenes nuevos (Google Fonts ya cubierto).
- Deuda detectada: números como `#4a4a5a`/`#5a5a6e` y `1100px` hoy resueltos con tokens en `global.css`; revisar en futuros PRs que no vuelvan a aparecer mágicos.