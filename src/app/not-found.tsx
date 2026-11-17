import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable – Toumany dit Christophe Diarra',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="panel max-w-md p-8 text-center">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="font-display text-creme mt-3 text-4xl font-semibold">
          Cette branche n’existe pas
        </h1>
        <p className="text-sable/85 mt-4">
          La page demandée est introuvable. Revenez au pied du baobab pour reprendre le parcours.
        </p>
        <Link href="/" className="btn btn-or mt-6">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
