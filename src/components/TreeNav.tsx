'use client'

import { SECTIONS, useUi, type SectionId } from '@/lib/store'

const POINTS: { id: SectionId; label: string }[] = [
  { id: 'racines', label: 'Racines' },
  { id: 'tronc', label: 'Tronc' },
  { id: 'branches', label: 'Branches' },
  { id: 'feuilles', label: 'Feuilles' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Arbre-index : se lit de bas en haut comme le baobab (racines en bas, ciel en haut).
 * L'ordre DOM reste logique (racines → contact) pour le clavier et les lecteurs d'écran.
 */
export function TreeNav() {
  const section = useUi((s) => s.section)
  const intro = useUi((s) => s.intro)
  const actif = SECTIONS.findIndex((s) => s.id === section)

  return (
    <nav
      aria-label="Parcours dans l’arbre"
      className={`fixed bottom-3 left-1/2 z-40 -translate-x-1/2 transition-opacity duration-500 sm:top-1/2 sm:right-5 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-translate-y-1/2 ${
        intro !== 'done'
          ? 'pointer-events-none opacity-0'
          : section === 'seuil'
            ? 'max-sm:pointer-events-none max-sm:opacity-0'
            : 'opacity-100'
      }`}
    >
      <ol className="panel relative flex flex-row items-center gap-1 !rounded-full px-2 py-0.5 sm:flex-col-reverse sm:items-end sm:px-2 sm:py-3">
        <span
          className="from-ecorce via-ocre/70 to-or/60 absolute top-1/2 right-6 left-6 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r sm:top-5 sm:right-[25px] sm:bottom-5 sm:left-auto sm:h-auto sm:w-[3px] sm:translate-y-0 sm:bg-gradient-to-t"
          aria-hidden="true"
        />
        {POINTS.map((p) => {
          const idx = SECTIONS.findIndex((s) => s.id === p.id)
          const courant = section === p.id
          const passe = idx < actif
          return (
            <li key={p.id} className="relative">
              <a
                href={`#${p.id}`}
                aria-current={courant ? 'location' : undefined}
                className="group flex h-11 min-w-11 items-center justify-center gap-2 rounded-full sm:justify-end sm:pr-[14px] sm:pl-2"
              >
                <span
                  className={`hidden text-xs font-bold tracking-wide whitespace-nowrap transition-colors lg:inline ${
                    courant ? 'text-or' : 'text-sable/70 group-hover:text-creme'
                  }`}
                >
                  {p.label}
                </span>
                <span className="sr-only lg:hidden">{p.label}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-3 w-3 rotate-45 border-2 transition-all duration-300 ${
                    courant
                      ? 'border-or bg-or scale-125 shadow-[0_0_14px_rgba(231,183,90,0.8)]'
                      : passe
                        ? 'border-ocre bg-ocre'
                        : 'border-sable/50 bg-nuit group-hover:border-or'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
