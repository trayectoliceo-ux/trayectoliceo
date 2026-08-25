import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { metadatos } from '@/lib/metadatos';
import { sitio } from '@/content/sitio';

export const metadata = {
  ...metadatos({
    titulo: 'Aviso de privacidad',
    descripcion:
      'Aviso de privacidad de Trayecto Liceo conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
    ruta: '/aviso-de-privacidad',
  }),
  // No aporta valor en buscadores y consume presupuesto de rastreo.
  robots: { index: false, follow: true },
};

/**
 * AVISO DE PRIVACIDAD
 * -------------------
 * PLANTILLA. El texto debe revisarlo un abogado antes de publicar: la
 * LFPDPPP exige elementos concretos y las sanciones por un aviso
 * incompleto son reales.
 *
 * Los apartados de abajo son los mínimos que exige el artículo 16 de la
 * Ley. Todo lo que está entre corchetes debe completarse.
 */
export default function PaginaAvisoDePrivacidad() {
  const apartados = [
    {
      titulo: 'Responsable del tratamiento',
      cuerpo: `${sitio.operadora}, con domicilio en ${sitio.contacto.domicilio}, es responsable del tratamiento de sus datos personales.`,
    },
    {
      titulo: 'Datos que recabamos',
      cuerpo:
        'Nombre, correo electrónico, teléfono y la información que usted proporcione en el formulario de contacto. Según el perfil seleccionado, también la edad del menor, el nombre y tamaño del centro escolar, o la cédula profesional.',
    },
    {
      titulo: 'Finalidades',
      cuerpo:
        'Responder a su solicitud, informar sobre programas y servicios, verificar requisitos de inscripción y dar seguimiento al acompañamiento contratado. [Añadir finalidades secundarias, si las hay, y cómo negarlas.]',
    },
    {
      titulo: 'Datos de menores',
      cuerpo:
        'Los datos de menores de edad se recaban únicamente de quien ejerce la patria potestad o tutela, y se tratan con las medidas de seguridad reforzadas que corresponden. [Detallar plazo de conservación.]',
    },
    {
      titulo: 'Transferencias',
      cuerpo:
        '[Declarar aquí toda transferencia a terceros, incluida la canalización universitaria con convenio, e indicar si requiere consentimiento.]',
    },
    {
      titulo: 'Derechos ARCO',
      cuerpo: `Puede solicitar el acceso, la rectificación, la cancelación o la oposición al tratamiento de sus datos escribiendo a ${sitio.contacto.correo}. Responderemos en los plazos que marca la Ley.`,
    },
    {
      titulo: 'Cambios al aviso',
      cuerpo:
        'Cualquier modificación se publicará en esta misma página. [Indicar fecha de última actualización.]',
    },
  ];

  return (
    <>
      <CabeceraPagina
        etiqueta="Legal"
        titulo="Aviso de privacidad"
        entrada="Cómo tratamos los datos personales que nos comparte, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
        aviso="Última actualización: [fecha]"
      />

      <Seccion>
        <div className="max-w-lectura">
          {apartados.map((apartado) => (
            <Revelar key={apartado.titulo} desplazamiento={8} className="mb-10">
              <h2 className="text-t3">{apartado.titulo}</h2>
              <p className="mt-3 text-cuerpo leading-[1.75] text-tinta-suave">
                {apartado.cuerpo}
              </p>
            </Revelar>
          ))}
        </div>
      </Seccion>
    </>
  );
}
