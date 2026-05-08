import { Resend } from 'resend'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey.includes('placeholder')) {
    throw new Error('Resend non configuré')
  }
  return new Resend(apiKey)
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@pariscasa-transport.com'

export async function sendQuoteConfirmation(to: string, data: any) {
  const resend = getResend()
  return resend.emails.send({
    from: fromEmail,
    to,
    subject: 'Votre demande de devis - Paris Casa Transport',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F5F0E8">
        <h2 style="color:#8B1A1A">Demande de devis enregistrée</h2>
        <p>Bonjour ${data.full_name},</p>
        <p>Votre demande de devis a bien été reçue. Notre équipe commerciale vous contactera sous 24h.</p>
        <p><strong>Estimation :</strong> ${data.estimated_price?.toFixed(2)} €</p>
        <p style="color:#666">Paris Casa Transport - Votre pont entre le Maroc et la France</p>
      </div>
    `,
  })
}

export async function sendAdminNotification(data: any) {
  const resend = getResend()
  return resend.emails.send({
    from: fromEmail,
    to: fromEmail,
    subject: `Nouveau devis - ${data.full_name}`,
    html: `
      <div style="font-family:Inter,sans-serif;padding:24px">
        <h2>Nouveau devis reçu</h2>
        <p><strong>Nom:</strong> ${data.full_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <p><strong>Type:</strong> ${data.shipment_type}</p>
        <p><strong>Estimation:</strong> ${data.estimated_price?.toFixed(2)} €</p>
      </div>
    `,
  })
}
