'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CompartirTarjeta } from '@/components/ui/CompartirTarjeta';
import { Desplegable } from '@/components/ui/Desplegable';
import { escuelas } from '@/content/rutas';
import { sitio } from '@/content/sitio';
import { curva, duracion, escalonado } from '@/lib/motion';

/**
 * LOS SERVICIOS PARA INSTITUCIONES, DIVIDIDOS POR NIVEL
 * -----------------------------------------------------
 * Una sola pieza para /escuelas y para la portada.
 *
 * El filtro por nivel existe porque así decide quien compra: un director de
 * primaria no quiere leer sobre consumo de alcohol en universitarios, y un
 * coordinador de prepa pierde el interés si lo primero que ve es un cribado
 * de los más chicos. Mostrar los seis servicios a todos obliga a cada
 * visitante a descartar lo que no le toca, y ese trabajo lo hace mal.
 *
 * Lo que tiene que quedar claro antes que nada es que aplicar no cuesta:
 * por eso el precio va en verde, arriba del resumen, y la palabra
 * «gratuita» aparece antes que cualquier condición.
 */
export function ServiciosInstitucion() {
  const reducido = useReducedMotion();
  const [nivel, setNivel] = useState<(typeof escuelas.niveles)[number]['id']>('primaria');

  /*
    El menú principal lleva «Universidades» a /escuelas#universidades. Sin
    esto la persona aterriza en la pestaña de primaria y tiene que buscar
    la suya: justo el trabajo que el menú prometía ahorrarle.

    Se lee en un efecto y no durante el render porque el servidor no tiene
    `location`, y renderizar algo distinto en servidor y cliente rompe la
    hidratación.
  */
  useEffect(() => {
    const ancla = window.location.hash.replace('#', '');
    if (!ancla) return;

    const destino = escuelas.niveles.find(
      (opcion) => 'ancla' in opcion && opcion.ancla === ancla,
    );

    if (destino) setNivel(destino.id);
  }, []);

  const visibles = escuelas.servicios.filter((servicio) =>
    (servicio.niveles as readonly string[]).includes(nivel),
  );

  return (
    <div>
      {/* Selector de nivel */}
      <div
        id="universidades"
        role="tablist"
        aria-label="Nivel escolar"
        className="mx-auto flex max-w-3xl scroll-mt-28 flex-wrap items-stretch justify-center gap-2"
      >
        {escuelas.niveles.map((opcion) => {
          const activa = opcion.id === nivel;

          return (
            <button
              key={opcion.id}
              type="button"
              role="tab"
              aria-selected={activa}
              onClick={() => setNivel(opcion.id)}
              className={`relative flex min-h-[56px] flex-1 flex-col items-center justify-center rounded px-5 py-2 transition-colors duration-200 sm:flex-none sm:px-7 ${
                activa ? 'text-institucional' : 'text-gris hover:text-tinta'
              }`}
            >
              <span className="text-cuerpo font-semibold">{opcion.titulo}</span>
              <span className="text-menudo">{opcion.pie}</span>

              {/*
                El subrayado se desplaza entre pestañas con `layoutId` en vez
                de aparecer y desaparecer: comunica que una sustituye a la
                otra, que es lo que de verdad pasa.
              */}
              {activa ? (
                <motion.span
                  layoutId="nivel-activo"
                  className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-institucional"
                  transition={{ duration: duracion.rapida, ease: curva.salidaSuave }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={nivel}
          initial={{ opacity: 0, y: reducido ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duracion.base, ease: curva.salidaSuave }}
          className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibles.map((servicio, indice) => (
            <motion.article
              key={servicio.id}
              initial={{ opacity: 0, y: reducido ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duracion.base,
                ease: curva.salidaSuave,
                delay: reducido ? 0 : indice * escalonado.base,
              }}
              className={`flex flex-col rounded-lg border bg-papel-puro p-6 text-center sm:p-7 ${
                'destacado' in servicio && servicio.destacado
                  ? 'border-institucional shadow-elevada'
                  : 'border-linea shadow-tarjeta'
              }`}
            >
              {/* La etiqueta reserva dos renglones: hay nombres de etapa que
                  ocupan una línea y otros dos, y ese renglón de diferencia
                  desalineaba la tarjeta entera por debajo. */}
              <p className="etiqueta min-h-[2.75em]">{servicio.etiqueta}</p>

              <h3 className="titulo-tarjeta font-display font-bold">{servicio.nombre}</h3>

              {/* Qué resuelve, no qué mide. Es la frase que decide. */}
              <p className="frase-resuelve mt-2 font-semibold text-tinta">
                {servicio.resuelve}
              </p>

              <p className="mt-4 whitespace-nowrap font-display text-entrada font-bold leading-[1.2] text-menta">
                {servicio.precio}
              </p>
              <p className="mt-1 min-h-[2.6em] text-menudo leading-[1.3] text-gris">
                {servicio.precioNota}
              </p>

              <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave lg:min-h-[7em]">
                {servicio.resumen}
              </p>

              <div className="mt-4">
                <Desplegable resumen="Qué incluye">
                  {/*
                    Primero qué pruebas son y qué hace cada una, después las
                    condiciones. Quien abre este desplegable ya decidió que
                    le interesa: lo que busca es saber qué va a aplicar en
                    sus aulas, no volver a leer el argumento de venta.
                  */}
                  <p className="text-left text-menudo font-bold uppercase tracking-[0.08em] text-tinta">
                    Qué pruebas incluye
                  </p>
                  <ul className="mt-2 border-t border-linea text-left">
                    {servicio.pruebas.map((prueba) => (
                      <li key={prueba.nombre} className="border-b border-linea py-2.5">
                        <span className="block text-menudo font-semibold text-institucional">
                          {prueba.nombre}
                        </span>
                        <span className="mt-0.5 block text-menudo leading-[1.6] text-tinta-suave">
                          {prueba.que}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-left text-menudo font-bold uppercase tracking-[0.08em] text-tinta">
                    Cómo se aplica
                  </p>
                  <ul className="mt-2 border-t border-linea text-left">
                    {servicio.puntos.map((punto) => (
                      <li
                        key={punto}
                        className="flex items-baseline gap-3 border-b border-linea py-2.5 text-menudo leading-[1.6] text-tinta-suave"
                      >
                        <span aria-hidden className="text-institucional">
                          ✓
                        </span>
                        <span className="min-w-0">{punto}</span>
                      </li>
                    ))}
                  </ul>
                </Desplegable>
              </div>

              {/*
                Dos destinos según quién resuelve el servicio. Las pruebas se
                aplican en la plataforma y van directo allá; el tamizaje, el
                diagnóstico de violencia y el estudio de salud psicológica
                requieren acordar fechas y permisos con el centro, así que
                pasan por el formulario de propuesta.
              */}
              <div className="pt-5">
                {servicio.destino === 'psicometrics' ? (
                  <a
                    href={servicio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={claseAccion(servicio.destacado)}
                  >
                    {servicio.accion}
                  </a>
                ) : (
                  <Link
                    href="/escuelas#propuesta"
                    className={claseAccion(servicio.destacado)}
                  >
                    {servicio.accion}
                  </Link>
                )}

                <CompartirTarjeta
                  titulo={`${servicio.nombre} · Trayecto Liceo`}
                  texto={servicio.resumen}
                  url={`${sitio.dominio}/escuelas`}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Un solo lugar para el estilo del botón: el destino cambia, el aspecto no. */
function claseAccion(destacado?: boolean) {
  const base =
    'flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200';

  return destacado
    ? `${base} bg-institucional text-papel hover:bg-institucional-hondo`
    : `${base} border border-institucional/40 text-institucional hover:border-institucional hover:bg-institucional hover:text-papel`;
}
