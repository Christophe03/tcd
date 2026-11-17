import type { Projet } from '@/data/types'

const TEINTES = ['#a4552c', '#4e5d3b', '#cf8a3e', '#5c3d28', '#7a6a3a', '#8a4a2a']

/**
 * Couverture graphique générée (motif bogolan + initiales) quand aucune capture n'est fournie.
 * Décorative : le titre du projet est toujours affiché en texte à côté.
 */
export function ProjectCover({
  projet,
  index,
  className = '',
}: {
  projet: Projet
  index: number
  className?: string
}) {
  if (projet.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- export statique, images non optimisées
      <img
        src={projet.image}
        alt={`Capture d’écran du projet ${projet.titre}`}
        loading="lazy"
        decoding="async"
        className={`object-cover ${className}`}
      />
    )
  }
  const teinte = TEINTES[index % TEINTES.length]
  const initiales =
    projet.sigle ??
    projet.titre
      .replace(/[^\p{L}\s]/gu, ' ')
      .split(/\s+/)
      .filter((m) => m.length > 2)
      .slice(0, 2)
      .map((m) => m[0]?.toUpperCase())
      .join('')
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ background: teinte }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-35" preserveAspectRatio="none">
        <defs>
          <pattern id={`bg-${projet.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M0 14 L7 7 L14 14 L21 7 L28 14"
              fill="none"
              stroke="#f6eddc"
              strokeWidth="1.4"
            />
            <circle cx="7" cy="22" r="1.6" fill="#f6eddc" />
            <circle cx="21" cy="22" r="1.6" fill="#f6eddc" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bg-${projet.id})`} />
      </svg>
      <span className="font-display text-creme/95 absolute inset-0 flex items-center justify-center text-5xl font-semibold drop-shadow">
        {initiales}
      </span>
    </div>
  )
}
