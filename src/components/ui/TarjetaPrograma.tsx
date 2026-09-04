'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ModalTemario } from '@/components/ui/ModalTemario';
import { AccesoPrograma } from '@/components/ui/AccesoPrograma';
import type { Programa } from '@/content/certificate';
import { curva, duracion } from '@/lib/motion';

/**
 * Ficha de programa.
 *
 * Distingue curso de certificación desde la etiqueta, porque es la
 * diferencia que justifica el precio: un curso acredita haberlo cursado,
 * una certificación se examina y se califica.
 *
 * El cierre depende del destino: los programas autogestivos cobran en línea
 * y dan acceso a la plataforma; los institucionales derivan a WhatsApp,
 * porque el precio depende del tamaño del equipo.
 */
export function TarjetaPrograma({ programa }: { programa: Programa }) {
  const [abierto, setAbierto] = useState(false);


  return (
    <article
      className="rounded-lg border border-linea bg-papel-puro p-7 shadow-tarjeta sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div>
          <span className="inline-flex rounded bg-institucional/[0.08] px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-institucional">
            Curso autogestivo
          </span>

          <h3 className="mt-4 text-balance text-t3">{programa.nombre}</h3>
          <p className="mt-2 text-menudo font-semibold text-institucional">
            {programa.dirigidoA}
          </p>
          <p className="justificado mt-4 max-w-lectura text-menudo leading-[1.7] text-tinta-suave">
            {programa.resumen}
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { etiqueta: 'Duración', valor: programa.duracion },
              { etiqueta: 'Modalidad', valor: programa.modalidad },
              { etiqueta: 'Al terminar', valor: programa.entrega },
              ...(programa.requisito
                ? [{ etiqueta: 'Requisito', valor: programa.requisito }]
                : []),
            ].map((dato) => (
              <div key={dato.etiqueta} className="border-t border-linea pt-3">
                <dt className="etiqueta">{dato.etiqueta}</dt>
                <dd className="mt-1 text-menudo text-tinta">{dato.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`/programa/${programa.id}`}
              className="flex min-h-[44px] items-center gap-2 text-menudo font-semibold text-institucional underline underline-offset-4"
            >
              Ficha completa y compartir
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setAbierto((previo) => !previo)}
            aria-expanded={abierto}
            className="mt-1 flex min-h-[44px] items-center gap-2 text-menudo font-semibold text-institucional"
          >
            {abierto ? 'Ocultar temario' : 'Ver temario completo'}
            <motion.span
              aria-hidden
              animate={{ rotate: abierto ? 180 : 0 }}
              transition={{ duration: duracion.rapida, ease: curva.salidaSuave }}
              className="block"
            >
              ↓
            </motion.span>
          </button>
        </div>

        {/* Acceso y cierre, según el perfil del programa */}
        <AccesoPrograma programa={programa} />
      </div>

      <ModalTemario
        programa={programa}
        abierto={abierto}
        alCerrar={() => setAbierto(false)}
      />
    </article>
  );
}
