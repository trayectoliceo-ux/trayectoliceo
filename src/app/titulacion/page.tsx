import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { titulacion } from '@/content/rutas';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Titulación por Acuerdo 286 en Pedagogía',
  descripcion:
    'Preparación por etapas para el examen CENEVAL y el portafolio del Acuerdo 286, con costos desglosados: qué pagas a Trayecto Liceo y qué a la institución evaluadora.',
  ruta: '/titulacion',
});

export default function PaginaTitulacion() {
  const nuestro = titulacion.etapas.filter((etapa) => etapa.cobrable);
  const externo = titulacion.etapas.filter((etapa) => !etapa.cobrable);

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Titulación', ruta: '/titulacion' },
        ])}
      />

      <PortadaRuta
        etiqueta={titulacion.portada.etiqueta}
        titulo={titulacion.portada.titulo}
        rotativas={titulacion.portada.rotativas}
        entrada={titulacion.portada.entrada}
        tono="hondo"
      />

      {/* Tabla de etapas. Cada renglón dice a quién se le paga. */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Etapas y costos</p>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-t1">
            Cuatro pagos, dos destinatarios.
          </h2>
        </Revelar>

        <Revelar retraso={0.06} className="mx-auto mt-12 max-w-3xl">
          <ul className="border-t border-linea">
            {titulacion.etapas.map((etapa) => (
              <li
                key={etapa.etapa}
                className="grid gap-2 border-b border-linea py-5 sm:grid-cols-[1.3fr_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span>
                  <span className="block text-cuerpo font-semibold text-tinta">
                    {etapa.etapa}
                  </span>
                  <span className="block text-menudo text-gris">{etapa.concepto}</span>
                </span>

                <span
                  className={`text-menudo font-medium ${
                    etapa.cobrable ? 'text-institucional' : 'text-gris'
                  }`}
                >
                  {etapa.cobrable ? 'Se paga a Trayecto Liceo' : `Se paga a ${etapa.paraQuien}`}
                </span>

                <span className="whitespace-nowrap font-display text-entrada font-bold text-tinta">
                  {etapa.costo}
                </span>
              </li>
            ))}
          </ul>

          <p className="justificado mt-6 text-menudo text-gris">{titulacion.nota}</p>
        </Revelar>

        {/* Resumen por destinatario: lo que más preguntan */}
        <Revelar retraso={0.1} className="mx-auto mt-12 grid max-w-3xl items-stretch gap-4 sm:grid-cols-2">
          <div className="flex h-full flex-col rounded-lg border border-institucional bg-papel-puro p-6 text-center shadow-elevada">
            <p className="etiqueta">Nos pagas a nosotros</p>
            <p className="mt-3 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-institucional">
              $5,000 MXN
            </p>
            <p className="mt-3 flex-1 text-menudo text-tinta-suave">
              Preparación completa de las dos etapas
              {nuestro.length ? ` (${nuestro.map((e) => e.costo).join(' + ')})` : ''}.
            </p>
          </div>

          <div className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 text-center shadow-tarjeta">
            <p className="etiqueta">Pagas a la institución</p>
            <p className="mt-3 whitespace-nowrap font-display text-t2 font-bold leading-none tracking-[-0.025em] text-tinta">
              $15,064 MXN
            </p>
            <p className="mt-3 flex-1 text-menudo text-tinta-suave">
              Cuotas de examen y de portafolio
              {externo.length ? ` (${externo.map((e) => e.costo).join(' + ')})` : ''}. No
              pasan por nosotros.
            </p>
          </div>
        </Revelar>
      </Seccion>

      {/* Compra de la primera etapa */}
      <Seccion tono="hondo">
        <div className="mx-auto max-w-xl">
          <Revelar className="mb-6 text-center">
            <p className="etiqueta">Primera etapa</p>
            <h2 className="mt-4 text-t2">4 semanas de preparación</h2>
          </Revelar>

          <FormularioCompra
            producto="Titulación Acuerdo 286 · Primera etapa"
            idPago="titulacion-etapa-1"
            precio="$3,500 MXN"
            accion={titulacion.accion}
            perfil="titulacion"
            campoExtra={{
              clave: 'licenciatura',
              etiqueta: 'Área en la que quieres titularte',
              ayuda: 'Por ejemplo: Pedagogía',
            }}
          />
        </div>

        {/*
          Aviso obligatorio. Se ofrece preparación, nunca resultado: además
          de ser lo correcto legalmente, la promesa realista genera menos
          reembolsos y mejores reseñas.
        */}
        <Revelar retraso={0.08} className="mx-auto mt-8 max-w-2xl">
          <p className="justificado rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.7] text-tinta-suave">
            {titulacion.aviso}
          </p>
        </Revelar>
      </Seccion>
    </>
  );
}
