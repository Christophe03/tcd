import { FileText, MapPin } from 'lucide-react'
import { formations } from '@/data/formations'
import { SectionHeading } from '../SectionHeading'

/** Les racines : diplômes et formations. Chaque carte allume la racine correspondante. */
export function RootsSection() {
  return (
    <section
      id="racines"
      aria-labelledby="racines-titre"
      className="story-section px-4 py-24 sm:px-8 lg:min-h-[140svh] lg:px-[6vw] lg:py-32"
    >
      <div className="classic:mx-auto classic:max-w-6xl max-w-xl">
        <div className="panel p-6 sm:p-8" data-reveal>
          <SectionHeading
            id="racines-titre"
            eyebrow="Sous la terre"
            titre="Mes racines"
            intro="Le baobab tient debout grâce à ce qu’on ne voit pas. Voici les formations qui me nourrissent."
          />
        </div>
        <ol className="classic:md:grid classic:md:grid-cols-2 classic:md:gap-4 classic:md:space-y-0 mt-5 space-y-4">
          {formations.map((f) => (
            <li key={f.id}>
              <article
                className="panel group hover:border-or/60 p-5 transition-colors duration-300 sm:p-6"
                data-link={`formation:${f.id}`}
                data-reveal
                tabIndex={-1}
              >
                <div className="text-sable/75 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-or font-semibold">{f.periode}</span>
                  {f.lieu ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {f.lieu}
                    </span>
                  ) : null}
                  {f.enCours ? <span className="chip">En cours</span> : null}
                </div>
                <h3 className="font-display text-creme mt-2 text-xl leading-snug font-semibold">
                  {f.titre}
                </h3>
                <p className="text-sable mt-1 font-semibold">{f.etablissement}</p>
                {f.description ? (
                  <p className="text-sable/80 mt-2 text-sm leading-relaxed">{f.description}</p>
                ) : null}
                {f.justificatif ? (
                  <a
                    href={encodeURI(f.justificatif)}
                    target="_blank"
                    rel="noopener"
                    className="text-or mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Voir le justificatif
                    <span className="sr-only"> : {f.titre} (nouvel onglet)</span>
                  </a>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
