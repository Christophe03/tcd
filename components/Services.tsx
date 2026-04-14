'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Monitor, Smartphone, TrendingUp, PenTool, GraduationCap, Zap } from 'lucide-react'
import { services } from '@/data'
import { useIsSmallScreen } from '@/components/useIsSmallScreen'

const serviceIcons: Record<string, ReactNode> = {
  'Développement Web': <Monitor className="w-6 h-6 text-blue-300" />,
  'Développement Mobile': <Smartphone className="w-6 h-6 text-purple-300" />,
  'Intelligence Artificielle': <Zap className="w-6 h-6 text-cyan-300" />,
  'Marketing Digital': <TrendingUp className="w-6 h-6 text-cyan-300" />,
  'Création de Contenu': <PenTool className="w-6 h-6 text-blue-300" />,
  'Formation': <GraduationCap className="w-6 h-6 text-emerald-300" />,
  'Automatisation': <Zap className="w-6 h-6 text-amber-300" />
}

const processSteps = [
  {
    title: '01. Compréhension',
    description: 'Analyse de votre besoin, définition des objectifs et cadrage complet du projet.'
  },
  {
    title: '02. Conception',
    description: 'Design, prototypage et développement pour une solution moderne et fonctionnelle.'
  },
  {
    title: '03. Livraison',
    description: 'Déploiement, optimisation et support pour garantir une expérience durable.'
  }
]

interface ServicesProps {}

const Services: React.FC<ServicesProps> = () => {
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
      id="services"
      {...reveal(20, 0.2)}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative py-12 sm:py-16 md:py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-section-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-20 h-72 bg-blue-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...reveal(30)}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Comment je travaille</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Une méthode simple et performante
          </h2>
          <p className="mt-4 text-slate-300 max-w-3xl mx-auto leading-relaxed text-lg">
            Du brief initial à la mise en ligne, je conçois des sites web, applications mobiles, formations et solutions IA. Chaque projet est traité comme une mission de consultant digital orientée résultats.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                {...reveal(30)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 160, damping: 24 }}
                className="group overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-900/85 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                  {serviceIcons[service.title]}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-blue-300 transition hover:text-white"
                >
                  Parlons-en
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Étapes clés</p>
            <div className="space-y-5">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  {...reveal(20)}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">{step.title}</span>
                  <p className="mt-3 text-slate-300 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Services
