import { ProjectGrid } from '../ProjectGrid'
import { SectionHeading } from '../SectionHeading'

/** Les feuilles : projets réalisés. Les feuilles du baobab sont aussi cliquables en vue immersive. */
export function LeavesSection() {
  return (
    <section
      id="feuilles"
      aria-labelledby="feuilles-titre"
      className="story-section px-4 py-24 sm:px-8 lg:min-h-[150svh] lg:px-[6vw] lg:py-32"
    >
      <div className="classic:mx-auto classic:max-w-6xl max-w-xl">
        <div className="panel p-6 sm:p-8" data-reveal>
          <SectionHeading
            id="feuilles-titre"
            eyebrow="Dans la canopée"
            titre="Les feuilles : mes réalisations"
            intro="Applications, plateformes et sites livrés. Ouvrez une fiche, ou touchez une grappe de feuilles dorées dans l’arbre."
          />
        </div>
        <ProjectGrid />
      </div>
    </section>
  )
}
