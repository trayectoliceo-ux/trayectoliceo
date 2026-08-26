import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { Cabecera } from '@/components/layout/Cabecera';
import { Pie } from '@/components/layout/Pie';
import { BotonWhatsApp } from '@/components/layout/BotonWhatsApp';
import { sitio } from '@/content/sitio';
import './globals.css';

/**
 * Plus Jakarta Sans para titulares: geométrica, con terminaciones limpias y
 * mucho carácter en los pesos altos. Es lo que sostiene un titular grande
 * sin recurrir a una serif.
 */
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--fuente-display',
});

/** Inter para el cuerpo: la referencia en legibilidad de interfaz. */
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-sans',
});

/** JetBrains Mono para datos y códigos puntuales. */
const mono = JetBrains_Mono({
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
  themeColor: '#F8FAFC',
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
