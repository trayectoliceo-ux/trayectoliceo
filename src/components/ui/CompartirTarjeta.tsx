'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { curva, duracion } from '@/lib/motion';

/**
 * COMPARTIR UNA TARJETA DE SERVICIO
 * ---------------------------------
 * Compacto a propósito: vive dentro de una tarjeta, debajo del botón
 * principal, y no debe competir con él. El botón de contratar es el que
 * vende; este solo tiene que estar disponible cuando alguien quiere pasar
 * el servicio a una amiga, a un grupo de padres o al chat de la escuela.
 *
 * En celular usa el menú nativo del sistema, que ya tiene los contactos
 * recientes de la persona y convierte el compartir en dos toques. Si el
 * navegador no lo ofrece —que es el caso de casi todo escritorio— se
 * despliegan los cuatro destinos a mano.
 *
 * El botón de copiar cambia de texto al pulsarlo: copiar al portapapeles
 * no produce ninguna señal visible, y sin confirmación la gente lo pulsa
 * tres veces por si acaso.
 */
export function CompartirTarjeta({
  titulo,
  texto,
  url,
}: {
  titulo: string;
  texto: string;
  url: string;
}) {
  const reducido = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const mensaje = `${titulo}\n${texto}\n\n${url}`;

  const compartir = async () => {
    // `navigator.share` solo existe en contexto seguro y sobre todo en
    // móvil. Donde no está, se abren los destinos manuales.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
        return;
      } catch {
        // Cancelar el menú nativo no es un error: no se abre nada más.
        return;
      }
    }
    setAbierto((previo) => !previo);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      setCopiado(false);
    }
  };

  const destinos = [
    {
      nombre: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(mensaje)}`,
    },
    {
      nombre: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      nombre: 'Correo',
      href: `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(mensaje)}`,
    },
  ];

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => void compartir()}
        aria-expanded={abierto}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded px-4 text-menudo font-semibold text-gris transition-colors duration-200 hover:text-institucional"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A3 3 0 1 0 6 15.08c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65a2.92 2.92 0 1 0 2.92-2.92Z" />
        </svg>
        Compartir
      </button>

      {abierto ? (
        <motion.div
          initial={{ opacity: 0, y: reducido ? 0 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duracion.rapida, ease: curva.salidaSuave }}
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
        >
          {destinos.map((destino) => (
            <a
              key={destino.nombre}
              href={destino.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center rounded border border-linea px-4 text-menudo font-medium text-tinta-suave transition-colors duration-200 hover:border-institucional/40 hover:text-institucional"
            >
              {destino.nombre}
            </a>
          ))}

          <button
            type="button"
            onClick={() => void copiar()}
            className="flex min-h-[44px] items-center justify-center rounded border border-linea px-4 text-menudo font-medium text-tinta-suave transition-colors duration-200 hover:border-institucional/40 hover:text-institucional"
          >
            <motion.span
              key={copiado ? 'listo' : 'copiar'}
              initial={{ opacity: 0, y: reducido ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duracion.instante, ease: curva.salidaSuave }}
              className={copiado ? 'text-menta' : undefined}
            >
              {copiado ? 'Copiado' : 'Copiar enlace'}
            </motion.span>
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
