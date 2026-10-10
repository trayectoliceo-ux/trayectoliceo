/**
 * CATÁLOGO COMERCIAL
 * ------------------
 * Precios, alcance y entregables de cada servicio. Es el archivo que se
 * edita cuando cambian las tarifas.
 *
 * `producto` es el identificador que viaja a Mercado Pago. El precio real
 * del cobro se define en el SERVIDOR a partir de ese identificador, nunca
 * a partir de lo que llega del navegador. El importe que aparece aquí es
 * solo para mostrarlo en pantalla.
 */

export type Servicio = {
  id: string;
  etiqueta: string;
  titulo: string;
  precio: string;
  precioNota?: string;
  resumen: string;
  alcance: string;
  entregable: string;
  incluye: string[];
  /** Con `producto` se cobra en línea; sin él, se agenda por contacto. */
  producto?: string;
  accion: string;
  destacado?: boolean;
};

/* ------------------------------------------------------------------ */
/* Tamizaje y valoración                                              */
/* ------------------------------------------------------------------ */

export const tamizaje = {
  etiqueta: 'Detección',
  titulo: 'Empieza por saber si hay algo que mirar.',
  entrada:
    'El tamizaje no diagnostica: señala a quién conviene evaluar a fondo. Es rápido, barato y evita que una familia pague una valoración completa que quizá no necesita.',

  servicios: [
    {
      id: 'tamizaje-padres',
      etiqueta: 'Para familias',
      titulo: 'Tamizaje digital para padres',
      precio: '$290 MXN',
      precioNota: 'Pago único, en línea',
      resumen:
        'Cuestionario normado que contestas tú, desde casa, sobre el comportamiento y el aprendizaje de tu hijo.',
      alcance: 'En línea · 20 minutos aproximadamente',
      entregable: 'Reporte de alertas de aprendizaje y desarrollo en 24 horas',
      incluye: [
        'Cuestionario normado por edad',
        'Reporte de alertas en 24 horas',
        'Recomendación clara de si conviene derivar',
        'Sin compromiso de continuar con nosotros',
      ],
      producto: 'tamizaje-padres',
      accion: 'Comprar tamizaje',
      destacado: true,
    },
    {
      id: 'tamizaje-aula',
      etiqueta: 'Para colegios',
      titulo: 'Tamizaje de aula',
      precio: '$150 MXN',
      precioNota: 'Por alumno · Kit de cortesía para el primer grupo',
      resumen:
        'Aplicación grupal en el centro para identificar, en una sola sesión, a qué alumnos conviene mirar de cerca.',
      alcance: 'Presencial en el centro · 15 a 20 minutos por grupo',
      entregable: 'Mapa de semáforo por grupo',
      incluye: [
        'Indicadores observacionales y funciones ejecutivas',
        'Escalas de riesgo y de talento',
        'Verde: sin indicadores de atención',
        'Amarillo: alerta de aprendizaje',
        'Azul: indicador de alta capacidad',
      ],
      accion: 'Solicitar kit de cortesía',
    },
    {
      id: 'valoracion-integral',
      etiqueta: 'Evaluación completa',
      titulo: 'Valoración diagnóstica integral',
      precio: '$1,500 a $2,500 MXN',
      precioNota: 'Según instrumentos aplicados',
      resumen:
        'Evaluación clínica a fondo, aplicada por un psicólogo titulado de la red, cuando el tamizaje indica que hace falta.',
      alcance: 'Presencial · Varias sesiones con el menor y con la familia',
      entregable: 'Informe psicopedagógico firmado, con folio verificable',
      incluye: [
        'Entrevista con la familia e historia de desarrollo',
        'Aplicación de instrumentos formales',
        'Informe elaborado con apoyo de PsicoMetrics',
        'Sesión de entrega y explicación de resultados',
        'Pautas concretas para casa y para el colegio',
      ],
      accion: 'Agendar valoración',
    },
  ] satisfies Servicio[],

  /**
   * Aclaración obligatoria. El tamizaje se vende en línea y sin
   * intervención profesional previa: decir con precisión qué es y qué no
   * es evita malentendidos y protege legalmente.
   */
  aviso:
    'El tamizaje es una herramienta de detección, no un diagnóstico. Ningún reporte de tamizaje afirma que un menor tenga o no una condición: señala si conviene una evaluación formal, que siempre realiza un profesional acreditado.',
};

