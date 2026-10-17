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
    gancho: 'Respondes en línea y ves tu resultado al momento, gratis. El informe firmado es opcional.',
    accion: 'Empezar gratis',
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
   * Lo que el psicólogo puede hacer desde la plataforma además de evaluar.
   * Son las tres funciones que convierten una herramienta de informes en
   * una fuente de trabajo, y por eso van juntas y no repartidas.
   *
   * ⚠️ Esta página es de alcance educativo. No añadir aquí servicios de
   * ámbito laboral ni enlazarlos.
   */
  herramientas: {
    etiqueta: 'Además de evaluar',
    titulo: 'Tu agenda, tu perfil público y los estudios de escuela.',
    puntos: [
      {
        titulo: 'Agenda de citas en línea',
        texto:
          'Tienes tu propio enlace para compartir. Quien lo abre ve tus horarios libres y reserva sin llamadas ni mensajes de ida y vuelta.',
      },
      {
        titulo: 'Perfil en el directorio público',
        texto:
          'Apareces con tu cédula verificada en el directorio que ven las familias, y recibes consultas directas desde ahí.',
      },
      {
        titulo: 'Estudios masivos para escuelas',
        texto:
          'Aplicas los estudios de salud psicológica y las pruebas de habilidades en centros escolares, cuando la administración lo autoriza.',
      },
    ],
    accion: 'Acceso PsicoMetrics',
    url: 'https://psicometrics.app',
  },
};

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
  servicios: [
    {
      id: 'tamizaje-escolar',
      etiqueta: 'Preescolar a secundaria',
      nombre: 'Tamizaje escolar por grupo',
      precio: 'Sin costo',
      precioNota: 'Ni la escuela ni las familias pagan',
      resumen:
        'Las familias autorizan y responden desde su propio enlace. El centro recibe un semáforo por aula y la carta para las familias.',
      puntos: [
        'La escuela nunca ve el resultado individual',
        'No se guarda el nombre del menor',
        'Incluye capacitación de un docente por grupo evaluado',
        'Ruta de derivación para los casos que lo requieran',
      ],
      accion: 'Ver el tamizaje escolar',
      url: 'https://psicometrics.app/tamizaje-escolar',
      destacado: true,
    },
    {
      id: 'salud-psicologica',
      etiqueta: 'Preparatorias y universidades',
      nombre: 'Estudio de salud psicológica',
      precio: 'Aplicación gratuita',
      precioNota: 'Cada alumno ve su resultado gratis',
      resumen:
        'Un enlace o código QR por grupo, que se comparte por WhatsApp o correo. Cada alumno ve su resultado gratis al terminar.',
      puntos: [
        'Ánimo (PHQ-9), ansiedad (GAD-7), estrés (DASS-21) y alcohol (AUDIT)',
        'Si un alumno marca riesgo, el psicólogo recibe un aviso inmediato para contactarlo',
        'La institución recibe resultados por grupo, a partir de 10 respuestas, nunca nombres',
        'El informe institucional con folio y el Excel se cotizan por alumno',
      ],
      accion: 'Ver el estudio',
      url: 'https://psicometrics.app/salud-psicologica-escuelas',
    },
    {
      id: 'pruebas-razonamiento',
      etiqueta: 'Secundaria, prepa y universidad',
      nombre: 'Pruebas de habilidades y conocimientos',
      precio: 'Aplicación gratuita',
      precioNota: 'Resultado inmediato para el alumno',
      resumen:
        'Misma lógica: aplicar no cuesta, el alumno ve su resultado al instante y el informe por grupo se cotiza por alumno.',
      puntos: [
        'Razonamiento verbal, numérico y abstracto',
        'Inglés por nivel del Marco Común Europeo, de A1 a C1, con equivalencia orientativa a Cambridge, TOEFL iBT e IELTS',
        'Aritmética, álgebra, geometría y lenguaje por grado escolar, de 6.º de primaria a bachillerato: dice hasta qué grado domina cada alumno',
        'Tiempo por sección controlado y protección contra copiar: si el alumno sale de la prueba para buscar o preguntar a una IA recibe un aviso, y a la segunda vez la sección se cierra',
      ],
      accion: 'Ver las pruebas',
      url: 'https://psicometrics.app/pruebas-de-razonamiento',
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

/**
 * CONSULTA DIRECTA CON UN PSICÓLOGO
 * ---------------------------------
 * Sección compartida por la portada y /familias. Resuelve la pregunta que
 * una familia se hace después de leer un resultado: «¿y ahora con quién
 * hablo?». Mandarla a un formulario de contacto en ese momento es perderla;
 * el directorio le deja ver a la persona y reservar en el acto.
 */
export const directorio = {
  etiqueta: 'Consulta directa',
  titulo: 'Agenda una consulta con un psicólogo verificado.',
  entrada:
    'Un directorio público de psicólogos con cédula profesional verificada. Quien tiene agenda en línea muestra el botón de agendar, y reservas directo: sin llamadas y sin esperar respuesta.',
  puntos: [
    'Cédula profesional verificada, visible en el perfil',
    'Agenda en línea con horarios reales disponibles',
    'Reservas en el momento, sin llamadas ni mensajes de ida y vuelta',
    'Atención en línea o presencial, según el especialista',
  ],
  accion: 'Ver el directorio',
  url: 'https://psicometrics.app/directorio',
};

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
      nombre: 'Valoración psicopedagógica',
      edades: 'De 3 a 18 años',
      resumen:
        'La responde mamá, papá o tutor, en unos veinte minutos. Te dice cómo aprende tu hija o hijo, qué se le facilita y qué le cuesta.',
      accion: 'Hacerla gratis',
      url: 'https://psicometrics.app/tamizaje-familiar',
      destacado: true,
    },
    {
      id: 'orientacion-vocacional',
      nombre: 'Orientación vocacional',
      edades: 'Adolescentes y adultos',
      resumen:
        'Perfil de intereses y aptitudes con el modelo RIASEC, y un mapa de opciones de prepa y universidad acorde al perfil.',
      accion: 'Hacerla gratis',
      url: 'https://psicometrics.app/orientacion-vocacional',
      destacado: false,
    },
    {
      id: 'bienestar-emocional',
      nombre: 'Bienestar emocional, ánimo y ansiedad',
      edades: 'Adultos y adolescentes de 12 a 17 con autorización del tutor',
      resumen:
        'Escalas PHQ-9 y GAD-7 para ubicar cómo andas de ánimo y de ansiedad, y qué conviene hacer a partir de ahí.',
      accion: 'Hacerla gratis',
      url: 'https://psicometrics.app/bienestar',
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
