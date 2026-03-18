# DAMA Panamá

Sitio web oficial de **DAMA Panamá** (Data Management Association – Capítulo Panamá), organización profesional sin fines de lucro dedicada a promover la gestión de datos como disciplina profesional.

**Producción:** https://dama-panama.vercel.app

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 (strict mode) |
| UI | React 19 |
| Estilos | Tailwind CSS 4 |
| Iconos | Lucide React |
| Formularios | Tally (embed) |
| Base de datos | Vercel Postgres (Neon) |
| Rate Limiting | Upstash Redis (sliding window) + fallback in-memory |
| CAPTCHA | Cloudflare Turnstile |
| Email | Resend |
| Auth (Admin) | HMAC-SHA256 tokens con cookie httpOnly |
| Deploy | Vercel (CI/CD automático desde GitHub) |

---

## Arquitectura

```
dama-panama/
├── app/
│   ├── layout.tsx                        # Layout global, SEO, fuentes, Turnstile script
│   ├── page.tsx                          # Landing principal
│   ├── icon.svg                          # Favicon SVG (data network)
│   ├── globals.css                       # Tailwind v4 theme (colores DAMA)
│   ├── nosotros/page.tsx                 # Sobre DAMA Internacional y Panamá
│   ├── dmbok/page.tsx                    # 11 áreas de conocimiento DMBOK
│   ├── certificacion/page.tsx            # Certificación CDMP (niveles, beneficios)
│   ├── contacto/page.tsx                 # Info de contacto + aviso de privacidad
│   ├── grupo-estudio/
│   │   ├── page.tsx                      # Info del programa + formulario Tally embed
│   │   └── confirmacion/page.tsx         # Página de éxito post-registro
│   ├── admin/
│   │   ├── layout.tsx                    # Layout admin (sin Header/Footer públicos)
│   │   ├── login/page.tsx                # Página de login con contraseña
│   │   └── page.tsx                      # Dashboard: tabla de registros con búsqueda, filtros, paginación
│   └── api/
│       ├── registro/route.ts             # POST: validación, CAPTCHA, rate limit, DB insert, email
│       └── admin/
│           ├── login/route.ts            # POST: autenticación / DELETE: logout
│           └── registros/route.ts        # GET: listado paginado con filtros (protegido)
├── components/
│   ├── Header.tsx                        # Nav responsiva con menú mobile
│   ├── Footer.tsx                        # Links, redes sociales, copyright
│   ├── Hero.tsx                          # Hero con gradient y CTAs
│   ├── TallyEmbed.tsx                    # Embed del formulario Tally (carga dinámica)
│   ├── RegistrationForm.tsx              # Formulario legacy (React Hook Form + Turnstile)
│   ├── PrivacyConsent.tsx                # Aviso Ley 81 de Panamá
│   └── Turnstile.tsx                     # Wrapper Cloudflare Turnstile widget
├── lib/
│   ├── validation.ts                     # Zod schema (datos personales, profesionales, consentimiento)
│   ├── db.ts                             # Conexión Vercel Postgres + schema SQL
│   ├── rate-limit.ts                     # Upstash Redis sliding window + fallback in-memory
│   ├── email.ts                          # Envío de email de confirmación con Resend
│   └── auth.ts                           # HMAC-SHA256 token creation/verification (admin)
├── middleware.ts                          # Protección de rutas /admin/* (valida cookie token)
├── public/
│   └── images/                           # Imágenes estáticas
├── next.config.ts                        # Security headers (HSTS, X-Frame, nosniff, etc.)
├── tsconfig.json                         # TypeScript strict mode
└── .env.example                          # Template de variables de entorno
```

---

## Flujo de Registro

```
Usuario → TallyEmbed.tsx (iframe Tally, form ID: rjE2Yv)
  ├── Formulario gestionado por Tally (validación, campos, UI)
  ├── Respuestas almacenadas en Tally
  └── Redirect a /grupo-estudio/confirmacion (configurado en Tally)
```

> **Nota:** El formulario anterior (React Hook Form + Zod + Turnstile + API route) fue reemplazado por un embed de Tally para simplificar el mantenimiento. El componente `RegistrationForm.tsx` y el endpoint `POST /api/registro` se conservan como legacy pero ya no están en uso activo.

---

## Panel de Administración

**URL:** `/admin` (protegido por middleware)

- **Login:** `/admin/login` — autenticación con `ADMIN_SECRET`
- **Dashboard:** `/admin` — tabla de registros con:
  - Búsqueda por nombre/email
  - Filtro por estado (pendiente, aprobado, rechazado)
  - Paginación (20 registros por página)
  - Logout

**Autenticación:**
- El login genera un token HMAC-SHA256 firmado con `ADMIN_SECRET`
- Token almacenado en cookie `admin_token` (httpOnly, secure, sameSite: lax)
- Expira en 24 horas
- Middleware valida el token en todas las rutas `/admin/*` excepto `/admin/login`

