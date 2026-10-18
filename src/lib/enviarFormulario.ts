/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  PUNTO ÚNICO DE CONEXIÓN CON EL BACKEND                              │
 * │                                                                      │
 * │  Hoy no hay servidor. Esta función simula el envío para que el       │
 * │  formulario tenga estados reales de carga, éxito y error.            │
 * │                                                                      │
 * │  Para conectarlo, sustituir SOLO el cuerpo de `enviarFormulario`.    │
 * │  Ningún componente conoce el transporte: no hay que tocar la UI.     │
 * │                                                                      │
 * │  Ejemplo con una Route Handler de Next.js:                           │
 * │                                                                      │
 * │    const respuesta = await fetch('/api/contacto', {                  │
 * │      method: 'POST',                                                 │
 * │      headers: { 'Content-Type': 'application/json' },                │
 * │      body: JSON.stringify(datos),                                    │
 * │    });                                                               │
 * │    if (!respuesta.ok) throw new ErrorDeEnvio(...);                   │
 * │    return { ok: true };                                              │
 * │                                                                      │
 * │  Recordar al conectar: protección anti-spam (turnstile o similar),   │
 * │  límite de peticiones por IP y registro del consentimiento.          │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type Perfil = 'familia' | 'colegio' | 'profesional';

export type DatosContacto = {
  perfil: Perfil;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  /** Solo perfil `familia`. */
  edadMenor?: string;
  gradoEscolar?: string;
  /** Motivos marcados en el checklist. Es el dato que ordena la agenda. */
  motivos?: string[];
  /** Solo perfil `colegio`. */
  institucion?: string;
  cargo?: string;
  numeroAlumnos?: string;
  numeroEspecialistas?: string;
  /** Solo perfil `profesional`. */
  cedula?: string;
  /** Origen de la solicitud, para saber desde qué página se escribió. */
  origen: string;
};

export type ResultadoEnvio = { ok: true } | { ok: false; motivo: string };

/**
 * Construye el mensaje de WhatsApp con los datos del formulario.
 *
 * Se envía por WhatsApp y no por correo porque la respuesta llega el mismo
 * día y la conversación queda abierta: una familia preocupada no espera dos
 * días a un correo. El mensaje va estructurado para que quien atienda vea
 * el caso completo sin tener que preguntar lo básico.
 */
export function resumenParaWhatsApp(datos: DatosContacto): string {
  const lineas: string[] = ['Hola. Envío una solicitud desde el sitio web.', ''];

  const perfiles: Record<Perfil, string> = {
    familia: 'Familia',
    colegio: 'Institución',
    profesional: 'Profesional',
  };

  lineas.push(`Perfil: ${perfiles[datos.perfil]}`);
  lineas.push(`Nombre: ${datos.nombre}`);
  lineas.push(`Correo: ${datos.correo}`);
  lineas.push(`Teléfono: ${datos.telefono}`);

  if (datos.perfil === 'familia') {
    if (datos.edadMenor) lineas.push(`Edad del menor: ${datos.edadMenor}`);
    if (datos.gradoEscolar) lineas.push(`Grado escolar: ${datos.gradoEscolar}`);
  }

  if (datos.perfil === 'colegio') {
    if (datos.cargo) lineas.push(`Cargo: ${datos.cargo}`);
    if (datos.institucion) lineas.push(`Institución: ${datos.institucion}`);
    if (datos.numeroAlumnos) lineas.push(`Alumnos: ${datos.numeroAlumnos}`);
    if (datos.numeroEspecialistas)
      lineas.push(`Especialistas: ${datos.numeroEspecialistas}`);
  }

  if (datos.perfil === 'profesional') {
    if (datos.cedula) lineas.push(`Cédula: ${datos.cedula}`);
    if (datos.cargo) lineas.push(`Especialidad: ${datos.cargo}`);
  }

  if (datos.motivos?.length) {
    lineas.push('', 'Motivo:');
    datos.motivos.forEach((motivo) => lineas.push(`- ${motivo}`));
  }

  if (datos.mensaje.trim()) lineas.push('', `Mensaje: ${datos.mensaje.trim()}`);

  lineas.push('', `Origen: ${datos.origen}`);

  return lineas.join('\n');
}

const RETRASO_SIMULADO = 900;

/**
 * Registra el prospecto en el automatizador y abre WhatsApp.
 *
 * El orden importa y no es intercambiable. Primero se registra, después se
 * abre la conversación: quien llena el formulario y no llega a mandar el
 * mensaje de WhatsApp —porque se arrepiente, porque el navegador bloquea la
 * ventana, porque se le va el dato— ya quedó capturado y se le puede
 * llamar. Al revés, ese prospecto se pierde entero.
 *
 * El registro nunca interrumpe el flujo: `registrarLead` no lanza
 * excepción, así que un fallo del automatizador no impide la conversación.
 * Perder el dato es malo; perder el contacto es peor.
 */
export async function enviarFormulario(datos: DatosContacto): Promise<ResultadoEnvio> {
  const { enlaceWhatsApp } = await import('@/content/sitio');
  const { registrarLead } = await import('@/lib/leads');

  await registrarLead({
    nombre: datos.nombre,
    correo: datos.correo,
    telefono: datos.telefono,
    producto: datos.motivos?.join(' · ') || 'Solicitud desde el sitio',
    perfil: datos.perfil,
    origen: datos.origen,
    extra: limpiar({
      institucion: datos.institucion,
      cargo: datos.cargo,
      numeroAlumnos: datos.numeroAlumnos,
      numeroEspecialistas: datos.numeroEspecialistas,
      edadMenor: datos.edadMenor,
      gradoEscolar: datos.gradoEscolar,
      mensaje: datos.mensaje.trim(),
    }),
  });

  try {
    window.open(enlaceWhatsApp(resumenParaWhatsApp(datos)), '_blank', 'noopener');

    return { ok: true };
  } catch {
    return { ok: false, motivo: 'no_se_pudo_abrir_whatsapp' };
  }
}

/** Quita los campos vacíos: una hoja llena de celdas en blanco no se lee. */
function limpiar(campos: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(campos).filter(([, valor]) => Boolean(valor)),
  ) as Record<string, string>;
}

/**
 * Suscripción a materiales descargables. Mismo criterio: un solo punto.
 */
export async function suscribirCorreo(
  correo: string,
  material: string,
): Promise<ResultadoEnvio> {
  // ── SUSTITUIR DESDE AQUÍ ────────────────────────────────────────────
  await new Promise((resolver) => setTimeout(resolver, RETRASO_SIMULADO));

  if (process.env.NODE_ENV === 'development') {
    console.info('[recursos] Suscripción simulada.', { correo, material });
  }

  return { ok: true };
  // ── HASTA AQUÍ ──────────────────────────────────────────────────────
}
