import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Globe, Linkedin, MapPin } from "lucide-react";

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dama-blue-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
              Contacto
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-dama-blue-100">
              ¿Tienes preguntas? Escríbenos y te responderemos a la brevedad.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Info de contacto */}
              <div>
                <h2 className="text-2xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                  Infórmación de Contacto
                </h2>
                <p className="mt-4 text-gray-600">
                  Estamos aquí para ayudarte. No dudes en comunicarte con
                  nosotros para cualquier consulta sobre DAMA Panamá, el Grupo de
                  Estudio DMBOK o la certificación CDMP.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <a
                        href="mailto:info@damapanama.org"
                        className="text-dama-blue hover:underline"
                      >
                        info@damapanama.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Privacidad</p>
                      <a
                        href="mailto:privacidad@damapanama.org"
                        className="text-dama-blue hover:underline"
                      >
                        privacidad@damapanama.org
                      </a>
                      <p className="text-sm text-gray-500">
                        Para ejercer derechos ARCO (Ley 81)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/company/dama-panama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dama-blue hover:underline"
                      >
                        DAMA Panamá
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        DAMA International
                      </p>
                      <a
                        href="https://dama.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dama-blue hover:underline"
                      >
                        dama.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dama-blue-50 text-dama-blue">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Ubicación</p>
                      <p className="text-gray-600">
                        Ciudad de Panamá, Panamá
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aviso de privacidad */}
              <div className="rounded-xl bg-gray-50 p-8">
                <h2 className="text-2xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
                  Aviso de Privacidad
                </h2>
                <div className="mt-6 space-y-4 text-sm text-gray-600">
                  <p>
                    De conformidad con la{" "}
                    <strong>Ley 81 de 26 de marzo de 2019</strong> y el{" "}
                    <strong>
                      Decreto Ejecutivo 285 de 28 de mayo de 2021
                    </strong>{" "}
                    sobre Protección de Datos Personales de Panamá, le informamos
                    que:
                  </p>
                  <p>
                    <strong>RESPONSABLE:</strong> DAMA Panamá (Capítulo afiliado a
                    DAMA International)
                  </p>
                  <p>
                    <strong>FINALIDAD:</strong> Gestionar su participación en el
                    Grupo de Estudio DMBOK v2, incluyendo coordinación de
                    sesiones, comunicación de materiales y seguimiento del
                    programa.
                  </p>
                  <p>
                    Sus datos NO serán transferidos a terceros sin su
                    consentimiento expreso, excepto cuando sea requerido por ley.
                  </p>
                  <p>
                    <strong>DERECHOS:</strong> Usted puede ejercer sus derechos
                    de acceso, rectificación, cancelación y oposición (ARCO)
                    enviando un correo a:{" "}
                    <a
                      href="mailto:privacidad@damapanama.org"
                      className="text-dama-blue hover:underline"
                    >
                      privacidad@damapanama.org
                    </a>
                  </p>
                  <p>
                    Los datos serán conservados mientras dure su participación en
                    el grupo de estudio y hasta un máximo de{" "}
                    <strong>7 años</strong> después de su última actividad.
                  </p>
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
