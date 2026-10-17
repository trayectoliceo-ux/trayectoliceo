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
    titulo: 'Evaluación psicopedagógica y orientación vocacional',
    gancho: 'Respondes en línea y ves tu resultado al momento. Empezar es gratis.',
    accion: 'Empezar gratis',
    principal: true,
  },
  {
    id: 'escuelas',
    href: '/escuelas',
    etiqueta: 'Escuelas, prepas y universidades',
    titulo: 'Mide lo que pasa en tus aulas',
    gancho: 'Tamizaje, salud psicológica, razonamiento, inglés y matemáticas. Aplicar es gratis.',
    accion: 'Ver los servicios',
  },
  {
    id: 'certificate',
    href: '/certificate',
    etiqueta: 'Soy docente',
    titulo: 'Capacítate en detección temprana',
    gancho: 'Veinte horas autogestivas, con certificado de validez SEP opcional.',
    accion: 'Ver la capacitación',
  },
  {
    id: 'talleres',
    href: '/talleres',
    etiqueta: 'Enriquecimiento',
    titulo: 'Talleres STEAM por proyectos',
    gancho: 'Tres días intensivos, grupos de hasta diez alumnos.',
    accion: 'Ver talleres',
  },
];

/* ------------------------------------------------------------------ */
/* 1. Psicólogos — público principal                                   */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* 2. Escuelas                                                         */
/* ------------------------------------------------------------------ */

