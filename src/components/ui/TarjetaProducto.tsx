'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { BotonMercadoPago } from '@/components/psicometrics/BotonMercadoPago';
import type { Producto } from '@/content/precios';
import { curva, duracion, muelle } from '@/lib/motion';

/** A partir de este número, la lista se pliega tras un botón. */
const DETALLES_VISIBLES = 3;

/**
 * Tarjeta comercial.
 *
 * Tres decisiones que resuelven el desorden de una rejilla de precios:
 *
 *  · Todas las tarjetas miden lo mismo, aunque su contenido difiera. Se
 *    consigue con `h-full` más una columna flexible: la lista se estira y
 *    el pie queda anclado abajo.
 *  · La acción nunca queda por debajo del pliegue. Si hay muchos detalles,
 *    se pliegan tras «Ver todo» en lugar de empujar el botón fuera de la
 *    vista. Un botón que no se ve no se pulsa.
 *  · Títulos centrados y párrafos justificados, como el resto del sitio.
 *
 * Decide sola cómo cerrar: pago en línea si el producto lo permite, o
 * enlace a contacto si el importe depende del alcance. La evaluación
 * clínica nunca se cobra a ciegas: hace falta valorar antes si procede.
 */
export function TarjetaProducto({ producto }: { producto: Producto }) {
  const reducido = useReducedMotion();
  const [desplegado, setDesplegado] = useState(false);

  const hayDeMas = producto.detalles.length > DETALLES_VISIBLES;
  const visibles =
    hayDeMas && !desplegado
      ? producto.detalles.slice(0, DETALLES_VISIBLES)
      : producto.detalles;

  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-papel-puro p-7 sm:p-8 ${
        producto.destacado
          ? 'border-institucional shadow-elevada'
          : 'border-linea shadow-tarjeta'
      }`}
    >
      {/* Encabezado de altura fija para que los precios queden alineados. */}
      <div className="text-center">
        <div className="flex min-h-[2rem] items-start justify-center">
          {producto.destacado ? (
            <span className="inline-flex rounded bg-institucional px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
              Más solicitado
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-balance text-t3">{producto.nombre}</h3>

        <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-2">
          <span className="font-display text-t2 leading-none text-institucional">
            {producto.precio}
          </span>
          {producto.unidad ? (
            <span className="text-menudo text-gris">{producto.unidad}</span>
          ) : null}
        </p>
      </div>

      <p className="justificado mt-5 text-menudo leading-[1.7] text-tinta-suave">
        {producto.resumen}
      </p>

      <div className="mt-6 flex-1">
        <ul className="border-t border-linea">
          {visibles.map((detalle) => (
            <motion.li
              key={detalle}
              initial={reducido ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duracion.rapida, ease: curva.salidaSuave }}
              className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo text-tinta-suave"
            >
              <span aria-hidden className="text-institucional">
                ✓
              </span>
              <span>{detalle}</span>
            </motion.li>
          ))}
        </ul>

        {hayDeMas ? (
          <button
            type="button"
            onClick={() => setDesplegado((previo) => !previo)}
            aria-expanded={desplegado}
            className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-1.5 text-menudo font-semibold text-institucional"
          >
            {desplegado
              ? 'Ver menos'
              : `Ver todo (${producto.detalles.length - DETALLES_VISIBLES} más)`}
            <motion.span
              aria-hidden
              animate={{ rotate: desplegado ? 180 : 0 }}
              transition={reducido ? { duration: 0 } : muelle.firme}
              className="block"
            >
              ↓
            </motion.span>
          </button>
        ) : null}
      </div>

      {/* Pie anclado: la acción siempre visible, a la misma altura en todas. */}
      <div className="mt-6">
        {producto.cobro === 'directo' ? (
          <BotonMercadoPago paquete={producto.id} etiqueta={producto.accion} compacto />
        ) : (
          <Link
            href="/contacto"
            className="flex min-h-[52px] w-full items-center justify-center rounded border border-institucional/40 px-6 text-center text-cuerpo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional hover:text-papel"
          >
            {producto.accion}
          </Link>
        )}

        {producto.nota ? (
          <p className="justificado mt-4 text-menudo leading-[1.5] text-gris">
            {producto.nota}
          </p>
        ) : null}
      </div>
    </article>
  );
}
