import Link from 'next/link'
import { ArrowRight, Shield, Clock, MapPin, CheckCircle, Star, Phone } from 'lucide-react'
import { QuoteSimulator } from '@/components/QuoteSimulator'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-moroccan-red via-moroccan-red-light to-deep-brown text-white overflow-hidden">
        <div className="absolute inset-0 zellige-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Transport Maroc–France
              <span className="block text-moroccan-gold">Premium & Fiable</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
              Vos marchandises livrées entre Casablanca et Paris en toute sécurité.
              Devis instantané, suivi en temps réel, et une équipe dédiée à votre service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/devis"
                className="bg-moroccan-gold text-deep-brown px-8 py-4 rounded-xl font-semibold text-center hover:bg-moroccan-gold-light transition-colors shadow-lg"
              >
                Obtenir mon devis
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-gray-300">
              <div className="flex items-center gap-2"><Shield size={18} /> Assuré</div>
              <div className="flex items-center gap-2"><Clock size={18} /> 24-72h</div>
              <div className="flex items-center gap-2"><MapPin size={18} /> Porte-à-porte</div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATEUR */}
      <QuoteSimulator />

      {/* SERVICES */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-moroccan-red mb-4">Nos services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une solution adaptée à chaque type de marchandise, du simple colis au transport haut de gamme.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Colis au poids', desc: 'De 0.5kg à 30kg. Tarifs dégressifs dès 5 colis.', icon: '📦' },
              { title: 'Encombrants', desc: 'Meubles, machines, palettes. Manutention incluse.', icon: '🪑' },
              { title: 'Objets de valeur', desc: 'Montres, bijoux, art. Transport sécurisé et assuré.', icon: '💎' },
              { title: 'Lettres & Documents', desc: 'Courrier confidentiel et administratif. Traçabilité garantie.', icon: '📨' },
              { title: 'High-tech', desc: 'Ordinateurs, téléphones, écrans. Emballage anti-choc.', icon: '💻' },
              { title: 'Express 24h', desc: 'Livraison prioritaire pour les urgences.', icon: '⚡' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-moroccan-gold/10">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-semibold text-deep-brown mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="py-16 lg:py-24 bg-white zellige-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-moroccan-red mb-4">Comment ça marche</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Devis', desc: 'Simulez votre prix en 30 secondes ou demandez un devis personnalisé.' },
              { step: '2', title: 'Réservation', desc: 'Confirmez par téléphone ou en ligne. Nous planifions l\'enlèvement.' },
              { step: '3', title: 'Transport', desc: 'Votre marchandise est prise en charge, assurée et suivie.' },
              { step: '4', title: 'Livraison', desc: 'Livraison à domicile ou sur site avec signature et photo.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-moroccan-gold text-deep-brown rounded-full flex items-center justify-center text-xl font-bold">{s.step}</div>
                <h3 className="text-lg font-semibold text-deep-brown mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="py-16 bg-moroccan-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10 000+', label: 'Colis livrés' },
              { value: '99.2%', label: 'Taux de satisfaction' },
              { value: '48h', label: 'Délai moyen' },
              { value: '0', label: 'Colis perdus' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl font-bold text-moroccan-gold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-moroccan-red mb-4">Ils nous font confiance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Karim B.', role: 'Importateur, Casablanca', text: 'Service impeccable. Mes colis arrivent toujours à temps, et le suivi est vraiment rassurant.' },
              { name: 'Sophie L.', role: 'E-commerçante, Paris', text: 'Je fais appel à eux chaque semaine pour mes envois vers le Maroc. Jamais déçue.' },
              { name: 'Ahmed T.', role: 'Artisan, Marrakech', text: 'Transport de pièces fragiles sans aucun problème. Pro et sérieux.' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-moroccan-gold/10">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-moroccan-gold fill-moroccan-gold" />)}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">"{t.text}"</p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-moroccan-red mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Quels sont les délais de livraison ?', a: 'Standard : 5-7 jours. Express : 2-3 jours. Premium : 24-48h selon la destination.' },
              { q: 'Quels types de marchandises acceptez-vous ?', a: 'Tout sauf matières dangereuses interdites. Nous transportons colis, meubles, high-tech, documents, objets de valeur.' },
              { q: 'L\'assurance est-elle incluse ?', a: 'Tous les envois sont assurés de base. L\'assurance premium couvre la valeur déclarée à 100%.' },
              { q: 'Comment suivre mon colis ?', a: 'Vous recevez un numéro de suivi dès l\'expédition. Suivi en temps réel par email et SMS.' },
              { q: 'Quels sont les délais de livraison ?', a: 'Standard : 5-7 jours. Express : 2-3 jours. Premium : 24-48h selon la destination.' },
            ].map((faq, i) => (
              <div key={i} className="bg-cream rounded-xl p-5">
                <h3 className="font-semibold text-deep-brown mb-2 flex items-start gap-2">
                  <CheckCircle size={18} className="text-moroccan-green shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-moroccan-red text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Prêt à expédier ?
          </h2>
          <p className="text-gray-200 mb-8">
            Obtenez votre devis en moins d'une minute. Notre équipe vous rappelle sous 2h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="bg-moroccan-gold text-deep-brown px-8 py-4 rounded-xl font-semibold hover:bg-moroccan-gold-light transition-colors">
              Calculer mon devis
              <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone size={20} />
              {phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
