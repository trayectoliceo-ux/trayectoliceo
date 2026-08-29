/**
 * ACADEMIA
 * --------
 * Módulo de formación con salida al campus en línea (LMS) que se
 * construirá más adelante.
 *
 * ⚠️ AVISO LEGAL IMPORTANTE — LEER ANTES DE PUBLICAR
 *
 * En México, ofertar una licenciatura exige Reconocimiento de Validez
 * Oficial de Estudios (RVOE) de la SEP o de la autoridad educativa
 * estatal, o bien estar incorporada a una institución que lo tenga.
 * Publicitar una licenciatura y captar inscripciones sin ese registro
 * constituye una infracción y expone a la empresa a sanción, además de
 * responsabilidad frente a los alumnos que se inscribieron creyendo que
 * cursaban estudios con validez oficial.
 *
 * Por eso el bloque está redactado como INTERÉS ANTICIPADO y no como
 * inscripción: no promete plaza, no cobra y declara el trámite en curso.
 * No convertirlo en «inscríbete» hasta tener el RVOE, y cuando se tenga,
 * publicar el número de acuerdo y la autoridad que lo emite.
 */

export const academia = {
  etiqueta: 'Academia',
  titulo: 'Formación continua, en un solo lugar.',
  entrada:
    'Cursos, diplomado y programas institucionales con acceso al campus en línea. Cada participante conserva sus materiales, su avance y sus constancias.',

  /** [PENDIENTE] URL del campus cuando exista. Mientras, deriva a contacto. */
  campus: {
    url: '',
    titulo: 'Campus en línea',
    texto:
      'Las sesiones grabadas, los materiales y las evaluaciones viven en el campus. Los participantes inscritos reciben su acceso al confirmar el pago.',
    accion: 'Entrar al campus',
    avisoSinCampus:
      'El campus se habilita en los próximos meses. Los participantes actuales reciben los materiales por correo mientras tanto.',
  },

  /** Licenciatura con RVOE. Inicio y datos confirmados por la institución. */
  licenciatura: {
    etiqueta: 'Inscripciones abiertas',
    titulo: 'Licenciatura en Psicología, modalidad en línea',
    entrada:
      'Programa con reconocimiento de validez oficial para quien quiere titularse sin dejar de trabajar. Sesiones en sábado, avance a tu ritmo y acompañamiento durante todo el trayecto.',
    datos: [
      { etiqueta: 'RVOE', valor: '20192721' },
      { etiqueta: 'Inicio', valor: 'Enero de 2027' },
      { etiqueta: 'Modalidad', valor: 'En línea. Estudia a tu ritmo' },
      { etiqueta: 'Sesiones', valor: 'Sábados de 8:00 a 12:30 h' },
      { etiqueta: 'Carga', valor: '6 materias por cuatrimestre, más cursos de verano' },
      { etiqueta: 'Colegiatura', valor: '$690 MXN mensuales' },
      { etiqueta: 'Admisión', valor: 'Preinscripción y examen de admisión' },
    ],
    accion: 'Solicitar preinscripción',
    advertencia:
      'La preinscripción no genera cobro inmediato: primero se agenda el examen de admisión y se revisa la documentación. Te confirmamos por WhatsApp fechas y requisitos.',
  },

  /**
   * Titulación por Acuerdo 286. Es un servicio distinto de la licenciatura:
   * va dirigido a quien ya tiene experiencia y quiere acreditarla.
   */
  titulacion: {
    etiqueta: 'Titulación',
    titulo: 'Acuerdo 286 · Pedagogía y Ciencias de la Educación',
    entrada:
      'Acompañamiento completo para acreditar tus conocimientos por experiencia y obtener el título. Preparamos el examen, el portafolio y el expediente ante la SEP.',
    precioTotal: '$45,000 MXN diferido',
    precioContado: '$38,000 MXN en un solo pago',
    inscripcion: '$9,000 MXN',
    mensualidad: '$9,000 MXN',
    calendario: [
      { mes: 'Mes 0', concepto: 'Inscripción y diagnóstico de perfil', hito: 'Inicio de asesoría y acceso a plataforma' },
      { mes: 'Mes 1', concepto: 'Acompañamiento', hito: 'Preparación del examen teórico' },
      { mes: 'Mes 2', concepto: 'Acompañamiento', hito: 'Presentación de examen y proyecto' },
      { mes: 'Mes 3', concepto: 'Acompañamiento', hito: 'Asesoría de portafolio y proyecto' },
      { mes: 'Mes 4', concepto: 'Acompañamiento', hito: 'Integración de expediente y trámite SEP' },
    ],
    nota: 'La inscripción cubre la primera fase de acompañamiento. El resto se cubre en cuatro mensualidades del mismo importe.',
    accion: 'Solicitar información',
  },

  /** Red de profesionales: capta oferta para las derivaciones. */
  red: {
    etiqueta: 'Red de psicólogos',
    titulo: 'Afíliate sin costo.',
    entrada:
      'Si eres psicólogo o psicopedagogo con cédula, puedes formar parte de la red que recibe las derivaciones de valoración diagnóstica y usar PsicoMetrics para emitir tus informes.',
    puntos: [
      'Afiliación sin costo y sin permanencia',
      'Derivación de casos según especialidad y zona',
      'Acceso a PsicoMetrics con el plan que elijas',
      'Tarifas de formación preferentes para afiliados',
      'Requisito: título y cédula profesional vigente, que verificamos',
    ],
    accion: 'Solicitar afiliación',
  },
};
