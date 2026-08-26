import { BotonEnlace } from '@/components/ui/Boton';
import { Revelar } from '@/components/ui/Revelar';
import { psicometrics } from '@/content/inicio';

/**
 * Único bloque del sitio con lenguaje de producto: fondo de tinta, retícula
 * técnica y tipografía monoespaciada. El contraste con el resto es
 * intencionado —es otra cosa y debe leerse como otra cosa—, pero mantiene la
 * misma paleta para no romper la identidad.
 */
export function BloquePsicoMetrics() {
  return (
    <section className="sobre-oscuro bg-tinta py-seccion text-papel lg:py-seccion-lg">
      <div className="contenedor">
        <Revelar>
          <div className="relative overflow-hidden rounded border border-linea-oscura">
            {/* Retícula técnica: sugiere instrumento, no adorno. */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #166F84 1px, transparent 1px), linear-gradient(to bottom, #166F84 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(to bottom right, black, transparent 70%)',
              }}
            />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <p className="etiqueta text-sello-claro">{psicometrics.etiqueta}</p>
                <h2 className="mt-5 font-mono text-t2 tracking-[-0.02em] text-papel sm:text-t1">
                  {psicometrics.titulo}
                </h2>
                <p className="mt-2 font-mono text-etiqueta uppercase text-papel/50">
                  {psicometrics.descriptor}
                </p>
                <p className="mt-7 max-w-lectura text-cuerpo text-papel/80">
                  {psicometrics.entrada}
                </p>
                <div className="mt-9">
                  <BotonEnlace href="/psicometrics" tono="claro">
                    {psicometrics.accion}
                  </BotonEnlace>
                </div>
              </div>

              <ul className="space-y-0 self-center">
                {psicometrics.caracteristicas.map((caracteristica, indice) => (
                  <li
                    key={caracteristica}
                    className="flex items-baseline gap-4 border-t border-linea-oscura py-4 last:border-b"
                  >
                    <span className="font-mono text-etiqueta text-sello-claro">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="text-menudo text-papel/85">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
