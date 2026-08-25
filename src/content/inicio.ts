/**
 * CONTENIDO DE LA PÁGINA DE INICIO
 * --------------------------------
 * Los tres datos del bloque «problema» están como marcadores editables.
 * No publicar sin sustituir valor y fuente por cifras verificadas.
 */

export const portada = {
  /** La afirmación es sobre el problema del visitante, no sobre nosotros. */
  titulo: ['Un niño que se aburre', 'en clase no siempre', 'está desmotivado.'],
  subtitulo:
    'A veces está sin identificar. Detectarlo no es intuición: es un procedimiento, y alguien tiene que saber aplicarlo.',
  acciones: [
    { titulo: 'Programas para familias', href: '/talleres', tono: 'solido' as const },
    { titulo: 'Programas para colegios', href: '/colegios', tono: 'contorno' as const },
  ],
  /** Marcas de la línea de trayecto en la portada. Son etapas, no adornos. */
  hitos: ['Detección', 'Evaluación', 'Enriquecimiento', 'Trayectoria'],
};

export const problema = {
  etiqueta: 'El problema',
  titulo: 'Lo que no se identifica, no se atiende.',
  entrada:
    'La alta capacidad no se manifiesta como rendimiento alto de forma automática. Sin un procedimiento de detección en el aula, buena parte de los casos pasa inadvertida durante toda la escolaridad.',
  /**
   * [VERIFICAR ANTES DE PUBLICAR]
   * Sustituir `valor` y `fuente` por cifras acreditables. Si un dato no se
   * puede acreditar, se elimina la tarjeta: no se publica aproximado.
   */
  datos: [
    {
      valor: '[00 %]',
      descripcion:
        'de los alumnos con altas capacidades no está identificado en el sistema educativo mexicano.',
      fuente: '[Fuente pendiente de verificación]',
    },
    {
      valor: '[00 %]',
      descripcion:
        'de los docentes en activo ha recibido formación específica en detección de altas capacidades.',
      fuente: '[Fuente pendiente de verificación]',
    },
    {
      valor: '[0 de cada 10]',
      descripcion:
        'casos identificados llegan al servicio de orientación por conducta, no por rendimiento.',
      fuente: '[Fuente pendiente de verificación]',
    },
  ],
};

export const queHacemos = {
  etiqueta: 'Qué hacemos',
  titulo: 'Tres frentes, un mismo método.',
  entrada:
    'Formamos al docente que lo detecta y al profesional que lo evalúa. Y mientras tanto, trabajamos con el niño.',
  bloques: [
    {
      indice: 'I',
      titulo: 'Talleres STEAM',
      resumen:
        'Enriquecimiento por proyectos para niños y jóvenes, sin techo de dificultad. El alumno avanza hasta donde llega, no hasta donde marca el grupo.',
      href: '/talleres',
      accion: 'Ver talleres',
      marcador: 'Mesa de trabajo con materiales de prototipado, vista cenital',
    },
    {
      indice: 'II',
      titulo: 'Formación profesional',
      resumen:
        'Diplomados y cursos para psicólogos, psicopedagogos y orientadores que quieren especializarse en detección y evaluación de altas capacidades.',
      href: '/formacion',
      accion: 'Ver programas',
      marcador: 'Protocolo de evaluación anotado a mano sobre escritorio',
    },
    {
      indice: 'III',
      titulo: 'Programas para colegios',
      resumen:
        'Capacitación del claustro en el propio centro y certificación anual como Escuela que identifica talento, con protocolo de derivación incluido.',
      href: '/colegios',
      accion: 'Ver programas',
      marcador: 'Aula vacía con luz lateral, pupitres alineados',
    },
  ],
};

export const metodo = {
  etiqueta: 'Cómo trabajamos',
  titulo: 'Del primer contacto al seguimiento.',
  entrada:
    'El orden importa: cada fase decide si tiene sentido pasar a la siguiente. Ninguna se salta.',
  /** Sí es una secuencia real: la numeración informa, no decora. */
  pasos: [
    {
      numero: '01',
      titulo: 'Primer contacto',
      descripcion:
        'Una conversación sin costo para entender la situación y decidir si somos el servicio adecuado. A veces la respuesta es que no lo somos, y lo decimos.',
    },
    {
      numero: '02',
      titulo: 'Valoración de la situación',
      descripcion:
        'Revisamos historial escolar, informes previos y observación en aula cuando el centro colabora. Si hace falta evaluación psicopedagógica, derivamos a profesional acreditado.',
    },
    {
      numero: '03',
      titulo: 'Programa de trabajo',
      descripcion:
        'Definimos objetivos concretos y verificables, con las personas responsables de cada uno: familia, centro y equipo. Por escrito.',
    },
    {
      numero: '04',
      titulo: 'Seguimiento',
      descripcion:
        'Revisiones periódicas con ajuste del programa. El acompañamiento termina cuando los objetivos se cumplen, no cuando se acaba el paquete.',
    },
  ],
};

