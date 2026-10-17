import { certificado, precios, programas } from '@/content/certificate';

/**
 * CATÁLOGO DEL SERVIDOR
 * ---------------------
 * La única fuente de precios que Mercado Pago acepta. Se construye a partir
 * de los mismos archivos de contenido que muestran las páginas, así que un
 * precio nunca puede divergir entre lo publicado y lo cobrado.
 *
 * Solo entra lo que el modelo vigente cobra en línea:
 *
 *   · Capacitación docente ($590)
 *   · Examen de certificación con validez SEP ($990)
 *
 * Deliberadamente NO entran:
 *
 *   · Los programas incluidos en el plan anual de PsicoMetrics, porque
 *     cobrarlos sería cobrar dos veces lo mismo.
 *   · El tamizaje escolar, que es gratuito.
 *   · La valoración psicopedagógica y la orientación vocacional, que se
 *     pagan en psicometrics.app, no aquí.
 *   · El catálogo histórico de `content/precios.ts`, cuyos importes ya no
 *     corresponden al modelo vigente.
 *
 * Omitirlos aquí garantiza que no puedan cobrarse aunque alguien llame a la
 * API con su identificador.
 */
export type ProductoCobrable = {
  id: string;
  nombre: string;
  /** Importe en centavos. Evita los errores de redondeo de los decimales. */
  importe: number;
};

const catalogo: ProductoCobrable[] = [];

/** Capacitación docente: el único cobro del perfil docente. */
for (const programa of programas) {
  if (programa.acceso !== 'docente') continue;

  catalogo.push({
    id: programa.id,
    nombre: programa.nombre,
    importe: precios.capacitacionDocente * 100,
  });
}

catalogo.push({
  id: certificado.id,
  nombre: 'Examen y estudio de caso · certificado con validez oficial',
  importe: certificado.precio * 100,
});

export function buscarProducto(id: string): ProductoCobrable | undefined {
  return catalogo.find((producto) => producto.id === id);
}

export function listarCatalogo(): ProductoCobrable[] {
  return catalogo;
}
