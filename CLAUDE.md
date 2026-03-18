# CLAUDE.md — Contexto para Claude Code

## Qué es este proyecto

Sitio web de DAMA Panamá (capítulo de DAMA International). Next.js 16, App Router, TypeScript, Tailwind CSS 4. Desplegado en Vercel.

**Producción:** https://dama-panama.vercel.app
**Repo:** https://github.com/gonzalezulises/dama-panama

## Comandos clave

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción (verificar antes de push)
npm run lint      # ESLint
vercel --prod     # Deploy manual a producción
vercel env ls     # Listar variables de entorno en Vercel
vercel env pull   # Descargar env vars a .env.local
```

## Estructura del proyecto

- `app/` — Páginas y API routes (Next.js App Router)
- `app/admin/` — Panel de administración protegido por middleware
- `app/api/registro/route.ts` — Endpoint principal de registro (POST)
- `app/api/admin/` — Endpoints protegidos del admin (login, registros)
- `components/` — Componentes React reutilizables
- `lib/` — Utilidades: validación (Zod), DB, rate-limit, email, auth
- `middleware.ts` — Protege rutas `/admin/*` con token HMAC-SHA256

## Servicios externos (todos con graceful degradation)

| Servicio | Propósito | Variables de entorno |
|----------|-----------|---------------------|
| Vercel Postgres (Neon) | Base de datos | `POSTGRES_URL`, `POSTGRES_HOST`, etc. |
| Upstash Redis | Rate limiting persistente | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| Cloudflare Turnstile | CAPTCHA anti-bots | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| Resend | Email de confirmación | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` |

Si las variables no están configuradas, cada servicio degrada silenciosamente:
- Redis → fallback a rate-limit in-memory
- Turnstile → widget no se renderiza, server no valida
- Resend → log y continúa sin enviar email
- Admin → retorna 503 si `ADMIN_SECRET` no existe

## Patrones y convenciones

- **Idioma del código:** Variables y funciones en inglés, UI y mensajes en español
- **Validación:** Zod schemas en `lib/validation.ts`, compartidos entre client y server
- **Formularios:** React Hook Form con `standardSchemaResolver` de Zod
- **Estilos:** Tailwind CSS 4 con theme custom en `globals.css` (colores: `dama-blue`, `dama-blue-dark`, `accent-red`, `accent-green`, `accent-gold`)
- **Fuentes:** Plus Jakarta Sans (headings via `--font-heading`), Source Sans 3 (body via `--font-body`)
- **DB queries:** Siempre parametrizados con template literals de `@vercel/postgres`
- **Auth admin:** HMAC-SHA256 token en cookie httpOnly `admin_token` (24h TTL)
- **Rate limiting:** `rateLimit(ip)` es async, retorna `{ success: boolean }`

## Tabla principal: `registros_grupo_estudio`

```sql
id SERIAL PRIMARY KEY,
nombre_completo VARCHAR(200) NOT NULL,
email VARCHAR(254) NOT NULL UNIQUE,
telefono VARCHAR(20),
pais VARCHAR(100) DEFAULT 'Panamá',
ciudad VARCHAR(100),
empresa VARCHAR(200),
cargo VARCHAR(200),
sector_industria VARCHAR(100),
experiencia_gestion_datos VARCHAR(50),
motivacion TEXT,
objetivo_certificacion BOOLEAN DEFAULT FALSE,
disponibilidad_horaria VARCHAR(100),
tiene_libro_dmbok BOOLEAN DEFAULT FALSE,
acepta_tratamiento_datos BOOLEAN NOT NULL DEFAULT FALSE,
acepta_comunicaciones BOOLEAN DEFAULT FALSE,
ip_registro VARCHAR(45),
fecha_consentimiento TIMESTAMPTZ NOT NULL,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
estado VARCHAR(20) DEFAULT 'pendiente'  -- pendiente | aprobado | rechazado
```

Índices: `email`, `estado`, `created_at`.

## Patrones de código

### Query a DB
```typescript
import { sql } from "@vercel/postgres";
const { rows } = await sql`SELECT * FROM registros_grupo_estudio WHERE estado = ${estado}`;
```

### Validación (Zod + React Hook Form)
```typescript
import { registroSchema } from "@/lib/validation";
const parsed = registroSchema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
```

### Rate limiting
```typescript
import { rateLimit } from "@/lib/rate-limit";
const { success } = await rateLimit(ip); // async, Redis o fallback in-memory
if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
```

## Cosas importantes

- **Ley 81 de Panamá:** El formulario cumple con la ley de protección de datos. No cambiar la lógica de consentimiento sin revisar compliance.
- **Next.js 16:** Usa `middleware.ts` que muestra warning de deprecación (recomienda `proxy`). Funciona correctamente.
- **`RESEND_FROM_EMAIL`** está en `onboarding@resend.dev` (testing). Cambiar cuando se verifique dominio propio en Resend.
- **Tabla DB:** `registros_grupo_estudio` con campo `estado` (pendiente/aprobado/rechazado). Schema en `lib/db.ts`.
- **El admin NO tiene funcionalidad de cambiar estado** todavía — solo visualiza registros. Es una mejora pendiente.

## Estado actual (Feb 2026)

Todas las env vars están configuradas en Vercel producción. El sitio está funcional con:
- Registro con CAPTCHA y rate limiting
- Email de confirmación post-registro
- Panel admin con vista de registros
- Todas las páginas informativas (DMBOK, Certificación, Nosotros, Contacto)
