import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { TemarioSlides } from '@/components/ui/TemarioSlides';
import { AccesoPrograma } from '@/components/ui/AccesoPrograma';
import { BotonCompartir } from '@/components/ui/BotonCompartir';
import { programas } from '@/content/certificate';
import { metadatos } from '@/lib/metadatos';
import { curso as esquemaCurso, DatosEstructurados, migaDePan } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

/** Una ficha por programa, generada en compilación. */
export function generateStaticParams() {
  return programas.map((programa) => ({ slug: programa.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const programa = programas.find((elemento) => elemento.id === slug);

  if (!programa) return { title: 'Programa no encontrado' };

  return metadatos({
    titulo: programa.nombre,
    descripcion: `${programa.resumen} ${programa.duracion}. ${programa.dirigidoA}.`,
    ruta: `/programa/${programa.id}`,
  });
}

/**
 * FICHA COMPARTIBLE DE PROGRAMA
 * -----------------------------
 * Pensada para mandarse por WhatsApp: una sola pantalla con el temario, el
 * precio y el pago. Quien la recibe no tiene que buscar nada ni volver al
 * menú, que es donde se pierde la mayoría de las inscripciones.
 */
export default async function PaginaPrograma({ params }: Props) {
  const { slug } = await params;
  const programa = programas.find((elemento) => elemento.id === slug);

  if (!programa) notFound();

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Certifícate', ruta: '/certificate' },
          { titulo: programa.nombre, ruta: `/programa/${programa.id}` },
        ])}
      />
      <DatosEstructurados
        datos={esquemaCurso({
          nombre: programa.nombre,
          descripcion: programa.resumen,
          ruta: `/programa/${programa.id}`,
          modalidad: programa.modalidad,
          duracion: programa.duracion,
        })}
      />

      <section className="border-b border-linea bg-papel-hondo">
        <div className="contenedor py-10 lg:py-14">
          <Revelar desplazamiento={8}>
            <Link
              href="/certificate"
              className="inline-flex min-h-[44px] items-center gap-2 text-menudo font-semibold text-institucional"
            >
              <span aria-hidden>←</span> Todos los programas
            </Link>

            <p className="etiqueta mt-5">{programa.dirigidoA}</p>
            <h1 className="mt-4 max-w-[24ch] text-balance text-t1">{programa.nombre}</h1>
            <p className="justificado mt-5 max-w-lectura text-cuerpo-lg text-tinta-suave">
              {programa.resumen}
            </p>

            <dl className="mt-7 grid items-stretch gap-3 sm:grid-cols-3">
              {[
                { etiqueta: 'Duración', valor: programa.duracion },
                { etiqueta: 'Modalidad', valor: programa.modalidad },
                { etiqueta: 'Al terminar', valor: programa.entrega },
              ].map((dato) => (
                <div
                  key={dato.etiqueta}
                  className="rounded-lg border border-linea bg-papel-puro p-4"
                >
                  <dt className="etiqueta">{dato.etiqueta}</dt>
                  <dd className="mt-1.5 text-menudo text-tinta">{dato.valor}</dd>
                </div>
              ))}
            </dl>
          </Revelar>
        </div>
      </section>

      <Seccion>
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-12">
          <div>
            <Revelar>
              <p className="etiqueta">Temario</p>
              <h2 className="mt-3 text-t2">Qué vas a ver</h2>
            </Revelar>

            <Revelar retraso={0.05} className="mt-6">
              <TemarioSlides modulos={programa.temario} />
            </Revelar>

            {programa.resultados ? (
              <Revelar retraso={0.08} className="mt-5 rounded-lg border border-menta/30 bg-menta/[0.05] p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
                  Al terminar serás capaz de
                </p>
                <ul className="mt-3 space-y-1.5">
                  {programa.resultados.map((resultado) => (
                    <li
                      key={resultado}
                      className="flex items-baseline gap-2.5 text-menudo text-tinta-suave"
                    >
                      <span aria-hidden className="text-menta">
                        ✓
                      </span>
                      <span>{resultado}</span>
                    </li>
                  ))}
                </ul>
              </Revelar>
            ) : null}

            {programa.incluye ? (
              <Revelar retraso={0.1} className="mt-4 rounded-lg border border-linea bg-papel-puro p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-institucional">
                  Materiales incluidos
                </p>
                <ul className="mt-3 space-y-1.5">
                  {programa.incluye.map((material) => (
                    <li
                      key={material}
                      className="flex items-baseline gap-2.5 text-menudo text-tinta-suave"
                    >
                      <span aria-hidden className="text-institucional">
                        —
                      </span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </Revelar>
            ) : null}
          </div>

          {/* Acceso, siempre a la vista */}
          <Revelar retraso={0.06} className="lg:sticky lg:top-24">
            <AccesoPrograma programa={programa} />

            <div className="mt-4">
              <BotonCompartir
                nombre={programa.nombre}
                ruta={`/programa/${programa.id}`}

              />
            </div>
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
