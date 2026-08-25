'use client';

import { motion, useReducedMotion } from 'motion/react';
import { BotonEnlace } from '@/components/ui/Boton';
import { portada } from '@/content/inicio';
import { curva, duracion, escalonado } from '@/lib/motion';

/**
 * MOMENTO FIRMA
 * -------------
 * Es la única secuencia orquestada del sitio. Todo lo demás se mueve poco y
 * de forma discreta para que esto destaque.
 *
 * Qué ocurre y por qué:
 *  1. La línea de trayecto se dibuja de arriba abajo (`scaleY` desde el
 *     borde superior). Es la figura de la marca y establece el eje.
 *  2. Cada línea del titular sube desde debajo de su propia máscara, como
 *     un texto que se compone. Nunca aparece con opacidad suelta.
 *  3. Los cuatro hitos se marcan sobre la línea, escalonados 80 ms: 240 ms
 *     en total, por debajo del límite de 400 ms.
 *
 * El contenido es utilizable desde el primer fotograma: nada bloquea la
 * interacción y los enlaces no dependen de que la secuencia termine.
 */

const RETRASO_LINEA = 0.05;
const RETRASO_TITULAR = 0.16;
const RETRASO_HITOS = 0.5;

export function Portada() {
  const reducido = useReducedMotion();

  /** Con movimiento reducido se conserva la aparición, se elimina el recorrido. */
  const transicionTitular = {
    duration: reducido ? duracion.base : 0.56,
    ease: curva.salidaSuave,
  };

  return (
    <section className="relative overflow-hidden border-b border-linea">
      <div className="contenedor grid gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1fr_15rem] lg:gap-16 lg:pb-24 lg:pt-28">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="etiqueta"
          >
            {portada.hitos.join(' · ')}
          </motion.p>

          <h1 className="mt-7 text-portada font-display">
            {portada.titulo.map((linea, indice) => (
              // La máscara es lo que hace que el texto «se componga» en vez
              // de aparecer: solo se anima `transform` dentro del recorte.
              <span key={linea} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: reducido ? 0 : '108%', opacity: reducido ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    ...transicionTitular,
                    delay: RETRASO_TITULAR + indice * 0.09,
                  }}
                >
                  {linea}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duracion.base,
              delay: RETRASO_TITULAR + portada.titulo.length * 0.09 + 0.05,
              ease: curva.salidaSuave,
            }}
            className="mt-8 max-w-lectura text-cuerpo-lg text-tinta-suave"
          >
            {portada.subtitulo}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duracion.base,
              delay: RETRASO_TITULAR + portada.titulo.length * 0.09 + 0.14,
              ease: curva.salidaSuave,
            }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            {portada.acciones.map((accion) => (
              <BotonEnlace key={accion.href} href={accion.href} tono={accion.tono}>
                {accion.titulo}
              </BotonEnlace>
            ))}
          </motion.div>
        </div>

        {/* Riel de trayecto: vertical en escritorio. */}
        <div className="relative hidden lg:block">
          <motion.div
            aria-hidden
            initial={reducido ? { opacity: 0 } : { scaleY: 0 }}
            animate={reducido ? { opacity: 1 } : { scaleY: 1 }}
            transition={{
              duration: reducido ? duracion.base : duracion.firma,
              delay: RETRASO_LINEA,
              ease: curva.salidaSuave,
            }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-0 top-1 h-full w-px bg-linea"
          />
          <ul className="space-y-9 pl-6">
            {portada.hitos.map((hito, indice) => (
              <motion.li
                key={hito}
                initial={{ opacity: 0, x: reducido ? 0 : -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: duracion.base,
                  delay: reducido ? 0 : RETRASO_HITOS + indice * escalonado.marcado * 0.8,
                  ease: curva.salidaSuave,
                }}
                className="relative font-mono text-etiqueta uppercase text-gris"
              >
                <span
                  aria-hidden
                  className="absolute -left-6 top-[0.4em] block h-px w-3 bg-institucional"
                />
                <span className="text-institucional">{String(indice + 1).padStart(2, '0')}</span>
                <span className="ml-2">{hito}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Riel de trayecto: horizontal en móvil. Misma figura, otro eje. */}
      <div className="contenedor lg:hidden">
        <motion.div
          aria-hidden
          initial={reducido ? { opacity: 0 } : { scaleX: 0 }}
          animate={reducido ? { opacity: 1 } : { scaleX: 1 }}
          transition={{
            duration: reducido ? duracion.base : duracion.firma,
            delay: RETRASO_LINEA,
            ease: curva.salidaSuave,
          }}
          style={{ transformOrigin: 'left' }}
          className="h-px w-full bg-linea"
        />
        <ul className="flex flex-wrap gap-x-6 gap-y-3 pb-12 pt-4">
          {portada.hitos.map((hito, indice) => (
            <motion.li
              key={hito}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: duracion.base,
                delay: reducido ? 0 : RETRASO_HITOS + indice * 0.08,
                ease: curva.salidaSuave,
              }}
              className="font-mono text-etiqueta uppercase text-gris"
            >
              <span className="text-institucional">{String(indice + 1).padStart(2, '0')}</span>
              <span className="ml-1.5">{hito}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
