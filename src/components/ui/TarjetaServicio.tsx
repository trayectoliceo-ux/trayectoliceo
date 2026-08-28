import { BotonEnlace } from '@/components/ui/Boton';
import { BotonMercadoPago } from '@/components/psicometrics/BotonMercadoPago';
import type { Servicio } from '@/content/servicios';

/**
 * Tarjeta comercial de servicio.
 *
 * Un servicio con `producto` se cobra en línea. Uno sin él se agenda por
 * contacto, y eso es deliberado: una valoración clínica o un programa
 * institucional no deberían venderse con un clic sin hablar antes.
 */
export function TarjetaServicio({ servicio }: { servicio: Servicio }) {
  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-papel-puro p-7 lg:p-8 ${
        servicio.destacado
          ? 'border-institucional shadow-elevada'
          : 'border-linea shadow-tarjeta'
      }`}
    >
      <p className="etiqueta">{servicio.etiqueta}</p>
      <h3 className="mt-4 max-w-[22ch] text-t3">{servicio.titulo}</h3>

      <p className="mt-5 font-display text-t2 leading-none text-institucional">
        {servicio.precio}
      </p>
      {servicio.precioNota ? (
        <p className="mt-2 text-menudo text-gris">{servicio.precioNota}</p>
      ) : null}

      <p className="mt-5 text-menudo leading-[1.7] text-tinta-suave justificado">
        {servicio.resumen}
      </p>

      <dl className="mt-6 border-t border-linea">
        <div className="border-b border-linea py-3">
          <dt className="text-menudo text-gris">Alcance</dt>
          <dd className="mt-1 text-menudo text-tinta">{servicio.alcance}</dd>
        </div>
        <div className="border-b border-linea py-3">
          <dt className="text-menudo text-gris">Entregable</dt>
          <dd className="mt-1 text-menudo text-tinta">{servicio.entregable}</dd>
        </div>
      </dl>

      <ul className="mt-5 flex-1 space-y-2">
        {servicio.incluye.map((elemento) => (
          <li
            key={elemento}
            className="flex items-baseline gap-2.5 text-menudo text-tinta-suave"
          >
            <span aria-hidden className="text-menta">
              ✓
            </span>
            <span>{elemento}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        {servicio.producto ? (
          <BotonMercadoPago paquete={servicio.producto} etiqueta={servicio.accion} />
        ) : (
          <BotonEnlace
            href="/contacto"
            tono={servicio.destacado ? 'solido' : 'contorno'}
            className="w-full"
          >
            {servicio.accion}
          </BotonEnlace>
        )}
      </div>
    </article>
  );
}
