import type { MetadataRoute } from 'next';
import { sitio } from '@/content/sitio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // El aviso legal no aporta en buscadores y consume rastreo.
      disallow: ['/aviso-de-privacidad'],
    },
    sitemap: `${sitio.dominio}/sitemap.xml`,
  };
}