/* ------------------------------------------------------------------ */
/* Academia                                                            */
/* ------------------------------------------------------------------ */

export const academia = {
  etiqueta: 'Academia',
  titulo: 'Formación para quien detecta y para quien evalúa.',
  entrada:
    'Cursos cortos, programas institucionales y formación de posgrado. Las sesiones son en vivo y el material queda disponible en el campus.',

  /** [CONECTAR] URL del LMS cuando esté desplegado. */
  urlCampus: '#',
  avisoCampus:
    'El campus en línea está en construcción. Mientras tanto, la inscripción y el acceso al material se gestionan por correo.',

  /**
   * [VERIFICAR ANTES DE PUBLICAR]
   * Este texto afirma reconocimiento oficial. Solo debe publicarse si
   * Gebenz cuenta con el registro correspondiente ante la autoridad
   * educativa, y conviene indicar el número de registro. Si no existe,
   * la redacción correcta es «constancia de participación» sin más.
   */
  constancias:
    '[PENDIENTE DE VERIFICAR: indicar aquí el reconocimiento real y su número de registro]',
};

export const cursos: Servicio[] = [
  {
    id: 'curso-deteccion-aula',
    etiqueta: 'Curso · 20 horas',
    titulo: 'Detección en el aula para docentes',
    precio: '$1,800 MXN',
    precioNota: 'Por participante · Grupo cerrado hasta 15 docentes: $18,000 MXN',
    resumen:
      'Qué se puede observar desde el aula, qué no, y en qué momento exacto corresponde derivar.',
    alcance: '5 sesiones · En línea o presencial en el centro',
    entregable: 'Constancia de participación por docente',
    incluye: [
      'Indicadores observables por ciclo escolar',
      'Perfiles que se pasan por alto',
      'Límite del rol docente',
      'Protocolo de derivación',
    ],
    producto: 'curso-deteccion-aula',
    accion: 'Inscribirme',
  },
  {
    id: 'curso-informe',
    etiqueta: 'Curso · 16 horas',
    titulo: 'Redacción del informe psicopedagógico',
    precio: '$2,200 MXN',
    precioNota: 'Por participante · Requiere cédula profesional',
    resumen:
      'Un informe que la familia entiende y que el centro escolar puede convertir en decisiones.',
    alcance: '4 sesiones sincrónicas en línea',
    entregable: 'Constancia de participación',
    incluye: [
      'Estructura y extensión razonable',
      'Precisión técnica sin jerga innecesaria',
      'Recomendaciones aplicables por el centro',
      'Ética, confidencialidad y resguardo',
    ],
    producto: 'curso-informe',
    accion: 'Inscribirme',
  },
];

export const diplomado: Servicio = {
  id: 'diplomado-altas-capacidades',
  etiqueta: 'Diplomado · 120 horas',
  titulo: 'Detección y evaluación de altas capacidades',
  precio: '$12,500 MXN',
  precioNota: 'O 5 parcialidades de $2,700 MXN',
  resumen:
    'El programa completo: de los modelos teóricos a la redacción del informe y la devolución a la familia.',
  alcance: '6 módulos · 5 meses · En línea con sesiones sincrónicas semanales',
  entregable: 'Constancia emitida por Gebenz Consultoría y Negocios, S.A. de C.V.',
  incluye: [
    'Marcos teóricos y sus consecuencias prácticas',
    'Detección en el aula y sesgos de nominación',
    'Instrumentos, perfiles atípicos y doble excepcionalidad',
    'Interpretación e integración de datos',
    'Informe y devolución a la familia',
    'Respuesta educativa y seguimiento',
  ],
  producto: 'diplomado-altas-capacidades',
  accion: 'Inscribirme',
  destacado: true,
};

