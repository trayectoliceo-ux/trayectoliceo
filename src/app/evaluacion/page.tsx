import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { Seccion } from '@/components/ui/Piezas';
import { ElementoRevelar, GrupoRevelar, Revelar } from '@/components/ui/Revelar';
import { TarjetaProducto } from '@/components/ui/TarjetaProducto';
import { LlamadaContacto } from '@/components/ui/LlamadaContacto';
import { evaluacion } from '@/content/precios';
import { metadatos } from '@/lib/metadatos';
import { DatosEstructurados, migaDePan } from '@/lib/schema';

export const metadata = metadatos({
  titulo: 'Tamizaje y evaluación psicopedagógica en Puebla',
  descripcion:
    'Tamizaje digital para familias desde $290 MXN, tamizaje de aula para colegios y valoración diagnóstica integral con psicólogo titulado.',
  ruta: '/evaluacion',
});

export default function PaginaEvaluacion() {
  return (
    <>
      <DatosEstructurados
        datos={migaDePan([
          { titulo: 'Inicio', ruta: '/' },
          { titulo: 'Evaluación', ruta: '/evaluacion' },
        ])}
      />

      <CabeceraPagina
        etiqueta={evaluacion.etiqueta}
        titulo={evaluacion.titulo}
        entrada={evaluacion.entrada}
        aviso="El tamizaje es un primer filtro, no un diagnóstico. Si el resultado no indica riesgo, te lo decimos y ahí termina el gasto."
      />

      <Seccion>
        <GrupoRevelar
          total={evaluacion.productos.length}
          className="grid items-stretch gap-6 lg:grid-cols-3"
        >
          {evaluacion.productos.map((producto) => (
            <ElementoRevelar key={producto.id}>
              <TarjetaProducto producto={producto} />
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      {/* Qué significa cada color del semáforo escolar */}
      <Seccion tono="hondo">
        <Revelar>
          <p className="etiqueta">Tamizaje de aula</p>
          <h2 className="mt-5 max-w-[20ch] text-t1">Un mapa de semáforo por grupo.</h2>
          <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave justificado">
            El centro recibe una vista por grupo con tres categorías. No es un
            diagnóstico por alumno: señala a quién conviene mirar de cerca y en qué
            dirección.
          </p>
        </Revelar>

        <GrupoRevelar total={3} className="mt-12 grid items-stretch gap-4 sm:grid-cols-3">
          {[
            {
              color: 'bg-menta',
              titulo: 'Verde',
              subtitulo: 'Sin indicadores de riesgo',
              texto:
                'El desempeño y los indicadores observacionales están dentro de lo esperado para su edad y grado.',
            },
            {
              color: 'bg-sello-claro',
              titulo: 'Amarillo',
              subtitulo: 'Alerta de aprendizaje',
              texto:
                'Aparecen señales que conviene explorar. Recomienda valoración individual antes de tomar decisiones.',
            },
            {
              color: 'bg-institucional',
              titulo: 'Azul',
              subtitulo: 'Indicador de alta capacidad',
              texto:
                'El perfil sugiere capacidad por encima de lo esperado. Requiere evaluación formal para confirmarlo.',
            },
          ].map((nivel) => (
            <ElementoRevelar
              as="article"
              key={nivel.titulo}
              className="flex h-full flex-col rounded-lg border border-linea bg-papel-puro p-7 text-center shadow-tarjeta"
            >
              <span
                aria-hidden
                className={`mx-auto block h-2 w-12 rounded-full ${nivel.color}`}
              />
              <h3 className="mt-5 text-entrada">{nivel.titulo}</h3>
              <p className="mt-1 text-menudo font-semibold text-institucional">
                {nivel.subtitulo}
              </p>
              <p className="mt-3 text-menudo leading-[1.7] text-tinta-suave justificado">
                {nivel.texto}
              </p>
            </ElementoRevelar>
          ))}
        </GrupoRevelar>
      </Seccion>

      <LlamadaContacto
        titulo="¿No sabes por dónde empezar?"
        texto="Escríbenos con la edad del menor y lo que observas. Te decimos qué nivel corresponde, o si de momento no hace falta ninguno."
        accion="Escribir a Trayecto Liceo"
      />
    </>
  );
}
