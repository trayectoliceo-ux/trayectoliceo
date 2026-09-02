'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { psicometricsPagina as pm } from '@/content/psicometrics';
import { curva, duracion, escalonado, vistaUnaVez } from '@/lib/motion';

/**
 * MUESTRA DE INFORME VERIFICABLE
 * ------------------------------
 * El argumento de venta más fuerte de la plataforma es difícil de explicar
 * y fácil de enseñar: el documento se compone, se sella y queda
 * comprobable.
 *
 * La secuencia lo representa en ese orden —hoja, líneas del expediente,
 * código, y por último el sello de verificado— porque contar el proceso
 * convence más que afirmar el resultado.
 *
 * El sello llega al final y con muelle: es el único elemento con rebote de
 * toda la página, y por eso se lee como confirmación. Con movimiento
 * reducido aparece sin escala ni giro, pero aparece: es información, no
 * decoración.
 */
export function MuestraInforme() {
  const reducido = useReducedMotion();
  const { muestra } = pm;

  return (
    <div className="grid items-center gap-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <motion.div
        initial={{ opacity: 0, y: reducido ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vistaUnaVez}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
      >
        <p className="etiqueta">{muestra.etiqueta}</p>
        <h2 className="mt-5 max-w-[18ch] text-t1">{muestra.titulo}</h2>
        <p className="justificado mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
          {muestra.entrada}
        </p>
        <Link
          href={`/verificar/${muestra.folio}`}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded bg-institucional px-7 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
        >
          {muestra.accion}
        </Link>
      </motion.div>

      <HojaInforme />
    </div>
  );
}

/**
 * La hoja del informe. Se usa suelta en la portada de producto y dentro de
 * la sección explicativa, así que vive como componente propio.
 */
export function HojaInforme() {
  const reducido = useReducedMotion();
  const { muestra } = pm;

  return (
      <motion.figure
        initial="oculto"
        whileInView="visible"
        viewport={vistaUnaVez}
        variants={{
          oculto: {},
          visible: { transition: { staggerChildren: reducido ? 0 : escalonado.base } },
        }}
        className="relative mx-auto w-full max-w-md"
      >
        <motion.div
          variants={{
            oculto: { opacity: 0, y: reducido ? 0 : 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: duracion.lenta, ease: curva.salidaSuave },
            },
          }}
          className="rounded-lg border border-linea bg-papel-puro p-7 shadow-elevada sm:p-8"
        >
          <p className="etiqueta">PsicoMetrics</p>
          <h3 className="mt-3 text-entrada">{muestra.documento.titulo}</h3>

          <dl className="mt-6 border-t border-linea">
            {muestra.documento.lineas.map((linea) => (
              <motion.div
                key={linea.etiqueta}
                variants={{
                  oculto: { opacity: 0, x: reducido ? 0 : -8 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: duracion.base, ease: curva.salidaSuave },
                  },
                }}
                className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-linea py-2.5"
              >
                <dt className="text-menudo text-gris">{linea.etiqueta}</dt>
                <dd className="text-menudo font-medium text-tinta">{linea.valor}</dd>
              </motion.div>
            ))}
          </dl>

          {/* Bloque de folio y código */}
          <motion.div
            variants={{
              oculto: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: duracion.base, ease: curva.salidaSuave },
              },
            }}
            className="mt-6 flex items-center gap-5 rounded border border-linea bg-papel p-4"
          >
            <Image
              src="/imagenes/qr-verificacion.png"
              alt="Código de verificación del documento de muestra"
              width={370}
              height={370}
              className="h-20 w-20 shrink-0 rounded-sm"
            />
            <div className="min-w-0">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-gris">
                Folio
              </p>
              <p className="mt-0.5 break-all font-mono text-menudo font-medium tracking-[0.06em] text-tinta">
                {muestra.folio}
              </p>
              <p className="mt-2 text-[0.75rem] leading-[1.4] text-gris">{muestra.pie}</p>
            </div>
          </motion.div>

          <p className="mt-4 text-center text-[0.75rem] text-gris">
            {muestra.documento.aviso}
          </p>
        </motion.div>

        {/* Sello de verificación: el remate de la secuencia. */}
        <motion.div
          aria-hidden
          variants={{
            oculto: reducido
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.6, rotate: -14 },
            visible: reducido
              ? { opacity: 1, transition: { duration: duracion.base, delay: 0.5 } }
              : {
                  opacity: 1,
                  scale: 1,
                  rotate: -8,
                  transition: {
                    type: 'spring',
                    stiffness: 320,
                    damping: 16,
                    delay: 0.55,
                  },
                },
          }}
          className="absolute -right-2 -top-4 flex items-center gap-2 rounded-full border-2 border-menta bg-papel-puro px-4 py-2 shadow-tarjeta sm:-right-5"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-menta text-menudo font-bold text-papel">
            ✓
          </span>
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-menta">
            Verificado
          </span>
        </motion.div>
      </motion.figure>
  );
}
