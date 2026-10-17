import { CompartirTarjeta } from '@/components/ui/CompartirTarjeta';
import { Desplegable } from '@/components/ui/Desplegable';
import { sitio } from '@/content/sitio';

export type ServicioFamilia = {
  id: string;
  nombre: string;
  edades: string;
  resumen: string;
  detalle: string[];
  accion: string;
  url: string;
  destacado?: boolean;
};

/**
 * TARJETA DE SERVICIO PARA FAMILIAS
 * ---------------------------------
 * Una sola pieza para la portada y para /familias, porque la escalera de
 * precios tiene que leerse idéntica en los dos sitios: si en un lado dice
 * «gratis» y en el otro aparece una cifra, la familia desconfía justo en
 * el momento en que estaba por empezar.
 *
 * El orden del contenido no es casual. Primero el nombre y la edad, que es
 * lo que la persona busca para saber si le toca. Después «Gratis» en
 * grande, que es el argumento. Y solo entonces la aportación opcional, en
 * pequeño: ponerla arriba convertiría una pantalla de «empieza ya» en una
 * pantalla de precios.
 *
 * El detalle va en un desplegable. Las tres tarjetas se comparan entre sí,
 * y para compararlas tienen que caber juntas en pantalla; quien ya eligió
 * una abre su detalle y lee lo específico.
 */
export function TarjetaServicio({ servicio }: { servicio: ServicioFamilia }) {
  return (
    <article
      className={`flex flex-col rounded-lg border bg-papel-puro p-6 text-center sm:p-7 ${
        servicio.destacado
          ? 'border-institucional shadow-elevada'
          : 'border-linea shadow-tarjeta'
      }`}
    >
      {/*
        `hyphens` heredado de la hoja global parte las palabras largas con
        guión; `text-balance` reparte las líneas para que la última no
        quede con una sola palabra colgando.

        La altura mínima va en `em`, no en `rem`: así equivale siempre a
        dos renglones del propio título, que escala con `clamp`. Con una
        medida fija habría que recalcularla en cada ancho, y es justo ahí
        donde la alineación entre tarjetas se rompe.
      */}
      <h3 className="text-balance text-t3 leading-[1.15] sm:min-h-[2.4em]">
        {servicio.nombre}
      </h3>
      <p className="mt-2 text-menudo text-gris">{servicio.edades}</p>

      <p className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-menta">
        Gratis
      </p>
      <p className="mt-1 text-menudo leading-[1.5] text-gris">
        Informe firmado, opcional:
        <br />
        aportación desde&nbsp;$49
      </p>

      <p className="justificado mt-4 text-menudo leading-[1.75] text-tinta-suave sm:min-h-[5.5em]">
        {servicio.resumen}
      </p>

      <div className="mt-4">
        <Desplegable resumen="Ver detalle">
          <ul className="border-t border-linea text-left">
            {servicio.detalle.map((punto) => (
              <li
                key={punto}
                className="flex items-baseline gap-3 border-b border-linea py-2.5 text-menudo leading-[1.6] text-tinta-suave"
              >
                <span aria-hidden className="text-institucional">
                  ·
                </span>
                <span className="min-w-0">{punto}</span>
              </li>
            ))}
          </ul>
        </Desplegable>
      </div>

      {/*
        Las tarjetas no se estiran a la altura de la más alta: al abrir un
        detalle solo crece la suya, y las otras dos no se quedan con un
        hueco en blanco que no explica nada. Cerradas quedan iguales
        gracias a las alturas mínimas de arriba.
      */}
      <div className="pt-5">
        <a
          href={servicio.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200 ${
            servicio.destacado
              ? 'bg-institucional text-papel hover:bg-institucional-hondo'
              : 'border border-institucional/40 text-institucional hover:border-institucional hover:bg-institucional hover:text-papel'
          }`}
        >
          {servicio.accion}
        </a>

        <CompartirTarjeta
          titulo={`${servicio.nombre} · Trayecto Liceo`}
          texto={servicio.resumen}
          url={`${sitio.dominio}/familias`}
        />
      </div>
    </article>
  );
}
