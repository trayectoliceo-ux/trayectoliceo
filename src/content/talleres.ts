/**
 * CATÁLOGO DE TALLERES STEAM
 * --------------------------
 * Editar aquí edades, duración, cupo, temario y precio.
 * El `slug` forma la URL /talleres/{slug}: cambiarlo rompe enlaces
 * existentes, así que conviene fijarlo antes de publicar.
 *
 * La inscripción es por contacto. No hay pago en línea.
 */

export type Taller = {
  slug: string;
  /** Identificador de cobro en el catálogo del servidor. */
  idPago: string;
  /** Próximas convocatorias. Editar cada ciclo. */
  fechas?: { inicio: string; sede: string; lugares: string }[];
  titulo: string;
  linea: string;
  edades: string;
  duracion: string;
  cupo: string;
  modalidad: string;
  precio: string;
  /** Nota sobre el precio: descuentos, materiales incluidos, hermanos. */
  notaPrecio?: string;
  resumen: string;
  descripcion: string[];
  temario: { titulo: string; detalle: string }[];
  materiales: string;
  marcador: string;
};

export const talleres: Taller[] = [
  {
    slug: 'construccion-y-mecanismos',
    idPago: 'taller-construccion-y-mecanismos',
    fechas: [
      { inicio: '[Sábados desde el 00 de febrero]', sede: '31 Poniente 4128, Puebla', lugares: '[0] lugares' },
      { inicio: '[Sábados desde el 00 de mayo]', sede: '31 Poniente 4128, Puebla', lugares: '[0] lugares' },
    ],
    titulo: 'Construcción y mecanismos',
    linea: 'Ingeniería',
    edades: '6 a 8 años',
    duracion: '8 sesiones de 90 minutos',
    cupo: '10 participantes',
    modalidad: 'Presencial',
    precio: '$2,800 MXN',
    notaPrecio: '[Indicar si incluye materiales]',
    resumen:
      'Palancas, engranes y estructuras. El proyecto se complica hasta donde el grupo lo lleve.',
    descripcion: [
      'El taller parte de un mecanismo simple y lo somete a exigencias crecientes: más carga, más alcance, menos piezas. No hay una versión correcta del proyecto final.',
      'El trabajo es por parejas rotativas. Cada sesión cierra con una revisión en la que el niño explica qué decidió y por qué, que es donde aparece el razonamiento que buscamos observar.',
    ],
    temario: [
      { titulo: 'Fuerza y equilibrio', detalle: 'Palanca, punto de apoyo, carga.' },
      { titulo: 'Transmisión', detalle: 'Engranes, poleas y relación de velocidad.' },
      { titulo: 'Estructuras', detalle: 'Triangulación, tensión y compresión.' },
      { titulo: 'Restricción', detalle: 'Rediseño del mecanismo con la mitad de piezas.' },
      { titulo: 'Proyecto abierto', detalle: 'Definición y construcción de un mecanismo propio.' },
    ],
    materiales: 'Kit de construcción reutilizable proporcionado en sede.',
    marcador: 'Manos infantiles ajustando un engrane de madera sobre mesa de trabajo',
  },
  {
    slug: 'pensamiento-computacional',
    idPago: 'taller-pensamiento-computacional',
    fechas: [
      { inicio: '[Sábados desde el 00 de febrero]', sede: '31 Poniente 4128, Puebla', lugares: '[0] lugares' },
    ],
    titulo: 'Pensamiento computacional',
    linea: 'Tecnología',
    edades: '9 a 12 años',
    duracion: '10 sesiones de 2 horas',
    cupo: '12 participantes',
    modalidad: 'Presencial',
    precio: '$3,600 MXN',
    resumen:
      'Del algoritmo en papel al programa que falla y hay que depurar. La depuración es el contenido.',
    descripcion: [
      'Empezamos sin computadora: describir un proceso con precisión suficiente para que otra persona lo ejecute sin preguntar. Después se traduce a código.',
      'El objetivo no es terminar un programa que funcione, sino sostener el trabajo cuando no funciona. Ese es el punto donde el alumno con alta capacidad suele encontrar por primera vez una dificultad real.',
    ],
    temario: [
      { titulo: 'Secuencia y precisión', detalle: 'Algoritmos en lenguaje natural.' },
      { titulo: 'Descomposición', detalle: 'Partir un problema grande en partes resolubles.' },
      { titulo: 'Iteración y condición', detalle: 'Ciclos, decisiones y casos borde.' },
      { titulo: 'Depuración', detalle: 'Lectura de errores y aislamiento de la causa.' },
      { titulo: 'Proyecto', detalle: 'Programa propio con especificación escrita previa.' },
    ],
    materiales: 'Equipo de cómputo proporcionado en sede.',
    marcador: 'Cuaderno con diagrama de flujo dibujado a mano junto a un teclado',
  },
  {
    slug: 'laboratorio-de-preguntas',
    idPago: 'taller-laboratorio-de-preguntas',
    fechas: [
      { inicio: '[Sábados desde el 00 de marzo]', sede: '31 Poniente 4128, Puebla', lugares: '[0] lugares' },
    ],
    titulo: 'Laboratorio de preguntas',
    linea: 'Ciencia',
    edades: '9 a 12 años',
    duracion: '8 sesiones de 2 horas',
    cupo: '12 participantes',
    modalidad: 'Presencial',
    precio: '$3,200 MXN',
    resumen:
      'Formular una pregunta que se pueda responder con una medición. Más difícil de lo que suena.',
    descripcion: [
      'La sesión no empieza con un experimento, sino con una pregunta del propio grupo. El trabajo consiste en reformularla hasta que sea medible y en diseñar cómo medirla.',
      'Se registran los datos, se discuten los resultados que contradicen la hipótesis y se rehace el diseño. El error metodológico se trata como hallazgo, no como fallo.',
    ],
    temario: [
      { titulo: 'De la curiosidad a la hipótesis', detalle: 'Qué pregunta se puede contrastar.' },
      { titulo: 'Variables', detalle: 'Qué se cambia, qué se mide, qué se mantiene igual.' },
      { titulo: 'Registro', detalle: 'Cuaderno de datos y notación consistente.' },
      { titulo: 'Contradicción', detalle: 'Qué hacer cuando el resultado no coincide.' },
      { titulo: 'Comunicación', detalle: 'Presentación del hallazgo ante el grupo.' },
    ],
    materiales: 'Instrumental básico de laboratorio y cuaderno de registro incluidos.',
    marcador: 'Detalle de instrumental de medición y cuaderno de datos abierto',
  },
  {
    slug: 'diseno-y-fabricacion',
    idPago: 'taller-diseno-y-fabricacion',
    fechas: [
      { inicio: '[Sábados desde el 00 de marzo]', sede: '31 Poniente 4128, Puebla', lugares: '[0] lugares' },
    ],
    titulo: 'Diseño y fabricación',
    linea: 'Arte e ingeniería',
    edades: '13 a 16 años',
    duracion: '12 sesiones de 2 horas',
    cupo: '10 participantes',
    modalidad: 'Presencial',
    precio: '$4,200 MXN',
    notaPrecio: '[Indicar política de materiales del proyecto final]',
    resumen:
      'Del boceto al objeto fabricado, con las restricciones reales de material, tiempo y presupuesto.',
    descripcion: [
      'Un encargo con restricciones explícitas: material disponible, tiempo de fabricación y costo máximo. El diseño se evalúa contra esas restricciones, no contra el gusto.',
      'Se trabaja con modelado digital y fabricación física. La documentación del proceso forma parte de la entrega, igual que en un despacho.',
    ],
    temario: [
      { titulo: 'Encargo y restricciones', detalle: 'Lectura de un brief y sus límites.' },
      { titulo: 'Bocetado', detalle: 'Iteración rápida en papel antes de la pantalla.' },
      { titulo: 'Modelado digital', detalle: 'Volumen, tolerancias y preparación de archivo.' },
      { titulo: 'Fabricación', detalle: 'Corte, ensamble y ajuste sobre el objeto real.' },
      { titulo: 'Documentación', detalle: 'Memoria del proceso y defensa del diseño.' },
    ],
    materiales: 'Equipo de modelado y fabricación en sede. Materiales del proyecto final aparte.',
    marcador: 'Pieza de prototipo a medio ensamblar sobre plano impreso',
  },
  {
    slug: 'matematicas-sin-libro-de-texto',
    idPago: 'taller-matematicas-sin-libro-de-texto',
    fechas: [
      { inicio: '[Sábados desde el 00 de febrero]', sede: 'En línea', lugares: '[0] lugares' },
    ],
    titulo: 'Matemáticas sin libro de texto',
    linea: 'Matemáticas',
    edades: '10 a 14 años',
    duracion: '10 sesiones de 90 minutos',
    cupo: '12 participantes',
    modalidad: 'Presencial y en línea',
    precio: '$2,900 MXN',
    resumen:
      'Problemas que no traen método asociado. Se resuelven o no, y ambas cosas enseñan.',
    descripcion: [
      'No hay unidad temática ni procedimiento previo que aplicar. Cada sesión propone un problema y el trabajo es encontrar una vía, argumentarla y ver si resiste.',
      'Está pensado para el alumno que resuelve la tarea de la escuela en cinco minutos y lleva años sin encontrarse con un problema que le cueste.',
    ],
    temario: [
      { titulo: 'Conteo y combinatoria', detalle: 'Contar sin enumerar.' },
      { titulo: 'Invariantes', detalle: 'Qué se conserva cuando todo cambia.' },
      { titulo: 'Geometría sin fórmula', detalle: 'Construcción y demostración visual.' },
      { titulo: 'Estrategia', detalle: 'Casos pequeños, generalización, contraejemplo.' },
      { titulo: 'Argumentación', detalle: 'Escribir una solución que convenza.' },
    ],
    materiales: 'Cuadernillo de problemas incluido.',
    marcador: 'Pizarra con una demostración a medio desarrollar, sin personas',
  },
];

export const talleresPagina = {
  etiqueta: 'Talleres STEAM',
  titulo: 'Enriquecimiento por proyectos, sin techo de dificultad.',
  entrada:
    'Los talleres no adelantan contenido del curso siguiente. Profundizan en problemas que no tienen una única respuesta, que es donde el alumno con alta capacidad encuentra por fin resistencia.',
  aviso:
    'El pago en línea aparta el lugar. Antes de pagar puedes consultar el calendario y las sedes disponibles del ciclo en curso.',
};