export const programasInstitucionales: Servicio[] = [
  {
    id: 'capacitacion-docente',
    etiqueta: 'Alcance puntual',
    titulo: 'Capacitación docente',
    precio: '$25,000 a $45,000 MXN',
    precioNota: 'Según el tamaño del equipo docente',
    resumen: 'Formación del equipo en el propio centro, con fecha de inicio y de cierre.',
    alcance: '20 a 40 horas · Presencial o en línea',
    entregable: 'Constancia de participación por docente',
    incluye: [
      'Formación completa del equipo docente',
      'Material de trabajo para el centro',
      'Sin auditoría ni revisión posterior',
      'Se contrata por una sola ocasión',
    ],
    accion: 'Solicitar propuesta',
  },
  {
    id: 'escuela-identifica-talento',
    etiqueta: 'Alcance institucional',
    titulo: 'Escuela que identifica talento',
    precio: '$65,000 a $95,000 MXN',
    precioNota: 'Anual, según tamaño del centro',
    resumen:
      'Cambia el procedimiento del centro, no solo la formación del equipo. Se revisa cada ciclo escolar.',
    alcance: 'Un ciclo escolar completo · Cuatro fases',
    entregable: 'Sello de vigencia anual y protocolo propio del centro',
    incluye: [
      'Auditoría inicial del procedimiento vigente',
      'Formación completa del equipo docente',
      'Protocolo de derivación documentado y propio',
      'Sello de vigencia anual, sujeto a revisión',
      'Acompañamiento durante el ciclo escolar',
    ],
    accion: 'Agendar reunión',
    destacado: true,
  },
];

/* ------------------------------------------------------------------ */
/* Licenciatura                                                        */
/* ------------------------------------------------------------------ */

/**
 * [BLOQUEANTE — NO PUBLICAR SIN RESOLVER]
 * En México, ofrecer una licenciatura exige Reconocimiento de Validez
 * Oficial de Estudios (RVOE) o el acuerdo estatal equivalente. Anunciar
 * inscripción a un programa sin ese registro es una infracción seria.
 *
 * Mientras no exista el RVOE, este bloque debe describir una LISTA DE
 * INTERÉS, no una inscripción, y no debe recibir pagos. Así está montado.
 */
export const licenciatura = {
  etiqueta: 'Próxima apertura',
  titulo: 'Licenciatura en Psicología, en línea',
  entrada:
    'Programa en preparación, diseñado para quien trabaja entre semana. Estamos formando la lista de interés de la primera generación.',
  datos: [
    { etiqueta: 'Modalidad', valor: 'En línea con sesiones en vivo' },
    { etiqueta: 'Sesiones', valor: 'Sábados de 8:00 a 12:30 h' },
    { etiqueta: 'Carga', valor: '6 materias por cuatrimestre, más veranos' },
    { etiqueta: 'Inicio', valor: '[Por confirmar]' },
    { etiqueta: 'Registro oficial', valor: '[RVOE en trámite — verificar antes de publicar]' },
  ],
  aviso:
    'Apartar lugar no genera obligación de pago ni garantiza inscripción. Te avisaremos en cuanto se confirmen fechas, plan de estudios y registro oficial del programa.',
  accion: 'Apartar mi lugar',
};

/* ------------------------------------------------------------------ */
/* Red de psicólogos                                                   */
/* ------------------------------------------------------------------ */

export const red = {
  etiqueta: 'Red de profesionales',
  titulo: 'Afíliate a la red y recibe derivaciones.',
  entrada:
    'Las familias que detectamos necesitan quien las evalúe. Si tienes cédula y trabajas en evaluación psicopedagógica, te derivamos casos y te damos la plataforma para resolverlos.',
  puntos: [
    'Afiliación sin costo',
    'Derivación de casos de tu zona',
    'Acceso a PsicoMetrics para emisión de informes',
    'Aparición en el directorio de la red',
  ],
  accion: 'Afiliarme a la red',
};

/* ------------------------------------------------------------------ */
/* Promociones rotativas de portada                                    */
/* ------------------------------------------------------------------ */

/**
 * Cinta superior de la portada. Rota entre las tres líneas de negocio.
 * Editar aquí para cambiar la campaña activa.
 */
export const promociones = [
  {
    etiqueta: 'Diplomado',
    texto: 'Detección y evaluación de altas capacidades · 120 horas en línea',
    enlace: '/academia',
    accion: 'Ver programa',
  },
  {
    etiqueta: 'Cursos',
    texto: 'Detección en el aula para docentes · Grupos cerrados para colegios',
    enlace: '/academia',
    accion: 'Ver cursos',
  },
  {
    etiqueta: 'Red de psicólogos',
    texto: 'Afíliate sin costo, recibe derivaciones y usa PsicoMetrics',
    enlace: '/contacto',
    accion: 'Afiliarme',
  },
];
