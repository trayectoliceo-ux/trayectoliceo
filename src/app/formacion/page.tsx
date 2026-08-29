import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Metadato, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { formacionPagina, programas } from '@/content/formacion';
import { metadatos } from '@/lib/metadatos';
import { curso, DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Diplomado en altas capacidades para profesionales',
  descripcion:
    'Diplomados y cursos en detección y evaluación de altas capacidades para psicólogos, psicopedagogos, orientadores y docentes en activo. En línea desde toda la República.',
  ruta: '/formacion',
});

export default function PaginaFormacion() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Formación profesional', ruta: '/formacion' },
        ])}
      />
      {programas.map((programa) => (
        <DatosEstructurados
          key={`schema-${programa.slug}`}
          datos={curso({
            nombre: programa.titulo,
            descripcion: programa.resumen,
            ruta: '/formacion',
            modalidad: programa.modalidad,
            duracion: programa.duracion,
          })}
        />
      ))}

      <CabeceraPagina
        etiqueta={formacionPagina.etiqueta}
        titulo={formacionPagina.titulo}
        entrada={formacionPagina.entrada}
        aviso={formacionPagina.aviso}
      />

      {programas.map((programa, indice) => (
        <Seccion key={programa.slug} tono={indice % 2 === 0 ? 'papel' : 'hondo'}>
          <article>
            <Revelar>
              <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
                <div>
                  <p className="etiqueta text-institucional">{programa.tipo}</p>
                  <h2 className="mt-4 max-w-[20ch] text-t2 sm:text-t1">{programa.titulo}</h2>
                  <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
                    {programa.resumen}
                  </p>
                </div>

                <dl className="lg:pt-2">
                  <Metadato etiqueta="Duración">{programa.duracion}</Metadato>
                  <Metadato etiqueta="Modalidad">{programa.modalidad}</Metadato>
                  <Metadato etiqueta="Dirigido a">{programa.dirigidoA}</Metadato>
                  <Metadato etiqueta="Constancia">{programa.constancia}</Metadato>
                  <Metadato etiqueta="Inversión">
                    {programa.precio}
                    {programa.notaPrecio ? (
                      <span className="mt-1 block text-[0.75rem] text-gris">
                        {programa.notaPrecio}
                      </span>
                    ) : null}
                  </Metadato>
                </dl>
              </div>
            </Revelar>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              <Revelar retraso={0.04}>
                <h3 className="etiqueta">Requisitos de admisión</h3>
                <ul className="mt-4 space-y-2">
                  {programa.requisitos.map((requisito) => (
                    <li
                      key={requisito}
                      className="flex items-baseline gap-3 text-menudo text-tinta-suave"
                    >
                      <span aria-hidden className="text-institucional">
                        —
                      </span>
                      <span>{requisito}</span>
                    </li>
                  ))}
                </ul>
              </Revelar>

              <div>
                <Revelar retraso={0.06}>
                  <h3 className="etiqueta">Temario</h3>
                </Revelar>
                <GrupoRevelar
                  as="ol"
                  total={programa.temario.length}
                  className="mt-4 border-t border-linea"
                >
                  {programa.temario.map((modulo) => (
                    <ElementoRevelar
                      as="li"
                      key={modulo.modulo}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-linea py-5"
                    >
                      <span className="font-mono text-etiqueta text-institucional">
                        {modulo.modulo}
                      </span>
                      <span>
                        <span className="block text-menudo font-medium text-tinta">
                          {modulo.titulo}
                        </span>
                        <span className="justificado mt-1 block max-w-[52ch] text-menudo leading-[1.6] text-tinta-suave">
                          {modulo.contenidos}
                        </span>
                      </span>
                    </ElementoRevelar>
                  ))}
                </GrupoRevelar>
              </div>
            </div>
          </article>
        </Seccion>
      ))}

      <LlamadaContacto
        titulo="La inscripción incluye verificación de documentación"
        texto="Escríbenos con tu perfil profesional y te confirmamos si el programa corresponde a tu formación y qué documentos necesitamos."
        accion="Solicitar información"
      />
    </>
  );
}
