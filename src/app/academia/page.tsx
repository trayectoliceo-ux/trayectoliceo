import Link from 'next/link';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Metadato, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { TarjetaProducto } from '@/components/ui/TarjetaProducto';
import { academia } from '@/content/academia';
import { avisoConstancias, formacionPrecios } from '@/content/precios';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Academia · Cursos y diplomado en altas capacidades',
  descripcion:
    'Diplomado de 120 horas, cursos para docentes y profesionales, campus en línea y red de psicólogos afiliados. Formación de Trayecto Liceo en Puebla y en línea.',
  ruta: '/academia',
});

export default function PaginaAcademia() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Academia', ruta: '/academia' },
        ])}
      />

      <CabeceraPagina
        etiqueta={academia.etiqueta}
        titulo={academia.titulo}
        entrada={academia.entrada}
        aviso={avisoConstancias}
      />

      {/* Programas con pago en línea */}
      <Seccion>
        <Revelar>
          <p className="etiqueta">Programas abiertos</p>
          <h2 className="mt-5 max-w-[20ch] text-t1">Inscripción en línea.</h2>
        </Revelar>

        <GrupoRevelar total={formacionPrecios.length} className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {formacionPrecios.map((producto) => (
            <ElementoRevelar key={producto.id}>
              <TarjetaProducto producto={producto} />
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Campus */}
      <Seccion tono="hondo">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta">Campus</p>
            <h2 className="mt-5 text-t2">{academia.campus.titulo}</h2>
            <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
              {academia.campus.texto}
            </p>
          </Revelar>

          <Revelar retraso={0.06}>
            <div className="rounded-lg border border-linea bg-papel-puro p-8 shadow-tarjeta">
              {academia.campus.url ? (
                <a
                  href={academia.campus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-6 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
                >
                  {academia.campus.accion} ↗
                </a>
              ) : (
                <>
                  <p className="text-menudo leading-[1.7] text-tinta-suave justificado">
                    {academia.campus.avisoSinCampus}
                  </p>
                  <Link
                    href="/contacto"
                    className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded border border-institucional/40 px-6 text-cuerpo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional hover:text-papel"
                  >
                    Consultar mis materiales
                  </Link>
                </>
              )}
            </div>
          </Revelar>
        </div>
      </Seccion>

      {/* Licenciatura en preparación */}
      <Seccion>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Revelar>
            <span className="inline-flex rounded bg-menta/12 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-menta">
              {academia.licenciatura.etiqueta}
            </span>
            <h2 className="mt-5 max-w-[20ch] text-t1">
              {academia.licenciatura.titulo}
            </h2>
            <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
              {academia.licenciatura.entrada}
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-7 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
            >
              {academia.licenciatura.accion}
            </Link>

            <p className="justificado mt-5 max-w-lectura rounded border-l-4 border-institucional bg-institucional/[0.05] p-4 text-menudo leading-[1.6] text-tinta-suave">
              {academia.licenciatura.advertencia}
            </p>
          </Revelar>

          <Revelar retraso={0.06}>
            <dl className="lg:pt-4">
              {academia.licenciatura.datos.map((dato) => (
                <Metadato key={dato.etiqueta} etiqueta={dato.etiqueta}>
                  {dato.valor}
                </Metadato>
              ))}
            </dl>
          </Revelar>
        </div>
      </Seccion>

      {/* Titulación por Acuerdo 286 */}
      <Seccion tono="hondo">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Revelar>
            <p className="etiqueta">{academia.titulacion.etiqueta}</p>
            <h2 className="mt-5 max-w-[18ch] text-t1">{academia.titulacion.titulo}</h2>
            <p className="justificado mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
              {academia.titulacion.entrada}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-institucional bg-papel-puro p-5 text-center shadow-tarjeta">
                <dt className="etiqueta">Pago único</dt>
                <dd className="mt-2 whitespace-nowrap font-display text-t3 font-bold text-institucional">
                  {academia.titulacion.precioContado}
                </dd>
              </div>
              <div className="rounded-lg border border-linea bg-papel-puro p-5 text-center shadow-tarjeta">
                <dt className="etiqueta">Diferido</dt>
                <dd className="mt-2 whitespace-nowrap font-display text-t3 font-bold text-tinta">
                  {academia.titulacion.precioTotal}
                </dd>
              </div>
            </dl>

            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-7 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
            >
              {academia.titulacion.accion}
            </Link>
          </Revelar>

          <Revelar retraso={0.06}>
            <p className="etiqueta">Esquema de pago</p>
            <ol className="mt-4 border-t border-linea">
              {academia.titulacion.calendario.map((fase) => (
                <li
                  key={fase.mes}
                  className="grid gap-1 border-b border-linea py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-5"
                >
                  <span className="font-mono text-menudo font-medium text-institucional">
                    {fase.mes}
                  </span>
                  <span>
                    <span className="block text-menudo font-semibold text-tinta">
                      {fase.concepto}
                    </span>
                    <span className="block text-menudo text-gris">{fase.hito}</span>
                  </span>
                  <span className="whitespace-nowrap text-menudo font-semibold text-tinta">
                    {academia.titulacion.mensualidad}
                  </span>
                </li>
              ))}
            </ol>
            <p className="justificado mt-4 text-menudo text-gris">
              {academia.titulacion.nota}
            </p>
          </Revelar>
        </div>
      </Seccion>

      {/* Red de psicólogos */}
      <Seccion tono="tinta">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta text-menta-brillo">{academia.red.etiqueta}</p>
            <h2 className="mt-5 max-w-[16ch] text-t1 text-papel">
              {academia.red.titulo}
            </h2>
            <p className="mt-6 max-w-lectura text-cuerpo-lg text-papel/80 justificado">
              {academia.red.entrada}
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded bg-papel px-7 text-cuerpo font-semibold text-tinta transition-opacity duration-200 hover:opacity-90"
            >
              {academia.red.accion}
            </Link>
          </Revelar>

          <Revelar retraso={0.06}>
            <ul className="border-t border-linea-oscura lg:pt-2">
              {academia.red.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 border-b border-linea-oscura py-4 text-menudo text-papel/85"
                >
                  <span aria-hidden className="text-menta-brillo">
                    ✓
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
