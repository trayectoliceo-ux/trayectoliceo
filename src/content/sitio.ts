/**
 * DATOS GLOBALES DEL SITIO
 * ------------------------
 * Editar aquí: nombre, descriptor, datos de contacto, teléfono de WhatsApp
 * y estructura del menú. No hay textos de marca en ningún componente.
 */

export const sitio = {
  nombre: 'Trayecto Liceo',
  /**
   * El descriptor acompaña al logotipo en cabecera y pie sin excepción.
   * Sin él, «Liceo» se lee como colegio.
   *
   * Habla de «desarrollo y aprendizaje» y no solo de «talento» porque el
   * trabajo cubre altas capacidades, dificultades de aprendizaje y
   * orientación: una familia con un hijo que va rezagado también tiene que
   * reconocerse en esta línea.
   */
  descriptor: 'Evaluación y acompañamiento del aprendizaje infantil',
  /** Versión corta, para espacios estrechos. */
  descriptorCorto: 'Aprendizaje infantil',
  operadora: 'Gebenz Consultoría y Negocios, S.A. de C.V.',
  dominio: 'https://trayectoliceo.com',
  descripcionMeta:
    'Evaluación psicopedagógica en Puebla: altas capacidades, dificultades de aprendizaje y orientación. Talleres STEAM, formación para profesionales y la plataforma PsicoMetrics.',
  /**
   * Palabras clave de referencia para redactar títulos y descripciones.
   * Next.js ya no usa la etiqueta meta keywords: esto es una guía editorial,
   * no una etiqueta. La intención de búsqueda real es local y específica.
   */
  intencionesDeBusqueda: [
    'altas capacidades Puebla',
    'niño superdotado qué hacer',
    'evaluación psicopedagógica altas capacidades',
    'talleres STEAM para niños Puebla',
    'diplomado altas capacidades México',
    'mi hijo se aburre en la escuela',
    'detección de talento en el aula',
  ],

  contacto: {
    correo: 'contacto@trayectoliceo.com',
    /**
     * Número en formato internacional, sin signos ni espacios.
     * Mientras esté vacío se usa `whatsappEnlace` y NO hay mensaje
     * precargado. En cuanto se ponga el número, los mensajes por página
     * empiezan a funcionar solos.
     */
    whatsapp: '',
    /** Enlace corto de WhatsApp Business tomado del sitio actual. */
    whatsappEnlace: 'https://wa.me/message/ZWP2Q5W7DFNTD1',
    whatsappVisible: 'Escribir por WhatsApp',
    telefono: '[Teléfono pendiente]',
    ciudad: 'Puebla, México',
    domicilio: '31 Poniente 4128, Ampliación Reforma, Puebla, Puebla',
    codigoPostal: '72160',
    /** Coordenadas aproximadas para los datos estructurados locales. */
    latitud: 19.0414,
    longitud: -98.2306,
    horario: 'Lunes a viernes, 9:00 a 18:00 h (hora del centro de México)',
  },

  /** Perfiles tomados del sitio actual. */
  redes: [
    { titulo: 'Facebook', url: 'https://www.facebook.com/trayectoliceo/' },
    { titulo: 'Instagram', url: 'https://www.instagram.com/trayecto_liceo' },
    { titulo: 'YouTube', url: 'https://www.youtube.com/@TrayectoLiceo' },
  ],

  /** Página propia. El PDF antiguo vivía en el sitio anterior y dejará de existir. */
  avisoPrivacidad: '/aviso-de-privacidad',

  psicometrics: {
    nombre: 'PsicoMetrics',
    /** [EDITAR] URL definitiva de la plataforma. */
    url: 'https://psicometrics.app',
    descriptor: 'Plataforma profesional de apoyo a la evaluación psicopedagógica',
  },

  /**
   * `corto` es la etiqueta de la barra de escritorio; `titulo` se usa en el
   * menú móvil y en el pie, donde hay espacio para el nombre completo.
   */
  /** Un destino por público. No se mezclan. */
  navegacion: [
    { titulo: 'Psicólogos', corto: 'Psicólogos', href: '/psicologos', destacado: true },
    { titulo: 'Escuelas', corto: 'Escuelas', href: '/escuelas' },
    { titulo: 'Docentes', corto: 'Docentes', href: '/docentes' },
    { titulo: 'Titulación', corto: 'Titulación', href: '/titulacion' },
    { titulo: 'Familias', corto: 'Familias', href: '/evaluacion' },
  ],

  navegacionPie: [
    {
      titulo: 'Programas',
      enlaces: [
        { titulo: 'Para psicólogos', href: '/psicologos' },
        { titulo: 'Para escuelas', href: '/escuelas' },
        { titulo: 'Para docentes', href: '/docentes' },
        { titulo: 'Titulación Acuerdo 286', href: '/titulacion' },
        { titulo: 'Evaluación para familias', href: '/evaluacion' },
        { titulo: 'Talleres STEAM', href: '/talleres' },
        { titulo: 'Academia', href: '/academia' },
      ],
    },
    {
      titulo: 'Institución',
      enlaces: [
        { titulo: 'Nosotros', href: '/nosotros' },
        { titulo: 'Verificar un informe', href: '/verificar' },
        { titulo: 'Recursos', href: '/recursos' },
        { titulo: 'Contacto', href: '/contacto' },
      ],
    },
  ],
} as const;

/**
 * Mensaje precargado de WhatsApp por ruta. La clave es el primer segmento
 * de la URL; `inicio` cubre la portada y `defecto` cualquier ruta nueva.
 */
export const mensajesWhatsApp: Record<string, string> = {
  inicio: 'Hola. Encontré Trayecto Liceo y me gustaría saber por dónde empezar.',
  talleres: 'Hola. Me interesan los talleres STEAM. ¿Me comparten cupos y fechas?',
  formacion:
    'Hola. Me interesa la formación profesional en altas capacidades. ¿Me comparten el temario y las fechas?',
  colegios:
    'Hola. Escribo desde un colegio y me interesan sus programas para centros escolares.',
  trayectoria:
    'Hola. Me interesa el servicio de orientación de trayectoria académica.',
  nosotros: 'Hola. Me gustaría conocer más sobre el equipo de Trayecto Liceo.',
  recursos: 'Hola. Vengo de la sección de recursos y tengo una consulta.',
  contacto: 'Hola. Me gustaría agendar una conversación con Trayecto Liceo.',
  psicologos:
    'Hola. Soy psicólogo y quiero información sobre PsicoMetrics y la derivación de casos.',
  escuelas:
    'Hola. Represento a un colegio y quiero una propuesta de tamizaje de aula.',
  docentes: 'Hola. Soy docente y me interesa el curso de detección en el aula.',
  titulacion:
    'Hola. Quiero información sobre la titulación por Acuerdo 286 en Pedagogía.',
  evaluacion:
    'Hola. Busco orientación para mi hijo o hija y quiero saber por dónde empezar.',
  defecto: 'Hola. Me gustaría recibir información sobre Trayecto Liceo.',
};

/**
 * Construye el enlace de WhatsApp.
 *
 * Con número configurado se usa `wa.me/<número>?text=…` y el mensaje llega
 * precargado. Sin número se recurre al enlace corto de WhatsApp Business,
 * que abre la conversación pero no admite texto previo.
 */
export function enlaceWhatsApp(mensaje: string): string {
  const { whatsapp, whatsappEnlace } = sitio.contacto;

  if (!whatsapp) return whatsappEnlace;

  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
