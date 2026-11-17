import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Le Baobab — Toumany dit Christophe Diarra',
    short_name: 'Le Baobab',
    description:
      'Portfolio de Toumany dit Christophe Diarra, développeur web & mobile à Kati (Mali).',
    lang: 'fr',
    start_url: '/',
    display: 'standalone',
    background_color: '#120c08',
    theme_color: '#120c08',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
