import { z } from "zod";

export const registroSchema = z.object({
  // Datos personales
  nombreCompleto: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(200, "El nombre no puede exceder 200 caracteres"),
  email: z
    .string()
    .email("Ingresa un email válido")
    .max(254, "Email demasiado largo"),
  telefono: z.string().optional(),
  pais: z.string().default("Panamá"),
  ciudad: z.string().optional(),

  // Información profesional
  empresa: z.string().optional(),
  cargo: z.string().optional(),
  sectorIndustria: z
    .enum([
      "banca",
      "seguros",
      "tecnologia",
      "gobierno",
      "retail",
      "salud",
      "energia",
      "telecomunicaciones",
      "logistica",
      "educacion",
      "otro",
    ])
    .optional(),
  experienciaGestionDatos: z.enum(["ninguna", "1-2", "3-5", "5+"]),

  // Rol y motivación
  rolParticipacion: z.enum(["estudiante", "mentor"], {
    message: "Selecciona tu rol de participación",
  }),
  motivacion: z
    .string()
    .min(20, "Cuéntanos un poco más sobre tu motivación")
    .max(1000, "Máximo 1000 caracteres"),
  objetivoCertificacion: z.boolean().default(false),
  disponibilidadHoraria: z.enum([
    "noches",
    "fines_de_semana",
    "ambos",
  ]),
  tieneDMBOK: z.boolean().default(false),

  // Consentimiento - Ley 81
  aceptaTratamientoDatos: z.literal(true, {
    message: "Debes aceptar el tratamiento de datos para continuar",
  }),
  aceptaComunicaciones: z.boolean().default(false),
});

export type RegistroFormData = z.infer<typeof registroSchema>;
