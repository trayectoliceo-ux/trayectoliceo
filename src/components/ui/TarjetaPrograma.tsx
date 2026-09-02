'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { TemarioSlides } from '@/components/ui/TemarioSlides';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import type { Programa } from '@/content/certificate';
import { enlaceWhatsApp } from '@/content/sitio';
import { curva, duracion, salida } from '@/lib/motion';

const pesos = (importe: number) =>
  `$${importe.toLocaleString('es-MX')} MXN`;

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
  const reducido = useReducedMotion();
  const [abierto, setAbierto] = useState(false);

  const esCertificacion = programa.tipo === 'certificacion';

  return (
    <article
      className={`rounded-lg border bg-papel-puro p-7 shadow-tarjeta sm:p-8 ${
        esCertificacion ? 'border-institucional/50' : 'border-linea'
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div>
          <span
            className={`inline-flex rounded px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] ${
              esCertificacion
                ? 'bg-institucional text-papel'
                : 'bg-institucional/[0.08] text-institucional'
            }`}
          >
            {esCertificacion ? 'Certificación' : 'Curso'}
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

          <button
            type="button"
            onClick={() => setAbierto((previo) => !previo)}
            aria-expanded={abierto}
            className="mt-6 flex min-h-[44px] items-center gap-2 text-menudo font-semibold text-institucional"
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

        {/* Precio y cierre */}
        <div className="rounded-lg border border-linea bg-papel p-6">
          {programa.destino === 'pago' ? (
            <>
              <div className="text-center">
                <p className="etiqueta">Precio de miembro</p>
                <p className="mt-1.5 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-institucional">
                  {pesos(programa.precioMiembro)}
                </p>
                <p className="mt-3 text-menudo text-gris">
                  Sin membresía: {pesos(programa.precio)}
                </p>
              </div>

              <div className="mt-6">
                <FormularioCompra
                  producto={programa.nombre}
                  idPago={programa.id}
                  precio={pesos(programa.precio)}
                  accion="Inscribirme ahora"
                  perfil={esCertificacion ? 'psicologo' : 'docente'}
                  campoExtra={
                    programa.requisito
                      ? {
                          clave: 'cedula',
                          etiqueta: 'Cédula profesional',
                          ayuda: 'La verificamos antes de confirmar tu lugar',
                        }
                      : undefined
                  }
                />
              </div>

              <p className="justificado mt-4 text-menudo text-gris">
                Al confirmar el pago recibes acceso a la plataforma y avanzas a tu
                ritmo.
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-menudo font-semibold text-tinta">
                Precio según el tamaño del equipo
              </p>
              <p className="justificado mt-3 text-menudo text-tinta-suave">
                Cotizamos por número de docentes y adaptamos el contenido al
                procedimiento de tu centro.
              </p>
              <a
                href={enlaceWhatsApp(
                  `Hola. Represento a un colegio y quiero cotizar: ${programa.nombre}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-5 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
              >
                Cotizar por WhatsApp
              </a>
            </>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {abierto ? (
          <motion.div
            initial={{ opacity: 0, height: reducido ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{
              opacity: 0,
              height: reducido ? 'auto' : 0,
              transition: { duration: salida(duracion.lenta), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.lenta, ease: curva.salidaSuave }}
            className="overflow-hidden"
          >
            <div className="pt-8">
              <TemarioSlides modulos={programa.temario} />

              {programa.resultados || programa.incluye ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {programa.resultados ? (
                    <div className="rounded-lg border border-menta/30 bg-menta/[0.05] p-6">
                      <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
                        Al terminar serás capaz de
                      </p>
                      <ul className="mt-4 space-y-2">
                        {programa.resultados.map((resultado) => (
                          <li
                            key={resultado}
                            className="flex items-baseline gap-3 text-menudo text-tinta-suave"
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
                    <div className="rounded-lg border border-linea bg-papel p-6">
                      <p className="text-menudo font-bold uppercase tracking-[0.08em] text-institucional">
                        Materiales incluidos
                      </p>
                      <ul className="mt-4 space-y-2">
                        {programa.incluye.map((material) => (
                          <li
                            key={material}
                            className="flex items-baseline gap-3 text-menudo text-tinta-suave"
                          >
                            <span aria-hidden className="text-institucional">
                              —
                            </span>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-menudo text-gris">
                        Formatos listos para usar en tu consulta desde el primer caso.
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {programa.nombreCertificacion ? (
                <div className="mt-5 rounded-lg border border-institucional bg-papel-puro p-6 text-center">
                  <p className="etiqueta">Documento que recibes</p>
                  <p className="mx-auto mt-3 max-w-[46ch] text-balance text-cuerpo font-semibold text-tinta">
                    {programa.nombreCertificacion}
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
