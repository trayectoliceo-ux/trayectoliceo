/**
 * CERTIFÍCATE
 * -----------
 * Formación de Trayecto Liceo. Dos figuras que NO son lo mismo y conviene
 * no mezclar nunca en la comunicación:
 *
 *   CURSO         Asincrónico. Se acredita haberlo cursado. Emite
 *                 constancia o diploma de participación. No certifica
 *                 competencia ni tiene validez oficial.
 *
 *   CERTIFICACIÓN Incluye examen aplicado por un experto en sesión en
 *                 línea, grabada para auditoría, y se califica. Al
 *                 aprobarla se emite documento con validez oficial.
 *
 * La diferencia es lo que justifica el precio y lo que evita reclamaciones:
 * quien paga una certificación espera un documento que valga ante terceros,
 * y quien paga un curso espera aprender. Prometer lo primero y entregar lo
 * segundo es la queja más cara que existe en formación.
 *
 * ⚠️ TEMARIOS PENDIENTES DE REVISIÓN
 * Los temarios de este archivo son una propuesta redactada a partir de la
 * estructura habitual de cada programa. Sustituirlos por los definitivos
 * antes de publicar, sobre todo en los módulos que citan normativa.
 */

export type Modulo = {
  numero: string;
  titulo: string;
  /** Para qué sirve el módulo, en una línea. */
  objetivo?: string;
  horas?: string;
  puntos: string[];
};

export type Programa = {
  id: string;
  tipo: 'curso' | 'certificacion';
  nombre: string;
  dirigidoA: string;
  resumen: string;
  duracion: string;
  modalidad: string;
  entrega: string;
  requisito?: string;
  /** Qué sabrá hacer el participante al terminar. Es lo que más vende. */
  resultados?: string[];
  /** Materiales que se entregan y quedan como herramienta de trabajo. */
  incluye?: string[];
  /** Nombre exacto del documento que se emite. */
  nombreCertificacion?: string;
  precio: number;
  precioMiembro: number;
  /** `pago` cobra en línea y da acceso; `escuela` deriva a WhatsApp. */
  destino: 'pago' | 'escuela';
  temario: Modulo[];
};

const PRECIO_CURSO = 1250;
const PRECIO_CERTIFICACION = 1500;
const PRECIO_MIEMBRO = 850;

