import Link from 'next/link';
import { VerificadorFolio } from '@/components/verificar/VerificadorFolio';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';

/**
 * Ruta antigua de verificación con folio en la URL. Se conserva para que
 * los documentos ya emitidos con ese formato sigan funcionando: recoge el
 * folio y lo lleva a la comprobación en PsicoMetrics.
 */
export const metadata = {
  title: 'Verificación de documento',
  robots: { index: false, follow: false },
};

export default async function PaginaFolio({
  params,
}: {
  params: Promise<{ folio: string }>;
}) {
  const { folio } = await params;

  return (
    <Seccion>
      <Revelar className="mx-auto max-w-xl text-center">
        <p className="etiqueta">Verificación pública</p>
        <h1 className="mt-3 text-t2">Comprueba este documento</h1>
        <p className="justificado-limpio mt-4 text-menudo text-tinta-suave">
          Confirma el folio y continúa a la verificación.
        </p>
      </Revelar>

      <div className="mx-auto mt-7 max-w-xl">
        <VerificadorFolio folioInicial={decodeURIComponent(folio)} />
      </div>

      <Revelar retraso={0.08}>
        <p className="mt-7 text-center text-menudo text-gris">
          ¿Tienes dudas sobre este documento?{' '}
          <Link
            href="/contacto"
            className="font-semibold text-institucional underline underline-offset-4"
          >
            Escríbenos
          </Link>
        </p>
      </Revelar>
    </Seccion>
  );
}
