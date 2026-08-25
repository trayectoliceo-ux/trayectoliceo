/**
 * CONTENIDO INSTITUCIONAL
 * -----------------------
 * Programas para colegios, orientación de trayectoria, nosotros y recursos.
 * Los campos entre corchetes deben sustituirse antes de publicar.
 */

/* ------------------------------------------------------------------ */
/* Programas para colegios                                            */
/* ------------------------------------------------------------------ */

export const colegios = {
  etiqueta: 'Programas para colegios',
  titulo: 'Un claustro que sabe mirar identifica antes que cualquier prueba.',
  entrada:
    'Trabajamos con dos alcances distintos y conviene no confundirlos: una capacitación resuelve la formación del equipo; una certificación cambia el procedimiento del centro y se revisa cada año.',

  comparativa: {
    capacitacion: {
      etiqueta: 'Alcance puntual',
      titulo: 'Capacitación docente',
      resumen: 'Formación del equipo en el propio centro, con fecha de inicio y de cierre.',
      puntos: [
        'De 20 a 40 horas según el tamaño del claustro',
        'Presencial en el centro o en línea',
        'Constancia de participación por docente',
        'Sin auditoría ni revisión posterior',
        'Se contrata por una sola ocasión',
      ],
      precio: '[$00,000 MXN según número de docentes]',
    },
    certificacion: {
      etiqueta: 'Alcance institucional',
      titulo: 'Escuela que identifica talento',
      resumen:
        'Revisión del procedimiento del centro, formación del claustro, protocolo de derivación y sello anual renovable.',
      puntos: [
        'Auditoría inicial del procedimiento vigente',
        'Formación completa del claustro',
        'Protocolo de derivación documentado y propio del centro',
        'Sello de vigencia anual, sujeto a revisión',
        'Acompañamiento durante el ciclo escolar',
      ],
      precio: '[$000,000 MXN anuales]',
    },
  },

  fases: [
    {
      numero: '01',
      titulo: 'Diagnóstico',
      duracion: '[2 a 3 semanas]',
      descripcion:
        'Revisamos qué hace hoy el centro cuando aparece un caso: quién lo detecta, a quién se lo comunica y qué ocurre después. Entregamos un informe con los puntos donde el procedimiento se rompe.',
    },
    {
      numero: '02',
      titulo: 'Formación del claustro',
      duracion: '[6 a 8 semanas]',
      descripcion:
        'Capacitación de docentes y equipo de orientación en detección, indicadores observables y límites del rol docente. Sesiones por ciclo escolar, no una conferencia general.',
    },
    {
      numero: '03',
      titulo: 'Protocolo de derivación',
      duracion: '[3 a 4 semanas]',
      descripcion:
        'Redactamos con el centro su propio procedimiento: formatos de registro, responsables, plazos y ruta de derivación al profesional que evalúa. Queda como documento interno del colegio.',
    },
    {
      numero: '04',
      titulo: 'Certificación y renovación',
      duracion: 'Anual',
      descripcion:
        'Verificación del cumplimiento y emisión del sello por un ciclo escolar. La renovación exige evidencia de aplicación, no solo la contratación del año siguiente.',
    },
  ],

  obtiene: [
    'Informe diagnóstico del procedimiento actual del centro',
    'Claustro formado, con constancia por docente',
    'Protocolo de derivación documentado y propiedad del colegio',
    'Sello «Escuela que identifica talento» con vigencia de un ciclo escolar',
    'Acompañamiento durante la implementación',
    'Material de comunicación para familias',
  ],

  accion: {
    titulo: 'Agendar una reunión',
    texto:
      'La conversación inicial es sin costo y sirve para decidir cuál de los dos alcances corresponde al centro. No hay contratación en línea.',
  },
};

/* ------------------------------------------------------------------ */
/* Orientación de trayectoria                                          */
/* ------------------------------------------------------------------ */

