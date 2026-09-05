'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { registrarLead } from '@/lib/leads';
import { validarCampo } from '@/lib/validacion';
import { curva, duracion, muelle } from '@/lib/motion';

/**
 * REGISTRO A LA RED DE ESPECIALISTAS
 * ----------------------------------
 * Capta profesionales para las derivaciones. Es el activo que sostiene todo
 * lo demás: sin red no hay a quién canalizar los casos del tamizaje.
 *
 * Sobre los dos campos de identidad, que son cosas distintas y conviene no
 * confundir:
 *  · «Rama de estudio» es la formación profesional y determina el alcance:
 *    quién puede evaluar y quién detecta y deriva.
 *  · «Género» es un dato de la persona y no condiciona nada. Se pregunta
 *    de forma abierta y con opción de no responder, porque pedirlo como
 *    binario obligatorio excluye sin ninguna razón operativa.
 */

const ramas = [
  { valor: 'psicologia', titulo: 'Psicología' },
  { valor: 'psicopedagogia', titulo: 'Psicopedagogía' },
  { valor: 'docencia', titulo: 'Docencia y pedagogía' },
] as const;

const generos = [
  'Mujer',
  'Hombre',
  'No binaria o no binario',
  'Prefiero no especificar',
];

export function RegistroRed() {
  const ruta = usePathname();
  const idBase = useId();
  const reducido = useReducedMotion();

  const [rama, setRama] = useState<(typeof ramas)[number]['valor'] | null>(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [genero, setGenero] = useState('');
  const [errores, setErrores] = useState<Record<string, string | undefined>>({});
  const [estado, setEstado] = useState<'reposo' | 'enviando' | 'enviado'>('reposo');

  const esProfesional = rama === 'psicologia' || rama === 'psicopedagogia';

  const enviar = async () => {
    const encontrados: Record<string, string | undefined> = {
      nombre: validarCampo('nombre', nombre, 'familia'),
      correo: validarCampo('correo', correo, 'familia'),
      telefono: validarCampo('telefono', telefono, 'familia'),
      rama: rama ? undefined : 'Elige tu rama de estudio.',
      cedula: esProfesional && !cedula.trim() ? 'Escribe tu cédula profesional.' : undefined,
    };

    setErrores(encontrados);
    if (Object.values(encontrados).some(Boolean)) return;

    setEstado('enviando');

    await registrarLead({
      nombre,
      correo,
      telefono,
      producto: 'Registro a la red de especialistas',
      perfil: rama ?? 'sin especificar',
      extra: { cedula, genero },
      origen: ruta,
    });

    setEstado('enviado');
  };

  if (estado === 'enviado') {
    return (
      <div
        role="status"
        className="rounded-lg border border-menta/30 bg-papel-puro p-8 text-center shadow-elevada"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-menta/10 text-lg text-menta">
          ✓
        </span>
        <h3 className="mt-5 text-t3">Registro recibido.</h3>
        <p className="justificado-limpio mx-auto mt-4 max-w-[38rem] text-cuerpo text-tinta-suave">
          Verificamos tus datos y te escribimos por WhatsApp con los siguientes pasos.
          Si eres psicólogo o psicopedagogo, comprobamos la cédula antes de activar
          tu acceso a la plataforma.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        void enviar();
      }}
      className="rounded-lg border border-institucional bg-papel-puro p-6 shadow-elevada sm:p-8"
    >
      <fieldset>
        <legend className="block w-full text-center text-cuerpo font-semibold text-tinta">
          ¿Cuál es tu rama de estudio?
        </legend>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {ramas.map((opcion) => {
            const activa = rama === opcion.valor;

            return (
              <button
                key={opcion.valor}
                type="button"
                role="radio"
                aria-checked={activa}
                onClick={() => {
                  setRama(opcion.valor);
                  setErrores((previo) => ({ ...previo, rama: undefined }));
                }}
                className={`relative min-h-[52px] rounded border px-4 text-center text-menudo font-semibold transition-colors duration-200 ${
                  activa
                    ? 'border-institucional text-institucional'
                    : 'border-linea text-tinta hover:border-institucional/40'
                }`}
              >
                {activa ? (
                  <motion.span
                    layoutId={`${idBase}-rama`}
                    className="absolute inset-0 rounded bg-institucional/[0.07]"
                    transition={reducido ? { duration: 0 } : muelle.firme}
                  />
                ) : null}
                <span className="relative">{opcion.titulo}</span>
              </button>
            );
          })}
        </div>

        {errores.rama ? (
          <p className="mt-2 text-center text-menudo text-sello">{errores.rama}</p>
        ) : null}
      </fieldset>

      <AnimatePresence initial={false}>
        {rama ? (
          <motion.div
            initial={{ opacity: 0, height: reducido ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: duracion.lenta, ease: curva.salidaSuave }}
            className="overflow-hidden"
          >
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
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

              {esProfesional ? (
                <Campo
                  id={`${idBase}-cedula`}
                  etiqueta="Cédula profesional"
                  inputMode="numeric"
                  ayuda="La verificamos antes de activar tu acceso"
                  valor={cedula}
                  error={errores.cedula}
                  onChange={setCedula}
                />
              ) : null}

              <div className="sm:col-span-2">
                <label
                  htmlFor={`${idBase}-genero`}
                  className="text-menudo font-semibold text-tinta"
                >
                  Género <span className="font-normal text-gris">(opcional)</span>
                </label>
                <select
                  id={`${idBase}-genero`}
                  value={genero}
                  onChange={(evento) => setGenero(evento.target.value)}
                  className="mt-1.5 min-h-[48px] w-full rounded border border-linea bg-papel/60 px-4 text-cuerpo text-tinta transition-colors duration-150 hover:border-institucional/40 focus:bg-papel-puro"
                >
                  <option value="">Prefiero no especificar</option>
                  {generos.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="mt-6 flex min-h-[56px] w-full items-center justify-center rounded bg-institucional px-6 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo disabled:opacity-60"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Unirme a la red'}
            </button>

            <p className="mt-3 text-center text-menudo text-gris">
              Registro sin costo. Te contactamos por WhatsApp en un día hábil.
            </p>
          </motion.div>
        ) : (
          <p className="mt-5 text-center text-menudo text-gris">
            Elige una opción para continuar.
          </p>
        )}
      </AnimatePresence>
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
