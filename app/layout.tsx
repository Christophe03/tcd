import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toumany dit Christophe Diarra - Développeur / Expert Digital',
  description: 'Portfolio de Toumany dit Christophe Diarra, développeur et expert digital spécialisé dans le développement web et mobile, le marketing digital et la création de contenu.',
  keywords: 'développeur, web, mobile, digital, portfolio, React, Next.js, Mali',
  authors: [{ name: 'Toumany dit Christophe Diarra' }],
  openGraph: {
    title: 'Toumany dit Christophe Diarra - Développeur / Expert Digital',
    description: 'Portfolio professionnel présentant mes projets et compétences en développement web et mobile.',
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