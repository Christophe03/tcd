'use client'

import { ArrowUpRight, Leaf } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SEUIL_FILTRE_PROJETS, projets } from '@/data/projets'
import type { CategorieProjet } from '@/data/types'
import { setUi } from '@/lib/store'
import { ProjectCover } from './ProjectCover'
import { ProjectModal } from './ProjectModal'

const CATEGORIES: CategorieProjet[] = ['Web', 'Mobile', 'IA', 'Institutionnel']

export function ProjectGrid() {
  const [filtre, setFiltre] = useState<CategorieProjet | 'Tous'>('Tous')
  const avecFiltre = projets.length > SEUIL_FILTRE_PROJETS
  const categoriesPresentes = CATEGORIES.filter((c) =>
    projets.some((p) => p.categories.includes(c)),
  )

  const visibles = useMemo(
    () => (filtre === 'Tous' ? projets : projets.filter((p) => p.categories.includes(filtre))),
    [filtre],
  )

  return (
    <>
      {avecFiltre ? (
        <div
          role="group"
          aria-label="Filtrer les projets"
          className="panel mt-5 flex flex-wrap gap-2 p-3"
        >
          {(['Tous', ...categoriesPresentes] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filtre === c}
              onClick={() => setFiltre(c)}
              className={`btn !min-h-9 !px-3.5 !py-1.5 text-sm ${filtre === c ? 'btn-or' : 'btn-ghost'}`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="classic:lg:grid-cols-3 mt-5 grid gap-4 sm:grid-cols-2">
        {visibles.map((p) => {
          const index = projets.indexOf(p)
          return (
            <li key={p.id}>
              <article
                className="panel group hover:border-or/60 flex h-full flex-col overflow-hidden transition-colors duration-300"
                data-link={`projet:${p.id}`}
                data-reveal
              >
                <ProjectCover projet={p} index={index} className="h-28 w-full" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sauge flex flex-wrap gap-1.5 text-xs font-semibold">
                    <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                    {p.categories.join(' · ')}
                  </p>
                  <h3 className="font-display text-creme mt-1.5 text-xl leading-snug font-semibold">
                    {p.titre}
                  </h3>
                  <p className="text-sable/80 mt-1.5 text-sm leading-relaxed">{p.resume}</p>
                  {p.stack.length > 0 ? (
                    <p className="text-sable/65 mt-2 text-xs">{p.stack.join(' · ')}</p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setUi({ projetOuvert: p.id })}
                      className="btn btn-ghost !min-h-10 !py-1.5 text-sm"
                      aria-haspopup="dialog"
                    >
                      Détails<span className="sr-only"> du projet {p.titre}</span>
                    </button>
                    {p.lien ? (
                      <a
                        href={p.lien}
                        target="_blank"
                        rel="noopener"
                        className="btn text-or hover:text-or-clair !min-h-10 !px-2 !py-1.5 text-sm"
                      >
                        Voir le projet
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only"> {p.titre} (nouvel onglet)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      <ProjectModal />
    </>
  )
}
