# AGENTS.md

Runbook operativo del proyecto **Estudio Contable SZ**.

## Project overview

- **Sitio**: landing del estudio contable (es_AR).
- **Stack**: Astro 7 + React 19 (islands), CSS modules.
- **Deploy**: Vercel (`vercel.json` con headers de seguridad + CSP).
- **Dominio público**: `estudiocontablesz.com` (referenciado en `public/robots.txt`).
- **Repo**: este.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build estático
npm run preview  # preview del build
```

Variables de entorno actuales (ver `.env.example`):

- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_KEY`
- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_WHATSAPP_NUMBER` (número con código de país, ej. `5491128580480`; si no está seteada, el botón usa el placeholder `0000000000`)

> **No commitear `.env`** — ya está en `.gitignore`. En Vercel se configuran en Project → Settings → Environment Variables.

> **Diseño**: `DESIGN.md` en la raíz es la fuente de verdad del sistema visual; los tokens viven en `src/styles/global.css` (`:root`) y los componentes los consumen vía CSS modules. No reintroducir valores mágicos (colores, anchos de 1100px, radios, sombras) fuera de los tokens.

## ⚠️ Pendientes prioritarios

### QR fiscal del footer — **ALTA PRIORIDAD** (workaround aplicado 2026-09-04)

El QR roto fue **removido del footer** como workaround (generaba error de red en consola y un link muerto). El footer queda con el texto fiscal `Sergio Omar Zarate · CUIT 20-29027177-1` hasta tener los datos reales.

El estado original del bug (referencia, no está más en código):

- La imagen usada (`https://www.afip.gob.ar/images/f960/DATAWEB.jpg`) era el **placeholder genérico de AFIP**, no un QR real con los datos del estudio.
- El `href` apuntaba al verificador de **comprobantes electrónicos**, no al sistema de la **Constancia de Inscripción** (F.960).
- La CSP de `vercel.json:28` ya permite `https://www.afip.gob.ar` (sigue aplicable cuando se restaure).

**Para arreglarlo**:

1. **Manual (vos)**: entrar a AFIP con CUIT 20-29027177-1 y clave fiscal → "Constancia de Inscripción" (F.960) → ver la constancia → copiar la URL que aparece asociada al QR oficial. Si AFIP te da una imagen del QR para descargar, guardarla como `public/qr-fiscal.png` (o `.jpg`).
2. **Si tenés URL pero no imagen**: regenero `public/qr-fiscal.png` con `scripts/generate-fiscal-qr.mjs` (lo borré en un revert anterior; lo vuelvo a crear) usando el paquete `qrcode` que ya está en `node_modules`.
3. **Si tenés imagen**: la guardás en `public/qr-fiscal.png` y yo actualizo el `src` y el `href` del `<a>`.
4. **Yo**: actualizo `src/components/Footer.astro` con los datos correctos y rebuild.

**Workaround mientras tanto**: el footer ya muestra `Sergio Omar Zarate · CUIT 20-29027177-1` en texto. Si querés sacar el QR roto y dejar sólo el texto hasta tener los datos correctos, decime y lo hago en un cambio mínimo.

**Por qué es ALTA prioridad**: vos indicás que el QR fiscal es requisito para sitios web de servicios. Si lo dejamos como está, queda como un link muerto en producción y un QR que no escanea.

### Google Analytics 4 — **HECHO** (2026-07-27)

Implementado y deployado en producción. Measurement ID: `G-WPHS1P9JP5`.

- `src/components/Analytics.astro` — nuevo componente con snippet gtag.js, `is:inline` + `define:vars`, carga condicional a `PUBLIC_GA_MEASUREMENT_ID` (no rompe preview).
- `src/layouts/Layout.astro` — importa y monta `<Analytics />` en `<head>` después de `<Seo />`.
- `vercel.json` (línea 28) — CSP ampliada: `script-src` + `frame-src` suman `https://www.googletagmanager.com`, `connect-src` suma `https://www.google-analytics.com` y `https://region1.google-analytics.com`, `img-src` suma `https://www.google-analytics.com`.
- `.env.example` — agregado `PUBLIC_GA_MEASUREMENT_ID=`.
- `src/pages/privacidad.astro` — sección 2.d pasada de "en proceso de integración" a estado activo con "activo desde {mes de deploy}" (fecha dinámica calculada con `toLocaleDateString('es-AR')`). Actualizadas también secciones 3, 5, 6 y 8 para reflejar que GA4 ya no es condicional.

