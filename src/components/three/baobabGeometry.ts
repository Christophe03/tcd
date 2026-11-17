import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { rng } from './random'

/**
 * Baobab procédural : tronc en bouteille (LatheGeometry plissée), branches fines en « racines retournées »
 * (TubeGeometry effilées), racines souterraines, feuilles palmées instanciées.
 * Tout est déterministe et dépend uniquement du nombre d'éléments à représenter.
 */

export const TRUNK_TOP = 6.3

/** Tube dont le rayon décroît de r0 à r1 le long de la courbe. */
export function taperedTube(
  curve: THREE.Curve<THREE.Vector3>,
  r0: number,
  r1: number,
  tubular = 20,
  radial = 7,
) {
  const geo = new THREE.TubeGeometry(curve, tubular, 1, radial, false)
  const pos = geo.attributes.position as THREE.BufferAttribute
  const c = new THREE.Vector3()
  const v = new THREE.Vector3()
  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular
    curve.getPointAt(t, c)
    const r = THREE.MathUtils.lerp(r0, r1, Math.pow(t, 0.75))
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j
      v.fromBufferAttribute(pos, k).sub(c).multiplyScalar(r).add(c)
      pos.setXYZ(k, v.x, v.y, v.z)
    }
  }
  geo.computeVertexNormals()
  return geo
}

export function createTrunkGeometry() {
  // Silhouette en bouteille : base large, ventre renflé, rétrécissement brusque sous la couronne.
  const profil: [number, number][] = [
    [0.0, -0.5],
    [1.95, -0.5],
    [2.1, 0.0],
    [2.2, 0.9],
    [2.28, 2.0],
    [2.22, 3.1],
    [2.0, 4.0],
    [1.62, 4.75],
    [1.18, 5.35],
    [0.9, 5.85],
    [0.78, 6.3],
    [0.45, 6.6],
    [0.0, 6.7],
  ]
  const geo = new THREE.LatheGeometry(
    profil.map(([x, y]) => new THREE.Vector2(x, y)),
    36,
  )
  const pos = geo.attributes.position as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const r = Math.hypot(v.x, v.z)
    if (r < 1e-4) continue
    const a = Math.atan2(v.z, v.x)
    // Plis verticaux caractéristiques de l'écorce du baobab
    const f =
      1 +
      0.07 * Math.sin(a * 7 + v.y * 0.45) +
      0.035 * Math.sin(a * 13 - v.y * 1.1) +
      0.025 * Math.sin(v.y * 2.7 + a * 3)
    pos.setXYZ(i, v.x * f, v.y, v.z * f)
  }
  geo.computeVertexNormals()
  return geo
}

export type Branche = {
  geometry: THREE.BufferGeometry
  curve: THREE.CatmullRomCurve3
  r0: number
  r1: number
}

export type Pointe = { position: THREE.Vector3; branche: number; principale: boolean }

export type Arbre = {
  branches: Branche[]
  rameaux: THREE.BufferGeometry
  pointes: Pointe[]
}

