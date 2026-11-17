import type { Experience } from './types'

/**
 * Le tronc : expériences professionnelles (source : CV, version octobre 2026).
 * Ordre antéchronologique par date de début.
 */
export const experiences: Experience[] = [
  {
    id: 'roms-media',
    poste: 'Consultant web & community manager',
    entreprise: 'ROM’S MEDIA',
    lieu: 'Bamako, Mali',
    periode: 'Janv. 2026 – aujourd’hui',
    actuel: true,
    missions: [
      'Développement et maintenance de solutions web pour l’agence et ses clients.',
      'Livraison de 2 sites institutionnels (IIMB, RD Service) en moins de 30 jours chacun.',
      'Suivi des indicateurs de performance et optimisation SEO/UX.',
    ],
    stack: ['Angular', 'Firebase', 'WordPress', 'Next.js'],
  },
  {
    id: 'mcebs',
    poste: 'Consultant développeur full stack',
    entreprise: 'MCEBS Consulting',
    lieu: 'Bamako, Mali',
    periode: 'Août 2025 – aujourd’hui',
    actuel: true,
    missions: [
      'Analyse des besoins métiers, conception d’architectures techniques et documentation.',
      'Intégration d’API REST, de bases PostgreSQL / Firebase et de services tiers.',
      'Support des applications en production.',
    ],
    stack: ['Angular', 'Flutter', 'NestJS', 'PostgreSQL', 'Firebase'],
  },
  {
    id: 'sitan-responsable',
    poste: 'Responsable pôle Web & Médias',
    entreprise: 'Sitan Informatique',
    lieu: 'Bamako, Mali',
    periode: 'Janv. 2024 – aujourd’hui',
    actuel: true,
    missions: [
      'GTA (Gestion du temps et des activités) : conception et développement du logiciel.',
      'Base OISE – DGCT : développement du module principal de gestion des élections et des élus locaux.',
      'Administration des bases PostgreSQL, API REST, intégrations tierces et serveurs locaux.',
      'Encadrement de 2 développeurs ; documentation technique, rapports et procédures.',
      'Support aux utilisateurs et liaison avec fournisseurs et partenaires pour la résolution des incidents.',
    ],
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Flutter'],
  },
  {
    id: 'formateur',
    poste: 'Formateur en développement web & mobile',
    entreprise: '1 Simple 1 / AMI',
    lieu: 'Kati & Bamako, Mali',
    periode: 'Août 2022 – aujourd’hui',
    actuel: true,
    missions: [
      'Plus de 80 apprenants formés : développement web et mobile, bases de données, outils d’IA.',
      'Bureautique et outils collaboratifs : Microsoft Office (Word, Excel, PowerPoint, Access), Teams, Google Workspace.',
      'Conception des programmes et évaluation de la progression à chaque promotion.',
    ],
    stack: [
      'NestJS',
      'PostgreSQL',
      'WordPress',
      'Microsoft Office',
      'Google Workspace',
      'Outils IA',
    ],
  },
  {
    id: 'sitan-stage',
    poste: 'Stagiaire développeur full stack',
    entreprise: 'Sitan Informatique',
    lieu: 'Bamako, Mali',
    periode: 'Févr. 2023 – déc. 2023',
    actuel: false,
    missions: [
      'Développement d’applications web et mobiles.',
      'Participation à la conception et aux tests fonctionnels.',
    ],
    stack: ['Angular', 'NestJS', 'Firebase'],
  },
]
