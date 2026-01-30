import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAMA Panamá | Gestión de Datos Profesional",
  description:
    "Capítulo oficial de DAMA International en Panamá. Únete al Grupo de Estudio DMBOK y prepárate para la certificación CDMP.",
  keywords: [
    "DAMA",
    "Panamá",
    "gestión de datos",
    "DMBOK",
    "CDMP",
    "certificación",
    "data management",
  ],
  openGraph: {
    title: "DAMA Panamá",
    description: "Impulsa tu carrera en Gestión de Datos",
    url: "https://damapanama.org",
    siteName: "DAMA Panamá",
    locale: "es_PA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
