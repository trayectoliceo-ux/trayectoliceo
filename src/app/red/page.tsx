import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { RegistroRed } from '@/components/contacto/RegistroRed';
import { precios } from '@/content/certificate';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Únete a la red de especialistas más grande de México',
  descripcion:
    'Red de psicólogos, psicopedagogos y docentes en evaluación psicopedagógica. Recibe casos derivados, capacítate y certifícate. Registro sin costo.',
  ruta: '/red',
});

export default function PaginaRed() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Red de especialistas', ruta: '/red' },
        ])}
      />

      <PortadaRuta
        etiqueta="Red de especialistas"
        titulo={['Únete a la red de', 'especialistas más']}
        rotativas={['grande de México.']}
        entrada="Psicólogos, psicopedagogos y docentes que detectan, evalúan y acompañan. Recibes casos, te capacitas y te certificas. El registro no cuesta nada."
        tono="hondo"
      />

      <Seccion>
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <Revelar>
              <p className="etiqueta">Por qué unirte</p>
              <h2 className="mt-3 max-w-[20ch] text-t1">Trabajo, no solo diploma.</h2>
            </Revelar>

            <GrupoRevelar as="ul" total={5} className="mt-7 border-t border-linea">
              {[
                'Recibes casos derivados de tamizajes escolares y de familias',
                'Las tres capacitaciones incluidas en tu membresía',
                `Certificado con validez SEP por $${precios.certificado} MXN`,
                'Emites informes con folio verificable y código QR',
                'Transfieres expedientes a otros especialistas de la red',
              ].map((punto) => (
                <ElementoRevelar
                  as="li"
                  key={punto}
                  className="flex items-baseline gap-4 border-b border-linea py-4 text-cuerpo text-tinta-suave"
                >
                  <span aria-hidden className="text-institucional">
                    ✓
                  </span>
                  <span>{punto}</span>
                </ElementoRevelar>
              ))}
            </GrupoRevelar>

            <Revelar retraso={0.08}>
              <p className="justificado-limpio mt-7 rounded border-l-4 border-institucional bg-papel-puro p-5 text-menudo leading-[1.75] text-tinta-suave">
                Psicólogos y psicopedagogos acceden a la plataforma clínica con la
                membresía de ${precios.membresia} MXN al mes. Los docentes se suman a
                la red para detectar y derivar, y su capacitación va incluida al
                contratar tamizaje escolar en su centro.
              </p>
            </Revelar>
          </div>

          <Revelar retraso={0.06} className="lg:sticky lg:top-24">
            <RegistroRed />
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
