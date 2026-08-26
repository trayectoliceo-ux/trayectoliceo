/**
 * PSICOMETRICS
 * ------------
 * Página de producto dentro del sitio institucional. Toda conversión
 * termina en psicometrics.app: aquí no hay registro ni cobro.
 *
 * NOTA SOBRE LAS AFIRMACIONES
 * Tres puntos de este contenido tienen implicaciones legales o éticas y
 * están redactados con cuidado deliberado. Al editarlos, no suavizar:
 *  · La plataforma asiste, no diagnostica. Se dice explícitamente.
 *  · La acumulación normativa exige consentimiento informado y datos
 *    disociados. Se dice explícitamente.
 *  · «Validación» se refiere a procesos internos con comité, no a una
 *    acreditación externa. Si algún día existe acreditación de un
 *    organismo, se nombra el organismo. Mientras tanto, no.
 */

export const psicometricsPagina = {
  url: 'https://psicometrics.app',

  portada: {
    etiqueta: 'Una herramienta de Trayecto Liceo',
    titulo: ['Menos papeleo.', 'Más tiempo con'],
    rotativas: ['tus pacientes.', 'tus alumnos.', 'el caso real.'],
    entrada:
      'Plataforma de apoyo a la evaluación psicopedagógica: expedientes pseudonimizados, instrumentos centralizados y borradores de informe estructurados en minutos, listos para tu revisión y tu firma.',
    accion: 'Probar PsicoMetrics',
    subtexto: 'Plan inicial gratuito · Sin tarjeta de crédito',
    accionSecundaria: 'Ver los módulos',
    imagen: {
      src: undefined as string | undefined,
      descripcion:
        'Captura del panel de PsicoMetrics con los módulos de expedientes, informes e instrumentos',
    },
  },

  /** Origen real del producto. Es el argumento más fuerte que existe. */
  origen: {
    etiqueta: 'De dónde salió',
    titulo: 'No lo diseñamos para vender. Lo construimos porque nos hacía falta.',
    parrafos: [
      'PsicoMetrics nació de nuestro propio diagnóstico de habilidades. Aplicándolo caso tras caso quedó claro que el cuello de botella no era evaluar: era registrar, comparar y recuperar lo evaluado meses después, cuando la familia volvía a preguntar.',
      'Lo que empezó como una hoja de cálculo interna terminó siendo la herramienta con la que trabajamos todos los días. La abrimos a otros profesionales porque el problema no era solo nuestro.',
    ],
  },

  comparativa: {
    etiqueta: 'El costo invisible',
    titulo: 'Lo que cuesta redactar a mano.',
    entrada:
      'No es el tiempo de escribir el informe. Es todo lo que se acumula alrededor.',
    antes: {
      titulo: 'El proceso habitual',
      puntos: [
        'Noches de plantillas de Word copiadas de un caso anterior',
        'Datos transcritos a mano, con el riesgo de error que eso implica',
        'Expedientes repartidos entre carpetas, correos y memorias USB',
        'Familias esperando semanas por un documento que ya está evaluado',
        'Baremos en fotocopias y tablas sueltas, imposibles de auditar',
      ],
    },
    despues: {
      titulo: 'Con PsicoMetrics',
      puntos: [
        'Captura estructurada de resultados, una sola vez',
        'Borrador técnico coherente generado en minutos',
        'Historial completo por caso, recuperable en segundos',
        'Entregas puntuales y capacidad real de atender más casos',
        'Instrumentos y baremos centralizados y trazables',
      ],
    },
  },

  modulos: {
    etiqueta: 'La plataforma',
    titulo: 'Seis módulos para el trabajo real de gabinete.',
    lista: [
      {
        indice: '01',
        titulo: 'Expedientes pseudonimizados',
        descripcion:
          'Cada caso se gestiona bajo identificador, no bajo nombre. La identidad queda separada del expediente de trabajo, que es lo que exige el tratamiento de datos de menores.',
      },
      {
        indice: '02',
        titulo: 'Borradores de informe',
        descripcion:
          'A partir de los datos capturados, la plataforma redacta un borrador estructurado y coherente. Es un punto de partida para tu revisión, nunca un documento final.',
      },
      {
        indice: '03',
        titulo: 'Instrumentos y baremos',
        descripcion:
          'Tus baterías y tablas de baremo licenciadas en un solo lugar, con control de versión. Se acabó buscar qué fotocopia corresponde a qué edición.',
      },
      {
        indice: '04',
        titulo: 'Transferencia entre profesionales',
        descripcion:
          'Traspaso del expediente completo a otro profesional acreditado, con registro de quién lo entregó y quién lo recibió. Pensado para canalizaciones documentadas.',
      },
      {
        indice: '05',
        titulo: 'Acumulación normativa',
        descripcion:
          'Los casos que autorices, y solo esos, alimentan una base de referencia propia con datos disociados. Requiere consentimiento informado explícito y es revocable.',
      },
      {
        indice: '06',
        titulo: 'Revisión por comité',
        descripcion:
          'Los instrumentos propios pasan por un proceso interno de revisión documentada antes de publicarse en la plataforma, con el expediente metodológico disponible.',
      },
    ],
  },

  confianza: {
    etiqueta: 'Rigor y seguridad',
    titulo: 'Dos cosas que no negociamos.',
    bloques: [
      {
        titulo: 'La plataforma no diagnostica',
        descripcion:
          'PsicoMetrics organiza información y redacta borradores. No emite diagnósticos, no interpreta por su cuenta y no sustituye ningún juicio profesional. La interpretación, la edición y la firma son siempre del profesional acreditado, que responde por el documento.',
      },
      {
        titulo: 'Los datos de menores, separados',
        descripcion:
          'La información de identificación viaja cifrada y se almacena disociada del expediente de trabajo. El acceso queda registrado. Ningún dato se usa con fines distintos a los autorizados por escrito por quien ejerce la patria potestad.',
      },
    ],
  },

  precios: {
    etiqueta: 'Planes',
    titulo: 'Paga por lo que evalúas.',
    entrada:
      'Sin plazos forzosos ni permanencia. El volumen de un gabinete no es el de un colegio, y los planes lo reflejan.',
    /** [VERIFICAR] Confirmar precios y moneda antes de publicar. */
    planes: [
      {
        nombre: 'Inicio',
        precio: 'Gratis',
        detalle: 'Para probar la plataforma con un caso real',
        incluye: [
          'Tres informes de cortesía',
          'Módulos de expedientes e informes',
          'Soporte por correo',
        ],
        accion: 'Comenzar gratis',
        destacado: false,
      },
      {
        nombre: 'Créditos',
        precio: 'Desde [$49 USD]',
        detalle: 'Paquetes de 10, 20 o 50 informes',
        incluye: [
          'Vigencia de 12 meses, que se renueva con cada compra',
          'Acceso a los seis módulos',
          'Descarga en formato editable',
          'Baremos, transferencias y acumulación normativa',
        ],
        accion: 'Comprar créditos',
        destacado: true,
      },
      {
        nombre: 'Clínicas y colegios',
        precio: 'A medida',
        detalle: 'Suscripción mensual o anual',
        incluye: [
          'Informes sin límite',
          'Cuentas para todo el equipo',
          'Panel de administración para dirección',
          'Soporte prioritario e incorporación asistida',
        ],
        accion: 'Solicitar demostración',
        destacado: false,
      },
    ],
    nota: 'Los precios están en dólares estadounidenses. La facturación en México se emite en pesos al tipo de cambio del día. Los créditos tienen vigencia de 12 meses y cualquier compra nueva reactiva el saldo completo y reinicia el plazo.',
  },

  preguntas: {
    etiqueta: 'Preguntas frecuentes',
    titulo: 'Lo que preguntan los profesionales.',
    lista: [
      {
        pregunta: '¿Puedo modificar el texto que genera la plataforma?',
        respuesta:
          'Sí, y debes hacerlo. Lo que entrega es un borrador técnico estructurado: lo editas en pantalla o lo descargas en formato editable para incorporar tu interpretación clínica. El documento que firmas es tuyo.',
      },
      {
        pregunta: '¿Los datos de mis pacientes están seguros?',
        respuesta:
          'La información de identificación se cifra y se almacena separada del expediente de trabajo, que opera bajo identificador. Los accesos quedan registrados y ningún dato se usa fuera de lo que autorices por escrito.',
      },
      {
        pregunta: '¿Qué profesionales pueden usarla?',
        respuesta:
          'Psicólogos educativos y clínicos, psicopedagogos, orientadores escolares y equipos de educación especial. Se verifica la cédula profesional en el registro: la plataforma trabaja con expedientes clínicos y no es de acceso abierto.',
      },
      {
        pregunta: '¿Sustituye a la aplicación de pruebas?',
        respuesta:
          'No. Las pruebas las aplicas tú, con los instrumentos que tengas licenciados. PsicoMetrics interviene después: en el registro, el análisis y la redacción.',
      },
      {
        pregunta: '¿Qué pasa si dejo de pagar?',
        respuesta:
          'Conservas el acceso para consultar y exportar tus expedientes. Los datos son tuyos y puedes llevártelos completos en cualquier momento.',
      },
      {
        pregunta: '¿Los créditos caducan?',
        respuesta:
          'Tienen vigencia de 12 meses, y cualquier compra nueva reactiva el saldo completo y reinicia el plazo. Avisamos por correo 60 y 15 días antes del vencimiento, y la fecha está siempre visible en tu panel.',
      },
      {
        pregunta: '¿Cómo se verifica que un informe es auténtico?',
        respuesta:
          'Cada informe firmado lleva un folio y un código de verificación. Cualquiera puede comprobar en línea quién lo emitió, con qué cédula y en qué fecha, sin acceder al contenido clínico. Un documento alterado deja de coincidir con su registro.',
      },
    ],
  },

  cierre: {
    titulo: 'Pruébalo con un caso que ya tengas encima.',
    texto:
      'El plan inicial incluye tres informes de cortesía y no pide tarjeta. Si en el primer caso no te ahorra tiempo real, no hay nada que discutir.',
    accion: 'Ir a PsicoMetrics',
  },
};
