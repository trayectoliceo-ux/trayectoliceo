import type { MetadataRoute } from 'next';
import { sitio } from '@/content/sitio';
import { talleres } from '@/content/talleres';
import { articulos } from '@/content/institucional';
import { programas } from '@/content/certificate';

/** Se genera a partir de los mismos datos que alimentan el sitio. */
export default function sitemap(): MetadataRoute.Sitemap {
  /** La prioridad refleja la intención comercial, no el gusto. */
  const prioridades: Record<string, number> = {
    '/': 1,
    '/familias': 1,
    '/psicologos': 1,
    '/escuelas': 0.95,
    '/certificate': 0.95,
    '/red': 0.95,
    '/talleres': 0.9,
    '/contacto': 0.8,
    '/verificar': 0.7,
    '/nosotros': 0.6,
    '/recursos': 0.6,
  };

  const rutas = [
    '/',
    '/familias',
    '/psicologos',
    '/escuelas',
    '/certificate',
    '/red',
    '/contacto',
    '/verificar',
    '/nosotros',
    '/recursos',
    ...programas.map((programa) => `/programa/${programa.id}`),
    ...talleres.map((taller) => `/talleres/${taller.slug}`),
    ...articulos.map((articulo) => `/recursos/${articulo.slug}`),
    ...programas
      .filter((programa) => programa.destino === 'pago')
      .map((programa) => `/programa/${programa.id}`),
  ];

  return rutas.map((ruta) => ({
    url: `${sitio.dominio}${ruta}`,
    lastModified: new Date(),
    changeFrequency: ruta === '/recursos' ? ('weekly' as const) : ('monthly' as const),
    priority: prioridades[ruta] ?? 0.5,
  }));
}
