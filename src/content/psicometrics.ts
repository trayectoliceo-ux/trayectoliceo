/**
 * PSICOMETRICS
 * ------------
 * Qué hace el motor, descrito por su función real y no por lo que suena
 * bien. Es el contenido que decide la suscripción de un profesional.
 *
 * ⚠️ LÍMITE QUE NO SE NEGOCIA
 * Nada de esto es diagnóstico. El motor explora, pesa evidencia y decide
 * cuándo procede derivar. Prometer diagnóstico de TDAH, TEA o dislexia
 * volvería el informe indefendible ante un colegio profesional, que es
 * justo lo contrario de lo que se vende aquí.
 */

export const psicometrics = {
  url: 'https://psicometrics.app',

  portada: {
    etiqueta: 'La herramienta',
    titulo: 'Qué es PsicoMetrics',
    entrada:
      'Nació enfocado en altas capacidades, pero hoy es bastante más amplio. Evalúa altas capacidades, dificultades de aprendizaje y sus combinaciones, con la trazabilidad que exige un informe formal.',
    resumen:
      'Software potenciado con IA que acompaña la detección, la evaluación, la canalización y la emisión de informes psicopedagógicos, todo desde un solo tablero.',
  },

  evalua: {
    etiqueta: 'Lo que evalúa',
    titulo: 'Siete perfiles, no una etiqueta.',
    lista: [
      {
        titulo: 'Altas capacidades',
        texto:
          'El núcleo original. Distingue superdotación, talento simple, talento complejo, precocidad y capacidad media-alta. Cinco hipótesis distintas, no una etiqueta binaria.',
        destacado: true,
      },
      {
        titulo: 'Diferencial altas capacidades y TDAH',
        texto:
          'Los mismos síntomas —se distrae, no termina, se aburre— admiten lecturas opuestas: déficit atencional o desajuste curricular por alta capacidad. El motor pesa indicadores diferenciales y orienta hacia dónde va la evidencia. No diagnostica TDAH: decide cuándo procede derivar a quien sí puede hacerlo.',
        destacado: true,
      },
      {
        titulo: 'Doble excepcionalidad',
        texto:
          'Alta capacidad y dificultad de aprendizaje a la vez. Es el perfil que más se pierde porque cada rasgo enmascara al otro: el niño brillante que «podría si quisiera» y el niño con dificultad que «no destaca en nada».',
      },
      {
        titulo: 'Dificultades específicas de aprendizaje',
        texto:
          'Lectura, escritura y cálculo. Explora indicadores y decide si la evidencia justifica derivación.',
      },
      {
        titulo: 'Indicadores del espectro autista',
        texto:
          'Con la cautela de que en menores de alta capacidad el enmascaramiento es frecuente.',
      },
      {
        titulo: 'Rezago del desarrollo en preescolar',
        texto:
          'Lenguaje, motricidad, socioemocional y razonamiento preacadémico. Aquí la lógica se invierte: a los 4 años, detectar a tiempo un rezago de lenguaje puede corregir la trayectoria antes de primaria.',
      },
      {
        titulo: 'Orientación vocacional',
        texto: 'Desde los 14 años, con perfil RIASEC de intereses.',
      },
    ],
  },

  metodo: {
    etiqueta: 'Cómo lo evalúa',
    titulo: 'Cuatro fuentes que se triangulan, no se promedian.',
    fuentes: [
      { numero: '01', titulo: 'Medida psicométrica', texto: 'Tus baremos o el instrumento propio.' },
      { numero: '02', titulo: 'Cribado multi-informante', texto: 'Familia, docente y autoinforme.' },
      { numero: '03', titulo: 'Inteligencias múltiples', texto: 'Perfil por áreas de desempeño.' },
      { numero: '04', titulo: 'Entrevista y observación', texto: 'El juicio profesional, documentado.' },
    ],
    nota: 'No calcula un número único, a propósito. Mezclar medida normativa con observación cualitativa ocultaría lo más informativo: las divergencias entre fuentes. Que la familia vea algo que el docente no ve es un dato, no ruido a promediar.',
  },

  edades: [
    { etapa: '3 a 6 años', cobertura: 'Instrumento propio de desarrollo y tamizaje' },
    { etapa: '6 a 12 años', cobertura: 'Cobertura completa' },
    { etapa: '12 a 18 años', cobertura: 'Completa, más orientación vocacional desde los 14' },
  ],

  modalidades: [
    {
      titulo: 'Individual clínico',
      texto: 'Expediente completo e informe firmado con folio y código QR verificable.',
    },
    {
      titulo: 'Tamizaje escolar',
      texto: 'Grupo completo con semáforo e informe agregado para el centro.',
    },
    {
      titulo: 'Tamizaje familiar',
      texto: 'Contratado en línea por la familia y revisado por un psicólogo de la red.',
    },
    {
      titulo: 'Orientación vocacional',
      texto: 'Cuestionario más sesión de asesoría.',
    },
  ],

  limite: {
    titulo: 'El límite que lo define',
    parrafos: [
      'Nada de esto es diagnóstico. El motor decide cuándo hay evidencia suficiente para derivar y con qué fundamento, y produce hipótesis que un profesional con cédula revisa, corrige y firma bajo su responsabilidad.',
      'Esa distinción no es prudencia legal: es lo que hace que un informe se sostenga ante un colegio profesional. Un sistema que «diagnostica TDAH» sería indefendible; uno que documenta por qué procede una valoración neuropsicológica, no.',
    ],
  },
};

/**
 * Muestra de informe emitido. Datos ficticios y folio que apunta a la
 * verificación real: quien escanee el código comprueba el mecanismo por sí
 * mismo, que convence más que explicarlo.
 */
export const muestraInforme = {
  etiqueta: 'Informe verificable',
  titulo: 'Cada informe emitido se puede comprobar.',
  entrada:
    'El documento sale con folio y código de verificación. Una familia o un colegio confirma en segundos quién lo emitió, con qué cédula y si el archivo fue alterado, sin ver una línea del contenido clínico.',
  folio: 'AB7K-2291-QN',
  documento: {
    titulo: 'Informe psicopedagógico',
    lineas: [
      { etiqueta: 'Expediente', valor: 'EXP-4471 (pseudonimizado)' },
      { etiqueta: 'Emitido por', valor: 'Psic. [Nombre] · Céd. [00000000]' },
      { etiqueta: 'Fecha', valor: '[00 de marzo de 2026]' },
      { etiqueta: 'Instrumentos', valor: '3 aplicados · baremos vigentes' },
    ],
    aviso: 'Documento de muestra con datos ficticios.',
  },
  pie: 'Escanea el código para ver la verificación real.',
  accion: 'Probar la verificación',
};
