/**
 * CATÁLOGO COMERCIAL
 * ------------------
 * Fuente única de precios del sitio. Ningún precio se escribe dentro de un
 * componente: si cambia una tarifa, cambia aquí y se propaga a todas las
 * páginas y a los botones de pago.
 *
 * `id` es lo que viaja a Mercado Pago. El servidor debe buscar el precio
 * por ese identificador y NUNCA aceptar el importe que mande el cliente.
 *
 * `cobro`:
 *   'directo'  → se paga en línea con Mercado Pago
 *   'contacto' → requiere conversación previa (montos altos, servicios a
 *                medida o casos que exigen valorar si procede)
 */

export type ModoCobro = 'directo' | 'contacto';

export type Producto = {
  id: string;
  nombre: string;
  precio: string;
  /** Importe en centavos de peso. Solo referencia: el real vive en el servidor. */
  importe?: number;
  unidad?: string;
  resumen: string;
  detalles: string[];
  cobro: ModoCobro;
  accion: string;
  destacado?: boolean;
  nota?: string;
};

/* ------------------------------------------------------------------ */
/* Tamizaje y evaluación                                              */
/* ------------------------------------------------------------------ */

export const evaluacion = {
  etiqueta: 'Evaluación',
  titulo: 'Tres niveles, según lo que necesites saber.',
  entrada:
    'El tamizaje detecta señales; la valoración diagnóstica confirma. No todo el mundo necesita el proceso completo, y decirlo es parte del servicio.',
  /**
   * El orden importa: el producto destacado va en el centro de la fila,
   * que es donde la vista aterriza primero en una rejilla de tres.
   */
  productos: [
    {
      id: 'valoracion-integral',
      nombre: 'Valoración diagnóstica',
      precio: '$2,000 MXN',
      importe: 200000,
      resumen:
        'Evaluación clínica profunda aplicada por un psicólogo titulado de la Red, con instrumentos formales e informe firmado.',
      detalles: [
        'Aplicada por psicólogo titulado con cédula verificada',
        'Instrumentos formales estandarizados',
        'Entrevista con la familia y revisión de historial escolar',
        'Informe psicopedagógico firmado, emitido con PsicoMetrics',
        'Sesión de entrega de resultados',
      ],
      cobro: 'contacto' as const,
      accion: 'Agendar valoración',
      nota: 'Incluye entrevista, sesiones de evaluación, informe y sesión de entrega. Se agenda tras una primera conversación sin costo.',
    },
    {
      id: 'tamizaje-digital',
      nombre: 'Tamizaje digital para familias',
      precio: '$290 MXN',
      importe: 29000,
      resumen:
        'Cuestionario normado que responden madre, padre o tutor desde casa, con reporte de alertas en 24 horas.',
      detalles: [
        'Cuestionario estructurado con baremos de referencia',
        'Procesamiento automatizado de respuestas',
        'Reporte de alertas de aprendizaje y desarrollo',
        'Entrega en 24 horas',
        'Recomendación de derivación formal si procede',
      ],
      cobro: 'directo' as const,
      accion: 'Comprar tamizaje',
      destacado: true,
      nota: 'Un tamizaje señala dónde mirar. No es un diagnóstico ni lo sustituye.',
    },
    {
      id: 'tamizaje-escolar',
      nombre: 'Tamizaje de aula',
      precio: '$150 MXN',
      unidad: 'por alumno',
      importe: 15000,
      resumen:
        'Aplicación grupal de 15 a 20 minutos que devuelve al centro un mapa de semáforo por grupo.',
      detalles: [
        'De 15 a 20 minutos por grupo',
        'Indicadores observacionales y funciones ejecutivas',
        'Escalas de riesgo y de talento',
        'Mapa de semáforo: verde sin riesgo, amarillo alerta de aprendizaje, azul indicador de alta capacidad',
        'Kit de cortesía disponible para centros que evalúan el servicio',
      ],
      cobro: 'contacto' as const,
      accion: 'Solicitar para mi colegio',
      nota: 'Se cotiza por número de alumnos. Consulta el kit de cortesía.',
    },
  ] satisfies Producto[],
};

/* ------------------------------------------------------------------ */
/* Formación profesional                                              */
/* ------------------------------------------------------------------ */

