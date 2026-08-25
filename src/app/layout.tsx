import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Petrona } from 'next/font/google';
import { Cabecera } from '@/components/layout/Cabecera';
import { Pie } from '@/components/layout/Pie';
import { BotonWhatsApp } from '@/components/layout/BotonWhatsApp';
import { sitio } from '@/content/sitio';
import './globals.css';

/**
 * Petrona para titulares: serif de baja modulación dibujada en Latinoamérica,
 * con formas asimétricas que le dan carácter sin caer en el contraste
 * extremo de una didona. Institucional y cálida a la vez.
 */
const display = Petrona({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-display',
});

/** IBM Plex Sans para el cuerpo: neutra, muy legible y de origen técnico. */
const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fuente-sans',
});

/** IBM Plex Mono para metadatos: la voz del expediente y de la ficha. */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--fuente-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.dominio),
  title: {
    default: `${sitio.nombre} · ${sitio.descriptor}`,
    template: `%s · ${sitio.nombre}`,
  },
  description: sitio.descripcionMeta,
  alternates: { canonical: sitio.dominio },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: sitio.nombre,
    title: `${sitio.nombre} · ${sitio.descriptor}`,
    description: sitio.descripcionMeta,
    url: sitio.dominio,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: sitio.nombre }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sitio.nombre} · ${sitio.descriptor}`,
    description: sitio.descripcionMeta,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#F1F2F5',
  colorScheme: 'light',
};

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-institucional focus:px-4 focus:py-3 focus:text-menudo focus:text-papel"
        >
          Saltar al contenido
        </a>

        <Cabecera />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <Pie />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
