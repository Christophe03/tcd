import type { Formation } from './types'

/**
 * Les racines : diplômes et formations, du plus récent au plus ancien.
 * Pour ajouter une formation, copier un objet ci-dessous et changer son `id`.
 */
export const formations: Formation[] = [
  {
    id: 'google-ace',
    titre: 'Google Cloud — Associate Cloud Engineer',
    etablissement: 'Google Cloud',
    periode: 'En préparation (2026)', // TODO: à confirmer par Christophe (date d’examen / obtention)
    description: 'Certification en cours de préparation, mentionnée dans le CV.',
    enCours: true,
  },
  {
    id: 'cqp-odk',
    titre: 'Certificat de qualification professionnelle — Développeur Web Mobile',
    etablissement: 'Orange Digital Kalanso · Promotion 1',
    lieu: 'Bamako',
    periode: 'Août 2021 – avr. 2022',
    description:
      'Premier diplômé de la promotion fondatrice du centre. Formation intensive orientée projets réels, validée par un examen de certification.',
    justificatif: '/documents/certificat/certificat de qualification professionnelle.pdf',
  },
  {
    id: 'simplon-odc',
    titre: 'Certificat de formation — Développement Web & Mobile Fullstack',
    etablissement: 'Simplon.co · Orange Digital Center',
    lieu: 'Bamako',
    periode: 'Août 2021 – mars 2022',
    description:
      'Formation de développeur web et web mobile, certification délivrée le 31 mai 2022.',
    justificatif: '/documents/certificat/certificat de formation SIMPLON.pdf',
  },
  {
    id: 'licence-iug',
    titre: 'Licence professionnelle en informatique de gestion',
    etablissement: 'Institut Universitaire de Gestion (IUG)',
    lieu: 'Bamako',
    periode: '2018 – 2021',
    description:
      'Systèmes d’information, bases de données, développement logiciel et gestion de projet informatique.',
    justificatif: '/documents/licence/Licence.jpg',
  },
  {
    id: 'bac-stg',
    titre: 'Baccalauréat STG — option Comptabilité & Finance',
    etablissement: 'Lycée Technique Privé Moderne',
    lieu: 'Kati',
    periode: '2013 – 2017',
  },
]
