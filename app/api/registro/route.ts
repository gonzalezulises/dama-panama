import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { registroSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Obtener IP para rate limiting y trazabilidad (Ley 81)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting
    const { success: allowed } = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Demasiados intentos. Intenta más tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validar datos
    const validatedData = registroSchema.parse(body);

    // Insertar en base de datos
    const result = await sql`
      INSERT INTO registros_grupo_estudio (
        nombre_completo,
        email,
        telefono,
        pais,
        ciudad,
        empresa,
        cargo,
        sector_industria,
        experiencia_gestion_datos,
        motivacion,
        objetivo_certificacion,
        disponibilidad_horaria,
        tiene_libro_dmbok,
        acepta_tratamiento_datos,
        acepta_comunicaciones,
        ip_registro,
        fecha_consentimiento
      ) VALUES (
        ${validatedData.nombreCompleto},
        ${validatedData.email},
        ${validatedData.telefono || null},
        ${validatedData.pais},
        ${validatedData.ciudad || null},
        ${validatedData.empresa || null},
        ${validatedData.cargo || null},
        ${validatedData.sectorIndustria || null},
        ${validatedData.experienciaGestionDatos},
        ${validatedData.motivacion},
        ${validatedData.objetivoCertificacion},
        ${validatedData.disponibilidadHoraria},
        ${validatedData.tieneDMBOK},
        ${validatedData.aceptaTratamientoDatos},
        ${validatedData.aceptaComunicaciones},
        ${ip},
        NOW()
      )
      RETURNING id
    `;

    console.log(`Registro exitoso: id=${result.rows[0].id}, ip=${ip}`);

    return NextResponse.json({
      success: true,
      message: "Registro exitoso",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Datos inválidos. Verifica los campos e intenta de nuevo." },
        { status: 400 }
      );
    }

    // Error de email duplicado - mensaje genérico para evitar enumeración
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "23505"
    ) {
      return NextResponse.json(
        { success: false, message: "No se pudo completar el registro. Es posible que ya exista una cuenta con este email." },
        { status: 409 }
      );
    }

    console.error("Error en registro:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
