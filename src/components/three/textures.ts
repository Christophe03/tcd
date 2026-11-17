import * as THREE from 'three'
import { rng } from './random'

/** Textures procédurales générées sur <canvas> : aucun fichier externe, aucun CDN. */

function canvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D indisponible')
  return { c, ctx }
}

function toTexture(c: HTMLCanvasElement, srgb = true) {
  const t = new THREE.CanvasTexture(c)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  t.needsUpdate = true
  return t
}

/** Bois sculpté de la porte : planches, veinage et motifs géométriques inspirés du bogolan. */
export function createDoorTexture() {
  const W = 512
  const H = 840
  const { c, ctx } = canvas(W, H)
  const r = rng(7)

  ctx.fillStyle = '#6a3f22'
  ctx.fillRect(0, 0, W, H)

  // Planches verticales
  const planches = 4
  for (let i = 0; i < planches; i++) {
    const x = (i * W) / planches
    ctx.fillStyle = i % 2 ? '#633a1f' : '#71442a'
    ctx.fillRect(x, 0, W / planches, H)
    ctx.fillStyle = 'rgba(20,10,4,0.75)'
    ctx.fillRect(x, 0, 3, H)
  }

  // Veinage
  for (let i = 0; i < 260; i++) {
    const x = r() * W
    ctx.strokeStyle = `rgba(${r() > 0.5 ? '35,18,8' : '140,95,60'},${0.08 + r() * 0.12})`
    ctx.lineWidth = 0.6 + r() * 1.4
    ctx.beginPath()
    ctx.moveTo(x, 0)
    for (let y = 0; y <= H; y += 40) ctx.lineTo(x + Math.sin(y * 0.01 + i) * 4 + (r() - 0.5) * 2, y)
    ctx.stroke()
  }

  // Gravure en creux : trait sombre + rehaut clair décalé (faux relief)
  const grave = (draw: () => void) => {
    ctx.save()
    ctx.translate(2, 2)
    ctx.strokeStyle = 'rgba(214,160,100,0.35)'
    draw()
    ctx.restore()
    ctx.strokeStyle = 'rgba(22,10,3,0.9)'
    draw()
  }
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const marge = 46
  const bandes = [120, 300, 470, 640]
  ctx.lineWidth = 6
  // Cadres
  grave(() => {
    ctx.beginPath()
    ctx.rect(marge, marge, W - marge * 2, H - marge * 2)
    ctx.stroke()
    for (const y of bandes) {
      ctx.beginPath()
      ctx.moveTo(marge, y)
      ctx.lineTo(W - marge, y)
      ctx.stroke()
    }
  })

  ctx.lineWidth = 5
  // Bande 1 : chevrons
  grave(() => {
    ctx.beginPath()
    for (let x = marge + 10; x < W - marge - 20; x += 36) {
      ctx.moveTo(x, 100)
      ctx.lineTo(x + 18, 66)
      ctx.lineTo(x + 36, 100)
    }
    ctx.stroke()
  })
  // Bande 2 : losanges
  grave(() => {
    for (let x = marge + 50; x < W - marge - 20; x += 104) {
      ctx.beginPath()
      ctx.moveTo(x, 210)
      ctx.lineTo(x + 40, 160)
      ctx.lineTo(x + 80, 210)
      ctx.lineTo(x + 40, 260)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + 40, 210, 7, 0, Math.PI * 2)
      ctx.stroke()
    }
  })
  // Bande 3 : carrés concentriques
  grave(() => {
    for (let x = marge + 30; x < W - marge - 60; x += 140) {
      for (let k = 0; k < 3; k++) {
        ctx.strokeRect(x + k * 16, 330 + k * 16, 110 - k * 32, 110 - k * 32)
      }
    }
  })
  // Bande 4 : points et traits (bogolan)
  grave(() => {
    for (let y = 500; y < 620; y += 40) {
      for (let x = marge + 26; x < W - marge - 10; x += 40) {
        ctx.beginPath()
        if ((x + y) % 80 === 0) {
          ctx.moveTo(x - 8, y)
          ctx.lineTo(x + 8, y)
        } else {
          ctx.arc(x, y, 5, 0, Math.PI * 2)
        }
        ctx.stroke()
      }
    }
  })
  // Bande 5 : zigzag
  grave(() => {
    ctx.beginPath()
    for (let x = marge + 10, i = 0; x < W - marge; x += 30, i++) {
      ctx.lineTo(x, i % 2 ? 670 : 740)
    }
    ctx.stroke()
  })

  return toTexture(c)
}

/** Enduit de banco (terre crue) pour le mur sahélien. */
export function createMudTexture() {
  const S = 256
  const { c, ctx } = canvas(S, S)
  const r = rng(3)
  ctx.fillStyle = '#7b4a2b'
  ctx.fillRect(0, 0, S, S)
  for (let i = 0; i < 900; i++) {
    const x = r() * S
    const y = r() * S
    const rad = 2 + r() * 14
    ctx.fillStyle = `rgba(${r() > 0.5 ? '150,96,58' : '70,40,22'},${0.05 + r() * 0.1})`
    ctx.beginPath()
    ctx.ellipse(x, y, rad * 1.6, rad, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  for (let y = 0; y < S; y += 18 + r() * 14) {
    ctx.fillStyle = 'rgba(40,22,10,0.12)'
    ctx.fillRect(0, y, S, 1 + r() * 2)
  }
  const t = toTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

/** Écorce de baobab : lisse, fibres verticales. */
export function createBarkTexture() {
  const W = 256
  const H = 512
  const { c, ctx } = canvas(W, H)
  const r = rng(11)
  ctx.fillStyle = '#8a6a55'
  ctx.fillRect(0, 0, W, H)
  for (let i = 0; i < 180; i++) {
    const x = r() * W
    ctx.strokeStyle = `rgba(${r() > 0.5 ? '60,40,30' : '170,140,120'},${0.08 + r() * 0.12})`
    ctx.lineWidth = 1 + r() * 3
    ctx.beginPath()
    ctx.moveTo(x, 0)
    for (let y = 0; y <= H; y += 32) ctx.lineTo(x + Math.sin(y * 0.02 + i) * 6, y)
    ctx.stroke()
  }
  const t = toTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

/** Point lumineux rond pour les particules. */
export function createGlowTexture() {
  const S = 64
  const { c, ctx } = canvas(S, S)
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(255,240,200,1)')
  g.addColorStop(0.35, 'rgba(243,212,143,0.6)')
  g.addColorStop(1, 'rgba(243,212,143,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  return toTexture(c)
}
