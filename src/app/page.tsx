import Link from 'next/link';
import { Portada } from '@/components/inicio/Portada';
import { BloquePsicoMetrics } from '@/components/psicometrics/BloquePsicoMetrics';
import { FormularioInteligente } from '@/components/contacto/FormularioInteligente';
import { EncabezadoSeccion, Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';

import { PreguntasFrecuentes } from '@/components/inicio/PreguntasFrecuentes';
import { preguntas } from '@/content/inicio';
import { BloqueDirectorio } from '@/components/ui/BloqueDirectorio';
import { ServiciosInstitucion } from '@/components/ui/ServiciosInstitucion';
import { TarjetaServicio } from '@/components/ui/TarjetaServicio';
import { familias, rutas } from '@/content/rutas';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, organizacion, preguntasFrecuentes, sitioWeb } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Evaluación psicopedagógica para niños y adolescentes',
  descripcion:
    'Evaluación psicopedagógica para niños y adolescentes de 3 a 18 años en Puebla y en línea. Tamizaje escolar, valoración para familias y plataforma para psicólogos.',
  ruta: '/',
});

export default function PaginaInicio() {
  return (
    <>
      <DatosEstructurados datos={organizacion()} />
      <DatosEstructurados datos={sitioWeb()} />
      <DatosEstructurados datos={preguntasFrecuentes(preguntas.lista)} />
      <Portada />

      {/* Los tres servicios para familias. Empezar cuesta $0. */}
      <Seccion tono="hondo">
        <EncabezadoSeccion
          etiqueta="Para familias"
          titulo="Empieza hoy sin pagar nada."
          entrada="Respondes en línea y ves tu resultado orientativo al momento. El informe firmado por un psicólogo con cédula, con folio y código QR, es opcional y se obtiene con una aportación desde $49."
        />

        <GrupoRevelar
          total={familias.productos.length}
          className="mx-auto mt-9 grid max-w-5xl items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {familias.productos.map((servicio) => (
            <ElementoRevelar key={servicio.id} className="h-full">
              <TarjetaServicio servicio={servicio} />
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      <BloqueDirectorio />

      {/* Instituciones: lo mismo, con el énfasis en que aplicar no cuesta. */}
      <Seccion>
        <EncabezadoSeccion
          etiqueta="Para escuelas, preparatorias y universidades"
          titulo="Aplicar es gratis en los tres servicios."
          entrada="Cada alumno ve su resultado al terminar, sin pagar nada. La institución solo cotiza el informe por grupo con folio, si lo quiere."
        />

        <div className="mt-9">
          <ServiciosInstitucion />
        </div>
      </Seccion>

      {/*
        Cuatro públicos, cuatro destinos. Segmentar aquí evita que el
        visitante lea tres secciones que no le hablan a él antes de
        encontrar la suya.
      */}
      <Seccion>
        <GrupoRevelar
          total={rutas.length}
          className="mt-10 grid items-stretch gap-5 sm:grid-cols-2"
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
                <p className="justificado mt-4 flex-1 text-menudo leading-[1.75] text-tinta-suave">
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

      <BloquePsicoMetrics />

      {/* Cierre: contacto */}
      {/*
        Las preguntas van antes del contacto: resuelven las objeciones que
        frenan el primer clic, y quien ya las tiene resueltas escribe con
        una intención mucho más concreta.
      */}
      <Seccion tono="hondo">
        <PreguntasFrecuentes />
      </Seccion>

      <Seccion id="contacto">
        <div className="grid items-stretch gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
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
