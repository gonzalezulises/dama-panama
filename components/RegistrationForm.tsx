"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { registroSchema, type RegistroFormData } from "@/lib/validation";
import PrivacyConsent from "@/components/PrivacyConsent";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const sectores = [
  { value: "banca", label: "Banca" },
  { value: "seguros", label: "Seguros" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "gobierno", label: "Gobierno" },
  { value: "retail", label: "Retail" },
  { value: "salud", label: "Salud" },
  { value: "energia", label: "Energía" },
  { value: "telecomunicaciones", label: "Telecomunicaciones" },
  { value: "logistica", label: "Logística" },
  { value: "educacion", label: "Educación" },
  { value: "otro", label: "Otro" },
];

const experiencia = [
  { value: "ninguna", label: "Sin experiencia" },
  { value: "1-2", label: "1-2 años" },
  { value: "3-5", label: "3-5 años" },
  { value: "5+", label: "Más de 5 años" },
];

const disponibilidad = [
  { value: "mananas", label: "Mañanas" },
  { value: "tardes", label: "Tardes" },
  { value: "noches", label: "Noches" },
  { value: "fines_de_semana", label: "Fines de semana" },
  { value: "flexible", label: "Flexible" },
];

const inputStyles =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 transition-colors focus:border-dama-blue focus:outline-none focus:ring-2 focus:ring-dama-blue/20";
const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
const errorStyles = "mt-1 text-xs text-accent-red";

