'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteSchema } from '@/lib/schema'
import type { z } from 'zod'

import { calculateQuote } from '@/lib/calculator'
import { ArrowRight, CheckCircle, AlertCircle, Phone } from 'lucide-react'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'

export default function DevisPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  type QuoteForm = z.infer<typeof quoteSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      shipment_type: 'colis_poids',
      origin_country: 'Maroc',
      origin_city: 'Casablanca',
      destination_country: 'France',
      destination_city: 'Paris',
      weight_kg: 5,
      volume_m3: 0.1,
      package_count: 1,
      declared_value: 0,
      fragile: false,
      urgent: false,
      insurance_option: false,
      service_level: 'standard',
    },
  })

  const formData = watch()
  const quote = calculateQuote({
    shipment_type: formData.shipment_type || 'colis_poids',
    weight_kg: Number(formData.weight_kg) || 0,
    volume_m3: Number(formData.volume_m3) || 0,
    package_count: Number(formData.package_count) || 1,
    declared_value: Number(formData.declared_value) || 0,
    fragile: formData.fragile || false,
    urgent: formData.urgent || false,
    insurance_option: formData.insurance_option || false,
    service_level: (formData.service_level as any) || 'standard',
  })

  async function onSubmit(data: any) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, estimated_price: quote.total, currency: 'EUR' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erreur serveur')
      setResult(json)
      setSubmitted(true)
    } catch (e: any) {
      setError(e.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-moroccan-gold/20">
            <div className="w-16 h-16 bg-moroccan-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-moroccan-red mb-2">Demande envoyée !</h1>
            <p className="text-gray-600 mb-6">
              Votre devis estimé à <strong className="text-moroccan-red">{quote.total.toFixed(2)} €</strong> a été enregistré.
              Notre équipe vous contactera sous 24h au {phone}.
            </p>
            <a href="/" className="inline-block bg-moroccan-red text-white px-6 py-3 rounded-xl font-medium hover:bg-moroccan-red-light transition-colors">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-8 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-moroccan-red mb-2">Obtenir un devis</h1>
          <p className="text-gray-600">Remplissez le formulaire ci-dessous. Réponse sous 24h.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-2 text-red-700">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
              <input {...register('full_name')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{String(errors.full_name.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" {...register('email')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
              <input {...register('phone')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{String(errors.phone.message)}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input {...register('company_name')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-deep-brown mb-4">Détails de l'expédition</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de marchandise *</label>
                <select {...register('shipment_type')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none">
                  <option value="colis_poids">Colis au poids</option>
                  <option value="encombrant">Encombrant</option>
                  <option value="valeur">Objet de valeur</option>
                  <option value="lettres">Lettres & documents</option>
                  <option value="hightech">High-tech</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de colis *</label>
                <input type="number" min="1" {...register('package_count', { valueAsNumber: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays d'origine *</label>
                <input {...register('origin_country')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville d'origine *</label>
                <input {...register('origin_city')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination *</label>
                <input {...register('destination_country')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville de destination *</label>
                <input {...register('destination_city')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids total (kg) *</label>
                <input type="number" step="0.1" {...register('weight_kg', { valueAsNumber: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m³)</label>
                <input type="number" step="0.01" {...register('volume_m3', { valueAsNumber: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valeur déclarée (€)</label>
                <input type="number" {...register('declared_value', { valueAsNumber: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-moroccan-gold/50">
                <input type="checkbox" {...register('fragile')} className="w-5 h-5 accent-moroccan-red" />
                <span className="text-sm">Fragile</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-moroccan-gold/50">
                <input type="checkbox" {...register('urgent')} className="w-5 h-5 accent-moroccan-red" />
                <span className="text-sm">Urgent</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-moroccan-gold/50">
                <input type="checkbox" {...register('insurance_option')} className="w-5 h-5 accent-moroccan-red" />
                <span className="text-sm">Assurance complète</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de service *</label>
              <select {...register('service_level')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none">
                <option value="standard">Standard (5-7 jours)</option>
                <option value="express">Express (2-3 jours)</option>
                <option value="premium">Premium (24-48h)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes complémentaires</label>
            <textarea {...register('notes')} rows={3} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" placeholder="Informations supplémentaires..." />
          </div>

          <div className="bg-cream rounded-xl p-4 border border-moroccan-gold/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Estimation totale</span>
              <span className="text-2xl font-bold text-moroccan-red">{quote.total.toFixed(2)} €</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Prix indicatif, sujet à validation par notre équipe commerciale.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-moroccan-red text-white py-4 rounded-xl font-semibold text-lg hover:bg-moroccan-red-light transition-colors shadow-lg shadow-moroccan-red/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? 'Envoi en cours...' : (
              <> Envoyer ma demande <ArrowRight size={20} /> </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
