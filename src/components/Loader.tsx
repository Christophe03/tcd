'use client'

import { useUi } from '@/lib/store'

/** Barre de progression discrète pendant la construction de la scène 3D. */
export function Loader({ inline = false }: { inline?: boolean }) {
  const view = useUi((s) => s.view)
  const intro = useUi((s) => s.intro)
  const ready = useUi((s) => s.sceneReady)
  const progress = useUi((s) => s.loadProgress)

  const visible = view === 'immersive' && !ready && (inline ? intro !== 'done' : intro === 'done')
  if (!visible) return null

  const label =
    progress < 50 ? 'Préparation de la graine' : progress < 90 ? 'Le baobab pousse' : 'Presque prêt'

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        inline
          ? 'w-56'
          : 'panel fixed bottom-20 left-1/2 z-40 w-[min(320px,calc(100vw-2rem))] -translate-x-1/2 px-5 py-3 sm:bottom-5'
      }
    >
      <div className="text-sable/85 flex items-center justify-between text-xs font-semibold">
        <span>{label}…</span>
        <span className="tabular-nums">{Math.round(progress)} %</span>
      </div>
      <div
        className="bg-sable/15 mt-2 h-1 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Chargement de la scène 3D"
      >
        <div
          className="from-ocre to-or h-full rounded-full bg-gradient-to-r transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
