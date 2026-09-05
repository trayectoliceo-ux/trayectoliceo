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
  /**
   * `curso` es autogestivo y entrega constancia. `institucional` se cotiza
   * por centro. La certificación con validez oficial no es un tipo aparte:
   * es un examen que se contrata además del curso, cuando se quiere.
   */
  tipo: 'curso' | 'institucional';
  nombre: string;
  dirigidoA: string;
  /** Determina en qué pestaña aparece el programa. */
  publico: 'profesional' | 'docente' | 'centro';
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
  /**
   * Cómo se accede:
   *  `membresia` → incluido al estar activo en PsicoMetrics ($299/mes)
   *  `docente`   → capacitación de acceso de pago único ($450)
   *  `centro`    → se cotiza por número de participantes
   */
  acceso: 'membresia' | 'docente' | 'centro';
  /** `pago` cobra en línea y da acceso; `escuela` deriva a WhatsApp. */
  destino: 'pago' | 'escuela';
  /** Si al terminar puede presentarse el examen de validez oficial. */
  certificable?: boolean;
  temario: Modulo[];
};

/**
 * MODELO VIGENTE
 * La formación no se vende suelta: va incluida en la membresía. Solo se
 * cobra el examen que otorga validez oficial.
 */
export const precios = {
  membresia: 299,
  capacitacionDocente: 450,
  /** Examen y estudio de caso con validez SEP. */
  certificado: 990,
};

