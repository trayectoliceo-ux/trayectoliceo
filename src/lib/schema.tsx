import { sitio } from '@/content/sitio';

/**
 * DATOS ESTRUCTURADOS (JSON-LD)
 * -----------------------------
 * Es lo que permite que Google entienda qué es cada página en vez de
 * adivinarlo del texto. Habilita el panel de conocimiento de la
 * organización, la ficha local con dirección y mapa, y las tarjetas de
 * curso en resultados de búsqueda.
 *
 * Se puede validar en https://search.google.com/test/rich-results
 */

/**
 * Componente que inyecta un bloque JSON-LD. Se usa dentro de cualquier
 * página del servidor; no requiere JavaScript en el cliente.
 */
export function DatosEstructurados({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es un objeto propio serializado, no entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}

const ID_ORGANIZACION = `${sitio.dominio}/#organizacion`;

/**
 * Organización educativa con ficha local. Es la base: el resto de los
 * bloques la referencian por `@id` en lugar de repetir los datos.
 */
export function organizacion() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': ID_ORGANIZACION,
    name: sitio.nombre,
    legalName: sitio.operadora,
    description: sitio.descripcionMeta,
    slogan: sitio.descriptor,
    url: sitio.dominio,
    logo: `${sitio.dominio}/logotipo-trayecto-liceo.png`,
    image: `${sitio.dominio}/og.png`,
    email: sitio.contacto.correo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '31 Poniente 4128',
      addressLocality: 'Puebla',
      addressRegion: 'Puebla',
      postalCode: sitio.contacto.codigoPostal,
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: sitio.contacto.latitud,
      longitude: sitio.contacto.longitud,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Puebla, México',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: sitio.redes.map((red) => red.url),
    knowsAbout: [
      'Altas capacidades intelectuales',
      'Detección de talento infantil',
      'Evaluación psicopedagógica',
      'Enriquecimiento educativo STEAM',
    ],
  };
}

/** Sitio web, con la caja de búsqueda desactivada por no existir buscador. */
export function sitioWeb() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${sitio.dominio}/#sitio`,
    url: sitio.dominio,
    name: sitio.nombre,
    inLanguage: 'es-MX',
    publisher: { '@id': ID_ORGANIZACION },
  };
}

/**
 * Curso o taller. `Course` sin `hasCourseInstance` genera advertencias en
 * el validador, así que se incluye la modalidad como instancia.
 */
export function curso({
  nombre,
  descripcion,
  ruta,
  modalidad,
  duracion,
}: {
  nombre: string;
  descripcion: string;
  ruta: string;
  modalidad: string;
  duracion?: string;
}) {
  const enLinea = /línea|linea|online/i.test(modalidad);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: nombre,
    description: descripcion,
    url: `${sitio.dominio}${ruta}`,
    inLanguage: 'es-MX',
    provider: { '@id': ID_ORGANIZACION },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: enLinea ? 'online' : 'onsite',
      courseWorkload: duracion,
      location: enLinea
        ? undefined
        : {
            '@type': 'Place',
            name: sitio.nombre,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '31 Poniente 4128',
              addressLocality: 'Puebla',
              addressRegion: 'Puebla',
              addressCountry: 'MX',
            },
          },
    },
  };
}

/** Miga de pan: Google la usa para sustituir la URL cruda en resultados. */
export function migaDePan(pasos: { titulo: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pasos.map((paso, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: paso.titulo,
      item: `${sitio.dominio}${paso.ruta}`,
    })),
  };
}

/** Preguntas frecuentes. Solo válido si las preguntas se ven en la página. */
export function preguntasFrecuentes(preguntas: { pregunta: string; respuesta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((elemento) => ({
      '@type': 'Question',
      name: elemento.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: elemento.respuesta },
    })),
  };
}

/** Artículo del blog. */
export function articulo({
  titulo,
  descripcion,
  ruta,
  autor,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  autor: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titulo,
    description: descripcion,
    url: `${sitio.dominio}${ruta}`,
    inLanguage: 'es-MX',
    author: { '@type': 'Person', name: autor },
    publisher: { '@id': ID_ORGANIZACION },
  };
}
