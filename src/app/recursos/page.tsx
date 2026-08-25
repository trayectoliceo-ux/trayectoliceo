import Link from 'next/link';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { FormularioMaterial } from '@/components/contacto/FormularioMaterial';
import { articulos, materiales, recursosPagina } from '@/content/institucional';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Recursos sobre detección de altas capacidades',
  descripcion:
    'Artículos y materiales de trabajo sobre detección de altas capacidades, dirigidos a familias, docentes y profesionales de la evaluación psicopedagógica.',
  ruta: '/recursos',
});

export default function PaginaRecursos() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Recursos', ruta: '/recursos' },
        ])}
      />

      <CabeceraPagina
        etiqueta={recursosPagina.etiqueta}
        titulo={recursosPagina.titulo}
        entrada={recursosPagina.entrada}
      />

      {/* Artículos */}
      <Seccion>
        <Revelar>
          <h2 className="etiqueta">Publicaciones</h2>
        </Revelar>

        <GrupoRevelar as="ul" total={articulos.length} className="mt-8 border-t border-linea">
          {articulos.map((articulo) => (
            <ElementoRevelar as="li" key={articulo.slug} className="border-b border-linea">
              <Link
                href={`/recursos/${articulo.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-[8rem_1fr_7rem] md:items-baseline md:gap-10"
              >
                <span className="font-mono text-etiqueta uppercase text-institucional">
                  {articulo.categoria}
                </span>
                <span>
                  <span className="block max-w-[30ch] text-t3 transition-colors duration-150 group-hover:text-institucional">
                    {articulo.titulo}
                  </span>
                  <span className="mt-2 block max-w-lectura text-menudo leading-[1.65] text-tinta-suave">
                    {articulo.entradilla}
                  </span>
                </span>
                <span className="font-mono text-etiqueta uppercase text-gris md:text-right">
                  {articulo.fecha}
                </span>
              </Link>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Materiales descargables */}
      <Seccion tono="hondo">
        <Revelar>
          <p className="etiqueta">Materiales</p>
          <h2 className="mt-5 max-w-[24ch] text-t2">
            Se entregan por correo para poder avisarte cuando se actualizan.
          </h2>
        </Revelar>

        <GrupoRevelar total={materiales.length} className="mt-12 grid gap-6 lg:grid-cols-2">
          {materiales.map((material) => (
            <ElementoRevelar
              as="article"
              key={material.titulo}
              className="flex flex-col rounded border border-linea bg-papel p-8"
            >
              <p className="font-mono text-etiqueta uppercase text-gris">
                {material.formato} · {material.dirigidoA}
              </p>
              <h3 className="mt-4 max-w-[24ch] text-t3">{material.titulo}</h3>
              <p className="mt-3 flex-1 text-menudo leading-[1.65] text-tinta-suave">
                {material.descripcion}
              </p>
              <FormularioMaterial material={material.titulo} />
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>
    </>
  );
}
