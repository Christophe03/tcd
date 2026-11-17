import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import Script from 'next/script'
import { GTM_ID, SITE_URL, profil } from '@/data/profil'
import { buildJsonLd } from '@/lib/jsonld'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const TITLE = 'Toumany dit Christophe Diarra – Développeur Web & Mobile, Consultant IA, Formateur'
// ~155 caractères : longueur affichée sans troncature dans les résultats Google.
const DESCRIPTION =
  'Développeur full stack web et mobile à Kati (Mali) : applications de gestion, bases de données, tableaux de bord, IA et formation. Angular, NestJS, Flutter.'
const OG_IMAGE = {
  url: '/images/og-cover.jpg',
  width: 1200,
  height: 630,
  alt: 'Toumany dit Christophe Diarra — Développeur Web & Mobile, Consultant IA, Formateur',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Le Baobab',
  category: 'portfolio',
  keywords: [
    'Toumany dit Christophe Diarra',
    'développeur web Mali',
    'développeur web Bamako',
    'développeur Kati',
    'informaticien de gestion Mali',
    'applications de gestion',
    'tableaux de bord',
    'développeur mobile Flutter',
    'développeur full stack Bamako',
    'Angular',
    'NestJS',
    'Next.js',
    'consultant IA',
    'formateur développement web',
    'Toumany Diarra',
    'Christophe Diarra',
  ],
  authors: [{ name: profil.nom, url: SITE_URL }],
  creator: profil.nom,
  publisher: profil.nom,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    locale: 'fr_FR',
    url: `${SITE_URL}/`,
    siteName: 'Le Baobab — Toumany dit Christophe Diarra',
    firstName: 'Toumany dit Christophe',
    lastName: 'Diarra',
    gender: 'male',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: '#120c08',
  colorScheme: 'dark',
}

/**
 * Amorçage avant le premier rendu : choix de la vue (immersive / classique) et de l'intro.
 * - vue classique automatique si WebGL est indisponible ou si l'appareil est modeste ;
 * - l'intro (porte) n'est jouée qu'une fois par session ;
 * - ?vue=classique ou ?vue=immersive dans l'URL force une vue (lien partageable) ;
 * - robots d'indexation : pas d'intro, contenu visible immédiatement (même contenu que les visiteurs).
 */
const bootScript = `(function(){try{var d=document.documentElement,n=navigator,low=false,v=null;
try{v=localStorage.getItem('baobab:view')}catch(e){}
var q=new URLSearchParams(location.search).get('vue');if(q==='classique')v='classic';else if(q==='immersive')v='immersive';
if((n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(n.deviceMemory&&n.deviceMemory<=2))low=true;
try{var c=document.createElement('canvas'),g=c.getContext('webgl2')||c.getContext('webgl');if(!g){low=true}else{var x=g.getExtension('WEBGL_lose_context');x&&x.loseContext()}}catch(e){low=true}
var view=(v==='classic'||v==='immersive')?v:(low?'classic':'immersive');
d.dataset.view=view;if(!v&&low)d.dataset.auto='1';
var entered=/bot|crawl|spider|slurp|lighthouse|facebookexternalhit|whatsapp|linkedin|embedly|preview/i.test(n.userAgent);try{entered=entered||sessionStorage.getItem('baobab:entered')==='1'}catch(e){}
d.dataset.intro=(view==='immersive'&&!entered)?'show':'skip';}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-view="classic"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
