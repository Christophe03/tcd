'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ArrowRight,
  LayoutGrid,
  Smartphone,
  Monitor,
  Globe,
  ShieldCheck,
  Package,
  Scissors
} from 'lucide-react'
import { projects } from '@/data'
import { useIsSmallScreen } from '@/components/useIsSmallScreen'

const projectIcons: Record<string, ReactNode> = {
  'Mes Factures': <Smartphone className="w-5 h-5 text-purple-300" />,
  'Gestion de Stocks': <Package className="w-5 h-5 text-blue-300" />,
  'Salon de Coiffure': <Scissors className="w-5 h-5 text-cyan-300" />,
  'Site Portfolio': <Monitor className="w-5 h-5 text-blue-300" />,
  "Premier Conseil d'Orientation": <Globe className="w-5 h-5 text-cyan-300" />,
  'IIM Universit?? Bamako': <LayoutGrid className="w-5 h-5 text-purple-300" />,
  'ROMS Media': <ShieldCheck className="w-5 h-5 text-blue-300" />
}

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
  const isSmallScreen = useIsSmallScreen()
  const reveal = (offset = 24, amount = 0.2) =>
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
      id="projects"
      {...reveal(24, 0.2)}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative py-12 sm:py-16 md:py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-section-grid opacity-30" aria-hidden="true" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...reveal(24)}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Projets</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Réalisations récentes
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed text-lg">
            Des projets concrets, pensés pour l'utilisateur, performants et adaptatifs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              {...reveal(24)}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 180, damping: 24 }}
              className="group relative overflow-hidden rounded-[30px] border border-slate-800/70 bg-slate-900/90 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_35px_120px_-45px_rgba(59,130,246,0.35)]"
            >
              <div className="relative h-56 overflow-hidden rounded-t-[30px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-4 mx-4 flex flex-col gap-3 rounded-3xl bg-slate-950/75 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl shadow-sm shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex min-w-0 items-center gap-2 font-medium">
                    {projectIcons[project.title]}
                    {project.title}
                  </span>
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-200">
                    {project.technologies.length} techs
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {project.link ? (
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-800/95 border border-slate-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-slate-950/15 transition hover:bg-slate-700"
                    >
                      Voir le projet
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-3 text-sm text-slate-400">
                      En préparation
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Étude complète
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
