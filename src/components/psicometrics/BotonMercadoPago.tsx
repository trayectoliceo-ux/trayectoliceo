'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { iniciarPagoMercadoPago } from '@/lib/pagos';
import { curva, duracion } from '@/lib/motion';

/**
 * BOTÓN DE COMPRA · MERCADO PAGO
 * ------------------------------
 * MAQUETA. Reproduce el comportamiento visual de la llamada al SDK
 * —estado de carga mientras se crea la preferencia y redirección al
 * checkout— pero no cobra nada todavía.
 *
 * La conexión real se hace en `src/lib/pagos.ts`, que es el único archivo
 * a tocar. Este componente no sabe quién procesa el pago.
 *
 * Sobre los métodos de pago: se listan como texto, no como logotipos.
 * Las marcas de Visa, Mastercard y las demás tienen normas de uso propias
 * y reproducirlas sin licencia es un riesgo innecesario. Cuando conectes
 * Mercado Pago, su SDK muestra los logotipos oficiales dentro del checkout,
 * que es donde corresponde y donde están autorizados.
 */

const metodosDePago = [
  'Visa',
  'Mastercard',
  'American Express',
  'SPEI',
  'OXXO',
] as const;

export function BotonMercadoPago({
  paquete,
  etiqueta,
  nombreProducto,
  compacto = false,
}: {
  /** Identificador del producto en el catálogo del servidor. */
  paquete: string;
  etiqueta: string;
  /** Nombre legible, para el mensaje de WhatsApp si no hay pasarela. */
  nombreProducto?: string;
  /** Oculta los métodos de pago y el aviso: para listas con varios botones. */
  compacto?: boolean;
}) {
  const [estado, setEstado] = useState<'reposo' | 'creando' | 'error'>('reposo');
  const reducido = useReducedMotion();

  const comprar = async () => {
    setEstado('creando');
    const resultado = await iniciarPagoMercadoPago(paquete, nombreProducto);

    if (resultado.ok) {
      // Con la integración real, aquí se redirige al checkout.
      window.location.href = resultado.urlCheckout;
      return;
    }

    setEstado('error');
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => void comprar()}
        disabled={estado === 'creando'}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-institucional px-6 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo disabled:opacity-60"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={estado}
            initial={{ opacity: 0, y: reducido ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducido ? 0 : -5 }}
            transition={{ duration: duracion.instante }}
            className="flex items-center gap-2"
          >
            {estado === 'creando' ? (
              <>
                <Girador />
                Conectando con Mercado Pago…
              </>
            ) : (
              etiqueta
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {estado === 'error' ? (
        <p role="alert" className="mt-2 text-center text-menudo text-sello">
          No se pudo iniciar el pago. Inténtalo de nuevo o escríbenos.
        </p>
      ) : null}

      {compacto ? null : (
      <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
        {metodosDePago.map((metodo) => (
          <li
            key={metodo}
            className="rounded border border-linea bg-papel px-2.5 py-1 text-[0.6875rem] font-medium text-tinta-suave"
          >
            {metodo}
          </li>
        ))}
      </ul>
      )}

      {compacto ? null : (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
        className="mt-3 flex items-start justify-center gap-1.5 text-center text-menudo text-gris"
      >
        <span aria-hidden className="text-menta">
          ⬤
        </span>
        <span>
          Pago procesado por Mercado Pago. Los créditos se activan en cuanto se
          confirma la operación.
        </span>
      </motion.p>
      )}
    </div>
  );
}

/** Indicador de carga. Rota de forma continua, que es su única excepción. */
function Girador() {
  return (
    <motion.span
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      className="block h-4 w-4 rounded-full border-2 border-papel/30 border-t-papel"
    />
  );
}
