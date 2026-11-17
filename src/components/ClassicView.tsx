'use client'

import { X } from 'lucide-react'
import { setUi, useUi } from '@/lib/store'

/**
 * Vue classique : version 2D légère de toutes les sections (même contenu, sans WebGL).
 * La mise en page est pilotée par html[data-view="classic"] (voir globals.css) ;
 * ce composant ajoute l'avis de bascule automatique et la suggestion en cas de lenteur.
 */
export function ClassicView() {
  const view = useUi((s) => s.view)
  const auto = useUi((s) => s.autoClassic)
  const perfLow = useUi((s) => s.perfLow)
  const intro = useUi((s) => s.intro)

  if (intro !== 'done') return null

  if (view === 'classic' && auto) {
    return (
      <Avis
        texte="Vue classique activée automatiquement pour préserver votre appareil."
        action="Essayer la vue immersive"
        onAction={() => setUi({ view: 'immersive', autoClassic: false })}
        onFermer={() => setUi({ autoClassic: false })}
      />
    )
  }
  if (view === 'immersive' && perfLow) {
    return (
      <Avis
        texte="L’animation semble lente sur cet appareil."
        action="Passer en vue classique"
        onAction={() => setUi({ view: 'classic', perfLow: false })}
        onFermer={() => setUi({ perfLow: false })}
      />
    )
  }
  return null
}

function Avis(props: {
  texte: string
  action: string
  onAction: () => void
  onFermer: () => void
}) {
  return (
    <div
      role="status"
      className="panel text-sable fixed bottom-36 left-1/2 z-40 flex w-[min(520px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-3 p-3 pl-5 text-sm sm:bottom-4"
    >
      <p className="flex-1">{props.texte}</p>
      <button type="button" onClick={props.onAction} className="btn btn-or !min-h-10 !px-3 text-xs">
        {props.action}
      </button>
      <button
        type="button"
        onClick={props.onFermer}
        aria-label="Fermer l’avis"
        className="text-sable hover:text-creme inline-flex h-10 w-10 items-center justify-center rounded-full"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
