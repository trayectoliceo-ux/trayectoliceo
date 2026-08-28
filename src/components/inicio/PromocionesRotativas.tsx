'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { portada } from '@/content/inicio';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * Banda de anuncios rotativos.
 *
 * Con movimiento reducido no rota: muestra el primero y añade controles
 * para pasar de uno a otro. Un carrusel automático es de lo primero que esa
 * preferencia pide desactivar, y quitar el contenido no es una opción
 * porque hay ofertas comerciales dentro.
 *
 * La rotación se detiene al pasar el cursor o al enfocar con teclado: leer
 * un anuncio que desaparece a media frase es la queja clásica del carrusel.
 */
export function PromocionesRotativas() {
  const reducido = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  const total = portada.promociones.length;

  useEffect(() => {
    if (reducido || pausado || total < 2) return;

    const temporizador = setInterval(() => {
      setIndice((previo) => (previo + 1) % total);
    }, 4800);

    return () => clearInterval(temporizador);
  }, [reducido, pausado, total]);

  const promocion = portada.promociones[indice];

  return (
    <div
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
      className="border-b border-linea bg-tinta"
    >
      <div className="contenedor flex min-h-[52px] items-center justify-between gap-4 py-2">
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={promocion.etiqueta + promocion.texto}
              initial={{ opacity: 0, y: reducido ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: reducido ? 0 : -8,
                transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
              }}
              transition={{ duration: duracion.base, ease: curva.salidaSuave }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              <span className="rounded bg-institucional px-2.5 py-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
                {promocion.etiqueta}
              </span>
              <span className="text-menudo text-papel/85">{promocion.texto}</span>
              <Link
                href={promocion.href}
                className="text-menudo font-semibold text-menta-brillo underline underline-offset-4 transition-opacity duration-150 hover:opacity-80"
              >
                {promocion.accion}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Control manual: imprescindible si la rotación está detenida. */}
        <ul className="flex shrink-0 items-center gap-1.5">
          {portada.promociones.map((elemento, posicion) => (
            <li key={elemento.etiqueta}>
              <button
                type="button"
                onClick={() => setIndice(posicion)}
                aria-label={`Ver anuncio: ${elemento.etiqueta}`}
                aria-current={posicion === indice}
                className="flex h-8 w-5 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    posicion === indice ? 'w-5 bg-papel' : 'w-1.5 bg-papel/35'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
