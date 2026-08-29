import { BotonEnlace } from '@/components/ui/Boton';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { PortadaPsicoMetrics } from '@/components/psicometrics/PortadaPsicoMetrics';
import { Acordeon } from '@/components/ui/Acordeon';
import { MuestraInforme } from '@/components/psicometrics/MuestraInforme';
import { psicometricsPagina as pm } from '@/content/psicometrics';
import { enlaceWhatsApp } from '@/content/sitio';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan, preguntasFrecuentes } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'PsicoMetrics · Software de informes psicopedagógicos',
  descripcion:
    'Plataforma para psicólogos y orientadores: expedientes pseudonimizados, instrumentos centralizados y borradores de informe en minutos. Plan inicial gratuito.',
  ruta: '/psicometrics',
});

export default function PaginaPsicoMetrics() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'PsicoMetrics', ruta: '/psicometrics' },
        ])}
      />
      <DatosEstructurados datos={preguntasFrecuentes(pm.preguntas.lista)} />

      <PortadaPsicoMetrics />

      {/* Origen del producto */}
      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta">{pm.origen.etiqueta}</p>
            <h2 className="mt-5 text-t2">{pm.origen.titulo}</h2>
          </Revelar>
          <Revelar retraso={0.06} className="space-y-6 lg:pt-4">
            {pm.origen.parrafos.map((parrafo) => (
              <p key={parrafo} className="max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
                {parrafo}
              </p>
            ))}
          </Revelar>
        </div>
      </Seccion>

      {/* Antes / ahora */}
      <Seccion tono="hondo">
        <Revelar>
          <p className="etiqueta">{pm.comparativa.etiqueta}</p>
          <h2 className="mt-5 max-w-[16ch] text-t1">{pm.comparativa.titulo}</h2>
          <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
            {pm.comparativa.entrada}
          </p>
        </Revelar>

        <GrupoRevelar total={2} className="mt-14 grid gap-6 lg:grid-cols-2">
          <ElementoRevelar
            as="article"
            className="rounded border border-linea bg-papel/60 p-8 lg:p-10"
          >
            <h3 className="text-t3 text-gris">{pm.comparativa.antes.titulo}</h3>
            <ul className="mt-7 border-t border-linea">
              {pm.comparativa.antes.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 border-b border-linea py-4 text-menudo text-gris"
                >
                  <span aria-hidden>—</span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </ElementoRevelar>

          <ElementoRevelar
            as="article"
            className="sobre-oscuro rounded border border-institucional bg-institucional p-8 text-papel lg:p-10"
          >
            <h3 className="text-t3 text-papel">{pm.comparativa.despues.titulo}</h3>
            <ul className="mt-7 border-t border-linea-oscura">
              {pm.comparativa.despues.puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex items-baseline gap-3 border-b border-linea-oscura py-4 text-menudo text-papel/90"
                >
                  <span aria-hidden className="text-sello-claro">
                    ✓
                  </span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </ElementoRevelar>
        </GrupoRevelar>
      </Seccion>

      {/* Módulos */}
      <Seccion id="modulos">
        <Revelar>
          <p className="etiqueta">{pm.modulos.etiqueta}</p>
          <h2 className="mt-5 max-w-[20ch] text-t1">{pm.modulos.titulo}</h2>
        </Revelar>

        <GrupoRevelar
          total={pm.modulos.lista.length}
          className="mt-14 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pm.modulos.lista.map((modulo) => (
            <ElementoRevelar
              as="article"
              key={modulo.indice}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta transition-shadow duration-300 hover:shadow-elevada"
            >
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded bg-institucional/[0.08] font-mono text-menudo font-medium text-institucional">
                {modulo.indice}
              </span>
              <h3 className="mt-4 text-balance text-entrada">{modulo.titulo}</h3>
              <p className="justificado mt-3 text-menudo leading-[1.7] text-tinta-suave">
                {modulo.descripcion}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Informe verificable */}
      <Seccion tono="hondo">
        <MuestraInforme />
      </Seccion>

      {/* Confianza */}
      <Seccion tono="tinta">
        <Revelar>
          <p className="etiqueta text-sello-claro">{pm.confianza.etiqueta}</p>
          <h2 className="mt-5 max-w-[16ch] text-t1 text-papel">{pm.confianza.titulo}</h2>
        </Revelar>

        <GrupoRevelar total={2} className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {pm.confianza.bloques.map((bloque) => (
            <ElementoRevelar
              as="article"
              key={bloque.titulo}
              className="border-t border-linea-oscura pt-7"
            >
              <h3 className="max-w-[22ch] text-t3 text-papel">{bloque.titulo}</h3>
              <p className="mt-4 max-w-lectura text-cuerpo leading-[1.75] text-papel/80 justificado">
                {bloque.descripcion}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Precios */}
      <Seccion id="precios" tono="hondo">
        <Revelar>
          <p className="etiqueta">{pm.precios.etiqueta}</p>
          <h2 className="mt-5 text-t1">{pm.precios.titulo}</h2>
          <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
            {pm.precios.entrada}
          </p>
        </Revelar>

        <GrupoRevelar
          total={pm.precios.planes.length}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {pm.precios.planes.map((plan) => (
            <ElementoRevelar
              as="article"
              key={plan.nombre}
              className={`flex h-full flex-col rounded-lg border bg-papel-puro p-7 ${
                plan.destacado
                  ? 'border-institucional shadow-elevada lg:-mt-4 lg:mb-[-1rem]'
                  : 'border-linea shadow-tarjeta'
              }`}
            >
              {plan.destacado ? (
                <span className="mb-5 inline-flex w-fit rounded bg-institucional px-2.5 py-1 font-mono text-etiqueta uppercase text-papel">
                  Más elegido
                </span>
              ) : null}

              <h3 className="text-entrada">{plan.nombre}</h3>
              <p className="mt-4 font-display text-t2 leading-none text-institucional">
                {plan.precio}
              </p>
              <p className="mt-3 text-menudo text-gris">{plan.detalle}</p>

              <ul className="mt-7 flex-1 border-t border-linea">
                {plan.incluye.map((elemento) => (
                  <li
                    key={elemento}
                    className="flex items-baseline gap-3 border-b border-linea py-3 text-menudo text-tinta-suave"
                  >
                    <span aria-hidden className="text-institucional">
                      ✓
                    </span>
                    <span>{elemento}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                {plan.destacado ? (
                  // Los créditos se contratan por WhatsApp: el paquete y la
                  // facturación se ajustan al volumen de cada profesional.
                  <a
                    href={enlaceWhatsApp(
                      'Hola. Quiero comprar créditos para informes en PsicoMetrics.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-6 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
                  >
                    {plan.accion}
                  </a>
                ) : (
                  <BotonEnlace
                    href={plan.nombre === 'Clínicas y colegios' ? '/contacto' : pm.url}
                    tono="contorno"
                    externo={plan.nombre !== 'Clínicas y colegios'}
                    className="w-full"
                  >
                    {plan.accion}
                  </BotonEnlace>
                )}
              </div>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.08}>
          <p className="mt-8 max-w-lectura text-menudo text-gris">{pm.precios.nota}</p>
        </Revelar>
      </Seccion>

      {/* Preguntas frecuentes */}
      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta">{pm.preguntas.etiqueta}</p>
            <h2 className="mt-5 max-w-[16ch] text-t2">{pm.preguntas.titulo}</h2>
          </Revelar>
          <Acordeon elementos={pm.preguntas.lista} />
        </div>
      </Seccion>

      {/* Cierre */}
      <section className="sobre-oscuro bg-institucional py-20 text-papel lg:py-28">
        <div className="contenedor">
          <Revelar>
            <h2 className="max-w-[18ch] text-t1 text-papel">{pm.cierre.titulo}</h2>
            <p className="mt-6 max-w-lectura text-cuerpo-lg text-papel/80">
              {pm.cierre.texto}
            </p>
            <div className="mt-10">
              <BotonEnlace href={pm.url} tono="claro" externo>
                {pm.cierre.accion} ↗
              </BotonEnlace>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
