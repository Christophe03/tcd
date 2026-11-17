'use client'

import { DoorOpen, FastForward } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { profil } from '@/data/profil'
import { getUi, setUi, useUi } from '@/lib/store'
import { Loader } from './Loader'

/** Durée du fondu lumineux quand la porte s'ouvre sans 3D (ou mouvement réduit). */
const FONDU_SIMPLE_MS = 650

/**
 * Écran d'accueil : la porte. Texte et commandes dans le DOM (accessibles),
 * la porte elle-même est rendue en 3D derrière (DoorScene) ; une porte CSS sert de repli.
 */
export function DoorOverlay() {
  const intro = useUi((s) => s.intro)
  const ready = useUi((s) => s.sceneReady)
  const reduced = useUi((s) => s.reducedMotion)
  const ctaRef = useRef<HTMLButtonElement>(null)

  const terminer = useCallback(() => {
    setUi({ intro: 'done' })
    window.scrollTo(0, 0)
  }, [])

  const ouvrir = useCallback(() => {
    const ui = getUi()
    if (ui.intro !== 'door') return
    setUi({ intro: 'opening' })
    // Avec la scène 3D, c'est DoorScene qui termine l'animation et appelle setUi({ intro: 'done' }).
    if (!ui.sceneReady || ui.reducedMotion) window.setTimeout(terminer, FONDU_SIMPLE_MS)
  }, [terminer])

  useEffect(() => {
    if (intro === 'door') ctaRef.current?.focus({ preventScroll: true })
  }, [intro])

  useEffect(() => {
    if (intro !== 'door') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') terminer()
      const surBouton = (e.target as HTMLElement | null)?.closest('button, a')
      if (!surBouton && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        ouvrir()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [intro, ouvrir, terminer])

  const sortie = intro === 'opening'
  const flashActif = intro === 'opening'

  return (
    <>
      <div
        className="door-overlay fixed inset-0 z-50 flex-col items-center justify-between px-5 pt-[9vh] pb-[7vh] text-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="porte-nom"
        aria-describedby="porte-titre"
      >
        <button
          type="button"
          onClick={terminer}
          className={`btn btn-ghost bg-nuit/50 absolute top-4 right-4 !min-h-10 text-sm backdrop-blur transition-opacity duration-300 ${
            sortie ? 'pointer-events-none opacity-0' : ''
          }`}
        >
          <FastForward className="h-4 w-4" aria-hidden="true" />
          Passer l’intro
        </button>

        <div className={`transition-all duration-500 ${sortie ? '-translate-y-4 opacity-0' : ''}`}>
          <p className="eyebrow">I ni ce · Bienvenue</p>
          <p
            id="porte-nom"
            className="font-display text-creme mt-3 text-[2.1rem] leading-[1.02] font-semibold tracking-tight text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-6xl"
          >
            Toumany dit Christophe <span className="text-or">DIARRA</span>
          </p>
          <p id="porte-titre" className="text-sable mt-3 text-sm font-semibold sm:text-lg">
            {profil.titre}
          </p>
        </div>

        {/* Porte CSS de repli tant que la 3D n'est pas prête */}
        <div
          aria-hidden="true"
          className={`relative h-[38vh] max-h-[340px] w-[24vh] max-w-[214px] transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="bg-or/40 absolute -inset-2 animate-[respire_3.2s_ease-in-out_infinite] rounded-t-[999px] blur-xl" />
          <div className="absolute inset-0 rounded-t-[999px] border-[6px] border-[#2b190e] bg-[repeating-linear-gradient(90deg,#6b4226_0_22%,#5a361f_22%_25%)] shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />
          <div className="absolute top-1/2 right-[18%] h-5 w-5 rounded-full border-[3px] border-[#2a2018]" />
        </div>

        <div
          className={`flex flex-col items-center gap-3 transition-all duration-500 ${sortie ? 'translate-y-4 opacity-0' : ''}`}
        >
          <button
            ref={ctaRef}
            type="button"
            onClick={ouvrir}
            className="btn btn-or group !min-h-12 !px-6 text-base shadow-[0_0_40px_-6px_rgba(231,183,90,0.7)]"
          >
            <DoorOpen
              className="h-5 w-5 transition-transform group-hover:-rotate-6"
              aria-hidden="true"
            />
            Ouvrir la porte
          </button>
          <p className="text-sable/70 text-xs">
            ou appuyez sur{' '}
            <kbd className="border-sable/30 rounded border px-1.5 py-0.5 font-sans">Entrée</kbd>
          </p>
          <Loader inline />
        </div>
      </div>

      {/* Lumière qui inonde l'écran au passage du seuil */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_50%_45%,#fff7e3_0%,#f6dca4_45%,#e7b75a_100%)]"
        style={{
          opacity: flashActif ? 1 : 0,
          transitionProperty: 'opacity',
          transitionTimingFunction: 'ease-in-out',
          transitionDuration: flashActif
            ? ready && !reduced
              ? '700ms'
              : `${FONDU_SIMPLE_MS - 100}ms`
            : '900ms',
          transitionDelay: flashActif && ready && !reduced ? '1500ms' : '0ms',
        }}
      />
    </>
  )
}
