/**
 * RUTAS COMERCIALES
 * -----------------
 * Cuatro públicos, cuatro páginas. No se mezclan: un psicólogo y un
 * director de escuela no quieren leer lo mismo, y una página que le habla a
 * los dos no le habla a ninguno.
 *
 * Cada bloque responde tres cosas y calla el resto: qué gano, cuánto cuesta,
 * cómo empiezo. Todo lo demás va detrás de un desplegable o no va.
 */

export type Ruta = {
  id: string;
  href: string;
  etiqueta: string;
  titulo: string;
  gancho: string;
  accion: string;
  /** El público principal se destaca visualmente. */
  principal?: boolean;
};

export const rutas: Ruta[] = [
  {
    id: 'familias',
    href: '/familias',
    etiqueta: 'Soy madre, padre o tutor',
    titulo: 'Valoración digital de mi hija o hijo',
    gancho: 'Respondes en línea, un psicólogo con cédula la revisa y firma. Informe en 72 horas.',
    accion: 'Contratar · $490',
    principal: true,
  },
  {
    id: 'psicologos',
    href: '/psicologos',
    etiqueta: 'Psicólogos y psicopedagogos',
    titulo: 'Evalúa mejor, cobra más y recibe casos',
    gancho: 'Casos derivados, informes con folio verificable y tu primer caso sin costo.',
    accion: 'Ver plataforma',
  },
  {
    id: 'escuelas',
    href: '/escuelas',
    etiqueta: 'Escuelas',
    titulo: 'Detecta a tiempo a los alumnos que necesitan apoyo',
    gancho: 'Tamizaje de aula desde $150 por alumno, con semáforo por grupo.',
    accion: 'Solicitar propuesta',
  },
  {
    id: 'docentes',
    href: '/docentes',
    etiqueta: 'Docentes',
    titulo: 'Aprende a detectar lo que otros no ven en tu salón',
    gancho: 'Tú los ves ocho horas al día. Aprende qué mirar y cuándo derivar.',
    accion: 'Ver capacitación',
  },
  {
    id: 'titulacion',
    href: '/titulacion',
    etiqueta: 'Titulación',
    titulo: 'Titúlate en Pedagogía por Acuerdo 286',
    gancho: 'Preparación por etapas, con costos desglosados y sin letra chica.',
    accion: 'Ver etapas y costos',
  },
];

/* ------------------------------------------------------------------ */
/* 1. Psicólogos — público principal                                   */
/* ------------------------------------------------------------------ */

