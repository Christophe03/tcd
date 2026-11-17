import type { Projet } from './types'

/**
 * Les feuilles : projets réalisés. Chaque projet devient une grappe de feuilles cliquable du baobab.
 * Source : CV (version octobre 2026) + anciens projets du portfolio.
 * - `lien` : ne le renseigner que s'il existe une URL réelle ; sinon aucun bouton n'est affiché.
 * - `stack` : laisser vide si inconnue ; la ligne n'est alors pas affichée.
 * - `image` : capture facultative dans /public/images/projets/ (une couverture graphique est générée sinon).
 * Au-delà de 8 projets, un filtre par catégorie apparaît automatiquement.
 */
export const projets: Projet[] = [
  {
    id: 'gta',
    titre: 'Logiciel GTA — Gestion du temps et des activités',
    sigle: 'GTA',
    resume: 'Suivi du temps et des activités pour piloter l’entreprise.',
    description:
      'Saisie, suivi et restitution des données pour le pilotage de l’activité : modules Référentiel, Activités et Temps passés, tableaux de bord par agent et par mission, rapports Excel multicritères (agent, client, semaine, type, global).',
    categories: ['Web'],
    stack: ['NestJS', 'Angular', 'PostgreSQL', 'ExcelJS'],
    role: 'Conception et développement (Sitan Informatique)',
    periode: 'Avr. 2023 – mai 2025',
  },
  {
    id: 'oise',
    titre: 'Base OISE — DGCT',
    sigle: 'OISE',
    resume:
      'Base de données et application pour la Direction Générale des Collectivités Territoriales.',
    description:
      'Module principal développé : gestion des élections et des élus locaux (collecte, structuration, consultation et édition des données), avec filtres par année, collectivité et scrutin et exports Excel générés dynamiquement.',
    categories: ['Web', 'Institutionnel'],
    stack: ['NestJS', 'Angular', 'PostgreSQL', 'TypeORM', 'ExcelJS'],
    role: 'Développement du module principal (Sitan Informatique)',
    periode: 'Oct. 2024 – avr. 2025',
  },
  {
    id: 'gestion-rd-service',
    titre: 'Application de gestion RD Service',
    sigle: 'RD',
    resume: 'Application web de gestion sur mesure.',
    description:
      'Application web développée pour RD Service : saisie, suivi et organisation des données de gestion. Accès réservé (page de connexion).',
    categories: ['Web'],
    stack: [], // TODO: à confirmer par Christophe (technologies utilisées)
    role: 'Conception et développement',
    lien: 'https://gestionrdserviceperso.com',
  },
  {
    id: 'conseil-orientation',
    titre: 'Conseil d’Orientation Mali',
    resume: 'Portail d’orientation scolaire et universitaire pour le Mali.',
    description:
      'Recommandations personnalisées selon les intérêts et compétences de l’utilisateur, base de données des filières, établissements, débouchés et métiers. Conception, développement et référencement (SEO). La v2 mobile compte une soixantaine d’utilisateurs en phase de test.',
    categories: ['Web', 'Mobile'],
    stack: ['Next.js', 'Flutter', 'Supabase'],
    role: 'Conception, développement et SEO',
    periode: 'Depuis avr. 2025',
    lien: 'https://www.conseil-orientation-mali.com',
  },
  {
    id: 'iimb',
    titre: 'IIM Université Bamako',
    resume: 'Site institutionnel d’une université, livré en moins de 30 jours.',
    description:
      'Présentation des formations, admission et préinscription en ligne. Optimisation UX, performance et référencement, puis gestion de la présence de l’université sur les réseaux sociaux.',
    categories: ['Web', 'Institutionnel'],
    stack: ['Next.js', 'Tailwind CSS', 'Strapi', 'PostgreSQL'],
    role: 'Conception, développement et community management (ROM’S MEDIA)',
    periode: '2025 – 2026',
    lien: 'https://www.iimuniversitebamako.com',
  },
  {
    id: 'rd-service',
    titre: 'RD Service — site institutionnel',
    sigle: 'RDS',
    resume: 'Site vitrine de l’entreprise, livré en moins de 30 jours.',
    description:
      'Site web institutionnel de RD Service : présentation de l’entreprise et de ses services.',
    categories: ['Web', 'Institutionnel'],
    stack: ['Next.js', 'Vercel'],
    role: 'Conception et développement (ROM’S MEDIA)',
    periode: '2025 – 2026',
    lien: 'https://rdservicemali.com',
  },
  {
    id: 'roms-media',
    titre: 'ROM’S MEDIA',
    resume: 'Audit, refonte et maintenance du site d’une agence digitale.',
    description:
      'Audit puis refonte du site de l’agence (services, portfolio multimédia, contact), maintenance, suivi des performances et optimisation SEO/UX.',
    categories: ['Web', 'Institutionnel'],
    stack: ['Next.js', 'Vercel'],
    role: 'Audit, refonte et maintenance',
    periode: '2025 – 2026',
    lien: 'https://www.roms-media.com',
  },
  {
    id: 'mes-factures',
    titre: 'Mes Factures',
    resume: 'Application mobile de gestion de factures.',
    description: 'Création, suivi et consultation des factures, rapide et intuitive.',
    categories: ['Mobile'],
    stack: ['Flutter', 'Firebase'],
    // TODO: à confirmer par Christophe — rôle, période et lien éventuel (store, démo).
  },
  {
    id: 'gestion-stocks',
    titre: 'Gestion de Stocks',
    resume: 'Application web de gestion de stocks.',
    description: 'Suivi des entrées, des sorties et alertes de seuil.',
    categories: ['Web'],
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    // TODO: à confirmer par Christophe — rôle, période et lien éventuel.
  },
  {
    id: 'salon-coiffure',
    titre: 'Salon de Coiffure',
    resume: 'Application mobile de gestion de salon.',
    description: 'Réservations, fiches clients et catalogue de services.',
    categories: ['Mobile'],
    stack: ['Flutter', 'Firebase'],
    // TODO: à confirmer par Christophe — rôle, période et lien éventuel.
  },
  // TODO: ajouter ViralScope (Flutter) et Mandé Héritage (e-commerce Next.js) quand les descriptions
  // et liens seront fournis. Ils ne figurent ni dans le dépôt ni dans le CV.
]

/** Nombre de projets à partir duquel le filtre par catégorie s’affiche. */
export const SEUIL_FILTRE_PROJETS = 8
