import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { MuestraInforme } from '@/components/psicometrics/MuestraInforme';
import Link from 'next/link';
import { psicologos } from '@/content/rutas';
import { CompartirServicio } from '@/components/ui/CompartirServicio';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Software para psicólogos: informes y casos derivados',
  descripcion:
    'Recibe casos derivados y emite informes con folio verificable. El registro en PsicoMetrics es gratis e incluye una evaluación de prueba más una cada mes.',
  ruta: '/psicologos',
});

export default function PaginaPsicologos() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Para psicólogos', ruta: '/psicologos' },
        ])}
      />

      <PortadaRuta
        etiqueta={psicologos.portada.etiqueta}
        titulo={psicologos.portada.titulo}
        rotativas={psicologos.portada.rotativas}
        entrada={psicologos.portada.entrada}
      >
        <a
          href={psicologos.urlApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[56px] items-center justify-center rounded bg-institucional px-8 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
        >
          {psicologos.portada.accion}
        </a>
        <p className="mt-3 text-menudo text-gris">{psicologos.portada.subtexto}</p>
      </PortadaRuta>

      <Seccion>
        <GrupoRevelar
          total={psicologos.bloques.length}
          className="grid items-stretch gap-6 lg:grid-cols-3"
        >
          {psicologos.bloques.map((bloque) => (
            <ElementoRevelar
              as="article"
              key={bloque.indice}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-7"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-institucional/[0.08] font-mono text-menudo font-medium text-institucional">
                {bloque.indice}
              </span>
              <h2 className="mt-5 text-t3">{bloque.titulo}</h2>
              <ul className="mt-5 flex-1 border-t border-linea">
                {bloque.puntos.map((punto) => (
                  <li
                    key={punto}
                    className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo text-tinta-suave"
                  >
                    <span aria-hidden className="text-institucional">
                      ✓
                    </span>
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      <Seccion tono="hondo">
        <MuestraInforme />
      </Seccion>

      {/* Enlace a la formación, que ahora vive en Certifícate */}
      <Seccion>
        <Revelar className="mx-auto max-w-2xl rounded-lg border border-institucional bg-papel-puro p-8 text-center shadow-elevada">
          <p className="etiqueta">Formación</p>
          <h2 className="mt-4 text-balance text-t2">
            Tres capacitaciones incluidas en tu plan
          </h2>
          <p className="justificado mx-auto mt-5 max-w-[40rem] text-menudo text-tinta-suave">
            Las tres van incluidas en tu plan anual, sin costo aparte: altas
            capacidades y doble excepcionalidad, diagnóstico psicopedagógico e
            informe conforme a la normativa. El plan cuesta desde $899 al año. Lo
            único que se paga por separado es el certificado con validez oficial:
            $990, con examen y estudio de caso.
          </p>
          <Link
            href="/certificate"
            className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            Ver programas
          </Link>
        </Revelar>
      </Seccion>

      {/* Qué habilita cada nivel: evita la pregunta antes de que llegue */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">{psicologos.alcance.etiqueta}</p>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-t1">
            {psicologos.alcance.titulo}
          </h2>
        </Revelar>

        <GrupoRevelar
          total={2}
          className="mx-auto mt-8 grid max-w-4xl items-stretch gap-4 sm:grid-cols-2"
        >
          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-7">
            <p className="text-menudo font-bold uppercase tracking-[0.08em] text-gris">
              {psicologos.alcance.gratis.titulo}
            </p>
            <ul className="mt-4 space-y-2">
              {psicologos.alcance.gratis.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 text-menudo text-tinta-suave"
                >
                  <span aria-hidden className="text-institucional">
                    ✓
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </ElementoRevelar>

          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-institucional bg-papel-puro p-6 shadow-elevada sm:p-7">
            <p className="text-menudo font-bold uppercase tracking-[0.08em] text-institucional">
              {psicologos.alcance.conPlan.titulo}
            </p>
            <ul className="mt-4 space-y-2">
              {psicologos.alcance.conPlan.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 text-menudo text-tinta-suave"
                >
                  <span aria-hidden className="text-menta">
                    ✓
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </ElementoRevelar>
        </GrupoRevelar>

        <Revelar retraso={0.08}>
          <p className="justificado-limpio mx-auto mt-6 max-w-[44rem] rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.75] text-tinta-suave">
            {psicologos.alcance.nota}
          </p>
        </Revelar>
      </Seccion>

      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">Precios</p>
          <h2 className="mx-auto mt-5 max-w-[18ch] text-t1">
            Empieza gratis. Paga cuando te sirva.
          </h2>
        </Revelar>

        <GrupoRevelar
          total={psicologos.planes.length}
          className="mx-auto mt-9 grid max-w-3xl items-stretch gap-6 md:grid-cols-2"
        >
          {psicologos.planes.map((plan) => (
            <ElementoRevelar
              as="article"
              key={plan.nombre}
              className={`flex h-full flex-col rounded-lg border bg-papel-puro p-7 text-center ${
                'destacado' in plan && plan.destacado
                  ? 'border-institucional shadow-elevada'
                  : 'border-linea shadow-tarjeta'
              }`}
            >
              <div className="flex min-h-[2rem] items-start justify-center">
                {'destacado' in plan && plan.destacado ? (
                  <span className="inline-flex rounded bg-institucional px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-papel">
                    Más elegido
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-entrada">{plan.nombre}</h3>

              {/*
                El calificador («Desde») vive en su propia línea, pequeño y en
                gris. Pegado al importe lo alarga hasta desbordar la tarjeta, y
                encogerlo todo para que quepa le resta fuerza justo al número
                que decide la compra.
              */}
              <div className="mt-3">
                {/* Se reserva la línea aunque el plan no tenga prefijo, para
                    que los importes de las tarjetas queden a la misma altura. */}
                <span
                  aria-hidden={!('prefijo' in plan && plan.prefijo)}
                  className="block text-menudo font-medium uppercase tracking-[0.08em] text-gris"
                >
                  {'prefijo' in plan && plan.prefijo ? plan.prefijo : ' '}
                </span>
                <span className="block whitespace-nowrap font-display text-[clamp(1.75rem,4.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-institucional">
                  {plan.precio}
                </span>
              </div>
              <p className="justificado mt-4 flex-1 text-menudo leading-[1.75] text-tinta-suave">
                {plan.detalle}
              </p>

              <a
                href={psicologos.urlApp}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 flex min-h-[52px] w-full items-center justify-center rounded px-6 text-cuerpo font-semibold transition-colors duration-200 ${
                  'destacado' in plan && plan.destacado
                    ? 'bg-institucional text-papel hover:bg-institucional-hondo'
                    : 'border border-institucional/40 text-institucional hover:border-institucional hover:bg-institucional hover:text-papel'
                }`}
              >
                {plan.accion}
              </a>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.08} className="mt-10 text-center">
          <p className="justificado mx-auto max-w-lectura text-menudo leading-[1.75] text-gris">
            La cuenta, los expedientes y el cobro viven en psicometrics.app. Aquí solo
            te contamos qué hace.
          </p>
        </Revelar>
      </Seccion>

      {/* Hay más planes de los que caben aquí */}
      <Seccion>
        <Revelar className="mx-auto max-w-3xl rounded-lg border border-linea bg-papel-puro p-7 text-center shadow-tarjeta sm:p-10">
          <h2 className="text-balance text-t3">{psicologos.masPlanes.titulo}</h2>
          <p className="justificado mx-auto mt-4 max-w-lectura text-cuerpo leading-[1.7] text-tinta-suave">
            {psicologos.masPlanes.texto}
          </p>
          <a
            href={psicologos.masPlanes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded border border-institucional/40 px-7 text-cuerpo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional hover:text-papel"
          >
            {psicologos.masPlanes.accion}
          </a>
        </Revelar>
      </Seccion>

      <Seccion>
        <CompartirServicio
          servicio="PsicoMetrics para psicólogos y psicopedagogos"
          ruta="/psicologos"
          precio="Plan anual desde $899"
          descripcion="Registro gratis con una evaluación de prueba y otra cada mes. Con el plan anual recibes casos derivados y todas las capacitaciones."
        />
      </Seccion>
    </>
  );
}
