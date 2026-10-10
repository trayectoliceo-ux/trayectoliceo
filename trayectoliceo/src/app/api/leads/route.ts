import { NextResponse } from 'next/server';

/**
 * REGISTRO DE PROSPECTOS
 * ----------------------
 * Recibe los datos del formulario antes de mandar al cobro. Se ejecuta
 * siempre, pague o no pague la persona: quien llena el formulario y
 * abandona en la pasarela es justamente a quien hay que llamar.
 *
 * DÓNDE SE VEN LOS DATOS
 * Depende de la variable de entorno `LEADS_WEBHOOK_URL`:
 *
 *   · Google Sheets   → los datos caen en una hoja de cálculo. Es lo más
 *                       rápido de montar y lo más fácil de consultar.
 *   · Make o Zapier   → además puedes disparar correo y WhatsApp.
 *   · Tu propio CRM   → si ya tienes uno con endpoint de entrada.
 *
 * Si la variable no existe, el prospecto queda registrado en los logs de
 * Vercel (Deployments → Logs) y la venta continúa igual. Nunca se bloquea
 * el cobro porque falle el registro: perder el dato es malo, perder la
 * venta es peor.
 */

export type Lead = {
  nombre: string;
  correo: string;
  telefono: string;
  producto: string;
  perfil: string;
  /** Campos opcionales según el formulario de origen. */
  extra?: Record<string, string>;
  origen: string;
};

export async function POST(peticion: Request) {
  let lead: Lead;

  try {
    lead = await peticion.json();
  } catch {
    return NextResponse.json({ error: 'peticion_invalida' }, { status: 400 });
  }

  if (!lead?.nombre || !lead?.correo || !lead?.telefono) {
    return NextResponse.json({ error: 'faltan_datos' }, { status: 400 });
  }

  const registro = {
    ...lead,
    fecha: new Date().toISOString(),
    // Útil para medir de dónde llega el tráfico que sí paga.
    referencia: peticion.headers.get('referer') ?? '',
  };

  console.info('[leads] Prospecto recibido', registro);

  const destino = process.env.LEADS_WEBHOOK_URL;

  if (destino) {
    try {
      await fetch(destino, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro),
      });
    } catch (error) {
      // Se registra pero no se interrumpe: la venta sigue su curso.
      console.error('[leads] No se pudo enviar al destino externo', error);
    }
  }

  return NextResponse.json({ ok: true });
}
