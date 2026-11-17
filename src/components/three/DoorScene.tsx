'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { sceneState, setUi, useUi } from '@/lib/store'
import { rng } from './random'
import { createDoorTexture, createMudTexture } from './textures'

/** Dimensions de l'ouverture et du vantail (l'écart laisse filtrer la lumière). */
const OUV_L = 2.3
const OUV_H = 3.7
const PORTE_L = 2.2
const PORTE_H = 3.62
const CAM = new THREE.Vector3(0, 1.9, 10.4)
const VISEE = new THREE.Vector3(0, 2.25, 0)

/**
 * La porte : mur de banco sahélien avec torons, porte en bois sculpté,
 * lumière qui respire derrière les interstices. À l'ouverture : le vantail pivote,
 * la lumière s'intensifie et la caméra franchit le seuil.
 */
export function DoorScene({ reduced }: { reduced: boolean }) {
  const { camera, scene } = useThree()
  const intro = useUi((s) => s.intro)
  const vantail = useRef<THREE.Group>(null)
  const lueur = useRef<THREE.MeshBasicMaterial>(null)
  const lumiere = useRef<THREE.PointLight>(null)
  const anim = useRef({ ouverture: 0, lumiere: 0, avance: 0, enCours: false })

  const textures = useMemo(() => {
    const bois = createDoorTexture()
    const banco = createMudTexture()
    banco.repeat.set(4, 2)
    const sol = createMudTexture()
    sol.repeat.set(10, 10)
    return { bois, banco, sol }
  }, [])

  const torons = useMemo(() => {
    const r = rng(9)
    const pts: [number, number][] = []
    for (const y of [2.3, 4.6])
      for (const x of [-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]) pts.push([x + (r() - 0.5) * 0.2, y])
    for (const x of [-1.4, -0.45, 0.45, 1.4]) pts.push([x, 5.2])
    return pts
  }, [])

  const clous = useMemo(() => {
    const pts: [number, number][] = []
    for (const x of [0.25, 1.1, 1.95]) for (let k = 0; k < 9; k++) pts.push([x, 0.3 + k * 0.38])
    return pts
  }, [])

  const etoiles = useMemo(() => {
    const r = rng(77)
    const n = 260
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (r() - 0.5) * 60
      pos[i * 3 + 1] = 7 + r() * 22
      pos[i * 3 + 2] = -18 - r() * 10
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useEffect(() => {
    scene.background = new THREE.Color('#0f0a07')
    scene.fog = new THREE.Fog('#0f0a07', 14, 40)
    camera.position.copy(CAM)
    camera.lookAt(VISEE)
    return () => {
      Object.values(textures).forEach((t) => t.dispose())
      etoiles.dispose()
      scene.fog = null
    }
  }, [scene, camera, textures, etoiles])

  // Ouverture : timeline GSAP sur un objet de progression lu à chaque frame.
  useEffect(() => {
    if (intro !== 'opening' || anim.current.enCours) return
    if (reduced) return // le fondu DOM simple s'en charge
    anim.current.enCours = true
    let tl: { kill: () => void } | null = null
    let annule = false
    import('gsap').then(({ gsap }) => {
      if (annule) return
      tl = gsap
        .timeline({ onComplete: () => setUi({ intro: 'done' }) })
        .to(anim.current, { ouverture: 1, duration: 1.35, ease: 'power2.inOut' }, 0)
        .to(anim.current, { lumiere: 1, duration: 1.2, ease: 'power1.in' }, 0.2)
        .to(anim.current, { avance: 1, duration: 1.7, ease: 'power2.in' }, 0.55)
    })
    return () => {
      annule = true
      tl?.kill()
    }
  }, [intro, reduced])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const a = anim.current
    const cam = camera as THREE.PerspectiveCamera

    // Respiration de la lumière derrière la porte
    const souffle = 0.5 + 0.5 * Math.sin(t * 1.6)
    if (lueur.current) {
      const k = 1.4 + souffle * 0.9 + a.lumiere * 6
      lueur.current.color.setRGB(1 * k, 0.78 * k, 0.45 * k)
    }
    if (lumiere.current) lumiere.current.intensity = 2.5 + souffle * 2 + a.lumiere * 30

    if (vantail.current) vantail.current.rotation.y = a.ouverture * 1.9

    // Parallaxe (souris / gyroscope) puis traversée du seuil
    const px = reduced ? 0 : sceneState.pointer.x
    const py = reduced ? 0 : sceneState.pointer.y
    const base = new THREE.Vector3(CAM.x + px * 0.9, CAM.y + py * 0.45, CAM.z)
    const traverse = new THREE.Vector3(0, 1.85, -2.5)
    const cible = base.lerp(traverse, a.avance)
    cam.position.x = THREE.MathUtils.damp(cam.position.x, cible.x, a.avance > 0 ? 12 : 3, dt)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, cible.y, a.avance > 0 ? 12 : 3, dt)
    cam.position.z = cible.z
    cam.lookAt(VISEE.x, VISEE.y, VISEE.z - a.avance * 4)
    const fov = 40 + a.avance * 18
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov
      cam.updateProjectionMatrix()
    }
  })

  const cote = 6.5 - OUV_L / 2
  return (
    <>
      <hemisphereLight args={['#7d8db5', '#2a1a10', 1.25]} />
      <directionalLight position={[-6, 9, 7]} intensity={1.3} color="#b4c4e4" />
      <spotLight
        position={[0, 6.5, 5]}
        angle={0.5}
        penumbra={0.8}
        intensity={22}
        distance={16}
        color="#ffc98a"
      />
      <pointLight
        ref={lumiere}
        position={[0, 0.25, 1.1]}
        distance={6}
        decay={1.6}
        color="#ffb35c"
      />

      {/* Ciel nocturne */}
      <points geometry={etoiles}>
        <pointsMaterial size={0.09} color="#f6eddc" sizeAttenuation transparent opacity={0.8} />
      </points>

      {/* Sol */}
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial map={textures.sol} color="#6a4a35" roughness={1} />
      </mesh>

      {/* Mur de banco autour de l'ouverture */}
      <group position={[0, 0, 0]}>
        <mesh position={[-(OUV_L / 2 + cote / 2), 3.5, 0]}>
          <boxGeometry args={[cote, 7, 0.7]} />
          <meshStandardMaterial map={textures.banco} color="#e9c39c" roughness={1} />
        </mesh>
        <mesh position={[OUV_L / 2 + cote / 2, 3.5, 0]}>
          <boxGeometry args={[cote, 7, 0.7]} />
          <meshStandardMaterial map={textures.banco} color="#e9c39c" roughness={1} />
        </mesh>
        <mesh position={[0, OUV_H + (7 - OUV_H) / 2, 0]}>
          <boxGeometry args={[OUV_L, 7 - OUV_H, 0.7]} />
          <meshStandardMaterial map={textures.banco} color="#e9c39c" roughness={1} />
        </mesh>
        {/* Créneaux du sommet */}
        {[-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6].map((x) => (
          <mesh key={x} position={[x, 7.35, 0]}>
            <coneGeometry args={[0.38, 0.9, 4]} />
            <meshStandardMaterial map={textures.banco} color="#e9c39c" roughness={1} flatShading />
          </mesh>
        ))}
        {/* Torons (pieux de palmier) */}
        {torons.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.55]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.06, 0.07, 0.6, 6]} />
            <meshStandardMaterial color="#4a3020" roughness={1} />
          </mesh>
        ))}
        {/* Encadrement : linteau et montants */}
        <mesh position={[0, OUV_H + 0.15, 0.42]}>
          <boxGeometry args={[OUV_L + 0.7, 0.32, 0.3]} />
          <meshStandardMaterial color="#3a2414" roughness={0.9} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (OUV_L / 2 + 0.12), OUV_H / 2, 0.4]}>
            <boxGeometry args={[0.24, OUV_H, 0.26]} />
            <meshStandardMaterial color="#3a2414" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Lumière derrière la porte */}
      <mesh position={[0, OUV_H / 2, -0.3]}>
        <planeGeometry args={[OUV_L + 0.1, OUV_H + 0.05]} />
        <meshBasicMaterial ref={lueur} toneMapped={false} />
      </mesh>
      <mesh position={[0, 4, -12]}>
        <planeGeometry args={[40, 20]} />
        <meshBasicMaterial color="#ffd89a" toneMapped={false} />
      </mesh>

      {/* Vantail : pivote sur la charnière gauche */}
      <group ref={vantail} position={[-PORTE_L / 2, 0, 0.05]}>
        <mesh position={[PORTE_L / 2, PORTE_H / 2 + 0.02, 0]}>
          <boxGeometry args={[PORTE_L, PORTE_H, 0.12]} />
          <meshStandardMaterial
            map={textures.bois}
            bumpMap={textures.bois}
            bumpScale={2.2}
            roughness={0.85}
            color="#d9b28c"
          />
        </mesh>
        {clous.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.075]}>
            <sphereGeometry args={[0.03, 6, 4]} />
            <meshStandardMaterial color="#2a2018" metalness={0.6} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[PORTE_L - 0.32, 1.8, 0.1]}>
          <torusGeometry args={[0.1, 0.018, 6, 18]} />
          <meshStandardMaterial color="#1e1a16" metalness={0.8} roughness={0.35} />
        </mesh>
      </group>
    </>
  )
}
