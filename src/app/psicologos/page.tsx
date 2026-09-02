import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { MuestraInforme } from '@/components/psicometrics/MuestraInforme';
import Link from 'next/link';
import { psicologos } from '@/content/rutas';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Software para psicólogos: informes y casos derivados',
  descripcion:
    'Recibe casos derivados, emite informes con folio verificable y cobra por tamizaje. Primer caso completo gratis en PsicoMetrics.',
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
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 shadow-tarjeta"
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
            Certifícate en altas capacidades y evaluación psicopedagógica
          </h2>
          <p className="justificado mx-auto mt-5 max-w-lectura text-menudo text-tinta-suave">
            Certificaciones con examen aplicado por un experto y validez oficial. Si
            tienes cuenta activa en PsicoMetrics, te cuestan $850 en lugar de $1,500.
          </p>
          <Link
            href="/certificate"
            className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            Ver programas
          </Link>
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
          className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 lg:grid-cols-3"
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
              <p className="mt-3 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-institucional">
                {plan.precio}
              </p>
              <p className="mt-3 flex-1 text-menudo text-tinta-suave">{plan.detalle}</p>

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
          <p className="mx-auto max-w-lectura text-menudo text-gris">
            La cuenta, los expedientes y el cobro viven en psicometrics.app. Aquí solo
            te contamos qué hace.
          </p>
        </Revelar>
      </Seccion>
    </>
  );
}
