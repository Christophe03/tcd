import { ArrowUpRight, ChevronDown, Download } from 'lucide-react'
import { CV_URL, chiffres, profil } from '@/data/profil'
import { projets } from '@/data/projets'

/** Seuil : ce qu'un recruteur doit lire en moins de 30 secondes. */
export function HeroSection() {
  const stats = [
    { valeur: `${chiffres.anneesExperience}+`, libelle: 'ans d’expérience' },
    { valeur: `${chiffres.apprenantsFormes}+`, libelle: 'apprenants formés' },
    { valeur: `${projets.length}`, libelle: 'projets présentés ici' },
  ]
  return (
    <section
      id="seuil"
      aria-labelledby="seuil-titre"
      className="story-section flex min-h-[100svh] items-center px-4 pt-24 pb-16 sm:px-8 lg:px-[6vw]"
    >
      <div
        className="panel classic:mx-auto classic:max-w-3xl w-full max-w-xl p-6 sm:p-9"
        data-reveal
      >
        <p className="chip !text-sauge !border-sauge/40 !bg-sauge/10">
          <span className="bg-sauge h-2 w-2 rounded-full" aria-hidden="true" />
          {profil.disponibilite}
        </p>
        <h1
          id="seuil-titre"
          className="font-display text-creme mt-5 text-[2.6rem] leading-[0.98] font-semibold tracking-tight text-balance sm:text-6xl"
        >
          Toumany dit Christophe <span className="text-or">Diarra</span>
        </h1>
        <p className="text-sable mt-4 text-lg font-semibold">{profil.titre}</p>
        <p className="text-sable/80 mt-3 max-w-prose leading-relaxed">
          Je conçois des applications de gestion, des bases de données et des tableaux de bord
          (Angular, NestJS, Flutter, Next.js, PostgreSQL), j’accompagne les organisations sur l’IA
          et je forme la relève à Kati et Bamako.
        </p>

        <dl className="border-or/15 mt-7 grid grid-cols-3 gap-3 border-y py-5">
          {stats.map((s) => (
            <div key={s.libelle} className="flex flex-col">
              <dt className="text-sable/70 text-xs leading-snug">{s.libelle}</dt>
              <dd className="font-display text-or order-first text-3xl font-semibold">
                {s.valeur}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#feuilles" className="btn btn-or">
            Voir mes réalisations
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={CV_URL} download className="btn btn-ghost">
            <Download className="h-4 w-4" aria-hidden="true" />
            Télécharger le CV
          </a>
          <a href="#contact" className="btn btn-ghost">
            Me contacter
          </a>
        </div>

        <p className="immersive-only text-sable/70 mt-8 flex items-center gap-2 text-sm">
          <ChevronDown
            className="h-4 w-4 animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
          Le parcours se lit de bas en haut : défilez pour descendre aux racines, puis grimper
          jusqu’au ciel.
        </p>
      </div>
    </section>
  )
}
