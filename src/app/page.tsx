import Link from 'next/link'
import { ArrowRight, Shield, Clock, MapPin, CheckCircle, Star, Phone, Truck, Route, Calendar, Euro, Info } from 'lucide-react'
import { QuoteSimulator } from '@/components/QuoteSimulator'
import { MoroccoMapFull } from '@/components/MoroccoMapFull'

const phone = process.env.COMMERCIAL_PHONE || '0753256897'
const phoneFormatted = phone.replace(/(\d{2})(?=\d)/g, '$1 ')

export default function HomePage() {
  return (
    <div>
      {/* HERO — Image Hassan II en background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/hassan-ii-mosque.jpg"
            alt="Mosquée Hassan II de Casablanca"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-brown/95 via-deep-brown/80 to-deep-brown/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 via-transparent to-deep-brown/30" />
        </div>

        {/* Contenu */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-moroccan-gold/20 border border-moroccan-gold/40 text-moroccan-gold px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Truck size={16} />
              Transport routier Maroc — France
            </div>

            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6 text-white">
              Paris Casa
              <span className="block text-moroccan-gold mt-2">Livraison</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Transport de marchandises entre Casablanca et Paris par la route.
              Spécialistes des envois pour les MRE et les professionnels.
              Devis instantané, suivi en temps réel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/devis"
                className="bg-moroccan-gold text-deep-brown px-8 py-4 rounded-xl font-semibold text-center hover:bg-white transition-colors shadow-xl shadow-moroccan-gold/20 flex items-center justify-center gap-2"
              >
                Calculer mon devis
                <ArrowRight size={20} />
              </Link>
              <a
                href={`tel:${phone}`}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone size={16} />
                </div>
                {phoneFormatted}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-gray-300">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Shield size={16} className="text-moroccan-gold" />
                <span>Marchandises assurées</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Clock size={16} className="text-moroccan-gold" />
                <span>Livraison 24–72h</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                <MapPin size={16} className="text-moroccan-gold" />
                <span>Porte-à-porte</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ArrowRight size={16} className="rotate-90" />
        </div>
      </section>

      {/* SIMULATEUR */}
      <QuoteSimulator />

      {/* SECTION MRE — Infos voyages Maroc-France */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-moroccan-red/10 text-moroccan-red px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Info size={16} />
              Informations MRE
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-deep-brown mb-4">
              Voyagez sereinement entre le Maroc et la France
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conseils pratiques pour les Marocains Résidant à l'Étranger qui empruntent la route pour rejoindre leur famille.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Carte du Maroc */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-moroccan-gold/10">
              <h3 className="text-xl font-semibold text-deep-brown mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-moroccan-red" />
                La route France — Maroc
              </h3>
              <MoroccoMapFull />
              <p className="text-sm text-gray-500 mt-4 text-center">
                Itinéraire principal : Paris → Lyon → Marseille → Gênes/Barcelone → Algeciras → Tanger → Casablanca
              </p>
            </div>

            {/* Infos pratiques */}
            <div className="space-y-4">
              {[
                {
                  icon: Route,
                  title: 'Itinéraire classique',
                  desc: 'Paris → Lyon (460 km) → Marseille (315 km) → traversée Espagne → ferry Algeciras–Tanger (1h) → Casablanca (340 km). Total : ~2 400 km.',
                  color: 'text-blue-600 bg-blue-50'
                },
                {
                  icon: Clock,
                  title: 'Durée du trajet',
                  desc: 'En camion/véhicule utilitaire : 3 à 4 jours selon les escales. Ferry Algeciras–Tanger Med : réservation conseillée en été.',
                  color: 'text-amber-600 bg-amber-50'
                },
                {
                  icon: Calendar,
                  title: 'Meilleures périodes',
                  desc: 'Évitez juillet–août (embouteillages aux frontières). Privilégiez mai–juin ou septembre–octobre.',
                  color: 'text-green-600 bg-green-50'
                },
                {
                  icon: Euro,
                  title: 'Coûts à prévoir',
                  desc: 'Péages Espagne/France : ~200€. Ferry véhicule utilitaire : 150–300€ selon taille. Carburant : ~400€.',
                  color: 'text-purple-600 bg-purple-50'
                },
                {
                  icon: Shield,
                  title: 'Documents obligatoires',
                  desc: 'Carte grise, assurance verte, passeport valide 3 mois min., permis international si nécessaire. Carnet de passage en douane pour marchandises.',
                  color: 'text-red-600 bg-red-50'
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bloc spécial opération Marhaba */}
          <div className="bg-gradient-to-r from-moroccan-red to-deep-brown rounded-2xl p-8 lg:p-10 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3">
                <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
                  Opération Marhaba — Transport de marchandises
                </h3>
                <p className="text-gray-200 leading-relaxed mb-4">
                  Pendant la période estivale, de nombreux MRE souhaitent envoyer des marchandises (meubles, appareils électroménagers, colis) à leur famille restée au Maroc. 
                  Paris Casa Livraison propose un service dédié avec ramassage à domicile en France et livraison dans toutes les villes marocaines.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Ramassage à domicile', 'Emballage professionnel', 'Assurance incluse', 'Livraison 5–7 jours'].map((tag, i) => (
                    <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/3 flex flex-col gap-3 w-full">
                <Link
                  href="/devis"
                  className="bg-moroccan-gold text-deep-brown px-6 py-4 rounded-xl font-semibold text-center hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Devis Marhaba
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`tel:${phone}`}
                  className="border-2 border-white/30 px-6 py-4 rounded-xl font-semibold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  {phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-moroccan-gold/10 group cursor-pointer">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                <h3 className="text-lg font-semibold text-deep-brown mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
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
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-moroccan-gold text-deep-brown rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">{s.step}</div>
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
              <div key={i} className="group">
                <div className="text-3xl lg:text-5xl font-bold text-moroccan-gold mb-1 group-hover:scale-110 transition-transform inline-block">{stat.value}</div>
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
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-moroccan-gold/10 hover:shadow-lg transition-shadow">
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
              <div key={i} className="bg-cream rounded-xl p-5 hover:bg-moroccan-gold/5 transition-colors">
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
      <section className="py-16 bg-gradient-to-br from-moroccan-red to-deep-brown text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 zellige-pattern opacity-5" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Prêt à expédier ?
          </h2>
          <p className="text-gray-200 mb-8">
            Obtenez votre devis en moins d'une minute. Notre équipe vous rappelle sous 2h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="bg-moroccan-gold text-deep-brown px-8 py-4 rounded-xl font-semibold hover:bg-white transition-colors shadow-xl flex items-center justify-center gap-2">
              Calculer mon devis
              <ArrowRight size={20} />
            </Link>
            <a href={`tel:${phone}`} className="border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone size={20} />
              {phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
