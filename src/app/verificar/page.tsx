import { VerificadorFolio } from '@/components/verificar/VerificadorFolio';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { metadatos } from '@/lib/metadatos';

export const metadata = metadatos({
  titulo: 'Verificar un informe',
  descripcion:
    'Comprueba en segundos si un informe psicopedagógico fue emitido realmente por un profesional acreditado y si el archivo ha sido alterado.',
  ruta: '/verificar',
});

/**
 * Página pública de verificación.
 *
 * No exige registro ni identificación por diseño: la usa alguien externo
 * —una familia, un colegio— que necesita comprobar un documento que tiene
 * en la mano. Cualquier barrera aquí anula su utilidad.
 */
export default function PaginaVerificar() {
  return (
    <>
      <section className="border-b border-linea bg-papel-hondo">
        <div className="contenedor py-14 text-center lg:py-20">
          <Revelar desplazamiento={8}>
            <p className="etiqueta">Verificación pública</p>
            <h1 className="mx-auto mt-5 max-w-[20ch] text-t1">
              Comprueba si un informe es auténtico.
            </h1>
            <p className="mx-auto mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
              Introduce el folio impreso en el documento. En segundos sabrás quién lo
              emitió, con qué cédula y si sigue vigente.
            </p>
          </Revelar>
        </div>
      </section>

      <Seccion>
        <Revelar>
          <VerificadorFolio />
        </Revelar>

        <Revelar retraso={0.08} className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-t3">Qué muestra y qué no</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta">
              <p className="text-menudo font-semibold text-menta">Sí se muestra</p>
              <ul className="mt-3 space-y-2 text-menudo text-tinta-suave">
                <li>Si el folio existe en el registro</li>
                <li>Nombre y cédula de quien lo emitió</li>
                <li>Fecha de emisión y estado</li>
                <li>Si el archivo fue modificado</li>
              </ul>
            </div>
            <div className="rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta">
              <p className="text-menudo font-semibold text-tinta">Nunca se muestra</p>
              <ul className="mt-3 space-y-2 text-menudo text-tinta-suave">
                <li>El nombre del menor evaluado</li>
                <li>Puntajes o resultados de pruebas</li>
                <li>Conclusiones o recomendaciones</li>
                <li>Cualquier contenido del informe</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-menudo text-gris justificado">
            La consulta es anónima y no requiere cuenta. Por eso el registro solo
            contiene datos de emisión: quién responde por el documento y cuándo lo
            firmó. Todo el contenido clínico permanece en el expediente, accesible
            únicamente para el profesional que lo elaboró.
          </p>
        </Revelar>
      </Seccion>
    </>
  );
}
