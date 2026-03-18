import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TallyEmbed from "@/components/TallyEmbed";
import {
  BookOpen,
  Clock,
  Users,
  Video,
  CheckCircle,
  Wifi,
} from "lucide-react";

export default function GrupoEstudioPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dama-blue-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <BookOpen className="text-accent-gold" size={36} />
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
                Grupo de Estudio DMBOK v2
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-dama-blue-100">
              Prepárate para dominar la gestión de datos y obtener tu
              certificación CDMP.
            </p>
          </div>
        </section>

        {/* Info del programa */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Detalles */}
              <div>
                <h2 className="text-2xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                  Sobre el Programa
                </h2>

                {/* Formato */}
                <div className="mt-8">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <Video className="text-dama-blue" size={20} />
                    Formato
                  </h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 shrink-0 text-gray-400" size={16} />
                      Sesiones virtuales cada 2 semanas
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 shrink-0 text-gray-400" size={16} />
                      Duración: 1.5 - 2 horas por sesión
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="mt-0.5 shrink-0 text-gray-400" size={16} />
                      Metodología colaborativa y participativa
                    </li>
                  </ul>
                </div>

                {/* Metodología */}
                <div className="mt-8">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <BookOpen className="text-dama-blue" size={20} />
                    Metodología
                  </h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-accent-green"
                        size={16}
                      />
                      Equipos de presentación rotativos (2-3 personas por capítulo)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-accent-green"
                        size={16}
                      />
                      Lectura previa obligatoria del capítulo
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-accent-green"
                        size={16}
                      />
                      Presentación siguiendo estructura SIPOC del DMBOK
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-accent-green"
                        size={16}
                      />
                      Espacio para preguntas, dudas y debate
                    </li>
                  </ul>
                </div>

                {/* Requisitos */}
                <div className="mt-8">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <CheckCircle className="text-dama-blue" size={20} />
                    Requisitos
                  </h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Users className="mt-0.5 shrink-0 text-gray-400" size={16} />
                      Compromiso de asistencia y participación activa
                    </li>
                    <li className="flex items-start gap-2">
                      <BookOpen
                        className="mt-0.5 shrink-0 text-gray-400"
                        size={16}
                      />
                      Acceso al libro DMBOK2 (versión español o inglés)
                    </li>
                    <li className="flex items-start gap-2">
                      <Wifi className="mt-0.5 shrink-0 text-gray-400" size={16} />
                      Conexión a internet estable
                    </li>
                  </ul>
                </div>

                {/* Costo */}
                <div className="mt-8 rounded-lg bg-accent-green/10 p-4">
                  <p className="text-lg font-semibold text-accent-green">
                    Gratuito para miembros de DAMA Panamá
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <div>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <TallyEmbed formId="rjE2Yv" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
