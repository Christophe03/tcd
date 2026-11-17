'use client'

import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { getUi, setUi, useUi } from '@/lib/store'
import { BaobabScene } from './BaobabScene'
import { DoorScene } from './DoorScene'

/** Signale la première image rendue (fin du chargement). */
function PremiereImage() {
  const fait = useRef(false)
  useFrame(() => {
    if (fait.current) return
    fait.current = true
    setUi({ sceneReady: true, loadProgress: 100 })
  })
  return null
}

/** Canvas WebGL unique : la porte pendant l'intro, puis le baobab. */
export default function Experience3D() {
  const intro = useUi((s) => s.intro)
  const reduced = useUi((s) => s.reducedMotion)
  const [mobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px), (pointer: coarse)').matches,
  )
  const [dpr, setDpr] = useState(mobile ? 1.25 : 1.5)

  useEffect(() => {
    setUi({ loadProgress: Math.max(getUi().loadProgress, 55) })
    return () => setUi({ sceneReady: false, loadProgress: 0 })
  }, [])

  return (
    <div className="scene-layer bg-nuit" aria-hidden="true">
      <Canvas
        dpr={[1, dpr]}
        camera={{ fov: 40, near: 0.1, far: 140, position: [0, 1.9, 10.4] }}
        gl={{ antialias: !mobile, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
          setUi({ loadProgress: Math.max(getUi().loadProgress, 80) })
        }}
      >
        <PerformanceMonitor
          flipflops={3}
          onDecline={() => setDpr(1)}
          onFallback={() => setUi({ perfLow: true })}
        />
        <AdaptiveDpr pixelated={false} />
        {intro === 'done' ? (
          <BaobabScene reduced={reduced} mobile={mobile} />
        ) : (
          <DoorScene reduced={reduced} />
        )}
        <PremiereImage />
      </Canvas>
    </div>
  )
}
