type Props = {
  id: string
  eyebrow: string
  titre: string
  intro?: string
  tone?: 'dark' | 'light'
}

/** Titre de section : sur-titre, titre éditorial et liseré bogolan. */
export function SectionHeading({ id, eyebrow, titre, intro, tone = 'dark' }: Props) {
  const light = tone === 'light'
  return (
    <header className="mb-8">
      <p className={light ? 'eyebrow !text-sienne' : 'eyebrow'}>{eyebrow}</p>
      <h2
        id={id}
        className={`font-display mt-3 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl ${
          light ? 'text-encre' : 'text-creme'
        }`}
      >
        {titre}
      </h2>
      <div className="bogolan-rule mt-5 w-40" aria-hidden="true" />
      {intro ? (
        <p
          className={`mt-5 max-w-prose text-base leading-relaxed ${light ? 'text-encre-douce' : 'text-sable/85'}`}
        >
          {intro}
        </p>
      ) : null}
    </header>
  )
}
