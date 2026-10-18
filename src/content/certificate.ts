/**
 * CERTIFÍCATE
 * -----------
 * Formación de Trayecto Liceo. Dos figuras que NO son lo mismo y conviene
 * no mezclar nunca en la comunicación:
 *
 *   CURSO         Asincrónico. Se acredita haberlo cursado. Emite
 *                 constancia o diploma de participación. No certifica
 *                 competencia ni tiene validez oficial.
 *
 *   CERTIFICACIÓN Incluye examen aplicado por un experto en sesión en
 *                 línea, grabada para auditoría, y se califica. Al
 *                 aprobarla se emite documento con validez oficial.
 *
 * La diferencia es lo que justifica el precio y lo que evita reclamaciones:
 * quien paga una certificación espera un documento que valga ante terceros,
 * y quien paga un curso espera aprender. Prometer lo primero y entregar lo
 * segundo es la queja más cara que existe en formación.
 *
 * ⚠️ TEMARIOS PENDIENTES DE REVISIÓN
 * Los temarios de este archivo son una propuesta redactada a partir de la
 * estructura habitual de cada programa. Sustituirlos por los definitivos
 * antes de publicar, sobre todo en los módulos que citan normativa.
 */

export type Modulo = {
  numero: string;
  titulo: string;
  /** Para qué sirve el módulo, en una línea. */
  objetivo?: string;
  horas?: string;
  puntos: string[];
};

export type Programa = {
  id: string;
  /**
   * `curso` es autogestivo y entrega constancia. `institucional` se cotiza
   * por centro. La certificación con validez oficial no es un tipo aparte:
   * es un examen que se contrata además del curso, cuando se quiere.
   */
  tipo: 'curso' | 'institucional';
  nombre: string;
  dirigidoA: string;
  /** Determina en qué pestaña aparece el programa. */
  publico: 'profesional' | 'docente' | 'centro';
  resumen: string;
  duracion: string;
  modalidad: string;
  entrega: string;
  requisito?: string;
  /** Qué sabrá hacer el participante al terminar. Es lo que más vende. */
  resultados?: string[];
  /** Materiales que se entregan y quedan como herramienta de trabajo. */
  incluye?: string[];
  /** Nombre exacto del documento que se emite. */
  nombreCertificacion?: string;
  /**
   * Cómo se accede:
   *  `docente`   → capacitación de pago único ($590)
   *  `centro`    → se cotiza por número de participantes
   */
  acceso: 'docente' | 'centro';
  /** `pago` cobra en línea y da acceso; `escuela` deriva a WhatsApp. */
  destino: 'pago' | 'escuela';
  /** Si al terminar puede presentarse el examen de validez oficial. */
  certificable?: boolean;
  temario: Modulo[];
};

/**
 * MODELO VIGENTE
 * La formación no se vende suelta: va incluida en el plan. Solo se
 * cobra el examen que otorga validez oficial.
 */
/**
 * Los dos únicos precios del sitio.
 *
 * Los planes de PsicoMetrics NO se publican aquí: esa plataforma tiene su
 * propia estructura de precios y cambia a su ritmo. Publicarla en dos
 * sitios garantiza que un día digan cosas distintas, y el que queda mal es
 * el que el cliente leyó primero. Desde aquí solo se enlaza.
 */
export const precios = {
  /** Capacitación docente. Es el único cobro para el perfil docente. */
  capacitacionDocente: 590,
  /** Examen y estudio de caso con validez SEP. Se cobra aparte. */
  certificado: 990,
};

