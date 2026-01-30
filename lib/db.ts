import { sql } from "@vercel/postgres";

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS registros_grupo_estudio (
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
      fecha_consentimiento TIMESTAMP WITH TIME ZONE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      estado VARCHAR(20) DEFAULT 'pendiente'
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_email ON registros_grupo_estudio(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_estado ON registros_grupo_estudio(estado)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_created_at ON registros_grupo_estudio(created_at)`;
}

export { sql };
