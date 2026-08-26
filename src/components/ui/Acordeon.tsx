'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { curva, duracion, muelle } from '@/lib/motion';

/**
 * Acordeón reutilizable.
 *
 * El contenido está siempre en el DOM y solo se recorta la altura: es lo
 * que permite que Google lo indexe y lo que hace válido el marcado FAQPage.
 */
export function Acordeon({
  elementos,
}: {
  elementos: readonly { pregunta: string; respuesta: string }[];
}) {
  const [abierta, setAbierta] = useState<number | null>(0);
  const reducido = useReducedMotion();

  return (
    <ul className="border-t border-linea">
      {elementos.map((elemento, indice) => {
        const activa = abierta === indice;

        return (
          <li key={elemento.pregunta} className="border-b border-linea">
            <h3>
              <button
                type="button"
                onClick={() => setAbierta(activa ? null : indice)}
                aria-expanded={activa}
                className="flex min-h-[44px] w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={`max-w-[42ch] text-cuerpo font-medium transition-colors duration-150 ${
                    activa ? 'text-institucional' : 'text-tinta'
                  }`}
                >
                  {elemento.pregunta}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: activa ? 45 : 0 }}
                  transition={reducido ? { duration: 0 } : muelle.firme}
                  className="mt-0.5 shrink-0 text-institucional"
                >
                  +
                </motion.span>
              </button>
            </h3>

            <motion.div
              initial={false}
              animate={{ height: activa ? 'auto' : 0, opacity: activa ? 1 : 0 }}
              transition={{ duration: reducido ? 0 : duracion.base, ease: curva.salidaSuave }}
              className="overflow-hidden"
            >
              <p className="max-w-lectura pb-6 text-menudo leading-[1.7] text-tinta-suave">
                {elemento.respuesta}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
