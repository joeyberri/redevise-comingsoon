/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: 'rgb(var(--color-lime) / <alpha-value>)',
          400: 'rgb(var(--color-lime-400) / <alpha-value>)',
          500: 'rgb(var(--color-lime-500) / <alpha-value>)',
          600: 'rgb(var(--color-lime-600) / <alpha-value>)',
        },
        green: {
          DEFAULT: 'rgb(var(--color-green) / <alpha-value>)',
          400: 'rgb(var(--color-green-400) / <alpha-value>)',
          500: 'rgb(var(--color-green-500) / <alpha-value>)',
          600: 'rgb(var(--color-green-600) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--color-dark) / <alpha-value>)',
          50: 'rgb(var(--color-dark-50) / <alpha-value>)',
          100: 'rgb(var(--color-dark-100) / <alpha-value>)',
          200: 'rgb(var(--color-dark-200) / <alpha-value>)',
          300: 'rgb(var(--color-dark-300) / <alpha-value>)',
          400: 'rgb(var(--color-dark-400) / <alpha-value>)',
          500: 'rgb(var(--color-dark-500) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          dim: 'rgb(var(--color-accent-dim) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: 'var(--font-serif)',
        sans: 'var(--font-sans)',
      },
      letterSpacing: {
        tightest: 'var(--ls-tightest)',
        tighter: 'var(--ls-tighter)',
        widest: 'var(--ls-widest)',
        widestest: 'var(--ls-widestest)',
      },
      blur: {
        '4xl': 'var(--blur-4xl)',
        '5xl': 'var(--blur-5xl)',
        '6xl': 'var(--blur-6xl)',
      },
      lineHeight: {
        tightest: 'var(--lh-tightest)',
      },
      fontSize: {
        tiny: 'var(--fs-tiny)',
      },
      spacing: {
        'glow': 'var(--size-glow)',
        'glow-md': 'var(--size-glow-md)',
        'glow-lg': 'var(--size-glow-lg)',
      },
      gridTemplateColumns: {
        'about': '1fr 2fr',
      },
      maxWidth: {
        container: 'var(--max-w-container)',
      },
      borderRadius: {
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
      },
      animation: {
        "border-beam": "border-beam var(--duration) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
  plugins: [],
};