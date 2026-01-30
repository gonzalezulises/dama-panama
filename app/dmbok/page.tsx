import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Shield,
  Building2,
  Database,
  HardDrive,
  Lock,
  GitMerge,
  FileText,
  Tag,
  BarChart3,
  Tags,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const areas = [
  { num: 1, name: "Gobierno de Datos", icon: Shield },
  { num: 2, name: "Arquitectura de Datos", icon: Building2 },
  { num: 3, name: "Modelado y Diseño de Datos", icon: Database },
  { num: 4, name: "Almacenamiento y Operaciones de Datos", icon: HardDrive },
  { num: 5, name: "Seguridad de Datos", icon: Lock },
  { num: 6, name: "Integración e Interoperabilidad de Datos", icon: GitMerge },
  { num: 7, name: "Gestión de Documentos y Contenido", icon: FileText },
  { num: 8, name: "Datos de Referencia y Maestros", icon: Tag },
  {
    num: 9,
    name: "Data Warehousing e Inteligencia de Negocios",
    icon: BarChart3,
  },
  { num: 10, name: "Metadatos", icon: Tags },
  { num: 11, name: "Calidad de Datos", icon: CheckCircle2 },
];

export default function DMBOKPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dama-blue-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
              DAMA-DMBOK
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-dama-blue-100">
              El Data Management Body of Knowledge: el estándar de referencia
              mundial para la gestión de datos.
            </p>
          </div>
        </section>

        {/* Qué es el DMBOK */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3">
                <BookOpen className="text-dama-blue" size={28} />
                <h2 className="text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                  ¿Qué es el DMBOK?
                </h2>
              </div>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  El <strong>DAMA-DMBOK (Data Management Body of Knowledge)</strong>{" "}
                  es la guía de referencia definitiva para profesionales de
                  gestión de datos. Publicado por DAMA International, define las
                  funciones, terminología, mejores prácticas y principios rectores
                  de la disciplina.
                </p>
                <p>
                  La segunda edición (<strong>DMBOK2</strong>) es la referencia
                  actual y cubre 11 áreas de conocimiento que conforman el
                  marco completo para la gestión profesional de datos en
                  cualquier organización.
                </p>
                <p>
                  Es la base del examen de certificación{" "}
                  <strong>CDMP (Certified Data Management Professional)</strong>,
                  reconocida internacionalmente como el estándar de competencia en
                  data management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11 Áreas de Conocimiento */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
              11 Áreas de Conocimiento
            </h2>
            <p className="mt-4 text-center text-gray-600 mx-auto max-w-2xl">
              El DMBOK2 organiza la gestión de datos en 11 áreas de
              conocimiento interconectadas.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => (
                <div
                  key={area.num}
                  className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                    <area.icon size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Área {area.num}
                    </span>
                    <p className="font-medium text-gray-800">{area.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
              ¿Quieres dominar el DMBOK?
            </h2>
            <p className="mt-4 text-gray-600">
              Únete a nuestro Grupo de Estudio y aprenderás cada área de
              conocimiento de forma colaborativa.
            </p>
            <Link
              href="/grupo-estudio"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-dama-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-dama-blue-dark"
            >
              Inscríbete al Grupo de Estudio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
