import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { articulos } from '@/content/institucional';
import { metadatos } from '@/lib/metadatos';
import { articulo as esquemaArticulo, DatosEstructurados, migaDePan } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articulos.map((articulo) => ({ slug: articulo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articulo = articulos.find((elemento) => elemento.slug === slug);

  if (!articulo) return { title: 'Artículo no encontrado' };

  return metadatos({
    titulo: articulo.titulo,
    descripcion: articulo.entradilla,
    ruta: `/recursos/${articulo.slug}`,
    tipo: 'article',
  });
}

/**
 * Plantilla de artículo. Cuando el volumen de publicaciones lo justifique,
 * sustituir el arreglo de `institucional.ts` por MDX o por un CMS sin tocar
 * esta vista: solo cambia el origen de `articulo`.
 */
export default async function PaginaArticulo({ params }: Props) {
  const { slug } = await params;
  const articulo = articulos.find((elemento) => elemento.slug === slug);

  if (!articulo) notFound();

  return (
    <>
      <DatosEstructurados
        datos={esquemaArticulo({
          titulo: articulo.titulo,
          descripcion: articulo.entradilla,
          ruta: `/recursos/${articulo.slug}`,
          autor: articulo.autor,
        })}
      />
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Recursos', ruta: '/recursos' },
          { titulo: articulo.titulo, ruta: `/recursos/${articulo.slug}` },
        ])}
      />

      <article>
        <header className="border-b border-linea">
          <div className="contenedor py-12 lg:py-16">
            <Revelar desplazamiento={8}>
              <Link
                href="/recursos"
                className="inline-flex min-h-[44px] items-center gap-2 font-mono text-etiqueta uppercase text-gris transition-colors duration-150 hover:text-institucional"
              >
                <span aria-hidden>←</span> Recursos
              </Link>

              <p className="mt-6 font-mono text-etiqueta uppercase text-institucional">
                {articulo.categoria}
              </p>
              <h1 className="mt-4 max-w-[22ch] text-t1 sm:text-[3rem] sm:leading-[1.1]">
                {articulo.titulo}
              </h1>
              <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
                {articulo.entradilla}
              </p>
              <p className="mt-8 font-mono text-etiqueta uppercase text-gris">
                {articulo.autor} · {articulo.fecha} · {articulo.lectura}
              </p>
            </Revelar>
          </div>
        </header>

        <Seccion>
          <Revelar>
            <div className="max-w-lectura space-y-6">
              {articulo.cuerpo.map((parrafo) => (
                <p key={parrafo} className="text-cuerpo-lg leading-[1.8] text-tinta">
                  {parrafo}
                </p>
              ))}
            </div>
          </Revelar>
        </Seccion>
      </article>

      <LlamadaContacto
        titulo="¿Te reconoces en este caso?"
        texto="Si algo de lo que leíste describe tu situación, escríbenos. La primera conversación es sin costo."
        accion="Escribir a Trayecto Liceo"
      />
    </>
  );
}
