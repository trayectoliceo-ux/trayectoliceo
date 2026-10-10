import { NextResponse } from 'next/server';

/**
 * WEBHOOK DE MERCADO PAGO
 * -----------------------
 * Aquí, y solo aquí, se da por buena una compra. La página de «gracias» no
 * sirve: cualquiera puede escribir esa URL en el navegador sin haber pagado.
 *
 * PENDIENTE DE IMPLEMENTAR CUANDO EXISTA BASE DE DATOS:
 *
 *  1. Verificar la firma `x-signature` de la petición. Sin esa comprobación
 *     cualquiera puede enviar avisos falsos a esta ruta.
 *  2. Consultar el pago en la API de Mercado Pago por su `id` para conocer
 *     el estado real, en lugar de fiarse del cuerpo recibido.
 *  3. Si el estado es `approved`, registrar la compra y activar lo que
 *     corresponda: créditos, inscripción o lugar en el taller.
 *  4. IDEMPOTENCIA. Mercado Pago reintenta si no respondes rápido, así que
 *     el mismo aviso puede llegar varias veces. Guardar el `payment_id` y
 *     descartar los repetidos, o acabarás acreditando tres veces una compra.
 *
 * Responder 200 siempre que el aviso se haya recibido correctamente: un
 * error hace que Mercado Pago reintente durante horas.
 */
export async function POST(peticion: Request) {
  try {
    const aviso = await peticion.json();

    console.info('[pagos] Aviso recibido de Mercado Pago', {
      tipo: aviso?.type,
      id: aviso?.data?.id,
    });

    // TODO: verificar firma, consultar el pago y registrar la compra.

    return NextResponse.json({ recibido: true });
  } catch (error) {
    console.error('[pagos] Aviso ilegible', error);

    return NextResponse.json({ recibido: false }, { status: 400 });
  }
}
