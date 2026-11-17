import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import Script from 'next/script'
import { EMAIL, GITHUB_URL, GTM_ID, LINKEDIN_URL, SITE_URL, profil } from '@/data/profil'
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
const DESCRIPTION =
  'Informaticien de gestion et développeur full stack (Angular, NestJS, Flutter, Next.js) : applications de gestion, bases de données, tableaux de bord, IA et formation. Basé à Kati, Mali.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'développeur web Mali',
    'développeur mobile Flutter',
    'développeur full stack Bamako',
    'Angular',
    'NestJS',
    'Next.js',
    'consultant IA',
    'formateur développement web',
    'Toumany Diarra',
  ],
  authors: [{ name: profil.nom, url: SITE_URL }],
  creator: profil.nom,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: profil.nom,
    images: [{ url: '/images/1.png', width: 864, height: 1184, alt: profil.photo.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/1.png'],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: '#120c08',
  colorScheme: 'dark',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Toumany dit Christophe Diarra',
  alternateName: 'Christophe Diarra',
  jobTitle: 'Informaticien de gestion · Développeur Web & Mobile · Consultant IA · Formateur',
  url: SITE_URL,
  image: `${SITE_URL}/images/1.png`,
  email: `mailto:${EMAIL}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kati',
    addressCountry: 'ML',
  },
  worksFor: { '@type': 'Organization', name: 'Sitan Informatique' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Institut Universitaire de Gestion (IUG)' },
    { '@type': 'EducationalOrganization', name: 'Orange Digital Kalanso' },
  ],
  knowsAbout: [
    'Angular',
    'NestJS',
    'Flutter',
    'Next.js',
    'PostgreSQL',
    'Firebase',
    'Bases de données',
    'Tableaux de bord',
    'Applications de gestion',
    'Intelligence artificielle',
  ],
  knowsLanguage: ['fr', 'bm', 'en'],
  sameAs: [LINKEDIN_URL, GITHUB_URL],
}

/**
 * Amorçage avant le premier rendu : choix de la vue (immersive / classique) et de l'intro.
 * - vue classique automatique si WebGL est indisponible ou si l'appareil est modeste ;
 * - l'intro (porte) n'est jouée qu'une fois par session ;
 * - ?vue=classique ou ?vue=immersive dans l'URL force une vue (lien partageable).
 */
const bootScript = `(function(){try{var d=document.documentElement,n=navigator,low=false,v=null;
try{v=localStorage.getItem('baobab:view')}catch(e){}
var q=new URLSearchParams(location.search).get('vue');if(q==='classique')v='classic';else if(q==='immersive')v='immersive';
if((n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(n.deviceMemory&&n.deviceMemory<=2))low=true;
try{var c=document.createElement('canvas'),g=c.getContext('webgl2')||c.getContext('webgl');if(!g){low=true}else{var x=g.getExtension('WEBGL_lose_context');x&&x.loseContext()}}catch(e){low=true}
var view=(v==='classic'||v==='immersive')?v:(low?'classic':'immersive');
d.dataset.view=view;if(!v&&low)d.dataset.auto='1';
var entered=false;try{entered=sessionStorage.getItem('baobab:entered')==='1'}catch(e){}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
