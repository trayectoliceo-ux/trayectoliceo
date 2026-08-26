'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { microinteraccion } from '@/lib/motion';

type Tono = 'solido' | 'contorno' | 'claro';

const tonos: Record<Tono, string> = {
  solido:
    'bg-institucional text-papel border border-institucional hover:bg-institucional-hondo hover:border-institucional-hondo',
  contorno:
    'bg-transparent text-institucional border border-institucional/40 hover:border-institucional hover:bg-institucional/[0.04]',
  claro:
    'bg-papel text-institucional border border-papel hover:bg-transparent hover:text-papel',
};

const base =
  'inline-flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded px-7 py-3.5 font-sans text-cuerpo font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50';

type PropsComunes = {
  children: ReactNode;
  tono?: Tono;
  className?: string;
};

/**
 * El movimiento de pulsación va hacia abajo (hunde) y el de hover hacia
 * arriba (eleva). No se escala el texto: se vuelve borroso durante la
 * transición.
 */
const gestos = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.99 },
  transition: microinteraccion,
};

export function BotonEnlace({
  href,
  children,
  tono = 'solido',
  className = '',
  externo = false,
}: PropsComunes & { href: string; externo?: boolean }) {
  const contenido = (
    <motion.span {...gestos} className={`${base} ${tonos[tono]} ${className}`}>
      {children}
    </motion.span>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {contenido}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block">
      {contenido}
    </Link>
  );
}

export function Boton({
  children,
  tono = 'solido',
  className = '',
  type = 'button',
  disabled,
  onClick,
}: PropsComunes & {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : gestos.whileHover}
      whileTap={disabled ? undefined : gestos.whileTap}
      transition={microinteraccion}
      className={`${base} ${tonos[tono]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

/**
 * Enlace de texto con subrayado que se dibuja de izquierda a derecha.
 * Se anima `scaleX`, nunca `width`.
 */
export function EnlaceTexto({
  href,
  children,
  className = '',
  externo = false,
}: PropsComunes & { href: string; externo?: boolean }) {
  const clases = `group relative inline-flex min-h-[44px] items-center gap-1.5 text-menudo font-medium text-institucional ${className}`;
  const interior = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-institucional transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      <span
        aria-hidden
        className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {interior}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {interior}
    </Link>
  );
}
