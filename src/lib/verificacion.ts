/**
 * VERIFICACIÓN DE INFORMES
 * ------------------------
 * El registro de folios vive en PsicoMetrics, que es donde se emiten los
 * documentos. Este sitio no lo replica: guía a quien tiene un informe en la
 * mano y lo lleva a la comprobación real.
 *
 * Formato de folio emitido: PM-AAAA-XXXXX-XXXXX-X
 * Destino de la consulta:   psicometrics.app/verificar?folio=…
 */

export const URL_VERIFICACION = 'https://psicometrics.app/verificar';

/** Normaliza lo que la persona escribe: mayúsculas y sin caracteres sueltos. */
export function limpiarFolio(entrada: string): string {
  return entrada
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '')
    .slice(0, 24);
}

/**
 * Comprueba la forma del folio antes de enviar la consulta. No valida que
 * exista —eso solo lo sabe PsicoMetrics—, pero evita el viaje en balde
 * cuando falta un bloque o sobra un carácter.
 */
export function folioParecevalido(folio: string): boolean {
  return /^PM-\d{4}-[A-Z0-9]{4,6}-[A-Z0-9]{4,6}-[A-Z0-9]$/.test(folio.trim());
}

export function enlaceVerificacion(folio: string): string {
  return `${URL_VERIFICACION}?folio=${encodeURIComponent(folio.trim())}`;
}
