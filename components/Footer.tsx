import Link from "next/link";
import { Mail, Globe, Linkedin } from "lucide-react";

const footerLinks = [
  {
    title: "Navegación",
    links: [
      { name: "Inicio", href: "/" },
      { name: "Nosotros", href: "/nosotros" },
      { name: "DMBOK", href: "/dmbok" },
      { name: "Certificación CDMP", href: "/certificacion" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { name: "Grupo de Estudio", href: "/grupo-estudio" },
      { name: "Contacto", href: "/contacto" },
      { name: "DAMA International", href: "https://dama.org/", external: true },
      { name: "CDMP Info", href: "https://cdmp.info/", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dama-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
              DAMA Panamá
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Capítulo oficial de DAMA International. Promoviendo la gestión
              profesional de datos en Panamá.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="mailto:info@damapanama.org"
                className="text-gray-300 transition-colors hover:text-white"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://dama.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-white"
                aria-label="DAMA International"
              >
                <Globe size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/dama-panama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} DAMA Panamá. Todos los derechos
            reservados.
          </p>
          <p className="mt-1">
            <Link href="/contacto" className="hover:text-white">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
