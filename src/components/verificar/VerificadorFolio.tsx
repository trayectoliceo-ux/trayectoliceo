'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  calcularHuella,
  consultarFolio,
  formatearFolio,
  type RegistroFolio,
} from '@/lib/verificacion';
import { curva, duracion, salida } from '@/lib/motion';

/**
 * VERIFICADOR PÚBLICO
 * -------------------
 * Diseñado para que lo use alguien que no es técnico y que probablemente
 * está preocupado: una madre o un orientador con un documento en la mano.
 *
 * Por eso el resultado se lee en la primera línea y en un solo golpe de
 * vista —color y palabra, no párrafo— y los detalles quedan debajo.
 *
 * La comprobación de huella es opcional y va en segundo lugar: pedirla
 * antes que el folio duplicaría la barrera de entrada.
 */

type Fase = 'reposo' | 'consultando' | 'resultado';

export function VerificadorFolio({ folioInicial = '' }: { folioInicial?: string }) {
  const reducido = useReducedMotion();
  const [folio, setFolio] = useState(formatearFolio(folioInicial));
  const [fase, setFase] = useState<Fase>('reposo');
  const [registro, setRegistro] = useState<RegistroFolio | null>(null);
  const [huellaArchivo, setHuellaArchivo] = useState<string | null>(null);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);

  const verificar = async (valor: string) => {
    if (valor.replace(/-/g, '').length < 10) return;

    setFase('consultando');
    setHuellaArchivo(null);
    setErrorArchivo(null);
    const resultado = await consultarFolio(valor);
    setRegistro(resultado);
    setFase('resultado');
  };

  // Si el folio llega en la URL (desde el código QR), se consulta solo.
  useEffect(() => {
    if (folioInicial) void verificar(formatearFolio(folioInicial));
  }, [folioInicial]);

  const comprobarArchivo = async (archivo: File | undefined) => {
    if (!archivo) return;
    setErrorArchivo(null);

    try {
      setHuellaArchivo(await calcularHuella(archivo));
    } catch {
      setErrorArchivo('No se pudo leer el archivo. Comprueba que sea un PDF válido.');
    }
  };

  const coincide =
    registro && huellaArchivo ? huellaArchivo === registro.huella : null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          void verificar(folio);
        }}
        className="rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-8"
      >
        <label htmlFor="folio" className="text-menudo font-semibold text-tinta">
          Folio del documento
        </label>
        <p className="mt-1 text-menudo text-gris">
          Está impreso al pie del informe, junto al código de barras.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            id="folio"
            value={folio}
            onChange={(evento) => setFolio(formatearFolio(evento.target.value))}
            placeholder="AB7K-2291-QN"
            autoComplete="off"
            spellCheck={false}
            className="min-h-[52px] flex-1 rounded border border-linea bg-papel/60 px-4 font-mono text-cuerpo uppercase tracking-[0.08em] text-tinta transition-colors duration-150 hover:border-institucional/40 focus:bg-papel-puro"
          />
          <button
            type="submit"
            disabled={fase === 'consultando'}
            className="min-h-[52px] rounded bg-institucional px-7 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo disabled:opacity-60"
          >
            {fase === 'consultando' ? 'Verificando…' : 'Verificar'}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {fase === 'resultado' && registro ? (
          <motion.div
            key={registro.folio + registro.estado}
            initial={{ opacity: 0, y: reducido ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="mt-5"
          >
            <Resultado registro={registro} />

            {registro.estado !== 'inexistente' ? (
              <div className="mt-4 rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-8">
                <h3 className="text-menudo font-semibold text-tinta">
                  Comprobar que el archivo no fue alterado
                </h3>
                <p className="mt-1 max-w-[54ch] text-menudo text-gris justificado">
                  Opcional. El archivo se analiza en tu propio equipo y no se envía a
                  ningún servidor: solo se calcula su huella digital para compararla con
                  la registrada.
                </p>

                <label className="mt-4 flex min-h-[52px] cursor-pointer items-center justify-center rounded border border-dashed border-linea px-5 text-menudo font-medium text-institucional transition-colors duration-150 hover:border-institucional hover:bg-institucional/[0.04]">
                  <input
                    type="file"
                    accept="application/pdf"
                    className="sr-only"
                    onChange={(evento) =>
                      void comprobarArchivo(evento.target.files?.[0])
                    }
                  />
                  Seleccionar el PDF del informe
                </label>

                {errorArchivo ? (
                  <p role="alert" className="mt-3 text-menudo text-sello">
                    {errorArchivo}
                  </p>
                ) : null}

                {coincide !== null ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: duracion.base }}
                    className={`mt-4 rounded border p-4 ${
                      coincide
                        ? 'border-menta/30 bg-menta/[0.06]'
                        : 'border-sello/30 bg-sello/[0.05]'
                    }`}
                  >
                    <p
                      className={`text-menudo font-semibold ${
                        coincide ? 'text-menta' : 'text-sello'
                      }`}
                    >
                      {coincide
                        ? 'El archivo coincide con el registro.'
                        : 'El archivo NO coincide con el registro.'}
                    </p>
                    <p className="mt-1 max-w-[56ch] text-menudo text-tinta-suave justificado">
                      {coincide
                        ? 'Es idéntico al documento que emitió el profesional. No ha sido modificado desde entonces.'
                        : 'El documento fue modificado después de emitirse, o corresponde a otro folio. Solicita al profesional el archivo original.'}
                    </p>
                  </motion.div>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Resultado({ registro }: { registro: RegistroFolio }) {
  const estilos = {
    vigente: {
      borde: 'border-menta/30',
      fondo: 'bg-menta/[0.06]',
      texto: 'text-menta',
      icono: '✓',
      titulo: 'Documento verificado',
    },
    revocado: {
      borde: 'border-sello-claro/40',
      fondo: 'bg-sello-claro/[0.08]',
      texto: 'text-sello',
      icono: '!',
      titulo: 'Documento revocado',
    },
    inexistente: {
      borde: 'border-sello/30',
      fondo: 'bg-sello/[0.05]',
      texto: 'text-sello',
      icono: '×',
      titulo: 'Folio no encontrado',
    },
  }[registro.estado];

  return (
    <div
      role="status"
      className={`rounded-lg border p-6 sm:p-8 ${estilos.borde} ${estilos.fondo}`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-papel-puro text-lg font-bold ${estilos.texto}`}
        >
          {estilos.icono}
        </span>
        <h2 className={`text-t3 ${estilos.texto}`}>{estilos.titulo}</h2>
      </div>

      {registro.estado === 'inexistente' ? (
        <p className="mt-4 max-w-[58ch] text-cuerpo text-tinta-suave justificado">
          No existe ningún documento con este folio. Revisa que lo hayas escrito
          completo y sin errores. Si el folio es correcto y aun así no aparece, el
          documento no fue emitido a través de nuestra plataforma y no podemos
          responder por su contenido.
        </p>
      ) : (
        <>
          <dl className="mt-6 border-t border-linea/60">
            <Fila etiqueta="Folio" valor={registro.folio} mono />
            <Fila etiqueta="Tipo de documento" valor={registro.tipoDocumento} />
            <Fila etiqueta="Emitido por" valor={registro.profesional} />
            <Fila etiqueta="Cédula profesional" valor={registro.cedula} mono />
            <Fila etiqueta="Fecha de emisión" valor={registro.emitido} />
          </dl>

          {registro.motivoRevocacion ? (
            <p className="mt-5 max-w-[58ch] text-menudo text-tinta-suave justificado">
              <span className="font-semibold text-tinta">Motivo: </span>
              {registro.motivoRevocacion} Este documento ya no debe usarse para tomar
              decisiones.
            </p>
          ) : (
            <p className="mt-5 max-w-[58ch] text-menudo text-gris justificado">
              La verificación confirma quién emitió el documento y cuándo. El contenido
              clínico no se muestra aquí ni es accesible desde esta página. La
              interpretación y las conclusiones son responsabilidad del profesional que
              firma.
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Fila({
  etiqueta,
  valor,
  mono = false,
}: {
  etiqueta: string;
  valor: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-linea/60 py-3">
      <dt className="text-menudo text-gris">{etiqueta}</dt>
      <dd
        className={`text-menudo font-medium text-tinta ${mono ? 'font-mono tracking-[0.04em]' : ''}`}
      >
        {valor}
      </dd>
    </div>
  );
}
