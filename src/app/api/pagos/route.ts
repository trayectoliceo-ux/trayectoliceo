import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { buscarProducto } from '@/lib/catalogo';
import { sitio } from '@/content/sitio';

/**
 * CREACIÓN DE PREFERENCIA DE PAGO · MERCADO PAGO
 * ----------------------------------------------
 * Se ejecuta en el servidor. El Access Token nunca llega al navegador.
 *
 * CONFIGURACIÓN EN VERCEL (Settings → Environment Variables):
 *   MERCADOPAGO_ACCESS_TOKEN   Token de producción de tu cuenta
 *   NEXT_PUBLIC_SITIO_URL      https://trayectoliceo.com
 *
 * Mientras el token no exista, la ruta responde 503 y el botón deriva a
 * WhatsApp. Así el sitio funciona antes y después de conectar el cobro.
 *
 * REGLA QUE NO SE NEGOCIA
 * El precio se toma del catálogo del servidor a partir del `id`. El importe
 * que mande el cliente se ignora por completo: aceptarlo permitiría comprar
 * un diplomado de $12,500 por un peso editando la petición.
 */
export async function POST(peticion: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'pasarela_no_configurada' },
      { status: 503 },
    );
  }

  let id: unknown;

  try {
    ({ id } = await peticion.json());
  } catch {
    return NextResponse.json({ error: 'peticion_invalida' }, { status: 400 });
  }

  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'id_invalido' }, { status: 400 });
  }

  const producto = buscarProducto(id);

  if (!producto) {
    return NextResponse.json({ error: 'producto_inexistente' }, { status: 404 });
  }

  const base = process.env.NEXT_PUBLIC_SITIO_URL ?? sitio.dominio;

  try {
    const cliente = new MercadoPagoConfig({ accessToken: token });

    const preferencia = await new Preference(cliente).create({
      body: {
        items: [
          {
            id: producto.id,
            title: producto.nombre,
            quantity: 1,
            unit_price: producto.importe / 100,
            currency_id: 'MXN',
          },
        ],
        back_urls: {
          success: `${base}/pago/confirmado`,
          pending: `${base}/pago/pendiente`,
          failure: `${base}/pago/error`,
        },
        auto_return: 'approved',
        // Identifica la compra al recibir el webhook.
        external_reference: producto.id,
        notification_url: `${base}/api/pagos/webhook`,
        statement_descriptor: 'TRAYECTO LICEO',
      },
    });

    return NextResponse.json({ url: preferencia.init_point });
  } catch (error) {
    console.error('[pagos] Error al crear la preferencia', error);

    return NextResponse.json({ error: 'error_pasarela' }, { status: 502 });
  }
}
