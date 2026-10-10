'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { sitio } from '@/content/sitio';
import { curva, duracion } from '@/lib/motion';

/**
 * COMPARTIR FICHA POR WHATSAPP
 * ----------------------------
 * Pensado para el equipo comercial: abre WhatsApp con un mensaje ya
 * redactado que incluye el nombre, el precio y el enlace directo a esta
 * ficha. Quien lo recibe llega a una pantalla donde puede leer el temario
 * y pagar sin salir.
 *
 * El botón de copiar existe para cuando se comparte por otro canal
 * —correo, Instagram, un grupo— y confirma la acción cambiando de texto,
 * porque copiar al portapapeles no produce ninguna señal visible.
 */
export function BotonCompartir({
  nombre,
  ruta,
  precio,
}: {
  nombre: string;
  ruta: string;
  precio?: string;
}) {
  const reducido = useReducedMotion();
  const [copiado, setCopiado] = useState(false);

  const url = `${sitio.dominio}${ruta}`;
  const mensaje = precio
    ? `${nombre}\n${precio}\n\nTemario completo e inscripción aquí:\n${url}`
    : `${nombre}\n\nTemario completo aquí:\n${url}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded border border-institucional/40 px-5 text-menudo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional/[0.04]"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
        </svg>
        Compartir por WhatsApp
      </a>

      <button
        type="button"
        onClick={() => void copiar()}
        className="flex min-h-[48px] items-center justify-center rounded border border-linea px-5 text-menudo font-semibold text-tinta-suave transition-colors duration-200 hover:border-institucional/40"
      >
        <motion.span
          key={copiado ? 'listo' : 'copiar'}
          initial={{ opacity: 0, y: reducido ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duracion.instante, ease: curva.salidaSuave }}
          className={copiado ? 'text-menta' : undefined}
        >
          {copiado ? 'Enlace copiado' : 'Copiar enlace'}
        </motion.span>
      </button>
    </div>
  );
}
