import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Three Fiber : la scène 3D mute volontairement caméra, matériaux et buffers dans useFrame
    // (boucle de rendu impérative, hors cycle React). C'est le modèle documenté de R3F.
    files: ['src/components/three/**/*.{ts,tsx}'],
    rules: { 'react-hooks/immutability': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'functions/**',
    '.npm-cache/**',
    '.agents/**',
    '.claude/**',
    '.trae/**',
    '.windsurf/**',
    'next-env.d.ts',
  ]),
])
