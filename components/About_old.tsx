'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Users, Mail, Phone, MapPin, Calendar, Award, Link, Briefcase, Building, Clock } from 'lucide-react'
import Image from 'next/image'

type AboutProps = {}

type Experience = {
  position: string
  company: string
  period: string
  location: string
  responsibilities: string[]
}

const About = ({}: AboutProps) => {
  const highlights = [
    {
      icon: <Code2 className="w-6 h-6 text-blue-300" />,
      title: "Développement Full-Stack",
      description: "Maîtrise des technologies front-end et back-end pour des solutions complètes."
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-300" />,
      title: "Design Centré Utilisateur",
      description: "Création d'interfaces intuitives et d'expériences utilisateur exceptionnelles."
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-300" />,
      title: "Performance & Optimisation",
      description: "Applications rapides, sécurisées et optimisées pour tous les appareils."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-300" />,
      title: "Travail d'Équipe",
      description: "Collaboration efficace et communication transparente avec les clients."
    }
  ]

  const experiences: Experience[] = []

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="py-24 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white overflow-hidden"
    >
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"></div>
      <div className="absolute right-0 bottom-24 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">À Propos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Mon parcours et mes forces</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300">
            Je conçois des expériences digitales performantes et esthétiques, avec une approche pragmatique et orientée résultats.
          </p>
        </motion.div>

        {/* Fiche Google / Carte de visite digitale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
            {/* Photo principale */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative flex w-full max-w-[24rem] items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="relative flex h-[20rem] w-full max-w-[22rem] items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl overflow-hidden sm:h-[24rem]">
                  <div className="absolute inset-0 rounded-full border border-blue-400/20 opacity-70" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_35%)]" />
                  <div className="absolute -top-4 right-3 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-sm text-white shadow-xl shadow-blue-500/10 backdrop-blur-xl animate-[pulse_6s_ease-in-out_infinite] sm:right-4">
                    Expert Full-Stack
                  </div>
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/5 bg-slate-900">
                    <Image
                      src="/images/1.png"
                      alt="Portrait professionnel - Toumany dit Christophe Diarra"
                      width={350}
                      height={350}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Informations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-8 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">Toumany dit Christophe Diarra</h4>
                    <p className="text-blue-300">Développeur Full-Stack & Designer UX/UI</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail className="w-5 h-5 text-blue-300" />
                      <span>toumanychristophediarra@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Phone className="w-5 h-5 text-blue-300" />
                      <span>+223 96 85 52 82</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-5 h-5 text-blue-300" />
                      <span>Kati Koko, Mali</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Calendar className="w-5 h-5 text-blue-300" />
                      <span>Disponible immédiatement</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Award className="w-5 h-5 text-blue-300" />
                      <span>6+ ans d'expérience</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Code2 className="w-5 h-5 text-blue-300" />
                      <span>60+ projets sur GitHub</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center">
                    <a
                      href="https://linkedin.com/in/toumany-diarra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    >
                      <Link className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/toumany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
                    >
                      <Code2 className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href="https://github.com/toumany?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/10 hover:text-white transition-colors"
                    >
                      <Code2 className="w-4 h-4" />
                      Voir repos
                    </a>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Avec plus de 6 ans d'expérience en développement full-stack, je transforme vos idées en solutions digitales performantes et élégantes.
                    Expert en React, Next.js, Node.js et design UX/UI, je vous accompagne de la conception à la mise en production.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Mon histoire</p>
              <h3 className="mt-4 text-3xl font-bold text-white">Créateur d’expériences digitales</h3>
            </div>
            <div className="space-y-6 text-slate-300">
              <p>
                Développeur full-stack passionné, je transforme les idées en produits numériques robustes et élégants.
                J’accompagne chaque étape : conception, développement, optimisation et suivi post-lancement.
              </p>
              <p>
                Basé au Mali, je collabore avec des équipes locales et internationales pour livrer des solutions orientées utilisateur.
              </p>
            </div>
          </motion.div>

        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Expérience Professionnelle</p>
              <h3 className="mt-4 text-3xl font-bold text-white">Mon parcours professionnel</h3>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.9)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{exp.position}</h4>
                          <div className="flex items-center gap-2 text-blue-300 text-sm">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <div className="text-right text-slate-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="text-xs">{exp.location}</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[32px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Mes forces</p>
              <h3 className="mt-4 text-3xl font-bold text-white">Pourquoi travailler avec moi</h3>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.9)]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{highlight.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-[32px] border border-white/10 bg-slate-900/85 p-10 shadow-[0_40px_120px_-55px_rgba(15,23,42,0.8)] backdrop-blur-xl"
        >
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 blur-2xl"></div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Pourquoi choisir mon travail</p>
                <h4 className="text-2xl font-semibold text-white">Un accompagnement stratégique</h4>
                <ul className="space-y-4 text-slate-300">
                  {[
                    'Approche personnalisée orientée utilisateur',
                    'Technologies modernes et performances optimales',
                    'Support continu après lancement',
                    'Respect des délais et de la qualité'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/20">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Projets GitHub</p>
                    <p className="mt-3 text-3xl font-bold text-white">60+</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Disponibilité</p>
                  <p className="mt-3 text-3xl font-bold text-white">Disponible</p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 right-6 h-20 w-20 rounded-full bg-blue-500/20 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-6 h-16 w-16 rounded-full bg-purple-500/20 blur-2xl"
            />
          </motion.div>
      </div>
    </motion.section>
  )
}

export default About
