'use client'

import { Sparkles } from '@react-three/drei'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { competences } from '@/data/competences'
import { formations } from '@/data/formations'
import { projets } from '@/data/projets'
import { sceneState, setUi } from '@/lib/store'
import {
  TRUNK_TOP,
  clusterMatrices,
  createCrown,
  createLeafGeometry,
  createRoots,
  createTrunkGeometry,
} from './baobabGeometry'
import { DustParticles } from './DustParticles'
import { createBarkTexture } from './textures'

/* ------------------------------------------------------------------------------------------ */
/* Trajectoire de caméra : une image-clé par section (seuil, racines, tronc, branches,        */
/* feuilles, ciel). ty = hauteur visée, dist = recul, dy = hauteur caméra relative à la cible. */
/* ------------------------------------------------------------------------------------------ */
const CLES = [
  { ty: 5.4, dist: 24, dy: -1.2, fond: '#1b120b' },
  { ty: -2.3, dist: 10.5, dy: -0.3, fond: '#0b0604' },
  { ty: 3.0, dist: 10.5, dy: 0.4, fond: '#24170e' },
  { ty: 7.9, dist: 12.5, dy: 0.6, fond: '#4b3220' },
  { ty: 9.2, dist: 10.5, dy: 1.4, fond: '#8d6236' },
  { ty: 11.5, dist: 18, dy: -3.6, fond: '#e8c48a' },
] as const

const smooth = (t: number) => t * t * (3 - 2 * t)

function cle(s: number) {
  const n = CLES.length - 1
  const c = Math.min(n, Math.max(0, s))
  const i = Math.min(n - 1, Math.floor(c))
  const t = smooth(c - i)
  const a = CLES[i]!
  const b = CLES[i + 1]!
  return {
    ty: THREE.MathUtils.lerp(a.ty, b.ty, t),
    dist: THREE.MathUtils.lerp(a.dist, b.dist, t),
    dy: THREE.MathUtils.lerp(a.dy, b.dy, t),
    i,
    t,
  }
}

const COULEURS_FOND = CLES.map((k) => new THREE.Color(k.fond))

function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, scene, size } = useThree()
  const sLisse = useRef(sceneState.s)
  const fond = useMemo(() => new THREE.Color(), [])
  const cible = useMemo(() => new THREE.Vector3(), [])
  const ptr = useRef({ x: 0, y: 0 })

  useEffect(() => {
    scene.background = fond
    scene.fog = new THREE.Fog(fond, 12, 46)
    return () => {
      scene.fog = null
    }
  }, [scene, fond])

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    // Desktop : l'arbre est décalé à droite pour laisser la colonne de texte à gauche.
    if (size.width / size.height > 1.05 && size.width >= 1024) {
      cam.setViewOffset(size.width, size.height, -size.width * 0.2, 0, size.width, size.height)
    } else {
      cam.clearViewOffset()
    }
    cam.updateProjectionMatrix()
    return () => {
      cam.clearViewOffset()
    }
  }, [camera, size])

  useFrame((_, dt) => {
    const cam = camera as THREE.PerspectiveCamera
    sLisse.current = reduced
      ? sceneState.s
      : THREE.MathUtils.damp(sLisse.current, sceneState.s, 3.2, Math.min(dt, 0.05))
    const k = cle(sLisse.current)
    if (!reduced) {
      ptr.current.x = THREE.MathUtils.damp(ptr.current.x, sceneState.pointer.x, 2.5, dt)
      ptr.current.y = THREE.MathUtils.damp(ptr.current.y, sceneState.pointer.y, 2.5, dt)
    }
    const angle = 0.35 + sLisse.current * 0.42 + ptr.current.x * 0.08
    cible.set(0, k.ty, 0)
    cam.position.set(
      Math.sin(angle) * k.dist,
      k.ty + k.dy + ptr.current.y * 0.35,
      Math.cos(angle) * k.dist,
    )
    cam.lookAt(cible)
    if (cam.fov !== 40) {
      cam.fov = 40
      cam.updateProjectionMatrix()
    }

    const a = COULEURS_FOND[k.i]!
    const b = COULEURS_FOND[k.i + 1]!
    fond.lerpColors(a, b, k.t)
    const fog = scene.fog as THREE.Fog | null
    if (fog) {
      fog.color.copy(fond)
      fog.near = k.dist * 0.85
      fog.far = k.dist * 3.2
    }
  })
  return null
}

