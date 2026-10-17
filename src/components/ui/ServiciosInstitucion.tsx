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
      className="grid items-start gap-5 lg:grid-cols-3"
    >
      {escuelas.servicios.map((servicio) => (
        <ElementoRevelar
          as="article"
          key={servicio.id}
          className={`flex flex-col rounded-lg border bg-papel-puro p-6 sm:p-7 ${
            'destacado' in servicio && servicio.destacado
              ? 'border-institucional shadow-elevada'
              : 'border-linea shadow-tarjeta'
          }`}
        >
          {/*
            La etiqueta también reserva dos renglones: «Secundaria, prepa y
            universidad» ocupa dos líneas en anchos intermedios mientras las
            otras ocupan una, y ese renglón de más desalineaba la tarjeta
            entera por debajo.
          */}
          <p className="etiqueta lg:min-h-[2.75em]">{servicio.etiqueta}</p>
          {/*
            Dos renglones reservados, medidos en `em` para que equivalgan
            siempre a dos líneas del propio título aunque su tamaño escale
            con el ancho. Así la fila de precios —que es lo que se compara
            entre tarjetas— queda a la misma altura en las tres.
          */}
          <h3 className="mt-3 text-balance text-t3 leading-[1.15] lg:min-h-[3.45em]">
            {servicio.nombre}
          </h3>

          <p className="mt-3 whitespace-nowrap font-display text-entrada font-bold leading-[1.2] text-menta">
            {servicio.precio}
          </p>
          <p className="mt-1 text-menudo text-gris">{servicio.precioNota}</p>

          <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave lg:min-h-[5.5em]">
            {servicio.resumen}
          </p>

          <div className="mt-4">
            <Desplegable resumen="Ver detalle">
              <ul className="border-t border-linea">
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
            <a
              href={servicio.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200 ${
                'destacado' in servicio && servicio.destacado
                  ? 'bg-institucional text-papel hover:bg-institucional-hondo'
                  : 'border border-institucional/40 text-institucional hover:border-institucional hover:bg-institucional hover:text-papel'
              }`}
            >
              {servicio.accion}
            </a>

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
