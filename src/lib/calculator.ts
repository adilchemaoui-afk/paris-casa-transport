export interface QuoteInput {
  shipment_type: string
  weight_kg: number
  volume_m3: number
  package_count: number
  fragile: boolean
  urgent: boolean
  insurance_option: boolean
  service_level: 'standard' | 'express' | 'premium'
  declared_value: number
}

const BASE_RATES: Record<string, number> = {
  'colis_poids': 15,
  'encombrant': 45,
  'valeur': 25,
  'lettres': 8,
  'hightech': 35,
}

const SERVICE_MULTIPLIERS: Record<string, number> = {
  'standard': 1.0,
  'express': 1.5,
  'premium': 2.0,
}

export function calculateQuote(input: QuoteInput): {
  base_price: number
  weight_cost: number
  volume_cost: number
  urgent_cost: number
  fragile_cost: number
  insurance_cost: number
  service_multiplier: number
  total: number
  currency: string
} {
  const basePrice = BASE_RATES[input.shipment_type] || 15
  const weightCost = input.weight_kg * 2.5
  const volumeCost = input.volume_m3 * 80
  const fragileCost = input.fragile ? input.weight_kg * 1.5 : 0
  const urgentCost = input.urgent ? 35 : 0
  const insuranceCost = input.insurance_option ? input.declared_value * 0.02 : 0
  const serviceMultiplier = SERVICE_MULTIPLIERS[input.service_level] || 1.0

  const subtotal = basePrice + weightCost + volumeCost + fragileCost + urgentCost + insuranceCost
  const total = Math.max(25, subtotal * serviceMultiplier)

  return {
    base_price: basePrice,
    weight_cost: weightCost,
    volume_cost: volumeCost,
    urgent_cost: urgentCost,
    fragile_cost: fragileCost,
    insurance_cost: insuranceCost,
    service_multiplier: serviceMultiplier,
    total: Math.round(total * 100) / 100,
    currency: 'EUR',
  }
}
