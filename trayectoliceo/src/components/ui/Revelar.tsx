'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { curva, distancia, duracion, escalonado, vistaUnaVez } from '@/lib/motion';

/**
 * Revelación por scroll. Se usa con moderación: los encabezados de sección
 * y poco más. Si todas las secciones entraran igual, el movimiento dejaría
 * de significar nada.
 *
 * `once: true` en todos los casos: nunca se repite al volver a subir.
 */
export function Revelar({
  children,
  retraso = 0,
  desplazamiento = distancia.base,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  retraso?: number;
  desplazamiento?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const reducido = useReducedMotion();
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      initial={{ opacity: 0, y: reducido ? 0 : desplazamiento }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vistaUnaVez}
      transition={{
        duration: reducido ? duracion.instante : duracion.base,
        delay: reducido ? 0 : retraso,
        ease: curva.salidaSuave,
      }}
      className={className}
    >
      {children}
    </Etiqueta>
  );
}

/**
 * Grupo escalonado. El retraso total se calcula y se acota: con más de seis
 * elementos el escalonado pasa a `denso` para no superar los 400 ms.
 */
export function GrupoRevelar({
  children,
  className = '',
  total = 3,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  total?: number;
  as?: 'div' | 'ul' | 'ol';
}) {
  const reducido = useReducedMotion();
  const paso = total > 6 ? escalonado.denso : escalonado.base;
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      initial="oculto"
      whileInView="visible"
      viewport={vistaUnaVez}
      variants={{
        oculto: {},
        visible: {
          transition: {
            staggerChildren: reducido ? 0 : paso,
            delayChildren: reducido ? 0 : 0.05,
          },
        },
      }}
      className={className}
    >
      {children}
    </Etiqueta>
  );
}

/**
 * Hijo de `GrupoRevelar`. No lleva `initial` ni `whileInView` propios:
 * hereda el estado del contenedor, que es lo que hace funcionar el
 * escalonado.
 */
export function ElementoRevelar({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reducido = useReducedMotion();
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      variants={{
        oculto: { opacity: 0, y: reducido ? 0 : distancia.leve },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducido ? duracion.instante : duracion.base,
            ease: curva.salidaSuave,
          },
        },
      }}
      className={className}
    >
      {children}
    </Etiqueta>
  );
}
