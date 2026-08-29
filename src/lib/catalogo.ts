import { evaluacion, formacionPrecios, institucionalPrecios } from '@/content/precios';
import { talleres } from '@/content/talleres';

/**
 * CATÁLOGO DEL SERVIDOR
 * ---------------------
 * La única fuente de precios que Mercado Pago acepta. Se construye a partir
 * de los mismos archivos de contenido que muestran las páginas, así que un
 * precio nunca puede divergir entre lo publicado y lo cobrado.
 *
 * Solo entran productos con `importe`: los que se cotizan a medida no
 * pueden cobrarse en línea, y omitirlos aquí lo garantiza aunque alguien
 * llame a la API con su identificador.
 */
export type ProductoCobrable = {
  id: string;
  nombre: string;
  /** Importe en centavos. Evita los errores de redondeo de los decimales. */
  importe: number;
};

const catalogo: ProductoCobrable[] = [
  ...[...evaluacion.productos, ...formacionPrecios, ...institucionalPrecios]
    .filter((producto) => producto.cobro === 'directo' && producto.importe)
    .map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      importe: producto.importe as number,
    })),

  ...talleres.map((taller) => ({
    id: taller.idPago,
    nombre: `Taller ${taller.titulo}`,
    importe: Number(taller.precio.replace(/[^\d]/g, '')) * 100,
  })),
];

export function buscarProducto(id: string): ProductoCobrable | undefined {
  return catalogo.find((producto) => producto.id === id);
}

export function listarCatalogo(): ProductoCobrable[] {
  return catalogo;
}
