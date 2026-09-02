'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { TarjetaPrograma } from '@/components/ui/TarjetaPrograma';
import { pestanas, programas } from '@/content/certificate';
import { curva, duracion, escalonado, muelle, salida } from '@/lib/motion';

/**
 * PROGRAMAS POR PERFIL
 * --------------------
 * El visitante elige quién es y ve solo lo que le corresponde.
 *
 * No es solo comodidad: un docente no puede inscribirse a un programa que
 * exige cédula, y enterarse después de pagar es la peor forma de
 * descubrirlo. La pestaña filtra antes de que ocurra.
 *
 * El subrayado activo se desplaza entre pestañas con `layoutId`: comunica
 * que una sustituye a la otra, no que aparece de la nada.
 */
export function ProgramasPorPerfil() {
  const reducido = useReducedMotion();
  const [activa, setActiva] = useState<(typeof pestanas)[number]['id']>('profesional');

  const pestana = pestanas.find((elemento) => elemento.id === activa) ?? pestanas[0];
  const visibles = programas.filter((programa) => programa.publico === activa);

  return (
    <div>
      {/* Selector */}
      <div
        role="tablist"
        aria-label="Perfil profesional"
        className="grid gap-2 sm:grid-cols-3"
      >
        {pestanas.map((elemento) => {
          const seleccionada = elemento.id === activa;

          return (
            <button
              key={elemento.id}
              type="button"
              role="tab"
              aria-selected={seleccionada}
              aria-controls={`panel-${elemento.id}`}
              onClick={() => setActiva(elemento.id)}
              className={`relative min-h-[44px] rounded-lg border p-5 text-left transition-colors duration-200 ${
                seleccionada
                  ? 'border-institucional'
                  : 'border-linea hover:border-institucional/40'
              }`}
            >
              {seleccionada ? (
                <motion.span
                  layoutId="pestana-activa"
                  className="absolute inset-0 rounded-lg bg-institucional/[0.06]"
                  transition={reducido ? { duration: 0 } : muelle.firme}
                />
              ) : null}

              <span className="relative block text-balance text-menudo font-semibold leading-[1.35] text-tinta">
                {elemento.titulo}
              </span>
              <span className="relative mt-1 block text-menudo text-gris">
                {elemento.pie}
              </span>
            </button>
          );
        })}
      </div>

      {/* Aclaración de alcance del perfil elegido */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={pestana.id}
          initial={{ opacity: 0, y: reducido ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
          }}
          transition={{ duration: duracion.base, ease: curva.salidaSuave }}
          className="justificado mx-auto mt-6 max-w-lectura rounded border-l-4 border-institucional bg-papel-puro p-4 text-menudo leading-[1.6] text-tinta-suave"
        >
          {pestana.nota}
        </motion.p>
      </AnimatePresence>

      {/* Programas del perfil */}
      <div id={`panel-${activa}`} role="tabpanel" className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activa}
            initial="oculto"
            animate="visible"
            exit={{
              opacity: 0,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            variants={{
              oculto: {},
              visible: {
                transition: { staggerChildren: reducido ? 0 : escalonado.base },
              },
            }}
            className="space-y-5"
          >
            {visibles.map((programa) => (
              <motion.div
                key={programa.id}
                variants={{
                  oculto: { opacity: 0, y: reducido ? 0 : 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: duracion.base, ease: curva.salidaSuave },
                  },
                }}
              >
                <TarjetaPrograma programa={programa} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
