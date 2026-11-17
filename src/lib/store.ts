'use client'

import { useSyncExternalStore } from 'react'

/**
 * Mini-store global (sans dépendance) pour l'état d'interface partagé entre le DOM et la scène 3D.
 * Les valeurs qui changent à chaque frame (scroll, pointeur) vivent dans `sceneState` (mutable, sans rendu React).
 */

export type ViewMode = 'immersive' | 'classic'
export type IntroPhase = 'door' | 'opening' | 'done'

export const SECTIONS = [
  { id: 'seuil', label: 'Seuil' },
  { id: 'racines', label: 'Racines' },
  { id: 'tronc', label: 'Tronc' },
  { id: 'branches', label: 'Branches' },
  { id: 'feuilles', label: 'Feuilles' },
  { id: 'contact', label: 'Ciel' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

type UiState = {
  view: ViewMode
  /** true quand la vue classique a été choisie automatiquement (appareil modeste, WebGL absent). */
  autoClassic: boolean
  intro: IntroPhase
  /** Projet ouvert dans la modale. */
  projetOuvert: string | null
  section: SectionId
  sceneReady: boolean
  /** Progression du chargement de la scène 3D (0–100). */
  loadProgress: number
  /** Performances insuffisantes détectées pendant le rendu 3D. */
  perfLow: boolean
  reducedMotion: boolean
}

const STORAGE_VIEW = 'baobab:view'
export const STORAGE_ENTERED = 'baobab:entered'

/** État rendu côté serveur (export statique) : contenu visible, sans intro. */
const DEFAULTS: UiState = {
  view: 'immersive',
  autoClassic: false,
  intro: 'done',
  projetOuvert: null,
  section: 'seuil',
  sceneReady: false,
  loadProgress: 0,
  perfLow: false,
  reducedMotion: false,
}

function initialState(): UiState {
  const base = DEFAULTS
  if (typeof document === 'undefined') return base
  const ds = document.documentElement.dataset
  return {
    ...base,
    view: ds.view === 'classic' ? 'classic' : 'immersive',
    autoClassic: ds.auto === '1',
    intro: ds.intro === 'show' ? 'door' : 'done',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}

let state: UiState | null = null
const listeners = new Set<() => void>()

function getState(): UiState {
  if (!state) state = initialState()
  return state
}

const serverState = DEFAULTS

export function setUi(patch: Partial<UiState>) {
  const prev = getState()
  const next = { ...prev, ...patch }
  const changed = (Object.keys(patch) as (keyof UiState)[]).some((k) => prev[k] !== next[k])
  if (!changed) return
  state = next
  if (patch.view) {
    document.documentElement.dataset.view = patch.view
    try {
      localStorage.setItem(STORAGE_VIEW, patch.view)
    } catch {
      /* stockage indisponible : le choix vaut pour la session en cours */
    }
  }
  if (patch.intro) {
    document.documentElement.dataset.intro = patch.intro === 'done' ? 'skip' : 'show'
    if (patch.intro === 'done') {
      try {
        sessionStorage.setItem(STORAGE_ENTERED, '1')
      } catch {
        /* idem */
      }
    }
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useUi<T>(selector: (s: UiState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getState()),
    () => selector(serverState),
  )
}

export const getUi = getState

/** État mutable lu par la scène 3D à chaque frame. */
export const sceneState = {
  /** Position continue dans les sections : 0 = seuil … 5 = ciel. */
  s: 0,
  /** Pointeur normalisé [-1, 1] (souris ou gyroscope). */
  pointer: { x: 0, y: 0 },
  /** Élément survolé / focalisé dans le DOM, ex. « projet:oise ». */
  hover: null as string | null,
  /** Élément le plus proche du centre de l'écran pendant le défilement. */
  centerLink: null as string | null,
  /** Projet survolé dans la scène 3D. */
  hover3d: null as string | null,
}
