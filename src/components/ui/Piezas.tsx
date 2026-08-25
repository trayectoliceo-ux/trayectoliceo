import type { ReactNode } from 'react';
import { Revelar } from './Revelar';

/**
 * Encabezado de sección. La etiqueta en monoespaciada es el hilo conductor
 * del sitio: identifica cada bloque como una entrada de expediente.
 */
export function EncabezadoSeccion({
  etiqueta,
  titulo,
  entrada,
  ancho = 'lectura',
  className = '',
}: {
  etiqueta: string;
  titulo: string;
  entrada?: string;
  ancho?: 'lectura' | 'ancho';
  className?: string;
}) {
  return (
    <Revelar as="header" className={`${className}`}>
      <p className="etiqueta">{etiqueta}</p>
      <h2
        className={`mt-5 text-t2 sm:text-t1 ${
          ancho === 'lectura' ? 'max-w-[22ch]' : 'max-w-[30ch]'
        }`}
      >
        {titulo}
      </h2>
      {entrada ? (
        <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">{entrada}</p>
      ) : null}
    </Revelar>
  );
}

/**
 * Marcador de imagen descrito. Sustituir por `next/image` con el archivo
 * definitivo manteniendo la misma proporción para que nada salte al cargar.
 */
export function Marcador({
  descripcion,
  proporcion = '4 / 3',
  tono = 'claro',
  className = '',
}: {
  descripcion: string;
  proporcion?: string;
  tono?: 'claro' | 'oscuro';
  className?: string;
}) {
  const fondo =
    tono === 'claro'
      ? 'bg-papel-hondo text-gris border-linea'
      : 'bg-institucional/20 text-papel/60 border-linea-oscura';

  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${descripcion}`}
      style={{ aspectRatio: proporcion }}
      className={`relative flex w-full items-end overflow-hidden rounded border ${fondo} ${className}`}
    >
      {/* Retícula tenue: sugiere encuadre sin competir con el contenido. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 78%)',
        }}
      />
      <p className="relative m-5 max-w-[36ch] font-mono text-etiqueta uppercase leading-[1.5]">
        {descripcion}
      </p>
    </div>
  );
}

/** Bloque de metadato: par etiqueta / valor usado en fichas de programa. */
export function Metadato({
  etiqueta,
  children,
  tono = 'claro',
}: {
  etiqueta: string;
  children: ReactNode;
  tono?: 'claro' | 'oscuro';
}) {
  return (
    <div
      className={`border-t py-3.5 ${tono === 'claro' ? 'border-linea' : 'border-linea-oscura'}`}
    >
      <dt className="etiqueta">{etiqueta}</dt>
      <dd
        className={`mt-1.5 text-menudo ${tono === 'claro' ? 'text-tinta' : 'text-papel'}`}
      >
        {children}
      </dd>
    </div>
  );
}

/** Contenedor de sección con el ritmo vertical del sitio. */
export function Seccion({
  children,
  className = '',
  id,
  tono = 'papel',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tono?: 'papel' | 'hondo' | 'oscuro' | 'tinta';
}) {
  const fondos = {
    papel: 'bg-papel',
    hondo: 'bg-papel-hondo',
    oscuro: 'bg-institucional text-papel sobre-oscuro',
    tinta: 'bg-tinta text-papel sobre-oscuro',
  };

  return (
    <section
      id={id}
      className={`py-seccion lg:py-seccion-lg ${fondos[tono]} ${className}`}
    >
      <div className="contenedor">{children}</div>
    </section>
  );
}
