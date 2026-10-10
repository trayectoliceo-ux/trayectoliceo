'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { sitio } from '@/content/sitio';
import { curva, duracion } from '@/lib/motion';

/**
 * COMPARTIR SERVICIO POR WHATSAPP
 * -------------------------------
 * Va al pie de cada página de servicio, no en la portada: quien llega al
 * final de una ficha ya entendió de qué se trata, y ese es el momento en
 * que se la manda a alguien. En la portada aún no sabe qué compartiría.
 *
 * El mensaje lleva el precio cuando existe, porque es lo primero que
 * pregunta quien lo recibe y evita una vuelta de conversación.
 */
export function CompartirServicio({
  servicio,
  ruta,
  precio,
  descripcion,
}: {
  servicio: string;
  ruta: string;
  precio?: string;
  descripcion?: string;
}) {
  const reducido = useReducedMotion();
  const [copiado, setCopiado] = useState(false);

  const url = `${sitio.dominio}${ruta}`;
  const partes = [servicio, precio, descripcion, '', url].filter(Boolean);
  const mensaje = partes.join('\n');

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
    <div className="mx-auto max-w-2xl rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta">
      <p className="text-menudo font-semibold text-tinta">
        ¿Le sirve a alguien que conoces?
      </p>
      <p className="justificado-limpio mx-auto mt-2 max-w-[42ch] text-menudo leading-[1.75] text-gris">
        Comparte esta página y quien la reciba verá el servicio completo, con
        precios y sin tener que preguntar nada.
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(mensaje)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded bg-institucional px-5 text-menudo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
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
    </div>
  );
}
