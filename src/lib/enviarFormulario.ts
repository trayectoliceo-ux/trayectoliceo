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
 * Abre WhatsApp con la solicitud ya redactada.
 *
 * No hay servidor de por medio: el mensaje viaja por WhatsApp, que es donde
 * se atiende. Si más adelante quieres guardar además una copia en base de
 * datos o en un CRM, se añade aquí una llamada a `/api/contacto` antes de
 * abrir el enlace, sin tocar ningún componente.
 */
export async function enviarFormulario(datos: DatosContacto): Promise<ResultadoEnvio> {
  const { enlaceWhatsApp } = await import('@/content/sitio');

  try {
    window.open(enlaceWhatsApp(resumenParaWhatsApp(datos)), '_blank', 'noopener');

    return { ok: true };
  } catch {
    return { ok: false, motivo: 'no_se_pudo_abrir_whatsapp' };
  }
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
