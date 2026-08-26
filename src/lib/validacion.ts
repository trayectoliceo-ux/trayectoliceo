import type { DatosContacto, Perfil } from './enviarFormulario';

/**
 * Validación en cliente. Vive separada del componente para poder probarla
 * sin renderizar y para reutilizarla en el servidor cuando exista.
 *
 * Los mensajes explican qué falta y cómo resolverlo. Nunca se disculpan ni
 * son vagos.
 */

export type ErroresContacto = Partial<Record<keyof DatosContacto | 'consentimiento', string>>;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Acepta 10 dígitos con o sin separadores, y prefijo internacional opcional. */
const TELEFONO = /^(\+?\d{1,3}[\s-]?)?(\d[\s()-]?){10,14}$/;

export function validarCampo(
  campo: keyof DatosContacto | 'consentimiento',
  valor: string | boolean,
  perfil: Perfil,
): string | undefined {
  const texto = typeof valor === 'string' ? valor.trim() : '';

  switch (campo) {
    case 'nombre':
      if (!texto) return 'Escribe tu nombre completo.';
      if (texto.length < 3) return 'El nombre parece incompleto.';
      return undefined;

    case 'correo':
      if (!texto) return 'Escribe un correo donde podamos responderte.';
      if (!CORREO.test(texto)) return 'Revisa el formato: falta la arroba o el dominio.';
      return undefined;

    case 'telefono':
      if (!texto) return 'Escribe un teléfono de contacto a 10 dígitos.';
      if (!TELEFONO.test(texto)) return 'Escribe 10 dígitos, con o sin espacios.';
      return undefined;

    case 'edadMenor':
      if (perfil !== 'familia') return undefined;
      if (!texto) return 'Indica la edad del menor.';
      if (!/^\d{1,2}$/.test(texto) || Number(texto) < 3 || Number(texto) > 18)
        return 'Trabajamos con edades de 3 a 18 años.';
      return undefined;

    case 'gradoEscolar':
      if (perfil !== 'familia') return undefined;
      if (!texto) return 'Indica el grado escolar que cursa.';
      return undefined;

    case 'cargo':
      if (perfil !== 'colegio') return undefined;
      if (!texto) return 'Indica tu cargo en la institución.';
      return undefined;

    case 'numeroEspecialistas':
      if (perfil !== 'colegio') return undefined;
      if (!texto) return 'Indica cuántos especialistas usarían la plataforma.';
      if (!/^\d{1,4}$/.test(texto)) return 'Escribe solo dígitos.';
      return undefined;

    case 'institucion':
      if (perfil !== 'colegio') return undefined;
      if (!texto) return 'Escribe el nombre del centro.';
      return undefined;

    case 'numeroAlumnos':
      if (perfil !== 'colegio') return undefined;
      if (!texto) return 'Indica el número aproximado de alumnos.';
      if (!/^\d{1,5}$/.test(texto)) return 'Escribe solo dígitos.';
      return undefined;

    case 'cedula':
      if (perfil !== 'profesional') return undefined;
      if (!texto) return 'Escribe tu cédula profesional.';
      if (!/^\d{6,9}$/.test(texto)) return 'La cédula tiene entre 6 y 9 dígitos.';
      return undefined;

    // El mensaje es opcional: el checklist ya recoge el motivo.
    case 'mensaje':
      return undefined;

    case 'consentimiento':
      if (valor !== true) return 'Necesitamos tu autorización para tratar estos datos.';
      return undefined;

    default:
      return undefined;
  }
}

/** Campos exigibles según el perfil seleccionado. */
export function camposDelPerfil(perfil: Perfil): (keyof DatosContacto)[] {
  const comunes: (keyof DatosContacto)[] = ['nombre', 'correo', 'telefono'];

  if (perfil === 'familia') return [...comunes, 'edadMenor', 'gradoEscolar'];
  if (perfil === 'colegio')
    return [...comunes, 'cargo', 'institucion', 'numeroAlumnos', 'numeroEspecialistas'];
  return [...comunes, 'cedula'];
}

export function validarFormulario(
  datos: DatosContacto,
  consentimiento: boolean,
): ErroresContacto {
  const errores: ErroresContacto = {};

  for (const campo of camposDelPerfil(datos.perfil)) {
    const valor = datos[campo];
    const mensaje = validarCampo(
      campo,
      typeof valor === 'string' ? valor : '',
      datos.perfil,
    );
    if (mensaje) errores[campo] = mensaje;
  }

  const errorConsentimiento = validarCampo('consentimiento', consentimiento, datos.perfil);
  if (errorConsentimiento) errores.consentimiento = errorConsentimiento;

  return errores;
}
