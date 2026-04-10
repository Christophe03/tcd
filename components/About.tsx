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

  const experiences: Experience[] = [
    {
      position: 'Responsable Pôle Web & Média',
      company: 'Sitan Informatique',
      period: "Janv. 2024 – Aujourd'hui",
      location: 'Bamako',
      responsibilities: [
        'Pilotage de projets SI complexes (OISE, GTP) pour plusieurs institutions partenaires, de la spécification à la livraison.',
        'Encadrement de 2 développeurs : répartition des tâches, revues de code, respect des délais.',
        'Rédaction des spécifications fonctionnelles et techniques, participation aux comités de projet.',
        'Développement full stack : Angular, NestJS, PostgreSQL, Flutter — livraison dans les délais sur 100% des modules.',
        'Garantie de la qualité technique : tests fonctionnels, validation des livrables, performance.'
      ]
    },
    {
      position: 'Consultant Développeur Full Stack',
      company: 'MCEBS Consulting',
      period: "Août 2025 – Aujourd'hui",
      location: 'Bamako',
      responsibilities: [
        "Conception et développement d'applications web et mobiles modernes (Angular, Flutter, NestJS).",
        'Analyse des besoins métiers et traduction en solutions techniques documentées.',
        "Intégration d'API REST, bases de données PostgreSQL/Firebase et services tiers.",
        "Rédaction d'offres techniques dans le cadre de réponses à appels d'offres."
      ]
    },
    {
      position: 'Consultant – Développeur & Community Manager',
      company: "ROM'S MEDIA",
      period: "Janv. 2026 – Aujourd'hui",
      location: 'Bamako',
      responsibilities: [
        "Développement et maintenance de solutions web pour l'agence et ses clients (Angular, Firebase, WordPress, NextJS).",
        'Définition et pilotage de la stratégie digitale : planification éditoriale, campagnes, analyse des performances.',
        'Conception et livraison de 2 sites web institutionnels (IIMB, RD Service) en moins de 30 jours chacun.'
      ]
    },
    {
      position: 'Formateur en Développement Web & Mobile',
      company: 'SIMPLE 1 / AMI',
      period: "Août 2022 – Aujourd'hui",
      location: 'Kati & Bamako',
      responsibilities: [
        'Formation de plus de 80 apprenants (débutants à intermédiaires) en développement web, mobile, BDD et outils IA.',
        'Conception de programmes pédagogiques complets : NestJS, PostgreSQL, WordPress, Canva, Outils IA.',
        'Évaluation des compétences, suivi de progression et validation des acquis à chaque promotion.',
        'Utilisation de projets réels comme cas pratiques pour ancrer les apprentissages.'
      ]
    },
    {
      position: 'Stagiaire Développeur Full Stack',
      company: 'Sitan Informatique',
      period: 'Févr. 2023 – Déc. 2023',
      location: 'Bamako',
      responsibilities: [
        'Développement d’applications Web et Mobile (Angular, NestJS, Firebase).',
        'Participation aux phases de conception, développement et tests fonctionnels sur des projets internes.'
      ]
    }
  ]

  const buttonBase =
    'relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-white transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

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
                    <motion.a
                      href="https://linkedin.com/in/toumany-diarra"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`${buttonBase} bg-slate-800/90 border-slate-700 hover:border-blue-400/40 hover:text-white hover:shadow-[0_12px_30px_-16px_rgba(59,130,246,0.8)]`}
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0 translate-x-[-140%] group-hover:translate-x-[140%] transition-transform duration-700" />
                      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/25 via-purple-500/15 to-blue-500/25" />
                      <span className="relative z-10 inline-flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        LinkedIn
                      </span>
                    </motion.a>
                    <motion.a
                      href="https://github.com/toumany"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`${buttonBase} bg-slate-800/90 border-slate-700 hover:border-purple-400/40 hover:text-white hover:shadow-[0_12px_30px_-16px_rgba(168,85,247,0.7)]`}
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/10 to-purple-500/0 translate-x-[-140%] group-hover:translate-x-[140%] transition-transform duration-700" />
                      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-purple-500/20" />
                      <span className="relative z-10 inline-flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        GitHub
                      </span>
                    </motion.a>
                    <motion.a
                      href="https://github.com/toumany?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`${buttonBase} bg-blue-500/10 border-blue-400/30 text-blue-200 hover:text-white hover:border-blue-300/70 hover:shadow-[0_14px_36px_-18px_rgba(59,130,246,0.9)]`}
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/15 to-blue-500/0 translate-x-[-140%] group-hover:translate-x-[140%] transition-transform duration-700" />
                      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/35 via-cyan-400/15 to-blue-500/35" />
                      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
                      <span className="relative z-10 inline-flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Voir repos
                      </span>
                    </motion.a>
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

        <div className="mt-16 space-y-12">
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
            <div className="relative space-y-6 pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent"></div>
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.position}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="relative"
                >
                  <span className="absolute -left-3 top-6 inline-flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/40 bg-slate-950 text-xs font-semibold text-blue-200 shadow-[0_0_0_6px_rgba(15,23,42,0.6)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.9)]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500/40 via-purple-500/20 to-transparent"></div>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-white">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                            <Briefcase className="w-5 h-5" />
                          </span>
                          <h4 className="text-lg font-semibold">{exp.position}</h4>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-blue-200">
                          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-2 text-slate-300 text-sm">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
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
      </div>
    </motion.section>
  )
}

export default About