/** Analyse « type:id » → id si le type correspond. */
function cibleDe(prefix: string) {
  const v = sceneState.hover ?? sceneState.centerLink
  return v?.startsWith(`${prefix}:`) ? v.slice(prefix.length + 1) : null
}

function Racines({ matBase }: { matBase: THREE.MeshStandardMaterial }) {
  const { racines, radicelles } = useMemo(() => createRoots(formations.length), [])
  const mats = useMemo(
    () =>
      racines.map(() => {
        const m = matBase.clone()
        m.emissive = new THREE.Color('#e7b75a')
        m.emissiveIntensity = 0
        return m
      }),
    [racines, matBase],
  )
  const bouts = useRef<(THREE.Mesh | null)[]>([])

  useEffect(
    () => () => {
      racines.forEach((r) => r.geometry.dispose())
      radicelles.dispose()
      mats.forEach((m) => m.dispose())
    },
    [racines, radicelles, mats],
  )

  useFrame((state, dt) => {
    const actif = cibleDe('formation')
    const t = state.clock.elapsedTime
    formations.forEach((f, i) => {
      const on = f.id === actif
      const m = mats[i]
      if (m)
        m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, on ? 0.55 : 0.04, 5, dt)
      const b = bouts.current[i]
      if (b) {
        const s = on ? 1.6 + Math.sin(t * 4) * 0.2 : 0.8 + Math.sin(t * 1.5 + i) * 0.1
        b.scale.setScalar(THREE.MathUtils.damp(b.scale.x, s, 6, dt))
      }
    })
  })

  return (
    <group>
      {racines.map((r, i) => (
        <group key={i}>
          <mesh geometry={r.geometry} material={mats[i]} />
          <mesh
            ref={(el) => {
              bouts.current[i] = el
            }}
            position={r.tip}
          >
            <icosahedronGeometry args={[0.13, 1]} />
            <meshBasicMaterial color="#f3d48f" toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh geometry={radicelles} material={matBase} />
    </group>
  )
}

function Couronne({
  matBranche,
  reduced,
}: {
  matBranche: THREE.MeshStandardMaterial
  reduced: boolean
}) {
  const arbre = useMemo(() => createCrown(competences.length), [])
  const feuille = useMemo(() => createLeafGeometry(), [])

  // Matériaux de branche par catégorie (mise en avant)
  const matsBranches = useMemo(
    () =>
      arbre.branches.map(() => {
        const m = matBranche.clone()
        m.emissive = new THREE.Color('#cf8a3e')
        m.emissiveIntensity = 0
        return m
      }),
    [arbre, matBranche],
  )

  // Nœuds de compétences le long des branches
  const noeuds = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0)
    return competences.map((cat, bi) => {
      const b = arbre.branches[bi]!
      return cat.competences.map((_, k) => {
        const n = cat.competences.length
        const t = 0.18 + 0.74 * ((k + 0.5) / n)
        const p = b.curve.getPointAt(t)
        const T = b.curve.getTangentAt(t)
        const N = new THREE.Vector3().crossVectors(T, up).normalize()
        const B = new THREE.Vector3().crossVectors(N, T).normalize()
        const th = k * 2.2
        const r = THREE.MathUtils.lerp(b.r0, b.r1, Math.pow(t, 0.75)) + 0.05
        return p.add(N.multiplyScalar(Math.cos(th) * r)).add(B.multiplyScalar(Math.sin(th) * r))
      })
    })
  }, [arbre])
  const matsNoeuds = useMemo(
    () =>
      competences.map(() => new THREE.MeshBasicMaterial({ color: '#e7b75a', toneMapped: false })),
    [],
  )
  const noeudsRefs = useRef<(THREE.Group | null)[]>([])

  // Répartition des projets sur les pointes : d'abord les pointes principales, puis les rameaux.
  const { pointesProjets, pointesDeco } = useMemo(() => {
    const triees = [...arbre.pointes].sort((a, b) => Number(b.principale) - Number(a.principale))
    return {
      pointesProjets: triees.slice(0, projets.length),
      pointesDeco: triees.slice(projets.length),
    }
  }, [arbre])

  const matFeuilleDeco = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6f7f4f',
        roughness: 0.85,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    [],
  )
  const decoRef = useRef<THREE.InstancedMesh>(null)
  const FEUILLES_DECO = 22
  useEffect(() => {
    const mesh = decoRef.current
    if (!mesh) return
    const tmp = new THREE.Matrix4()
    let idx = 0
    pointesDeco.forEach((p, pi) => {
      const offset = new THREE.Matrix4().makeTranslation(p.position.x, p.position.y, p.position.z)
      clusterMatrices(FEUILLES_DECO, 0.55, 100 + pi).forEach((m) => {
        mesh.setMatrixAt(idx++, tmp.multiplyMatrices(offset, m))
      })
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [pointesDeco])

  useEffect(
    () => () => {
      arbre.branches.forEach((b) => b.geometry.dispose())
      arbre.rameaux.dispose()
      feuille.dispose()
      matsBranches.forEach((m) => m.dispose())
      matsNoeuds.forEach((m) => m.dispose())
      matFeuilleDeco.dispose()
    },
    [arbre, feuille, matsBranches, matsNoeuds, matFeuilleDeco],
  )

  useFrame((state, dt) => {
    const actif = cibleDe('competence')
    const t = state.clock.elapsedTime
    competences.forEach((c, i) => {
      const on = c.id === actif
      const m = matsBranches[i]
      if (m) m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, on ? 0.45 : 0, 5, dt)
      const g = noeudsRefs.current[i]
      if (g) {
        const s = on ? 1.7 + Math.sin(t * 5) * 0.15 : 1
        g.children.forEach((child) =>
          child.scale.setScalar(THREE.MathUtils.damp(child.scale.x, s, 6, dt)),
        )
      }
      const mn = matsNoeuds[i]
      if (mn) mn.color.set(on ? '#fff1c9' : '#e7b75a')
    })
    if (decoRef.current && !reduced) decoRef.current.rotation.y = Math.sin(t * 0.25) * 0.012
  })

  return (
    <group>
      {arbre.branches.map((b, i) => (
        <mesh key={i} geometry={b.geometry} material={matsBranches[i]} />
      ))}
      <mesh geometry={arbre.rameaux} material={matBranche} />

      {noeuds.map((liste, i) => (
        <group
          key={i}
          ref={(el) => {
            noeudsRefs.current[i] = el
          }}
        >
          {liste.map((p, k) => (
            <mesh key={k} position={p} material={matsNoeuds[i]}>
              <octahedronGeometry args={[0.075, 0]} />
            </mesh>
          ))}
        </group>
      ))}

      <instancedMesh
        ref={decoRef}
        args={[feuille, matFeuilleDeco, pointesDeco.length * FEUILLES_DECO]}
        frustumCulled={false}
      />

      {pointesProjets.map((p, i) => {
        const projet = projets[i]
        return projet ? (
          <GrappeProjet
            key={projet.id}
            id={projet.id}
            position={p.position}
            feuille={feuille}
            index={i}
            reduced={reduced}
          />
        ) : null
      })}
    </group>
  )
}

/** Grappe de feuilles d'un projet : survol = agrandissement + vent, clic = fiche projet. */
function GrappeProjet({
  id,
  position,
  feuille,
  index,
  reduced,
}: {
  id: string
  position: THREE.Vector3
  feuille: THREE.BufferGeometry
  index: number
  reduced: boolean
}) {
  const groupe = useRef<THREE.Group>(null)
  const inst = useRef<THREE.InstancedMesh>(null)
  const fruit = useRef<THREE.Mesh>(null)
  const N = 30
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9caf83',
        emissive: new THREE.Color('#e7b75a'),
        emissiveIntensity: 0.08,
        roughness: 0.75,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    [],
  )
  const matFruit = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a36a',
        emissive: new THREE.Color('#e7b75a'),
        emissiveIntensity: 0.25,
        roughness: 0.9,
      }),
    [],
  )
  useEffect(() => {
    const m = inst.current
    if (!m) return
    clusterMatrices(N, 0.72, 500 + index).forEach((mx, i) => m.setMatrixAt(i, mx))
    m.instanceMatrix.needsUpdate = true
    m.computeBoundingSphere()
  }, [index])
  useEffect(
    () => () => {
      mat.dispose()
      matFruit.dispose()
    },
    [mat, matFruit],
  )

  useFrame((state, dt) => {
    const g = groupe.current
    if (!g) return
    const t = state.clock.elapsedTime
    const on = sceneState.hover3d === id || cibleDe('projet') === id
    const cibleS = on ? 1.3 : 1
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, cibleS, 6, dt))
    if (!reduced) {
      const amp = on ? 0.14 : 0.05
      g.rotation.z = Math.sin(t * 1.3 + index) * amp
      g.rotation.x = Math.cos(t * 1.05 + index * 0.7) * amp * 0.7
    }
    mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, on ? 0.5 : 0.08, 6, dt)
    matFruit.emissiveIntensity = on ? 1.1 : 0.25 + Math.sin(t * 2 + index) * 0.12
    if (fruit.current && !reduced) fruit.current.rotation.z = Math.sin(t * 1.6 + index) * 0.18
  })

  const survol = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    sceneState.hover3d = id
    document.body.style.cursor = 'pointer'
  }
  const sortie = () => {
    if (sceneState.hover3d === id) sceneState.hover3d = null
    document.body.style.cursor = ''
  }

  return (
    <group ref={groupe} position={position}>
      <instancedMesh ref={inst} args={[feuille, mat, N]} />
      {/* Fruit du baobab (pain de singe) suspendu : repère cliquable */}
      <group ref={fruit} position={[0, -0.05, 0]}>
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.5, 4]} />
          <meshStandardMaterial color="#4a3020" />
        </mesh>
        <mesh position={[0, -0.62, 0]} material={matFruit}>
          <capsuleGeometry args={[0.085, 0.24, 4, 10]} />
        </mesh>
      </group>
      {/* Zone de clic invisible */}
      <mesh
        onPointerOver={survol}
        onPointerOut={sortie}
        onClick={(e) => {
          e.stopPropagation()
          setUi({ projetOuvert: id })
        }}
      >
        <sphereGeometry args={[0.95, 12, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
    </group>
  )
}

