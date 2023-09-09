import type { Config } from 'tailwindcss'

const rem = 0.063;

const sizingIndicator = (count: number) => {
  const size = 4;
  const value = {};
  Array(count + 1).fill(null).forEach((i, key) => {
    Object.assign(value, {
      [key]: `${(1 / 16) * (key * size)}rem`
    });
  });
  return value;
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module

  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // light mode
        // tremor: {
        //   brand: {
        //     faint: "#eff6ff", // blue-50
        //     muted: "#bfdbfe", // blue-200
        //     subtle: "#60a5fa", // blue-400
        //     DEFAULT: "#3b82f6", // blue-500
        //     emphasis: "#1d4ed8", // blue-700
        //     inverted: "#ffffff", // white
        //   },
        //   background: {
        //     muted: "#f9fafb", // gray-50
        //     subtle: "#f3f4f6", // gray-100
        //     DEFAULT: "#ffffff", // white
        //     emphasis: "#374151", // gray-700
        //   },
        //   border: {
        //     DEFAULT: "#e5e7eb", // gray-200
        //   },
        //   ring: {
        //     DEFAULT: "#e5e7eb", // gray-200
        //   },
        //   content: {
        //     subtle: "#9ca3af", // gray-400
        //     DEFAULT: "#6b7280", // gray-500
        //     emphasis: "#374151", // gray-700
        //     strong: "#111827", // gray-900
        //     inverted: "#ffffff", // white
        //   },
        // },
        // // dark mode
        // "dark-tremor": {
        //   brand: {
        //     faint: "#0B1229", // custom
        //     muted: "#172554", // blue-950
        //     subtle: "#1e40af", // blue-800
        //     DEFAULT: "#3b82f6", // blue-500
        //     emphasis: "#60a5fa", // blue-400
        //     inverted: "#030712", // gray-950
        //   },
        //   background: {
        //     muted: "#131A2B", // custom
        //     subtle: "#1f2937", // gray-800
        //     DEFAULT: "#111827", // gray-900
        //     emphasis: "#d1d5db", // gray-300
        //   },
        //   border: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   ring: {
        //     DEFAULT: "#1f2937", // gray-800
        //   },
        //   content: {
        //     subtle: "#4b5563", // gray-600
        //     DEFAULT: "#6b7280", // gray-600
        //     emphasis: "#e5e7eb", // gray-200
        //     strong: "#f9fafb", // gray-50
        //     inverted: "#000000", // black
        //   },
        // },
        'parsley': {
          '50': '#f3fcf1',
          '100': '#e2f9df',
          '200': '#c5f2c0',
          '300': '#97e68f',
          '400': '#64d157',
          '500': '#3db730',
          '600': '#2d9722',
          '700': '#26771e',
          '800': '#25651f',
          '900': '#1d4e19',
          '950': '#0a2a09',
      },
      
      },
      boxShadow: {
        // light
        // "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        // "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        // "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // // dark
        // "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        // "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        // "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        // "tremor-label": ["0.75rem"],
        // "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        // "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        // "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      width: sizingIndicator(390),
      height: sizingIndicator(390),
      maxHeight: sizingIndicator(390),
      minHeight: sizingIndicator(390)
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  variants: {
    top: ['someNew']
  },
  plugins: [
    require('tailwindcss-interaction-variants'),
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}
export default config
