'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * DESPLEGABLE DE DETALLE
 * ----------------------
 * Mantiene la tarjeta corta sin esconder información. La tarjeta tiene que
 * caber de un vistazo para que las tres se comparen entre sí; el detalle
 * —edades, alcance, qué mide— solo le interesa a quien ya se decidió por
 * una, y a ese le basta con un clic.
 *
 * El contenido se monta y desmonta en lugar de ocultarse con altura cero.
 * Aquí es lo correcto: no es contenido que deba indexarse, y mantenerlo en
 * el DOM obligaría a sacarlo del orden de tabulación a mano para que el
 * teclado no entre en una lista invisible.
 *
 * La altura se anima, que es lo único que delata que algo se abrió. Con
 * `prefers-reduced-motion` aparece sin transición: para quien ha pedido
 * menos movimiento, un acordeón que se despliega es justo lo que molesta.
 */
export function Desplegable({
  resumen,
  children,
}: {
  resumen: string;
  children: React.ReactNode;
}) {
  const reducido = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setAbierto((previo) => !previo)}
        aria-expanded={abierto}
        aria-controls={id}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded text-menudo font-semibold text-institucional transition-colors duration-200 hover:text-institucional-hondo"
      >
        {resumen}
        <motion.span
          aria-hidden
          animate={{ rotate: abierto ? 180 : 0 }}
          transition={{ duration: duracion.rapida, ease: curva.salidaSuave }}
          className="inline-block"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {abierto ? (
          <motion.div
            id={id}
            key="detalle"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: reducido ? 0 : duracion.base,
                ease: curva.salidaSuave,
              },
              opacity: {
                duration: reducido ? 0 : salida(duracion.base),
                ease: curva.salidaSuave,
              },
            }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
