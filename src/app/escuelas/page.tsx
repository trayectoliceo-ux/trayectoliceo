import Link from 'next/link';
import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { FormularioInteligente } from '@/components/contacto/FormularioInteligente';
import { escuelas } from '@/content/rutas';
import { ServiciosInstitucion } from '@/components/ui/ServiciosInstitucion';
import { enlaceWhatsApp } from '@/content/sitio';
import { CompartirServicio } from '@/components/ui/CompartirServicio';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan, servicio } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Evaluaciones gratuitas para escuelas y universidades',
  descripcion:
    'Tamizaje escolar, salud psicológica y pruebas de habilidades. Aplicar es gratis y cada alumno ve su resultado al terminar. Solo se cotiza el informe por grupo.',
  ruta: '/escuelas',
});

export default function PaginaEscuelas() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Para escuelas', ruta: '/escuelas' },
        ])}
      />
      <DatosEstructurados
        datos={servicio({
          nombre: 'Evaluaciones escolares: tamizaje, salud psicológica y habilidades',
          descripcion:
            'Tamizaje escolar por grupo, estudio de salud psicológica y pruebas de habilidades y conocimientos. La aplicación es gratuita y cada alumno ve su resultado al terminar.',
          ruta: '/escuelas',
          publico: 'Escuelas, preparatorias y universidades',
          gratuito: true,
        })}
      />

      <PortadaRuta
        etiqueta={escuelas.portada.etiqueta}
        titulo={escuelas.portada.titulo}
        rotativas={escuelas.portada.rotativas}
        entrada={escuelas.portada.entrada}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <p>
            <span className="block whitespace-nowrap font-display text-t1 font-bold leading-none tracking-[-0.03em] text-institucional">
              {escuelas.portada.precio}
            </span>
            <span className="mt-2 block text-menudo text-gris">
              {escuelas.portada.unidad}
            </span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#propuesta"
              className="inline-flex min-h-[56px] items-center justify-center rounded bg-institucional px-8 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
            >
              {escuelas.portada.accion}
            </Link>
            <a
              href={enlaceWhatsApp(
                'Hola, quiero aplicar las evaluaciones de PsicoMetrics en mi escuela',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center rounded border border-institucional/40 px-7 text-cuerpo font-semibold text-institucional transition-colors duration-200 hover:border-institucional hover:bg-institucional/[0.04]"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </PortadaRuta>

      {/* Los tres servicios. Lo primero que se lee es que aplicar no cuesta. */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Tres servicios</p>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-t1">
            Aplicar es gratis en los tres.
          </h2>
          <p className="justificado-limpio mx-auto mt-5 max-w-[44rem] text-cuerpo-lg leading-[1.6] text-tinta-suave">
            Cada alumno ve su resultado al terminar, sin pagar nada. La institución
            solo cotiza si quiere el informe por grupo con folio.
          </p>
        </Revelar>

        <div className="mt-10">
          <ServiciosInstitucion />
        </div>

        <Revelar retraso={0.08}>
          <p className="mx-auto mt-8 max-w-lectura text-center text-menudo leading-[1.7] text-gris">
            {escuelas.usos}
          </p>
        </Revelar>

        {/* El alcance real, a la vista y no en letra chica al pie. */}
        <Revelar retraso={0.1} className="mx-auto mt-8 max-w-3xl rounded-lg border-l-4 border-sello-claro bg-sello-claro/[0.07] p-5 sm:p-6">
          <p className="text-menudo font-bold uppercase tracking-[0.08em] text-tinta">
            {escuelas.limiteAcademico.titulo}
          </p>
          <ul className="mt-3 space-y-2">
            {escuelas.limiteAcademico.puntos.map((punto) => (
              <li
                key={punto}
                className="justificado text-menudo leading-[1.7] text-tinta-suave"
              >
                {punto}
              </li>
            ))}
          </ul>
        </Revelar>
      </Seccion>

      {/* El tamizaje no cuesta: la condición es capacitar */}
      <Seccion tono="hondo">
        <div className="grid items-start gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Revelar>
            <p className="etiqueta">{escuelas.condicion.etiqueta}</p>
            <h2 className="mt-5 max-w-[20ch] text-balance text-t2">
              {escuelas.condicion.titulo}
            </h2>
            <p className="justificado mt-5 text-cuerpo leading-[1.7] text-tinta-suave">
              {escuelas.condicion.texto}
            </p>
          </Revelar>

          <GrupoRevelar
            as="ul"
            total={escuelas.condicion.puntos.length}
            className="rounded-lg border border-institucional/25 bg-papel-puro p-6 shadow-tarjeta sm:p-8"
          >
            {escuelas.condicion.puntos.map((punto, indice) => (
              <ElementoRevelar
                as="li"
                key={punto}
                className={`flex items-baseline gap-4 py-3.5 text-cuerpo text-tinta ${
                  indice === 0 ? '' : 'border-t border-linea'
                }`}
              >
                <span aria-hidden className="text-menta">
                  ✓
                </span>
                <span className="min-w-0">{punto}</span>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* Qué incluye */}
      <Seccion>
        <div className="grid items-stretch gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Revelar>
            <p className="etiqueta">Qué incluye</p>
            <h2 className="mt-5 max-w-[18ch] text-t1">Veinte minutos por grupo.</h2>
          </Revelar>

          <GrupoRevelar as="ul" total={escuelas.incluye.length} className="border-t border-linea">
            {escuelas.incluye.map((punto) => (
              <ElementoRevelar
                as="li"
                key={punto}
                className="flex items-baseline gap-4 border-b border-linea py-4 text-cuerpo text-tinta-suave"
              >
                <span aria-hidden className="text-institucional">
                  ✓
                </span>
                <span>{punto}</span>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* Escalas de contratación */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Cómo se contrata</p>
          <h2 className="mx-auto mt-3 max-w-[24ch] text-t1">
            Empieza con un grupo o con todo el centro.
          </h2>
          <p className="justificado-limpio mx-auto mt-5 max-w-[42rem] text-cuerpo-lg leading-[1.6] text-tinta-suave">
            El tamizaje es sin costo en los tres casos. Lo único que cambia es el
            número de docentes que se capacitan: uno por cada grupo evaluado.
          </p>
        </Revelar>

        <GrupoRevelar
          total={escuelas.escalas.length}
          className="mt-9 grid items-stretch gap-4 sm:grid-cols-3"
        >
          {escuelas.escalas.map((escala) => (
            <ElementoRevelar
              key={escala.alumnos}
              className={`flex h-full flex-col rounded-lg border bg-papel-puro p-6 text-center ${
                'destacado' in escala && escala.destacado
                  ? 'border-institucional shadow-elevada'
                  : 'border-linea shadow-tarjeta'
              }`}
            >
              <p className="whitespace-nowrap font-display text-entrada font-bold text-institucional">
                {escala.alumnos}
              </p>
              <p className="mt-3 text-balance text-menudo font-semibold text-tinta">
                {escala.incluye}
              </p>
              <p className="justificado mt-3 flex-1 text-menudo text-tinta-suave">
                {escala.nota}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Semáforo */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">Resultado</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-t1">Un semáforo por grupo.</h2>
        </Revelar>

        <GrupoRevelar total={3} className="mt-9 grid items-stretch gap-4 sm:grid-cols-3">
          {escuelas.semaforo.map((nivel) => (
            <ElementoRevelar
              as="article"
              key={nivel.titulo}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 text-center shadow-tarjeta"
            >
              <span aria-hidden className={`mx-auto block h-2 w-12 rounded-full ${nivel.color}`} />
              <h3 className="mt-5 text-entrada">{nivel.titulo}</h3>
              <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave">
                {nivel.texto}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.06} className="mx-auto mt-10 max-w-2xl rounded border-l-4 border-institucional bg-papel-puro p-5">
          <p className="text-cuerpo font-semibold text-tinta">{escuelas.limite}</p>
        </Revelar>

        <Revelar retraso={0.08} className="mx-auto mt-6 max-w-2xl rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta">
          <h3 className="text-entrada">{escuelas.extra.titulo}</h3>
          <p className="justificado mt-3 text-menudo text-tinta-suave">
            {escuelas.extra.texto}
          </p>
          <Link
            href={escuelas.extra.href}
            className="mt-4 inline-flex min-h-[44px] items-center text-menudo font-semibold text-institucional underline underline-offset-4"
          >
            {escuelas.extra.accion}
          </Link>
        </Revelar>
      </Seccion>

      {/* Formulario */}
      <Seccion id="propuesta">
        <Revelar className="text-center">
          <p className="etiqueta">Solicitar propuesta</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-t1">
            Cuéntanos de tu centro y te mandamos números.
          </h2>
        </Revelar>

        <Revelar retraso={0.06} className="mx-auto mt-10 max-w-2xl">
          <FormularioInteligente perfilFijo="colegio" />
        </Revelar>
      </Seccion>

      <Seccion>
        <CompartirServicio
          servicio="Tamizaje escolar para colegios"
          ruta="/escuelas"
          precio="Sin costo"
          descripcion="Detección en el aula con semáforo por grupo, sin costo. Solo se capacita a un docente por cada grupo evaluado."
        />
      </Seccion>
    </>
  );
}
