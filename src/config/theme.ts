/**
 * Design system configuration
 * Defines colors, typography, spacing, and animation presets
 */

export const theme = {
  colors: {
    light: {
      primary: '#3b82f6', // blue-500
      secondary: '#8b5cf6', // violet-500
      accent: '#f59e0b', // amber-500
      background: '#ffffff',
      foreground: '#0f172a', // slate-900
      muted: '#f1f5f9', // slate-100
      border: '#e2e8f0', // slate-200
      card: '#ffffff',
      cardHover: '#f8fafc', // slate-50
    },
    dark: {
      primary: '#60a5fa', // blue-400
      secondary: '#a78bfa', // violet-400
      accent: '#fbbf24', // amber-400
      background: '#0f172a', // slate-900
      foreground: '#f1f5f9', // slate-100
      muted: '#1e293b', // slate-800
      border: '#334155', // slate-700
      card: '#1e293b', // slate-800
      cardHover: '#334155', // slate-700
    },
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  spacing: {
    section: '6rem',
    container: '1280px',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type Theme = typeof theme;
