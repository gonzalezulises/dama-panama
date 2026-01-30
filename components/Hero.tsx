import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dama-blue-dark via-dama-blue to-dama-blue-light">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end lg:grid-cols-2">
          {/* Text */}
          <div className="py-20 sm:py-28">
            <p className="text-sm font-semibold uppercase tracking-wider text-dama-blue-100">
              Capítulo oficial de DAMA International
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
              Impulsa tu carrera en Gestión de Datos
            </h1>
            <p className="mt-6 text-lg text-dama-blue-100 sm:text-xl">
              DAMA Panamá reúne a profesionales de datos para compartir
              conocimiento, crecer juntos y certificarse internacionalmente con el
              CDMP.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/grupo-estudio"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-dama-blue-dark shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                <BookOpen size={20} />
                Únete al Grupo de Estudio DMBOK
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Conoce más sobre DAMA
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Image - flush bottom-right */}
          <div className="hidden lg:flex lg:items-end lg:justify-end">
            <Image
              src="/images/casco-viejo-panama.png"
              alt="Casco Viejo, Ciudad de Panamá"
              width={600}
              height={600}
              className="block max-h-[500px] w-auto object-contain object-right-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
