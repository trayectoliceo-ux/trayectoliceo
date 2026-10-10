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
    titulo: 'Valoración psicopedagógica y orientación vocacional',
    gancho: 'Respondes en línea, un psicólogo con cédula la revisa y firma. Informe en 72 horas.',
    accion: 'Contratar · desde $249',
    principal: true,
  },
  {
    id: 'psicologos',
    href: '/psicologos',
    etiqueta: 'Psicólogos y psicopedagogos',
    titulo: 'Evalúa mejor, cobra más y recibe casos',
    gancho: 'Casos derivados, informes con folio verificable y una evaluación gratis cada mes.',
    accion: 'Ver plataforma',
  },
  {
    id: 'escuelas',
    href: '/escuelas',
    etiqueta: 'Escuelas',
    titulo: 'Detecta a tiempo y acompaña mejor a tus alumnos',
    gancho: 'Tamizaje de aula sin costo. Solo capacitas a un docente por grupo evaluado.',
    accion: 'Solicitar propuesta',
  },
  {
    id: 'certificate',
    href: '/certificate',
    etiqueta: 'Soy docente o profesional',
    titulo: 'Certifícate: cursos y certificaciones',
    gancho: 'Las capacitaciones van incluidas en tu plan anual de PsicoMetrics, desde $899.',
    accion: 'Ver programas',
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
      'PsicoMetrics te da los informes y nosotros te damos los casos. El registro es gratis e incluye una evaluación de prueba, más una cada mes.',
    accion: 'Comienza gratis en psicometrics.app',
    subtexto: 'Sin tarjeta. Una evaluación de prueba y otra cada mes, sin pagar.',
  },

  bloques: [
    {
      indice: '01',
      titulo: 'Gana más',
      puntos: [
        'Recibes casos de familias y escuelas que canalizamos a tu área',
        'Tamizaje familiar: tú firmas, tú cobras',
        'Valoraciones integrales derivadas de nuestros tamizajes escolares',
        'Orientación vocacional: casos de familias que ya decidieron contratar',
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
  /**
   * Qué permite cada nivel. Es la distinción que más preguntas evita:
   * registrarse es gratis y da formación, pero facturar casos exige plan.
   */
  alcance: {
    etiqueta: 'Qué permite cada nivel',
    titulo: 'Registrarte es gratis y ya puedes evaluar.',
    gratis: {
      titulo: 'Con el registro gratuito',
      puntos: [
        'Una evaluación de psicodiagnóstico para que pruebes la plataforma',
        'Una evaluación más cada mes, sin pagar nada',
        'Alta en la plataforma y perfil profesional en la red',
      ],
    },
    conPlan: {
      titulo: 'Con el plan anual',
      puntos: [
        'Todas las capacitaciones incluidas en el mismo pago',
        'Recibes casos de orientación vocacional',
        'Recibes valoraciones derivadas de escuelas y de familias',
        'Emites informes con folio verificable y los facturas',
      ],
    },
    nota: 'El registro gratuito sirve para probar y evaluar. Para recibir y cobrar casos derivados hace falta plan anual activo.',
  },

  planes: [
    {
      nombre: 'Registro',
      precio: 'Gratis',
      detalle:
        'Una evaluación de psicodiagnóstico para probar la plataforma, más una evaluación cada mes. Alta inmediata y perfil en la red. Para recibir casos derivados y facturarlos hace falta plan anual.',
      accion: 'Registrarme gratis',
    },
    {
      nombre: 'Plan anual',
      /** El calificador va aparte: junto al importe desborda la tarjeta. */
      prefijo: 'Desde',
      precio: '$899 MXN',
      detalle:
        'Todas las capacitaciones incluidas en el mismo pago, sin costo aparte. Acceso completo a los módulos y a los casos que derivamos de escuelas y de familias.',
      accion: 'Activar plan anual',
      destacado: true,
    },
  ],

  /**
   * PsicoMetrics tiene más planes, entre ellos la evaluación de la NOM-035
   * para empresas. Aquí solo se menciona: el foco de Trayecto Liceo es
   * educación, y abrir el tema laboral en esta página distrae de la venta.
   */
  masPlanes: {
    titulo: 'Hay más de lo que cabe en esta página.',
    texto:
      'PsicoMetrics tiene otros planes, incluida la evaluación de la NOM-035 para centros de trabajo. Aquí nos enfocamos en educación, pero la herramienta llega más lejos: vale la pena explorarla.',
    accion: 'Explorar psicometrics.app',
    url: 'https://psicometrics.app',
  },
};

/* ------------------------------------------------------------------ */
/* 2. Escuelas                                                         */
/* ------------------------------------------------------------------ */

export const escuelas = {
  portada: {
    etiqueta: 'Para escuelas',
    titulo: ['En cada grupo hay', 'alumnos que esperan'],
    rotativas: ['que alguien los vea.', 'una respuesta.', 'un plan.'],
    entrada:
      'Veinte minutos por grupo y tu escuela sabe a quién mirar de cerca. Con consentimiento digital de las familias e informe para el centro.',
    precio: 'Sin costo',
    unidad: 'con un docente capacitado por grupo evaluado',
    accion: 'Solicitar propuesta',
  },

  /**
   * El tamizaje dejó de cobrarse. La condición es formativa, no comercial:
   * un semáforo de aula sin nadie capacitado para leerlo no sirve de nada,
   * y esa es la razón por la que la capacitación es el requisito.
   */
  condicion: {
    etiqueta: 'Cómo funciona',
    titulo: 'El tamizaje no cuesta. La condición es capacitar.',
    texto:
      'Aplicamos el tamizaje sin costo en tu centro. A cambio pedimos que al menos un docente por cada grupo evaluado tome la capacitación en detección temprana: alguien tiene que saber leer el semáforo y qué hacer con él.',
    puntos: [
      'Tamizaje de aula: sin costo, sin mínimo de alumnos',
      'Un docente capacitado por cada grupo evaluado',
      'Capacitación docente: $590 MXN por participante',
      'Certificado con validez SEP, opcional: $990 MXN',
    ],
  },

  /** Lo que el centro recibe según el volumen que decida evaluar. */
  escalas: [
    {
      alumnos: 'Un grupo',
      incluye: 'Tamizaje sin costo y 1 docente capacitado',
      nota: 'Pensado para que el centro lo pruebe sin arriesgar presupuesto.',
    },
    {
      alumnos: 'Varios grupos',
      incluye: 'Tamizaje sin costo y 1 docente capacitado por grupo',
      nota: 'Mismo esquema, escalado al número de grupos que evalúes.',
    },
    {
      alumnos: 'Desde 100 alumnos',
      incluye: 'Además, un taller STEAM a elegir para tu centro',
      nota: 'Formamos a tu personal para que ustedes mismos lo impartan.',
      destacado: true,
    },
  ],

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

  /**
   * La contratación y el cobro ocurren en PsicoMetrics, donde ya vive el
   * cuestionario y la pasarela. Aquí no se pide ningún dato: pedirlos dos
   * veces es la forma más rápida de perder a quien ya venía decidido.
   */
  /**
   * Los dos servicios para familias. Ambos se contratan y se pagan en
   * PsicoMetrics, donde vive el cuestionario: pedir aquí los mismos datos
   * que va a pedir la plataforma pierde a quien ya venía decidido.
   */
  productos: [
    {
      nombre: 'Valoración psicopedagógica',
      resumen:
        'Responden madre, padre o tutor. Un psicólogo con cédula lo revisa y firma. Informe en 72 horas.',
      precio: '$349 MXN',
      accion: 'Contratar valoración',
      url: 'https://psicometrics.app/tamizaje-familiar',
      destacado: true,
    },
    {
      nombre: 'Orientación vocacional',
      resumen:
        'Para quien está eligiendo prepa o universidad. Perfil de intereses y aptitudes, con reporte y mapa de opciones.',
      precio: '$249 MXN',
      accion: 'Contratar orientación',
      url: 'https://psicometrics.app/orientacion-vocacional',
      destacado: false,
    },
  ],

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
