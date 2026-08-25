import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { Revelar } from '@/components/ui/Revelar';
import { FormularioContacto } from '@/components/contacto/FormularioContacto';
import { enlaceWhatsApp, sitio } from '@/content/sitio';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Contacto',
  descripcion:
    'Escríbenos por formulario, WhatsApp o correo. Estamos en 31 Poniente 4128, Ampliación Reforma, Puebla. Respondemos en dos días hábiles.',
  ruta: '/contacto',
});

export default function PaginaContacto() {
  const enlace = enlaceWhatsApp(
    'Hola. Me gustaría agendar una conversación con Trayecto Liceo.',
  );

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Contacto', ruta: '/contacto' },
        ])}
      />

      <CabeceraPagina
        etiqueta="Contacto"
        titulo="Cuéntanos la situación y te decimos si podemos ayudar."
        entrada="Selecciona tu perfil para que te pidamos solo los datos que necesitamos. Respondemos en dos días hábiles."
      />

      <Seccion>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Revelar>
            <dl className="border-t border-linea">
              <div className="border-b border-linea py-5">
                <dt className="etiqueta">Correo</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${sitio.contacto.correo}`}
                    className="inline-flex min-h-[44px] items-center text-menudo text-institucional underline underline-offset-4"
                  >
                    {sitio.contacto.correo}
                  </a>
                </dd>
              </div>

              <div className="border-b border-linea py-5">
                <dt className="etiqueta">WhatsApp</dt>
                <dd className="mt-2">
                  <a
                    href={enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-menudo text-institucional underline underline-offset-4"
                  >
                    {sitio.contacto.whatsappVisible}
                  </a>
                </dd>
              </div>

              <div className="border-b border-linea py-5">
                <dt className="etiqueta">Horario de atención</dt>
                <dd className="mt-2 text-menudo text-tinta-suave">
                  {sitio.contacto.horario}
                </dd>
              </div>

              <div className="border-b border-linea py-5">
                <dt className="etiqueta">Ubicación</dt>
                <dd className="mt-2 text-menudo text-tinta-suave">
                  {sitio.contacto.ciudad}
                  <span className="mt-1 block text-gris">{sitio.contacto.domicilio}</span>
                </dd>
              </div>
            </dl>

            <p className="mt-8 max-w-[38ch] text-menudo text-gris">
              No realizamos evaluaciones ni emitimos diagnósticos por mensaje. La primera
              conversación sirve para orientar y, si corresponde, derivar.
            </p>
          </Revelar>

          <Revelar retraso={0.06}>
            <FormularioContacto />
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
