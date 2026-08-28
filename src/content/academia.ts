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

  /**
   * Programa en preparación. Redactado como interés anticipado a propósito:
   * ver el aviso legal de la cabecera de este archivo.
   */
  licenciatura: {
    etiqueta: 'En preparación',
    titulo: 'Licenciatura en Psicología, modalidad en línea',
    entrada:
      'Estamos preparando la apertura de un programa de licenciatura en línea con sesiones en sábado. Puedes registrar tu interés para recibir la convocatoria en cuanto se publique.',
    datos: [
      { etiqueta: 'Modalidad', valor: 'En línea con sesiones sincrónicas' },
      { etiqueta: 'Sesiones', valor: 'Sábados de 8:00 a 12:30 h' },
      { etiqueta: 'Carga', valor: '6 materias por cuatrimestre, más cursos de verano' },
      { etiqueta: 'Inicio previsto', valor: '[Fecha por confirmar]' },
      {
        etiqueta: 'Situación',
        valor:
          '[VERIFICAR] Trámite de reconocimiento oficial en curso. Publicar aquí el número de acuerdo y la autoridad emisora en cuanto se obtenga.',
      },
    ],
    accion: 'Registrar mi interés',
    /**
     * Este texto no es opcional. Quien deja sus datos tiene que saber
     * exactamente qué está haciendo y qué no.
     */
    advertencia:
      'Registrar tu interés no constituye inscripción ni aparta lugar, y no implica ningún pago. Te contactaremos cuando la convocatoria esté publicada, con las condiciones y el estado del reconocimiento oficial del programa.',
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
