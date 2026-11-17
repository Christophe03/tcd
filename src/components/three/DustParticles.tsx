'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { rng } from './random'
import { createGlowTexture } from './textures'

/** Poussière dorée / pollen qui monte lentement autour de l'arbre. */
export function DustParticles({
  count,
  yMin = -5,
  yMax = 17,
}: {
  count: number
  yMin?: number
  yMax?: number
}) {
  const ref = useRef<THREE.Points>(null)
  const { geometry, vitesses } = useMemo(() => {
    const r = rng(42)
    const pos = new Float32Array(count * 3)
    const vit = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2
      const d = 1.5 + r() * 9
      pos[i * 3] = Math.cos(a) * d
      pos[i * 3 + 1] = yMin + r() * (yMax - yMin)
      pos[i * 3 + 2] = Math.sin(a) * d
      vit[i] = 0.08 + r() * 0.22
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geometry: g, vitesses: vit }
  }, [count, yMin, yMax])
  const texture = useMemo(() => createGlowTexture(), [])

  useEffect(
    () => () => {
      geometry.dispose()
      texture.dispose()
    },
    [geometry, texture],
  )

  useFrame((state, dt) => {
    const pts = ref.current
    if (!pts) return
    const a = geometry.attributes.position as THREE.BufferAttribute
    const arr = a.array as Float32Array
    const t = state.clock.elapsedTime
    const step = Math.min(dt, 0.05)
    for (let i = 0; i < count; i++) {
      let y = (arr[i * 3 + 1] ?? 0) + (vitesses[i] ?? 0.1) * step
      if (y > yMax) y = yMin
      arr[i * 3 + 1] = y
      arr[i * 3] = (arr[i * 3] ?? 0) + Math.sin(t * 0.5 + i) * 0.002
    }
    a.needsUpdate = true
    pts.rotation.y += step * 0.02
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={texture}
        size={0.13}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#f3d48f"
        opacity={0.85}
      />
    </points>
  )
}
