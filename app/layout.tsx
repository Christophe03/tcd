import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toumanyditchristophe.web.app'
const ogImage = `${siteUrl}/images/1.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Toumany dit Christophe Diarra - D?veloppeur Web & Mobile, Consultant IA, Formateur',
    template: '%s | Toumany dit Christophe Diarra'
  },
  description:
    'Consultant et d?veloppeur web, mobile et intelligence artificielle. Je con?ois des sites web, applications mobiles, formations et solutions IA pour les entreprises et porteurs de projet.',
  keywords: [
    'd?veloppeur app mobile',
    'd?veloppeur web',
    'consultant digital',
    'consultant IA',
    'transformation digitale',
    'formation',
    'intelligence artificielle',
    'IA',
    'd?veloppement mobile',
    'd?veloppement web',
    'expert digital',
    'portfolio'
  ],
  authors: [{ name: 'Toumany dit Christophe Diarra' }],
  creator: 'Toumany dit Christophe Diarra',
  publisher: 'Toumany dit Christophe Diarra',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    title: 'Toumany dit Christophe Diarra - D?veloppeur Web & Mobile, Consultant IA, Formateur',
    description:
      "Portfolio professionnel pr?sentant mes comp?tences en cr?ation de sites web, applications mobiles, formation et solutions d'intelligence artificielle.",
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Toumany dit Christophe Diarra',
    images: [
      {
        url: ogImage,
        width: 864,
        height: 1184,
        alt: 'Toumany dit Christophe Diarra - D?veloppeur Web & Mobile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toumany dit Christophe Diarra - D?veloppeur Web & Mobile, Consultant IA, Formateur',
    description:
      "Portfolio professionnel pr?sentant mes comp?tences en cr?ation de sites web, applications mobiles, formation et solutions d'intelligence artificielle.",
    images: [ogImage]
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans">{children}</body>
    </html>
  )
}
