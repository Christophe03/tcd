'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Download, Sparkles, Layers, Code2, Globe, Award } from 'lucide-react'

interface HeroProps {}

const heroCards = [
  {
    title: 'Interface moderne',
    description: 'Des designs clairs, adaptatifs et centrés utilisateur.',
    icon: <Layers className="w-5 h-5 text-blue-300" />
  },
  {
    title: 'Performance',
    description: 'Sites rapides et optimisés pour une expérience fluide.',
    icon: <Code2 className="w-5 h-5 text-purple-300" />
  },
  {
    title: 'Impact digital',
    description: 'Des solutions qui renforcent l’image de marque et la conversion.',
    icon: <Globe className="w-5 h-5 text-cyan-300" />
  }
]

const Hero: React.FC<HeroProps> = () => {
  const sectionVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9 }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  }

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      className="relative min-h-screen overflow-hidden bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-8 top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl mix-blend-screen"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-8 top-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl mix-blend-screen"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 bottom-24 h-52 w-52 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:text-left md:gap-12">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-100 shadow-sm shadow-cyan-500/10 backdrop-blur-sm sm:justify-start"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Disponible pour nouveaux projets
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Je crée des expériences digitales
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              modernes et performantes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg leading-8 text-slate-300 md:text-xl"
          >
            Développeur Full-Stack passionné, j’accompagne les entreprises et les porteurs de projet
            avec des sites web et applications mobiles fiables, rapides et esthétiques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 210, damping: 18 }}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-800/95 border border-slate-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-slate-950/20 transition duration-300 hover:bg-slate-700 sm:w-auto"
            >
              Commencer un projet
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 210, damping: 18 }}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-8 py-4 text-base font-semibold text-slate-100 transition duration-300 hover:bg-slate-800 sm:w-auto"
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="/documents/Toumany_dit_Christophe_Diarra.pdf"
              download="Toumany_dit_Christophe_Diarra.pdf"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 210, damping: 18 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-slate-800 sm:w-auto"
            >
              <Download className="h-4 w-4 text-blue-300" />
              Télécharger le CV
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } }
          }}
          className="grid gap-5 md:grid-cols-3"
        >
          {heroCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-6 text-left shadow-[0_25px_80px_-40px_rgba(15,23,42,0.8)] transition duration-300 hover:border-blue-400/40 hover:bg-slate-950/90"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-slate-300 leading-relaxed">{card.description}</p>
              <div className="pointer-events-none absolute -right-8 top-6 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl opacity-40 transition duration-300 group-hover:opacity-60" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3 text-slate-100/80 hover:text-white"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm uppercase tracking-[0.25em]">Découvrir</span>
          <ChevronDown className="h-6 w-6 text-slate-300" />
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default Hero
