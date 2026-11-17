/** Types partagés par toutes les données du portfolio. */

export type Formation = {
  id: string
  titre: string
  etablissement: string
  lieu?: string
  /** Période affichée telle quelle, ex. « 2018 – 2021 ». */
  periode: string
  description?: string
  /** Lien vers un justificatif (PDF, image) dans /public. */
  justificatif?: string
  /** Formation en cours ou prévue. */
  enCours?: boolean
}

export type Experience = {
  id: string
  poste: string
  entreprise: string
  lieu: string
  periode: string
  /** true si le poste est toujours occupé. */
  actuel: boolean
  missions: string[]
  stack?: string[]
}

export type Niveau = 'Avancé' | 'Confirmé' | 'Notions'

export type Competence = {
  nom: string
  niveau?: Niveau
}

export type CategorieCompetences = {
  id: string
  titre: string
  description: string
  competences: Competence[]
}

export type CategorieProjet = 'Web' | 'Mobile' | 'IA' | 'Institutionnel'

export type Projet = {
  id: string
  titre: string
  /** Sigle affiché sur la couverture générée (sinon : initiales du titre). */
  sigle?: string
  resume: string
  description: string
  categories: CategorieProjet[]
  stack: string[]
  role?: string
  periode?: string
  /** Lien public. Laisser undefined si aucun lien réel n'existe : aucun bouton ne sera affiché. */
  lien?: string
  /** Capture d'écran dans /public/images/projets. Facultatif : une couverture graphique est générée sinon. */
  image?: string
}
