'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import { enviarFormulario, type DatosContacto, type Perfil } from '@/lib/enviarFormulario';
import { validarCampo, validarFormulario, type ErroresContacto } from '@/lib/validacion';
import { curva, duracion, muelle, salida } from '@/lib/motion';

/**
 * FORMULARIO INTELIGENTE DE CAPTACIÓN
 * -----------------------------------
 * Dos rutas de negocio que no comparten casi nada: una familia que busca
 * diagnóstico y una institución que evalúa la plataforma. Pedir los mismos
 * datos a ambas sería pedir de más a las dos.
 *
 * El perfil se elige primero y determina los campos siguientes. La
 * información que recoge cada ruta es exactamente la que el equipo comercial
 * necesita para priorizar: en B2C, edad y motivo; en B2B, cargo y volumen.
 *
 * El envío pasa por `src/lib/enviarFormulario.ts`, punto único de conexión
 * con el backend. Este componente no sabe cómo viajan los datos.
 */

type Estado = 'reposo' | 'enviando' | 'enviado' | 'error';

const perfiles: {
  valor: Perfil;
  titulo: string;
  pie: string;
  icono: string;
  accion: string;
}[] = [
  {
    valor: 'familia',
    titulo: 'Soy padre o madre',
    pie: 'Busco orientación para mi hijo o hija',
    icono: '⌂',
    accion: 'Solicitar diagnóstico familiar',
  },
  {
    valor: 'profesional',
    titulo: 'Soy profesional',
    pie: 'Psicología, psicopedagogía u orientación',
    icono: '◈',
    accion: 'Solicitar acceso profesional',
  },
  {
    valor: 'colegio',
    titulo: 'Soy una institución',
    pie: 'Colegio, clínica o gabinete',
    icono: '▤',
    accion: 'Solicitar demostración',
  },
];

/** Intereses del profesional independiente. Define a qué área se deriva. */
const interesesProfesionales = [
  'Usar PsicoMetrics en mi consulta',
  'Formación en detección y evaluación de altas capacidades',
  'Recibir derivaciones de casos',
  'Convenio de colaboración',
];

/** Motivos de consulta. Es el dato que más ordena la agenda del equipo. */
const motivos = [
  'Mi hijo se aburre en clase o sospecho altas capacidades',
  'Dificultades de aprendizaje',
  'Nos lo sugirió el colegio',
  'Orientación para decidir el siguiente curso',
];

const datosIniciales: DatosContacto = {
  perfil: 'familia',
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: '',
  edadMenor: '',
  gradoEscolar: '',
  motivos: [],
  institucion: '',
  cargo: '',
  numeroAlumnos: '',
  numeroEspecialistas: '',
  cedula: '',
  origen: '/',
};