/** Sol : visible du dessus, et voile de terre vu du dessous (quand la caméra passe sous terre). */
function Sol() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <circleGeometry args={[60, 48]} />
        <meshStandardMaterial color="#3a2618" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02}>
        <circleGeometry args={[60, 48]} />
        <meshBasicMaterial color="#1a0f08" side={THREE.BackSide} transparent opacity={0.9} />
      </mesh>
      {/* Ombre douce sous l'arbre (sans ombres temps réel) */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.01}>
        <circleGeometry args={[4.2, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function BaobabScene({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ecorce = useMemo(() => {
    const t = createBarkTexture()
    t.repeat.set(3, 1)
    return t
  }, [])
  const matTronc = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c2aa98',
        map: ecorce,
        roughness: 0.92,
        flatShading: true,
      }),
    [ecorce],
  )
  const matBranche = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#9a7d68', roughness: 0.95, flatShading: true }),
    [],
  )
  const matRacine = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#7a5038', roughness: 1, flatShading: true }),
    [],
  )
  const tronc = useMemo(() => createTrunkGeometry(), [])

  useEffect(
    () => () => {
      ecorce.dispose()
      matTronc.dispose()
      matBranche.dispose()
      matRacine.dispose()
      tronc.dispose()
    },
    [ecorce, matTronc, matBranche, matRacine, tronc],
  )

  return (
    <>
      <CameraRig reduced={reduced} />
      <hemisphereLight args={['#ffe2b0', '#2a1a10', 1.1]} />
      <directionalLight position={[6, 14, 8]} intensity={2.1} color="#ffd59a" />
      <directionalLight position={[-8, 4, -6]} intensity={0.5} color="#9caf83" />
      <pointLight position={[0, -2.5, 3]} intensity={6} distance={9} color="#e7a050" />

      <Sol />
      <mesh geometry={tronc} material={matTronc} />
      <Racines matBase={matRacine} />
      <Couronne matBranche={matBranche} reduced={reduced} />

      {!reduced ? (
        <>
          <DustParticles count={mobile ? 140 : 320} />
          <Sparkles
            count={mobile ? 18 : 40}
            scale={[9, 4, 9]}
            position={[0, TRUNK_TOP + 3, 0]}
            size={4}
            speed={0.35}
            color="#f3d48f"
            opacity={0.9}
          />
        </>
      ) : null}
    </>
  )
}
