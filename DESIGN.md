# DESIGN.md

Sistema de diseño del sitio **Estudio Contable SZ** (landing, es_AR). Este documento es la fuente de verdad del sistema visual; los tokens viven en `src/styles/global.css` y los componentes los consumen vía CSS modules.

## Modo

**Persuade** — landing de marketing que debe generar confianza y pedir acción ("Solicitar Consulta", formulario de contacto, WhatsApp). El diseño es el producto: seriedad profesional + calidez de estudio familiar.

## Identidad

- Tonada "confiable y cercana": rojo profundo de acento sobre neutros casi blancos y grafito.
- Navegación ancla de una página; acciones: header CTA, form de contacto y botón flotante de WhatsApp.
- Marca: **Estudio Contable SZ** · CUIT 20-29027177-1 · Burzaco, Buenos Aires.

## Tipografía

**Self-hosted** en `public/fonts/` (subset latin), declaradas con `@font-face` en `src/styles/global.css` y precargadas en `src/layouts/Layout.astro`. Sin Google Fonts (CSP sin orígenes externos de fuentes).

| Rol | Fuente | Pesos | Tokens |
|---|---|---|---|
| Headings | Space Grotesk | 300–700 (se usa 700) | `--font-heading` |
| Body / UI | Inter | 100–900 (se usa 400–600) | `--font-body` |

**Escala tipográfica** (token → uso):

| Token | Valor | Uso |
|---|---|---|
| `--fs-display` | 4rem / 64px | H1 hero (`.heroTitle`) |
| `--fs-3xl` | 2.25rem / 36px | Headings de sección (About, Servicios, Contacto) |
| `--fs-2xl` | 2rem / 32px | Números de stats (`.abStatNum`) y H1 de `/privacidad` |
| `--fs-28` | 28px | Títulos de modal |
| `--fs-22` | 22px | Título de modal en ≤640px |
| `--fs-lg` | 1.3rem | Descripción hero |
| `--text-base` | 15px | Intros de sección |
| `--text-sm2` | 14px | Detalle modal, items |
| `--text-sm` | 13px | Descripciones de cards |
| `--text-xs` | 12px | Labels de stats, textos auxiliares |
| `--fs-sm` | 0.875rem | Footer, copyright, legal |
| `--fs-xs` | 0.75rem | Labels del contacto |

Line-heights: hero 1.05, headings 1.15, body 1.6–1.75.

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

### Hero (dashboard glass)

| Token | Valor | Uso |
|---|---|---|
| `--warm-bg` | `color-mix(in srgb, var(--secondary-color) 60%, var(--bg-color))` | Fin del gradiente cálido del hero |
| `--grid-line` | `color-mix(in srgb, var(--text-color) 4%, transparent)` | Grilla técnica del fondo del hero |
| `--glass-bg` | `color-mix(in srgb, var(--secondary-color) 42%, transparent)` | Fondo de las cards glass |
| `--glass-border` | `color-mix(in srgb, var(--secondary-color) 78%, transparent)` | Borde de las cards glass |
| `--glass-shadow` | `0 22px 44px -22px color-mix(in srgb, var(--primary-color) 22%, transparent)` | Sombra de las cards glass |
| `--glow` | `color-mix(in srgb, var(--primary-color) 12%, transparent)` | Glow radial detrás del stack |
| `--track` | `color-mix(in srgb, var(--text-color) 10%, transparent)` | Pista del donut de balance |

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
| `--header-height` | 4.5rem | Alto del header sticky; alimenta `scroll-margin-top` de las secciones ancla |

- Secciones centradas: `max-width: var(--container-max); margin-inline: auto;`.
- Header: `padding-inline: max(var(--pad-x), calc((100vw - var(--container-max)) / 2))`.
- Hero: fondo con gradiente cálido (`--bg-color` → `--warm-bg`), grilla técnica (`--grid-line`, desvanecida en radial) y glow rojo (`--glow`) detrás del stack; fundido inferior hacia `--bg-color`, `min-height: calc(100svh - var(--header-height))`, layout split (texto + stack de cards `HeroDashboard`), contenido en `--container-max`. En ≤768px una columna, blur degradado.
- Breakpoints: 768px (header/contacto), 640px (modal/privacidad responsive), 420px (se oculta el nombre de marca en el header).

## Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4px | Botones de header |
| `--radius-md` | 6px | Inputs, submit |
| `--radius-lg` | 8px | Chips de iconos, tooltip |
| `--radius-xl` | 12px | Cards, stats, iconos de modal |
| `--radius-2xl` | 16px | Contenedor del modal |
| `--radius-pill` | 999px | Divider, pills |
| `--radius-full` | 50% | Botón WhatsApp |

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-header` | `0 4px 30px rgba(0,0,0,.06)` | Header sticky |
| `--shadow-modal` | `0 25px 50px -12px rgba(0,0,0,.25)` | Modal de servicios |
| `--shadow-whatsapp` | `0 4px 12px rgba(0,0,0,.25)` | Botón flotante |

## Motion

Tokens en `global.css`:

| Token | Valor | Uso |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing de entradas y reveals |
| `--dur-enter` | `0.7s` | Duración de entrada del hero |
| `--dur-reveal` | `0.6s` | Duración de reveals al scroll (Fase 2) |
| `--reveal-dist` | `24px` | Desplazamiento inicial de los reveals (Fase 2) |

Reglas:

- Animar solo `opacity` y propiedades de transform **independientes** (`translate`, `scale`, `rotate`) para mantener el trabajo en el compositor y evitar conflictos con `floatY`.
- Todo vive bajo `@media (prefers-reduced-motion: no-preference)`; con reduced-motion el estado final queda visible sin animación.
- Sin JS de por medio el contenido se ve igual: ninguna animación deja el contenido oculto salvo durante su reproducción.
- **Hero**: entrada on-load con stagger (H1 → subhead → CTAs → cards), `floatY` continuo en las cards, micro-animaciones del dashboard (dibujo del arco del donut, ticks del checklist, pop de los vencimientos) y parallax suave del glow (`::before`) y del stack vía la custom property `--scroll` (listener `scroll` pasivo + `rAF`; se anula con reduced-motion).
- **Secciones**: reveal al scroll con `IntersectionObserver` sobre `[data-reveal]` (clase `html.js` agregada inline para no ocultar contenido sin JS; `is-revealed` se agrega al entrar en viewport y se deja de observar). Stagger por `--reveal-i` (`transition-delay: calc(var(--reveal-i, 0) * 70ms)`). Count-up de los stats de About (`[data-count]` + `data-to`/`data-prefix`/`data-suffix`) vía `rAF`; reduced-motion muestra el valor final. Header con `data-scrolled` (sombra y fondo más opacos al scrollear) y entrada fade+scale del botón de WhatsApp.

## Componentes

- **Header** (`.header`) — sticky, blanco translúcido, altura `--header-height`, nav con underline animado al hover. Menú hamburguesa fullscreen en ≤768px. CTA "Solicitar Consulta" visible también en mobile (compacta); el nombre de marca se oculta ≤420px. Las secciones ancla usan `scroll-margin-top: var(--header-height)`.
- **Hero** — fondo con gradiente cálido (`--bg-color` → `--warm-bg`) + grilla técnica (`--grid-line`, enmascarada en radial) + glow rojo (`--glow`) y fundido inferior hacia `--bg-color` para empalmar con About. Layout **split**: texto a la izquierda (H1 + subhead + CTA primario "Solicitar consulta" → `#contacto` y secundario WhatsApp) y a la derecha el stack `HeroDashboard.astro`: cards **glass** (`--glass-*`, `backdrop-filter`) apiladas y flotando con motivos contables abstractos — **Vencimientos** (calendario de puntos), **Balance** (donut), **Documentos** (papeles apilados), checklist de servicios (IVA · Sueldos · Ingresos Brutos · Balance) y **crest** con el isotipo `LogoMark`. Sin cifras ni claims (decorativo, `aria-hidden`). Float con `prefers-reduced-motion`; en ≤768px una columna, texto centrado, se ocultan barras/docs y se degrada el blur (fondo opaco).
- **About** — H2 con `<em>` en primario, intro larga, grid de 4 valores con SVG chips, divider, grid de 4 stats.
- **Servicios / Consultoría** — cards clickeables (1s hover o click) que abren modal flip con detalle + "Qué incluye", con CTA visible "Ver detalle". Servicios se agrupa en 4 clusters (Contabilidad e impuestos · Sueldos y administración · Sociedades y control · Trámites, inspecciones y otros) sobre grid `auto-fit minmax(180px,1fr)`. Consultoría (5 cards, sin agrupar) es la especialización en Agencias de Viajes y Turismo. Fondo alterno.
- **Contacto** — grid con áreas `form` / `trust` / `info`: form (EmailJS, nombre / email / teléfono opcional / tipo de servicio / mensaje + consentimiento de privacidad) + bloque de confianza "Respaldo profesional" (credenciales verificables: UNLZ, docencia, +15 años, 4 profesionales, +100 clientes) + datos (dirección, teléfono, email). Estado de envío con `role="status"`; ante error ofrece WhatsApp/correo como canal alternativo. En ≤768px el bloque de confianza pasa arriba del form.
- **Footer** — centrado, copyright dinámico, link legal, data fiscal en texto + Data Fiscal de AFIP (imagen oficial `DATAWEB.jpg` en https, 100px de ancho).
- **WhatsApp** — botón flotante 60px fijo abajo-derecha, tooltip al hover, `#25D366`.
- **Privacidad** — página de lectura en `--content-max`, jerarquía h1→h2→h3 con `--font-heading`, links en primario, `code` en mono.

## Notas

- No hay comentarios en código (regla del repo).
- Fuentes de Google Fonts: actualizar CSP en `vercel.json` solo si se agregan orígenes nuevos (Google Fonts ya cubierto).
- Deuda detectada: números como `#4a4a5a`/`#5a5a6e` y `1100px` hoy resueltos con tokens en `global.css`; revisar en futuros PRs que no vuelvan a aparecer mágicos.
