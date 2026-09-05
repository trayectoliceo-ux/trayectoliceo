'use client';

import { motion, useReducedMotion } from 'motion/react';
import { BotonEnlace } from '@/components/ui/Boton';
import { PalabraRotativa } from '@/components/ui/PalabraRotativa';
import { Marcador } from '@/components/ui/Piezas';
import { portada } from '@/content/inicio';
import { sitio } from '@/content/sitio';
import { curva, duracion } from '@/lib/motion';

/**
 * MOMENTO FIRMA
 * -------------
 * Es la única secuencia orquestada del sitio. Todo lo demás se mueve poco y
 * de forma discreta para que esto destaque.
 *
 * Qué ocurre y por qué:
 *  1. La línea de trayecto se dibuja de arriba abajo (`scaleY` desde el
 *     borde superior). Es la figura de la marca y establece el eje.
 *  2. Cada línea del titular sube desde debajo de su propia máscara, como
 *     un texto que se compone. Nunca aparece con opacidad suelta.
 *  3. La última palabra empieza a rotar cuando la secuencia termina, no
 *     antes: si rotara durante la entrada, competirían dos movimientos.
 *  4. Los hitos se marcan sobre la línea, escalonados: 240 ms en total,
 *     por debajo del límite de 400 ms.
 *
 * El contenido es utilizable desde el primer fotograma: nada bloquea la
 * interacción y los enlaces no dependen de que la secuencia termine.
 */

const RETRASO_TITULAR = 0.16;

export function Portada() {
  const reducido = useReducedMotion();

  const transicionTitular = {
    duration: reducido ? duracion.base : 0.56,
    ease: curva.salidaSuave,
  };

  /** La rotación arranca después del último renglón del titular. */
  const finDelTitular = RETRASO_TITULAR + portada.titulo.length * 0.09 + 0.5;

  return (
    <section className="relative overflow-hidden border-b border-linea">
      <div className="contenedor pb-10 pt-10 sm:pt-14 lg:pb-14 lg:pt-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duracion.base, ease: curva.salidaSuave }}
          className="etiqueta"
        >
          {sitio.descriptor}
        </motion.p>

        <h1 className="mt-8 text-portada font-display">
          {portada.titulo.map((linea, indice) => (
            // La máscara es lo que hace que el texto «se componga» en vez
            // de aparecer: solo se anima `transform` dentro del recorte.
            <span key={linea} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: reducido ? 0 : '108%', opacity: reducido ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...transicionTitular, delay: RETRASO_TITULAR + indice * 0.09 }}
              >
                {linea}
                {indice === portada.titulo.length - 1 ? (
                  <>
                    {' '}
                    <ArranqueDiferido retraso={finDelTitular}>
                      <PalabraRotativa palabras={portada.rotativas} />
                    </ArranqueDiferido>
                  </>
                ) : null}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: reducido ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duracion.base,
                delay: finDelTitular - 0.4,
                ease: curva.salidaSuave,
              }}
              className="max-w-lectura text-cuerpo-lg text-tinta-suave justificado sm:text-entrada sm:leading-[1.5]"
            >
              {portada.subtitulo}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reducido ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duracion.base,
                delay: finDelTitular - 0.3,
                ease: curva.salidaSuave,
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              {portada.acciones.map((accion) => (
                <BotonEnlace key={accion.href} href={accion.href} tono={accion.tono}>
                  {accion.titulo}
                </BotonEnlace>
              ))}
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: reducido ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duracion.lenta,
              delay: reducido ? 0 : 0.3,
              ease: curva.salidaSuave,
            }}
          >
            <Marcador
              src={portada.imagen.src}
              descripcion={portada.imagen.descripcion}
              ajuste={portada.imagen.ajuste}
              proporcion="4 / 3"
              prioritaria
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Retrasa el montaje de sus hijos. Se usa para que la palabra rotativa no
 * empiece a cambiar mientras el titular todavía está entrando.
 */
function ArranqueDiferido({
  children,
  retraso,
}: {
  children: React.ReactNode;
  retraso: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duracion.rapida, delay: retraso }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