export const programas: Programa[] = [
  {
    id: 'curso-deteccion-aula',
    tipo: 'curso',
    nombre: 'Detección de altas capacidades y rezago en el aula',
    dirigidoA: 'Docentes, tutores y coordinadores académicos',
    resumen:
      'Qué se observa desde el aula, cómo registrarlo y en qué momento exacto corresponde derivar. Sin instrumentos: el docente detecta, no evalúa.',
    duracion: '20 horas · 5 sesiones',
    modalidad: 'Asincrónico. Avanzas a tu ritmo desde la plataforma',
    entrega: 'Constancia de participación',
    precio: PRECIO_CURSO,
    precioMiembro: PRECIO_MIEMBRO,
    destino: 'pago',
    temario: [
      {
        numero: '01',
        titulo: 'Qué es y qué no es',
        puntos: [
          'Alta capacidad, talento y rendimiento: tres cosas distintas',
          'Ideas frecuentes que retrasan la identificación',
          'Rezago por dificultad frente a rezago por desmotivación',
        ],
      },
      {
        numero: '02',
        titulo: 'Indicadores observables',
        puntos: [
          'Señales por asignatura y por edad',
          'Conducta en el aula: qué mirar y qué descartar',
          'Registro sistemático: formatos y periodicidad',
        ],
      },
      {
        numero: '03',
        titulo: 'Perfiles que se pasan por alto',
        puntos: [
          'El alumno que aprueba y nadie mira',
          'Diferencias en la identificación de niñas',
          'Doble excepcionalidad: alta capacidad con dificultad asociada',
        ],
      },
      {
        numero: '04',
        titulo: 'El límite del rol docente',
        puntos: [
          'Dónde termina la observación y empieza la evaluación',
          'Por qué un docente no aplica instrumentos psicopedagógicos',
          'Cómo plantear el tema a la familia sin alarmar',
        ],
      },
      {
        numero: '05',
        titulo: 'Derivación',
        puntos: [
          'Cómo se documenta un caso para que la derivación sirva',
          'A quién se entrega y con qué soporte',
          'Seguimiento del caso una vez derivado',
        ],
      },
    ],
  },
  {
    id: 'curso-informe-psicopedagogico',
    tipo: 'curso',
    nombre: 'Elaboración del informe psicopedagógico',
    dirigidoA: 'Psicólogos, psicopedagogos y orientadores con cédula',
    resumen:
      'Redacción del informe conforme a la normativa mexicana aplicable: estructura, lenguaje, resguardo de datos y recomendaciones que un centro pueda aplicar.',
    duracion: '20 horas · 5 sesiones',
    modalidad: 'Asincrónico. Avanzas a tu ritmo desde la plataforma',
    entrega: 'Constancia de participación',
    requisito: 'Título y cédula profesional vigente',
    precio: PRECIO_CURSO,
    precioMiembro: PRECIO_MIEMBRO,
    destino: 'pago',
    temario: [
      {
        numero: '01',
        titulo: 'Marco normativo mexicano',
        puntos: [
          '[REVISAR] Normativa educativa aplicable al informe psicopedagógico',
          '[REVISAR] Obligaciones del profesional conforme a la ley de datos personales',
          'Consentimiento informado de quien ejerce la patria potestad',
        ],
      },
      {
        numero: '02',
        titulo: 'Estructura del informe',
        puntos: [
          'Secciones obligatorias y orden de presentación',
          'Datos de identificación y motivo de consulta',
          'Extensión razonable según el tipo de caso',
        ],
      },
      {
        numero: '03',
        titulo: 'Lenguaje y precisión',
        puntos: [
          'Precisión técnica sin jerga innecesaria',
          'Qué afirmar, qué matizar y qué no puede concluirse',
          'Errores de redacción que invalidan un informe',
        ],
      },
      {
        numero: '04',
        titulo: 'Recomendaciones aplicables',
        puntos: [
          'Cómo redactar indicaciones que un centro pueda ejecutar',
          'Distinción entre ajuste razonable y adecuación curricular',
          'Plazos y responsables por escrito',
        ],
      },
      {
        numero: '05',
        titulo: 'Ética, resguardo y devolución',
        puntos: [
          'Confidencialidad y conservación del expediente',
          'Devolución a la familia: qué se dice y cómo',
          'Comunicación con el centro escolar sin exponer al menor',
        ],
      },
    ],
  },
  {
    id: 'certificacion-altas-capacidades',
    tipo: 'certificacion',
    nombre:
      'Detección y comprensión de las altas capacidades intelectuales y la doble excepcionalidad en el contexto STEAM',
    dirigidoA: 'Psicólogos y psicopedagogos con cédula profesional',
    resumen:
      'De la detección al reporte que se entrega y se cobra. Incluye instrumentos, interpretación, perfilamiento STEAM y los formatos de trabajo listos para usar.',
    duracion: '20 horas curriculares · 6 módulos',
    modalidad: 'Sesiones sabatinas por Zoom, con lecturas en PDF, cuestionarios y casos',
    entrega: 'Certificación con validez oficial tras aprobar el examen',
    requisito: 'Título y cédula profesional vigente',
    nombreCertificacion:
      'Detección de Altas Capacidades y Perfilamiento STEAM con enfoque psicométrico aplicado en contextos educativos',
    resultados: [
      'Detectar alumnos con altas capacidades',
      'Aplicar evaluación psicométrica básica',
      'Generar perfiles cognitivos',
      'Construir el perfil STEAM',
      'Elaborar reportes profesionales',
      'Implementar el servicio en escuelas privadas',
    ],
    incluye: [
      'Formato de entrevista inicial',
      'Checklist de detección',
      'Matriz STEAM',
      'Formato de reporte profesional',
      'Guía de interpretación',
    ],
    precio: PRECIO_CERTIFICACION,
    precioMiembro: PRECIO_MIEMBRO,
    destino: 'pago',
    temario: [
      {
        numero: '01',
        titulo: 'Fundamentos de altas capacidades',
        objetivo: 'Entender qué detectar y bajo qué criterios',
        horas: '4 horas',
        puntos: [
          'Definición operativa de altas capacidades',
          'Diferencia entre alto CI, talento y alto rendimiento',
          'Modelos clave: Joseph Renzulli y John B. Carroll',
          'Errores comunes en escuelas: falsos positivos y falsos negativos',
        ],
      },
      {
        numero: '02',
        titulo: 'Entrevista y screening',
        objetivo: 'Detectar candidatos rápidamente',
        horas: '3 horas',
        puntos: [
          'Entrevista inicial: historia breve adaptada de la historia clínica',
          'Contexto familiar y escolar',
          'Observación conductual',
          'Indicadores clave: curiosidad, pensamiento divergente y velocidad de aprendizaje',
          'Aplicación del checklist docente',
        ],
      },
      {
        numero: '03',
        titulo: 'Evaluación psicométrica',
        objetivo: 'Medir capacidad cognitiva real',
        horas: '6 horas',
        puntos: [
          'Selección de pruebas',
          'Aplicación básica y protocolos',
          'Instrumentos: WNV, Leiter-3, WISC-V, WPPSI-IV y RIAS',
          'Interpretación de CI e índices cognitivos',
          'Lectura de perfiles, no solo de la puntuación total',
        ],
      },
      {
        numero: '04',
        titulo: 'Atención, memoria y aprendizaje',
        objetivo: 'Evitar errores de interpretación',
        horas: '3 horas',
        puntos: [
          'Función de la atención en el aprendizaje',
          'Diferencias entre talento y déficit',
          'Memoria de trabajo e impacto en el rendimiento',
          'Alto potencial confundido con TDAH',
          'Bajo rendimiento con alta capacidad',
        ],
      },
      {
        numero: '05',
        titulo: 'Perfilamiento STEAM',
        objetivo: 'Traducir resultados a talento aplicable',
        horas: '2 horas',
        puntos: [
          'Identificación por áreas: ciencia, tecnología, ingeniería, arte y matemáticas',
          'Construcción de la matriz de talento',
          'Integración de CI, conducta y creatividad',
        ],
      },
      {
        numero: '06',
        titulo: 'Reporte profesional y aplicación',
        objetivo: 'Entregar valor real, y cobrarlo',
        horas: '2 horas',
        puntos: [
          'Estructura del reporte: datos generales, resultados, interpretación, perfil STEAM y recomendaciones',
          'Qué decir y qué evitar por sus implicaciones legales',
          'Presentación a familias y a colegios',
        ],
      },
    ],
  },
  {
    id: 'certificacion-evaluacion-psicopedagogica',
    tipo: 'certificacion',
    nombre: 'Certificación en evaluación psicopedagógica',
    dirigidoA: 'Psicólogos y psicopedagogos con cédula profesional',
    resumen:
      'Proceso completo de evaluación, del motivo de consulta a la devolución. Incluye examen en línea con experto y sesión grabada para auditoría.',
    duracion: '20 horas curriculares · 5 módulos',
    modalidad: 'Sesiones sabatinas por Zoom, con lecturas, cuestionarios y casos',
    entrega: 'Certificación con validez oficial tras aprobar el examen',
    requisito: 'Título y cédula profesional vigente',
    precio: PRECIO_CERTIFICACION,
    precioMiembro: PRECIO_MIEMBRO,
    destino: 'pago',
    temario: [
      {
        numero: '01',
        titulo: 'Encuadre del caso',
        puntos: [
          'Motivo de consulta y demanda real de la familia',
          'Entrevista inicial y revisión de historial escolar',
          'Hipótesis de trabajo y plan de evaluación',
        ],
      },
      {
        numero: '02',
        titulo: 'Áreas de exploración',
        puntos: [
          'Capacidad intelectual y funciones ejecutivas',
          'Lectura, escritura y cálculo',
          'Atención, memoria y regulación emocional',
        ],
      },
      {
        numero: '03',
        titulo: 'Dificultades específicas',
        puntos: [
          'Diferenciación entre rezago, dificultad específica y desmotivación',
          'Indicadores de dislexia, discalculia y disgrafía',
          'Cuándo derivar a neurología, lenguaje o psiquiatría',
        ],
      },
      {
        numero: '04',
        titulo: 'Integración de resultados',
        puntos: [
          'Triangulación de fuentes: pruebas, aula y familia',
          'Redacción de conclusiones sostenibles',
          'Límites de lo que la evaluación puede afirmar',
        ],
      },
      {
        numero: '05',
        titulo: 'Devolución y plan de intervención',
        puntos: [
          'Devolución a la familia y al alumno según su edad',
          'Plan de apoyo con responsables y plazos',
          'Seguimiento y criterios de reevaluación',
        ],
      },
    ],
  },
  {
    id: 'capacitacion-institucional',
    tipo: 'curso',
    nombre: 'Capacitación para el equipo docente de tu escuela',
    dirigidoA: 'Colegios que quieren formar a todo su equipo',
    resumen:
      'El mismo contenido de detección, impartido para el claustro completo y adaptado al procedimiento interno del centro.',
    duracion: 'De 20 a 40 horas según el tamaño del equipo',
    modalidad: 'En línea o presencial en el centro',
    entrega: 'Constancia de participación por docente',
    precio: 0,
    precioMiembro: 0,
    destino: 'escuela',
    temario: [
      {
        numero: '01',
        titulo: 'Diagnóstico del centro',
        puntos: [
          'Qué hace hoy la escuela cuando aparece un caso',
          'Dónde se rompe el procedimiento actual',
        ],
      },
      {
        numero: '02',
        titulo: 'Formación del equipo',
        puntos: [
          'Detección por ciclo escolar',
          'Registro sistemático y lenguaje común',
        ],
      },
      {
        numero: '03',
        titulo: 'Protocolo propio',
        puntos: [
          'Formatos, responsables y plazos del centro',
          'Ruta de derivación documentada',
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Membresía                                                           */
/* ------------------------------------------------------------------ */

export const membresia = {
  etiqueta: 'Precio de miembro',
  titulo: 'Si perteneces a la red, toda la formación te cuesta $850.',
  entrada:
    'La membresía no se compra aparte: la tienes por estar activo en PsicoMetrics.',
  vias: [
    {
      perfil: 'Psicólogos y psicopedagogos',
      condicion: 'Cuenta activa en PsicoMetrics con plan de $249 al mes',
      nota: 'Incluye 6 informes mensuales y acceso a todos los módulos.',
      accion: 'Ver PsicoMetrics',
      href: '/psicologos',
    },
    {
      perfil: 'Docentes y escuelas',
      condicion:
        'Institución registrada y un tamizaje contratado de 30 alumnos como mínimo',
      nota: 'El precio de miembro aplica a todo el equipo docente del centro.',
      accion: 'Solicitar propuesta',
      href: '/escuelas',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Titulación por Acuerdo 286                                          */
/* ------------------------------------------------------------------ */

export const acuerdo286 = {
  etiqueta: 'Titulación',
  titulo: 'Titúlate en Pedagogía por Acuerdo 286',
  entrada:
    'Preparación para las dos etapas del proceso CENEVAL. Los costos van desglosados: verás con claridad qué nos pagas a nosotros y qué pagas directo a la institución evaluadora.',

  /**
   * ⚠️ REDACCIÓN OBLIGATORIA
   * Se ofrece preparación, nunca resultado.
   */
  aviso:
    'Trayecto Liceo ofrece preparación. Los exámenes y su resultado dependen del CENEVAL, y su costo se paga directamente a esa institución.',

  etapas: [
    {
      etapa: 'Preparación primera etapa · 4 semanas',
      paraQuien: 'Trayecto Liceo',
      costo: '$3,500 MXN',
      cobrable: true,
      id: 'titulacion-etapa-1',
      importe: 350000,
    },
    {
      etapa: 'Examen CENEVAL',
      paraQuien: 'CENEVAL',
      costo: '$4,614 MXN',
      cobrable: false,
    },
    {
      etapa: 'Preparación segunda etapa · 2 semanas',
      paraQuien: 'Trayecto Liceo',
      costo: '$1,500 MXN',
      cobrable: true,
      id: 'titulacion-etapa-2',
      importe: 150000,
    },
    {
      etapa: 'Portafolio y examen oral',
      paraQuien: 'CENEVAL',
      costo: '$10,450 MXN',
      cobrable: false,
    },
  ],

  accion: 'Inscribirme a la preparación',
};
