import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { sendQuoteConfirmation, sendAdminNotification } from '@/lib/resend'
import { quoteSchema } from '@/lib/schema'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = quoteSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validated.error.flatten() },
        { status: 400 }
      )
    }

    const data = validated.data
    let quoteId = null

    // Try to insert into Supabase
    try {
      const supabase = getSupabase()
      const { data: quote, error: dbError } = await supabase
        .from('quotes')
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          company_name: data.company_name || null,
          shipment_type: data.shipment_type,
          origin_country: data.origin_country,
          origin_city: data.origin_city,
          destination_country: data.destination_country,
          destination_city: data.destination_city,
          weight_kg: data.weight_kg,
          volume_m3: data.volume_m3,
          declared_value: data.declared_value,
          package_count: data.package_count,
          fragile: data.fragile,
          urgent: data.urgent,
          insurance_option: data.insurance_option,
          service_level: data.service_level,
          estimated_price: body.estimated_price || 0,
          currency: body.currency || 'EUR',
          status: 'new',
          notes: data.notes || null,
        } as any)
        .select()
        .single()

      if (!dbError && quote) {
        quoteId = (quote as any).id
      }
    } catch {
      // Supabase not configured, continue without persistence
    }

    // Send emails (best effort)
    try {
      await sendQuoteConfirmation(data.email, { ...data, estimated_price: body.estimated_price })
    } catch {
      // Email not configured
    }
    try {
      await sendAdminNotification({ ...data, estimated_price: body.estimated_price })
    } catch {
      // Email not configured
    }

    return NextResponse.json({
      success: true,
      quote_id: quoteId,
      message: 'Demande enregistrée',
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
