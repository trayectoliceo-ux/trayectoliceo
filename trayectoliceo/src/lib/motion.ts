/**
 * Tokens de movimiento de Trayecto Liceo.
 *
 * Toda animación del sitio se deriva de estos valores. Si un componente
 * necesita una duración que no está aquí, o el token falta o la animación
 * sobra.
 *
 * Criterio: un solo momento firma (la carga de la portada). El resto del
 * sitio se mueve lo justo para explicar de dónde sale cada cosa.
 */

/** Duraciones en segundos, escalonadas por tamaño de elemento. */
export const duracion = {
  /** Retroalimentación inmediata: pulsación, color, foco. */
  instante: 0.12,
  /** Microinteracciones: hover, icono, subrayado. */
  rapida: 0.18,
  /** Elementos medios: tarjeta, campo de formulario, elemento de lista. */
  base: 0.3,
  /** Superficies grandes: menú móvil, panel, cambio de vista. */
  lenta: 0.45,
  /** Solo para la secuencia orquestada de portada. */
  firma: 0.7,
} as const;

/**
 * Salidas al 70 % de la entrada: el usuario ya sabe qué se va,
 * pero necesita tiempo para procesar lo que llega.
 */
export const salida = (entrada: number) => Number((entrada * 0.7).toFixed(3));

/** Curvas. Nunca `linear` en movimiento espacial. */
export const curva = {
  /** Entradas: arranca rápido, frena suave. El objeto llega. */
  salidaSuave: [0.22, 1, 0.36, 1],
  /** Salidas: arranca lento, acelera. El objeto se va. */
  entradaSeca: [0.64, 0, 0.78, 0],
  /** Movimiento entre dos posiciones visibles. */
  simetrica: [0.65, 0, 0.35, 1],
} as const;

/** Muelles para cambios de layout y elementos manipulados. */
export const muelle = {
  /** Indicadores que se desplazan entre posiciones. Sin rebote. */
  firme: { type: 'spring', stiffness: 400, damping: 40 },
  /** Superficies grandes con inercia perceptible. */
  amplio: { type: 'spring', stiffness: 220, damping: 30 },
} as const;

/**
 * Escalonado. El total (retraso × elementos) se mantiene bajo 400 ms
 * en cualquier grupo del sitio.
 */
export const escalonado = {
  denso: 0.03,
  base: 0.06,
  marcado: 0.1,
} as const;

/** Desplazamientos. Elegidos según de dónde debe parecer que viene el elemento. */
export const distancia = {
  /** Sugiere dirección sin llamar la atención. */
  leve: 8,
  base: 16,
  /** Solo si el elemento viene realmente de fuera del encuadre. */
  amplia: 28,
} as const;

/** Transición de entrada estándar para elementos medios. */
export const entradaBase = {
  duration: duracion.base,
  ease: curva.salidaSuave,
} as const;

/** Transición de microinteracción (hover, foco, subrayado). */
export const microinteraccion = {
  duration: duracion.rapida,
  ease: curva.salidaSuave,
} as const;

/** Configuración de viewport compartida: nunca se repite al volver a subir. */
export const vistaUnaVez = { once: true, margin: '-80px' } as const;
