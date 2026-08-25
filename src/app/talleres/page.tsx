import Link from 'next/link';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { talleres, talleresPagina } from '@/content/talleres';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Talleres STEAM para niños y jóvenes en Puebla',
  descripcion:
    'Talleres de enriquecimiento por proyectos en Puebla: ingeniería, programación, ciencia, matemáticas y diseño. Sin techo de dificultad y sin diagnóstico previo.',
  ruta: '/talleres',
});

export default function PaginaTalleres() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Talleres STEAM', ruta: '/talleres' },
        ])}
      />

      <CabeceraPagina
        etiqueta={talleresPagina.etiqueta}
        titulo={talleresPagina.titulo}
        entrada={talleresPagina.entrada}
        aviso={talleresPagina.aviso}
      />

      <Seccion>
        <GrupoRevelar as="ul" total={talleres.length} className="border-t border-linea">
          {talleres.map((taller) => (
            <ElementoRevelar as="li" key={taller.slug} className="border-b border-linea">
              <Link
                href={`/talleres/${taller.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12 lg:py-10"
              >
                <div>
                  <p className="etiqueta text-institucional">{taller.linea}</p>
                  <h2 className="mt-3 text-t3 transition-colors duration-150 group-hover:text-institucional sm:text-t2">
                    {taller.titulo}
                  </h2>
                  <p className="mt-3 max-w-lectura text-menudo leading-[1.65] text-tinta-suave">
                    {taller.resumen}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 md:w-[22rem] md:grid-cols-2">
                  <Dato etiqueta="Edades">{taller.edades}</Dato>
                  <Dato etiqueta="Duración">{taller.duracion}</Dato>
                  <Dato etiqueta="Cupo">{taller.cupo}</Dato>
                  <Dato etiqueta="Inversión">{taller.precio}</Dato>
                </dl>
              </Link>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      <LlamadaContacto
        titulo="¿No sabes cuál corresponde?"
        texto="Escríbenos con la edad y el contexto escolar. Recomendamos el taller adecuado, o ninguno si creemos que no aporta."
      />
    </>
  );
}

function Dato({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="etiqueta">{etiqueta}</dt>
      <dd className="mt-1 text-menudo text-tinta">{children}</dd>
    </div>
  );
}
