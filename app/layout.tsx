import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toumany dit Christophe Diarra - Développeur Web & Mobile, Consultant IA, Formateur',
  description: 'Consultant et développeur web, mobile et intelligence artificielle. Je conçois des sites web, applications mobiles, formations et solutions IA pour les entreprises et porteurs de projet.',
  keywords: 'développeur app mobile, développeur web, consultant digital, consultant IA, transformation digitale, formation, intelligence artificielle, IA, développement mobile, développement web, expert digital, portfolio',
  authors: [{ name: 'Toumany dit Christophe Diarra' }],
  openGraph: {
    title: 'Toumany dit Christophe Diarra - Développeur Web & Mobile, Consultant IA, Formateur',
    description: 'Portfolio professionnel présentant mes compétences en création de sites web, applications mobiles, formation et solutions d&apos;intelligence artificielle.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}