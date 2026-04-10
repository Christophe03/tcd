'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '#home' },
  { label: 'À Propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl shadow-[0_20px_80px_-40px_rgba(15,23,42,0.7)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          href="#home"
          className="inline-flex items-center gap-3 text-lg font-bold text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm shadow-lg shadow-blue-500/20">
            T
          </span>
          <span className="hidden sm:inline">Toumany Diarra</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center px-1 py-1 text-slate-300 transition hover:text-white"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-full scale-x-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="inline-flex items-center gap-2 rounded-full bg-slate-800/95 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 border border-slate-700 transition hover:bg-slate-800 hover:ring-1 hover:ring-slate-500"
          >
            Contact
            <ArrowRight className="h-4 w-4 text-blue-300" />
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 text-slate-300" /> : <Menu className="h-6 w-6 text-slate-300" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 py-6 md:hidden"
        >
          <div className="mx-auto w-full max-w-xl rounded-[28px] border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Menu</span>
              <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-200">Navigation</span>
            </div>
            <div className="space-y-3 text-sm font-medium text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-2xl px-4 py-4 text-base transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-800/95 border border-slate-700 px-4 py-4 text-base font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-700"
            >
              Contact
              <ArrowRight className="h-4 w-4 text-blue-300" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar