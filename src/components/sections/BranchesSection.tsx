import { competences } from '@/data/competences'
import type { Niveau } from '@/data/types'
import { SectionHeading } from '../SectionHeading'

const POINTS: Record<Niveau, number> = { Avancé: 3, Confirmé: 2, Notions: 1 }

function NiveauIndicateur({ niveau }: { niveau?: Niveau }) {
  if (!niveau) return null
  const n = POINTS[niveau]
  return (
    <span className="inline-flex items-center gap-[3px]" title={niveau}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-1.5 w-1.5 rotate-45 ${i <= n ? 'bg-or' : 'bg-sable/25'}`}
        />
      ))}
      <span className="sr-only">, niveau {niveau}</span>
    </span>
  )
}

/** Les branches : une catégorie de compétences par branche du baobab. */
export function BranchesSection() {
  return (
    <section
      id="branches"
      aria-labelledby="branches-titre"
      className="story-section px-4 py-24 sm:px-8 lg:min-h-[150svh] lg:px-[6vw] lg:py-32"
    >
      <div className="classic:mx-auto classic:max-w-6xl max-w-xl">
        <div className="panel p-6 sm:p-8" data-reveal>
          <SectionHeading
            id="branches-titre"
            eyebrow="Vers la lumière"
            titre="Les branches : mes compétences"
            intro="Chaque branche est un domaine. Niveaux : Avancé (◆◆◆), Confirmé (◆◆), Notions (◆)."
          />
        </div>
        <div className="classic:lg:grid-cols-3 mt-5 grid gap-4 sm:grid-cols-2">
          {competences.map((c) => (
            <article
              key={c.id}
              className="panel hover:border-or/60 p-5 transition-colors duration-300"
              data-link={`competence:${c.id}`}
              data-reveal
              aria-labelledby={`comp-${c.id}`}
            >
              <h3 id={`comp-${c.id}`} className="font-display text-creme text-xl font-semibold">
                {c.titre}
              </h3>
              <p className="text-sable/75 mt-1 text-sm leading-snug">{c.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.competences.map((s) => (
                  <li key={s.nom} className="chip !gap-2 !py-1 text-[0.8rem]">
                    {s.nom}
                    <NiveauIndicateur niveau={s.niveau} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
