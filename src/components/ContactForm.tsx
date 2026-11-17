'use client'

import { Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { EMAIL, WHATSAPP_URL } from '@/data/profil'
import { WhatsappIcon } from './icons'

/**
 * Formulaire sans backend : compose un e-mail (mailto) ou un message WhatsApp.
 * Rien n'est envoyé à un serveur tiers depuis le site.
 */
export function ContactForm() {
  const uid = useId()
  const [erreur, setErreur] = useState<string | null>(null)

  const lire = (form: HTMLFormElement) => {
    const data = new FormData(form)
    const nom = String(data.get('nom') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!nom || !message) {
      setErreur('Merci d’indiquer votre nom et votre message.')
      return null
    }
    setErreur(null)
    return { nom, email, message }
  }

  const envoyerMail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = lire(e.currentTarget)
    if (!v) return
    const sujet = encodeURIComponent(`Contact portfolio — ${v.nom}`)
    const corps = encodeURIComponent(`${v.message}\n\n${v.nom}${v.email ? ` · ${v.email}` : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${sujet}&body=${corps}`
  }

  const envoyerWhatsapp = (form: HTMLFormElement | null) => {
    if (!form) return
    const v = lire(form)
    if (!v) return
    const texte = encodeURIComponent(`Bonjour Christophe, je suis ${v.nom}. ${v.message}`)
    window.open(`${WHATSAPP_URL}?text=${texte}`, '_blank', 'noopener')
  }

  const champ =
    'mt-1.5 w-full rounded-xl border border-encre/20 bg-white/70 px-3.5 py-2.5 text-encre placeholder:text-encre-douce/70 focus:border-sienne focus:outline-none focus-visible:outline-2 focus-visible:outline-sienne'

  return (
    <form onSubmit={envoyerMail} noValidate className="space-y-4" aria-describedby={`${uid}-note`}>
      <div>
        <label htmlFor={`${uid}-nom`} className="text-sm font-bold">
          Nom <span aria-hidden="true">*</span>
        </label>
        <input id={`${uid}-nom`} name="nom" required autoComplete="name" className={champ} />
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className="text-sm font-bold">
          E-mail <span className="text-encre-douce font-normal">(facultatif)</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          className={champ}
        />
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className="text-sm font-bold">
          Votre projet <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          rows={4}
          className={champ}
          placeholder="Une application, un site, une formation…"
        />
      </div>
      {erreur ? (
        <p role="alert" className="text-sm font-semibold text-[#8f2d14]">
          {erreur}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2.5">
        <button type="submit" className="btn btn-encre">
          <Send className="h-4 w-4" aria-hidden="true" />
          Envoyer par e-mail
        </button>
        <button
          type="button"
          className="btn btn-contour-encre"
          onClick={(e) => envoyerWhatsapp(e.currentTarget.form)}
        >
          <WhatsappIcon />
          Via WhatsApp
        </button>
      </div>
      <p id={`${uid}-note`} className="text-encre-douce text-xs">
        Le formulaire ouvre votre messagerie ou WhatsApp avec le message pré-rempli.
      </p>
    </form>
  )
}
