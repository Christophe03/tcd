import { Download, MapPin } from 'lucide-react'
import { experiences } from '@/data/experiences'
import { CV_URL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL, chiffres, profil } from '@/data/profil'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../icons'
import { SectionHeading } from '../SectionHeading'

/** Le tronc : présentation et expériences gravées dans l'écorce. */
export function TrunkSection() {
  return (
    <section
      id="tronc"
      aria-labelledby="tronc-titre"
      className="story-section px-4 py-24 sm:px-8 lg:min-h-[160svh] lg:px-[6vw] lg:py-32"
    >
      <div className="classic:mx-auto classic:max-w-6xl classic:lg:grid classic:lg:grid-cols-2 classic:lg:items-start classic:lg:gap-5 max-w-xl">
        <div className="panel overflow-hidden" data-reveal>
          <div className="p-6 pb-0 sm:p-8 sm:pb-0">
            <SectionHeading
              id="tronc-titre"
              eyebrow="Le cœur de l’arbre"
              titre="Le tronc : qui je suis"
            />
          </div>
          <div className="grid gap-6 p-6 pt-0 sm:grid-cols-[150px_1fr] sm:p-8 sm:pt-0">
            <picture>
              <source media="(min-width: 640px)" srcSet={profil.photo.src} type="image/webp" />
              <img
                src={profil.photo.srcPetit}
                alt={profil.photo.alt}
                width={480}
                height={658}
                loading="lazy"
                decoding="async"
                className="border-or/25 aspect-[3/4] w-32 rounded-2xl border object-cover sm:w-full"
              />
            </picture>
            <div>
              <p className="font-display text-creme text-2xl font-semibold">{profil.nom}</p>
              <p className="text-or mt-1 text-sm font-semibold">{profil.titreLong}</p>
              <p className="text-sable/80 mt-1 text-xs">{profil.accroche}</p>
              <p className="text-sable/75 mt-1 inline-flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {profil.localisation}
              </p>
              <div className="text-sable/90 mt-4 space-y-3 text-[0.95rem] leading-relaxed">
                {profil.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-or/15 flex flex-wrap gap-2.5 border-t p-6 sm:px-8">
            <a href={CV_URL} download className="btn btn-or">
              <Download className="h-4 w-4" aria-hidden="true" />
              Télécharger le CV
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn-ghost">
              <WhatsappIcon />
              WhatsApp
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="btn btn-ghost">
              <LinkedinIcon />
              LinkedIn
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener" className="btn btn-ghost">
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>

        <div className="panel classic:lg:mt-0 mt-5 p-6 sm:p-8" data-reveal>
          <h3 className="font-display text-creme text-2xl font-semibold">Gravé dans l’écorce</h3>
          <p className="text-sable/75 mt-1 text-sm">
            Expériences professionnelles, de la plus récente à la plus ancienne.{' '}
            {chiffres.developpeursEncadres} développeurs encadrés, {chiffres.apprenantsFormes}+
            apprenants formés.
          </p>
          <ol className="border-ocre/45 relative mt-7 space-y-8 border-l-2 border-dashed pl-6">
            {experiences.map((e) => (
              <li key={e.id} className="relative" data-reveal>
                <span
                  className={`absolute top-1.5 -left-[33px] h-4 w-4 rotate-45 border-2 ${
                    e.actuel ? 'border-or bg-or' : 'border-ocre bg-nuit'
                  }`}
                  aria-hidden="true"
                />
                <article>
                  <p className="text-or text-sm font-semibold">
                    {e.periode}
                    <span className="text-sable/70 font-normal"> · {e.lieu}</span>
                  </p>
                  <h4 className="text-creme mt-1 text-lg leading-snug font-bold">{e.poste}</h4>
                  <p className="text-sable font-semibold">{e.entreprise}</p>
                  <ul className="text-sable/85 mt-2.5 space-y-1.5 text-sm leading-relaxed">
                    {e.missions.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span
                          className="bg-ocre mt-2 h-1 w-1 shrink-0 rounded-full"
                          aria-hidden="true"
                        />
                        {m}
                      </li>
                    ))}
                  </ul>
                  {e.stack ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {e.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