export const psicometrics = {
  etiqueta: 'Plataforma',
  titulo: 'PsicoMetrics',
  descriptor: 'Apoyo a la evaluación psicopedagógica',
  /** El origen importa: la plataforma nació de un problema real, no al revés. */
  entrada:
    'Nació de nuestro propio diagnóstico de habilidades. Aplicándolo caso tras caso quedó claro que el cuello de botella no era evaluar, sino registrar, comparar y recuperar lo evaluado. PsicoMetrics es la herramienta que construimos para resolverlo, ahora disponible para cualquier profesional.',
  caracteristicas: [
    'Expedientes con historial completo por caso',
    'Registro estructurado de instrumentos aplicados',
    'Informes exportables con formato configurable',
    'Uso restringido a profesional acreditado',
  ],
  accion: 'Conocer PsicoMetrics',
};

export const pruebaSocial = {
  etiqueta: 'Confían en el método',
  /**
   * [PENDIENTE] No inventar nombres, cifras ni citas. Sustituir cada
   * marcador por testimonios con autorización por escrito y logotipos con
   * permiso de uso de marca.
   */
  testimonios: [
    {
      cita: '[Testimonio pendiente de autorización]',
      autor: '[Nombre]',
      cargo: '[Cargo, institución]',
    },
    {
      cita: '[Testimonio pendiente de autorización]',
      autor: '[Nombre]',
      cargo: '[Cargo, institución]',
    },
  ],
  /** Espacios para logotipos de centros con convenio vigente. */
  logotipos: ['[Centro 1]', '[Centro 2]', '[Centro 3]', '[Centro 4]'],
};


/* ------------------------------------------------------------------ */
/* Preguntas frecuentes                                               */
/* ------------------------------------------------------------------ */

/**
 * Responden a búsquedas reales de familias. Se muestran en la página y
 * alimentan los datos estructurados de tipo FAQPage: Google solo acepta
 * ese marcado si las preguntas son visibles para el visitante.
 *
 * Al editarlas, mantener la respuesta por debajo de unas 50 palabras y
 * empezar respondiendo, no contextualizando.
 */
export const preguntas = {
  etiqueta: 'Preguntas frecuentes',
  titulo: 'Lo que más nos preguntan las familias.',
  lista: [
    {
      pregunta: '¿Cómo sé si mi hijo tiene altas capacidades?',
      respuesta:
        'Desde casa no se sabe con certeza, y ninguna prueba de internet lo resuelve. Hay indicadores observables —aprendizaje rápido sin instrucción, preguntas que exceden la edad, aburrimiento persistente en clase, sensibilidad marcada— pero confirmarlo requiere evaluación psicopedagógica con profesional acreditado.',
    },
    {
      pregunta: '¿Ustedes hacen la evaluación psicopedagógica?',
      respuesta:
        'La evaluación la realiza siempre un profesional acreditado, dentro o fuera de nuestro equipo según el caso. Lo que hacemos en Trayecto Liceo es orientar, formar a quien detecta y a quien evalúa, y acompañar al alumno con talleres de enriquecimiento.',
    },
    {
      pregunta: '¿Mi hijo necesita un diagnóstico para entrar a los talleres?',
      respuesta:
        'No. Los talleres STEAM están abiertos a cualquier niño o joven interesado en el rango de edad indicado. No pedimos informe previo ni diagnóstico.',
    },
    {
      pregunta: '¿Qué pasa si el colegio no quiere colaborar?',
      respuesta:
        'Es frecuente y se puede trabajar igual. El acompañamiento avanza con la familia y el alumno, y preparamos la documentación para plantear el caso al centro cuando exista disposición. También ofrecemos capacitación al claustro si el colegio decide abrirse al tema.',
    },
    {
      pregunta: '¿Atienden fuera de Puebla?',
      respuesta:
        'Los talleres STEAM son presenciales en Puebla. La formación profesional, la orientación de trayectoria y buena parte de la capacitación docente se imparten en línea, así que trabajamos con familias y centros de todo México.',
    },
    {
      pregunta: '¿Cuánto cuesta la primera conversación?',
      respuesta:
        'Nada. Sirve para entender la situación y decidir si somos el servicio adecuado. Si creemos que no lo somos, lo decimos y orientamos hacia dónde acudir.',
    },
  ],
};