export function FormularioInteligente({
  /**
   * En una página dirigida a un solo público, el selector sobra: ya sabemos
   * quién escribe. Fijar el perfil ahorra un clic y una decisión.
   */
  perfilFijo,
}: {
  perfilFijo?: Perfil;
} = {}) {
  const ruta = usePathname();
  const reducido = useReducedMotion();
  const idBase = useId();

  /**
   * Sin perfil elegido no se muestra ningún campo. Un formulario con
   * quince casillas a la vista intimida y buena parte de ellas no aplica;
   * pedir primero «quién eres» reduce lo visible a lo que sí corresponde.
   */
  const [elegido, setElegido] = useState(Boolean(perfilFijo));
  const [datos, setDatos] = useState<DatosContacto>(
    perfilFijo ? { ...datosIniciales, perfil: perfilFijo } : datosIniciales,
  );
  const [consentimiento, setConsentimiento] = useState(false);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [estado, setEstado] = useState<Estado>('reposo');
  const refResumen = useRef<HTMLDivElement>(null);

  const perfilActivo = perfiles.find((p) => p.valor === datos.perfil) ?? perfiles[0];

  const actualizar = (campo: keyof DatosContacto, valor: string | string[]) => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    if (errores[campo]) setErrores((previo) => ({ ...previo, [campo]: undefined }));
  };

  const alSalir = (campo: keyof DatosContacto) => {
    const valor = datos[campo];
    setErrores((previo) => ({
      ...previo,
      [campo]: validarCampo(campo, typeof valor === 'string' ? valor : '', datos.perfil),
    }));
  };

  const alternarMotivo = (motivo: string) => {
    const actuales = datos.motivos ?? [];
    actualizar(
      'motivos',
      actuales.includes(motivo)
        ? actuales.filter((m) => m !== motivo)
        : [...actuales, motivo],
    );
  };

  const enviar = async () => {
    const encontrados = validarFormulario({ ...datos, origen: ruta }, consentimiento);
    setErrores(encontrados);

    if (Object.keys(encontrados).length > 0) {
      refResumen.current?.focus();
      return;
    }

    setEstado('enviando');
    const resultado = await enviarFormulario({ ...datos, origen: ruta });
    setEstado(resultado.ok ? 'enviado' : 'error');
  };

  if (estado === 'enviado') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: reducido ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
        className="rounded-lg border border-menta/25 bg-papel-puro p-8 shadow-tarjeta sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-menta/10 text-menta">
          ✓
        </span>
        <h3 className="mt-6 text-t3">Solicitud lista.</h3>
        <p className="mt-4 max-w-lectura text-cuerpo text-tinta-suave justificado justificado">
          Se abrió WhatsApp con tu solicitud ya redactada. Envíala y te
          respondemos el mismo día hábil. Si no se abrió, escríbenos con el botón
          verde de la esquina.
        </p>
        <button
          type="button"
          onClick={() => {
            setDatos(datosIniciales);
            setConsentimiento(false);
            setEstado('reposo');
          }}
          className="mt-7 inline-flex min-h-[44px] items-center text-menudo font-semibold text-institucional underline underline-offset-4"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    );
  }

  const enviando = estado === 'enviando';

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        void enviar();
      }}
      className="rounded-lg border border-linea bg-papel-puro p-6 shadow-tarjeta sm:p-8 lg:p-10"
    >
      {/* Selector de perfil: decide todo lo que viene después. */}
      <fieldset className={perfilFijo ? 'hidden' : undefined}>
        <legend className="mb-5 block w-full text-center text-cuerpo font-semibold text-tinta">
          ¿Quién escribe?
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {perfiles.map((opcion) => {
            const activo = datos.perfil === opcion.valor;
            return (
              <button
                key={opcion.valor}
                type="button"
                role="radio"
                aria-checked={activo && elegido}
                onClick={() => {
                  setDatos((previo) => ({ ...previo, perfil: opcion.valor }));
                  setErrores({});
                  setElegido(true);
                }}
                className={`relative min-h-[44px] rounded-md border p-5 text-center transition-colors duration-200 ${
                  activo && elegido
                    ? 'border-institucional'
                    : 'border-linea hover:border-institucional/40'
                }`}
              >
                {activo && elegido ? (
                  <motion.span
                    // El fondo se desplaza entre pestañas: indica que una
                    // sustituye a la otra, no que aparece de la nada.
                    layoutId={`${idBase}-perfil`}
                    className="absolute inset-0 rounded-md bg-institucional/[0.06]"
                    transition={reducido ? { duration: 0 } : muelle.firme}
                  />
                ) : null}
                <span
                  aria-hidden
                  className={`relative block text-xl ${
                    activo && elegido ? 'text-institucional' : 'text-gris'
                  }`}
                >
                  {opcion.icono}
                </span>
                <span className="relative mt-2 block text-balance text-menudo font-semibold text-tinta">
                  {opcion.titulo}
                </span>

              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Todo lo demás aparece cuando hay perfil elegido. */}
      <AnimatePresence initial={false}>
        {elegido ? (
          <motion.div
            initial={{ opacity: 0, height: reducido ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: duracion.lenta, ease: curva.salidaSuave }}
            className="overflow-hidden"
          >
      <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Campo
          id={`${idBase}-nombre`}
          etiqueta={
            datos.perfil === 'familia' ? 'Nombre del tutor' : 'Nombre del contacto'
          }
          autoComplete="name"
          valor={datos.nombre}
          error={errores.nombre}
          onChange={(v) => actualizar('nombre', v)}
          onBlur={() => alSalir('nombre')}
        />
        <Campo
          id={`${idBase}-correo`}
          etiqueta={
            datos.perfil === 'familia' ? 'Correo electrónico' : 'Correo institucional'
          }
          tipo="email"
          inputMode="email"
          autoComplete="email"
          valor={datos.correo}
          error={errores.correo}
          onChange={(v) => actualizar('correo', v)}
          onBlur={() => alSalir('correo')}
        />
        <Campo
          id={`${idBase}-telefono`}
          etiqueta={datos.perfil === 'familia' ? 'WhatsApp' : 'Teléfono'}
          tipo="tel"
          inputMode="tel"
          autoComplete="tel"
          ayuda="10 dígitos"
          valor={datos.telefono}
          error={errores.telefono}
          onChange={(v) => actualizar('telefono', v)}
          onBlur={() => alSalir('telefono')}
          className={datos.perfil === 'familia' ? '' : 'sm:col-span-1'}
        />

        {/* Campos que dependen del perfil */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={datos.perfil}
            initial={{ opacity: 0, y: reducido ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reducido ? 0 : -8,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="grid gap-x-5 gap-y-6 sm:col-span-2 sm:grid-cols-2"
          >
            {datos.perfil === 'profesional' ? (
              <>
                <Campo
                  id={`${idBase}-cedula`}
                  etiqueta="Cédula profesional"
                  inputMode="numeric"
                  ayuda="Se verifica antes de dar acceso a expedientes"
                  valor={datos.cedula ?? ''}
                  error={errores.cedula}
                  onChange={(v) => actualizar('cedula', v)}
                  onBlur={() => alSalir('cedula')}
                />
                <Campo
                  id={`${idBase}-especialidad`}
                  etiqueta="Especialidad"
                  ayuda="Por ejemplo: psicología educativa"
                  valor={datos.cargo ?? ''}
                  error={errores.cargo}
                  onChange={(v) => actualizar('cargo', v)}
                  onBlur={() => alSalir('cargo')}
                />

                <fieldset className="sm:col-span-2">
                  <legend className="text-menudo font-semibold text-tinta">
                    ¿Qué te interesa?
                  </legend>
                  <p className="mt-1 text-menudo text-gris">
                    Puedes marcar más de una opción.
                  </p>
                  <div className="mt-3 grid gap-2">
                    {interesesProfesionales.map((interes) => {
                      const marcado = (datos.motivos ?? []).includes(interes);
                      return (
                        <label
                          key={interes}
                          className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded border px-4 py-3 text-menudo transition-colors duration-150 ${
                            marcado
                              ? 'border-institucional bg-institucional/[0.05] text-tinta'
                              : 'border-linea text-tinta-suave hover:border-institucional/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={marcado}
                            onChange={() => alternarMotivo(interes)}
                            className="h-4 w-4 shrink-0 accent-institucional"
                          />
                          <span>{interes}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            ) : datos.perfil === 'familia' ? (
              <>
                <Campo
                  id={`${idBase}-edad`}
                  etiqueta="Edad del menor"
                  inputMode="numeric"
                  ayuda="Años cumplidos"
                  valor={datos.edadMenor ?? ''}
                  error={errores.edadMenor}
                  onChange={(v) => actualizar('edadMenor', v)}
                  onBlur={() => alSalir('edadMenor')}
                />
                <Campo
                  id={`${idBase}-grado`}
                  etiqueta="Grado escolar actual"
                  ayuda="Por ejemplo: 4.º de primaria"
                  valor={datos.gradoEscolar ?? ''}
                  error={errores.gradoEscolar}
                  onChange={(v) => actualizar('gradoEscolar', v)}
                  onBlur={() => alSalir('gradoEscolar')}
                />

                <fieldset className="sm:col-span-2">
                  <legend className="text-menudo font-semibold text-tinta">
                    ¿Qué te trae aquí?
                  </legend>
                  <p className="mt-1 text-menudo text-gris">
                    Puedes marcar más de una opción.
                  </p>
                  <div className="mt-3 grid gap-2">
                    {motivos.map((motivo) => {
                      const marcado = (datos.motivos ?? []).includes(motivo);
                      return (
                        <label
                          key={motivo}
                          className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded border px-4 py-3 text-menudo transition-colors duration-150 ${
                            marcado
                              ? 'border-institucional bg-institucional/[0.05] text-tinta'
                              : 'border-linea text-tinta-suave hover:border-institucional/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={marcado}
                            onChange={() => alternarMotivo(motivo)}
                            className="h-4 w-4 shrink-0 accent-institucional"
                          />
                          <span>{motivo}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            ) : (
              <>
                <Campo
                  id={`${idBase}-cargo`}
                  etiqueta="Cargo"
                  ayuda="Dirección, coordinación, orientación"
                  autoComplete="organization-title"
                  valor={datos.cargo ?? ''}
                  error={errores.cargo}
                  onChange={(v) => actualizar('cargo', v)}
                  onBlur={() => alSalir('cargo')}
                />
                <Campo
                  id={`${idBase}-institucion`}
                  etiqueta="Institución o clínica"
                  autoComplete="organization"
                  valor={datos.institucion ?? ''}
                  error={errores.institucion}
                  onChange={(v) => actualizar('institucion', v)}
                  onBlur={() => alSalir('institucion')}
                />
                <Campo
                  id={`${idBase}-alumnos`}
                  etiqueta="Población estudiantil"
                  inputMode="numeric"
                  ayuda="Aproximada, del centro completo"
                  valor={datos.numeroAlumnos ?? ''}
                  error={errores.numeroAlumnos}
                  onChange={(v) => actualizar('numeroAlumnos', v)}
                  onBlur={() => alSalir('numeroAlumnos')}
                />
                <Campo
                  id={`${idBase}-especialistas`}
                  etiqueta="Especialistas que usarían la plataforma"
                  inputMode="numeric"
                  valor={datos.numeroEspecialistas ?? ''}
                  error={errores.numeroEspecialistas}
                  onChange={(v) => actualizar('numeroEspecialistas', v)}
                  onBlur={() => alSalir('numeroEspecialistas')}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <Campo
          id={`${idBase}-mensaje`}
          etiqueta="Mensaje adicional"
          multilinea
          className="sm:col-span-2"
          ayuda="Opcional. Cuéntanos lo que creas relevante."
          valor={datos.mensaje}
          error={errores.mensaje}
          onChange={(v) => actualizar('mensaje', v)}
          onBlur={() => alSalir('mensaje')}
        />
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 py-2">
        <input
          type="checkbox"
          checked={consentimiento}
          onChange={(evento) => {
            setConsentimiento(evento.target.checked);
            if (errores.consentimiento)
              setErrores((previo) => ({ ...previo, consentimiento: undefined }));
          }}
          aria-invalid={Boolean(errores.consentimiento)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-institucional"
        />
        <span className="text-menudo leading-[1.5] text-tinta-suave">
          Autorizo el tratamiento de mis datos para recibir respuesta a esta solicitud.
          No los compartimos con terceros.
        </span>
      </label>
      {errores.consentimiento ? (
        <MensajeError>{errores.consentimiento}</MensajeError>
      ) : null}

      <div
        ref={refResumen}
        tabIndex={-1}
        role={Object.keys(errores).length ? 'alert' : undefined}
        className="sr-only"
      >
        {Object.keys(errores).length
          ? 'El formulario tiene campos por corregir. Revisa los mensajes junto a cada campo.'
          : ''}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-7 flex min-h-[52px] w-full items-center justify-center rounded-md bg-institucional px-6 text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo disabled:opacity-60"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${estado}-${datos.perfil}`}
            initial={{ opacity: 0, y: reducido ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducido ? 0 : -6 }}
            transition={{ duration: duracion.instante }}
            className="block"
          >
            {enviando ? 'Enviando…' : perfilActivo.accion}
          </motion.span>
        </AnimatePresence>
      </button>

      {estado === 'error' ? (
        <p role="alert" className="mt-3 text-center text-menudo text-sello">
          No se pudo enviar. Revisa tu conexión o escríbenos por WhatsApp.
        </p>
      ) : (
        <p className="mt-3 text-center text-menudo text-gris">
          Al enviar se abre WhatsApp con tus datos ya escritos. La primera
          conversación es sin costo.
        </p>
      )}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-menudo text-gris"
          >
            Elige una opción para continuar. Solo te pediremos los datos que
            correspondan a tu caso.
          </motion.p>
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
  onBlur,
  error,
  ayuda,
  tipo = 'text',
  inputMode,
  autoComplete,
  multilinea = false,
  className = '',
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  onBlur: () => void;
  error?: string;
  ayuda?: string;
  tipo?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  autoComplete?: string;
  multilinea?: boolean;
  className?: string;
}) {
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;

  const clases = `mt-2 min-h-[48px] w-full rounded border bg-papel/60 px-4 py-3 text-cuerpo text-tinta transition-colors duration-150 placeholder:text-gris focus:bg-papel-puro ${
    error ? 'border-sello' : 'border-linea hover:border-institucional/40'
  }`;

  return (
    <div className={className}>
      <label htmlFor={id} className="text-menudo font-semibold text-tinta">
        {etiqueta}
      </label>

      {multilinea ? (
        <textarea
          id={id}
          rows={3}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? idError : ayuda ? idAyuda : undefined}
          className={`${clases} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={tipo}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? idError : ayuda ? idAyuda : undefined}
          className={clases}
        />
      )}

      {error ? (
        <MensajeError id={idError}>{error}</MensajeError>
      ) : ayuda ? (
        <p id={idAyuda} className="mt-1.5 text-menudo text-gris">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

function MensajeError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.p
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duracion.instante }}
      className="mt-1.5 text-menudo text-sello"
    >
      {children}
    </motion.p>
  );
}
