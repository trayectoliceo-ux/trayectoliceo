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
      { source: '/psicometrics', destination: '/psicologos', permanent: true },
      { source: '/colegios', destination: '/escuelas', permanent: true },
      { source: '/formacion', destination: '/certificate', permanent: true },
      { source: '/docentes', destination: '/certificate', permanent: true },
      { source: '/titulacion', destination: '/certificate#titulacion', permanent: true },
      { source: '/evaluacion', destination: '/familias', permanent: true },
      { source: '/academia', destination: '/certificate', permanent: true },
      { source: '/trayectoria', destination: '/familias', permanent: true },
    ];
  },
};

export default nextConfig;
