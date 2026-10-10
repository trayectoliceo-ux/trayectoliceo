import { enlaceWhatsApp } from '@/content/sitio';

/**
 * PAGOS · LADO DEL CLIENTE
 * ------------------------
 * Llama a `/api/pagos`, que crea la preferencia en el servidor y devuelve
 * la URL del checkout de Mercado Pago.
 *
 * Si la pasarela todavía no está configurada —falta el Access Token en
 * Vercel—, el servidor responde 503 y aquí se deriva a WhatsApp con un
 * mensaje que identifica el producto. El visitante nunca se queda sin
 * camino: o paga en línea, o habla con una persona.
 */

export type ResultadoPago =
  | { ok: true; urlCheckout: string }
  | { ok: false; motivo: string };

export const paquetesDeCreditos = [
  { id: 'creditos-10', informes: 10, precio: '$7 USD' },
  { id: 'creditos-20', informes: 20, precio: '$6 USD' },
  { id: 'creditos-50', informes: 50, precio: '$5 USD' },
] as const;

export async function iniciarPagoMercadoPago(
  paquete: string,
  nombreProducto?: string,
): Promise<ResultadoPago> {
  try {
    const respuesta = await fetch('/api/pagos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: paquete }),
    });

    if (respuesta.ok) {
      const datos = await respuesta.json();

      if (datos?.url) return { ok: true, urlCheckout: datos.url };
    }

    // Sin pasarela configurada: se atiende por WhatsApp.
    return {
      ok: true,
      urlCheckout: enlaceWhatsApp(
        `Hola. Quiero apartar mi lugar en ${nombreProducto ?? paquete} y realizar el pago.`,
      ),
    };
  } catch {
    return { ok: false, motivo: 'sin_conexion' };
  }
}
