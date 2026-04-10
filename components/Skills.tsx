'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  ServerCog,
  Settings,
  Code2,
  Terminal,
  Database,
  GitBranch,
  Cloud,
  Box,
  Layers,
  Sparkles,
  Star,
  Activity
} from 'lucide-react'
import { skills } from '@/data'

const categoryIcons: Record<string, ReactNode> = {
  Frontend: <LayoutGrid className="w-6 h-6" />,
  Backend: <ServerCog className="w-6 h-6" />,
  Outils: <Settings className="w-6 h-6" />
}

const skillIcons: Record<string, ReactNode> = {
  React: <Sparkles className="w-4 h-4 text-blue-300" />,
  'Next.js': <Code2 className="w-4 h-4 text-slate-300" />,
  'Vue.js': <Activity className="w-4 h-4 text-green-300" />,
  TypeScript: <Terminal className="w-4 h-4 text-blue-400" />,
  'Tailwind CSS': <Star className="w-4 h-4 text-cyan-300" />,
  'HTML/CSS': <Code2 className="w-4 h-4 text-orange-300" />,
  'Node.js': <Terminal className="w-4 h-4 text-green-400" />,
  Express: <Activity className="w-4 h-4 text-slate-300" />,
  Python: <Cloud className="w-4 h-4 text-yellow-300" />,
  MongoDB: <Database className="w-4 h-4 text-green-400" />,
  PostgreSQL: <Database className="w-4 h-4 text-blue-300" />,
  Firebase: <Sparkles className="w-4 h-4 text-orange-400" />,
  Git: <GitBranch className="w-4 h-4 text-orange-300" />,
  Docker: <Box className="w-4 h-4 text-blue-300" />,
  AWS: <Cloud className="w-4 h-4 text-orange-300" />,
  Figma: <Layers className="w-4 h-4 text-purple-300" />,
  'VS Code': <Code2 className="w-4 h-4 text-blue-300" />
}

interface SkillsProps {}

const Skills: React.FC<SkillsProps> = () => {
  const frontendSkills = skills.filter((skill) => skill.category === 'Frontend')
  const backendSkills = skills.filter((skill) => skill.category === 'Backend')
  const toolsSkills = skills.filter((skill) => skill.category === 'Outils')

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="relative py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute right-0 bottom-24 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Compétences</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ce que je maîtrise</h2>
          <p className="mt-4 text-slate-300 max-w-3xl mx-auto leading-relaxed text-lg">
            Une sélection de technologies et d’outils que j’utilise pour créer des expériences digitales efficaces et durables.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.9)]"
          >
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Expertise</p>
                <h3 className="mt-4 text-3xl font-bold text-white">Compétences clés</h3>
              </div>
              <div className="grid gap-4 text-center md:text-right">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4">
                  <p className="text-3xl font-semibold text-white">3+</p>
                  <p className="text-sm text-slate-400">Années d'expérience</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4">
                  <p className="text-3xl font-semibold text-white">10+</p>
                  <p className="text-sm text-slate-400">Projets livrés</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Frontend</p>
                <p className="mt-3 text-slate-300">React, Next.js, Vue.js, Tailwind.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Backend</p>
                <p className="mt-3 text-slate-300">Node.js, Express, MongoDB, PostgreSQL.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Outils</p>
                <p className="mt-3 text-slate-300">Git, Docker, AWS, Firebase, Figma.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Approche</p>
                <p className="mt-3 text-slate-300">Design utilisateur, performance et maintenance.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {['Frontend', 'Backend', 'Outils'].map((category, idx) => {
              const categorySkills =
                category === 'Frontend'
                  ? frontendSkills
                  : category === 'Backend'
                  ? backendSkills
                  : toolsSkills

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 24 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.8)]"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {categoryIcons[category]}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{category}</h4>
                      <p className="text-sm text-slate-400">
                        {category === 'Frontend'
                          ? 'Interfaces élégantes'
                          : category === 'Backend'
                          ? 'Services robustes'
                          : 'Outils & support'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-slate-950/20"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                 </motion.div>
               )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Skills