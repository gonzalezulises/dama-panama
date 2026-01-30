import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Award, ExternalLink, CheckCircle, ArrowRight } from "lucide-react";

const niveles = [
  {
    name: "Associate",
    score: "60%",
    description:
      "Nivel inicial. Demuestra conocimiento fundamental del DMBOK y los principios de gestión de datos.",
  },
  {
    name: "Practitioner",
    score: "70%",
    description:
      "Nivel intermedio. Demuestra competencia práctica en la aplicación de principios de gestión de datos.",
  },
  {
    name: "Master",
    score: "80%",
    description:
      "Nivel avanzado. Demuestra dominio profundo y capacidad de liderazgo en gestión de datos.",
  },
  {
    name: "Fellow",
    score: "Invitación",
    description:
      "Máximo nivel. Reconocimiento por contribuciones excepcionales a la disciplina de gestión de datos.",
  },
];

export default function CertificacionPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dama-blue-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Award className="text-accent-gold" size={36} />
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
                Certificación CDMP
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-dama-blue-100">
              Certified Data Management Professional: la certificación más
              reconocida en gestión de datos a nivel global.
            </p>
          </div>
        </section>

        {/* Sobre CDMP */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                ¿Qué es el CDMP?
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  El <strong>CDMP (Certified Data Management Professional)</strong>{" "}
                  es la certificación profesional otorgada por DAMA International
                  que valida el conocimiento y las competencias en gestión de
                  datos.
                </p>
                <p>
                  El examen está basado en el contenido del{" "}
                  <strong>DMBOK2</strong> y cubre las 11 áreas de conocimiento de
                  la gestión de datos. Es reconocida globalmente por
                  organizaciones de todos los sectores.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://cdmp.info/exams/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-dama-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-dama-blue-dark"
                >
                  <ExternalLink size={18} />
                  Información del examen CDMP
                </a>
                <Link
                  href="/grupo-estudio"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-dama-blue px-6 py-3 text-base font-semibold text-dama-blue transition-colors hover:bg-dama-blue-50"
                >
                  Prepárate con nosotros
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Niveles */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
              Niveles de Certificación
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {niveles.map((nivel) => (
                <div
                  key={nivel.name}
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Award className="text-accent-gold" size={20} />
                    <h3 className="text-lg font-bold text-dama-blue-dark">
                      {nivel.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-dama-blue">
                    {nivel.score}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    {nivel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                ¿Por qué certificarte?
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Reconocimiento internacional de tus competencias",
                  "Diferenciación profesional en el mercado laboral",
                  "Validación de conocimientos basada en el estándar DMBOK",
                  "Acceso a una red global de profesionales certificados",
                  "Mayor potencial de crecimiento salarial y profesional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 shrink-0 text-accent-green"
                      size={20}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
