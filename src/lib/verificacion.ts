/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  VERIFICACIÓN PÚBLICA DE INFORMES                                    │
 * │                                                                      │
 * │  MAQUETA del registro. `consultarFolio` devuelve datos de ejemplo    │
 * │  para poder ver los cuatro estados de la interfaz.                   │
 * │                                                                      │
 * │  PARA CONECTARLO                                                     │
 * │  Sustituir el cuerpo de `consultarFolio` por una llamada a un        │
 * │  endpoint público de PsicoMetrics:                                   │
 * │                                                                      │
 * │      GET /api/verificar/{folio}                                      │
 * │                                                                      │
 * │  Ese endpoint NUNCA debe devolver contenido clínico. Solo: existe,   │
 * │  quién emitió, cédula, fecha, estado y huella. Cualquier dato del    │
 * │  menor que salga por aquí es una filtración, porque la consulta es   │
 * │  anónima y sin autenticación por diseño.                             │
 * │                                                                      │
 * │  Protecciones necesarias en el endpoint:                             │
 * │   · Límite de peticiones por IP. Sin él, se puede recorrer el        │
 * │     espacio de folios para censar cuántos informes existen.          │
 * │   · Folios largos y no correlativos. Si son 0001, 0002, 0003,        │
 * │     cualquiera deduce tu volumen de operación y puede inventar uno   │
 * │     válido. Doce caracteres aleatorios lo impiden.                   │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type EstadoFolio = 'vigente' | 'revocado' | 'inexistente';

export type RegistroFolio = {
  folio: string;
  estado: EstadoFolio;
  /** Nunca contenido clínico: solo quién responde por el documento. */
  profesional: string;
  cedula: string;
  emitido: string;
  tipoDocumento: string;
  /** SHA-256 en hexadecimal del PDF tal como se emitió. */
  huella: string;
  /** Solo si `estado` es 'revocado'. */
  motivoRevocacion?: string;
};

/** Registro de ejemplo. Sustituir por la consulta real. */
const registroDeEjemplo: Record<string, RegistroFolio> = {
  'AB7K-2291-QN': {
    folio: 'AB7K-2291-QN',
    estado: 'vigente',
    profesional: '[Nombre del profesional]',
    cedula: '[00000000]',
    emitido: '[12 de marzo de 2026]',
    tipoDocumento: 'Informe psicopedagógico',
    huella: '9f2c4a1e8b03d7f65a2e91c4b8d0e37a5c6f1b92d4e8a03c7f5b1e9d2a6c8f04',
  },
  'ZR4M-8810-TK': {
    folio: 'ZR4M-8810-TK',
    estado: 'revocado',
    profesional: '[Nombre del profesional]',
    cedula: '[00000000]',
    emitido: '[4 de enero de 2026]',
    tipoDocumento: 'Informe psicopedagógico',
    huella: '3a8e0c5d21f7b94e6a0d3c8f52b1e97d4a6c0f83b2e5d19a7c4f0b6e3d81a52c',
    motivoRevocacion:
      'Documento sustituido por una versión posterior a solicitud del profesional emisor.',
  },
};

const RETRASO_SIMULADO = 700;

export async function consultarFolio(folio: string): Promise<RegistroFolio> {
  // ── SUSTITUIR DESDE AQUÍ ────────────────────────────────────────────
  await new Promise((resolver) => setTimeout(resolver, RETRASO_SIMULADO));

  const normalizado = folio.trim().toUpperCase();
  const encontrado = registroDeEjemplo[normalizado];

  if (encontrado) return encontrado;

  return {
    folio: normalizado,
    estado: 'inexistente',
    profesional: '',
    cedula: '',
    emitido: '',
    tipoDocumento: '',
    huella: '',
  };
  // ── HASTA AQUÍ ──────────────────────────────────────────────────────
}

/**
 * Calcula la huella SHA-256 del archivo en el propio navegador.
 *
 * Esto no es una simulación: usa la Web Crypto API. El archivo nunca sale
 * del equipo de quien verifica, que es justamente lo que hace aceptable
 * pedirle que suba un informe con datos de un menor.
 *
 * Requiere contexto seguro (HTTPS), disponible en producción y en
 * localhost.
 */
export async function calcularHuella(archivo: File): Promise<string> {
  const contenido = await archivo.arrayBuffer();
  const resumen = await crypto.subtle.digest('SHA-256', contenido);

  return Array.from(new Uint8Array(resumen))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Da formato al folio mientras se escribe: XXXX-XXXX-XX */
export function formatearFolio(entrada: string): string {
  const limpio = entrada
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 10);

  const partes = [limpio.slice(0, 4), limpio.slice(4, 8), limpio.slice(8, 10)];

  return partes.filter(Boolean).join('-');
}
