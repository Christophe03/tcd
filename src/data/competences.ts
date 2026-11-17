import type { CategorieCompetences } from './types'

/**
 * Les branches : une catégorie = une branche du baobab (source : CV, version octobre 2026).
 * Niveau facultatif : « Avancé », « Confirmé » ou « Notions ».
 * TODO: niveaux à confirmer par Christophe — déduits du CV (stack utilisée en poste = Avancé,
 * citée sans projet associé = Confirmé, « notions » dans le CV = Notions).
 */
export const competences: CategorieCompetences[] = [
  {
    id: 'donnees',
    titre: 'Données & gestion',
    description: 'Bases de données, analyse et tableaux de bord pour piloter.',
    competences: [
      { nom: 'PostgreSQL', niveau: 'Avancé' },
      { nom: 'SQL', niveau: 'Avancé' },
      { nom: 'Excel (formules, TCD)', niveau: 'Avancé' },
      { nom: 'Tableaux de bord & rapports', niveau: 'Avancé' },
      { nom: 'Analyse de données', niveau: 'Confirmé' },
      { nom: 'MySQL', niveau: 'Confirmé' },
      { nom: 'Access', niveau: 'Confirmé' },
      { nom: 'ERP Odoo', niveau: 'Notions' },
    ],
  },
  {
    id: 'frontend',
    titre: 'Frontend',
    description: 'Interfaces web rapides, accessibles et maintenables.',
    competences: [
      { nom: 'Angular', niveau: 'Avancé' },
      { nom: 'TypeScript', niveau: 'Avancé' },
      { nom: 'HTML / CSS / Sass', niveau: 'Avancé' },
      { nom: 'Next.js', niveau: 'Confirmé' },
      { nom: 'React', niveau: 'Confirmé' },
      { nom: 'Tailwind CSS', niveau: 'Confirmé' },
      { nom: 'Vue.js', niveau: 'Notions' },
    ],
  },
  {
    id: 'backend',
    titre: 'Backend',
    description: 'API REST, intégrations et logique métier.',
    competences: [
      { nom: 'NestJS', niveau: 'Avancé' },
      { nom: 'Node.js', niveau: 'Avancé' },
      { nom: 'API REST', niveau: 'Avancé' },
      { nom: 'Firebase', niveau: 'Confirmé' },
      { nom: 'Express', niveau: 'Confirmé' },
      { nom: 'Laravel', niveau: 'Confirmé' },
      { nom: 'MongoDB', niveau: 'Notions' },
      { nom: 'Python', niveau: 'Notions' },
      { nom: 'Spring Boot', niveau: 'Notions' },
    ],
  },
  {
    id: 'mobile',
    titre: 'Mobile',
    description: 'Applications Android et iOS multiplateformes.',
    competences: [
      { nom: 'Flutter', niveau: 'Avancé' },
      { nom: 'Supabase', niveau: 'Confirmé' },
      { nom: 'Ionic', niveau: 'Notions' },
    ],
  },
  {
    id: 'ia',
    titre: 'IA & automatisation',
    description: 'Développement assisté par IA, analyse, rédaction et automatisation.',
    competences: [
      { nom: 'Claude & Claude Code', niveau: 'Avancé' },
      { nom: 'ChatGPT & Codex', niveau: 'Avancé' },
      { nom: 'Gemini & Antigravity', niveau: 'Confirmé' },
      { nom: 'GitHub Copilot', niveau: 'Confirmé' },
      { nom: 'Prompting', niveau: 'Avancé' },
      { nom: 'Automatisation de workflows', niveau: 'Confirmé' },
    ],
  },
  {
    id: 'outils',
    titre: 'Outils & DevOps',
    description: 'Versionnage, déploiement, support et infrastructure.',
    competences: [
      { nom: 'Git / GitHub', niveau: 'Avancé' },
      { nom: 'WordPress', niveau: 'Avancé' },
      { nom: 'Postman', niveau: 'Avancé' },
      { nom: 'CI/CD', niveau: 'Confirmé' },
      { nom: 'Vercel & Firebase Hosting', niveau: 'Confirmé' },
      { nom: 'Helpdesk & incidents', niveau: 'Confirmé' },
      { nom: 'Réseau', niveau: 'Confirmé' },
      { nom: 'Docker', niveau: 'Notions' },
    ],
  },
  {
    id: 'bureautique',
    titre: 'Bureautique & collaboration',
    description: 'Les outils du quotidien, que j’enseigne depuis 2022.',
    competences: [
      { nom: 'Word, Excel, PowerPoint', niveau: 'Avancé' },
      { nom: 'Google Workspace', niveau: 'Avancé' },
      { nom: 'Microsoft Teams', niveau: 'Avancé' },
    ],
  },
  {
    id: 'design',
    titre: 'Design UX/UI',
    description: 'Maquettes et parcours utilisateurs avant la première ligne de code.',
    competences: [
      { nom: 'Figma', niveau: 'Confirmé' },
      { nom: 'Adobe XD', niveau: 'Confirmé' },
      { nom: 'Canva', niveau: 'Avancé' },
    ],
  },
  {
    id: 'conseil',
    titre: 'Formation & conseil',
    description: 'Transmettre, cadrer et piloter.',
    competences: [
      { nom: 'Formation et encadrement (80+ pers.)', niveau: 'Avancé' },
      { nom: 'Gestion de projet Agile / Scrum', niveau: 'Avancé' },
      { nom: 'Documentation technique', niveau: 'Avancé' },
      { nom: 'Réponse à appels d’offres', niveau: 'Confirmé' },
      { nom: 'Community management & SEO', niveau: 'Confirmé' },
    ],
  },
]
