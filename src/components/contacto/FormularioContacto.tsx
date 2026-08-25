'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import {
  enviarFormulario,
  type DatosContacto,
  type Perfil,
} from '@/lib/enviarFormulario';
import { validarCampo, validarFormulario, type ErroresContacto } from '@/lib/validacion';
import { curva, duracion, muelle, salida } from '@/lib/motion';

type Estado = 'reposo' | 'enviando' | 'enviado' | 'error';

const perfiles: { valor: Perfil; titulo: string; pie: string }[] = [
  { valor: 'familia', titulo: 'Soy familia', pie: 'Busco orientación para mi hijo o hija' },
  { valor: 'colegio', titulo: 'Represento un colegio', pie: 'Dirección, orientación o coordinación' },
  { valor: 'profesional', titulo: 'Soy profesional', pie: 'Psicología, psicopedagogía o docencia' },
];

const datosIniciales: DatosContacto = {
  perfil: 'familia',
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: '',
  edadMenor: '',
  institucion: '',
  numeroAlumnos: '',
  cedula: '',
  origen: '/',
};

export function FormularioContacto() {
  const ruta = usePathname();
  const reducido = useReducedMotion();
  const idBase = useId();

  const [datos, setDatos] = useState<DatosContacto>(datosIniciales);
  const [consentimiento, setConsentimiento] = useState(false);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [estado, setEstado] = useState<Estado>('reposo');
  const refResumen = useRef<HTMLDivElement>(null);

  const actualizar = (campo: keyof DatosContacto, valor: string) => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    // El error desaparece en cuanto el usuario corrige, no al reenviar.
    if (errores[campo]) setErrores((previo) => ({ ...previo, [campo]: undefined }));
  };

  /** La validación ocurre al salir del campo, nunca en cada pulsación. */
  const alSalir = (campo: keyof DatosContacto) => {
    const mensaje = validarCampo(campo, datos[campo] ?? '', datos.perfil);
    setErrores((previo) => ({ ...previo, [campo]: mensaje }));
  };

  const cambiarPerfil = (perfil: Perfil) => {
    setDatos((previo) => ({ ...previo, perfil }));
    setErrores({});
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
        initial={{ opacity: 0, y: reducido ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duracion.base, ease: curva.salidaSuave }}
        className="rounded border border-institucional/30 bg-institucional/[0.04] p-8 sm:p-10"
      >
        <p className="etiqueta text-institucional">Solicitud recibida</p>
        <h3 className="mt-4 text-t3">Gracias. Tenemos tus datos.</h3>
        <p className="mt-4 max-w-lectura text-cuerpo text-tinta-suave">
          Respondemos en un plazo de dos días hábiles al correo que indicaste. Si necesitas
          hablar antes, escríbenos por WhatsApp con el botón de la esquina.
        </p>
        <button
          type="button"
          onClick={() => {
            setDatos(datosIniciales);
            setConsentimiento(false);
            setEstado('reposo');
          }}
          className="mt-7 inline-flex min-h-[44px] items-center text-menudo font-medium text-institucional underline underline-offset-4"
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
      className="space-y-10"
    >
      {/* Selector de perfil. Cambia los campos siguientes. */}
      <fieldset>
        <legend className="etiqueta">Quién escribe</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {perfiles.map((opcion) => {
            const activo = datos.perfil === opcion.valor;
            return (
              <button
                key={opcion.valor}
                type="button"
                role="radio"
                aria-checked={activo}
                onClick={() => cambiarPerfil(opcion.valor)}
                className={`relative min-h-[44px] rounded border p-4 text-left transition-colors duration-150 ${
                  activo
                    ? 'border-institucional'
                    : 'border-linea hover:border-institucional/40'
                }`}
              >
                {activo ? (
                  <motion.span
                    // El fondo del perfil activo se desplaza entre opciones
                    // en lugar de desaparecer y reaparecer.
                    layoutId={`${idBase}-perfil-activo`}
                    className="absolute inset-0 rounded bg-institucional/[0.06]"
                    transition={reducido ? { duration: 0 } : muelle.firme}
                  />
                ) : null}
                <span className="relative block text-menudo font-medium text-tinta">
                  {opcion.titulo}
                </span>
                <span className="relative mt-1 block text-[0.75rem] leading-[1.35] text-gris">
                  {opcion.pie}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Campo
          id={`${idBase}-nombre`}
          etiqueta="Nombre completo"
          valor={datos.nombre}
          error={errores.nombre}
          autoComplete="name"
          onChange={(valor) => actualizar('nombre', valor)}
          onBlur={() => alSalir('nombre')}
        />
        <Campo
          id={`${idBase}-correo`}
          etiqueta="Correo electrónico"
          tipo="email"
          inputMode="email"
          autoComplete="email"
          valor={datos.correo}
          error={errores.correo}
          onChange={(valor) => actualizar('correo', valor)}
          onBlur={() => alSalir('correo')}
        />
        <Campo
          id={`${idBase}-telefono`}
          etiqueta="Teléfono"
          tipo="tel"
          inputMode="tel"
          autoComplete="tel"
          valor={datos.telefono}
          error={errores.telefono}
          onChange={(valor) => actualizar('telefono', valor)}
          onBlur={() => alSalir('telefono')}
        />

        {/* Campos condicionados al perfil. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={datos.perfil}
            initial={{ opacity: 0, y: reducido ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reducido ? 0 : -6,
              transition: { duration: salida(duracion.base), ease: curva.entradaSeca },
            }}
            transition={{ duration: duracion.base, ease: curva.salidaSuave }}
            className="grid gap-x-6 gap-y-7 sm:col-span-2 sm:grid-cols-2"
          >
            {datos.perfil === 'familia' ? (
              <Campo
                id={`${idBase}-edad`}
                etiqueta="Edad del menor"
                tipo="number"
                inputMode="numeric"
                ayuda="Años cumplidos"
                valor={datos.edadMenor ?? ''}
                error={errores.edadMenor}
                onChange={(valor) => actualizar('edadMenor', valor)}
                onBlur={() => alSalir('edadMenor')}
              />
            ) : null}

            {datos.perfil === 'colegio' ? (
              <>
                <Campo
                  id={`${idBase}-institucion`}
                  etiqueta="Nombre del centro"
                  autoComplete="organization"
                  valor={datos.institucion ?? ''}
                  error={errores.institucion}
                  onChange={(valor) => actualizar('institucion', valor)}
                  onBlur={() => alSalir('institucion')}
                />
                <Campo
                  id={`${idBase}-alumnos`}
                  etiqueta="Número de alumnos"
                  tipo="number"
                  inputMode="numeric"
                  ayuda="Aproximado, del centro completo"
                  valor={datos.numeroAlumnos ?? ''}
                  error={errores.numeroAlumnos}
                  onChange={(valor) => actualizar('numeroAlumnos', valor)}
                  onBlur={() => alSalir('numeroAlumnos')}
                />
              </>
            ) : null}

            {datos.perfil === 'profesional' ? (
              <Campo
                id={`${idBase}-cedula`}
                etiqueta="Cédula profesional"
                inputMode="numeric"
                ayuda="Se verifica antes de confirmar inscripción"
                valor={datos.cedula ?? ''}
                error={errores.cedula}
                onChange={(valor) => actualizar('cedula', valor)}
                onBlur={() => alSalir('cedula')}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        <Campo
          id={`${idBase}-mensaje`}
          etiqueta="Qué necesitas"
          multilinea
          className="sm:col-span-2"
          ayuda="Dos o tres líneas bastan para orientarte bien"
          valor={datos.mensaje}
          error={errores.mensaje}
          onChange={(valor) => actualizar('mensaje', valor)}
          onBlur={() => alSalir('mensaje')}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 py-2">
          <input
            type="checkbox"
            checked={consentimiento}
            onChange={(evento) => {
              setConsentimiento(evento.target.checked);
              if (errores.consentimiento)
                setErrores((previo) => ({ ...previo, consentimiento: undefined }));
            }}
            aria-invalid={Boolean(errores.consentimiento)}
            className="mt-1 h-[18px] w-[18px] shrink-0 rounded-none border border-linea accent-institucional"
          />
          <span className="text-[0.8125rem] leading-[1.5] text-tinta-suave">
            Autorizo el tratamiento de mis datos para recibir respuesta a esta solicitud.
            No los compartimos con terceros.
          </span>
        </label>
        {errores.consentimiento ? (
          <MensajeError>{errores.consentimiento}</MensajeError>
        ) : null}
      </div>

      {/* Resumen de errores: recibe el foco al intentar enviar con fallos. */}
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Boton type="submit" disabled={enviando} className="w-full sm:w-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={estado}
              initial={{ opacity: 0, y: reducido ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducido ? 0 : -6 }}
              transition={{ duration: duracion.instante }}
              className="block"
            >
              {enviando ? 'Enviando…' : 'Enviar solicitud'}
            </motion.span>
          </AnimatePresence>
        </Boton>

        {estado === 'error' ? (
          <p role="alert" className="text-menudo text-sello">
            No se pudo enviar. Revisa tu conexión y vuelve a intentarlo, o escríbenos por
            WhatsApp.
          </p>
        ) : (
          <p className="text-[0.8125rem] text-gris">Respondemos en dos días hábiles.</p>
        )}
      </div>
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

  const clases = `mt-2 w-full min-h-[44px] rounded border bg-transparent px-3.5 py-3 text-cuerpo text-tinta transition-colors duration-150 placeholder:text-gris ${
    error ? 'border-sello' : 'border-linea hover:border-institucional/40'
  }`;

  return (
    <div className={className}>
      <label htmlFor={id} className="etiqueta text-tinta-suave">
        {etiqueta}
      </label>

      {multilinea ? (
        <textarea
          id={id}
          rows={4}
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
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
          onChange={(evento) => onChange(evento.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? idError : ayuda ? idAyuda : undefined}
          className={clases}
        />
      )}

      {error ? (
        <MensajeError id={idError}>{error}</MensajeError>
      ) : ayuda ? (
        <p id={idAyuda} className="mt-2 text-[0.75rem] text-gris">
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
      className="mt-2 flex items-start gap-1.5 text-[0.75rem] leading-[1.4] text-sello"
    >
      <span aria-hidden>—</span>
      <span>{children}</span>
    </motion.p>
  );
}
