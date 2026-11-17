'use client'

import { WHATSAPP_URL } from '@/data/profil'
import { useUi } from '@/lib/store'
import { WhatsappIcon } from './icons'

const MESSAGE = encodeURIComponent('Bonjour Christophe, je vous contacte depuis votre portfolio.')

/** Bouton flottant : discussion WhatsApp directe, visible partout après l'intro. */
export function WhatsappButton() {
  const intro = useUi((s) => s.intro)
  return (
    <a
      href={`${WHATSAPP_URL}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener"
      aria-label="Me contacter directement sur WhatsApp (nouvel onglet)"
      className={`group fixed right-3 bottom-20 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f8f4e] px-4 text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-[#177a41] sm:right-5 sm:bottom-5 ${
        intro === 'done' ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <WhatsappIcon className="h-6 w-6" />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  )
}
