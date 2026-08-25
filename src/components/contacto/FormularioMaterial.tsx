'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useId, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { suscribirCorreo } from '@/lib/enviarFormulario';
import { validarCampo } from '@/lib/validacion';
import { curva, duracion } from '@/lib/motion';

type Estado = 'reposo' | 'enviando' | 'enviado' | 'error';

/**
 * Entrega de material a cambio del correo. Comparte el mismo punto único de
 * conexión con el backend que el formulario de contacto.
 */
export function FormularioMaterial({ material }: { material: string }) {
  const id = useId();
  const reducido = useReducedMotion();
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [estado, setEstado] = useState<Estado>('reposo');

  const enviar = async () => {
    const mensaje = validarCampo('correo', correo, 'familia');
    setError(mensaje);
    if (mensaje) return;

    setEstado('enviando');
    const resultado = await suscribirCorreo(correo, material);
    setEstado(resultado.ok ? 'enviado' : 'error');
  };

  if (estado === 'enviado') {
    return (
      <motion.p
        role="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
        className="mt-6 border-t border-linea pt-5 text-menudo text-institucional"
      >
        Enviado. Revisa tu bandeja de entrada: el material llega en unos minutos.
      </motion.p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        void enviar();
      }}
      className="mt-6 border-t border-linea pt-5"
    >
      <label htmlFor={id} className="etiqueta">
        Correo electrónico
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={correo}
          onChange={(evento) => {
            setCorreo(evento.target.value);
            if (error) setError(undefined);
          }}
          onBlur={() => setError(validarCampo('correo', correo, 'familia'))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-[44px] flex-1 rounded border bg-transparent px-3.5 py-3 text-menudo text-tinta transition-colors duration-150 ${
            error ? 'border-sello' : 'border-linea hover:border-institucional/40'
          }`}
        />
        <Boton type="submit" tono="contorno" disabled={estado === 'enviando'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={estado}
              initial={{ opacity: 0, y: reducido ? 0 : 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducido ? 0 : -5 }}
              transition={{ duration: duracion.instante }}
              className="block"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Recibir material'}
            </motion.span>
          </AnimatePresence>
        </Boton>
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.75rem] text-sello">
          {error}
        </p>
      ) : null}

      {estado === 'error' ? (
        <p role="alert" className="mt-2 text-[0.75rem] text-sello">
          No se pudo enviar. Inténtalo de nuevo en un momento.
        </p>
      ) : null}
    </form>
  );
}
