'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  enlaceVerificacion,
  folioParecevalido,
  limpiarFolio,
} from '@/lib/verificacion';
import { curva, duracion } from '@/lib/motion';

/**
 * CONSULTA DE FOLIO
 * -----------------
 * Recoge el folio impreso en el informe y lleva a la comprobación en
 * PsicoMetrics, que es donde vive el registro.
 *
 * Se valida solo la forma del folio, no su existencia: si falta un bloque o
 * sobra un carácter se avisa aquí, y así nadie hace el viaje para
 * encontrarse con un error del otro lado.
 */
export function VerificadorFolio({ folioInicial = '' }: { folioInicial?: string }) {
  const [folio, setFolio] = useState(limpiarFolio(folioInicial));
  const [error, setError] = useState<string | null>(null);

  const consultar = () => {
    if (!folio.trim()) {
      setError('Escribe el folio que aparece al pie del informe.');
      return;
    }

    if (!folioParecevalido(folio)) {
      setError('Revisa el folio: debe tener la forma PM-2026-XXXXX-XXXXX-X.');
      return;
    }

    window.open(enlaceVerificacion(folio), '_blank', 'noopener');
  };

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        consultar();
      }}
      className="rounded-lg border border-institucional bg-papel-puro p-6 shadow-elevada sm:p-8"
    >
      <label htmlFor="folio" className="text-menudo font-semibold text-tinta">
        Folio del documento
      </label>
      <p className="mt-1 text-menudo text-gris">
        Aparece al pie del informe, junto al código QR. Empieza por PM.
      </p>

      <input
        id="folio"
        value={folio}
        onChange={(evento) => {
          setFolio(limpiarFolio(evento.target.value));
          setError(null);
        }}
        placeholder="PM-2026-K23KQ-3W9B3-Y"
        autoComplete="off"
        spellCheck={false}
        aria-invalid={Boolean(error)}
        className={`mt-4 min-h-[52px] w-full rounded border bg-papel/60 px-4 font-mono text-cuerpo uppercase tracking-[0.06em] text-tinta transition-colors duration-150 focus:bg-papel-puro ${
          error ? 'border-sello' : 'border-linea hover:border-institucional/40'
        }`}
      />

      {error ? (
        <motion.p
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duracion.instante, ease: curva.salidaSuave }}
          className="mt-2 text-menudo text-sello"
        >
          {error}
        </motion.p>
      ) : null}

      <button
        type="submit"
        className="mt-5 flex min-h-[56px] w-full items-center justify-center rounded bg-institucional px-6 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
      >
        Verificar documento
      </button>

      <p className="mt-3 text-center text-menudo text-gris">
        La comprobación se abre en psicometrics.app, donde vive el registro.
      </p>
    </form>
  );
}