Env var seteada en Vercel (Production): `PUBLIC_GA_MEASUREMENT_ID=G-WPHS1P9JP5`.

> **Pendiente menor**: el container `GTM-NHVF892R` quedó huérfano. Se puede borrar desde tagmanager.google.com. No urge, no afecta nada en producción.

## Dominio

Dominio público del estudio: **`estudiocontablesz.com`**.

> **Pendiente**: confirmar proveedor DNS real (¿NIC Argentina, GoDaddy, Cloudflare, otro?). Anotar acá cuando se sepa, porque es donde se editan los records para Workspace y Analytics.

## Google Workspace — compra y setup

Pasos a ejecutar manualmente desde `workspace.google.com` con una cuenta Google del estudio.

1. Comprar plan **Business Starter** (suficiente para un estudio chico).
2. Durante el alta, indicar dominio primario: `estudiocontablesz.com`.
3. Verificar propiedad del dominio vía registro **TXT** (Google lo da).
4. Crear buzones:
   - `info@estudiocontablesz.com` — casilla general / pública.
   - `contacto@estudiocontablesz.com` — formulario web.
   - Un buzón por cada profesional del equipo.
5. Migrar correo actual al nuevo `info@` cuando esté validado.
6. Configurar **SPF** y **DKIM** desde la consola de Google y aplicar los records en el proveedor DNS.
7. Reemplazar los **MX records** actuales por los de Google (`aspmx.l.google.com`, etc.).

> **Pendiente**: nombres de los profesionales para crear los buzones. `About.astro` dice "3 profesionales" pero no hay nombres públicos. Anotar la lista acá cuando esté.

## Google Analytics 4 — setup

> **HECHO 2026-07-27**. Measurement ID real: `G-WPHS1P9JP5`. Ver bloque detallado en "Cambios recientes".

Parte **manual** (vos):

1. Crear propiedad GA4 en `analytics.google.com` apuntando a `https://estudiocontablesz.com`.
2. Copiar el **Measurement ID** (`G-XXXXXXXXXX`).
3. Setear `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` en:
   - Vercel → Project → Settings → Environment Variables (Production).
   - `.env` local (para dev).

Parte **código** (cuando esté el ID real):

- [x] Crear `src/components/Analytics.astro` con snippet `gtag.js` condicional (no carga si no hay env var, para no romper preview).
- [x] Importar y montar `<Analytics />` dentro del `<head>` en `src/layouts/Layout.astro`.
- [x] Actualizar CSP en `vercel.json` (línea 28):
  - `script-src`: sumar `https://www.googletagmanager.com`.
  - `connect-src`: sumar `https://www.google-analytics.com` y `https://region1.google-analytics.com`.
  - `img-src`: sumar `https://www.google-analytics.com`.
- [x] Agregar `PUBLIC_GA_MEASUREMENT_ID=` a `.env.example`.

> **Nota (obsoleta, reemplazada el 2026-07-27)**: la versión original de esta sección decía que "no hace falta tocar la política" cuando se activara el script. Eso fue cierto al momento de redactarla, pero la política **sí se tocó** en la misma sesión de activación para reflejar el estado activo. Ver bloque "PR de Google Analytics 4" en "Cambios recientes".

## Fixes menores pendientes

Cosas detectadas en la revisión, no críticas, para hacer en otro PR:

- [ x ] `src/components/Contacto.jsx:112` — `info@estudiosz.com.ar` → `info@estudiocontablesz.com` (inconsistente con el dominio público). **(Hecho)**
- [ x ] `astro.config.mjs` — agregar `site: 'https://estudiocontablesz.com'` para que `<link rel="canonical">` y `og:image` (en `src/components/Seo.astro:15`) resuelvan bien en build. **(Hecho)**
- [ x ] `src/layouts/Layout.astro:5-19` — los meta tags (`description`, `title`, `icon`) están hardcodeados en el layout. El componente `src/components/Seo.astro` existe pero no se usa. Migrar para evitar duplicación y ganar el `og:image`/Twitter cards. **(Parcial: el Layout ahora acepta prop `seo?` opcional y la página `/privacidad` lo usa. La home sigue pasando por el default del Layout para no tocarla en este PR.)**

## Cambios recientes (PR actual)

### Sistema de diseño + audit (2026-09-04)

