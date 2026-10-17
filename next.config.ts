import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Rutas antiguas hacia su nuevo público. Permanentes para que los
   * buscadores trasladen la autoridad acumulada en lugar de perderla, y
   * para que ningún enlace compartido en WhatsApp acabe en un 404.
   */
  async redirects() {
    return [
      /*
        Lo que ahora vive en PsicoMetrics sale del sitio, pero sus URLs
        siguen circulando en WhatsApp y en buscadores. Redirigirlas a la
        plataforma lleva a la persona a donde está el servicio; borrarlas
        sin más la dejaría en un 404.
      */
      {
        source: '/psicologos',
        destination: 'https://www.psicometrics.app',
        permanent: true,
      },
      {
        source: '/psicometrics',
        destination: 'https://www.psicometrics.app',
        permanent: true,
      },
      {
        source: '/red',
        destination: 'https://www.psicometrics.app',
        permanent: true,
      },

      { source: '/colegios', destination: '/escuelas', permanent: true },
      { source: '/formacion', destination: '/certificate', permanent: true },
      { source: '/docentes', destination: '/certificate', permanent: true },
      { source: '/titulacion', destination: '/certificate', permanent: true },
      { source: '/evaluacion', destination: '/familias', permanent: true },
      { source: '/academia', destination: '/certificate', permanent: true },
      { source: '/trayectoria', destination: '/familias', permanent: true },
    ];
  },
};

export default nextConfig;
