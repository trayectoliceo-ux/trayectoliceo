'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { preguntas } from '@/content/inicio';
import { curva, duracion, muelle, vistaUnaVez } from '@/lib/motion';

/**
 * Preguntas frecuentes.
 *
 * El contenido está siempre en el DOM, no se carga al abrir: es lo que
 * permite que Google lo indexe y lo que hace válido el marcado FAQPage.
 * Se oculta con altura del contenedor, no desmontando el texto.
 *
 * La apertura anima `height` a través de `layout` de Framer Motion, que lo
 * traduce a transformaciones en vez de recalcular el diseño cada fotograma.
 */
export function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState<number | null>(0);
  const reducido = useReducedMotion();

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: reducido ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vistaUnaVez}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
      >
        <p className="etiqueta">{preguntas.etiqueta}</p>
        <h2 className="mt-5 max-w-[18ch] text-t2 sm:text-t1">{preguntas.titulo}</h2>
      </motion.div>

      <ul className="border-t border-linea">
        {preguntas.lista.map((elemento, indice) => {
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

              {/* El texto permanece en el DOM: solo se recorta la altura. */}
              <motion.div
                initial={false}
                animate={{ height: activa ? 'auto' : 0, opacity: activa ? 1 : 0 }}
                transition={{
                  duration: reducido ? 0 : duracion.base,
                  ease: curva.salidaSuave,
                }}
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
    </div>
  );
}
