import Link from 'next/link';
import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { TarjetaPrograma } from '@/components/ui/TarjetaPrograma';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { acuerdo286, membresia, programas } from '@/content/certificate';
import { metadatos } from '@/lib/metadatos';
import { curso as esquemaCurso, DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Certifícate: cursos y certificaciones para profesionales',
  descripcion:
    'Cursos asincrónicos y certificaciones con examen para psicólogos, psicopedagogos y docentes. Detección de altas capacidades, evaluación psicopedagógica e informe conforme a normativa mexicana.',
  ruta: '/certificate',
});

export default function PaginaCertificate() {
  const certificaciones = programas.filter((p) => p.tipo === 'certificacion');
  const cursos = programas.filter((p) => p.tipo === 'curso');

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
        entrada="Certificaciones con sesiones en vivo y examen aplicado por un experto, y cursos asincrónicos para avanzar a tu ritmo. Ambas cosas existen aquí, y no son lo mismo."
        tono="hondo"
      />

      {/* La distinción que evita reclamaciones y justifica el precio */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Antes de elegir</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-t1">
            Un curso no es una certificación.
          </h2>
        </Revelar>

        <GrupoRevelar total={2} className="mx-auto mt-12 grid max-w-4xl items-stretch gap-5 sm:grid-cols-2">
          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 shadow-tarjeta">
            <span className="inline-flex w-fit rounded bg-institucional/[0.08] px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-institucional">
              Curso
            </span>
            <h3 className="mt-4 text-t3">Acredita que lo cursaste</h3>
            <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
              Contenido asincrónico en la plataforma. Avanzas a tu ritmo y al terminar
              recibes constancia o diploma de participación. No incluye examen ni
              certifica competencia.
            </p>
          </ElementoRevelar>

          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-institucional bg-papel-puro p-7 shadow-elevada">
            <span className="inline-flex w-fit rounded bg-institucional px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
              Certificación
            </span>
            <h3 className="mt-4 text-t3">Acredita que sabes hacerlo</h3>
            <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
              Incluye examen aplicado por un experto en sesión en línea, grabada para
              auditoría y calificada. Al aprobarla se emite el documento con validez
              oficial.
            </p>
          </ElementoRevelar>
        </GrupoRevelar>
      </Seccion>

      {/* Membresía */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">{membresia.etiqueta}</p>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-t1">{membresia.titulo}</h2>
          <p className="mx-auto mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
            {membresia.entrada}
          </p>
        </Revelar>

        <GrupoRevelar total={2} className="mx-auto mt-12 grid max-w-4xl items-stretch gap-5 sm:grid-cols-2">
          {membresia.vias.map((via) => (
            <ElementoRevelar
              key={via.perfil}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 shadow-tarjeta"
            >
              <h3 className="text-entrada">{via.perfil}</h3>
              <p className="justificado mt-4 text-menudo font-semibold text-tinta">
                {via.condicion}
              </p>
              <p className="justificado mt-3 flex-1 text-menudo text-tinta-suave">
                {via.nota}
              </p>
              <Link
                href={via.href}
                className="mt-5 inline-flex min-h-[44px] items-center text-menudo font-semibold text-institucional underline underline-offset-4"
              >
                {via.accion}
              </Link>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Certificaciones */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Certificaciones</p>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-t1">
            Sesiones sabatinas, examen y validez oficial.
          </h2>
        </Revelar>

        <div className="mt-12 space-y-6">
          {certificaciones.map((programa) => (
            <Revelar key={programa.id}>
              <TarjetaPrograma programa={programa} />
            </Revelar>
          ))}
        </div>
      </Seccion>

      {/* Cursos */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">Cursos</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-t1">Asincrónicos, a tu ritmo.</h2>
        </Revelar>

        <div className="mt-12 space-y-6">
          {cursos.map((programa) => (
            <Revelar key={programa.id}>
              <TarjetaPrograma programa={programa} />
            </Revelar>
          ))}
        </div>
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
