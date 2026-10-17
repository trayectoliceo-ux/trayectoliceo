import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { Seccion } from '@/components/ui/Piezas';
import { directorio } from '@/content/rutas';

/**
 * CONSULTA DIRECTA CON UN PSICÓLOGO VERIFICADO
 * --------------------------------------------
 * Va después de los servicios, nunca antes: quien aún no ha visto un
 * resultado no sabe si necesita una consulta, y ofrecérsela de entrada
 * convierte una página de «empieza gratis» en una de venta de citas.
 *
 * El acento está en «verificado» y en «sin llamadas». Son las dos
 * objeciones reales de una familia que busca psicólogo por internet: no
 * saber si la persona tiene cédula, y tener que perseguirla por teléfono.
 */
export function BloqueDirectorio({ tono }: { tono?: 'hondo' }) {
  return (
    <Seccion tono={tono}>
      <div className="grid items-start gap-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Revelar>
          <p className="etiqueta">{directorio.etiqueta}</p>
          <h2 className="mt-5 max-w-[22ch] text-balance text-t1">{directorio.titulo}</h2>
          <p className="justificado mt-5 text-cuerpo leading-[1.7] text-tinta-suave">
            {directorio.entrada}
          </p>

          <a
            href={directorio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            {directorio.accion}
          </a>
        </Revelar>

        <GrupoRevelar
          as="ul"
          total={directorio.puntos.length}
          className="rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-8"
        >
          {directorio.puntos.map((punto, indice) => (
            <ElementoRevelar
              as="li"
              key={punto}
              className={`flex items-baseline gap-4 py-3.5 text-cuerpo leading-[1.6] text-tinta ${
                indice === 0 ? '' : 'border-t border-linea'
              }`}
            >
              <span aria-hidden className="text-menta">
                ✓
              </span>
              <span className="min-w-0">{punto}</span>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </div>
    </Seccion>
  );
}
