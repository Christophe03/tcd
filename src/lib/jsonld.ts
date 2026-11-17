import { competences } from '@/data/competences'
import { experiences } from '@/data/experiences'
import { formations } from '@/data/formations'
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
  WHATSAPP_NUMERO_AFFICHE,
  profil,
} from '@/data/profil'
import { projets } from '@/data/projets'

/**
 * Données structurées schema.org (JSON-LD), générées depuis src/data :
 * le balisage ne peut pas diverger du contenu visible.
 * Graphe : WebSite → ProfilePage → Person (+ diplômes, employeurs) et liste des projets.
 */

const ID = {
  site: `${SITE_URL}/#website`,
  page: `${SITE_URL}/#profilepage`,
  person: `${SITE_URL}/#person`,
  projets: `${SITE_URL}/#projets`,
}

const sansDoublon = <T>(liste: T[]) => [...new Set(liste)]

export function buildJsonLd() {
  const employeursActuels = sansDoublon(
    experiences.filter((e) => e.actuel).map((e) => e.entreprise),
  )

  const person = {
    '@type': 'Person',
    '@id': ID.person,
    name: 'Toumany dit Christophe Diarra',
    givenName: 'Toumany dit Christophe',
    familyName: 'Diarra',
    alternateName: ['Christophe Diarra', 'Toumany Diarra'],
    jobTitle: [
      'Informaticien de gestion',
      'Développeur Web & Mobile',
      'Consultant IA',
      'Formateur',
    ],
    description: profil.bio[0],
    url: `${SITE_URL}/`,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${profil.photo.original}`,
      width: 864,
      height: 1184,
    },
    email: `mailto:${EMAIL}`,
    telephone: WHATSAPP_NUMERO_AFFICHE.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Kati', addressCountry: 'ML' },
    nationality: { '@type': 'Country', name: 'Mali' },
    worksFor: employeursActuels.map((name) => ({ '@type': 'Organization', name })),
    hasOccupation: experiences.map((e) => ({
      '@type': 'Occupation',
      name: e.poste,
      occupationLocation: { '@type': 'City', name: e.lieu },
      skills: e.stack?.join(', '),
    })),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Institut Universitaire de Gestion (IUG)' },
      { '@type': 'EducationalOrganization', name: 'Orange Digital Kalanso' },
      { '@type': 'EducationalOrganization', name: 'Simplon.co' },
    ],
    hasCredential: formations
      .filter((f) => !f.enCours)
      .map((f) => ({
        '@type': 'EducationalOccupationalCredential',
        name: f.titre,
        credentialCategory: /licence/i.test(f.titre)
          ? 'degree'
          : /baccalaur/i.test(f.titre)
            ? 'diploma'
            : 'certificate',
        recognizedBy: { '@type': 'Organization', name: f.etablissement },
        ...(f.justificatif ? { url: `${SITE_URL}${encodeURI(f.justificatif)}` } : {}),
      })),
    knowsAbout: sansDoublon(competences.flatMap((c) => c.competences.map((s) => s.nom))),
    knowsLanguage: [
      { '@type': 'Language', name: 'Français', alternateName: 'fr' },
      { '@type': 'Language', name: 'Bambara', alternateName: 'bm' },
      { '@type': 'Language', name: 'Anglais', alternateName: 'en' },
    ],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  }

  const listeProjets = {
    '@type': 'ItemList',
    '@id': ID.projets,
    name: 'Projets réalisés',
    numberOfItems: projets.length,
    itemListElement: projets.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.titre,
        description: p.description,
        creator: { '@id': ID.person },
        ...(p.stack.length ? { keywords: p.stack.join(', ') } : {}),
        ...(p.lien ? { url: p.lien } : {}),
      },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ID.site,
        url: `${SITE_URL}/`,
        name: 'Le Baobab — portfolio de Toumany dit Christophe Diarra',
        inLanguage: 'fr',
        publisher: { '@id': ID.person },
      },
      {
        '@type': 'ProfilePage',
        '@id': ID.page,
        url: `${SITE_URL}/`,
        name: 'Toumany dit Christophe Diarra – Développeur Web & Mobile, Consultant IA, Formateur',
        inLanguage: 'fr',
        isPartOf: { '@id': ID.site },
        mainEntity: { '@id': ID.person },
        hasPart: { '@id': ID.projets },
        primaryImageOfPage: `${SITE_URL}/images/og-cover.jpg`,
        dateModified: new Date().toISOString(),
      },
      person,
      listeProjets,
    ],
  }
}