export const formacionPrecios: Producto[] = [
  {
    id: 'curso-deteccion-aula',
    nombre: 'Detección en el Aula para Docentes',
    precio: '$1,800 MXN',
    importe: 180000,
    unidad: 'por participante',
    resumen: '20 horas en 5 sesiones. Qué se observa desde el aula y cuándo derivar.',
    detalles: [
      '20 horas · 5 sesiones',
      'En línea o presencial en el centro',
      'Grupo cerrado hasta 15 docentes: $18,000 MXN',
      'Constancia de participación por docente',
    ],
    cobro: 'directo',
    accion: 'Inscribirme',
  },
  {
    id: 'diplomado-altas-capacidades',
    nombre: 'Diplomado en Detección y Evaluación de Altas Capacidades',
    precio: '$12,500 MXN',
    importe: 1250000,
    resumen:
      '120 horas en 6 módulos y 5 meses. El programa completo, del marco teórico a la devolución a la familia.',
    detalles: [
      '120 horas · 6 módulos · 5 meses',
      'En línea con sesión sincrónica semanal',
      'O en 5 parcialidades de $2,700 MXN',
      'Dirigido a profesionales con título y cédula',
      'Constancia emitida por Gebenz Consultoría y Negocios, S.A. de C.V.',
    ],
    cobro: 'directo',
    accion: 'Inscribirme al diplomado',
    destacado: true,
  },
  {
    id: 'curso-informe',
    nombre: 'Redacción del Informe Psicopedagógico',
    precio: '$2,200 MXN',
    importe: 220000,
    unidad: 'por participante',
    resumen: '16 horas en 4 sesiones. Un informe que la familia entiende y el colegio aplica.',
    detalles: [
      '16 horas · 4 sesiones',
      'En línea con sesiones sincrónicas',
      'Requiere cédula profesional vigente',
      'Constancia de participación',
    ],
    cobro: 'directo',
    accion: 'Inscribirme',
  },
];

/* ------------------------------------------------------------------ */
/* Programas institucionales                                          */
/* ------------------------------------------------------------------ */

export const institucionalPrecios: Producto[] = [
  {
    id: 'capacitacion-docente',
    nombre: 'Capacitación docente puntual',
    precio: '$25,000 a $45,000 MXN',
    resumen:
      'Formación del claustro en el propio centro, de 20 a 40 horas según el tamaño del equipo.',
    detalles: [
      'De 20 a 40 horas',
      'Presencial en el centro o en línea',
      'Constancia de participación por docente',
      'Se contrata por una sola ocasión',
    ],
    cobro: 'contacto',
    accion: 'Solicitar cotización',
  },
  {
    id: 'escuela-identifica-talento',
    nombre: 'Escuela que Identifica Talento',
    precio: '$65,000 a $95,000 MXN',
    unidad: 'por año',
    resumen:
      'Certificación anual: auditoría, formación completa del claustro, protocolo propio y sello vigente un ciclo escolar.',
    detalles: [
      'Auditoría inicial del procedimiento del centro',
      'Formación completa del claustro',
      'Protocolo de derivación propiedad del colegio',
      'Sello de vigencia anual, sujeto a revisión',
      'Acompañamiento durante el ciclo escolar',
    ],
    cobro: 'contacto',
    accion: 'Agendar reunión',
    destacado: true,
  },
];

/**
 * ⚠️ VERIFICAR ANTES DE PUBLICAR
 *
 * Este texto afirma reconocimiento oficial. En México, «valor curricular
 * SEP» y el RVOE son figuras reguladas: publicarlo sin el registro
 * correspondiente expone a la empresa a sanción y a reclamación de los
 * participantes que se inscribieron por eso.
 *
 * Si el registro existe, sustituir por el número y la autoridad que lo
 * emite, que además vende mucho mejor que la frase genérica.
 * Si no existe todavía, dejar solo «constancia de participación».
 */
export const avisoConstancias =
  '[VERIFICAR] Constancias emitidas por Gebenz Consultoría y Negocios, S.A. de C.V. [Indicar aquí el registro oficial y la autoridad que lo emite, o retirar cualquier mención a validez oficial.]';
