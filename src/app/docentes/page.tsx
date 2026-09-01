import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { docentes } from '@/content/rutas';
import { avisoConstancias } from '@/content/precios';
import { metadatos } from '@/lib/metadatos';
import { curso as esquemaCurso, DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Curso de detección en el aula para docentes',
  descripcion:
    'Curso de 20 horas en detección temprana de dificultades de aprendizaje y altas capacidades. $1,800 MXN por participante, con constancia.',
  ruta: '/docentes',
});

export default function PaginaDocentes() {
  const { curso } = docentes;

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Para docentes', ruta: '/docentes' },
        ])}
      />
      <DatosEstructurados
        datos={esquemaCurso({
          nombre: curso.nombre,
          descripcion: docentes.portada.entrada,
          ruta: '/docentes',
          modalidad: curso.modalidad,
          duracion: curso.duracion,
        })}
      />

      <PortadaRuta
        etiqueta={docentes.portada.etiqueta}
        titulo={docentes.portada.titulo}
        rotativas={docentes.portada.rotativas}
        entrada={docentes.portada.entrada}
      />

      {/* Aclaración de alcance: evita expectativas equivocadas */}
      <Seccion tono="hondo">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Revelar>
            <h2 className="max-w-[20ch] text-t2">{docentes.aclaracion.titulo}</h2>
            <p className="justificado mt-5 max-w-lectura text-cuerpo text-tinta-suave">
              {docentes.aclaracion.texto}
            </p>
          </Revelar>

          <GrupoRevelar
            as="ul"
            total={docentes.aclaracion.puntos.length}
            className="border-t border-linea"
          >
            {docentes.aclaracion.puntos.map((punto) => (
              <ElementoRevelar
                as="li"
                key={punto}
                className="flex items-baseline gap-4 border-b border-linea py-4 text-cuerpo text-tinta-suave"
              >
                <span aria-hidden className="text-institucional">
                  ✓
                </span>
                <span>{punto}</span>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* El curso */}
      <Seccion>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Revelar>
            <p className="etiqueta">El curso</p>
            <h2 className="mt-5 max-w-[20ch] text-t1">{curso.nombre}</h2>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { etiqueta: 'Duración', valor: curso.duracion },
                { etiqueta: 'Modalidad', valor: curso.modalidad },
              ].map((dato) => (
                <div
                  key={dato.etiqueta}
                  className="rounded-lg border border-linea bg-papel-puro p-5 shadow-tarjeta"
                >
                  <dt className="etiqueta">{dato.etiqueta}</dt>
                  <dd className="mt-2 text-menudo font-semibold text-tinta">
                    {dato.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="etiqueta mt-10">Temario</p>
            <ol className="mt-4 border-t border-linea">
              {curso.temario.map((tema, indice) => (
                <li
                  key={tema}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-linea py-3"
                >
                  <span className="font-mono text-menudo text-institucional">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span className="text-menudo text-tinta-suave">{tema}</span>
                </li>
              ))}
            </ol>
          </Revelar>

          <Revelar retraso={0.06}>
            <div className="lg:sticky lg:top-28">
              <FormularioCompra
                producto={curso.nombre}
                idPago={curso.id}
                precio={curso.precio}
                accion={curso.accion}
                perfil="docente"
                campoExtra={{
                  clave: 'centro',
                  etiqueta: 'Escuela donde trabajas',
                  ayuda: 'Nos ayuda a agrupar por zona',
                }}
              />
              <p className="justificado mt-5 text-menudo text-tinta-suave">
                {curso.grupo}
              </p>
              <p className="justificado mt-3 text-menudo text-gris">{avisoConstancias}</p>
            </div>
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
