import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Verify auth
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const offset = (page - 1) * limit;
  const search = searchParams.get("search")?.trim() || "";
  const estado = searchParams.get("estado")?.trim() || "";

  let registros;
  let countResult;

  if (search && estado) {
    const searchPattern = `%${search}%`;
    [registros, countResult] = await Promise.all([
      sql`
        SELECT id, nombre_completo, email, telefono, pais, empresa,
               experiencia_gestion_datos, rol_participacion, estado, created_at
        FROM registros_grupo_estudio
        WHERE (nombre_completo ILIKE ${searchPattern} OR email ILIKE ${searchPattern})
          AND estado = ${estado}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total FROM registros_grupo_estudio
        WHERE (nombre_completo ILIKE ${searchPattern} OR email ILIKE ${searchPattern})
          AND estado = ${estado}
      `,
    ]);
  } else if (search) {
    const searchPattern = `%${search}%`;
    [registros, countResult] = await Promise.all([
      sql`
        SELECT id, nombre_completo, email, telefono, pais, empresa,
               experiencia_gestion_datos, rol_participacion, estado, created_at
        FROM registros_grupo_estudio
        WHERE nombre_completo ILIKE ${searchPattern} OR email ILIKE ${searchPattern}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total FROM registros_grupo_estudio
        WHERE nombre_completo ILIKE ${searchPattern} OR email ILIKE ${searchPattern}
      `,
    ]);
  } else if (estado) {
    [registros, countResult] = await Promise.all([
      sql`
        SELECT id, nombre_completo, email, telefono, pais, empresa,
               experiencia_gestion_datos, rol_participacion, estado, created_at
        FROM registros_grupo_estudio
        WHERE estado = ${estado}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total FROM registros_grupo_estudio
        WHERE estado = ${estado}
      `,
    ]);
  } else {
    [registros, countResult] = await Promise.all([
      sql`
        SELECT id, nombre_completo, email, telefono, pais, empresa,
               experiencia_gestion_datos, rol_participacion, estado, created_at
        FROM registros_grupo_estudio
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total FROM registros_grupo_estudio
      `,
    ]);
  }

  return NextResponse.json({
    registros: registros.rows,
    total: parseInt(countResult.rows[0].total),
    page,
    limit,
  });
}
