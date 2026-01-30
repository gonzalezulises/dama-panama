import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import {
  BookOpen,
  Users,
  Award,
  Globe,
  CheckCircle,
  Calendar,
} from "lucide-react";

const beneficios = [
  {
    icon: BookOpen,
    title: "Conocimiento DMBOK",
    description:
      "Aprende el estándar mundial en gestión de datos con expertos y colegas.",
  },
  {
    icon: Users,
    title: "Comunidad Profesional",
    description:
      "Conéctate con profesionales de datos en Panamá y Latinoamérica.",
  },
  {
    icon: Award,
    title: "Certificación CDMP",
    description:
      "Prepárate para obtener la certificación internacional más reconocida en Data Management.",
  },
  {
    icon: Globe,
    title: "Red Global",
    description:
      "Forma parte de DAMA International con presencia en más de 60 países.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Qué es DAMA */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-dama-blue-dark sm:text-4xl font-[family-name:var(--font-heading)]">
                ¿Qué es DAMA?
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-lg text-gray-600">
                DAMA International es la asociación global sin fines de lucro
                dedicada a promover la gestión de datos como disciplina
                profesional. Fundada en 1980, cuenta con más de 60 capítulos en
                todo el mundo.
              </p>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-dama-blue-dark sm:text-4xl font-[family-name:var(--font-heading)]">
              Beneficios de unirte
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {beneficios.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grupo de Estudio CTA */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-dama-blue-dark to-dama-blue p-8 sm:p-12">
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-dama-blue-100">
                    <Calendar size={20} />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Próximo grupo de estudio
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl font-[family-name:var(--font-heading)]">
                    Grupo de Estudio DMBOK v2
                  </h2>
                  <p className="mt-2 max-w-xl text-dama-blue-100">
                    Sesiones virtuales cada 2 semanas. Metodología colaborativa y
                    participativa para dominar las 11 áreas de conocimiento.
                  </p>
                </div>
                <Link
                  href="/grupo-estudio"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-dama-blue-dark transition-colors hover:bg-gray-100"
                >
                  <CheckCircle size={20} />
                  Inscríbete ahora
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Certificación CDMP */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-dama-blue-dark sm:text-4xl font-[family-name:var(--font-heading)]">
              Certificación CDMP
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
              El Certified Data Management Professional (CDMP) es la
              certificación más reconocida globalmente en gestión de datos.
              Prepárate con nuestro grupo de estudio.
            </p>
            <Link
              href="/certificacion"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-dama-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-dama-blue-dark"
            >
              Conoce más sobre CDMP
              <Award size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
