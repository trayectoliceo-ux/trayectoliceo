import type { Config } from 'tailwindcss';

/**
 * Sistema visual de Trayecto Liceo.
 *
 * Dirección tecnológica corporativa: fondos casi blancos, azul profundo
 * como texto, azul eléctrico institucional y menta reservada a
 * confirmación. Geometría limpia y radios generosos (estilo bento).
 *
 * Los nombres de los tokens no cambian aunque cambien los valores: así el
 * rediseño se propaga a todo el sitio sin tocar componente por componente.
 * Todos los pares cumplen contraste AA sobre los dos fondos.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /** Gris ultraclaro, no blanco puro: descansa la vista en textos largos. */
        papel: {
          DEFAULT: '#F8FAFC',
          hondo: '#F1F5F9',
          puro: '#FFFFFF',
        },
        /** Azul corporativo oscuro en lugar de negro. */
        tinta: {
          DEFAULT: '#0F172A',
          suave: '#475569',
        },
        /** Azul eléctrico: acción, enlaces, elementos activos. */
        institucional: {
          DEFAULT: '#1D4ED8',
          claro: '#2563EB',
          hondo: '#1E3A8A',
        },
        /** Menta: confirmación, verificación, seguridad. Nunca decorativa. */
        menta: {
          DEFAULT: '#047857',
          claro: '#10B981',
          brillo: '#6EE7B7',
        },
        /** Reservado a errores de formulario y avisos legales. */
        sello: {
          DEFAULT: '#B91C1C',
          claro: '#F59E0B',
        },
        gris: '#64748B',
        linea: '#E2E8F0',
        'linea-oscura': '#1E293B',
      },
      fontFamily: {
        /** Plus Jakarta Sans: geométrica, con carácter en pesos altos. */
        display: ['var(--fuente-display)', 'system-ui', 'sans-serif'],
        /** Inter: la referencia en legibilidad de interfaz. */
        sans: ['var(--fuente-sans)', 'system-ui', 'sans-serif'],
        /** Datos, etiquetas y códigos. */
        mono: ['var(--fuente-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala editorial: los saltos grandes solo existen en titulares.
        etiqueta: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        menudo: ['0.9375rem', { lineHeight: '1.6rem' }],
        cuerpo: ['1.0625rem', { lineHeight: '1.75rem' }],
        'cuerpo-lg': ['1.25rem', { lineHeight: '1.9rem' }],
        entrada: ['clamp(1.5rem, 2.3vw, 1.875rem)', { lineHeight: '1.3' }],
        t3: ['clamp(1.75rem, 2.6vw, 2.125rem)', { lineHeight: '1.22', letterSpacing: '-0.018em' }],
        t2: ['clamp(2.25rem, 4.5vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        t1: ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        /** Titular de portada. Deliberadamente grande: es el gancho. */
        portada: ['clamp(3rem, 8.5vw, 6.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        lectura: '38rem',
        contenido: '72rem',
      },
      borderRadius: {
        // Radios generosos: producto digital, no papelería.
        DEFAULT: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        tarjeta: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.10)',
        elevada: '0 2px 4px rgba(15,23,42,0.04), 0 20px 48px -20px rgba(15,23,42,0.18)',
      },
      spacing: {
        seccion: '5.5rem',
        'seccion-lg': '8rem',
      },
    },
  },
  plugins: [],
};

export default config;
