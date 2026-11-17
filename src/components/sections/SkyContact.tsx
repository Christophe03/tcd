import { Download, Mail, MapPin } from 'lucide-react'
import {
  CV_URL,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  WHATSAPP_NUMERO_AFFICHE,
  WHATSAPP_URL,
  profil,
} from '@/data/profil'
import { ContactForm } from '../ContactForm'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../icons'
import { SectionHeading } from '../SectionHeading'

/** La cime et le ciel : contact. */
export function SkyContact() {
  const liens = [
    {
      href: `mailto:${EMAIL}`,
      label: EMAIL,
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      ext: false,
    },
    {
      href: WHATSAPP_URL,
      label: `WhatsApp ${WHATSAPP_NUMERO_AFFICHE}`,
      icon: <WhatsappIcon />,
      ext: true,
    },
    { href: LINKEDIN_URL, label: 'LinkedIn', icon: <LinkedinIcon />, ext: true },
    { href: GITHUB_URL, label: 'GitHub · Christophe03', icon: <GithubIcon />, ext: true },
  ]
  return (
    <section
      id="contact"
      aria-labelledby="contact-titre"
      className="story-section px-4 pt-24 pb-10 sm:px-8 lg:min-h-[120svh] lg:px-[6vw] lg:pt-40"
    >
      <div
        className="panel-light classic:mx-auto classic:max-w-3xl max-w-xl p-6 sm:p-9"
        data-reveal
      >
        <SectionHeading
          id="contact-titre"
          eyebrow="La cime"
          titre="Le ciel : parlons de votre projet"
          intro="Une mission, une formation ou un conseil sur l’IA ? Je réponds rapidement, en français ou en bambara."
          tone="light"
        />
        <p className="bg-sauge-fonce text-creme inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold">
          <span className="h-2 w-2 rounded-full bg-[#c9e3a6]" aria-hidden="true" />
          {profil.disponibilite}
        </p>
        <ul className="mt-6 space-y-2.5">
          {liens.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.ext ? { target: '_blank', rel: 'noopener' } : {})}
                className="text-encre hover:text-sienne inline-flex items-center gap-2.5 font-semibold break-all underline-offset-4 hover:underline"
              >
                <span className="bg-encre text-creme flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  {l.icon}
                </span>
                {l.label}
              </a>
            </li>
          ))}
          <li className="text-encre-douce inline-flex items-center gap-2.5">
            <span className="border-encre/25 flex h-8 w-8 items-center justify-center rounded-full border">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            {profil.localisation}
          </li>
        </ul>
        <a href={CV_URL} download className="btn btn-encre mt-6">
          <Download className="h-4 w-4" aria-hidden="true" />
          Télécharger le CV
        </a>
        <p className="text-encre-douce mt-3 text-sm">
          Références professionnelles disponibles dans le CV.
        </p>

        <div className="bg-encre/15 my-8 h-px" />
        <h3 className="font-display text-encre text-2xl font-semibold">Écrire un message</h3>
        <div className="mt-4">
          <ContactForm />
        </div>
      </div>

      <footer className="text-encre classic:mx-auto classic:max-w-3xl mt-10 max-w-xl pb-16 text-sm sm:pb-0">
        <p className="panel-light inline-block px-4 py-2">
          © {new Date().getFullYear()} {profil.nom} · Kati, Mali
        </p>
      </footer>
    </section>
  )
}
