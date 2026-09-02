import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { ProgramasPorPerfil } from '@/components/ui/ProgramasPorPerfil';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { acuerdo286, grupos, programas } from '@/content/certificate';
import { metadatos } from '@/lib/metadatos';
import { curso as esquemaCurso, DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Certifícate: cursos y certificaciones para profesionales',
  descripcion:
    'Cursos asincrónicos y certificaciones con examen para psicólogos, psicopedagogos y docentes. Detección de altas capacidades, evaluación psicopedagógica e informe conforme a normativa mexicana.',
  ruta: '/certificate',
});

export default function PaginaCertificate() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Certifícate', ruta: '/certificate' },
        ])}
      />
      {programas.map((programa) => (
        <DatosEstructurados
          key={`schema-${programa.id}`}
          datos={esquemaCurso({
            nombre: programa.nombre,
            descripcion: programa.resumen,
            ruta: '/certificate',
            modalidad: programa.modalidad,
            duracion: programa.duracion,
          })}
        />
      ))}

      <PortadaRuta
        etiqueta="Certifícate"
        titulo={['Fórmate y', 'certifica lo']}
        rotativas={['que ya sabes hacer.']}
        entrada="Todo es autogestivo: avanzas a tu ritmo con asesoría cuando la necesites. La diferencia está en el cierre, porque la certificación se examina y el curso no."
        tono="hondo"
      />

      {/* La distinción que evita reclamaciones y justifica el precio */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Antes de elegir</p>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-t1">
            El curso y la certificación son dos cosas.
          </h2>
        </Revelar>

        <GrupoRevelar total={2} className="mx-auto mt-9 grid max-w-4xl items-stretch gap-5 sm:grid-cols-2">
          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 shadow-tarjeta">
            <span className="inline-flex w-fit rounded bg-institucional/[0.08] px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-institucional">
              Curso
            </span>
            <h3 className="mt-4 text-t3">Acredita que lo cursaste</h3>
            <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
              Autogestivo en la plataforma, con asesoría cuando la necesites. Al
              terminar recibes constancia o diploma de participación. No incluye examen
              ni certifica competencia.
            </p>
          </ElementoRevelar>

          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-institucional bg-papel-puro p-7 shadow-elevada">
            <span className="inline-flex w-fit rounded bg-institucional px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
              Certificación · $1,000
            </span>
            <h3 className="mt-4 text-t3">Acredita que sabes hacerlo</h3>
            <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
              También autogestiva, pero cierra con examen aplicado por un experto en
              sesión en línea, grabada para auditoría y calificada. Al aprobarla se
              emite el documento con validez oficial.
            </p>
          </ElementoRevelar>
        </GrupoRevelar>
      </Seccion>

      {/* Qué incluye el precio, según el perfil */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">{grupos.etiqueta}</p>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-t1">{grupos.titulo}</h2>
          <p className="mx-auto mt-5 max-w-lectura text-cuerpo-lg text-tinta-suave">
            {grupos.entrada}
          </p>
        </Revelar>

        <GrupoRevelar
          total={2}
          className="mx-auto mt-10 grid max-w-4xl items-stretch gap-5 sm:grid-cols-2"
        >
          {grupos.lista.map((grupo) => (
            <ElementoRevelar
              key={grupo.perfil}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta"
            >
              <h3 className="text-entrada">{grupo.perfil}</h3>
              <p className="mt-1 text-menudo text-gris">{grupo.requisito}</p>

              <p className="mt-4 rounded border border-menta/30 bg-menta/[0.06] px-3 py-2 text-center text-menudo font-semibold text-menta">
                {grupo.obsequio}
              </p>

              <ul className="mt-5 flex-1 border-t border-linea">
                {grupo.puntos.map((punto) => (
                  <li
                    key={punto}
                    className="flex items-baseline gap-3 border-b border-linea py-2.5 text-menudo text-tinta-suave"
                  >
                    <span aria-hidden className="text-institucional">
                      ✓
                    </span>
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>

              {'nota' in grupo && grupo.nota ? (
                <p className="justificado mt-4 text-menudo text-gris">{grupo.nota}</p>
              ) : null}
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Programas, filtrados por perfil */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Programas</p>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-t1">
            Dinos quién eres y te mostramos lo tuyo.
          </h2>
        </Revelar>

        <Revelar retraso={0.06} className="mt-9">
          <ProgramasPorPerfil />
        </Revelar>
      </Seccion>

      {/* Titulación por Acuerdo 286 */}
      <Seccion id="titulacion">
        <Revelar className="text-center">
          <p className="etiqueta">{acuerdo286.etiqueta}</p>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-t1">{acuerdo286.titulo}</h2>
          <p className="justificado mx-auto mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
            {acuerdo286.entrada}
          </p>
        </Revelar>

        <Revelar retraso={0.06} className="mx-auto mt-12 max-w-3xl">
          <ul className="border-t border-linea">
            {acuerdo286.etapas.map((etapa) => (
              <li
                key={etapa.etapa}
                className="grid gap-2 border-b border-linea py-5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-cuerpo font-semibold text-tinta">{etapa.etapa}</span>
                <span
                  className={`text-menudo font-medium ${
                    etapa.cobrable ? 'text-institucional' : 'text-gris'
                  }`}
                >
                  Se paga a {etapa.paraQuien}
                </span>
                <span className="whitespace-nowrap font-display text-entrada font-bold text-tinta">
                  {etapa.costo}
                </span>
              </li>
            ))}
          </ul>
        </Revelar>

        <Revelar retraso={0.1} className="mx-auto mt-10 max-w-xl">
          <FormularioCompra
            producto="Titulación Acuerdo 286 · Primera etapa"
            idPago="titulacion-etapa-1"
            precio="$3,500 MXN"
            accion={acuerdo286.accion}
            perfil="titulacion"
            campoExtra={{
              clave: 'area',
              etiqueta: 'Área en la que quieres titularte',
              ayuda: 'Por ejemplo: Pedagogía',
            }}
          />
          <p className="justificado mt-6 rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.7] text-tinta-suave">
            {acuerdo286.aviso}
          </p>
        </Revelar>
      </Seccion>
    </>
  );
}
