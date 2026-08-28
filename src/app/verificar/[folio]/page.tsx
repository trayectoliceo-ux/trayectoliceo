import Link from 'next/link';
import { VerificadorFolio } from '@/components/verificar/VerificadorFolio';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';

/**
 * Destino del código QR impreso en el documento.
 *
 * Recibe el folio en la URL y lanza la consulta sin que nadie escriba nada:
 * quien escanea con el celular ve el resultado directamente.
 *
 * `noindex` deliberado: cada folio es una URL distinta y no tiene sentido
 * que los buscadores rastreen e indexen el registro documento a documento.
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
      <Revelar>
        <div className="mx-auto max-w-2xl text-center">
          <p className="etiqueta">Verificación pública</p>
          <h1 className="mt-4 text-t2">Resultado de la verificación</h1>
        </div>
      </Revelar>

      <div className="mt-10">
        <VerificadorFolio folioInicial={decodeURIComponent(folio)} />
      </div>

      <Revelar retraso={0.08}>
        <p className="mt-10 text-center text-menudo text-gris">
          ¿Tienes dudas sobre este documento?{' '}
          <Link
            href="/contacto"
            className="font-medium text-institucional underline underline-offset-4"
          >
            Escríbenos
          </Link>
        </p>
      </Revelar>
    </Seccion>
  );
}
