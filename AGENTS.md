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

> **No commitear `.env`** — ya está en `.gitignore`. En Vercel se configuran en Project → Settings → Environment Variables.

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

Parte **manual** (vos):

1. Crear propiedad GA4 en `analytics.google.com` apuntando a `https://estudiocontablesz.com`.
2. Copiar el **Measurement ID** (`G-XXXXXXXXXX`).
3. Setear `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` en:
   - Vercel → Project → Settings → Environment Variables (Production).
   - `.env` local (para dev).

Parte **código** (cuando esté el ID real):

- [ ] Crear `src/components/Analytics.astro` con snippet `gtag.js` condicional (no carga si no hay env var, para no romper preview).
- [ ] Importar y montar `<Analytics />` dentro del `<head>` en `src/layouts/Layout.astro`.
- [ ] Actualizar CSP en `vercel.json` (línea 28):
  - `script-src`: sumar `https://www.googletagmanager.com`.
  - `connect-src`: sumar `https://www.google-analytics.com` y `https://region1.google-analytics.com`.
  - `img-src`: sumar `https://www.google-analytics.com`.
- [ ] Agregar `PUBLIC_GA_MEASUREMENT_ID=` a `.env.example`.

> **Pendiente**: hacerlo después de tener el Measurement ID real.
>
> **Nota**: la política de privacidad en `/privacidad` ya cubre la mención de Google Analytics 4 como "en proceso de integración" (sección 2.d). Cuando se active el script real, **no** hace falta tocar la política: alcanza con actualizar la fecha de "Última actualización" y la sección de cookies.

## Fixes menores pendientes

Cosas detectadas en la revisión, no críticas, para hacer en otro PR:

- [ x ] `src/components/Contacto.jsx:112` — `info@estudiosz.com.ar` → `info@estudiocontablesz.com` (inconsistente con el dominio público). **(Hecho)**
- [ x ] `astro.config.mjs` — agregar `site: 'https://estudiocontablesz.com'` para que `<link rel="canonical">` y `og:image` (en `src/components/Seo.astro:15`) resuelvan bien en build. **(Hecho)**
- [ x ] `src/layouts/Layout.astro:5-19` — los meta tags (`description`, `title`, `icon`) están hardcodeados en el layout. El componente `src/components/Seo.astro` existe pero no se usa. Migrar para evitar duplicación y ganar el `og:image`/Twitter cards. **(Parcial: el Layout ahora acepta prop `seo?` opcional y la página `/privacidad` lo usa. La home sigue pasando por el default del Layout para no tocarla en este PR.)**

## Cambios recientes (PR actual)

> **Resumen del PR de política de privacidad y footer fiscal.**

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
