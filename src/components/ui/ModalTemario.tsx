'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { TemarioSlides } from '@/components/ui/TemarioSlides';
import type { Programa } from '@/content/certificate';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * VENTANA FLOTANTE DE TEMARIO
 * ---------------------------
 * El temario es información de apoyo: quien la pide quiere revisarla y
 * volver, no perder el sitio donde estaba. Una ventana flotante lo resuelve
 * mejor que un desplegable, que empuja el precio y el botón fuera de la
 * pantalla justo cuando la persona está decidiendo.
 *
 * Requisitos de accesibilidad que cumple:
 *  · Cierra con Escape y con clic fuera.
 *  · Bloquea el scroll de la página detrás.
 *  · Devuelve el foco al botón que la abrió.
 *  · Se anuncia como diálogo modal.
 */
export function ModalTemario({
  programa,
  abierto,
  alCerrar,
}: {
  programa: Programa;
  abierto: boolean;
  alCerrar: () => void;
}) {
  const reducido = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;

    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') alCerrar();
    };

    document.addEventListener('keydown', alPulsar);
    document.body.style.overflow = 'hidden';
    panel.current?.focus();

    return () => {
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = '';
    };
  }, [abierto, alCerrar]);

  return (
    <AnimatePresence>
      {abierto ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Fondo: atenúa la página y captura el clic para cerrar. */}
          <motion.button
            type="button"
            aria-label="Cerrar temario"
            onClick={alCerrar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: salida(duracion.base) } }}
            transition={{ duration: duracion.base }}
            className="absolute inset-0 cursor-default bg-tinta/45 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Temario de ${programa.nombre}`}
            // En móvil sube desde abajo, en escritorio aparece centrada:
            // cada gesto coincide con el origen esperado en su formato.
            initial={{ opacity: 0, y: reducido ? 0 : 24, scale: reducido ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: reducido ? 0 : 16,
              scale: reducido ? 1 : 0.99,
              transition: { duration: salida(duracion.lenta), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.lenta, ease: curva.salidaSuave }}
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-lg bg-papel shadow-elevada sm:max-h-[88dvh] sm:rounded-lg"
          >
            <header className="flex items-start justify-between gap-5 border-b border-linea px-6 py-5">
              <div>
                <p className="etiqueta">Temario</p>
                <h2 className="mt-1.5 text-balance text-entrada leading-[1.25]">
                  {programa.nombre}
                </h2>
                <p className="mt-1 text-menudo text-gris">
                  {programa.duracion} · {programa.modalidad}
                </p>
              </div>

              <button
                type="button"
                onClick={alCerrar}
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded text-tinta-suave transition-colors duration-150 hover:text-institucional"
              >
                <span className="sr-only">Cerrar</span>
                <span aria-hidden className="text-xl leading-none">
                  ×
                </span>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              <TemarioSlides modulos={programa.temario} />

              {programa.resultados || programa.incluye ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {programa.resultados ? (
                    <div className="rounded-lg border border-menta/30 bg-menta/[0.05] p-5">
                      <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
                        Al terminar serás capaz de
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {programa.resultados.map((resultado) => (
                          <li
                            key={resultado}
                            className="flex items-baseline gap-2.5 text-menudo text-tinta-suave"
                          >
                            <span aria-hidden className="text-menta">
                              ✓
                            </span>
                            <span>{resultado}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {programa.incluye ? (
                    <div className="rounded-lg border border-linea bg-papel-puro p-5">
                      <p className="text-menudo font-bold uppercase tracking-[0.08em] text-institucional">
                        Materiales incluidos
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {programa.incluye.map((material) => (
                          <li
                            key={material}
                            className="flex items-baseline gap-2.5 text-menudo text-tinta-suave"
                          >
                            <span aria-hidden className="text-institucional">
                              —
                            </span>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {programa.nombreCertificacion ? (
                <div className="mt-4 rounded-lg border border-institucional bg-papel-puro p-5 text-center">
                  <p className="etiqueta">Documento que recibes</p>
                  <p className="mx-auto mt-2 max-w-[46ch] text-balance text-menudo font-semibold text-tinta">
                    {programa.nombreCertificacion}
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
