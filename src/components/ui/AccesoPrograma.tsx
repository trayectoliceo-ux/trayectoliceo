'use client';

import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { certificado, precios, type Programa } from '@/content/certificate';
import { enlaceWhatsApp } from '@/content/sitio';

const pesos = (importe: number) => `$${importe.toLocaleString('es-MX')} MXN`;

/**
 * ACCESO AL PROGRAMA
 * ------------------
 * Cada perfil entra de una forma distinta, y confundirlas cuesta dinero:
 *
 *  · Psicólogos → la formación va incluida en la membresía. El botón lleva
 *    a activar la membresía en psicometrics.app, NO a una pasarela: cobrar
 *    aquí un curso que ya está incluido sería un cobro indebido.
 *  · Docentes → capacitación de acceso de pago único, que sí se cobra aquí.
 *  · Centros → se cotiza por número de participantes.
 *
 * El certificado con validez oficial es siempre un pago aparte y posterior.
 */
export function AccesoPrograma({ programa }: { programa: Programa }) {
  return (
    <div className="space-y-4">
      {programa.acceso === 'membresia' ? (
        <div className="rounded-lg border border-institucional bg-papel-puro p-7 text-center shadow-elevada">
          <p className="etiqueta">Incluido en tu membresía</p>
          <p className="mt-3 whitespace-nowrap font-display text-t1 font-bold leading-none tracking-[-0.03em] text-institucional">
            ${precios.membresia} MXN
          </p>
          <p className="mt-1 text-menudo text-gris">al mes, en PsicoMetrics</p>

          <p className="justificado mt-4 text-menudo text-tinta-suave">
            No pagas el curso aparte. Está disponible mientras estés activo en la
            plataforma, sin límite de tiempo para avanzar.
          </p>

          <a
            href="https://psicometrics.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-[56px] w-full items-center justify-center rounded bg-institucional px-5 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            Activar mi membresía y empezar
          </a>

          <p className="mt-3 text-menudo text-gris">
            Continúas en psicometrics.app para dar de alta tu cuenta.
          </p>
        </div>
      ) : null}

      {programa.acceso === 'docente' ? (
        <>
          <FormularioCompra
            producto={programa.nombre}
            idPago={programa.id}
            precio={pesos(precios.capacitacionDocente)}
            accion="Inscribirme ahora"
            perfil="docente"
            campoExtra={{
              clave: 'centro',
              etiqueta: 'Escuela donde trabajas',
              ayuda: 'Nos ayuda a agrupar por zona',
            }}
          />
          <p className="justificado text-menudo text-gris">
            Pago único de acceso a la capacitación. No incluye la plataforma clínica
            PsicoMetrics: la evaluación la realiza siempre un profesional con cédula.
          </p>
        </>
      ) : null}

      {programa.acceso === 'centro' ? (
        <div className="rounded-lg border border-institucional bg-papel-puro p-7 text-center shadow-elevada">
          <p className="text-cuerpo font-semibold text-tinta">
            Precio según el tamaño del equipo
          </p>
          <p className="justificado mt-3 text-menudo text-tinta-suave">
            Cotizamos por número de participantes y adaptamos el contenido al
            procedimiento de tu centro.
          </p>
          <a
            href={enlaceWhatsApp(
              `Hola. Represento a un colegio y quiero cotizar: ${programa.nombre}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded bg-institucional px-5 text-center text-cuerpo font-semibold text-papel transition-colors duration-200 hover:bg-institucional-hondo"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      ) : null}

      {programa.certificable ? (
        <div className="rounded-lg border border-linea bg-papel-puro p-6">
          <p className="text-menudo font-bold uppercase tracking-[0.08em] text-institucional">
            {certificado.etiqueta} · opcional
          </p>
          <p className="justificado mt-2 text-menudo leading-[1.75] text-tinta-suave">
            {certificado.texto}
          </p>
          <p className="mt-3 whitespace-nowrap font-display text-entrada font-bold text-institucional">
            {pesos(certificado.precio)}
          </p>
          <p className="mt-1 text-menudo text-gris">
            Se agenda cuando termines el curso. {certificado.requisito}
          </p>
        </div>
      ) : null}
    </div>
  );
}
