'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Link, Code } from 'lucide-react'

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  return (
    <motion.section
      id="contact"
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
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Discutons de votre projet</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed text-lg">
            Prêt à démarrer ? Je suis disponible pour répondre à vos questions et créer ensemble une solution digitale performante.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[36px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.9)]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-blue-400/80 mb-4">Restons en contact</p>
            <h3 className="text-3xl font-semibold text-white mb-6">Je suis là pour vos projets web et mobile.</h3>
            <div className="space-y-6 text-slate-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5"
              >
                <Mail className="h-6 w-6 text-blue-300" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p>contact@example.com</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5"
              >
                <MessageCircle className="h-6 w-6 text-cyan-300" />
                <div>
                  <p className="font-semibold text-white">WhatsApp</p>
                  <p>+223 96 85 52 82</p>
                </div>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="https://www.linkedin.com/in/toumany-dit-christophe-diarra-386401188/"
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-slate-300 transition hover:border-blue-400/40 hover:text-white"
                >
                  <Link className="h-5 w-5 text-blue-300" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Christophe03"
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-slate-300 transition hover:border-purple-400/40 hover:text-white"
                >
                  <Code className="h-5 w-5 text-purple-300" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[36px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.9)]"
          >
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Sujet"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              <textarea
                placeholder="Votre message..."
                rows={5}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 210, damping: 18 }}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-800/95 border border-slate-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-700"
              >
                Envoyer le message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact