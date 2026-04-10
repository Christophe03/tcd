import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}

const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const buildText = (payload: ContactPayload) =>
  [
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Sujet: ${payload.subject}`,
    '',
    payload.message
  ].join('\n')

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const buildHtml = (payload: ContactPayload) => {
  const name = escapeHtml(payload.name)
  const email = escapeHtml(payload.email)
  const subject = escapeHtml(payload.subject)
  const message = escapeHtml(payload.message).replace(/\n/g, '<br />')

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b1120; color: #e2e8f0; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; border-radius: 22px; overflow: hidden; border: 1px solid rgba(148,163,184,0.2);">
        <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 20px 24px;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px;">Nouveau message depuis le portfolio</h2>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">${subject}</p>
        </div>
        <div style="background: #0f172a; padding: 24px;">
          <div style="display: inline-block; background: rgba(59,130,246,0.15); color: #bfdbfe; padding: 6px 12px; border-radius: 999px; font-size: 12px; border: 1px solid rgba(59,130,246,0.35); margin-bottom: 16px;">
            Détails du contact
          </div>
          <p style="margin: 0 0 8px;"><strong>Nom :</strong> ${name}</p>
          <p style="margin: 0 0 8px;"><strong>Email :</strong> ${email}</p>
          <p style="margin: 0 0 16px;"><strong>Sujet :</strong> ${subject}</p>
          <div style="background: rgba(30,41,59,0.9); padding: 16px; border-radius: 14px; border: 1px solid rgba(148,163,184,0.2);">
            <p style="margin: 0; line-height: 1.7;">${message}</p>
          </div>
          <div style="margin-top: 18px;">
            <a href="mailto:${email}" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 999px; font-size: 13px;">Répondre rapidement</a>
          </div>
        </div>
      </div>
    </div>
  `
}

const buildAutoReplyHtml = (payload: ContactPayload) => {
  const name = escapeHtml(payload.name)
  const subject = escapeHtml(payload.subject)

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b1120; color: #e2e8f0; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; border-radius: 22px; overflow: hidden; border: 1px solid rgba(148,163,184,0.2);">
        <div style="background: linear-gradient(135deg, #22c55e, #14b8a6); padding: 20px 24px;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px;">Merci pour votre message</h2>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Nous avons bien reçu votre demande</p>
        </div>
        <div style="background: #0f172a; padding: 24px;">
          <p style="margin: 0 0 12px;">Bonjour ${name},</p>
          <p style="margin: 0 0 12px;">
            J'ai bien reçu votre message concernant <strong>${subject}</strong>. Je reviens vers vous rapidement.
          </p>
          <div style="margin: 18px 0; padding: 14px 16px; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); border-radius: 14px; color: #bbf7d0;">
            Temps de réponse moyen : moins de 24h
          </div>
          <p style="margin: 0;">À très bientôt,</p>
          <p style="margin: 8px 0 0;"><strong>Toumanych dit Christophe Diarra</strong></p>
        </div>
      </div>
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>
    const payload: ContactPayload = {
      name: String(body?.name || '').trim(),
      email: String(body?.email || '').trim(),
      subject: String(body?.subject || '').trim(),
      message: String(body?.message || '').trim(),
      company: String(body?.company || '').trim()
    }

    if (payload.company) {
      return Response.json({ ok: true })
    }

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return Response.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 })
    }

    if (!isEmailValid(payload.email)) {
      return Response.json({ error: "L'adresse email n'est pas valide." }, { status: 400 })
    }

    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD
    const to = process.env.CONTACT_TO_EMAIL

    if (!user || !pass || !to) {
      return Response.json(
        { error: 'Configuration email manquante. Vérifie les variables GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    })

    await transporter.sendMail({
      from: `Contact Portfolio <${user}>`,
      to,
      replyTo: payload.email,
      subject: `Nouveau message: ${payload.subject}`,
      text: buildText(payload),
      html: buildHtml(payload)
    })

    await transporter.sendMail({
      from: `Toumanych dit Christophe Diarra <${user}>`,
      to: payload.email,
      replyTo: to,
      subject: 'Merci pour votre message',
      text: `Bonjour ${payload.name},\n\nMerci pour votre message. Je reviens vers vous rapidement.\n\nSujet: ${payload.subject}\n\n— Toumany`,
      html: buildAutoReplyHtml(payload)
    })

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ error: 'Erreur serveur. Réessaie plus tard.' }, { status: 500 })
  }
}
