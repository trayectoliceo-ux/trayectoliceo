import { BotonEnlace } from './Boton';
import { Revelar } from './Revelar';
import { sitio } from '@/content/sitio';

/**
 * Cierre de página. Una sola acción principal y el correo como alternativa
 * para quien no quiere llenar un formulario.
 */
export function LlamadaContacto({
  titulo,
  texto,
  accion = 'Escribir a Trayecto Liceo',
  href = '/contacto',
}: {
  titulo: string;
  texto: string;
  accion?: string;
  href?: string;
}) {
  return (
    <section className="sobre-oscuro bg-institucional py-16 text-papel lg:py-20">
      <div className="contenedor">
        <Revelar className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
          <div>
            <h2 className="max-w-[24ch] text-t2 text-papel">{titulo}</h2>
            <p className="mt-4 max-w-lectura text-cuerpo text-papel/80">{texto}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <BotonEnlace href={href} tono="claro">
              {accion}
            </BotonEnlace>
            <a
              href={`mailto:${sitio.contacto.correo}`}
              className="inline-flex min-h-[44px] items-center justify-center px-2 text-menudo text-papel/80 underline underline-offset-4 transition-colors duration-150 hover:text-papel"
            >
              {sitio.contacto.correo}
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
