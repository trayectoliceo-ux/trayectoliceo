/**
 * FORMACIÓN PROFESIONAL
 * ---------------------
 * Editar aquí duración, modalidad, requisitos, temario y precio.
 *
 * IMPORTANTE — campo `constancia`: debe decir exactamente lo que la
 * institución puede emitir. Si no hay reconocimiento oficial (RVOE, DGP,
 * STPS), se indica «constancia de participación» y nada más. No usar la
 * palabra «certificación» para un curso que solo emite constancia.
 */

export type Programa = {
  slug: string;
  titulo: string;
  tipo: 'Diplomado' | 'Curso';
  duracion: string;
  modalidad: string;
  dirigidoA: string;
  requisitos: string[];
  constancia: string;
  precio: string;
  notaPrecio?: string;
  resumen: string;
  temario: { modulo: string; titulo: string; contenidos: string }[];
};

export const programas: Programa[] = [
  {
    slug: 'diplomado-deteccion-y-evaluacion',
    titulo: 'Detección y evaluación de altas capacidades',
    tipo: 'Diplomado',
    duracion: '120 horas · 6 módulos · 5 meses',
    modalidad: 'En línea con sesiones sincrónicas semanales',
    dirigidoA:
      'Psicólogos, psicopedagogos y orientadores educativos con título profesional.',
    requisitos: [
      'Título profesional en Psicología, Psicopedagogía o área afín',
      'Cédula profesional vigente',
      'Disponibilidad para una sesión sincrónica semanal de dos horas',
    ],
    constancia:
      '[Constancia de participación con valor curricular emitida por Gebenz Consultoría y Negocios, S.A. de C.V. — AJUSTAR a lo que realmente pueda emitirse]',
    precio: '[$00,000 MXN]',
    notaPrecio: '[Indicar si hay pago en parcialidades]',
    resumen:
      'El programa completo: de los modelos teóricos a la redacción del informe y la devolución a la familia.',
    temario: [
      {
        modulo: 'I',
        titulo: 'Marcos teóricos',
        contenidos:
          'Modelos de capacidad, talento y desarrollo. Recorrido crítico y sus consecuencias prácticas en la evaluación.',
      },
      {
        modulo: 'II',
        titulo: 'Detección en el aula',
        contenidos:
          'Indicadores observables, escalas de nominación docente y familiar, sesgos frecuentes en la nominación.',
      },
      {
        modulo: 'III',
        titulo: 'Instrumentos',
        contenidos:
          'Selección, aplicación y limitaciones de las pruebas de uso habitual. Perfiles atípicos y doble excepcionalidad.',
      },
      {
        modulo: 'IV',
        titulo: 'Interpretación',
        contenidos:
          'Integración de datos cuantitativos y cualitativos. Qué no puede concluirse a partir de un puntaje.',
      },
      {
        modulo: 'V',
        titulo: 'Informe y devolución',
        contenidos:
          'Redacción del informe psicopedagógico, devolución a la familia y comunicación con el centro escolar.',
      },
      {
        modulo: 'VI',
        titulo: 'Respuesta educativa',
        contenidos:
          'Enriquecimiento, agrupamiento y aceleración. Criterios de decisión y seguimiento del caso.',
      },
    ],
  },
  {
    slug: 'curso-deteccion-en-el-aula',
    titulo: 'Detección en el aula para docentes',
    tipo: 'Curso',
    duracion: '20 horas · 5 sesiones',
    modalidad: 'En línea o presencial en el centro',
    dirigidoA:
      'Docentes de educación básica y media, tutores y coordinadores académicos.',
    requisitos: ['Ejercicio docente en activo'],
    constancia: '[Constancia de participación — AJUSTAR]',
    precio: '[$0,000 MXN por participante]',
    notaPrecio: '[Indicar precio por grupo completo si aplica]',
    resumen:
      'Qué se puede observar desde el aula, qué no, y en qué momento exacto corresponde derivar.',
    temario: [
      {
        modulo: 'I',
        titulo: 'Qué es y qué no es',
        contenidos: 'Ideas frecuentes que retrasan la identificación.',
      },
      {
        modulo: 'II',
        titulo: 'Indicadores en el aula',
        contenidos: 'Comportamientos observables y registro sistemático.',
      },
      {
        modulo: 'III',
        titulo: 'Perfiles que se pasan por alto',
        contenidos: 'Bajo rendimiento, niñas, doble excepcionalidad.',
      },
      {
        modulo: 'IV',
        titulo: 'Límite del rol docente',
        contenidos: 'Dónde termina la observación y empieza la evaluación.',
      },
      {
        modulo: 'V',
        titulo: 'Derivación',
        contenidos: 'Cómo se documenta un caso y a quién se entrega.',
      },
    ],
  },
  {
    slug: 'curso-informe-psicopedagogico',
    titulo: 'Redacción del informe psicopedagógico',
    tipo: 'Curso',
    duracion: '16 horas · 4 sesiones',
    modalidad: 'En línea con sesiones sincrónicas',
    dirigidoA: 'Profesionales que ya aplican instrumentos de evaluación.',
    requisitos: [
      'Cédula profesional vigente',
      'Experiencia previa en aplicación de pruebas',
    ],
    constancia: '[Constancia de participación — AJUSTAR]',
    precio: '[$0,000 MXN]',
    resumen:
      'Un informe que la familia entiende y que el centro escolar puede convertir en decisiones.',
    temario: [
      {
        modulo: 'I',
        titulo: 'Estructura',
        contenidos: 'Secciones, orden y extensión razonable.',
      },
      {
        modulo: 'II',
        titulo: 'Lenguaje',
        contenidos: 'Precisión técnica sin jerga innecesaria. Qué afirmar y qué matizar.',
      },
      {
        modulo: 'III',
        titulo: 'Recomendaciones',
        contenidos: 'Cómo redactar indicaciones que un centro pueda aplicar.',
      },
      {
        modulo: 'IV',
        titulo: 'Ética y resguardo',
        contenidos: 'Confidencialidad, consentimiento y conservación del expediente.',
      },
    ],
  },
];

export const formacionPagina = {
  etiqueta: 'Formación profesional',
  titulo: 'Especialización para quien evalúa y para quien enseña.',
  entrada:
    'Programas dirigidos a profesionales con título y a docentes en activo. El contenido se sostiene en marcos teóricos declarados y en práctica supervisada sobre casos reales anonimizados.',
  aviso:
    'La inscripción se realiza por contacto directo. Se verifica documentación antes de confirmar el lugar.',
};