export const programas: Programa[] = [
  {
    id: 'curso-deteccion-aula',
    certificable: true,
    tipo: 'curso',
    nombre: 'Detección de altas capacidades y rezago en el aula',
    dirigidoA: 'Docentes, pedagogos y profesionales de ciencias de la educación',
    publico: 'docente',
    resumen:
      'Qué se observa desde el aula, cómo registrarlo y en qué momento exacto corresponde derivar. Sin instrumentos: el docente detecta, no evalúa.',
    duracion: '20 horas · 5 módulos',
    modalidad: 'Autogestivo. Avanzas a tu ritmo desde la plataforma',
    entrega: 'Constancia de participación. El certificado oficial se obtiene con el examen',
    acceso: 'docente',
    destino: 'pago',
    temario: [
      {
        numero: '01',
        titulo: 'Qué es y qué no es',
        puntos: [
          'Alta capacidad, talento y rendimiento: tres cosas distintas',
          'Ideas frecuentes que retrasan la identificación',
          'Rezago por dificultad frente a rezago por desmotivación',
        ],
      },
      {
        numero: '02',
        titulo: 'Indicadores observables',
        puntos: [
          'Señales por asignatura y por edad',
          'Conducta en el aula: qué mirar y qué descartar',
          'Registro sistemático: formatos y periodicidad',
        ],
      },
      {
        numero: '03',
        titulo: 'Perfiles que se pasan por alto',
        puntos: [
          'El alumno que aprueba y nadie mira',
          'Diferencias en la identificación de niñas',
          'Doble excepcionalidad: alta capacidad con dificultad asociada',
        ],
      },
      {
        numero: '04',
        titulo: 'El límite del rol docente',
        puntos: [
          'Dónde termina la observación y empieza la evaluación',
          'Por qué un docente no aplica instrumentos psicopedagógicos',
          'Cómo plantear el tema a la familia sin alarmar',
        ],
      },
      {
        numero: '05',
        titulo: 'Derivación',
        puntos: [
          'Cómo se documenta un caso para que la derivación sirva',
          'A quién se entrega y con qué soporte',
          'Seguimiento del caso una vez derivado',
        ],
      },
    ],
  },
  {
    id: 'capacitacion-institucional',
    tipo: 'institucional',
    nombre: 'Capacitación para el equipo docente de tu escuela',
    dirigidoA: 'Colegios que quieren formar a todo su equipo',
    publico: 'centro',
    resumen:
      'El mismo contenido de detección, impartido para el claustro completo y adaptado al procedimiento interno del centro.',
    duracion: 'De 20 a 40 horas según el tamaño del equipo',
    modalidad: 'En línea o presencial en el centro',
    entrega: 'Constancia de participación por docente',
    acceso: 'centro',
    destino: 'escuela',
    temario: [
      {
        numero: '01',
        titulo: 'Diagnóstico del centro',
        puntos: [
          'Qué hace hoy la escuela cuando aparece un caso',
          'Dónde se rompe el procedimiento actual',
        ],
      },
      {
        numero: '02',
        titulo: 'Formación del equipo',
        puntos: [
          'Detección por ciclo escolar',
          'Registro sistemático y lenguaje común',
        ],
      },
      {
        numero: '03',
        titulo: 'Protocolo propio',
        puntos: [
          'Formatos, responsables y plazos del centro',
          'Ruta de derivación documentada',
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Cómo se accede a la formación                                       */
/* ------------------------------------------------------------------ */

export const grupos = {
  etiqueta: 'Cómo se accede',
  titulo: 'Una capacitación, dos formas de obtenerla.',
  entrada:
    'Si tu escuela contrata el tamizaje, la capacitación de un docente por grupo evaluado va incluida y no cuesta nada. Si vienes por tu cuenta, se paga una sola vez.',
  lista: [
    {
      perfil: 'Docentes de un centro con tamizaje',
      requisito: 'La escuela solicita el tamizaje escolar',
      precio: 'Sin costo',
      etiquetaPrecio: 'Incluida con el tamizaje',
      puntos: [
        'Un docente capacitado por cada grupo evaluado',
        'Capacitación completa en detección temprana',
        'Aplicación del tamizaje en el aula de tu centro',
        'Canalización de los casos a un psicólogo con cédula',
        `Certificado con validez SEP, opcional: $${precios.certificado} MXN`,
      ],
      accion: 'Solicitar para mi escuela',
      href: '/escuelas',
      externo: false,
    },
    {
      perfil: 'Docentes por cuenta propia',
      requisito: 'Ejercicio docente en activo',
      precio: `$${precios.capacitacionDocente} MXN`,
      etiquetaPrecio: 'Pago único',
      puntos: [
        'Veinte horas autogestivas, a tu ritmo',
        'Qué se observa desde el aula y cuándo corresponde derivar',
        'Constancia de participación al terminar',
        'Tres sesiones de acompañamiento socioemocional para ti',
        `Certificado con validez SEP, opcional: $${precios.certificado} MXN`,
      ],
      nota: 'La evaluación psicopedagógica la realiza siempre un profesional con cédula. Esta capacitación forma para detectar y derivar, no para evaluar.',
      accion: 'Inscribirme',
      href: '/programa/curso-deteccion-aula',
      externo: false,
    },
  ],
};

/**
 * Beneficio para el docente certificado. NO es un curso y NO es para los
 * alumnos: son sesiones para el propio docente, de modo que aprenda a
 * canalizar sus emociones en un trabajo que desgasta.
 *
 * ⚠️ Redactado como acompañamiento, nunca como terapia ni como tratamiento.
 */
export const docenteCertificado = {
  etiqueta: 'Para docentes certificados',
  titulo: 'Acompañamiento socioemocional para ti.',
  texto:
    'No es un curso ni es para tus alumnos: es para ti. Al certificarte te damos tres sesiones de 40 minutos, sin costo, para aprender a canalizar tus propias emociones en un trabajo que desgasta más de lo que se reconoce.',
  puntos: [
    'Tres sesiones de 40 minutos, sin costo, incluidas al certificarte',
    'Son para el docente, no para el grupo ni para alumnos en particular',
    'Herramientas de regulación y manejo del desgaste en el aula',
    'Espacio privado: nada de lo que hables se comparte con tu centro',
  ],
  limite:
    'Es acompañamiento, no terapia ni atención clínica. Si en el proceso aparecen indicadores que lo ameriten, te derivamos a un psicólogo de la red.',
};

/** Examen que otorga el certificado con validez oficial. */
export const certificado = {
  id: 'certificado-oficial',
  etiqueta: 'Certificado con validez oficial',
  titulo: 'Certifícalo',
  texto:
    'Cuando estés listo, presentas un examen de conocimientos y un estudio de caso evaluado en sesión de Zoom por un especialista. Al aprobar, obtienes el documento con validez oficial.',
  precio: precios.certificado,
  requisito:
    'Se agenda cuando termines la capacitación. El examen y el estudio de caso son el único cobro adicional.',
  accion: 'Agendar mi examen',
};

/* ------------------------------------------------------------------ */
/* Pestañas por perfil                                                 */
/* ------------------------------------------------------------------ */

/**
 * El visitante elige quién es y ve solo lo que le corresponde. Es más
 * honesto que mostrar todo y esperar que adivine: un docente no puede
 * inscribirse a un programa que exige cédula, y descubrirlo después de
 * pagar es la peor forma de enterarse.
 */
export const pestanas = [
  {
    id: 'docente' as const,
    titulo: 'Soy docente, pedagogo o de ciencias de la educación',
    corto: 'Docencia',
    pie: 'Ejercicio docente en activo',
    nota: 'Estos programas forman para detectar y derivar. La evaluación la realiza siempre un profesional con cédula.',
  },
  {
    id: 'centro' as const,
    titulo: 'Represento a un centro',
    corto: 'Centros',
    pie: 'Colegios y clínicas',
    nota: 'Formación para todo el equipo, adaptada al procedimiento interno del centro y cotizada por número de participantes.',
  },
];
