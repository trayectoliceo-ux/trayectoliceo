import { CompartirTarjeta } from '@/components/ui/CompartirTarjeta';
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
 * Los puntos no se esconden tras un desplegable. Un director que está
 * valorando meter esto en sus aulas necesita ver de una vez qué datos se
 * guardan y cuáles no: esa es justo la objeción que frena la decisión, y
 * enterrarla la agrava.
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
      className="grid items-stretch gap-5 lg:grid-cols-3 lg:grid-rows-[repeat(5,auto)_1fr_auto_auto]"
    >
      {escuelas.servicios.map((servicio) => (
        <ElementoRevelar
          as="article"
          key={servicio.id}
          className={`flex h-full flex-col rounded-lg border bg-papel-puro p-6 sm:p-7 lg:row-span-8 lg:grid lg:grid-rows-subgrid ${
            'destacado' in servicio && servicio.destacado
              ? 'border-institucional shadow-elevada'
              : 'border-linea shadow-tarjeta'
          }`}
        >
          <p className="etiqueta">{servicio.etiqueta}</p>
          <h3 className="mt-3 text-balance text-t3">{servicio.nombre}</h3>

          <p className="mt-3 whitespace-nowrap font-display text-entrada font-bold leading-[1.2] text-menta">
            {servicio.precio}
          </p>
          <p className="mt-1 text-menudo text-gris">{servicio.precioNota}</p>

          <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave">
            {servicio.resumen}
          </p>

          <ul className="mt-5 flex-1 border-t border-linea lg:flex-none">
            {servicio.puntos.map((punto) => (
              <li
                key={punto}
                className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo leading-[1.6] text-tinta-suave"
              >
                <span aria-hidden className="text-institucional">
                  ✓
                </span>
                <span className="min-w-0">{punto}</span>
              </li>
            ))}
          </ul>

          <a
            href={servicio.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200 ${
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
        </ElementoRevelar>
      ))}
    </GrupoRevelar>
  );
}