export const trayectoria = {
  etiqueta: 'Orientación de trayectoria',
  titulo: 'Decidir con información, no con la presión del calendario.',
  entrada:
    'Acompañamiento en las decisiones académicas que marcan el recorrido: elección de bachillerato, especialización, adelanto de curso y transición a la universidad.',

  incluye: [
    {
      titulo: 'Mapa de opciones',
      descripcion:
        'Alternativas reales según perfil, ubicación y presupuesto familiar, con sus requisitos y plazos de admisión.',
    },
    {
      titulo: 'Sesiones con la familia',
      descripcion:
        'Trabajo conjunto con el estudiante y con quienes deciden, por separado y en común. Las expectativas suelen no coincidir y conviene verlo antes.',
    },
    {
      titulo: 'Preparación de la candidatura',
      descripcion:
        'Calendario de admisión, documentación y preparación de entrevistas o exámenes según destino.',
    },
    {
      titulo: 'Seguimiento del primer año',
      descripcion:
        'Revisión de la adaptación al nuevo entorno y ajuste de la decisión si hace falta.',
    },
  ],

  /**
   * DECLARACIÓN DE CONFLICTO DE INTERÉS
   * Debe permanecer visible en la página. Sustituir el nombre de la
   * institución. Si el convenio cambia o termina, actualizar de inmediato.
   */
  declaracion: {
    titulo: 'Declaración de conflicto de interés',
    parrafos: [
      'Mantenemos convenio de canalización con [Universidad] y percibimos una comisión por cada estudiante que se inscribe a través de ese convenio.',
      'La orientación de trayectoria es un servicio independiente de cualquier evaluación psicopedagógica. Ninguna evaluación realizada o derivada por Trayecto Liceo condiciona la recomendación de una institución, y el mapa de opciones incluye alternativas con las que no tenemos convenio alguno.',
      'Si en algún momento considera que esta relación afecta la orientación recibida, puede solicitarnos por escrito el detalle del convenio.',
    ],
  },

  precio: '[$00,000 MXN por proceso completo]',
  duracion: '[3 a 6 meses según destino]',
};

/* ------------------------------------------------------------------ */
/* Nosotros                                                            */
/* ------------------------------------------------------------------ */

