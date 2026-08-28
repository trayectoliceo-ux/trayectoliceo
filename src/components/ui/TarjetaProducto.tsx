import Link from 'next/link';
import { BotonMercadoPago } from '@/components/psicometrics/BotonMercadoPago';
import type { Producto } from '@/content/precios';

/**
 * Tarjeta comercial reutilizable.
 *
 * Decide sola cómo cerrar: pago en línea si el producto lo permite, o
 * enlace a contacto si el importe depende del alcance. Los servicios de
 * evaluación clínica nunca se cobran a ciegas: hace falta valorar antes si
 * el proceso procede, y cobrar primero sería vender algo que quizá no
 * necesitan.
 */
export function TarjetaProducto({ producto }: { producto: Producto }) {
  return (
    <article
      className={`flex flex-col rounded-lg border bg-papel-puro p-7 sm:p-8 ${
        producto.destacado
          ? 'border-institucional shadow-elevada'
          : 'border-linea shadow-tarjeta'
      }`}
    >
      {producto.destacado ? (
        <span className="mb-5 inline-flex w-fit rounded bg-institucional px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
          Más solicitado
        </span>
      ) : null}

      <h3 className="max-w-[24ch] text-t3">{producto.nombre}</h3>

      <p className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="font-display text-t2 leading-none text-institucional">
          {producto.precio}
        </span>
        {producto.unidad ? (
          <span className="text-menudo text-gris">{producto.unidad}</span>
        ) : null}
      </p>

      <p className="mt-4 text-menudo leading-[1.7] text-tinta-suave justificado">
        {producto.resumen}
      </p>

      <ul className="mt-6 flex-1 border-t border-linea">
        {producto.detalles.map((detalle) => (
          <li
            key={detalle}
            className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo text-tinta-suave"
          >
            <span aria-hidden className="text-institucional">
              ✓
            </span>
            <span>{detalle}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {producto.cobro === 'directo' ? (
          <BotonMercadoPago paquete={producto.id} etiqueta={producto.accion} compacto />
        ) : (
          <Link
            href="/contacto"
            className="flex min-h-[52px] w-full items-center justify-center rounded border border-institucional/40 px-6 text-cuerpo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional hover:text-papel"
          >
            {producto.accion}
          </Link>
        )}
      </div>

      {producto.nota ? (
        <p className="mt-4 text-menudo leading-[1.5] text-gris justificado">
          {producto.nota}
        </p>
      ) : null}
    </article>
  );
}
