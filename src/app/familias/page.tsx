import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { Acordeon } from '@/components/ui/Acordeon';
import { BloqueDirectorio } from '@/components/ui/BloqueDirectorio';
import { TarjetaServicio } from '@/components/ui/TarjetaServicio';
import { familias } from '@/content/rutas';
import { CompartirServicio } from '@/components/ui/CompartirServicio';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan, preguntasFrecuentes, servicio } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Valoración psicopedagógica en línea gratis',
  descripcion:
    'Valoración, orientación vocacional y bienestar. Responde en línea y ve tu resultado gratis. Informe firmado por psicólogo con cédula, opcional, desde $49.',
  ruta: '/familias',
});

export default function PaginaFamilias() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Para familias', ruta: '/familias' },
        ])}
      />
      <DatosEstructurados datos={preguntasFrecuentes(familias.preguntas)} />
      <DatosEstructurados
        datos={servicio({
          nombre: 'Valoración psicopedagógica y orientación en línea',
          descripcion:
            'Valoración psicopedagógica, orientación vocacional y bienestar emocional en línea. El resultado orientativo es gratuito e inmediato; el informe firmado por un psicólogo con cédula es opcional.',
          ruta: '/familias',
          publico: 'Madres, padres y tutores',
          gratuito: true,
        })}
      />

      <PortadaRuta
        etiqueta={familias.portada.etiqueta}
        titulo={familias.portada.titulo}
        rotativas={familias.portada.rotativas}
        entrada={familias.portada.entrada}
      />

      {/* Pasos y compra, lado a lado: decidir y pagar sin bajar la página */}
      <Seccion>
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-12">
          <div>
            <Revelar>
              <p className="etiqueta">{familias.escalera.etiqueta}</p>
              <h2 className="mt-5 max-w-[16ch] text-t1">{familias.escalera.titulo}</h2>
              <p className="justificado mt-5 text-cuerpo leading-[1.7] text-tinta-suave">
                {familias.escalera.entrada}
              </p>
            </Revelar>

            {/*
              La escalera entera a la vista. Esconder los dos peldaños de
              pago detrás de un desplegable parecería más limpio, pero una
              familia que descubre el costo después de responder se siente
              engañada aunque el primer paso sí fuera gratis.
            */}
            <GrupoRevelar as="ol" total={familias.escalera.pasos.length} className="mt-9">
              {familias.escalera.pasos.map((paso) => (
                <ElementoRevelar
                  as="li"
                  key={paso.numero}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-linea py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6"
                >
                  <span className="font-mono text-cuerpo font-medium text-institucional">
                    {paso.numero}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-entrada font-bold text-tinta">
                      {paso.titulo}
                    </span>
                    <span className="justificado mt-1 block text-menudo leading-[1.7] text-tinta-suave">
                      {paso.texto}
                    </span>
                  </span>

                  <span className="col-start-2 sm:col-start-3 sm:text-right">
                    {'prefijo' in paso && paso.prefijo ? (
                      <span className="block text-menudo text-gris">{paso.prefijo}</span>
                    ) : null}
                    <span
                      className={`block whitespace-nowrap font-display text-entrada font-bold ${
                        paso.precio === 'Gratis' ? 'text-menta' : 'text-institucional'
                      }`}
                    >
                      {paso.precio}
                    </span>
                    <span className="block text-menudo text-gris">{paso.nota}</span>
                  </span>
                </ElementoRevelar>
              ))}
            </GrupoRevelar>

            <Revelar retraso={0.06}>
              <p className="justificado mt-5 text-menudo leading-[1.7] text-gris">
                {familias.escalera.nota}
              </p>
            </Revelar>

            {/* Honestidad sobre el alcance. Vende más de lo que parece. */}
            <GrupoRevelar total={2} className="mt-9 grid items-stretch gap-4 sm:grid-cols-2">
              <ElementoRevelar className="flex h-full flex-col rounded-lg border border-menta/30 bg-menta/[0.05] p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
                  {familias.honestidad.si.titulo}
                </p>
                <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave">
                  {familias.honestidad.si.texto}
                </p>
              </ElementoRevelar>

              <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-gris">
                  {familias.honestidad.no.titulo}
                </p>
                <p className="justificado mt-3 text-menudo leading-[1.75] text-tinta-suave">
                  {familias.honestidad.no.texto}
                </p>
              </ElementoRevelar>
            </GrupoRevelar>
          </div>

          {/*
            Sin formulario: el cuestionario y el cobro viven en PsicoMetrics.
            Pedir aquí los mismos datos que va a pedir la plataforma es la
            forma más rápida de perder a quien ya venía decidido.
          */}
          <Revelar retraso={0.06} className="space-y-4 lg:sticky lg:top-24">
            {familias.productos.map((servicio) => (
              <TarjetaServicio key={servicio.id} servicio={servicio} />
            ))}

            <p className="text-center text-menudo text-gris">
              Continúas en psicometrics.app, donde respondes el cuestionario y ves tu
              resultado al terminar.
            </p>
          </Revelar>
        </div>
      </Seccion>

      <BloqueDirectorio tono="hondo" />

      {/* Tres preguntas y ninguna más */}
      <Seccion tono="hondo">
        <div className="mx-auto max-w-2xl">
          <Revelar className="text-center">
            <h2 className="text-t2">Lo que más nos preguntan.</h2>
          </Revelar>
          <div className="mt-8">
            <Acordeon elementos={familias.preguntas} />
          </div>
        </div>
      </Seccion>

      <Seccion>
        <CompartirServicio
          servicio="Valoración psicopedagógica y orientación vocacional"
          ruta="/familias"
          precio="Empezar es gratis"
          descripcion="Valoración, orientación vocacional y bienestar. Respondes en línea y ves tu resultado gratis. El informe firmado por un psicólogo con cédula es opcional, desde $49."
        />
      </Seccion>
    </>
  );
}
