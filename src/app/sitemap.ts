import type { MetadataRoute } from 'next';
import { sitio } from '@/content/sitio';
import { talleres } from '@/content/talleres';
import { articulos } from '@/content/institucional';

/** Se genera a partir de los mismos datos que alimentan el sitio. */
export default function sitemap(): MetadataRoute.Sitemap {
  /** La prioridad refleja la intención comercial, no el gusto. */
  const prioridades: Record<string, number> = {
    '/': 1,
    '/talleres': 0.9,
    '/colegios': 0.9,
    '/formacion': 0.9,
    '/contacto': 0.8,
    '/trayectoria': 0.7,
    '/nosotros': 0.6,
    '/recursos': 0.6,
  };

  const rutas = [
    '/',
    ...sitio.navegacion.map((elemento) => elemento.href),
    '/contacto',
    ...talleres.map((taller) => `/talleres/${taller.slug}`),
    ...articulos.map((articulo) => `/recursos/${articulo.slug}`),
  ];

  return rutas.map((ruta) => ({
    url: `${sitio.dominio}${ruta}`,
    lastModified: new Date(),
    changeFrequency: ruta === '/recursos' ? ('weekly' as const) : ('monthly' as const),
    priority: prioridades[ruta] ?? 0.5,
  }));
}
