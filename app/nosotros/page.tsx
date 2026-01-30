import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, Users, BookOpen, Award, Target, Heart } from "lucide-react";

const mision = [
  {
    icon: Target,
    title: "Profesionalización",
    description:
      "Promover la gestión de datos como disciplina profesional en Panamá.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Crear una comunidad activa de profesionales de datos en el país.",
  },
  {
    icon: Award,
    title: "Certificaciones",
    description:
      "Facilitar el acceso a certificaciones y recursos internacionales.",
  },
  {
    icon: Globe,
    title: "Red Global",
    description: "Conectar a profesionales panameños con la red global de DAMA.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dama-blue-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
              Sobre DAMA Panamá
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-dama-blue-100">
              Capítulo oficial de DAMA International en Panamá, dedicado a
              promover la gestión profesional de datos.
            </p>
          </div>
        </section>

        {/* Sobre DAMA International */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                  DAMA International
                </h2>
                <div className="mt-6 space-y-4 text-gray-600">
                  <p>
                    DAMA International es una asociación global sin fines de lucro
                    fundada en <strong>1980</strong>, dedicada a avanzar los
                    conceptos y prácticas de gestión de información y datos.
                  </p>
                  <p>
                    Con más de <strong>60 capítulos</strong> en todo el mundo,
                    DAMA es reconocida como la principal autoridad en gestión de
                    datos, siendo el hogar del{" "}
                    <strong>DAMA-DMBOK (Data Management Body of Knowledge)</strong>
                    , el estándar de referencia global para la disciplina.
                  </p>
                  <p>
                    Además, DAMA es el organismo certificador del{" "}
                    <strong>CDMP (Certified Data Management Professional)</strong>,
                    la certificación más reconocida en el campo de la gestión de
                    datos a nivel mundial.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl bg-dama-blue-50 p-6 text-center">
                    <Globe className="mx-auto text-dama-blue" size={32} />
                    <p className="mt-2 text-2xl font-bold text-dama-blue-dark">
                      60+
                    </p>
                    <p className="text-sm text-gray-600">Capítulos</p>
                  </div>
                  <div className="rounded-xl bg-dama-blue-50 p-6 text-center">
                    <Users className="mx-auto text-dama-blue" size={32} />
                    <p className="mt-2 text-2xl font-bold text-dama-blue-dark">
                      1980
                    </p>
                    <p className="text-sm text-gray-600">Año de fundación</p>
                  </div>
                  <div className="rounded-xl bg-dama-blue-50 p-6 text-center">
                    <BookOpen className="mx-auto text-dama-blue" size={32} />
                    <p className="mt-2 text-2xl font-bold text-dama-blue-dark">
                      DMBOK
                    </p>
                    <p className="text-sm text-gray-600">Body of Knowledge</p>
                  </div>
                  <div className="rounded-xl bg-dama-blue-50 p-6 text-center">
                    <Award className="mx-auto text-dama-blue" size={32} />
                    <p className="mt-2 text-2xl font-bold text-dama-blue-dark">
                      CDMP
                    </p>
                    <p className="text-sm text-gray-600">Certificación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión DAMA Panamá */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="mx-auto text-dama-blue" size={32} />
              <h2 className="mt-4 text-3xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                Nuestra Misión
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
                Promover la profesionalización de la gestión de datos en Panamá,
                creando una comunidad vibrante de profesionales comprometidos con
                la excelencia.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {mision.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
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
      </main>
      <Footer />
    </>
  );
}