- `DESIGN.md` — nueva fuente de verdad del sistema visual (tipografía, paleta, layout, radios, sombras, componentes).
- `src/styles/global.css` — tokens completos en `:root` (`--container-max`, `--content-max`, `--pad-x`, `--fs-*`, `--radius-*`, `--shadow-*`, colores semánticos) + reset mínimo (`box-sizing`, base html/body) + `.sr-only` + `:focus-visible` global + `prefers-reduced-motion: reduce` global.
- Todos los `.module.css` migrados a tokens (sin valores mágicos de 1100px, grises, radios, sombras).
- Audit (Lighthouse local mobile): **a11y 100 / best-practices 100 / SEO 100 / perf 89**.
- Bugs: WhatsApp duplicado en `/privacidad` removido; `WhatsappButton.astro` usa `PUBLIC_WHATSAPP_NUMBER` (fallback placeholder).
- A11y: `lang="es-AR"`, cards de Servicios/Consultoría con `<span class="sr-only">Ver más…</span>` (reemplaza aria-label que fallaba `label-content-name-mismatch`).
- Perf: preload de woff2 (Space Grotesk 700 + Inter 400 latin); `Contacto client:visible`; H1 del hero con `clamp()`.
- Scroll-spy: nav del header marca la sección activa con `[data-active]` (Intersection→scroll con `offsetTop`, inline en `Header.astro`; solo corre si existen las secciones de la home, no en `/privacidad`).
- QR fiscal roto removido del footer (ver pendientes).

### PR de política de privacidad y footer fiscal

### Política de privacidad (`/privacidad`)

Nueva página estática en `src/pages/privacidad.astro` + `src/pages/privacidad.module.css`.

- Redacción en `es_AR`, alineada con la **Ley 25.326 de Protección de Datos Personales** y la **AAIP**.
- 11 secciones: identidad del responsable, datos que recopilamos (formulario, WhatsApp, Google Fonts, **GA4 en proceso de integración**), finalidad, base legal, transferencias internacionales, plazos de conservación, derechos ARCO, cookies, seguridad, cambios y contacto.
- Datos del responsable: **Sergio Omar Zarate · CUIT 20-29027177-1 · Burzaco, Buenos Aires · 11 2858-0480 · `administracion@estudiocontablesz.com`**.
- Canal único para derechos del titular y contacto: `administracion@estudiocontablesz.com` (mailto con subject prellenado).
- **Meta tags propios** vía `Seo.astro`: `title`, `description`, `canonical` (`https://estudiocontablesz.com/privacidad`), `og:image`, Twitter cards, JSON-LD tipo `WebPage`.
- Fecha "Última actualización" dinámica con `toLocaleDateString('es-AR')`.

### Footer (`src/components/Footer.astro`)

Antes: solo `&copy; {year}`.
Ahora: tres elementos centrados, con `padding: 48px 1.5rem` (punto medio del rango 40–60px que definiste) y `gap: 12px`:

1. Copyright dinámico.
2. `<nav aria-label="Enlaces legales">` con link a `/privacidad`.
3. Data fiscal en texto: `Sergio Omar Zarate · CUIT 20-29027177-1`.
4. **QR fiscal de AFIP** (`http://qr.afip.gob.ar/?qr=...`) con la imagen F.960 estándar. El `border="0"` original del HTML se reemplazó por `.fiscalQr img { border: 0; }` en `Footer.module.css` (HTML5 deprecaba el atributo). Se agregaron `alt`, `rel="noopener noreferrer"`, `width`/`height`, `loading="lazy"` y `decoding="async"`.

### Otros cambios del PR

- `src/components/Contacto.jsx` — email actualizado a `administracion@estudiocontablesz.com` y dirección a `Burzaco, Buenos Aires`. (El teléfono sigue como placeholder `+54 11 1234-5678` — fuera de scope de este PR.)
- `src/layouts/Layout.astro` — refactor mínimo: acepta prop `seo?` opcional. Si no se pasa, conserva los meta tags originales de la home (no rompe nada). Si se pasa, monta `<Seo {...seo} />`.
- `astro.config.mjs` — `site: 'https://estudiocontablesz.com'` agregado.

### Buzones — discrepancia a resolver

`AGENTS.md` (sección Google Workspace) lista como buzones planificados:
- `info@estudiocontablesz.com` — general / pública.
- `contacto@estudiocontablesz.com` — formulario web.