export const programas: Programa[] = [
  {
    id: 'curso-deteccion-aula',
    certificable: true,
    tipo: 'curso',
    nombre: 'Detección de altas capacidades y rezago en el aula',
    dirigidoA: 'Docentes, pedagogos y profesionales de ciencias de la educación',
    publico: 'docente',
    resumen:
      'Qué se observa desde el aula, cómo registrarlo y en qué momento exacto corresponde derivar. Sin instrumentos: el docente detecta, no evalúa.',
    duracion: '20 horas · 5 módulos',
    modalidad: 'Autogestivo. Avanzas a tu ritmo desde la plataforma',
    entrega: 'Constancia de participación. El certificado oficial se obtiene con el examen',
    acceso: 'docente',
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
    certificable: true,
    tipo: 'curso',
    nombre: 'Elaboración del informe psicopedagógico',
    dirigidoA: 'Psicólogos, psicopedagogos y orientadores con cédula',
    publico: 'profesional',
    resumen:
      'Redacción del informe conforme a la normativa mexicana aplicable: estructura, lenguaje, resguardo de datos y recomendaciones que un centro pueda aplicar.',
    duracion: '20 horas · 5 módulos',
    modalidad: 'Autogestivo. Avanzas a tu ritmo desde la plataforma',
    entrega: 'Constancia de participación. El certificado oficial se obtiene con el examen',
    requisito: 'Título y cédula profesional vigente',
    acceso: 'membresia',
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
    certificable: true,
    tipo: 'curso',
    nombre:
      'Detección y comprensión de las altas capacidades intelectuales y la doble excepcionalidad',
    dirigidoA: 'Psicólogos y psicopedagogos con cédula profesional',
    publico: 'profesional',
    resumen:
      'De la detección al reporte que se entrega y se cobra. Incluye instrumentos, interpretación, perfilamiento STEAM y los formatos de trabajo listos para usar.',
    duracion: '20 horas curriculares · 6 módulos',
    modalidad: 'Autogestivo, con asesoría. Lecturas en PDF, cuestionarios y casos',
    entrega: 'Constancia de participación. El certificado oficial se obtiene con el examen',
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
    acceso: 'membresia',
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
    certificable: true,
    tipo: 'curso',
    nombre: 'Certificación en evaluación psicopedagógica',
    dirigidoA: 'Psicólogos y psicopedagogos con cédula profesional',
    publico: 'profesional',
    resumen:
      'Proceso completo de evaluación, del motivo de consulta a la devolución. Incluye examen en línea con experto y sesión grabada para auditoría.',
    duracion: '20 horas curriculares · 5 módulos',
    modalidad: 'Autogestivo, con asesoría. Lecturas, cuestionarios y casos',
    entrega: 'Constancia de participación. El certificado oficial se obtiene con el examen',
    requisito: 'Título y cédula profesional vigente',
    acceso: 'membresia',
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
    tipo: 'institucional',
    nombre: 'Capacitación para el equipo docente de tu escuela',
    dirigidoA: 'Colegios que quieren formar a todo su equipo',
    publico: 'centro',
    resumen:
      'El mismo contenido de detección, impartido para el claustro completo y adaptado al procedimiento interno del centro.',
    duracion: 'De 20 a 40 horas según el tamaño del equipo',
    modalidad: 'En línea o presencial en el centro',
    entrega: 'Constancia de participación por docente',
    acceso: 'centro',
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
/* Cómo se accede a la formación                                       */
/* ------------------------------------------------------------------ */

export const grupos = {
  etiqueta: 'Cómo se accede',
  titulo: 'Tu membresía PsicoMetrics incluye toda la formación.',
  entrada:
    'No es un curso que compras una vez: es parte de estar activo en la plataforma. Aprendes a tu ritmo y, cuando quieras el papel con validez oficial, presentas el examen.',
  lista: [
    {
      perfil: 'Psicólogos y psicopedagogos',
      requisito: 'Con cédula profesional vigente',
      precio: `$${precios.membresia} MXN al mes`,
      etiquetaPrecio: 'Membresía PsicoMetrics',
      puntos: [
        'Las tres capacitaciones incluidas: altas capacidades y doble excepcionalidad, diagnóstico psicopedagógico e informe conforme a normativa',
        'Emisión de informes con folio verificable y código QR',
        'Recibes casos del tamizaje escolar y de orientación vocacional',
        'Transferencia de expedientes entre especialistas',
        'Acceso constante a servicios de tamizaje',
        `Certificado con validez SEP disponible por $${precios.certificado} MXN`,
      ],
      accion: 'Activar mi membresía',
      href: 'https://psicometrics.app',
      externo: true,
    },
    {
      perfil: 'Docentes y pedagogos',
      requisito: 'Ejercicio docente en activo',
      precio: `$${precios.capacitacionDocente} MXN`,
      etiquetaPrecio: 'Capacitación de acceso',
      puntos: [
        'Capacitación completa en detección temprana',
        'Aplicación de tamizaje en el aula de tu centro',
        'Canalización directa a la red de especialistas',
        'Incluida sin costo al contratar tamizaje escolar: 1 docente por cada 10 alumnos',
        `Certificado con validez SEP disponible por $${precios.certificado} MXN`,
      ],
      nota: 'Los docentes no se registran en PsicoMetrics: la plataforma clínica es para profesionales con cédula. Si aún no tienes titulación, revisa la titulación por Acuerdo 286 en esta misma página.',
      accion: 'Inscribirme',
      href: '/programa/curso-deteccion-aula',
      externo: false,
    },
  ],
};

/** Examen que otorga el certificado con validez oficial. */
export const certificado = {
  id: 'certificado-oficial',
  etiqueta: 'Certificado con validez oficial',
  titulo: 'Certifícalo',
  texto:
    'Cuando estés listo, presentas un examen de conocimientos y un estudio de caso evaluado en sesión de Zoom por un especialista. Al aprobar, obtienes el documento con validez oficial.',
  precio: precios.certificado,
  requisito: 'Disponible solo para miembros activos de PsicoMetrics.',
  accion: 'Agendar mi examen',
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


/* ------------------------------------------------------------------ */
/* Pestañas por perfil                                                 */
/* ------------------------------------------------------------------ */

/**
 * El visitante elige quién es y ve solo lo que le corresponde. Es más
 * honesto que mostrar todo y esperar que adivine: un docente no puede
 * inscribirse a un programa que exige cédula, y descubrirlo después de
 * pagar es la peor forma de enterarse.
 */
export const pestanas = [
  {
    id: 'profesional' as const,
    titulo: 'Soy psicólogo o psicopedagogo',
    corto: 'Psicología',
    pie: 'Con cédula profesional vigente',
    nota: 'Estos programas habilitan para evaluar y emitir informes. Al inscribirte verificamos tu cédula.',
  },
  {
    id: 'docente' as const,
    titulo: 'Soy docente, pedagogo o de ciencias de la educación',
    corto: 'Docencia',
    pie: 'Ejercicio docente en activo',
    nota: 'Estos programas forman para detectar y derivar. La evaluación la realiza siempre un profesional con cédula.',
  },
  {
    id: 'centro' as const,
    titulo: 'Represento a un centro',
    corto: 'Centros',
    pie: 'Colegios y clínicas',
    nota: 'Formación para todo el equipo, adaptada al procedimiento interno del centro y cotizada por número de participantes.',
  },
];
