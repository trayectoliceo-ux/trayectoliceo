import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { colegios } from '@/content/institucional';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Capacitación docente y certificación de colegios',
  descripcion:
    'Formación del claustro en detección de talento y certificación anual «Escuela que identifica talento»: auditoría, protocolo de derivación y sello renovable.',
  ruta: '/colegios',
});

export default function PaginaColegios() {
  const { capacitacion, certificacion } = colegios.comparativa;

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Programas para colegios', ruta: '/colegios' },
        ])}
      />

      <CabeceraPagina
        etiqueta={colegios.etiqueta}
        titulo={colegios.titulo}
        entrada={colegios.entrada}
      />

      {/* Dos alcances, lado a lado, con la diferencia explícita. */}
      <Seccion>
        <Revelar>
          <h2 className="text-t2">Dos alcances distintos</h2>
          <p className="mt-4 max-w-lectura text-cuerpo text-tinta-suave">
            Una capacitación forma al equipo. Una certificación cambia lo que el centro hace
            cuando aparece un caso, y se revisa cada ciclo escolar.
          </p>
        </Revelar>

        <GrupoRevelar total={2} className="mt-12 grid gap-6 lg:grid-cols-2">
          <ElementoRevelar
            as="article"
            className="flex flex-col rounded border border-linea p-8 lg:p-10"
          >
            <p className="etiqueta">{capacitacion.etiqueta}</p>
            <h3 className="mt-4 text-t3">{capacitacion.titulo}</h3>
            <p className="mt-3 text-menudo leading-[1.65] text-tinta-suave">
              {capacitacion.resumen}
            </p>
            <ul className="mt-7 flex-1 border-t border-linea">
              {capacitacion.puntos.map((punto) => (
                <li
                  key={punto}
                  className="border-b border-linea py-3 text-menudo text-tinta-suave"
                >
                  {punto}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-etiqueta uppercase text-gris">
              Inversión · {capacitacion.precio}
            </p>
          </ElementoRevelar>

          <ElementoRevelar
            as="article"
            className="sobre-oscuro flex flex-col rounded border border-institucional bg-institucional p-8 text-papel lg:p-10"
          >
            <p className="etiqueta text-sello-claro">{certificacion.etiqueta}</p>
            <h3 className="mt-4 text-t3 text-papel">{certificacion.titulo}</h3>
            <p className="mt-3 text-menudo leading-[1.65] text-papel/80">
              {certificacion.resumen}
            </p>
            <ul className="mt-7 flex-1 border-t border-linea-oscura">
              {certificacion.puntos.map((punto) => (
                <li
                  key={punto}
                  className="border-b border-linea-oscura py-3 text-menudo text-papel/85"
                >
                  {punto}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-etiqueta uppercase text-papel/60">
              Inversión · {certificacion.precio}
            </p>
          </ElementoRevelar>
        </GrupoRevelar>
      </Seccion>

      {/* Fases del proceso de certificación */}
      <Seccion tono="hondo">
        <Revelar>
          <p className="etiqueta">Proceso de certificación</p>
          <h2 className="mt-5 max-w-[22ch] text-t2 sm:text-t1">
            Cuatro fases dentro de un ciclo escolar.
          </h2>
        </Revelar>

        <GrupoRevelar as="ol" total={colegios.fases.length} className="mt-14">
          {colegios.fases.map((fase) => (
            <ElementoRevelar
              as="li"
              key={fase.numero}
              className="grid gap-4 border-t border-linea py-8 md:grid-cols-[4rem_1fr_1.4fr] md:gap-10 md:py-10"
            >
              <span className="font-mono text-etiqueta text-institucional">{fase.numero}</span>
              <div>
                <h3 className="text-entrada leading-[1.25]">{fase.titulo}</h3>
                <p className="mt-2 font-mono text-etiqueta uppercase text-gris">
                  {fase.duracion}
                </p>
              </div>
              <p className="max-w-lectura text-menudo leading-[1.65] text-tinta-suave">
                {fase.descripcion}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Qué obtiene el centro */}
      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta">Qué obtiene el centro</p>
            <h2 className="mt-5 max-w-[18ch] text-t2">
              Documentos, formación y un sello que se revisa.
            </h2>
            <p className="mt-6 max-w-lectura text-cuerpo text-tinta-suave">
              El sello tiene vigencia de un ciclo escolar. La renovación exige evidencia de
              que el protocolo se aplicó, no solo la contratación del año siguiente.
            </p>
          </Revelar>

          <GrupoRevelar
            as="ul"
            total={colegios.obtiene.length}
            className="border-t border-linea"
          >
            {colegios.obtiene.map((elemento, indice) => (
              <ElementoRevelar
                as="li"
                key={elemento}
                className="flex items-baseline gap-5 border-b border-linea py-4"
              >
                <span className="font-mono text-etiqueta text-institucional">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <span className="text-menudo text-tinta-suave">{elemento}</span>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      <LlamadaContacto
        titulo={colegios.accion.titulo}
        texto={colegios.accion.texto}
        accion="Agendar reunión"
      />
    </>
  );
}
