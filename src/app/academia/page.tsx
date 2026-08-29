import Link from 'next/link';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
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

      {/* Licenciatura */}
      <Seccion>
        <Revelar className="text-center">
          <span className="inline-flex rounded bg-menta/[0.12] px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-menta">
            {academia.licenciatura.etiqueta}
          </span>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-t1">
            {academia.licenciatura.titulo}
          </h2>
          <p className="justificado mx-auto mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
            {academia.licenciatura.entrada}
          </p>
        </Revelar>

        {/* Los datos en fila: cada uno es un dato corto y no necesita columna. */}
        <GrupoRevelar
          total={academia.licenciatura.datos.length}
          className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {academia.licenciatura.datos.map((dato) => (
            <ElementoRevelar
              key={dato.etiqueta}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-5 text-center shadow-tarjeta"
            >
              <p className="etiqueta">{dato.etiqueta}</p>
              <p className="mt-2 text-balance text-menudo font-semibold leading-[1.4] text-tinta">
                {dato.valor}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.08} className="mt-10 text-center">
          <Link
            href="/contacto"
            className="inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            {academia.licenciatura.accion}
          </Link>
          <p className="justificado mx-auto mt-6 max-w-lectura rounded border-l-4 border-institucional bg-institucional/[0.05] p-4 text-menudo leading-[1.6] text-tinta-suave">
            {academia.licenciatura.advertencia}
          </p>
        </Revelar>
      </Seccion>

      {/* Titulación por Acuerdo 286 */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">{academia.titulacion.etiqueta}</p>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-t1">
            {academia.titulacion.titulo}
          </h2>
          <p className="mt-3 text-cuerpo-lg font-semibold text-institucional">
            {academia.titulacion.subtitulo}
          </p>
          <p className="justificado mx-auto mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
            {academia.titulacion.entrada}
          </p>
        </Revelar>

        <GrupoRevelar total={2} className="mx-auto mt-12 grid max-w-2xl items-stretch gap-4 sm:grid-cols-2">
          <ElementoRevelar className="flex h-full flex-col justify-center rounded-lg border border-institucional bg-papel-puro p-6 text-center shadow-elevada">
            <p className="etiqueta">Pago único</p>
            <p className="mt-3 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-institucional">
              {academia.titulacion.precioContado}
            </p>
          </ElementoRevelar>
          <ElementoRevelar className="flex h-full flex-col justify-center rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta">
            <p className="etiqueta">Diferido</p>
            <p className="mt-3 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-tinta">
              {academia.titulacion.precioTotal}
            </p>
          </ElementoRevelar>
        </GrupoRevelar>

        <Revelar retraso={0.06} className="mx-auto mt-12 max-w-3xl">
          <p className="etiqueta text-center">Esquema de pago</p>
          <ol className="mt-5 border-t border-linea">
            {academia.titulacion.calendario.map((fase) => (
              <li
                key={fase.mes}
                className="grid gap-1 border-b border-linea py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-6"
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
          <div className="mt-8 text-center">
            <Link
              href="/contacto"
              className="inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
            >
              {academia.titulacion.accion}
            </Link>
          </div>
        </Revelar>
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
