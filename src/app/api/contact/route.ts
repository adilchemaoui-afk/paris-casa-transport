import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { contactSchema } from '@/lib/schema'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Données invalides' },
        { status: 400 }
      )
    }

    const data = validated.data

    // Try to insert into Supabase
    try {
      const supabase = getSupabase()
      await supabase
        .from('contact_requests')
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          status: 'new',
        } as any)
    } catch {
      // Supabase not configured
    }

    // Send notification email (best effort)
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    if (resendApiKey && !resendApiKey.includes('placeholder') && fromEmail) {
      try {
        const resend = new Resend(resendApiKey)
        await resend.emails.send({
          from: fromEmail,
          to: fromEmail,
          subject: `Nouveau contact — ${data.full_name}`,
          html: `
            <div style="font-family:Inter,sans-serif;padding:24px">
              <h2>Nouveau message de contact</h2>
              <p><strong>Nom:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Téléphone:</strong> ${data.phone}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message}</p>
            </div>
          `,
        })
      } catch {
        // Email failed silently
      }
    }

    return NextResponse.json({ success: true, message: 'Message envoyé' })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
