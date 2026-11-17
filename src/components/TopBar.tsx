'use client'

import { Box, Download, Layers } from 'lucide-react'
import { CV_URL } from '@/data/profil'
import { setUi, useUi } from '@/lib/store'

/** Barre supérieure : monogramme, bascule de vue, CV. */
export function TopBar() {
  const view = useUi((s) => s.view)
  const intro = useUi((s) => s.intro)
  const classique = view === 'classic'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-3 py-3 transition-opacity duration-500 sm:px-6 ${
        intro === 'done' ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <a
        href="#seuil"
        className="panel font-display text-creme flex h-11 items-center gap-2 !rounded-full px-4 text-lg font-semibold"
        aria-label="Toumany dit Christophe Diarra — retour en haut"
      >
        <span className="text-or">TCD</span>
        <span className="text-sable/80 hidden text-sm font-normal md:inline">Le Baobab</span>
      </a>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setUi({ view: classique ? 'immersive' : 'classic', autoClassic: false })}
          className="panel btn text-creme hover:text-or-clair !rounded-full !px-4 text-sm"
          aria-pressed={classique}
        >
          {classique ? (
            <Box className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Layers className="h-4 w-4" aria-hidden="true" />
          )}
          {classique ? 'Vue immersive' : 'Vue classique'}
        </button>
        <a
          href={CV_URL}
          download
          className="btn btn-or hidden !rounded-full text-sm sm:inline-flex"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          CV
        </a>
      </div>
    </header>
  )
}
