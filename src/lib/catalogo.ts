import {
  evaluacion,
  formacionPrecios,
  institucionalPrecios,
  trayectoriaPrecios,
} from '@/content/precios';
import { titulacion } from '@/content/rutas';

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
  ...evaluacion.productos,
  ...formacionPrecios,
  ...trayectoriaPrecios,
  ...institucionalPrecios,
]
  .filter((producto) => producto.cobro === 'directo' && producto.importe)
  .map((producto) => ({
    id: producto.id,
    nombre: producto.nombre,
    importe: producto.importe as number,
  }));

/** Las etapas de titulación que sí cobramos nosotros. */
for (const etapa of titulacion.etapas) {
  if (etapa.cobrable && etapa.id && etapa.importe) {
    catalogo.push({
      id: etapa.id,
      nombre: `Titulación Acuerdo 286 · ${etapa.etapa}`,
      importe: etapa.importe,
    });
  }
}

export function buscarProducto(id: string): ProductoCobrable | undefined {
  return catalogo.find((producto) => producto.id === id);
}

export function listarCatalogo(): ProductoCobrable[] {
  return catalogo;
}
