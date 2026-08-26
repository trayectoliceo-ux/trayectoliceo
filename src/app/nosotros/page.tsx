import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Marcador, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { nosotros } from '@/content/institucional';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';
import { sitio } from '@/content/sitio';

export const metadata = metadatos({
  titulo: 'Nosotros: equipo y marcos de referencia',
  descripcion:
    'Equipo, enfoque metodológico y marcos teóricos declarados —Renzulli, Gagné, Sternberg, Castelló— que sostienen los programas de Trayecto Liceo en Puebla.',
  ruta: '/nosotros',
});

export default function PaginaNosotros() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Nosotros', ruta: '/nosotros' },
        ])}
      />

      <CabeceraPagina
        etiqueta={nosotros.etiqueta}
        titulo={nosotros.titulo}
        entrada={nosotros.entrada}
      />

      {/* Enfoque */}
      <Seccion>
        <Revelar>
          <p className="etiqueta">Enfoque</p>
          <h2 className="mt-5 max-w-[20ch] text-t2 sm:text-t1">
            Tres posiciones que condicionan todo lo demás.
          </h2>
        </Revelar>

        <GrupoRevelar
          total={nosotros.enfoque.length}
          className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {nosotros.enfoque.map((punto) => (
            <ElementoRevelar
              as="article"
              key={punto.titulo}
              className="border-t border-linea pt-6"
            >
              <h3 className="max-w-[20ch] text-entrada leading-[1.3]">{punto.titulo}</h3>
              <p className="mt-3 text-menudo leading-[1.65] text-tinta-suave justificado">
                {punto.descripcion}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Marcos teóricos: es lo que revisa un profesional antes de inscribirse. */}
      <Seccion tono="hondo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Revelar>
            <p className="etiqueta">Marcos de referencia</p>
            <h2 className="mt-5 max-w-[18ch] text-t2">
              Lo que enseñamos, y de dónde viene.
            </h2>
            <p className="mt-6 max-w-lectura text-cuerpo text-tinta-suave justificado justificado">
              Declaramos los modelos que sostienen nuestros programas para que puedan
              contrastarse. Un método que no cita sus fuentes no se puede discutir.
            </p>
          </Revelar>

          <GrupoRevelar
            as="ul"
            total={nosotros.marcos.length}
            className="border-t border-linea"
          >
            {nosotros.marcos.map((marco) => (
              <ElementoRevelar
                as="li"
                key={marco.nombre}
                className="border-b border-linea py-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-menudo font-medium text-tinta">{marco.nombre}</h3>
                  <span className="font-mono text-etiqueta uppercase text-institucional">
                    {marco.autor}
                  </span>
                </div>
                <p className="mt-1.5 max-w-[54ch] text-menudo leading-[1.6] text-tinta-suave">
                  {marco.nota}
                </p>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* Equipo */}
      <Seccion>
        <Revelar>
          <p className="etiqueta">Equipo</p>
          <h2 className="mt-5 max-w-[22ch] text-t2">
            Quien evalúa tiene cédula. Quien enseña, formación acreditable.
          </h2>
        </Revelar>

        <GrupoRevelar
          total={nosotros.equipo.length}
          className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {nosotros.equipo.map((persona, indice) => (
            <ElementoRevelar as="article" key={indice}>
              <Marcador descripcion={persona.marcador} proporcion="3 / 4" />
              <h3 className="mt-5 text-entrada leading-[1.25]">{persona.nombre}</h3>
              <p className="mt-1 font-mono text-etiqueta uppercase text-institucional">
                {persona.cargo}
              </p>
              <p className="mt-3 text-menudo text-tinta-suave">{persona.formacion}</p>
              <p className="mt-2 text-menudo text-gris">{persona.nota}</p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.06} className="mt-16">
          <p className="max-w-lectura border-t border-linea pt-6 text-menudo text-gris">
            {sitio.nombre} es la marca de formación y acompañamiento operada por{' '}
            {sitio.operadora}. La evaluación psicopedagógica se realiza siempre por
            profesional acreditado, dentro o fuera de nuestro equipo según el caso.
          </p>
        </Revelar>
      </Seccion>

      <LlamadaContacto
        titulo="¿Trabajas en detección o evaluación?"
        texto="Nos interesa conversar con profesionales y centros que ya están en esto. Escríbenos con tu perfil."
        accion="Escribir al equipo"
      />
    </>
  );
}
