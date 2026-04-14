'use client'

import { motion } from 'framer-motion'
import { Lightbulb, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react'
import { useIsSmallScreen } from '@/components/useIsSmallScreen'

const Consulting = () => {
  const isSmallScreen = useIsSmallScreen()
  const reveal = (offset = 20, amount = 0.2) =>
    isSmallScreen
      ? {
          initial: { opacity: 0, y: offset },
          animate: { opacity: 1, y: 0 }
        }
      : {
          initial: { opacity: 0, y: offset },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount }
        }

  return (
    <motion.section
      id="consulting"
      {...reveal(20, 0.2)}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="relative py-12 sm:py-16 md:py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-section-grid opacity-30" aria-hidden="true" />
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute right-0 bottom-24 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Consultant</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Consultant digital, formateur et expert en intelligence artificielle
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            J'aide les entreprises et porteurs de projet à définir une stratégie digitale claire, développer des applications web et mobiles, et intégrer des solutions IA pour accélérer la croissance.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Stratégie digitale</h3>
            <p className="text-slate-300 leading-relaxed">
              Accompagnement sur la définition du projet, le positionnement produit, l'architecture technique et les parcours utilisateur.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Solutions IA</h3>
            <p className="text-slate-300 leading-relaxed">
              Conception et intégration de solutions d'intelligence artificielle pour automatiser les processus et enrichir l'expérience utilisateur.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]"
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Formation & coaching</h3>
            <p className="text-slate-300 leading-relaxed">
              Formations pratiques sur le développement web, mobile et l'IA pour renforcer les compétences de vos équipes ou de vos apprenants.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/22396855282"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:bg-blue-400"
          >
            Discutons de votre projet
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.section>
  )
}

export default Consulting
