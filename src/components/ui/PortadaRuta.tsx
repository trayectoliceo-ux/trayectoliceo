'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { PalabraRotativa } from '@/components/ui/PalabraRotativa';
import { curva, duracion } from '@/lib/motion';

/**
 * Portada de página de público.
 *
 * Cada ruta comercial abre igual: etiqueta, titular grande, una frase y la
 * acción. Sin párrafos de introducción: el visitante decide en menos de un
 * minuto y todo lo que no ayude a decidir estorba.
 */
export function PortadaRuta({
  etiqueta,
  titulo,
  rotativas,
  entrada,
  children,
  tono = 'claro',
}: {
  etiqueta: string;
  titulo: readonly string[];
  rotativas?: readonly string[];
  entrada: string;
  children?: ReactNode;
  tono?: 'claro' | 'hondo';
}) {
  const reducido = useReducedMotion();

  return (
    <section
      className={`border-b border-linea ${tono === 'hondo' ? 'bg-papel-hondo' : ''}`}
    >
      <div className="contenedor py-14 lg:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duracion.base }}
          className="etiqueta"
        >
          {etiqueta}
        </motion.p>

        <h1 className="mt-6 text-portada font-display">
          {titulo.map((linea, indice) => (
            <span key={linea} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: reducido ? 0 : '108%', opacity: reducido ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: reducido ? duracion.base : 0.56,
                  delay: 0.1 + indice * 0.09,
                  ease: curva.salidaSuave,
                }}
              >
                {linea}
                {rotativas?.length && indice === titulo.length - 1 ? (
                  <>
                    {' '}
                    <PalabraRotativa palabras={[...rotativas]} />
                  </>
                ) : null}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reducido ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duracion.base, delay: 0.34, ease: curva.salidaSuave }}
          className="justificado mt-8 max-w-lectura text-cuerpo-lg text-tinta-suave"
        >
          {entrada}
        </motion.p>

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duracion.base, delay: 0.44, ease: curva.salidaSuave }}
            className="mt-10"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
