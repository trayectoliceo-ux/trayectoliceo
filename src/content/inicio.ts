/**
 * CONTENIDO DE LA PÁGINA DE INICIO
 * --------------------------------
 * Los tres datos del bloque «problema» están como marcadores editables.
 * No publicar sin sustituir valor y fuente por cifras verificadas.
 */

export const portada = {
  /**
   * La afirmación es sobre el problema del visitante, no sobre nosotros.
   * `rotativa` marca la posición de la palabra que cambia: es el cierre de
   * la frase, no un adorno a mitad de línea.
   */
  titulo: ['Detectamos lo que', 'la escuela no', 'alcanza a'],
  /**
   * Cada palabra completa la frase con una lectura distinta del mismo
   * comportamiento. Es el argumento entero del negocio en cuatro palabras.
   */
  rotativas: ['ver.'],
  subtitulo:
    'Evaluación psicopedagógica profesional para niños y adolescentes de 3 a 18 años. Tamizajes escolares, valoraciones para familias y herramientas para psicólogos.',
  /** Segmentar aquí ahorra al visitante recorrer la página entera. */
  /** Las dos acciones que dejan dinero: contratar o sumarse a la red. */
  acciones: [
    { titulo: 'Quiero una evaluación', href: '/familias', tono: 'solido' as const },
    { titulo: 'Registro de profesionales', href: '/red', tono: 'contorno' as const },
  ],
  /** Marcas de la línea de trayecto en la portada. Son etapas, no adornos. */
  hitos: ['Detección', 'Evaluación', 'Enriquecimiento', 'Trayectoria'],
  /**
   * Foto de portada. Al tener la imagen, poner la ruta en `src`
   * (por ejemplo '/imagenes/portada.jpg') y el marcador desaparece solo.
   */
  /**
   * Anuncios que rotan sobre la portada. Cada uno lleva a una acción
   * concreta: sin destino, un anuncio solo es ruido.
   */
  /**
   * Anuncios que rotan sobre la portada. Cada uno lleva precio y destino:
   * un anuncio sin cifra y sin ruta es decoración, no venta.
   */
  promociones: [
    {
      etiqueta: 'Familias',
      texto: 'Valoración psicopedagógica en línea · $490 · informe en 72 horas',
      accion: 'Contratar',
      href: '/familias',
    },
    {
      etiqueta: 'Escuelas',
      texto: 'Tamizaje de aula desde $150 por alumno, con semáforo por grupo',
      accion: 'Solicitar propuesta',
      href: '/escuelas',
    },
    {
      etiqueta: 'Psicólogos',
      texto: 'Primer caso completo gratis en PsicoMetrics y recibe derivaciones',
      accion: 'Comenzar',
      href: '/psicologos',
    },
    {
      etiqueta: 'Certifícate',
      texto: 'Certificación en altas capacidades y perfil STEAM · autogestiva',
      accion: 'Ver programas',
      href: '/certificate',
    },
    {
      etiqueta: 'Docentes',
      texto: 'Curso asincrónico de detección en el aula · 20 horas · desde $850',
      accion: 'Ver curso',
      href: '/certificate',
    },
    {
      etiqueta: 'Titulación',
      texto: 'Acuerdo 286 en Pedagogía · preparación desde $3,500',
      accion: 'Ver etapas',
      href: '/certificate#titulacion',
    },
  ],
  imagen: {
    src: '/imagenes/portada-recorte.png',
    descripcion:
      'Dos niños con gafas de protección y el uniforme de Trayecto Liceo, sosteniendo un matraz y un microscopio',
    /** Fondo transparente: se apoya en la página, sin marco. */
    ajuste: 'recorte' as const,
  },
};

