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
  /** Solo perfil `colegio`. */
  institucion?: string;
  numeroAlumnos?: string;
  /** Solo perfil `profesional`. */
  cedula?: string;
  /** Origen de la solicitud, para saber desde qué página se escribió. */
  origen: string;
};

export type ResultadoEnvio = { ok: true } | { ok: false; motivo: string };

const RETRASO_SIMULADO = 900;

export async function enviarFormulario(datos: DatosContacto): Promise<ResultadoEnvio> {
  // ── SUSTITUIR DESDE AQUÍ ────────────────────────────────────────────
  await new Promise((resolver) => setTimeout(resolver, RETRASO_SIMULADO));

  if (process.env.NODE_ENV === 'development') {
    console.info('[contacto] Envío simulado. Sustituir enviarFormulario().', datos);
  }

  return { ok: true };
  // ── HASTA AQUÍ ──────────────────────────────────────────────────────
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
