'use client'

import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { projets } from '@/data/projets'
import { setUi, useUi } from '@/lib/store'
import { ProjectCover } from './ProjectCover'

/** Panneau modal d'un projet (élément <dialog> natif : focus piégé, Échap, retour du focus). */
export function ProjectModal() {
  const id = useUi((s) => s.projetOuvert)
  const ref = useRef<HTMLDialogElement>(null)
  const retourFocus = useRef<HTMLElement | null>(null)
  const projet = projets.find((p) => p.id === id)
  const index = projet ? projets.indexOf(projet) : 0

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (projet && !d.open) {
      retourFocus.current = document.activeElement as HTMLElement | null
      d.showModal()
    } else if (!projet && d.open) {
      d.close()
    }
  }, [projet])

  const fermer = () => {
    setUi({ projetOuvert: null })
    retourFocus.current?.focus?.()
  }

  return (
    <dialog
      ref={ref}
      className="projet-modal border-or/30 bg-nuit text-creme m-auto max-h-[calc(100svh-2rem)] w-[min(640px,calc(100vw-2rem))] overflow-y-auto rounded-3xl border p-0 shadow-2xl"
      aria-labelledby="projet-modal-titre"
      onClose={fermer}
      onClick={(e) => {
        if (e.target === e.currentTarget) fermer()
      }}
    >
      {projet ? (
        <article>
          <div className="relative">
            <ProjectCover projet={projet} index={index} className="h-44 w-full sm:h-56" />
            <button
              type="button"
              onClick={fermer}
              className="bg-nuit/85 text-creme hover:bg-nuit absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Fermer"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <p className="eyebrow">{projet.categories.join(' · ')}</p>
            <h2 id="projet-modal-titre" className="font-display mt-2 text-3xl font-semibold">
              {projet.titre}
            </h2>
            <div className="bogolan-dots mt-4 w-32" aria-hidden="true" />
            <p className="text-sable/90 mt-4 leading-relaxed">{projet.description}</p>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              {projet.role ? (
                <div>
                  <dt className="text-or font-semibold">Rôle</dt>
                  <dd className="text-sable/90 mt-1">{projet.role}</dd>
                </div>
              ) : null}
              {projet.periode ? (
                <div>
                  <dt className="text-or font-semibold">Période</dt>
                  <dd className="text-sable/90 mt-1">{projet.periode}</dd>
                </div>
              ) : null}
              {projet.stack.length > 0 ? (
                <div className="sm:col-span-2">
                  <dt className="text-or font-semibold">Stack</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-1.5">
                      {projet.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
            </dl>
            {projet.lien ? (
              <a href={projet.lien} target="_blank" rel="noopener" className="btn btn-or mt-7">
                Voir le projet en ligne
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </article>
      ) : null}
    </dialog>
  )
}
