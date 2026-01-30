"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "DMBOK", href: "/dmbok" },
  { name: "Certificación", href: "/certificacion" },
  { name: "Grupo de Estudio", href: "/grupo-estudio" },
  { name: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
              DAMA Panamá
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-dama-blue-50 hover:text-dama-blue-dark"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/grupo-estudio"
              className="ml-2 rounded-md bg-dama-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-dama-blue-dark"
            >
              Inscríbete
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-dama-blue-50 hover:text-dama-blue-dark"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/grupo-estudio"
                className="mt-2 rounded-md bg-dama-blue px-4 py-2 text-center text-sm font-semibold text-white hover:bg-dama-blue-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscríbete
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
