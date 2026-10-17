import Link from 'next/link';
import { CompartirTarjeta } from '@/components/ui/CompartirTarjeta';
import { Desplegable } from '@/components/ui/Desplegable';
import { ElementoRevelar, GrupoRevelar } from '@/components/ui/Revelar';
import { escuelas } from '@/content/rutas';
import { sitio } from '@/content/sitio';

/**
 * LOS TRES SERVICIOS PARA INSTITUCIONES
 * -------------------------------------
 * Una sola pieza para /escuelas y para la portada. Lo que tiene que quedar
 * claro antes que nada es que aplicar no cuesta: por eso el precio va en
 * verde, arriba del resumen, y la palabra «gratuita» aparece antes que
 * cualquier condición.
 *
 * Los puntos van en un desplegable para que las tres tarjetas quepan
 * juntas en pantalla y puedan compararse. Lo que decide es el precio y el
 * resumen; el detalle de qué mide cada prueba y qué datos se guardan lo
 * abre quien ya se interesó por una en concreto.
 */
/** Un solo lugar para el estilo del botón: el destino cambia, el aspecto no. */
function claseAccion(destacado?: boolean) {
  const base =
    'flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200';

  return destacado
    ? `${base} bg-institucional text-papel hover:bg-institucional-hondo`
    : `${base} border border-institucional/40 text-institucional hover:border-institucional hover:bg-institucional hover:text-papel`;
}

export function ServiciosInstitucion() {
  return (
    /*
      En escritorio las tres tarjetas comparten las filas del contenedor
      mediante subgrid: el nombre, el precio, la lista y el botón quedan a
      la misma altura en las tres, sin importar que un título ocupe dos
      líneas y otro tres.

      Reservar una altura fija en el título era la alternativa, y no
      aguanta: lo que cabe en dos líneas a 1440 px ocupa tres a 1024, así
      que la alineación se rompía justo en las medidas intermedias.
    */
    <GrupoRevelar
      total={escuelas.servicios.length}
      className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {escuelas.servicios.map((servicio) => (
        <ElementoRevelar
          as="article"
          key={servicio.id}
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

          <h3 className="titulo-tarjeta font-display font-bold">
            {servicio.nombre}
          </h3>

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
            <Desplegable resumen="Ver detalle">
              <ul className="border-t border-linea text-left">
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
            Sin estirar a la altura de la más alta: al abrir un detalle solo
            crece esa tarjeta. Cerradas quedan iguales por las alturas
            mínimas reservadas arriba.
          */}
          <div className="pt-5">
            {/*
              Dos destinos según quién resuelve el servicio. Las pruebas se
              aplican en PsicoMetrics y van directo allá; el tamizaje y el
              estudio de salud psicológica requieren acordar fechas y
              permisos con el centro, así que pasan por el formulario de
              propuesta de esta misma página.
            */}
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
        </ElementoRevelar>
      ))}
    </GrupoRevelar>
  );
}
