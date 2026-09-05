import Link from 'next/link';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { psicometrics } from '@/content/psicometrics';

/**
 * QUÉ ES PSICOMETRICS
 * -------------------
 * El bloque que decide la suscripción. Va en orden de interés real: qué
 * evalúa, cómo lo evalúa, para qué edades y en qué modalidades. El límite
 * cierra: es lo que hace defendible el informe, y decirlo vende.
 */
export function BloquePsicoMetrics() {
  return (
    <>
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">{psicometrics.portada.etiqueta}</p>
          <h2 className="mx-auto mt-4 max-w-[18ch] text-t1">
            {psicometrics.portada.titulo}
          </h2>
          <p className="justificado-limpio mx-auto mt-5 max-w-[44rem] text-cuerpo-lg leading-[1.6] text-tinta-suave">
            {psicometrics.portada.entrada}
          </p>
          <p className="mx-auto mt-4 max-w-[38rem] text-balance text-cuerpo font-semibold text-institucional">
            {psicometrics.portada.resumen}
          </p>
        </Revelar>

        {/* Lo que evalúa */}
        <Revelar retraso={0.06} className="mt-10 text-center">
          <p className="etiqueta">{psicometrics.evalua.etiqueta}</p>
          <h3 className="mx-auto mt-3 max-w-[22ch] text-t2">
            {psicometrics.evalua.titulo}
          </h3>
        </Revelar>

        {/*
          Siete fichas en tres columnas dejarían un hueco al final. Se
          reparten 2+1 / 3 / 1+2 para que cada renglón cierre completo: la
          primera ficha y la última ocupan doble ancho.
        */}
        <GrupoRevelar
          total={psicometrics.evalua.lista.length}
          className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {psicometrics.evalua.lista.map((elemento, indice) => {
            const doble = indice === 0 || indice === psicometrics.evalua.lista.length - 1;

            return (
              <ElementoRevelar
                as="article"
                key={elemento.titulo}
                className={`flex h-full flex-col rounded-lg border bg-papel-puro p-6 shadow-tarjeta ${
                  'destacado' in elemento && elemento.destacado
                    ? 'border-institucional/50'
                    : 'border-linea'
                } ${doble ? 'sm:col-span-2' : ''}`}
              >
                <h4 className="text-balance text-cuerpo-lg font-bold leading-[1.25] tracking-[-0.015em]">
                  {elemento.titulo}
                </h4>
                <p className="justificado mt-3 flex-1 text-menudo leading-[1.75] text-tinta-suave">
                  {elemento.texto}
                </p>
              </ElementoRevelar>
            );
          })}
        </GrupoRevelar>
      </Seccion>

      {/* Cómo lo evalúa */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">{psicometrics.metodo.etiqueta}</p>
          <h3 className="mx-auto mt-3 max-w-[24ch] text-t1">
            {psicometrics.metodo.titulo}
          </h3>
        </Revelar>

        <GrupoRevelar
          total={4}
          className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {psicometrics.metodo.fuentes.map((fuente) => (
            <ElementoRevelar
              key={fuente.numero}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta"
            >
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded bg-institucional/[0.08] font-mono text-menudo font-medium text-institucional">
                {fuente.numero}
              </span>
              <h4 className="mt-4 text-balance text-cuerpo-lg font-bold leading-[1.25]">
                {fuente.titulo}
              </h4>
              <p className="mt-2 text-menudo text-tinta-suave">{fuente.texto}</p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.08}>
          <p className="justificado-limpio mx-auto mt-7 max-w-[44rem] rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.75] text-tinta-suave">
            {psicometrics.metodo.nota}
          </p>
        </Revelar>
      </Seccion>

      {/* Edades y modalidades */}
      <Seccion tono="hondo">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Revelar>
            <p className="etiqueta">Rangos de edad</p>
            <h3 className="mt-3 text-t2">De 3 a 18 años.</h3>
            <ul className="mt-6 border-t border-linea">
              {psicometrics.edades.map((rango) => (
                <li
                  key={rango.etapa}
                  className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-linea py-3.5"
                >
                  <span className="whitespace-nowrap font-mono text-menudo font-medium text-institucional">
                    {rango.etapa}
                  </span>
                  <span className="text-menudo text-tinta-suave">{rango.cobertura}</span>
                </li>
              ))}
            </ul>
          </Revelar>

          <Revelar retraso={0.06}>
            <p className="etiqueta">Modalidades</p>
            <h3 className="mt-3 text-t2">Cuatro formas de usarlo.</h3>
            <ul className="mt-6 border-t border-linea">
              {psicometrics.modalidades.map((modalidad) => (
                <li key={modalidad.titulo} className="border-b border-linea py-3.5">
                  <p className="text-menudo font-semibold text-tinta">
                    {modalidad.titulo}
                  </p>
                  <p className="justificado mt-1 text-menudo text-tinta-suave">
                    {modalidad.texto}
                  </p>
                </li>
              ))}
            </ul>
          </Revelar>
        </div>
      </Seccion>

      {/* El límite */}
      <Seccion tono="tinta">
        <div className="mx-auto max-w-3xl text-center">
          <Revelar>
            <p className="etiqueta text-menta-brillo">Alcance</p>
            <h3 className="mx-auto mt-4 max-w-[20ch] text-t1 text-papel">
              {psicometrics.limite.titulo}
            </h3>
            <div className="mt-6 space-y-4">
              {psicometrics.limite.parrafos.map((parrafo) => (
                <p
                  key={parrafo}
                  className="justificado-limpio mx-auto max-w-[44rem] text-cuerpo leading-[1.75] text-papel/85"
                >
                  {parrafo}
                </p>
              ))}
            </div>

            <Link
              href="/psicologos"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded bg-papel px-8 text-cuerpo font-semibold text-tinta transition-opacity duration-200 hover:opacity-90"
            >
              Ver planes para profesionales
            </Link>
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
