import { z } from 'zod'

export const quoteSchema = z.object({
  full_name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone requis'),
  company_name: z.string().optional(),
  shipment_type: z.enum(['colis_poids', 'encombrant', 'valeur', 'lettres', 'hightech']),
  origin_country: z.string().min(1),
  origin_city: z.string().min(1),
  destination_country: z.string().min(1),
  destination_city: z.string().min(1),
  weight_kg: z.number().min(0.1),
  volume_m3: z.number().min(0),
  declared_value: z.number().min(0),
  package_count: z.number().int().min(1),
  fragile: z.boolean().default(false),
  urgent: z.boolean().default(false),
  insurance_option: z.boolean().default(false),
  service_level: z.enum(['standard', 'express', 'premium']),
  notes: z.string().optional(),
})

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(6, 'Téléphone requis'),
  message: z.string().min(10, 'Message trop court'),
})
