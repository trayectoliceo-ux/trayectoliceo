'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import type { Modulo } from '@/content/certificate';
import { curva, duracion, muelle, salida } from '@/lib/motion';

/**
 * TEMARIO EN DIAPOSITIVAS
 * -----------------------
 * Un temario en lista vertical se lee como letra pequeña de contrato y
 * nadie lo termina. En diapositivas se recorre entero, porque cada pantalla
 * pide un solo gesto y muestra un solo módulo.
 *
 * El movimiento va en la dirección del recorrido: hacia adelante entra por
 * la derecha, hacia atrás por la izquierda. Eso es lo que convierte el
 * cambio en «paso siguiente» en lugar de «otra cosa».
 *
 * Todos los módulos están en el DOM para que los buscadores los indexen;
 * los que no se ven quedan ocultos con `aria-hidden`, no desmontados.
 */
export function TemarioSlides({ modulos }: { modulos: Modulo[] }) {
  const reducido = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [direccion, setDireccion] = useState(1);

  const ir = (destino: number) => {
    if (destino < 0 || destino >= modulos.length) return;
    setDireccion(destino > indice ? 1 : -1);
    setIndice(destino);
  };

  const modulo = modulos[indice];
  const desplazamiento = reducido ? 0 : 40;

  return (
    <div className="rounded-lg border border-linea bg-papel-puro shadow-tarjeta">
      {/* Lomo de progreso: cuántos módulos hay y en cuál vas */}
      <div className="flex items-center gap-1.5 border-b border-linea px-6 py-4">
        {modulos.map((elemento, posicion) => (
          <button
            key={elemento.numero}
            type="button"
            onClick={() => ir(posicion)}
            aria-label={`Módulo ${elemento.numero}: ${elemento.titulo}`}
            aria-current={posicion === indice}
            className="group flex h-8 flex-1 items-center"
          >
            <motion.span
              layout
              transition={reducido ? { duration: 0 } : muelle.firme}
              className={`block h-1.5 w-full rounded-full transition-colors duration-200 ${
                posicion === indice
                  ? 'bg-institucional'
                  : posicion < indice
                    ? 'bg-institucional/35'
                    : 'bg-linea group-hover:bg-institucional/25'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direccion}>
          <motion.div
            key={modulo.numero}
            custom={direccion}
            initial={{ opacity: 0, x: direccion * desplazamiento }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: direccion * -desplazamiento,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="p-7 sm:p-9"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-mono text-menudo font-medium text-institucional">
                Módulo {modulo.numero}
              </p>
              {modulo.horas ? (
                <p className="font-mono text-menudo text-gris">{modulo.horas}</p>
              ) : null}
            </div>

            <h3 className="mt-3 text-balance text-t3">{modulo.titulo}</h3>

            {modulo.objetivo ? (
              <p className="mt-3 text-menudo font-semibold text-institucional">
                Objetivo: {modulo.objetivo}
              </p>
            ) : null}

            <ul className="mt-6 border-t border-linea">
              {modulo.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo text-tinta-suave"
                >
                  <span aria-hidden className="text-institucional">
                    —
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Copia accesible e indexable de los módulos que no se ven */}
      <div className="sr-only" aria-hidden>
        {modulos.map((elemento) => (
          <div key={elemento.numero}>
            <h4>{elemento.titulo}</h4>
            <ul>
              {elemento.puntos.map((punto) => (
                <li key={punto}>{punto}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-linea px-6 py-4">
        <button
          type="button"
          onClick={() => ir(indice - 1)}
          disabled={indice === 0}
          className="flex min-h-[44px] items-center gap-2 px-2 text-menudo font-semibold text-institucional disabled:opacity-30"
        >
          <span aria-hidden>←</span> Anterior
        </button>

        <span className="font-mono text-menudo text-gris">
          {indice + 1} / {modulos.length}
        </span>

        <button
          type="button"
          onClick={() => ir(indice + 1)}
          disabled={indice === modulos.length - 1}
          className="flex min-h-[44px] items-center gap-2 px-2 text-menudo font-semibold text-institucional disabled:opacity-30"
        >
          Siguiente <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
