import { CompartirTarjeta } from '@/components/ui/CompartirTarjeta';
import { sitio } from '@/content/sitio';

export type ServicioFamilia = {
  id: string;
  nombre: string;
  edades: string;
  resumen: string;
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
 */
export function TarjetaServicio({ servicio }: { servicio: ServicioFamilia }) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg border bg-papel-puro p-6 text-center sm:p-7 ${
        servicio.destacado
          ? 'border-institucional shadow-elevada'
          : 'border-linea shadow-tarjeta'
      }`}
    >
      <h3 className="text-balance text-t3">{servicio.nombre}</h3>
      <p className="mt-2 text-menudo text-gris">{servicio.edades}</p>

      <p className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-menta">
        Gratis
      </p>
      <p className="mt-1 text-menudo text-gris">
        Informe firmado, opcional: aportación desde&nbsp;$49
      </p>

      <p className="justificado mt-4 flex-1 text-menudo leading-[1.75] text-tinta-suave">
        {servicio.resumen}
      </p>

      <a
        href={servicio.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 flex min-h-[52px] w-full items-center justify-center rounded px-5 text-center text-cuerpo font-semibold transition-colors duration-200 ${
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
  );
}
