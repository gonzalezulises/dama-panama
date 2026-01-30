import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";

export default function ConfirmacionPage() {
  return (
    <>
      <Header />
      <main className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/10">
            <CheckCircle className="text-accent-green" size={40} />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-dama-blue-dark sm:text-4xl font-[family-name:var(--font-heading)]">
            ¡Registro exitoso!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Tu registro en el Grupo de Estudio DMBOK v2 ha sido recibido
            correctamente. Te contactaremos pronto con los detalles de las
            próximas sesiones.
          </p>

          <div className="mt-8 rounded-xl bg-dama-blue-50 p-6">
            <div className="flex items-center justify-center gap-2 text-dama-blue-dark">
              <Mail size={20} />
              <p className="font-semibold">Revisa tu correo electrónico</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Recibirás un email de confirmación con la información del programa
              y los próximos pasos.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-dama-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-dama-blue-dark"
            >
              Volver al inicio
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dmbok"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-dama-blue px-6 py-3 text-base font-semibold text-dama-blue transition-colors hover:bg-dama-blue-50"
            >
              Conoce el DMBOK
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
