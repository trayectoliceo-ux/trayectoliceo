import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Marcador, Metadato, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { talleres } from '@/content/talleres';
import { metadatos } from '@/lib/metadatos';
import { curso, DatosEstructurados, migaDePan } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

/** Rutas conocidas en tiempo de compilación: el detalle se sirve estático. */
export function generateStaticParams() {
  return talleres.map((taller) => ({ slug: taller.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const taller = talleres.find((elemento) => elemento.slug === slug);

  if (!taller) return { title: 'Taller no encontrado' };

  return metadatos({
    titulo: `${taller.titulo} · Taller para ${taller.edades}`,
    descripcion: `${taller.resumen} Taller presencial en Puebla para ${taller.edades}. ${taller.duracion}, cupo de ${taller.cupo}.`,
    ruta: `/talleres/${taller.slug}`,
  });
}

export default async function PaginaTaller({ params }: Props) {
  const { slug } = await params;
  const taller = talleres.find((elemento) => elemento.slug === slug);

  if (!taller) notFound();

  return (
    <>
      <DatosEstructurados
        datos={curso({
          nombre: taller.titulo,
          descripcion: taller.resumen,
          ruta: `/talleres/${taller.slug}`,
          modalidad: taller.modalidad,
          duracion: taller.duracion,
        })}
      />
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Talleres STEAM', ruta: '/talleres' },
          { titulo: taller.titulo, ruta: `/talleres/${taller.slug}` },
        ])}
      />

      <section className="border-b border-linea">
        <div className="contenedor py-12 lg:py-16">
          <Revelar desplazamiento={8}>
            <Link
              href="/talleres"
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-etiqueta uppercase text-gris transition-colors duration-150 hover:text-institucional"
            >
              <span aria-hidden>←</span> Talleres STEAM
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              <div>
                <p className="etiqueta text-institucional">{taller.linea}</p>
                <h1 className="mt-4 max-w-[18ch] text-t1 sm:text-[3.25rem] sm:leading-[1.08]">
                  {taller.titulo}
                </h1>
                <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
                  {taller.resumen}
                </p>
              </div>

              <dl className="lg:pt-4">
                <Metadato etiqueta="Edades">{taller.edades}</Metadato>
                <Metadato etiqueta="Duración">{taller.duracion}</Metadato>
                <Metadato etiqueta="Cupo máximo">{taller.cupo}</Metadato>
                <Metadato etiqueta="Modalidad">{taller.modalidad}</Metadato>
                <Metadato etiqueta="Inversión">
                  {taller.precio}
                  {taller.notaPrecio ? (
                    <span className="mt-1 block text-[0.75rem] text-gris">
                      {taller.notaPrecio}
                    </span>
                  ) : null}
                </Metadato>

                <div className="mt-7">
                  <Link
                    href="/contacto?motivo=taller"
                    className="flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-6 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
                  >
                    Contratar para mi colegio
                  </Link>
                  <Link
                    href="/contacto?motivo=capacitacion"
                    className="mt-3 flex min-h-[52px] w-full items-center justify-center rounded border border-institucional/40 px-4 text-center text-menudo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional/[0.04]"
                  >
                    Capacitar a mi personal docente
                  </Link>
                </div>
              </dl>
            </div>
          </Revelar>
        </div>
      </section>

      <Seccion>
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Revelar>
              <Marcador descripcion={taller.marcador} proporcion="4 / 3" />
              <p className="etiqueta mt-6">Materiales</p>
              <p className="mt-2 max-w-[40ch] text-menudo text-tinta-suave">
                {taller.materiales}
              </p>
            </Revelar>
          </div>

          <div>
            <Revelar>
              <h2 className="text-t3">Cómo se trabaja</h2>
              <div className="mt-5 space-y-5">
                {taller.descripcion.map((parrafo) => (
                  <p key={parrafo} className="max-w-lectura text-cuerpo text-tinta-suave justificado">
                    {parrafo}
                  </p>
                ))}
              </div>
            </Revelar>

            <Revelar retraso={0.06} className="mt-14">
              <h2 className="text-t3">Temario</h2>
            </Revelar>

            <GrupoRevelar
              as="ol"
              total={taller.temario.length}
              className="mt-6 border-t border-linea"
            >
              {taller.temario.map((tema, indice) => (
                <ElementoRevelar
                  as="li"
                  key={tema.titulo}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-linea py-5"
                >
                  <span className="font-mono text-etiqueta text-institucional">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-menudo font-medium text-tinta">
                      {tema.titulo}
                    </span>
                    <span className="mt-1 block text-menudo text-tinta-suave">
                      {tema.detalle}
                    </span>
                  </span>
                </ElementoRevelar>
              ))}
            </GrupoRevelar>
          </div>
        </div>
      </Seccion>

      <LlamadaContacto
        titulo="Inscripción por contacto directo"
        texto="Confirmamos cupo, sede y fechas antes de cualquier pago. Escríbenos indicando la edad del menor y te respondemos con la disponibilidad real."
        accion="Solicitar lugar"
      />
    </>
  );
}