---

## Seguridad

### Headers HTTP (`next.config.ts`)
- `X-Frame-Options: DENY` — anti-clickjacking
- `X-Content-Type-Options: nosniff` — anti-MIME sniffing
- `Strict-Transport-Security` — fuerza HTTPS (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — bloquea geolocation, mic, camera

### API (`/api/registro`)
- **Rate limiting:** 5 requests/hora por IP (Upstash Redis persistent, fallback in-memory)
- **CAPTCHA:** Cloudflare Turnstile (validación server-side)
- **Validación:** Zod schema server-side antes de DB
- **SQL injection:** Queries parametrizados (`@vercel/postgres`)
- **Error handling:** Mensajes genéricos (sin leaking de internals ni enumeración de emails)
- **Audit logging:** Registros exitosos logueados con ID e IP

### Admin (`/admin/*`)
- **Middleware:** Verifica token HMAC-SHA256 en cookie httpOnly
- **Token expiration:** 24 horas
- **Endpoints protegidos:** Verificación de token en cada request API

### Graceful Degradation
Todos los servicios externos tienen fallback si no están configurados:
- **Upstash Redis:** Fallback a rate limiting in-memory
- **Turnstile:** Widget no se renderiza, server omite validación
- **Resend:** Log de email omitido, registro continúa normalmente
- **Admin:** Retorna 503 si `ADMIN_SECRET` no está configurado

### Compliance — Ley 81 de Protección de Datos (Panamá)
- Consentimiento informado obligatorio (checkbox)
- Aviso de privacidad con derechos ARCO
- Trazabilidad: IP y timestamp del consentimiento
- Retención máxima: 7 años
- Contacto: privacidad@damapanama.org

---

## Base de Datos

### Tabla: `registros_grupo_estudio`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PK | Identificador |
| `nombre_completo` | VARCHAR(200) | Nombre del participante |
| `email` | VARCHAR(254) UNIQUE | Email (constraint único) |
| `telefono` | VARCHAR(20) | Teléfono (opcional) |
| `pais` | VARCHAR(100) | País (default: Panamá) |
| `ciudad` | VARCHAR(100) | Ciudad (opcional) |
| `empresa` | VARCHAR(200) | Empresa (opcional) |
| `cargo` | VARCHAR(200) | Cargo (opcional) |
| `sector_industria` | VARCHAR(100) | Sector profesional |
| `experiencia_gestion_datos` | VARCHAR(50) | Nivel de experiencia |
| `rol_participacion` | VARCHAR(20) | estudiante/mentor (default: estudiante) |
| `motivacion` | TEXT | Motivación para participar |
| `objetivo_certificacion` | BOOLEAN | Planea certificarse CDMP |
| `disponibilidad_horaria` | VARCHAR(100) | Horario preferido |
| `tiene_libro_dmbok` | BOOLEAN | Tiene el libro DMBOK |
| `acepta_tratamiento_datos` | BOOLEAN | Consentimiento Ley 81 |
| `acepta_comunicaciones` | BOOLEAN | Opt-in comunicaciones |
| `ip_registro` | VARCHAR(45) | IP del registro |
| `fecha_consentimiento` | TIMESTAMPTZ | Momento del consentimiento |
| `estado` | VARCHAR(20) | pendiente/aprobado/rechazado |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Última actualización |

**Índices:** `email` (UNIQUE), `estado`, `created_at`

---

## Variables de Entorno

```bash
# Vercel Postgres (configurado automáticamente al conectar DB)
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Admin
ADMIN_SECRET=""

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""

# Email (Resend)
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""
```

**Estado actual en Vercel:** Todas las variables están configuradas en producción.

---

## Setup Local

```bash
# Clonar
git clone https://github.com/gonzalezulises/dama-panama.git
cd dama-panama

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con credenciales (o dejar vacías para graceful degradation)

# Obtener env vars de Vercel (si tienes acceso)
vercel env pull

# Desarrollo
npm run dev

# Build
npm run build
```

---

## Deploy

El proyecto está conectado a Vercel con CI/CD automático. Cada push a `main` dispara un deploy a producción.

```bash
# Deploy manual (si se necesita)
vercel --prod
```

**Servicios conectados:**
- **Vercel Postgres (Neon):** Base de datos `dama-panama-db` en región iad1
- **Upstash Redis:** Base `dama-panama-ratelimit` para rate limiting persistente
- **Cloudflare Turnstile:** Widget `DAMA Panamá` en dominio `dama-panama.vercel.app`
- **Resend:** Email con `onboarding@resend.dev` (cambiar a dominio propio cuando esté verificado)

---

## Referencias

- [DAMA International](https://dama.org/)
- [Certificación CDMP](https://cdmp.info/)
- [Ley 81 de 2019 — Protección de Datos Personales (Panamá)](https://antai.gob.pa/)
- [Upstash Redis](https://upstash.com/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
- [Resend](https://resend.com/)
