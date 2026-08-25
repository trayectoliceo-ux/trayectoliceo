import type { Metadata } from 'next';
import { sitio } from '@/content/sitio';

/**
 * METADATOS POR PÁGINA
 * --------------------
 * Un solo constructor para que ninguna página se quede sin canónica ni sin
 * Open Graph. Es el error más común y el más caro: sin canónica, el mismo
 * contenido servido en `/talleres` y `/talleres/` compite consigo mismo.
 *
 * Reglas de redacción que conviene respetar al editar:
 *  · Título por debajo de 60 caracteres, incluyendo el sufijo de marca.
 *  · Descripción entre 140 y 158 caracteres, con la intención de búsqueda
 *    al principio y la ubicación cuando el servicio sea local.
 *  · Una sola idea por página. Dos páginas que compiten por el mismo
 *    término se canibalizan.
 */
export function metadatos({
  titulo,
  descripcion,
  ruta,
  tipo = 'website',
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  tipo?: 'website' | 'article';
}): Metadata {
  const url = `${sitio.dominio}${ruta}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      type: tipo,
      locale: 'es_MX',
      siteName: sitio.nombre,
      title: `${titulo} · ${sitio.nombre}`,
      description: descripcion,
      url,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: sitio.nombre }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} · ${sitio.nombre}`,
      description: descripcion,
      images: ['/og.png'],
    },
  };
}
