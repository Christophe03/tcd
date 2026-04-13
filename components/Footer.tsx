'use client'

import { motion } from 'framer-motion'

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden bg-slate-950 text-slate-200 py-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-section-grid opacity-25" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] items-center border-b border-white/10 pb-10">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white"
            >
              Restons en contact
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-xl text-slate-400"
            >
              Prêt à démarrer un projet ? Discutons de vos idées et voyons comment je peux vous aider à les réaliser.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 rounded-[28px] border border-white/10 bg-slate-900/85 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.9)]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Contact rapide</p>
            <div className="text-white text-lg font-medium">toumanychristophediarra@gmail.com</div>
            <div className="text-slate-400">Disponible pour des missions freelance et des collaborations.</div>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col gap-4 items-center justify-between border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Toumany dit Christophe Diarra. Tous droits réservés.
          </motion.span>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
