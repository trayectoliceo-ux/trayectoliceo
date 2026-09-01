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
    id: 'psicologos',
    href: '/psicologos',
    etiqueta: 'Psicólogos y psicopedagogos',
    titulo: 'Evalúa mejor, cobra más y recibe casos',
    gancho: 'Casos derivados, informes con folio verificable y tu primer caso sin costo.',
    accion: 'Ver cómo funciona',
    principal: true,
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
    gancho: 'Curso de 20 horas en detección temprana, con constancia.',
    accion: 'Ver el curso',
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
    titulo: ['Detecta a tiempo', 'a los alumnos'],
    rotativas: ['que necesitan apoyo.'],
    entrada:
      'Tamizaje de aula en 20 minutos por grupo. Sabrás a quién mirar de cerca antes de que el problema se convierta en reprobación.',
    precio: '$150 MXN',
    unidad: 'por alumno evaluado',
    accion: 'Solicitar propuesta',
  },

  incluye: [
    'Aplicación grupal de 15 a 20 minutos',
    'Semáforo por grupo: verde, ámbar y azul',
    'Informe grupal descargable, sin datos individuales',
    'Consentimiento digital de las familias con validez legal',
    'Canalización a psicólogo acreditado cuando procede',
  ],

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
    titulo: ['Aprende a detectar', 'lo que otros'],
    rotativas: ['no ven en tu salón.'],
    entrada:
      'Curso de 20 horas en detección temprana de dificultades de aprendizaje y altas capacidades, para docentes en activo.',
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
