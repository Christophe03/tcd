# Le Baobab — portfolio de Toumany dit Christophe Diarra

Portfolio immersif : une **porte** s'ouvre sur un **baobab** que l'on parcourt de bas en haut.

| Partie de l'arbre | Contenu                                  | Données                    |
| ----------------- | ---------------------------------------- | -------------------------- |
| Porte             | Écran d'accueil (une fois par session)   | `src/data/profil.ts`       |
| Seuil             | Résumé en 30 secondes, chiffres clés, CV | `src/data/profil.ts`       |
| Racines           | Diplômes et formations                   | `src/data/formations.ts`   |
| Tronc             | Présentation et expériences              | `src/data/experiences.ts`  |
| Branches          | Compétences (une branche par catégorie)  | `src/data/competences.ts`  |
| Feuilles          | Projets (grappes de feuilles cliquables) | `src/data/projets.ts`      |
| Ciel              | Contact                                  | `src/data/profil.ts`       |

Stack : Next.js 16 (App Router, export statique) · TypeScript strict · Tailwind CSS 4 · three.js + React Three Fiber + drei · GSAP ScrollTrigger · Lenis. Hébergement : Firebase Hosting.

## Lancer en local

```bash
npm install
npm run dev          # http://localhost:3000
```

Autres commandes :

```bash
npm run build        # export statique dans out/
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run format       # Prettier
```

Astuce : pour revoir la porte, fermez l'onglet (l'intro est mémorisée en `sessionStorage`) ou cliquez sur « Passer l'intro » pour l'ignorer. `?vue=classique` dans l'URL ouvre directement la vue 2D.

## Modifier le contenu

Tout le texte du site vient de `src/data/`. Aucun composant n'est à toucher pour mettre à jour le contenu. Les valeurs à vérifier sont marquées `TODO`.

### Ajouter un diplôme ou une formation (racine)

Dans `src/data/formations.ts`, copier un objet et changer son `id` :

```ts
{
  id: 'ma-certification',            // unique
  titre: 'Intitulé exact',
  etablissement: 'Organisme',
  lieu: 'Bamako',                    // facultatif
  periode: '2026',
  description: 'Une phrase.',        // facultatif
  justificatif: '/documents/certificat/fichier.pdf', // facultatif, fichier placé dans public/
  enCours: false,                    // facultatif
}
```

Une nouvelle racine apparaît automatiquement dans l'arbre.

### Ajouter un projet (feuille)

Dans `src/data/projets.ts` :

```ts
{
  id: 'mon-projet',
  titre: 'Nom du projet',
  sigle: 'MP',                       // facultatif, affiché sur la couverture
  resume: 'Une ligne pour la carte.',
  description: 'Le détail affiché dans la fiche.',
  categories: ['Web'],               // 'Web' | 'Mobile' | 'IA' | 'Institutionnel'
  stack: ['Next.js', 'PostgreSQL'],  // [] si inconnue
  role: 'Conception et développement',
  periode: '2026',
  lien: 'https://…',                 // seulement si l'URL existe : sinon pas de bouton
  image: '/images/projets/mon-projet.webp', // facultatif
}
```

Une nouvelle grappe de feuilles pousse dans la couronne. Au-delà de 8 projets, un filtre par catégorie s'affiche.

### Ajouter une compétence (branche ou nœud)

Dans `src/data/competences.ts`, ajouter `{ nom: 'Docker', niveau: 'Confirmé' }` dans la catégorie voulue (`niveau` : `'Avancé' | 'Confirmé' | 'Notions'`, facultatif). Une nouvelle catégorie fait pousser une nouvelle branche.

### Profil, liens, chiffres

`src/data/profil.ts` centralise le nom, la bio, les liens (GitHub unique : `GITHUB_URL`), l'e-mail, WhatsApp et les chiffres clés. Le CV est `public/documents/Toumany_dit_Christophe_Diarra.pdf` : le remplacer en gardant ce nom de fichier.

## Structure

```
src/
  app/            layout (SEO, JSON-LD, GTM, amorçage), page, robots.ts, sitemap.ts
  components/
    Shell.tsx       orchestration : Lenis, ScrollTrigger, survols DOM ↔ 3D, chargement différé de la 3D
    DoorOverlay.tsx porte (texte et commandes accessibles dans le DOM)
    TreeNav.tsx     arbre-index (racines en bas, ciel en haut)
    TopBar.tsx      bascule vue immersive / classique
    ClassicView.tsx avis de bascule automatique / lenteur
    sections/       HeroSection, RootsSection, TrunkSection, BranchesSection, LeavesSection, SkyContact
    three/          Experience3D (Canvas), DoorScene, BaobabScene, géométrie et textures procédurales
  data/           contenu du site
  lib/store.ts    état partagé (sans dépendance)
```

### Choix techniques

- **Contenu réel dans le DOM** : chaque texte est en HTML (SEO, lecteurs d'écran). La scène 3D est décorative (`aria-hidden`) et chaque interaction 3D a son équivalent DOM.
- **Baobab 100 % procédural** : tronc en `LatheGeometry`, branches en `TubeGeometry` effilées, feuilles palmées en `InstancedMesh`, textures sur `<canvas>`. Aucun modèle externe ni CDN.
- **Performance** : la 3D est chargée en `dynamic import` (`ssr: false`) après l'affichage, avec `dpr` plafonné à 1,5 (1,25 sur mobile), sans ombres temps réel. `PerformanceMonitor` baisse la résolution et propose la vue classique si l'appareil peine.
- **Vue classique automatique** si WebGL est absent ou si l'appareil est modeste (`hardwareConcurrency` ≤ 2 ou `deviceMemory` ≤ 2). Le choix est mémorisé.
- **`prefers-reduced-motion`** : intro en simple fondu, sans parallaxe, particules ni défilement amorti.
- Le formulaire de contact ouvre la messagerie (`mailto:`) ou WhatsApp : aucune donnée ne transite par un serveur.

## Déployer sur Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

ou `npm run deploy`. `firebase.json` publie le dossier `out/` (projet `toumanyditchristophe`, voir `.firebaserc`).
