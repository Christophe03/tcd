/**
 * Profil, liens et chiffres clés — source unique de vérité.
 * Toute valeur marquée TODO doit être confirmée par Christophe avant mise en ligne définitive.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toumanyditchristophe.web.app'

export const GTM_ID = 'GTM-W7WRWV7V'

/** Lien GitHub unique, utilisé partout sur le site. */
export const GITHUB_URL = 'https://github.com/Christophe03'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/toumany-dit-christophe-diarra-386401188/'

export const EMAIL = 'toumanychristophediarra@gmail.com'

export const WHATSAPP_NUMERO_AFFICHE = '+223 96 85 52 82'
export const WHATSAPP_URL = 'https://wa.me/22396855282'

export const CV_URL = '/documents/Toumany_dit_Christophe_Diarra.pdf'

export const profil = {
  nom: 'Toumany dit Christophe DIARRA',
  nomCourt: 'Christophe Diarra',
  prenomUsage: 'Christophe',
  titre: 'Développeur Web & Mobile · Consultant IA · Formateur',
  titreLong: 'Informaticien de gestion · ingénieur SI et développeur full stack',
  accroche: 'Bases de données · Tableaux de bord · Applications de gestion · Support SI',
  localisation: 'Kati, Mali',
  disponibilite: 'Disponible pour nouvelles missions',
  photo: {
    src: '/images/portrait-864.webp',
    srcPetit: '/images/portrait-480.webp',
    original: '/images/1.png',
    alt: 'Portrait de Toumany dit Christophe Diarra, en veste grise, assis face à l’objectif',
    largeur: 864,
    hauteur: 1184,
  },
  bio: [
    'Ingénieur en systèmes d’information, je conçois et déploie des applications de gestion et des bases de données, je traite et analyse les données et je produis tableaux de bord et rapports pour des organisations publiques et privées au Mali.',
    'Responsable du pôle Web & Médias chez Sitan Informatique, j’encadre deux développeurs et je pilote des logiciels comme GTA ou la base OISE de la DGCT.',
    'Formateur depuis 2022 (développement, bases de données, bureautique et outils d’IA comme Claude, ChatGPT ou Gemini), je documente mon travail et je tiens les délais.',
  ],
  langues: [
    { langue: 'Français', niveau: 'Courant, écrit et oral' },
    { langue: 'Bambara', niveau: 'Courant' },
    { langue: 'Anglais', niveau: 'Technique (documentation, API, outils)' },
  ],
}

/**
 * Chiffres clés. Le site précédent affichait à la fois « 6+ ans / 60+ projets » et « 3+ ans / 10+ projets ».
 * Valeurs retenues : celles du CV (version octobre 2026) ; le nombre de projets est calculé à partir de projets.ts.
 */
export const chiffres = {
  // Source : CV (« plus de 6 ans d'expérience »). TODO: à confirmer par Christophe — la plus ancienne
  // expérience listée date d'août 2022 ; préciser ce qui compte avant (missions, freelance, formation).
  anneesExperience: 6,
  // Source : CV (« Formation et encadrement (80+ pers.) »).
  apprenantsFormes: 80,
  // Source : CV (« Encadrement de 2 développeurs »).
  developpeursEncadres: 2,
}