export const escuelas = {
  portada: {
    etiqueta: 'Para escuelas, preparatorias y universidades',
    titulo: ['En cada grupo hay', 'alumnos que esperan'],
    rotativas: ['que alguien los vea.', 'una respuesta.', 'un plan.'],
    entrada:
      'Aplicar es gratis en los tres servicios, y cada alumno ve su resultado al terminar. La institución solo paga si quiere el informe por grupo con folio.',
    precio: 'Aplicación gratuita',
    unidad: 'en los tres servicios',
    accion: 'Solicitar propuesta',
  },

  /**
   * LOS TRES SERVICIOS PARA INSTITUCIONES
   *
   * Comparten la misma lógica y conviene que se lea así: aplicar no cuesta,
   * el alumno ve su resultado, y lo que se cotiza es el informe agregado.
   * Una institución que entiende el patrón en la primera tarjeta ya no
   * necesita leer las otras dos con desconfianza.
   *
   * ⚠️ El alcance de esta página es exclusivamente educativo. No añadir
   * aquí servicios de ámbito laboral ni enlazarlos.
   */
  /**
   * LOS SERVICIOS QUE SE APLICAN EN UN CENTRO ESCOLAR
   *
   * Todo lo que se puede medir a nivel escolar, en un solo lugar y con la
   * misma lógica: aplicar no cuesta, el alumno ve su resultado al terminar
   * y lo que se cotiza es el informe agregado por grupo.
   *
   * Cada tarjeta abre con el problema que resuelve, no con lo que mide.
   * Un director no compra «escalas PHQ-9 y GAD-7»: compra saber quién de
   * sus alumnos está mal antes de que sea tarde.
   *
   * ⚠️ El alcance es exclusivamente educativo. No añadir aquí servicios de
   * ámbito laboral ni enlazarlos.
   */
  servicios: [
    {
      id: 'tamizaje-escolar',
      etiqueta: 'Primaria, secundaria y media superior',
      nombre: 'Tamizaje escolar',
      resuelve: 'Sabe a quién mirar primero.',
      precio: 'Sin costo',
      precioNota: 'Ni la escuela ni las familias pagan',
      resumen:
        'Un cribado breve que las familias contestan desde un enlace, con un semáforo por aula para la escuela y la canalización de cada caso a cargo de un psicólogo.',
      puntos: [
        'Las familias autorizan y responden desde su propio enlace',
        'Semáforo por aula: verde, ámbar y azul',
        'La escuela nunca ve el resultado individual',
        'No se guarda el nombre del menor',
        'Incluye capacitación de un docente por grupo evaluado',
      ],
      accion: 'Solicitar propuesta',
      destino: 'formulario' as const,
      destacado: true,
    },
    {
      id: 'salud-psicologica',
      etiqueta: 'Preparatorias y universidades',
      nombre: 'Salud psicológica',
      resuelve: 'Conoce cómo están tus estudiantes y actúa a tiempo.',
      precio: 'Aplicación gratuita',
      precioNota: 'Cada alumno ve su resultado al instante',
      resumen:
        'Un estudio en línea para grupos completos: ánimo, ansiedad, estrés y consumo de alcohol. Cada alumno contesta desde su celular y ve su resultado al instante.',
      puntos: [
        'Ánimo (PHQ-9), ansiedad (GAD-7), estrés (DASS-21) y alcohol (AUDIT)',
        'Un enlace o código QR por grupo, que se comparte por WhatsApp o correo',
        'Quien marca riesgo recibe contacto del psicólogo en menos de 24 horas',
        'La institución recibe resultados por grupo, desde 10 respuestas, nunca nombres',
        'El informe institucional con folio y el Excel se cotizan por alumno',
      ],
      accion: 'Solicitar propuesta',
      destino: 'formulario' as const,
    },
    {
      id: 'razonamiento',
      etiqueta: 'Secundaria, prepa y universidad',
      nombre: 'Razonamiento',
      resuelve: 'Mide con qué base real entra cada alumno.',
      precio: 'Aplicación gratuita',
      precioNota: 'Resultado inmediato para el alumno',
      resumen:
        'Razonamiento verbal, numérico y abstracto. Sirve para el diagnóstico de ingreso y para armar los cursos propedéuticos con datos y no con suposiciones.',
      puntos: [
        'Razonamiento verbal, numérico y abstracto',
        'Resultado inmediato para el alumno al terminar',
        'Informe por grupo para la institución, cotizado por alumno',
        'Tiempo por sección controlado',
        'No es una prueba de coeficiente intelectual',
      ],
      accion: 'Aplicar en mi grupo',
      destino: 'psicometrics' as const,
      url: 'https://www.psicometrics.app/pruebas-de-razonamiento',
    },
    {
      id: 'ingles',
      etiqueta: 'Secundaria, prepa y universidad',
      nombre: 'Inglés',
      resuelve: 'Arma los grupos por nivel en una sola sesión.',
      precio: 'Aplicación gratuita',
      precioNota: 'Nivel del Marco Común Europeo',
      resumen:
        'Ubica a cada alumno de A1 a C1, con equivalencia orientativa a Cambridge, TOEFL iBT e IELTS. Deja de formar grupos por grado y fórmalos por nivel real.',
      puntos: [
        'Nivel del Marco Común Europeo, de A1 a C1',
        'Equivalencia orientativa con Cambridge, TOEFL iBT e IELTS',
        'Útil para formar grupos por nivel al inicio del ciclo',
        'Resultado inmediato para el alumno',
        'No es un certificado oficial ni sustituye a esos exámenes',
      ],
      accion: 'Aplicar en mi grupo',
      destino: 'psicometrics' as const,
      url: 'https://www.psicometrics.app/pruebas-de-razonamiento',
    },
    {
      id: 'matematicas',
      etiqueta: 'De 6.º de primaria a bachillerato',
      nombre: 'Matemáticas y lenguaje',
      resuelve: 'Dice hasta qué grado domina de verdad cada alumno.',
      precio: 'Aplicación gratuita',
      precioNota: 'Por grado escolar, no por edad',
      resumen:
        'Aritmética, álgebra, geometría y lenguaje, evaluados por grado escolar. Encuentra el rezago donde está de verdad, aunque el alumno vaya aprobando.',
      puntos: [
        'Aritmética, álgebra, geometría y lenguaje',
        'Resultado por grado escolar, de 6.º de primaria a bachillerato',
        'Identifica rezago real aunque las calificaciones no lo muestren',
        'Base para cursos de regularización y propedéuticos',
        'Protección contra copiar: si el alumno sale de la prueba para buscar o preguntar a una IA recibe un aviso, y a la segunda vez la sección se cierra',
      ],
      accion: 'Aplicar en mi grupo',
      destino: 'psicometrics' as const,
      url: 'https://www.psicometrics.app/pruebas-de-razonamiento',
    },
  ],

  /**
   * ⚠️ REDACCIÓN OBLIGATORIA — límites que no se pueden omitir.
   * Son las tres confusiones que generan una reclamación cara: creer que
   * un tamizaje diagnostica, que una prueba de razonamiento mide el
   * coeficiente intelectual, o que el nivel de inglés sustituye a un
   * examen certificador. Decirlo de frente cuesta menos que desdecirse.
   */
  limiteAcademico: {
    titulo: 'Lo que estas pruebas no son',
    puntos: [
      'Ninguna de estas aplicaciones es un diagnóstico: son tamizajes y orientaciones revisados por profesionales con cédula.',
      'Las pruebas de habilidades no son pruebas de coeficiente intelectual.',
      'El nivel de inglés ubica al alumno en el Marco Común Europeo con una equivalencia orientativa. No es un certificado oficial ni sustituye a Cambridge, TOEFL iBT o IELTS.',
    ],
  },

  /** Para qué las usa un centro en la práctica. Vende mejor que la lista. */
  usos: 'Útil para diagnóstico de ingreso, cursos propedéuticos, formación de grupos de inglés y orientación.',

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
    'La institución recibe el mapa del grupo. Los resultados individuales son de cada alumno y de su familia.',

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
      'Respondes en línea y ves tu resultado orientativo al momento, sin costo. El informe firmado por un psicólogo con cédula es opcional, con aportación desde $49.',
  },

  /**
   * ESCALERA DE PRECIOS — la misma en los tres servicios de familia.
   *
   * El primer peldaño cuesta $0 y entrega algo real al instante. Eso es lo
   * que mueve a una familia que duda: no se le pide confiar antes de ver.
   * El informe firmado y la devolución en videollamada vienen después, ya
   * con el resultado delante.
   *
   * ⚠️ REDACCIÓN OBLIGATORIA: se dice «aportación», nunca «donativo».
   * Gebenz Consultoría y Negocios no es donataria autorizada, y la palabra
   * «donativo» implica un comprobante deducible que no podemos emitir.
   */
  escalera: {
    etiqueta: 'Cómo funciona',
    titulo: 'Empezar cuesta $0.',
    entrada:
      'Respondes en línea y recibes tu resultado orientativo al momento, sin pagar nada y sin dejar tarjeta. Lo demás lo decides después, ya con el resultado delante.',
    pasos: [
      {
        numero: '01',
        titulo: 'Resultado orientativo',
        precio: 'Gratis',
        nota: 'Al instante, en línea',
        texto:
          'Respondes el cuestionario y ves tu resultado al terminar. No hace falta tarjeta ni esperar a nadie.',
      },
      {
        numero: '02',
        titulo: 'Informe firmado',
        prefijo: 'Aportación desde',
        precio: '$49 MXN',
        nota: 'Opcional',
        texto:
          'Un psicólogo con cédula verificada revisa y firma tu informe, con folio y código QR verificables. Si hace falta, te canaliza con un especialista.',
      },
      {
        numero: '03',
        titulo: 'Videollamada de devolución',
        precio: '$349 MXN',
        nota: 'Opcional',
        texto:
          'Una sesión con el psicólogo para repasar el informe, resolver dudas y acordar qué hacer en casa y en la escuela.',
      },
    ],
    nota: 'La aportación sostiene el trabajo de revisión profesional. No es un donativo deducible de impuestos.',
  },

  /**
   * Los tres servicios para familias. Todos se responden y se resuelven en
   * PsicoMetrics, donde vive el cuestionario: pedir aquí los mismos datos
   * que va a pedir la plataforma pierde a quien ya venía decidido.
   */
  productos: [
    {
      id: 'valoracion-psicopedagogica',
      nombre: 'Evaluación psicopedagógica',
      resuelve: 'Sabe cómo aprende y qué le cuesta.',
      edades: 'De 3 a 18 años',
      resumen:
        'La responde mamá, papá o tutor en unos veinte minutos. Te dice cómo aprende tu hija o hijo, qué se le facilita y qué le cuesta.',
      detalle: [
        'La contesta quien ejerce la patria potestad, no el menor',
        'Unos veinte minutos desde el teléfono, cuando puedas',
        'Explora atención, memoria, lectura, escritura y cálculo',
        'Señala si conviene una valoración más a fondo y con quién',
      ],
      accion: 'Hacerla gratis',
      url: 'https://www.psicometrics.app/tamizaje-familiar',
      destacado: true,
    },
    {
      id: 'orientacion-vocacional',
      nombre: 'Orientación vocacional',
      resuelve: 'Elige carrera con datos, no con corazonadas.',
      edades: 'Adolescentes y adultos',
      resumen:
        'Perfil de intereses y aptitudes con el modelo RIASEC, y un mapa de opciones de prepa y universidad acorde al perfil obtenido.',
      detalle: [
        'Modelo RIASEC de intereses y aptitudes',
        'Mapa de carreras y planteles acorde al perfil obtenido',
        'Útil antes de elegir prepa, universidad o cambio de carrera',
        'También para adultos que estén replanteando su rumbo',
      ],
      accion: 'Hacerla gratis',
      url: 'https://www.psicometrics.app/orientacion-vocacional',
      destacado: false,
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
