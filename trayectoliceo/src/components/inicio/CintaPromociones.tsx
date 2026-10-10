'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { promociones } from '@/content/servicios';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * Cinta de promoción rotativa.
 *
 * Rota entre las tres líneas de negocio para que ninguna quede invisible
 * en la portada. Cada una entra desde abajo y sale por arriba: el
 * movimiento dice que una sustituye a la otra.
 *
 * Con `prefers-reduced-motion` no rota y se queda en la primera. La cinta
 * completa es un enlace, así que el destino cambia con el contenido.
 */
export function CintaPromociones() {
  const reducido = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [pausada, setPausada] = useState(false);

  useEffect(() => {
    if (reducido || pausada) return;

    const temporizador = setInterval(() => {
      setIndice((previo) => (previo + 1) % promociones.length);
    }, 5000);

    return () => clearInterval(temporizador);
  }, [reducido, pausada]);

  const activa = promociones[indice];

  return (
    <div
      className="border-b border-linea bg-tinta text-papel"
      // Se detiene al pasar el puntero o al enfocar con teclado: nadie
      // debería perseguir un enlace que se mueve solo.
      onMouseEnter={() => setPausada(true)}
      onMouseLeave={() => setPausada(false)}
      onFocus={() => setPausada(true)}
      onBlur={() => setPausada(false)}
    >
      <div className="contenedor">
        <Link
          href={activa.enlace}
          className="flex min-h-[48px] items-center justify-center gap-3 py-2.5 text-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activa.texto}
              initial={{ opacity: 0, y: reducido ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: reducido ? 0 : -10,
                transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
              }}
              transition={{ duration: duracion.base, ease: curva.salidaSuave }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            >
              <span className="rounded bg-menta-claro/15 px-2.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-menta-brillo">
                {activa.etiqueta}
              </span>
              <span className="text-menudo text-papel/90">{activa.texto}</span>
              <span className="text-menudo font-semibold text-menta-brillo">
                {activa.accion} →
              </span>
            </motion.span>
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );
}
