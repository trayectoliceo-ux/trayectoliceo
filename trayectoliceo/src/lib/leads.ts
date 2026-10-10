import type { Lead } from '@/app/api/leads/route';

/**
 * Registra el prospecto antes de mandarlo al cobro.
 *
 * Nunca lanza excepción: si el registro falla, la persona debe poder pagar
 * igual. Un dato perdido se recupera; una venta perdida, no.
 */
export async function registrarLead(lead: Lead): Promise<void> {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch {
    // Silencio deliberado: el flujo de compra continúa.
  }
}