/** Construit les branches principales (une par catégorie) et leurs rameaux. */
export function createCrown(nBranches: number, seed = 21): Arbre {
  const r = rng(seed)
  const branches: Branche[] = []
  const rameauxGeos: THREE.BufferGeometry[] = []
  const pointes: Pointe[] = []
  const up = new THREE.Vector3(0, 1, 0)

  for (let i = 0; i < nBranches; i++) {
    const phi = (i / nBranches) * Math.PI * 2 + (r() - 0.5) * 0.35
    const portee = 3.0 + r() * 1.1
    const montee = 1.6 + r() * 1.6
    const torsion = (r() - 0.5) * 0.5
    const pts: THREE.Vector3[] = []
    for (let k = 0; k <= 4; k++) {
      const t = k / 4
      const a = phi + torsion * t
      const rad = 0.3 + portee * Math.pow(t, 0.9)
      const y = TRUNK_TOP - 0.25 + montee * Math.pow(t, 0.8) + Math.sin(t * Math.PI) * 0.35
      pts.push(new THREE.Vector3(Math.cos(a) * rad, y, Math.sin(a) * rad))
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal')
    const r0 = 0.46
    const r1 = 0.07
    branches.push({ geometry: taperedTube(curve, r0, r1, 22, 8), curve, r0, r1 })
    pointes.push({ position: curve.getPointAt(1), branche: i, principale: true })

    // Rameaux : deux par branche, tordus comme des racines
    for (const t0 of [0.5, 0.78]) {
      const base = curve.getPointAt(t0)
      const tangent = curve.getTangentAt(t0)
      const cote = new THREE.Vector3().crossVectors(tangent, up).normalize()
      const sens = r() > 0.5 ? 1 : -1
      const dir = tangent
        .clone()
        .multiplyScalar(0.6)
        .add(cote.multiplyScalar(0.8 * sens))
        .add(new THREE.Vector3(0, 0.75, 0))
        .normalize()
      const L = 1.1 + r() * 0.8
      const p1 = base
        .clone()
        .add(dir.clone().multiplyScalar(L * 0.5))
        .add(new THREE.Vector3(0, 0.1, 0))
      const p2 = base
        .clone()
        .add(dir.clone().multiplyScalar(L))
        .add(new THREE.Vector3((r() - 0.5) * 0.3, 0.25, (r() - 0.5) * 0.3))
      const c2 = new THREE.CatmullRomCurve3([base, p1, p2])
      const rBase = THREE.MathUtils.lerp(r0, r1, Math.pow(t0, 0.75)) * 0.55
      rameauxGeos.push(taperedTube(c2, rBase, 0.03, 10, 6))
      pointes.push({ position: p2.clone(), branche: i, principale: false })
    }
  }

  const rameaux = mergeGeometries(rameauxGeos)
  rameauxGeos.forEach((g) => g.dispose())
  return { branches, rameaux, pointes }
}

/** Racines souterraines : une racine principale par formation, plus des radicelles décoratives. */
export function createRoots(nRacines: number, seed = 5) {
  const r = rng(seed)
  const racines: { geometry: THREE.BufferGeometry; tip: THREE.Vector3 }[] = []
  const radicelles: THREE.BufferGeometry[] = []
  for (let i = 0; i < nRacines; i++) {
    const phi = (i / nRacines) * Math.PI * 2 + 0.4 + (r() - 0.5) * 0.3
    const prof = 2.8 + r() * 1.2
    const portee = 3.0 + r() * 0.9
    const pts: THREE.Vector3[] = []
    for (let k = 0; k <= 4; k++) {
      const t = k / 4
      const a = phi + Math.sin(t * 3 + i) * 0.18
      const rad = 1.0 + portee * Math.pow(t, 0.85)
      pts.push(
        new THREE.Vector3(Math.cos(a) * rad, -0.2 - prof * Math.pow(t, 1.15), Math.sin(a) * rad),
      )
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    racines.push({ geometry: taperedTube(curve, 0.55, 0.045, 24, 8), tip: curve.getPointAt(1) })
    for (const t0 of [0.35, 0.6]) {
      const base = curve.getPointAt(t0)
      const dir = new THREE.Vector3(
        Math.cos(phi + (r() - 0.5) * 2),
        -0.6 - r() * 0.5,
        Math.sin(phi + (r() - 0.5) * 2),
      ).normalize()
      const L = 0.9 + r() * 0.9
      const p1 = base
        .clone()
        .add(dir.clone().multiplyScalar(L * 0.5))
        .add(new THREE.Vector3(0, -0.1, 0))
      const p2 = base.clone().add(dir.clone().multiplyScalar(L))
      radicelles.push(taperedTube(new THREE.CatmullRomCurve3([base, p1, p2]), 0.14, 0.02, 8, 5))
    }
  }
  const radicellesGeo = mergeGeometries(radicelles)
  radicelles.forEach((g) => g.dispose())
  return { racines, radicelles: radicellesGeo }
}

/** Feuille palmée de baobab : 5 folioles en éventail. */
export function createLeafGeometry() {
  const foliole = new THREE.Shape()
  const L = 0.34
  const W = 0.075
  foliole.moveTo(0, 0)
  foliole.bezierCurveTo(W, L * 0.25, W, L * 0.75, 0, L)
  foliole.bezierCurveTo(-W, L * 0.75, -W, L * 0.25, 0, 0)
  const geos: THREE.BufferGeometry[] = []
  for (let k = -2; k <= 2; k++) {
    const g = new THREE.ShapeGeometry(foliole, 4)
    const s = 1 - Math.abs(k) * 0.12
    g.scale(s, s, s)
    g.rotateZ(k * 0.42)
    geos.push(g)
  }
  const leaf = mergeGeometries(geos)
  geos.forEach((g) => g.dispose())
  return leaf
}

/** Matrices d'une grappe de feuilles autour de l'origine (relative à la pointe). */
export function clusterMatrices(count: number, rayon: number, seed: number) {
  const r = rng(seed)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const p = new THREE.Vector3()
  const s = new THREE.Vector3()
  const out: THREE.Matrix4[] = []
  for (let i = 0; i < count; i++) {
    const u = r() * Math.PI * 2
    const v = Math.acos(2 * r() - 1)
    const d = rayon * Math.cbrt(r())
    p.set(
      Math.sin(v) * Math.cos(u) * d,
      Math.abs(Math.cos(v)) * d * 0.7 + 0.1,
      Math.sin(v) * Math.sin(u) * d,
    )
    e.set(r() * Math.PI, r() * Math.PI * 2, r() * Math.PI)
    q.setFromEuler(e)
    const k = 0.75 + r() * 0.6
    s.set(k, k, k)
    out.push(m.clone().compose(p, q, s))
  }
  return out
}
