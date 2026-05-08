'use client'

import { useState } from 'react'
import { calculateQuote, type QuoteInput } from '@/lib/calculator'
import { ChevronRight, Package, Truck, Shield, Clock, ArrowRight } from 'lucide-react'

const SHIPMENT_TYPES = [
  { value: 'colis_poids', label: 'Colis au poids', desc: 'Jusqu\'à 30kg' },
  { value: 'encombrant', label: 'Encombrant', desc: 'Meubles, équipements' },
  { value: 'valeur', label: 'Objet de valeur', desc: 'Montres, bijoux, art' },
  { value: 'lettres', label: 'Lettres & documents', desc: 'Courrier confidentiel' },
  { value: 'hightech', label: 'High-tech', desc: 'Électronique, ordinateurs' },
]

const SERVICE_LEVELS = [
  { value: 'standard', label: 'Standard', desc: '5-7 jours', multiplier: 1 },
  { value: 'express', label: 'Express', desc: '2-3 jours', multiplier: 1.5 },
  { value: 'premium', label: 'Premium', desc: '24-48h', multiplier: 2 },
]

export function QuoteSimulator() {
  const [form, setForm] = useState<Partial<QuoteInput>>({
    shipment_type: 'colis_poids',
    weight_kg: 5,
    volume_m3: 0.1,
    package_count: 1,
    declared_value: 0,
    fragile: false,
    urgent: false,
    insurance_option: false,
    service_level: 'standard',
  })
  const [showDetails, setShowDetails] = useState(false)

  const quote = form.shipment_type && form.weight_kg && form.volume_m3 !== undefined
    ? calculateQuote(form as QuoteInput)
    : null

  return (
    <section className="py-16 lg:py-24 bg-white zellige-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-moroccan-red mb-4">
            Simulez votre devis en 30 secondes
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Obtenez une estimation instantanée pour votre transport Maroc-France. Pas d'inscription requise.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-moroccan-red/10 border border-moroccan-gold/20 p-6 lg:p-10">
          <div className="space-y-6">
            {/* Type de marchandise */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Type de marchandise
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {SHIPMENT_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setForm({ ...form, shipment_type: type.value })}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      form.shipment_type === type.value
                        ? 'border-moroccan-red bg-moroccan-red/5 text-moroccan-red'
                        : 'border-gray-200 hover:border-moroccan-gold/50'
                    }`}
                  >
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Poids et volume */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Poids total (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={form.weight_kg}
                  onChange={(e) => setForm({ ...form, weight_kg: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Volume (m³)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.volume_m3}
                  onChange={(e) => setForm({ ...form, volume_m3: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-moroccan-gold/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={form.fragile}
                  onChange={(e) => setForm({ ...form, fragile: e.target.checked })}
                  className="w-5 h-5 text-moroccan-red rounded accent-moroccan-red"
                />
                <div>
                  <div className="font-medium text-sm">Fragile</div>
                  <div className="text-xs text-gray-500">+ protection</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-moroccan-gold/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={form.urgent}
                  onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                  className="w-5 h-5 text-moroccan-red rounded accent-moroccan-red"
                />
                <div>
                  <div className="font-medium text-sm">Urgent</div>
                  <div className="text-xs text-gray-500">Traitement prioritaire</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-moroccan-gold/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={form.insurance_option}
                  onChange={(e) => setForm({ ...form, insurance_option: e.target.checked })}
                  className="w-5 h-5 text-moroccan-red rounded accent-moroccan-red"
                />
                <div>
                  <div className="font-medium text-sm">Assurance</div>
                  <div className="text-xs text-gray-500">2% de la valeur</div>
                </div>
              </label>
            </div>

            {/* Service level */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Niveau de service
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SERVICE_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setForm({ ...form, service_level: level.value as any })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      form.service_level === level.value
                        ? 'border-moroccan-red bg-moroccan-red/5 text-moroccan-red'
                        : 'border-gray-200 hover:border-moroccan-gold/50'
                    }`}
                  >
                    <div className="font-semibold">{level.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Résultat */}
          {quote && (
            <div className="mt-8 pt-8 border-t-2 border-moroccan-gold/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Estimation</span>
                <span className="text-3xl font-bold text-moroccan-red">
                  {quote.total.toFixed(2)} {quote.currency}
                </span>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-moroccan-gold hover:text-moroccan-red transition-colors flex items-center gap-1"
              >
                {showDetails ? 'Masquer' : 'Voir'} le détail
                <ChevronRight size={16} className={`transition-transform ${showDetails ? 'rotate-90' : ''}`} />
              </button>

              {showDetails && (
                <div className="mt-4 bg-cream rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Frais de base</span><span>{quote.base_price.toFixed(2)} €</span></div>
                  <div className="flex justify-between"><span>Poids ({form.weight_kg} kg)</span><span>{quote.weight_cost.toFixed(2)} €</span></div>
                  <div className="flex justify-between"><span>Volume ({form.volume_m3} m³)</span><span>{quote.volume_cost.toFixed(2)} €</span></div>
                  {quote.fragile_cost > 0 && <div className="flex justify-between"><span>Fragile</span><span>{quote.fragile_cost.toFixed(2)} €</span></div>}
                  {quote.urgent_cost > 0 && <div className="flex justify-between"><span>Urgent</span><span>{quote.urgent_cost.toFixed(2)} €</span></div>}
                  {quote.insurance_cost > 0 && <div className="flex justify-between"><span>Assurance</span><span>{quote.insurance_cost.toFixed(2)} €</span></div>}
                  <div className="flex justify-between text-moroccan-gold"><span>Multiplicateur service</span><span>×{quote.service_multiplier}</span></div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-moroccan-red">
                    <span>Total estimé</span>
                    <span>{quote.total.toFixed(2)} {quote.currency}</span>
                  </div>
                </div>
              )}

              <a
                href="/devis"
                className="mt-6 w-full bg-moroccan-red text-white py-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 hover:bg-moroccan-red-light transition-colors shadow-lg shadow-moroccan-red/20"
              >
                Obtenir mon devis détaillé
                <ArrowRight size={20} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
