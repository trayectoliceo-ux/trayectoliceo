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
              <div className="grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12 lg:py-10">
                <div>
                  <p className="etiqueta">{taller.linea}</p>
                  <Link href={`/talleres/${taller.slug}`} className="group block">
                    <h2 className="mt-3 text-t2 transition-colors duration-150 group-hover:text-institucional">
                      {taller.titulo}
                    </h2>
                  </Link>
                  <p className="justificado mt-3 max-w-lectura text-menudo leading-[1.7] text-tinta-suave">
                    {taller.resumen}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                    <Dato etiqueta="Edades">{taller.edades}</Dato>
                    <Dato etiqueta="Duración">{taller.duracion}</Dato>
                    <Dato etiqueta="Cupo">{taller.cupo}</Dato>
                    <Dato etiqueta="Modalidad">{taller.modalidad}</Dato>
                  </dl>
                </div>

                <div className="w-full rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta md:w-[19rem]">
                  <p className="etiqueta">Inversión</p>
                  <p className="mt-2 whitespace-nowrap font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-none tracking-[-0.025em] text-institucional">
                    {taller.precio}
                  </p>
                  <p className="mt-1.5 text-menudo text-gris">por grupo</p>

                  {/*
                    Los talleres se contratan por centro, no por familia
                    suelta: el precio es por grupo y la sede la pone el
                    colegio. Por eso no hay pago en línea aquí.
                  */}
                  <Link
                    href="/contacto?motivo=taller"
                    className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-4 text-center text-menudo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
                  >
                    Contratar para mi colegio
                  </Link>

                  <Link
                    href={`/talleres/${taller.slug}`}
                    className="mt-3 inline-flex min-h-[44px] items-center justify-center text-menudo font-semibold text-institucional underline underline-offset-4"
                  >
                    Ver temario completo
                  </Link>
                </div>
              </div>
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
