'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Acordeon } from '@/components/ui/Acordeon';
import { preguntas } from '@/content/inicio';
import { curva, duracion, vistaUnaVez } from '@/lib/motion';

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
  const reducido = useReducedMotion();

  return (
    <div className="grid gap-9 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
      <motion.div
        initial={{ opacity: 0, y: reducido ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vistaUnaVez}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
      >
        <p className="etiqueta">{preguntas.etiqueta}</p>
        <h2 className="mt-5 max-w-[18ch] text-t2 sm:text-t1">{preguntas.titulo}</h2>
      </motion.div>

      <Acordeon elementos={preguntas.lista} />
    </div>
  );
}
