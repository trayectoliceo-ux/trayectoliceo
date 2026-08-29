'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { BotonEnlace } from '@/components/ui/Boton';
import { PalabraRotativa } from '@/components/ui/PalabraRotativa';
import { HojaInforme } from '@/components/psicometrics/MuestraInforme';
import { psicometricsPagina as pm } from '@/content/psicometrics';
import { curva, duracion } from '@/lib/motion';

/**
 * Portada de producto.
 *
 * Es la única página del sitio con lenguaje de software, así que usa la
 * monoespaciada en el titular y una retícula técnica de fondo. La entrada
 * es más corta que la de la portada institucional a propósito: aquí el
 * visitante viene a decidir, no a leer.
 */
export function PortadaPsicoMetrics() {
  const reducido = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-linea bg-papel-hondo">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D6D9E3 1px, transparent 1px), linear-gradient(to bottom, #D6D9E3 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 30% 0%, black, transparent 75%)',
        }}
      />

      <div className="contenedor relative grid gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="etiqueta text-institucional"
          >
            {pm.portada.etiqueta}
          </motion.p>

          <h1 className="mt-7 font-display text-t1 sm:text-portada">
            {pm.portada.titulo.map((linea, indice) => (
              <span key={linea} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: reducido ? 0 : '108%', opacity: reducido ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: reducido ? duracion.base : 0.56,
                    delay: 0.12 + indice * 0.09,
                    ease: curva.salidaSuave,
                  }}
                >
                  {linea}
                  {indice === pm.portada.titulo.length - 1 ? (
                    <>
                      {' '}
                      <PalabraRotativa palabras={pm.portada.rotativas} />
                    </>
                  ) : null}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duracion.base, delay: 0.4, ease: curva.salidaSuave }}
            className="mt-8 max-w-lectura text-cuerpo-lg text-tinta-suave justificado"
          >
            {pm.portada.entrada}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duracion.base, delay: 0.5, ease: curva.salidaSuave }}
            className="mt-10"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonEnlace href={pm.url} externo>
                {pm.portada.accion}
              </BotonEnlace>
              <Link
                href="#modulos"
                className="inline-flex min-h-[44px] items-center px-2 text-menudo font-medium text-institucional underline underline-offset-4"
              >
                {pm.portada.accionSecundaria}
              </Link>
            </div>
            <p className="mt-4 font-mono text-etiqueta uppercase text-gris">
              {pm.portada.subtexto}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reducido ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duracion.lenta, delay: 0.28, ease: curva.salidaSuave }}
        >
          <HojaInforme />
        </motion.div>
      </div>
    </section>
  );
}