export const psicologos = {
  urlApp: 'https://psicometrics.app',

  portada: {
    etiqueta: 'Para psicólogos y psicopedagogos',
    titulo: ['Evalúa mejor,', 'cobra más'],
    rotativas: ['y recibe casos.'],
    entrada:
      'PsicoMetrics te da los informes y nosotros te damos los casos. Tu primer caso completo es gratis.',
    accion: 'Comienza gratis en psicometrics.app',
    subtexto: 'Sin tarjeta. El primer caso completo no cuesta nada.',
  },

  bloques: [
    {
      indice: '01',
      titulo: 'Gana más',
      puntos: [
        'Recibes casos de familias y escuelas que canalizamos a tu área',
        'Tamizaje familiar: tú firmas, tú cobras',
        'Valoraciones integrales derivadas de nuestros tamizajes escolares',
        'Tamizaje escolar: cobras por alumno evaluado',
      ],
    },
    {
      indice: '02',
      titulo: 'Trabaja mejor',
      puntos: [
        'Informes con folio verificable y código QR de autenticidad',
        'Motor determinista: mismo perfil, misma hipótesis, siempre',
        'La IA redacta, nunca diagnostica',
        'Instrumento propio incluido si no tienes escala licenciada',
        'Transferencia de casos entre colegas',
      ],
    },
    {
      indice: '03',
      titulo: 'Respalda tu trabajo',
      puntos: [
        'Panel de expertos que valida los instrumentos',
        'Datos cifrados, sin nombres de menores almacenados',
        'Consentimiento informado con bitácora legal',
      ],
    },
  ],

  /** [VERIFICAR] Confirmar moneda e importes antes de publicar. */
  planes: [
    {
      nombre: 'Primer caso',
      precio: 'Gratis',
      detalle: 'Un caso completo, de expediente a informe firmado',
      accion: 'Comenzar ahora',
    },
    {
      nombre: 'Plan mensual',
      precio: '$249 MXN',
      detalle: '6 informes al mes, con todos los módulos',
      accion: 'Suscribirme',
      destacado: true,
    },
    {
      nombre: 'Créditos sueltos',
      precio: '$120 MXN',
      detalle: 'Por informe, sin suscripción',
      accion: 'Comprar créditos',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. Escuelas                                                         */
/* ------------------------------------------------------------------ */

export const escuelas = {
  portada: {
    etiqueta: 'Para escuelas',
    titulo: ['Un aula de 30 tiene', 'en promedio 3 que'],
    rotativas: ['nadie ha detectado.'],
    entrada:
      'Tamizaje psicopedagógico grupal con consentimiento digital de las familias e informe para el centro. Veinte minutos por grupo.',
    precio: '$150 MXN',
    unidad: 'por alumno evaluado',
    accion: 'Solicitar propuesta',
  },

  incluye: [
    'Aplicación grupal de 15 a 20 minutos',
    'Semáforo por grupo: verde, ámbar y azul',
    'Informe grupal descargable, sin datos individuales',
    'Consentimiento digital de las familias con validez legal',
    'Ruta de derivación para los casos que lo requieran',
  ],

  /** Delimita qué recibe el centro y qué no. Evita conflictos después. */
  limite:
    'La escuela recibe el mapa del aula. Los resultados individuales son de cada familia.',

  semaforo: [
    {
      color: 'bg-menta',
      titulo: 'Verde',
      texto: 'Sin indicadores de riesgo. Desempeño dentro de lo esperado.',
    },
    {
      color: 'bg-sello-claro',
      titulo: 'Ámbar',
      texto: 'Alerta de aprendizaje. Conviene valoración individual.',
    },
    {
      color: 'bg-institucional',
      titulo: 'Azul',
      texto: 'Indicador de alta capacidad. Requiere evaluación formal.',
    },
  ],

  extra: {
    titulo: 'Talleres STEAM después del tamizaje',
    texto:
      'Opcional. Enriquecimiento por proyectos para los grupos donde el tamizaje detecte alta capacidad.',
    accion: 'Ver talleres',
    href: '/talleres',
  },
};

/* ------------------------------------------------------------------ */
/* 3. Docentes                                                         */
/* ------------------------------------------------------------------ */

export const docentes = {
  portada: {
    etiqueta: 'Para docentes',
    titulo: ['Tú los ves ocho', 'horas al día.'],
    rotativas: ['Aprende qué mirar.'],
    entrada:
      'Capacitación en detección temprana de dificultades de aprendizaje y altas capacidades en el aula. 20 horas, con constancia.',
  },

  /**
   * Aclaración necesaria y que además vende: el docente no evalúa, y
   * decírselo de frente evita expectativas que luego generan reembolsos.
   */
  aclaracion: {
    titulo: 'Lo que sí puedes hacer como docente',
    texto:
      'La evaluación psicopedagógica la aplica un profesional con cédula, no el docente. Pero eres quien más tiempo pasa con el alumno, y eso te pone en la mejor posición para detectar.',
    puntos: [
      'Solicitar un tamizaje cuando tengas sospecha fundada',
      'Aplicar estrategias de aula para dificultades y altas capacidades',
      'Documentar lo que observas para que la derivación sirva',
      'Capacitarte en detección temprana',
    ],
  },

  curso: {
    id: 'curso-deteccion-aula',
    nombre: 'Detección en el aula para docentes',
    precio: '$1,800 MXN',
    unidad: 'por participante',
    duracion: '20 horas · 5 sesiones',
    modalidad: 'En línea o presencial en tu centro',
    grupo: 'Grupo cerrado hasta 15 docentes: $18,000 MXN',
    temario: [
      'Qué es y qué no es una alta capacidad',
      'Indicadores observables y registro sistemático',
      'Perfiles que se pasan por alto: bajo rendimiento, niñas, doble excepcionalidad',
      'Dónde termina la observación y empieza la evaluación',
      'Cómo se documenta un caso y a quién se entrega',
    ],
    accion: 'Inscribirme al curso',
  },
};

/* ------------------------------------------------------------------ */
/* 4. Titulación por Acuerdo 286                                       */
/* ------------------------------------------------------------------ */

export const titulacion = {
  portada: {
    etiqueta: 'Titulación',
    titulo: ['Titúlate en Pedagogía', 'por'],
    rotativas: ['Acuerdo 286.'],
    entrada:
      'Te preparamos para el examen y el portafolio. Los costos van desglosados: verás con claridad qué nos pagas a nosotros y qué pagas directo a la institución evaluadora.',
  },

  /**
   * ⚠️ REDACCIÓN OBLIGATORIA
   * Se ofrece preparación, nunca resultado. No prometer aprobación ni
   * titulación garantizada: además de ser lo correcto legalmente, la
   * promesa realista genera menos reembolsos y mejores reseñas.
   */
  aviso:
    'Ofrecemos preparación, no resultado. Ninguna asesoría puede garantizar la aprobación del examen ni la obtención del título: eso depende de tu desempeño y de la institución evaluadora.',

  etapas: [
    {
      etapa: 'Primera etapa',
      concepto: '4 semanas de preparación',
      costo: '$3,500 MXN',
      paraQuien: 'Trayecto Liceo',
      cobrable: true,
      id: 'titulacion-etapa-1',
      importe: 350000,
    },
    {
      etapa: 'Examen CENEVAL',
      concepto: 'Cuota de examen',
      costo: '$4,614 MXN',
      paraQuien: 'CENEVAL',
      cobrable: false,
    },
    {
      etapa: 'Segunda etapa',
      concepto: '2 semanas de preparación',
      costo: '$1,500 MXN',
      paraQuien: 'Trayecto Liceo',
      cobrable: true,
      id: 'titulacion-etapa-2',
      importe: 150000,
    },
    {
      etapa: 'Portafolio y examen oral',
      concepto: 'Cuota de evaluación',
      costo: '$10,450 MXN',
      paraQuien: 'Institución evaluadora',
      cobrable: false,
    },
  ],

  nota: 'Las cuotas de examen y de portafolio se pagan directamente a la institución que evalúa, no a nosotros. Nuestro cobro cubre exclusivamente la preparación.',

  accion: 'Inscribirme a la primera etapa',
};


/* ------------------------------------------------------------------ */
/* Familias — la ruta más comercial                                    */
/* ------------------------------------------------------------------ */

export const familias = {
  portada: {
    etiqueta: 'Para familias',
    titulo: ['¿Sientes que a tu hija', 'o hijo le cuesta'],
    rotativas: ['más de lo normal?'],
    entrada:
      'Una valoración profesional en línea, revisada y firmada por un psicólogo con cédula vigente. Sin listas de espera, sin salir de casa.',
  },

  producto: {
    id: 'tamizaje-familiar',
    nombre: 'Valoración digital familiar',
    precio: '$490 MXN',
    importe: 49000,
    accion: 'Contratar valoración',
    /** Destino del cobro cuando la pasarela esté activa en la plataforma. */
    urlApp: 'https://psicometrics.app/tamizaje-familiar',
  },

  pasos: [
    {
      numero: '01',
      titulo: 'Respondes en línea',
      texto: '20 minutos desde tu teléfono, cuando puedas.',
    },
    {
      numero: '02',
      titulo: 'Un psicólogo lo revisa',
      texto: 'Analiza tus respuestas y firma con su cédula profesional.',
    },
    {
      numero: '03',
      titulo: 'Recibes el informe',
      texto: 'En 72 horas hábiles, con recomendaciones concretas.',
    },
  ],

  /**
   * Bloque de honestidad. No quitarlo: vende más de lo que parece.
   * Una familia preocupada distingue en segundos entre quien promete
   * certezas y quien explica el alcance real. Contrata la segunda.
   */
  honestidad: {
    si: {
      titulo: 'Qué sí es',
      texto:
        'Una orientación profesional sobre si conviene explorar algo con más detalle, y hacia qué especialista acudir.',
    },
    no: {
      titulo: 'Qué no es',
      texto:
        'Un diagnóstico ni una medida de inteligencia. Un tamizaje identifica a quién conviene mirar de cerca; no determina qué le ocurre.',
    },
  },

  preguntas: [
    { pregunta: '¿Desde qué edad?', respuesta: 'De 3 a 18 años.' },
    {
      pregunta: '¿Quién ve los datos de mi hija o hijo?',
      respuesta:
        'Solo el psicólogo asignado. No almacenamos su nombre completo.',
    },
    {
      pregunta: '¿Y si necesita más apoyo?',
      respuesta: 'Te derivamos a un especialista de nuestra red.',
    },
  ],
};
