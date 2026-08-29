import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Metadato, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { trayectoria } from '@/content/institucional';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Orientación de trayectoria académica',
  descripcion:
    'Acompañamiento en decisiones académicas: elección de bachillerato, especialización y transición universitaria, con declaración de conflicto de interés visible.',
  ruta: '/trayectoria',
});

export default function PaginaTrayectoria() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Orientación de trayectoria', ruta: '/trayectoria' },
        ])}
      />

      <CabeceraPagina
        etiqueta={trayectoria.etiqueta}
        titulo={trayectoria.titulo}
        entrada={trayectoria.entrada}
      />

      <Seccion>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <Revelar>
              <h2 className="text-t2">Qué incluye el acompañamiento</h2>
            </Revelar>

            <GrupoRevelar
              as="ul"
              total={trayectoria.incluye.length}
              className="mt-10 border-t border-linea"
            >
              {trayectoria.incluye.map((elemento, indice) => (
                <ElementoRevelar
                  as="li"
                  key={elemento.titulo}
                  className="grid gap-3 border-b border-linea py-6 sm:grid-cols-[3rem_1fr] sm:gap-8"
                >
                  <span className="font-mono text-etiqueta text-institucional">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-entrada leading-[1.25]">{elemento.titulo}</h3>
                    <p className="justificado mt-2 max-w-lectura text-menudo leading-[1.65] text-tinta-suave">
                      {elemento.descripcion}
                    </p>
                  </div>
                </ElementoRevelar>
              ))}
            </GrupoRevelar>
          </div>

          <Revelar retraso={0.06}>
            <dl className="lg:pt-2">
              <Metadato etiqueta="Duración estimada">{trayectoria.duracion}</Metadato>
              <Metadato etiqueta="Inversión">{trayectoria.precio}</Metadato>
              <Metadato etiqueta="Modalidad">Sesiones en línea o presenciales</Metadato>
            </dl>
          </Revelar>
        </div>
      </Seccion>

      {/*
        DECLARACIÓN DE CONFLICTO DE INTERÉS
        Va antes de la llamada a la acción, no en el pie. Si el visitante
        decide contratar, lo hace habiéndola leído.
      */}
      <Seccion tono="hondo">
        <Revelar>
          <div className="max-w-3xl border-l-2 border-sello pl-6 sm:pl-8">
            <h2 className="etiqueta text-sello">{trayectoria.declaracion.titulo}</h2>
            <div className="mt-6 space-y-5">
              {trayectoria.declaracion.parrafos.map((parrafo) => (
                <p key={parrafo} className="text-cuerpo leading-[1.7] text-tinta">
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </Revelar>
      </Seccion>

      <LlamadaContacto
        titulo="El calendario de admisión manda"
        texto="Conviene empezar con margen respecto a las fechas de admisión del destino. Escríbenos indicando el curso actual del estudiante."
        accion="Consultar disponibilidad"
      />
    </>
  );
}
