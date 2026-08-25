'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Logotipo } from '@/components/ui/Logotipo';
import { sitio } from '@/content/sitio';
import { curva, duracion, escalonado, muelle, salida } from '@/lib/motion';

export function Cabecera() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const reducido = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement>(null);

  // El menú se cierra al navegar: sin esto queda abierto sobre la página nueva.
  useEffect(() => {
    setAbierto(false);
  }, [ruta]);

  // Escape cierra la capa y el foco vuelve al botón que la abrió.
  useEffect(() => {
    if (!abierto) return;

    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setAbierto(false);
        disparadorRef.current?.focus();
      }
    };

    document.addEventListener('keydown', alPulsar);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = '';
    };
  }, [abierto]);

  const esActiva = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-papel/92 backdrop-blur-[6px]">
      <div className="contenedor flex items-center justify-between gap-6 py-4">
        <Logotipo />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sitio.navegacion.map((elemento) => (
              <li key={elemento.href}>
                <Link
                  href={elemento.href}
                  aria-current={esActiva(elemento.href) ? 'page' : undefined}
                  className="relative flex min-h-[44px] items-center px-3 text-menudo text-tinta-suave transition-colors duration-150 hover:text-institucional aria-[current=page]:text-institucional"
                >
                  {elemento.corto}
                  {esActiva(elemento.href) ? (
                    <motion.span
                      // El indicador se desplaza entre secciones en lugar de
                      // desaparecer y reaparecer en la nueva posición.
                      layoutId="indicador-navegacion"
                      className="absolute inset-x-2 bottom-1 h-px bg-institucional"
                      transition={reducido ? { duration: 0 } : muelle.firme}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contacto"
            className="hidden min-h-[44px] items-center rounded border border-institucional/40 px-5 text-menudo font-medium text-institucional transition-colors duration-150 hover:border-institucional hover:bg-institucional hover:text-papel sm:inline-flex"
          >
            Contacto
          </Link>

          <button
            ref={disparadorRef}
            type="button"
            onClick={() => setAbierto((valor) => !valor)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="-mr-2 flex h-[44px] w-[44px] items-center justify-center rounded text-tinta lg:hidden"
          >
            <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
            <span aria-hidden className="relative block h-[10px] w-5">
              <motion.span
                className="absolute left-0 block h-px w-full bg-current"
                animate={abierto ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: duracion.rapida, ease: curva.simetrica }}
                style={{ top: 0 }}
              />
              <motion.span
                className="absolute left-0 block h-px w-full bg-current"
                animate={abierto ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: duracion.rapida, ease: curva.simetrica }}
                style={{ top: 10 }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {abierto ? (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            // El panel desciende desde la cabecera que lo invocó, no aparece
            // suelto en el centro de la pantalla.
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -8,
              transition: { duration: salida(duracion.lenta), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.lenta, ease: curva.salidaSuave }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-5.5rem)] overflow-y-auto border-b border-linea bg-papel lg:hidden"
          >
            <motion.nav
              aria-label="Navegación principal"
              className="contenedor py-6"
              initial="oculto"
              animate="visible"
              variants={{
                oculto: {},
                visible: {
                  transition: { staggerChildren: reducido ? 0 : escalonado.denso },
                },
              }}
            >
              <ul>
                {[...sitio.navegacion, { titulo: 'Contacto', href: '/contacto' }].map(
                  (elemento) => (
                    <motion.li
                      key={elemento.href}
                      variants={{
                        oculto: { opacity: 0, y: reducido ? 0 : 6 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: duracion.base, ease: curva.salidaSuave },
                        },
                      }}
                      className="border-b border-linea last:border-b-0"
                    >
                      <Link
                        href={elemento.href}
                        aria-current={esActiva(elemento.href) ? 'page' : undefined}
                        className="flex min-h-[56px] items-center font-display text-entrada text-tinta aria-[current=page]:text-institucional"
                      >
                        {elemento.titulo}
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
