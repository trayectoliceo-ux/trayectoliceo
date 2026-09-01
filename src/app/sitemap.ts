import type { MetadataRoute } from 'next';
import { sitio } from '@/content/sitio';
import { talleres } from '@/content/talleres';
import { articulos } from '@/content/institucional';

/** Se genera a partir de los mismos datos que alimentan el sitio. */
export default function sitemap(): MetadataRoute.Sitemap {
  /** La prioridad refleja la intención comercial, no el gusto. */
  const prioridades: Record<string, number> = {
    '/': 1,
    '/familias': 1,
    '/psicologos': 1,
    '/escuelas': 0.95,
    '/docentes': 0.9,
    '/titulacion': 0.9,
    '/talleres': 0.9,
    '/evaluacion': 0.95,
    '/academia': 0.9,
    '/contacto': 0.8,
    '/verificar': 0.7,
    '/trayectoria': 0.7,
    '/nosotros': 0.6,
    '/recursos': 0.6,
  };

  const rutas = [
    '/',
    '/familias',
    '/psicologos',
    '/escuelas',
    '/docentes',
    '/titulacion',
    '/contacto',
    '/verificar',
    '/evaluacion',
    '/academia',
    '/formacion',
    '/trayectoria',
    '/nosotros',
    '/recursos',
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