export default function RegistrationForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroFormData>({
    resolver: standardSchemaResolver(registroSchema),
    defaultValues: {
      pais: "Panamá",
      objetivoCertificacion: false,
      tieneDMBOK: false,
      aceptaComunicaciones: false,
    },
  });

  async function onSubmit(data: RegistroFormData) {
    setServerError("");
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || "Error al procesar el registro");
        return;
      }

      router.push("/grupo-estudio/confirmacion");
    } catch {
      setServerError("Error de conexión. Intenta de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Sección 1: Datos Personales */}
      <fieldset>
        <legend className="text-lg font-semibold text-dama-blue-dark font-[family-name:var(--font-heading)]">
          Datos Personales
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nombreCompleto" className={labelStyles}>
              Nombre completo <span className="text-accent-red">*</span>
            </label>
            <input
              id="nombreCompleto"
              type="text"
              className={inputStyles}
              {...register("nombreCompleto")}
            />
            {errors.nombreCompleto && (
              <p className={errorStyles}>{errors.nombreCompleto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelStyles}>
              Email <span className="text-accent-red">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={inputStyles}
              {...register("email")}
            />
            {errors.email && (
              <p className={errorStyles}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className={labelStyles}>
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              className={inputStyles}
              {...register("telefono")}
            />
          </div>

          <div>
            <label htmlFor="pais" className={labelStyles}>
              País
            </label>
            <input
              id="pais"
              type="text"
              className={inputStyles}
              {...register("pais")}
            />
          </div>

          <div>
            <label htmlFor="ciudad" className={labelStyles}>
              Ciudad
            </label>
            <input
              id="ciudad"
              type="text"
              className={inputStyles}
              {...register("ciudad")}
            />
          </div>
        </div>
      </fieldset>

      {/* Sección 2: Información Profesional */}
      <fieldset>
        <legend className="text-lg font-semibold text-dama-blue-dark font-[family-name:var(--font-heading)]">
          Información Profesional
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="empresa" className={labelStyles}>
              Empresa
            </label>
            <input
              id="empresa"
              type="text"
              className={inputStyles}
              {...register("empresa")}
            />
          </div>

          <div>
            <label htmlFor="cargo" className={labelStyles}>
              Cargo
            </label>
            <input
              id="cargo"
              type="text"
              className={inputStyles}
              {...register("cargo")}
            />
          </div>

          <div>
            <label htmlFor="sectorIndustria" className={labelStyles}>
              Sector / Industria
            </label>
            <select
              id="sectorIndustria"
              className={inputStyles}
              {...register("sectorIndustria")}
            >
              <option value="">Selecciona...</option>
              {sectores.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="experienciaGestionDatos" className={labelStyles}>
              Experiencia en gestión de datos{" "}
              <span className="text-accent-red">*</span>
            </label>
            <select
              id="experienciaGestionDatos"
              className={inputStyles}
              {...register("experienciaGestionDatos")}
            >
              <option value="">Selecciona...</option>
              {experiencia.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
            {errors.experienciaGestionDatos && (
              <p className={errorStyles}>
                {errors.experienciaGestionDatos.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Sección 3: Motivación */}
      <fieldset>
        <legend className="text-lg font-semibold text-dama-blue-dark font-[family-name:var(--font-heading)]">
          Motivación y Disponibilidad
        </legend>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="motivacion" className={labelStyles}>
              ¿Por qué quieres participar en este grupo?{" "}
              <span className="text-accent-red">*</span>
            </label>
            <textarea
              id="motivacion"
              rows={4}
              className={inputStyles}
              {...register("motivacion")}
            />
            {errors.motivacion && (
              <p className={errorStyles}>{errors.motivacion.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="disponibilidadHoraria" className={labelStyles}>
                Disponibilidad horaria{" "}
                <span className="text-accent-red">*</span>
              </label>
              <select
                id="disponibilidadHoraria"
                className={inputStyles}
                {...register("disponibilidadHoraria")}
              >
                <option value="">Selecciona...</option>
                {disponibilidad.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {errors.disponibilidadHoraria && (
                <p className={errorStyles}>
                  {errors.disponibilidadHoraria.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="objetivoCertificacion"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-dama-blue focus:ring-dama-blue"
              {...register("objetivoCertificacion")}
            />
            <label
              htmlFor="objetivoCertificacion"
              className="text-sm text-gray-700"
            >
              ¿Planeas obtener la certificación CDMP?
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="tieneDMBOK"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-dama-blue focus:ring-dama-blue"
              {...register("tieneDMBOK")}
            />
            <label htmlFor="tieneDMBOK" className="text-sm text-gray-700">
              ¿Ya tienes el libro DMBOK?
            </label>
          </div>
        </div>
      </fieldset>

      {/* Sección 4: Consentimiento */}
      <fieldset>
        <legend className="text-lg font-semibold text-dama-blue-dark font-[family-name:var(--font-heading)]">
          Consentimiento
        </legend>
        <div className="mt-4 space-y-4">
          <PrivacyConsent />

          <div className="flex items-start gap-3">
            <input
              id="aceptaTratamientoDatos"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-dama-blue focus:ring-dama-blue"
              {...register("aceptaTratamientoDatos")}
            />
            <label
              htmlFor="aceptaTratamientoDatos"
              className="text-sm text-gray-700"
            >
              <span className="text-accent-red">*</span> Autorizo a DAMA Panamá
              a recopilar y procesar mis datos personales para los fines del
              Grupo de Estudio DMBOK, de acuerdo con la Ley 81 de 26 de marzo
              de 2019 sobre Protección de Datos Personales.
            </label>
          </div>
          {errors.aceptaTratamientoDatos && (
            <p className={errorStyles}>
              {errors.aceptaTratamientoDatos.message}
            </p>
          )}

          <div className="flex items-start gap-3">
            <input
              id="aceptaComunicaciones"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-dama-blue focus:ring-dama-blue"
              {...register("aceptaComunicaciones")}
            />
            <label
              htmlFor="aceptaComunicaciones"
              className="text-sm text-gray-700"
            >
              Acepto recibir comunicaciones sobre eventos, certificaciones y
              actividades de DAMA Panamá.
            </label>
          </div>
        </div>
      </fieldset>

      {/* Error del servidor */}
      {serverError && (
        <div className="rounded-lg border border-accent-red/20 bg-red-50 p-4 text-sm text-accent-red">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dama-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-dama-blue-dark disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Enviar Registro
          </>
        )}
      </button>
    </form>
  );
}
