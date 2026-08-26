import type { ReactNode } from 'react';
import { Revelar } from './Revelar';

/**
 * Cabecera de página interior. Deliberadamente más contenida que la portada:
 * el momento firma solo ocurre una vez, en el inicio.
 */
export function CabeceraPagina({
  etiqueta,
  titulo,
  entrada,
  aviso,
  acciones,
}: {
  etiqueta: string;
  titulo: string;
  entrada?: string;
  aviso?: string;
  acciones?: ReactNode;
}) {
  return (
    <section className="border-b border-linea">
      <div className="contenedor grid gap-10 py-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-24">
        <div>
          <Revelar desplazamiento={8}>
            <p className="etiqueta">{etiqueta}</p>
            <h1 className="mt-5 max-w-[20ch] text-t1 sm:text-[3.25rem] sm:leading-[1.08]">
              {titulo}
            </h1>
          </Revelar>
        </div>

        <div className="lg:pt-16">
          {entrada ? (
            <Revelar retraso={0.06} desplazamiento={8}>
              <p className="max-w-lectura text-cuerpo-lg text-tinta-suave justificado">{entrada}</p>
            </Revelar>
          ) : null}

          {aviso ? (
            <Revelar retraso={0.1} desplazamiento={8}>
              <p className="mt-6 border-l-2 border-institucional/30 pl-4 text-menudo text-gris">
                {aviso}
              </p>
            </Revelar>
          ) : null}

          {acciones ? (
            <Revelar retraso={0.12} desplazamiento={8} className="mt-8">
              {acciones}
            </Revelar>
          ) : null}
        </div>
      </div>
    </section>
  );
}
