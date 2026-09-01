import { PortadaRuta } from '@/components/ui/PortadaRuta';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { FormularioCompra } from '@/components/contacto/FormularioCompra';
import { Acordeon } from '@/components/ui/Acordeon';
import { familias } from '@/content/rutas';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan, preguntasFrecuentes } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Valoración psicopedagógica en línea desde $490',
  descripcion:
    'Valoración digital para niños y adolescentes de 3 a 18 años, revisada y firmada por psicólogo con cédula. Informe en 72 horas, sin listas de espera.',
  ruta: '/familias',
});

export default function PaginaFamilias() {
  const { producto } = familias;

  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Para familias', ruta: '/familias' },
        ])}
      />
      <DatosEstructurados datos={preguntasFrecuentes(familias.preguntas)} />

      <PortadaRuta
        etiqueta={familias.portada.etiqueta}
        titulo={familias.portada.titulo}
        rotativas={familias.portada.rotativas}
        entrada={familias.portada.entrada}
      />

      {/* Pasos y compra, lado a lado: decidir y pagar sin bajar la página */}
      <Seccion>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Revelar>
              <p className="etiqueta">Cómo funciona</p>
              <h2 className="mt-5 max-w-[16ch] text-t1">Tres pasos y listo.</h2>
            </Revelar>

            <GrupoRevelar as="ol" total={3} className="mt-10">
              {familias.pasos.map((paso) => (
                <ElementoRevelar
                  as="li"
                  key={paso.numero}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-linea py-5"
                >
                  <span className="font-mono text-cuerpo font-medium text-institucional">
                    {paso.numero}
                  </span>
                  <span>
                    <span className="block text-entrada font-bold text-tinta">
                      {paso.titulo}
                    </span>
                    <span className="justificado mt-1 block text-menudo text-tinta-suave">
                      {paso.texto}
                    </span>
                  </span>
                </ElementoRevelar>
              ))}
            </GrupoRevelar>

            {/* Honestidad sobre el alcance. Vende más de lo que parece. */}
            <GrupoRevelar total={2} className="mt-10 grid items-stretch gap-4 sm:grid-cols-2">
              <ElementoRevelar className="flex h-full flex-col rounded-lg border border-menta/30 bg-menta/[0.05] p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-menta">
                  {familias.honestidad.si.titulo}
                </p>
                <p className="justificado mt-3 text-menudo leading-[1.7] text-tinta-suave">
                  {familias.honestidad.si.texto}
                </p>
              </ElementoRevelar>

              <ElementoRevelar className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-6">
                <p className="text-menudo font-bold uppercase tracking-[0.08em] text-gris">
                  {familias.honestidad.no.titulo}
                </p>
                <p className="justificado mt-3 text-menudo leading-[1.7] text-tinta-suave">
                  {familias.honestidad.no.texto}
                </p>
              </ElementoRevelar>
            </GrupoRevelar>
          </div>

          <Revelar retraso={0.06} className="lg:sticky lg:top-28">
            <FormularioCompra
              producto={producto.nombre}
              idPago={producto.id}
              precio={producto.precio}
              accion={`${producto.accion} · ${producto.precio}`}
              perfil="familia"
              campoExtra={{
                clave: 'edadMenor',
                etiqueta: 'Edad de tu hija o hijo',
                ayuda: 'Atendemos de 3 a 18 años',
              }}
            />
          </Revelar>
        </div>
      </Seccion>

      {/* Tres preguntas y ninguna más */}
      <Seccion tono="hondo">
        <div className="mx-auto max-w-2xl">
          <Revelar className="text-center">
            <h2 className="text-t2">Lo que más nos preguntan.</h2>
          </Revelar>
          <div className="mt-8">
            <Acordeon elementos={familias.preguntas} />
          </div>
        </div>
      </Seccion>
    </>
  );
}
