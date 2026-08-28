/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  PUNTO ÚNICO DE INTEGRACIÓN CON MERCADO PAGO                         │
 * │                                                                      │
 * │  MAQUETA. Hoy simula la creación de la preferencia de pago para que  │
 * │  el botón tenga estados reales de carga y error. No cobra nada.      │
 * │                                                                      │
 * │  PARA CONECTARLO DE VERDAD                                           │
 * │                                                                      │
 * │  1. El Access Token de Mercado Pago NUNCA va en el cliente. Se       │
 * │     guarda como variable de entorno en Vercel:                       │
 * │        MERCADOPAGO_ACCESS_TOKEN                                      │
 * │                                                                      │
 * │  2. Se crea una Route Handler en `src/app/api/pagos/route.ts` que    │
 * │     llama al SDK de Mercado Pago desde el servidor, crea la          │
 * │     preferencia con el precio tomado del SERVIDOR —nunca del         │
 * │     cliente, o cualquiera podría comprar 50 créditos por un peso—    │
 * │     y devuelve `init_point`.                                         │
 * │                                                                      │
 * │  3. Se sustituye el cuerpo de esta función por:                      │
 * │                                                                      │
 * │        const respuesta = await fetch('/api/pagos', {                 │
 * │          method: 'POST',                                             │
 * │          headers: { 'Content-Type': 'application/json' },            │
 * │          body: JSON.stringify({ paquete }),                          │
 * │        });                                                           │
 * │        const datos = await respuesta.json();                         │
 * │        return { ok: true, urlCheckout: datos.init_point };           │
 * │                                                                      │
 * │  4. Los créditos se acreditan al recibir el WEBHOOK de Mercado Pago, │
 * │     nunca al volver el usuario a la página de éxito: esa URL se      │
 * │     puede abrir a mano sin haber pagado.                             │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type ResultadoPago =
  | { ok: true; urlCheckout: string }
  | { ok: false; motivo: string };

/** Catálogo de paquetes. Los precios definitivos viven en el servidor. */
export const paquetesDeCreditos = [
  { id: 'creditos-10', informes: 10, precio: '[$49 USD]' },
  { id: 'creditos-20', informes: 20, precio: '[$89 USD]' },
  { id: 'creditos-50', informes: 50, precio: '[$199 USD]' },
] as const;

/**
 * Los productos del sitio (tamizajes, cursos, diplomado) usan la misma
 * función. El `id` que se envía debe existir en el catálogo del servidor:
 * si no existe, la petición se rechaza en lugar de crear un cobro huérfano.
 */

/**
 * Productos con cobro en línea.
 *
 * ESTA TABLA ES SOLO PARA MOSTRAR EN PANTALLA. El importe que se cobra
 * debe leerse de una tabla equivalente EN EL SERVIDOR a partir del `id`.
 * Si el precio viaja desde el navegador, cualquiera puede editarlo antes
 * de enviarlo y comprar un diplomado por un peso.
 */
export const productos = {
  'tamizaje-padres': { nombre: 'Tamizaje digital para padres', importe: 290 },
  'curso-deteccion-aula': { nombre: 'Curso: Deteccion en el aula', importe: 1800 },
  'curso-informe': { nombre: 'Curso: Redaccion del informe', importe: 2200 },
  'diplomado-altas-capacidades': {
    nombre: 'Diplomado en altas capacidades',
    importe: 12500,
  },
} as const;

export type ProductoId = keyof typeof productos;

const RETRASO_SIMULADO = 1100;

export async function iniciarPagoMercadoPago(paquete: string): Promise<ResultadoPago> {
  // ── SUSTITUIR DESDE AQUÍ ────────────────────────────────────────────
  await new Promise((resolver) => setTimeout(resolver, RETRASO_SIMULADO));

  if (process.env.NODE_ENV === 'development') {
    console.info('[pagos] Checkout simulado. Sustituir iniciarPagoMercadoPago().', {
      paquete,
    });
  }

  // Mientras no exista la integración, se deriva a contacto en lugar de
  // fingir un cobro que no va a ocurrir.
  return { ok: true, urlCheckout: '/contacto?motivo=creditos' };
  // ── HASTA AQUÍ ──────────────────────────────────────────────────────
}