La política de privacidad y el footer usan **`administracion@estudiocontablesz.com`** como canal único (info + derechos ARCO + contacto). Decidir si:
- a) Crear también `administracion@` cuando se configuren los buzones, o
- b) Reemplazar `administracion@` por `info@` en la política/footer.

### PR de Google Analytics 4 (2026-07-27)

> Activación de GA4 con gtag.js. Measurement ID: `G-WPHS1P9JP5`. Deployado en producción y verificado en Tiempo real.

**Componentes nuevos**

- `src/components/Analytics.astro` — nuevo. Snippet gtag.js oficial con dos directivas clave: `is:inline` (evita que Astro lo bundlee como módulo y lo difiera, lo que rompería el tracking) y `define:vars` (inyecta la env var al build sin que el script pase por el bundler). Carga condicional: si `PUBLIC_GA_MEASUREMENT_ID` no está seteada, el componente no renderiza nada y el sitio sigue funcionando (clave para previews de Vercel).

**Archivos modificados**

- `src/layouts/Layout.astro` — importa `<Analytics />` y lo monta en `<head>` inmediatamente después de `<Seo />` (lo más alto posible en head para mejor tracking del pageview inicial).
- `vercel.json` (línea 28, CSP) — agregados los orígenes de Google:
  - `script-src` + `frame-src`: `https://www.googletagmanager.com`
  - `connect-src`: `https://www.google-analytics.com` y `https://region1.google-analytics.com`
  - `img-src`: `https://www.google-analytics.com` (pixel de fallback)
- `.env.example` — agregada línea `PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id`.
- `src/pages/privacidad.astro` — política pasada de "en proceso" a activa:
  - **2.d** título y párrafos reescritos. Removido "(en proceso de integración)". Agregado "activo desde {mes de deploy}" con fecha dinámica (`toLocaleDateString('es-AR', {year, month})`).
  - **3** bullet 4: condicional "(cuando GA4 esté activo)" → "a través de Google Analytics 4".
  - **5** bullet Google LLC: "(Google Fonts y, en proceso, Google Analytics)" → "(Google Fonts y Google Analytics 4)".
  - **6** bullet 3: "(cuando esté activo)" quitado.
  - **8** Cookies: reescrita en voz activa (ya no dice "una vez que se active").

**Setup manual (vos)**

- Creada propiedad GA4 en `analytics.google.com` apuntando a `https://estudiocontablesz.com`.
- Seteada env var `PUBLIC_GA_MEASUREMENT_ID=G-WPHS1P9JP5` en Vercel (Production).
- Local NO se setea para no contaminar las métricas con tráfico de desarrollo (verificado que el build funciona y el sitio renderiza idéntico sin la env var).

**Limpieza**

- Removido snippet de Google Tag Manager (`GTM-NHVF892R`) que estaba mal pegado en `Layout.astro`. El container queda huérfano — se puede borrar desde tagmanager.google.com cuando se recuerde (no urge).

**Decisión descartada: GTM vs gtag.js**

- Originalmente se pegó el snippet de GTM por confusión (el panel de GA4 ofrece ambos). Se descartó GTM porque para un sitio estático de un estudio contable, la flexibilidad de GTM (gestionar múltiples tags sin tocar código) no aporta valor, y la política de privacidad ya estaba redactada alrededor de "Google Analytics 4" (no "Tag Manager"). gtag.js directo es la opción más simple para el caso de uso.

## Conventions

- **Idioma UI**: `es_AR` (`src/components/Seo.astro:21`).
- **Sin comentarios en código** (regla global del agente).
- **React islands solo si hace falta**. Hoy: `Servicios.jsx`, `Contacto.jsx`. El resto son `.astro` estáticos.
- **Headers de seguridad** (`vercel.json`): al sumar un origen nuevo (CDN, analytics, fonts, etc.), actualizar CSP en el mismo PR.
- **Variables públicas**: prefijo `PUBLIC_` requerido por Astro.
- **Estilo de commits**: `<type>: <description>` en inglés, lowercase, sin punto final (ver historial).

## Notas operativas

- Backup manual del sitio: el contenido vive en este repo, así que `git` es el backup. Assets pesados en `public/`.
- Si se cambia el dominio público, actualizar `public/robots.txt` (URL del sitemap) y `astro.config.mjs` (`site`).
