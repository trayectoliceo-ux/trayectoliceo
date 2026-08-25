import type { Config } from 'tailwindcss';

/**
 * Sistema visual de Trayecto Liceo.
 *
 * La paleta se deriva del logotipo. Analizado por matiz, el logotipo es en
 * un 63 % azul, índigo y turquesa, y solo un 18 % cálido: no es realmente
 * un arcoíris, es una familia fría con un acento ámbar. El sitio adopta esa
 * misma proporción —índigo institucional, turquesa secundario, ámbar
 * reservado a acreditación y llamadas— para que la marca y la página se
 * reconozcan como una sola cosa sin trasladar la saturación del logotipo a
 * superficies grandes.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /** Papel neutro frío, con el mismo sesgo azul del logotipo. */
        papel: {
          DEFAULT: '#F1F2F5',
          hondo: '#E5E7EE',
        },
        /** Azul de noche: el índigo del logotipo llevado casi al negro. */
        tinta: {
          DEFAULT: '#151827',
          suave: '#3B3F52',
        },
        /** Índigo del hemisferio, el color de mayor superficie de la marca. */
        institucional: {
          DEFAULT: '#363C8E',
          claro: '#166F84',
        },
        /** Ámbar del anillo, oscurecido hasta cumplir contraste de texto. */
        sello: {
          DEFAULT: '#8C5809',
          claro: '#E4A63C',
        },
        gris: '#5F6478',
        linea: '#D6D9E3',
        'linea-oscura': '#2E3560',
      },
      fontFamily: {
        display: ['var(--fuente-display)', 'Georgia', 'serif'],
        sans: ['var(--fuente-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--fuente-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala editorial: los saltos grandes solo existen en titulares.
        etiqueta: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.14em' }],
        menudo: ['0.8125rem', { lineHeight: '1.4rem' }],
        cuerpo: ['1rem', { lineHeight: '1.7rem' }],
        'cuerpo-lg': ['1.125rem', { lineHeight: '1.85rem' }],
        entrada: ['1.375rem', { lineHeight: '1.9rem' }],
        t3: ['1.5rem', { lineHeight: '1.9rem', letterSpacing: '-0.01em' }],
        t2: ['2rem', { lineHeight: '2.35rem', letterSpacing: '-0.015em' }],
        t1: ['2.75rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],
        portada: ['clamp(2.5rem, 7vw, 4.75rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        lectura: '38rem',
        contenido: '72rem',
      },
      borderRadius: {
        // Radios mínimos: institución, no aplicación.
        DEFAULT: '2px',
        md: '3px',
        lg: '4px',
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
