'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/schema'
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

const phone = process.env.COMMERCIAL_PHONE || '0753256897'
const email = 'adc.lecolibri@gmail.com'
const company = process.env.COMPANY_NAME || 'Paris Casa Livraison'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: any) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erreur serveur')
      setSubmitted(true)
    } catch (e: any) {
      setError(e.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-moroccan-red to-deep-brown text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Notre équipe vous répond sous 2h en journée. Pour une demande de devis rapide, appelez directement.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-moroccan-red mb-6">
                Nos coordonnées
              </h2>
              <div className="space-y-6">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-moroccan-gold/10">
                  <div className="bg-moroccan-red text-white p-3 rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-deep-brown">Rachid</div>
                    <div className="text-moroccan-red font-bold text-lg">{phone}</div>
                    <div className="text-sm text-gray-500">Lun–Ven, 8h–20h</div>
                  </div>
                </a>

                <a href={`tel:0752336725`} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-moroccan-gold/10">
                  <div className="bg-moroccan-green text-white p-3 rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-deep-brown">Amine</div>
                    <div className="text-moroccan-red font-bold text-lg">0752336725</div>
                    <div className="text-sm text-gray-500">Lun–Ven, 8h–20h</div>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-moroccan-gold/10">
                  <div className="bg-moroccan-gold text-deep-brown p-3 rounded-xl shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-deep-brown">Email</div>
                    <div className="text-moroccan-red font-medium">{email}</div>
                    <div className="text-sm text-gray-500">Réponse sous 2h</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-moroccan-gold/10">
                  <div className="bg-moroccan-gold text-deep-brown p-3 rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-deep-brown">Bureaux</div>
                    <div className="text-gray-700">Paris, France</div>
                    <div className="text-gray-700">Casablanca, Maroc</div>
                    <div className="text-sm text-moroccan-red mt-1">Couverture : Tanger → Laâyoune (Lagouira)</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-moroccan-red mb-6">
                Envoyer un message
              </h2>

              {submitted ? (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-moroccan-gold/20 text-center">
                  <div className="w-16 h-16 bg-moroccan-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-deep-brown mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-4">
                    Nous vous répondrons sous 2h au plus tard.
                  </p>
                  <a href="/" className="inline-block bg-moroccan-red text-white px-6 py-3 rounded-xl font-medium hover:bg-moroccan-red-light transition-colors">
                    Retour à l'accueil
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700 text-sm">
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}

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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input {...register('phone')} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{String(errors.phone.message)}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea {...register('message')} rows={4} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none" placeholder="Décrivez votre besoin..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{String(errors.message.message)}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-moroccan-red text-white py-4 rounded-xl font-semibold hover:bg-moroccan-red-light transition-colors shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Envoi en cours...' : (
                      <> Envoyer <Send size={18} /> </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
