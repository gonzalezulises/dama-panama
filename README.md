# DAMA Panam&aacute;

Sitio web oficial de **DAMA Panam&aacute;** (Data Management Association &ndash; Cap&iacute;tulo Panam&aacute;), organizaci&oacute;n profesional sin fines de lucro dedicada a promover la gesti&oacute;n de datos como disciplina profesional.

**Producci&oacute;n:** https://dama-panama.vercel.app

---

## Stack Tecnol&oacute;gico

| Capa | Tecnolog&iacute;a |
|------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 (strict mode) |
| UI | React 19 |
| Estilos | Tailwind CSS 4 |
| Iconos | Lucide React |
| Formularios | React Hook Form 7 + Zod 4 |
| Base de datos | Vercel Postgres |
| Deploy | Vercel (CI/CD autom&aacute;tico desde GitHub) |

---

## Arquitectura

```
dama-panama/
├── app/
│   ├── layout.tsx                     # Layout global, SEO, fuentes
│   ├── page.tsx                       # Landing principal
│   ├── icon.svg                       # Favicon SVG (data network)
│   ├── globals.css                    # Tailwind v4 theme (colores DAMA)
│   ├── nosotros/page.tsx              # Sobre DAMA Internacional y Panam&aacute;
│   ├── dmbok/page.tsx                 # 11 &aacute;reas de conocimiento DMBOK
│   ├── certificacion/page.tsx         # Certificaci&oacute;n CDMP (niveles, beneficios)
│   ├── contacto/page.tsx              # Info de contacto + aviso de privacidad
│   ├── grupo-estudio/
│   │   ├── page.tsx                   # Info del programa + formulario de registro
│   │   └── confirmacion/page.tsx      # P&aacute;gina de &eacute;xito post-registro
│   └── api/
│       └── registro/route.ts          # POST endpoint (validaci&oacute;n, rate limit, DB)
├── components/
│   ├── Header.tsx                     # Nav responsiva con men&uacute; mobile
│   ├── Footer.tsx                     # Links, redes sociales, copyright
│   ├── Hero.tsx                       # Hero con gradient y CTAs
│   ├── RegistrationForm.tsx           # Formulario multi-secci&oacute;n con validaci&oacute;n
│   └── PrivacyConsent.tsx             # Aviso Ley 81 de Panam&aacute;
├── lib/
│   ├── validation.ts                  # Zod schema (datos personales, profesionales, consentimiento)
│   ├── db.ts                          # Conexi&oacute;n Vercel Postgres + schema SQL
│   └── rate-limit.ts                  # Rate limiter in-memory (IP-based)
├── public/
│   └── images/                        # Im&aacute;genes est&aacute;ticas
├── next.config.ts                     # Security headers (HSTS, CSP, X-Frame, etc.)
├── tsconfig.json                      # TypeScript strict mode
└── .env.example                       # Template de variables de entorno
```

---

## Seguridad

### Headers HTTP (`next.config.ts`)
- `X-Frame-Options: DENY` &mdash; anti-clickjacking
- `X-Content-Type-Options: nosniff` &mdash; anti-MIME sniffing
- `Strict-Transport-Security` &mdash; fuerza HTTPS (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` &mdash; bloquea geolocation, mic, camera

### API (`/api/registro`)
- **Rate limiting:** 5 requests/hora por IP
- **Validaci&oacute;n:** Zod schema server-side antes de DB
- **SQL injection:** Queries parametrizados (`@vercel/postgres`)
- **Error handling:** Mensajes gen&eacute;ricos (sin leaking de internals ni enumeraci&oacute;n de emails)
- **Audit logging:** Registros exitosos logueados con ID e IP

### Compliance &mdash; Ley 81 de Protecci&oacute;n de Datos (Panam&aacute;)
- Consentimiento informado obligatorio (checkbox)
- Aviso de privacidad con derechos ARCO
- Trazabilidad: IP y timestamp del consentimiento
- Retenci&oacute;n m&aacute;xima: 7 a&ntilde;os
- Contacto: privacidad@damapanama.org

---

## Base de Datos

### Tabla: `registros_grupo_estudio`

| Campo | Tipo | Descripci&oacute;n |
|-------|------|-------------|
| `id` | SERIAL PK | Identificador |
| `nombre_completo` | VARCHAR(200) | Nombre del participante |
| `email` | VARCHAR(254) UNIQUE | Email (constraint &uacute;nico) |
| `telefono` | VARCHAR(20) | Tel&eacute;fono (opcional) |
| `pais` | VARCHAR(100) | Pa&iacute;s (default: Panam&aacute;) |
| `ciudad` | VARCHAR(100) | Ciudad (opcional) |
| `empresa` | VARCHAR(200) | Empresa (opcional) |
| `cargo` | VARCHAR(200) | Cargo (opcional) |
| `sector_industria` | VARCHAR(100) | Sector profesional |
| `experiencia_gestion_datos` | VARCHAR(50) | Nivel de experiencia |
| `motivacion` | TEXT | Motivaci&oacute;n para participar |
| `objetivo_certificacion` | BOOLEAN | Planea certificarse CDMP |
| `disponibilidad_horaria` | VARCHAR(100) | Horario preferido |
| `tiene_libro_dmbok` | BOOLEAN | Tiene el libro DMBOK |
| `acepta_tratamiento_datos` | BOOLEAN | Consentimiento Ley 81 |
| `acepta_comunicaciones` | BOOLEAN | Opt-in comunicaciones |
| `ip_registro` | VARCHAR(45) | IP del registro |
| `fecha_consentimiento` | TIMESTAMPTZ | Momento del consentimiento |
| `estado` | VARCHAR(20) | pendiente/confirmado/activo/inactivo |
| `created_at` | TIMESTAMPTZ | Fecha de creaci&oacute;n |
| `updated_at` | TIMESTAMPTZ | &Uacute;ltima actualizaci&oacute;n |

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
# Editar .env.local con credenciales de Vercel Postgres

# Desarrollo
npm run dev

# Build
npm run build
```

---

## Deploy

El proyecto est&aacute; conectado a Vercel con CI/CD autom&aacute;tico. Cada push a `main` dispara un deploy a producci&oacute;n.

```bash
# Deploy manual (si se necesita)
vercel --prod
```

---

## Referencias

- [DAMA International](https://dama.org/)
- [Certificaci&oacute;n CDMP](https://cdmp.info/)
- [Ley 81 de 2019 &mdash; Protecci&oacute;n de Datos Personales (Panam&aacute;)](https://antai.gob.pa/)
