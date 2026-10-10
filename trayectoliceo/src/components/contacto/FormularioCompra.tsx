'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { registrarLead } from '@/lib/leads';
import { iniciarPagoMercadoPago } from '@/lib/pagos';
import { validarCampo } from '@/lib/validacion';
import { curva, duracion } from '@/lib/motion';

/**
 * FORMULARIO PREVIO AL PAGO
 * -------------------------
 * Tres campos y a cobrar. Cada campo adicional cuesta ventas, así que solo
 * se pide lo que hace falta para dar seguimiento: nombre, correo y
 * teléfono. Lo demás se pregunta después de que ya pagaron.
 *
 * El orden importa: se registra el prospecto ANTES de abrir la pasarela.
 * Quien llena el formulario y abandona en el checkout es exactamente a
 * quien conviene llamar, y sin este paso ese dato no existiría.
 *
 * Si el registro falla, el cobro sigue igual. Perder el dato es malo;
 * perder la venta es peor.
 */
export function FormularioCompra({
  producto,
  idPago,
  precio,
  accion,
  perfil = 'familia',
  campoExtra,
}: {
  producto: string;
  idPago: string;
  precio: string;
  accion: string;
  perfil?: string;
  /** Un solo campo adicional, cuando el servicio lo necesita de verdad. */
  campoExtra?: { clave: string; etiqueta: string; ayuda?: string };
}) {
  const ruta = usePathname();
  const idBase = useId();
  const reducido = useReducedMotion();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [extra, setExtra] = useState('');
  const [errores, setErrores] = useState<Record<string, string | undefined>>({});
  const [estado, setEstado] = useState<'reposo' | 'procesando' | 'error'>('reposo');

  const validar = () => {
    const encontrados: Record<string, string | undefined> = {
      nombre: validarCampo('nombre', nombre, 'familia'),
      correo: validarCampo('correo', correo, 'familia'),
      telefono: validarCampo('telefono', telefono, 'familia'),
    };

    if (campoExtra && !extra.trim()) {
      encontrados[campoExtra.clave] = 'Este dato es necesario para continuar.';
    }

    setErrores(encontrados);

    return Object.values(encontrados).every((error) => !error);
  };

  const continuar = async () => {
    if (!validar()) return;

    setEstado('procesando');

    await registrarLead({
      nombre,
      correo,
      telefono,
      producto,
      perfil,
      extra: campoExtra ? { [campoExtra.clave]: extra } : undefined,
      origen: ruta,
    });

    const resultado = await iniciarPagoMercadoPago(idPago, producto);

    if (resultado.ok) {
      window.location.href = resultado.urlCheckout;
      return;
    }

    setEstado('error');
  };

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        void continuar();
      }}
      className="rounded-lg border border-institucional bg-papel-puro p-6 shadow-elevada sm:p-7"
    >
      <p className="etiqueta text-center">Inversión</p>
      <p className="mt-2 whitespace-nowrap text-center font-display text-t1 font-bold leading-none tracking-[-0.03em] text-institucional">
        {precio}
      </p>

      <div className="mt-6 space-y-4">
        <Campo
          id={`${idBase}-nombre`}
          etiqueta="Nombre completo"
          autoComplete="name"
          valor={nombre}
          error={errores.nombre}
          onChange={setNombre}
        />
        <Campo
          id={`${idBase}-correo`}
          etiqueta="Correo electrónico"
          tipo="email"
          inputMode="email"
          autoComplete="email"
          valor={correo}
          error={errores.correo}
          onChange={setCorreo}
        />
        <Campo
          id={`${idBase}-telefono`}
          etiqueta="WhatsApp"
          tipo="tel"
          inputMode="tel"
          autoComplete="tel"
          ayuda="10 dígitos"
          valor={telefono}
          error={errores.telefono}
          onChange={setTelefono}
        />
        {campoExtra ? (
          <Campo
            id={`${idBase}-extra`}
            etiqueta={campoExtra.etiqueta}
            ayuda={campoExtra.ayuda}
            valor={extra}
            error={errores[campoExtra.clave]}
            onChange={setExtra}
          />
        ) : null}
      </div>

      <button
        type="submit"
        disabled={estado === 'procesando'}
        className="mt-6 flex min-h-[56px] w-full items-center justify-center gap-2 rounded bg-institucional px-6 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo disabled:opacity-60"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={estado}
            initial={{ opacity: 0, y: reducido ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducido ? 0 : -5 }}
            transition={{ duration: duracion.instante, ease: curva.salidaSuave }}
            className="flex items-center gap-2"
          >
            {estado === 'procesando' ? (
              <>
                <span
                  aria-hidden
                  className="block h-4 w-4 animate-spin rounded-full border-2 border-papel/30 border-t-papel"
                />
                Llevándote al pago…
              </>
            ) : (
              accion
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {estado === 'error' ? (
        <p role="alert" className="mt-3 text-center text-menudo text-sello">
          No se pudo abrir el pago. Escríbenos por WhatsApp y lo resolvemos.
        </p>
      ) : (
        <p className="mt-3 text-center text-menudo text-gris">
          Pago seguro con Mercado Pago. Tarjeta, transferencia o efectivo.
        </p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  error,
  ayuda,
  tipo = 'text',
  inputMode,
  autoComplete,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  error?: string;
  ayuda?: string;
  tipo?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-menudo font-semibold text-tinta">
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        aria-invalid={Boolean(error)}
        className={`mt-1.5 min-h-[48px] w-full rounded border bg-papel/60 px-4 py-3 text-cuerpo text-tinta transition-colors duration-150 focus:bg-papel-puro ${
          error ? 'border-sello' : 'border-linea hover:border-institucional/40'
        }`}
      />
      {error ? (
        <p className="mt-1.5 text-menudo text-sello">{error}</p>
      ) : ayuda ? (
        <p className="mt-1.5 text-menudo text-gris">{ayuda}</p>
      ) : null}
    </div>
  );
}
