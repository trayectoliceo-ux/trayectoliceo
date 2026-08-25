import Image from 'next/image';
import Link from 'next/link';
import marca from '../../../public/logotipo-trayecto-liceo.png';
import { sitio } from '@/content/sitio';

/**
 * Logotipo de la marca.
 *
 * El descriptor no es opcional: acompaña al nombre en cabecera y pie siempre.
 *
 * Sobre el tamaño: el logotipo es saturado y multicolor, mientras que el
 * resto del sitio es sobrio. Se mantiene pequeño y con aire alrededor para
 * que funcione como sello de identidad y no como elemento decorativo. Es el
 * único punto de la página donde aparecen todos esos colores juntos, y por
 * eso destaca.
 *
 * Para sustituirlo, reemplazar `public/logotipo-trayecto-liceo.png`
 * conservando el fondo transparente. Los iconos de pestaña y de móvil son
 * `src/app/icon.png` y `src/app/apple-icon.png`.
 */
export function Logotipo({
  tono = 'claro',
  conDescriptor = true,
}: {
  tono?: 'claro' | 'oscuro';
  conDescriptor?: boolean;
}) {
  const colorNombre = tono === 'claro' ? 'text-tinta' : 'text-papel';
  const colorDescriptor = tono === 'claro' ? 'text-gris' : 'text-papel/65';

  return (
    <Link
      href="/"
      aria-label={`${sitio.nombre}. ${sitio.descriptor}. Ir al inicio`}
      className="group inline-flex items-center gap-3.5"
    >
      <Image
        src={marca}
        alt=""
        aria-hidden
        priority
        sizes="44px"
        className="h-10 w-auto shrink-0 sm:h-11"
      />

      <span className="flex flex-col">
        <span
          className={`font-display text-[1.3125rem] leading-[1.15] tracking-[-0.015em] sm:text-[1.4375rem] ${colorNombre}`}
        >
          {sitio.nombre}
        </span>
        {conDescriptor ? (
          <span
            className={`mt-1 max-w-[26ch] font-sans text-[0.6875rem] leading-[1.35] tracking-[0.01em] ${colorDescriptor}`}
          >
            {sitio.descriptor}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
