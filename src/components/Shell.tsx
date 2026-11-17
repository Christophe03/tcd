'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SECTIONS, getUi, sceneState, setUi, useUi } from '@/lib/store'
import { ClassicView } from './ClassicView'
import { DoorOverlay } from './DoorOverlay'
import { Loader } from './Loader'
import { TopBar } from './TopBar'
import { TreeNav } from './TreeNav'

/** Scène WebGL chargée à la demande, jamais côté serveur. */
const Experience3D = dynamic(() => import('./three/Experience3D'), { ssr: false })

/**
 * Orchestration côté client : défilement fluide (Lenis + GSAP ScrollTrigger), progression dans l'arbre,
 * liens survol DOM ↔ scène 3D, apparition des cartes et bascule immersive / classique.
 */
export function Shell({ children }: { children: ReactNode }) {
  const view = useUi((s) => s.view)
  const intro = useUi((s) => s.intro)
  const reduced = useUi((s) => s.reducedMotion)
  const projetOuvert = useUi((s) => s.projetOuvert)
  const mainRef = useRef<HTMLElement>(null)
  const lenisRef = useRef<{ stop: () => void; start: () => void } | null>(null)

  // La scène 3D n'est chargée qu'une fois le contenu affiché et le thread principal libre (LCP, TBT).
  const [charger3d, setCharger3d] = useState(false)
  useEffect(() => {
    setUi({ loadProgress: Math.max(getUi().loadProgress, 15) })
    const go = () => setCharger3d(true)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(go, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(go, 300)
    return () => window.clearTimeout(t)
  }, [])

  // Contenu inaccessible pendant l'intro (la porte est un dialogue modal).
  useEffect(() => {
    const main = mainRef.current
    if (main) main.inert = intro !== 'done'
    if (intro === 'done') lenisRef.current?.start()
    else lenisRef.current?.stop()
  }, [intro])

  useEffect(() => {
    if (projetOuvert) lenisRef.current?.stop()
    else if (getUi().intro === 'done') lenisRef.current?.start()
  }, [projetOuvert])

  // Défilement : Lenis + ScrollTrigger + calcul de la position dans l'arbre.
  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (disposed) return
      gsap.registerPlugin(ScrollTrigger)

      let lenis: import('lenis').default | null = null
      let tick: ((time: number) => void) | null = null
      if (!reduced) {
        const { default: Lenis } = await import('lenis')
        if (disposed) return
        lenis = new Lenis({ autoRaf: false, lerp: 0.11, anchors: true })
        lenis.on('scroll', ScrollTrigger.update)
        tick = (time: number) => lenis?.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        lenisRef.current = lenis
        if (getUi().intro !== 'done' || getUi().projetOuvert) lenis.stop()
      }

      // --- Position continue dans les sections -----------------------------------------
      let centres: number[] = []
      let liens: { id: string; y: number }[] = []
      const mesurer = () => {
        centres = SECTIONS.map((s) => {
          const el = document.getElementById(s.id)
          if (!el) return 0
          const r = el.getBoundingClientRect()
          return r.top + window.scrollY + r.height / 2
        })
        liens = Array.from(document.querySelectorAll<HTMLElement>('[data-link]')).map((el) => {
          const r = el.getBoundingClientRect()
          return { id: el.dataset.link ?? '', y: r.top + window.scrollY + r.height / 2 }
        })
        surDefilement()
      }
      const surDefilement = () => {
        const vh = window.innerHeight
        const y = window.scrollY + vh / 2
        const max = document.documentElement.scrollHeight - vh
        let s = 0
        const n = centres.length
        if (window.scrollY >= max - 2) s = n - 1
        else if (y <= (centres[0] ?? 0)) s = 0
        else {
          s = n - 1
          for (let i = 0; i < n - 1; i++) {
            const a = centres[i] ?? 0
            const b = centres[i + 1] ?? 0
            if (y >= a && y < b) {
              s = i + (y - a) / Math.max(1, b - a)
              break
            }
          }
        }
        sceneState.s = s
        const idx = Math.min(n - 1, Math.max(0, Math.round(s)))
        const section = SECTIONS[idx]?.id
        if (section && section !== getUi().section) setUi({ section })

        let meilleur: string | null = null
        let dist = vh * 0.3
        for (const l of liens) {
          const d = Math.abs(l.y - y)
          if (d < dist) {
            dist = d
            meilleur = l.id
          }
        }
        sceneState.centerLink = meilleur
      }

      const onScroll = () => surDefilement()
      window.addEventListener('scroll', onScroll, { passive: true })
      const ro = new ResizeObserver(() => {
        mesurer()
        ScrollTrigger.refresh()
      })
      ro.observe(document.body)
      document.fonts?.ready.then(() => !disposed && mesurer())
      mesurer()

      // --- Apparition des cartes --------------------------------------------------------
      if (!reduced) {
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 92%',
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.07,
                ease: 'power3.out',
                overwrite: true,
              },
            ),
        })
      }

      cleanup = () => {
        window.removeEventListener('scroll', onScroll)
        ro.disconnect()
        ScrollTrigger.getAll().forEach((t) => t.kill())
        if (tick) gsap.ticker.remove(tick)
        lenis?.destroy()
        lenisRef.current = null
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [reduced, view])

  // Survol / focus DOM → mise en avant dans la scène 3D. Pointeur → parallaxe.
  useEffect(() => {
    const lien = (e: Event) =>
      (e.target as HTMLElement | null)?.closest?.<HTMLElement>('[data-link]')?.dataset.link ?? null
    const over = (e: Event) => {
      sceneState.hover = lien(e)
    }
    const out = (e: PointerEvent | FocusEvent) => {
      const vers = (e.relatedTarget as HTMLElement | null)?.closest?.<HTMLElement>('[data-link]')
      sceneState.hover = vers?.dataset.link ?? null
    }
    const move = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const gyro = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      sceneState.pointer.x = Math.max(-1, Math.min(1, e.gamma / 30))
      sceneState.pointer.y = Math.max(-1, Math.min(1, (45 - e.beta) / 30))
    }
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    document.addEventListener('focusin', over)
    document.addEventListener('focusout', out)
    window.addEventListener('pointermove', move, { passive: true })
    if (!reduced) window.addEventListener('deviceorientation', gyro)
    return () => {
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('focusin', over)
      document.removeEventListener('focusout', out)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('deviceorientation', gyro)
    }
  }, [reduced])

  return (
    <>
      {view === 'immersive' && charger3d ? <Experience3D /> : null}
      <a
        href="#seuil"
        className="bg-or text-encre sr-only z-[70] rounded-full px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <TopBar />
      <TreeNav />
      <main ref={mainRef} className="relative z-10">
        {children}
      </main>
      <ClassicView />
      <Loader />
      <DoorOverlay />
    </>
  )
}
