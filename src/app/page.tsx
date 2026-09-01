import Link from 'next/link';
import { Portada } from '@/components/inicio/Portada';
import { PromocionesRotativas } from '@/components/inicio/PromocionesRotativas';
import { FormularioInteligente } from '@/components/contacto/FormularioInteligente';
import { EncabezadoSeccion, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { PreguntasFrecuentes } from '@/components/inicio/PreguntasFrecuentes';
import { preguntas, problema } from '@/content/inicio';
import { rutas } from '@/content/rutas';
import { metadatos } from '@/lib/metadatos';
import {
  DatosEstructurados,
  organizacion,
  preguntasFrecuentes,
  sitioWeb,
} from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Altas capacidades y talento infantil en Puebla',
  descripcion:
    'Detección y desarrollo del talento infantil en Puebla: talleres STEAM, formación para psicólogos y orientadores, y certificación de colegios que identifican talento.',
  ruta: '/',
});

export default function PaginaInicio() {
  return (
    <>
      <DatosEstructurados datos={organizacion()} />
      <DatosEstructurados datos={sitioWeb()} />
      <DatosEstructurados datos={preguntasFrecuentes(preguntas.lista)} />

      <PromocionesRotativas />
      <Portada />

      {/*
        Cuatro públicos, cuatro destinos. Segmentar aquí evita que el
        visitante lea tres secciones que no le hablan a él antes de
        encontrar la suya.
      */}
      <Seccion>
        <EncabezadoSeccion
          etiqueta="Elige tu camino"
          titulo="¿Desde dónde llegas?"
          entrada="Cada perfil tiene su propia página, con precios visibles y sin rodeos."
        />

        <GrupoRevelar
          total={rutas.length}
          className="mt-14 grid items-stretch gap-5 sm:grid-cols-2"
        >
          {rutas.map((ruta) => (
            <ElementoRevelar key={ruta.id}>
              <Link
                href={ruta.href}
                className={`group flex h-full flex-col rounded-lg border bg-papel-puro p-7 transition-shadow duration-300 hover:shadow-elevada sm:p-8 ${
                  ruta.principal
                    ? 'border-institucional shadow-elevada'
                    : 'border-linea shadow-tarjeta'
                }`}
              >
                <p className="etiqueta">{ruta.etiqueta}</p>
                <h3 className="mt-4 text-balance text-t3 leading-[1.2]">{ruta.titulo}</h3>
                <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
                  {ruta.gancho}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-menudo font-semibold text-institucional">
                  {ruta.accion}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* El problema, en tres datos */}
      <Seccion tono="hondo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <EncabezadoSeccion
            etiqueta={problema.etiqueta}
            titulo={problema.titulo}
            entrada={problema.entrada}
            alineacion="izquierda"
          />

          <GrupoRevelar as="ul" total={problema.datos.length} className="lg:pt-2">
            {problema.datos.map((dato) => (
              <ElementoRevelar
                as="li"
                key={dato.descripcion}
                className="border-t border-linea py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7"
              >
                <p className="whitespace-nowrap font-display text-t1 font-bold leading-none text-institucional">
                  {dato.valor}
                </p>
                <p className="justificado mt-4 max-w-[42ch] text-cuerpo text-tinta-suave">
                  {dato.descripcion}
                </p>
                <p className="mt-3 text-menudo text-gris">{dato.fuente}</p>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* Preguntas frecuentes */}
      <Seccion tono="hondo">
        <PreguntasFrecuentes />
      </Seccion>

      {/* Cierre: contacto */}
      <Seccion id="contacto">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <EncabezadoSeccion
              etiqueta="Contacto"
              titulo="Empecemos por una conversación."
              entrada="Cuéntanos la situación y te decimos con franqueza si podemos ayudar y cómo. Si no somos el servicio adecuado, también lo decimos."
            />
            <Revelar retraso={0.08} className="mt-8">
              <p className="text-menudo text-gris">
                ¿Prefieres ver antes los programas?{' '}
                <Link
                  href="/talleres"
                  className="text-institucional underline underline-offset-4"
                >
                  Talleres
                </Link>
                {' · '}
                <Link
                  href="/colegios"
                  className="text-institucional underline underline-offset-4"
                >
                  Colegios
                </Link>
              </p>
            </Revelar>
          </div>

          <Revelar retraso={0.06}>
            <FormularioInteligente />
          </Revelar>
        </div>
      </Seccion>
    </>
  );
}
