import { VerificadorFolio } from '@/components/verificar/VerificadorFolio';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { CompartirServicio } from '@/components/ui/CompartirServicio';
import { metadatos } from '@/lib/metadatos';

export const metadata = metadatos({
  titulo: 'Verificar un informe psicopedagógico',
  descripcion:
    'Comprueba con el código QR o el folio si un informe fue emitido realmente por un profesional con cédula vigente y si el archivo ha sido alterado.',
  ruta: '/verificar',
});

/**
 * Guía de verificación.
 *
 * No exige registro por diseño: la usa alguien externo —una familia, un
 * colegio— que necesita comprobar un documento que tiene en la mano.
 * Cualquier barrera aquí anula su utilidad.
 */
export default function PaginaVerificar() {
  const pasos = [
    {
      numero: '01',
      titulo: 'Busca el código en el informe',
      texto:
        'Está en la última página, junto al folio que empieza por PM. Aparece impreso y también en el archivo digital.',
    },
    {
      numero: '02',
      titulo: 'Escanéalo con la cámara',
      texto:
        'Abre la cámara del teléfono y apúntala al código, sin tomar la foto. Aparece un aviso en pantalla: tócalo para abrir el enlace.',
    },
    {
      numero: '03',
      titulo: 'Revisa lo que aparece',
      texto:
        'Verás quién firmó el documento, su cédula profesional, la fecha de emisión y si el archivo coincide con el original.',
    },
  ];

  return (
    <>
      <section className="border-b border-linea bg-papel-hondo">
        <div className="contenedor py-10 text-center lg:py-14">
          <Revelar desplazamiento={8}>
            <p className="etiqueta">Verificación pública</p>
            <h1 className="mx-auto mt-4 max-w-[20ch] text-t1">
              Comprueba si un informe es auténtico.
            </h1>
            <p className="justificado-limpio mx-auto mt-5 max-w-[42rem] text-cuerpo-lg leading-[1.6] text-tinta-suave">
              Cada informe que emitimos lleva un folio y un código QR. Con
              cualquiera de los dos puedes confirmar en segundos quién lo firmó, con
              qué cédula y si el archivo sigue siendo el original.
            </p>
          </Revelar>
        </div>
      </section>

      {/* Cómo escanear */}
      <Seccion>
        <Revelar className="text-center">
          <p className="etiqueta">Con el código QR</p>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-t2">
            Tres pasos desde tu teléfono.
          </h2>
        </Revelar>

        <GrupoRevelar total={3} className="mt-8 grid items-stretch gap-4 sm:grid-cols-3">
          {pasos.map((paso) => (
            <ElementoRevelar
              key={paso.numero}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-7"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-institucional/[0.08] font-mono text-menudo font-medium text-institucional">
                {paso.numero}
              </span>
              <h3 className="mt-4 text-balance text-center text-cuerpo-lg font-bold leading-[1.25] sm:text-left">
                {paso.titulo}
              </h3>
              <p className="justificado mt-3 flex-1 text-menudo leading-[1.75] text-tinta-suave">
                {paso.texto}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar retraso={0.08} className="mx-auto mt-9 max-w-xl">
          <p className="mb-4 text-center text-menudo font-semibold text-tinta">
            ¿No puedes escanear? Escribe el folio.
          </p>
          <VerificadorFolio />
        </Revelar>
      </Seccion>

      {/* Qué muestra y qué no */}
      <Seccion tono="hondo">
        <Revelar className="text-center">
          <p className="etiqueta">Qué verás</p>
          <h2 className="mx-auto mt-3 max-w-[22ch] text-t2">
            Se comprueba quién firma, no qué dice.
          </h2>
        </Revelar>

        <GrupoRevelar total={2} className="mx-auto mt-8 grid max-w-4xl items-stretch gap-4 sm:grid-cols-2">
          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-menta/30 bg-menta/[0.05] p-6">
            <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
              Sí se muestra
            </p>
            <ul className="mt-4 space-y-2 text-menudo text-tinta-suave">
              <li>Nombre y cédula de quien firmó</li>
              <li>Fecha de emisión del informe</li>
              <li>Si el folio existe y sigue vigente</li>
              <li>Si el archivo fue modificado después</li>
            </ul>
          </ElementoRevelar>

          <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6">
            <p className="text-menudo font-bold uppercase tracking-[0.08em] text-tinta">
              Nunca se muestra
            </p>
            <ul className="mt-4 space-y-2 text-menudo text-tinta-suave">
              <li>El nombre del menor evaluado</li>
              <li>Resultados o puntuaciones</li>
              <li>Conclusiones o recomendaciones</li>
              <li>Cualquier contenido del informe</li>
            </ul>
          </ElementoRevelar>
        </GrupoRevelar>

        <Revelar retraso={0.08}>
          <p className="justificado-limpio mx-auto mt-7 max-w-[44rem] rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.75] text-tinta-suave">
            El informe identifica al menor mediante un código de caso, no con su
            nombre. La correspondencia entre ese código y su identidad obra
            únicamente en poder del profesional que firma. Por eso la consulta puede
            ser pública sin exponer a nadie.
          </p>
        </Revelar>
      </Seccion>

      <Seccion>
        <CompartirServicio
          servicio="Verifica un informe psicopedagógico"
          ruta="/verificar"
          
          descripcion="Comprueba con el código QR o el folio quién firmó el documento y si sigue siendo el original."
        />
      </Seccion>
    </>
  );
}
