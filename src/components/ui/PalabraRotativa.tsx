'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * Palabra que rota dentro de un titular.
 *
 * Cada palabra sube desde debajo de su propia máscara y la anterior sale
 * por arriba: el movimiento cuenta que una sustituye a la otra, en vez de
 * un desvanecido que solo llama la atención.
 *
 * Decisiones que importan:
 *  · El ancho se reserva con la palabra más larga, invisible pero presente
 *    en el flujo. Sin eso el resto del titular se desplaza en cada cambio.
 *  · Con `prefers-reduced-motion` no rota: se queda fija en la primera
 *    palabra. Un texto que cambia solo es exactamente lo que esa
 *    preferencia pide evitar.
 *  · El elemento se anuncia como `aria-live` desactivado y expone el
 *    conjunto completo a lectores de pantalla, para que la frase se
 *    entienda sin depender del momento en que se lea.
 */
export function PalabraRotativa({
  palabras,
  intervalo = 2600,
  className = '',
}: {
  palabras: string[];
  intervalo?: number;
  className?: string;
}) {
  const reducido = useReducedMotion();
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (reducido || palabras.length < 2) return;

    const temporizador = setInterval(() => {
      setIndice((previo) => (previo + 1) % palabras.length);
    }, intervalo);

    return () => clearInterval(temporizador);
  }, [reducido, palabras.length, intervalo]);

  const masLarga = palabras.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Reserva el ancho para que el titular no se mueva al cambiar. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {masLarga}
      </span>

      {/* Texto completo para lectores de pantalla. */}
      <span className="sr-only">{palabras.join(', ')}</span>

      <span aria-hidden className="col-start-1 row-start-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={palabras[indice]}
            initial={{ y: reducido ? 0 : '100%', opacity: reducido ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: reducido ? 0 : '-100%',
              opacity: reducido ? 0 : 1,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="block whitespace-nowrap text-institucional"
          >
            {palabras[indice]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
