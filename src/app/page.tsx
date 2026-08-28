import Link from 'next/link';
import { Portada } from '@/components/inicio/Portada';
import { PromocionesRotativas } from '@/components/inicio/PromocionesRotativas';
import { TarjetaProducto } from '@/components/ui/TarjetaProducto';
import { evaluacion } from '@/content/precios';
import { BloquePsicoMetrics } from '@/components/inicio/BloquePsicoMetrics';
import { FormularioInteligente } from '@/components/contacto/FormularioInteligente';
import { EncabezadoSeccion, Marcador, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { EnlaceTexto } from '@/components/ui/Boton';
import { PreguntasFrecuentes } from '@/components/inicio/PreguntasFrecuentes';
import { metodo, preguntas, problema, pruebaSocial, queHacemos } from '@/content/inicio';
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

      {/* El problema, en tres datos */}
      <Seccion tono="hondo">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <EncabezadoSeccion
            etiqueta={problema.etiqueta}
            titulo={problema.titulo}
            entrada={problema.entrada}
          />

          <GrupoRevelar as="ul" total={problema.datos.length} className="lg:pt-2">
            {problema.datos.map((dato) => (
              <ElementoRevelar
                as="li"
                key={dato.descripcion}
                className="border-t border-linea py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7"
              >
                <p className="font-display text-t1 leading-none text-institucional">
                  {dato.valor}
                </p>
                <p className="mt-4 max-w-[42ch] text-cuerpo text-tinta-suave">
                  {dato.descripcion}
                </p>
                <p className="mt-3 font-mono text-etiqueta uppercase text-gris">
                  {dato.fuente}
                </p>
              </ElementoRevelar>
            ))}
          </GrupoRevelar>
        </div>
      </Seccion>

      {/* Qué hacemos */}
      <Seccion>
        <EncabezadoSeccion
          etiqueta={queHacemos.etiqueta}
          titulo={queHacemos.titulo}
          entrada={queHacemos.entrada}
        />

        <GrupoRevelar
          total={queHacemos.bloques.length}
          className="mt-16 grid items-stretch gap-8 md:grid-cols-3"
        >
          {queHacemos.bloques.map((bloque) => (
            <ElementoRevelar
              as="article"
              key={bloque.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-linea bg-papel-puro shadow-tarjeta transition-shadow duration-300 hover:shadow-elevada"
            >
              <Marcador
                src={bloque.imagen.src}
                descripcion={bloque.imagen.descripcion}
                proporcion="16 / 10"
                className="rounded-none border-0"
              />
              <div className="flex flex-1 flex-col p-7 text-center">
                <p className="etiqueta">{bloque.indice}</p>
                <h3 className="mt-3 text-balance text-t3">{bloque.titulo}</h3>
                <p className="justificado mt-4 flex-1 text-menudo leading-[1.7] text-tinta-suave">
                  {bloque.resumen}
                </p>
                <div className="mt-5 flex justify-center">
                  <EnlaceTexto href={bloque.href}>{bloque.accion}</EnlaceTexto>
                </div>
              </div>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Evaluación con precio y pago */}
      <Seccion tono="hondo">
        <EncabezadoSeccion
          etiqueta={evaluacion.etiqueta}
          titulo={evaluacion.titulo}
          entrada={evaluacion.entrada}
        />
        <GrupoRevelar
          total={evaluacion.productos.length}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {evaluacion.productos.map((producto) => (
            <ElementoRevelar key={producto.id}>
              <TarjetaProducto producto={producto} />
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Cómo trabajamos */}
      <Seccion>
        <EncabezadoSeccion
          etiqueta={metodo.etiqueta}
          titulo={metodo.titulo}
          entrada={metodo.entrada}
        />

        <GrupoRevelar
          as="ol"
          total={metodo.pasos.length}
          className="mt-16 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metodo.pasos.map((paso) => (
            <ElementoRevelar
              as="li"
              key={paso.numero}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 text-center shadow-tarjeta"
            >
              <span className="font-mono text-menudo font-medium text-institucional">
                {paso.numero}
              </span>
              <h3 className="mt-4 text-balance text-entrada">{paso.titulo}</h3>
              <p className="justificado mt-4 text-menudo leading-[1.7] text-tinta-suave">
                {paso.descripcion}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      <BloquePsicoMetrics />

      {/* Prueba social */}
      <Seccion>
        <Revelar>
          <p className="etiqueta">{pruebaSocial.etiqueta}</p>
        </Revelar>

        <GrupoRevelar
          total={pruebaSocial.testimonios.length}
          className="mt-10 grid gap-8 md:grid-cols-2"
        >
          {pruebaSocial.testimonios.map((testimonio, indice) => (
            <ElementoRevelar
              as="article"
              key={indice}
              className="border-t border-linea pt-7"
            >
              <blockquote className="font-display text-entrada leading-[1.5] text-tinta-suave">
                {testimonio.cita}
              </blockquote>
              <footer className="mt-5 text-menudo text-gris">
                <span className="text-tinta">{testimonio.autor}</span> · {testimonio.cargo}
              </footer>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>

        <Revelar className="mt-14">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-linea pt-8">
            {pruebaSocial.logotipos.map((logotipo) => (
              <li key={logotipo} className="font-mono text-etiqueta uppercase text-gris">
                {logotipo}
              </li>
            ))}
          </ul>
        </Revelar>
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