export const nosotros = {
  etiqueta: 'Nosotros',
  titulo: 'Un método declarado es un método que se puede discutir.',
  entrada:
    'Trayecto Liceo es la marca de formación y acompañamiento en detección y desarrollo del talento infantil, operada por Gebenz Consultoría y Negocios, S.A. de C.V.',

  enfoque: [
    {
      titulo: 'La capacidad no es un puntaje',
      descripcion:
        'Un resultado de prueba es un dato entre varios. Integramos observación en aula, historial escolar y entrevista familiar antes de afirmar nada.',
    },
    {
      titulo: 'Detección y evaluación son cosas distintas',
      descripcion:
        'El docente detecta indicadores; el profesional acreditado evalúa. Confundir ambas funciones produce diagnósticos improvisados y familias mal informadas.',
    },
    {
      titulo: 'El enriquecimiento es contenido, no aceleración',
      descripcion:
        'Adelantar temario resuelve poco. Profundizar en problemas sin respuesta única es lo que ofrece resistencia real al alumno.',
    },
  ],

  /**
   * [VERIFICAR] Marcos teóricos que efectivamente se enseñan y citan en los
   * programas. Esta lista es lo que un profesional revisa para decidir si
   * la formación tiene fundamento. No incluir marcos que no se trabajen.
   */
  marcos: [
    {
      nombre: 'Modelo de los tres anillos',
      autor: 'Renzulli',
      nota: 'Capacidad, creatividad y compromiso con la tarea como conjunto interactuante.',
    },
    {
      nombre: 'Modelo diferenciado de dotación y talento (DMGT)',
      autor: 'Gagné',
      nota: 'Distinción entre aptitud natural y talento desarrollado mediante proceso.',
    },
    {
      nombre: 'Teoría pentagonal implícita',
      autor: 'Sternberg',
      nota: 'Criterios de excelencia, rareza, productividad, demostrabilidad y valor.',
    },
    {
      nombre: 'Modelo de superdotación y talento',
      autor: 'Castelló y Batlle',
      nota: 'Perfiles de talento simple y complejo aplicados a población hispanohablante.',
    },
    {
      nombre: 'Enriquecimiento escolar (SEM)',
      autor: 'Renzulli y Reis',
      nota: 'Estructura de enriquecimiento por niveles aplicable en centro ordinario.',
    },
  ],

  /**
   * [COMPLETAR] Equipo real, con formación acreditable. Sin cédula
   * profesional visible no debe publicarse a nadie como evaluador.
   */
  equipo: [
    {
      nombre: '[Nombre y apellidos]',
      cargo: '[Dirección académica]',
      formacion: '[Formación y cédula profesional]',
      nota: '[Una línea sobre su trayectoria]',
      marcador: 'Retrato de tres cuartos, luz natural, fondo neutro',
    },
    {
      nombre: '[Nombre y apellidos]',
      cargo: '[Coordinación de evaluación]',
      formacion: '[Formación y cédula profesional]',
      nota: '[Una línea sobre su trayectoria]',
      marcador: 'Retrato de tres cuartos, luz natural, fondo neutro',
    },
    {
      nombre: '[Nombre y apellidos]',
      cargo: '[Coordinación de talleres]',
      formacion: '[Formación]',
      nota: '[Una línea sobre su trayectoria]',
      marcador: 'Retrato de tres cuartos, luz natural, fondo neutro',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Recursos                                                            */
/* ------------------------------------------------------------------ */

export type Articulo = {
  slug: string;
  titulo: string;
  entradilla: string;
  categoria: string;
  fecha: string;
  lectura: string;
  autor: string;
  /** Cuerpo en párrafos. Sustituir por el contenido definitivo o por MDX. */
  cuerpo: string[];
};

export const articulos: Articulo[] = [
  {
    slug: 'detectar-no-es-diagnosticar',
    titulo: 'Detectar no es diagnosticar',
    entradilla:
      'Dónde termina la observación del docente y por qué llevarla más allá perjudica al alumno.',
    categoria: 'Detección',
    fecha: '[Fecha de publicación]',
    lectura: '[0] min de lectura',
    autor: '[Autor]',
    cuerpo: [
      '[Contenido pendiente. Esta plantilla queda lista para recibir el texto definitivo.]',
      '[Segundo párrafo de ejemplo para verificar la medida de línea, el interlineado y el ritmo tipográfico del cuerpo de texto.]',
    ],
  },
  {
    slug: 'el-alumno-que-aprueba-y-nadie-mira',
    titulo: 'El alumno que aprueba y nadie mira',
    entradilla:
      'El rendimiento suficiente es la forma más eficaz de pasar desapercibido durante toda la escolaridad.',
    categoria: 'Aula',
    fecha: '[Fecha de publicación]',
    lectura: '[0] min de lectura',
    autor: '[Autor]',
    cuerpo: ['[Contenido pendiente.]'],
  },
  {
    slug: 'que-preguntar-en-la-primera-reunion-con-el-colegio',
    titulo: 'Qué preguntar en la primera reunión con el colegio',
    entradilla:
      'Una guía breve para familias que van a plantear el tema por primera vez en el centro.',
    categoria: 'Familias',
    fecha: '[Fecha de publicación]',
    lectura: '[0] min de lectura',
    autor: '[Autor]',
    cuerpo: ['[Contenido pendiente.]'],
  },
];

export const materiales = [
  {
    titulo: 'Guía de indicadores observables en el aula',
    formato: 'PDF · [00] páginas',
    dirigidoA: 'Docentes y tutores',
    descripcion:
      'Listado de comportamientos observables organizados por ciclo escolar, con espacio para registro.',
    /** [CONECTAR] Ruta del archivo una vez que exista el backend de entrega. */
    archivo: '#',
  },
  {
    titulo: 'Preguntas frecuentes de familias',
    formato: 'PDF · [00] páginas',
    dirigidoA: 'Familias',
    descripcion:
      'Qué esperar de una evaluación, cuánto dura, qué no puede concluirse y cómo leer un informe.',
    archivo: '#',
  },
];

export const recursosPagina = {
  etiqueta: 'Recursos',
  titulo: 'Material de trabajo, no material promocional.',
  entrada:
    'Publicamos lo que usamos en formación. Los materiales descargables se entregan por correo electrónico para poder avisar cuando se actualizan.',
};