export const problema = {
  etiqueta: 'El problema',
  titulo: 'Lo que no se identifica, no se atiende.',
  entrada:
    'La alta capacidad no se manifiesta como rendimiento alto de forma automática. Sin un procedimiento de detección en el aula, buena parte de los casos pasa inadvertida durante toda la escolaridad.',
  /**
   * Cifras con fuente declarada. Al actualizar, mantener siempre la
   * fuente: un dato sin origen en esta página contradice todo lo que
   * afirmamos sobre método verificable.
   */
  datos: [
    {
      valor: 'Más del 95 %',
      descripcion:
        'de los alumnos con altas capacidades no está identificado en el sistema educativo mexicano.',
      fuente: 'Centro de Atención al Talento (CEDAT)',
    },
    {
      valor: 'Menos del 5 %',
      descripcion:
        'de los docentes en activo ha recibido formación específica en detección de altas capacidades.',
      fuente: 'MEJOREDU · Estudios de Educación Inclusiva en México (Redalyc)',
    },
    {
      valor: '8 de cada 10',
      descripcion:
        'casos identificados llegan al servicio de orientación por conducta, desinterés o bajo rendimiento, no por desempeño sobresaliente.',
      fuente: 'FEMEXDI y diagnósticos clínicos del CEDAT',
    },
  ],
};

export const queHacemos = {
  etiqueta: 'Para familias',
  titulo: 'Acompañamiento completo, del diagnóstico al aula.',
  entrada:
    'Un proceso con principio y final, no una consulta suelta. Cada fase decide si tiene sentido pasar a la siguiente.',
  bloques: [
    {
      indice: '01',
      titulo: 'Evaluación y diagnóstico',
      resumen:
        'Identificamos altas capacidades, aptitudes sobresalientes o dificultades de aprendizaje con instrumentos estandarizados y baremos vigentes. Siempre con profesional acreditado.',
      href: '/contacto',
      accion: 'Agendar valoración',
      imagen: {
        src: '/imagenes/protocolo-evaluacion.jpg',
        descripcion:
          'Protocolo de evaluación anotado a mano sobre una mesa con material de trabajo infantil',
      },
    },
    {
      indice: '02',
      titulo: 'Talleres y enriquecimiento',
      resumen:
        'Programas por proyectos sin techo de dificultad, para que el alumno encuentre por fin resistencia real en vez de aburrimiento y frustración en el aula.',
      href: '/talleres',
      accion: 'Ver talleres',
      imagen: {
        src: '/imagenes/taller-steam.jpg',
        descripcion:
          'Alumnos construyendo prototipos con cartón, circuitos y material de dibujo en un taller STEAM',
      },
    },
    {
      indice: '03',
      titulo: 'Orientación familiar',
      resumen:
        'Informe detallado con pautas concretas para aplicar en casa y para plantear al colegio. Por escrito, con responsables y plazos, no con recomendaciones vagas.',
      href: '/trayectoria',
      accion: 'Conocer el servicio',
      imagen: {
        src: '/imagenes/aula.jpg',
        descripcion: 'Aula con mesas de trabajo agrupadas y luz natural lateral',
      },
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
      titulo: 'Valoración integral',
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
        'Es frecuente y se puede trabajar igual. El acompañamiento avanza con la familia y el alumno, y preparamos la documentación para plantear el caso al centro cuando exista disposición. También ofrecemos capacitación al equipo docente si el colegio decide abrirse al tema.',
    },
    {
      pregunta: '¿Cómo protegen los datos de mi hijo?',
      respuesta:
        'El expediente de trabajo opera bajo identificador, separado de los datos de identificación, que viajan y se almacenan cifrados. Los accesos quedan registrados y nada se usa fuera de lo que autorices por escrito.',
    },
    {
      pregunta: '¿Qué validez tiene el informe que entregan?',
      respuesta:
        'Lo firma un profesional con cédula, que responde por su contenido. Sirve para plantear el caso ante el colegio y para orientar decisiones académicas. No es un documento oficial de la autoridad educativa, y nadie serio te dirá lo contrario.',
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
