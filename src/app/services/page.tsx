import { Package, Truck, Shield, Clock, FileText, Monitor, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'

const services = [
  {
    icon: Package,
    title: 'Colis au poids',
    subtitle: 'De 0.5kg à 30kg',
    description: 'Idéal pour les envois réguliers : vêtements, accessoires, petits objets. Tarifs dégressifs dès 5 colis envoyés. Suivi en temps réel pour chaque envoi.',
    features: ['Tarifs dégressifs', 'Suivi GPS', 'Livraison porte-à-porte', 'Signature électronique'],
    priceFrom: 'À partir de 15€',
    color: 'bg-moroccan-red',
  },
  {
    icon: Truck,
    title: 'Colis encombrants',
    subtitle: 'Meubles, machines, palettes',
    description: 'Transport de meubles, équipements professionnels, marchandises sur palette. Manutention et emballage professionnel inclus.',
    features: ['Manutention incluse', 'Emballage renforcé', 'Monte-meuble sur demande', 'Assurance complète'],
    priceFrom: 'À partir de 45€',
    color: 'bg-moroccan-green',
  },
  {
    icon: Shield,
    title: 'Objets de valeur',
    subtitle: 'Montres, bijoux, art',
    description: 'Transport sécurisé avec double emballage et scellement. Assurance à la valeur déclarée. Convoi sécurisé sur demande.',
    features: ['Double scellement', 'Assurance valeur réelle', 'Convoi sécurisé', 'Confidentialité garantie'],
    priceFrom: 'À partir de 25€',
    color: 'bg-moroccan-gold',
  },
  {
    icon: FileText,
    title: 'Lettres et documents',
    subtitle: 'Courrier confidentiel',
    description: 'Transport sécurisé de documents administratifs, contrats, dossiers. Traçabilité complète et livraison contre signature.',
    features: ['Enveloppe sécurisée', 'Numéro de suivi', 'Livraison certifiée', 'Archivage 30 jours'],
    priceFrom: 'À partir de 8€',
    color: 'bg-zellige-teal',
  },
  {
    icon: Monitor,
    title: 'High-tech',
    subtitle: 'Électronique et ordinateurs',
    description: 'Emballage anti-choc et anti-statique pour ordinateurs, écrans, téléphones, composants électroniques. Garantie sans casse.',
    features: ['Emballage anti-choc', 'Protection anti-statique', 'Garantie casse', 'Test fonctionnel'],
    priceFrom: 'À partir de 35€',
    color: 'bg-deep-brown',
  },
  {
    icon: Clock,
    title: 'Express 24h',
    subtitle: 'Livraison prioritaire',
    description: 'Service premium pour les urgences. Enlèvement dans l\'heure, livraison sous 24h entre Paris et Casablanca.',
    features: ['Enlèvement < 1h', 'Livraison 24h', 'Suivi temps réel', 'Support dédié'],
    priceFrom: 'Sur devis',
    color: 'bg-moroccan-red-light',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-moroccan-red to-deep-brown text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-4">
            Nos services de transport
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une solution adaptée à chaque besoin. Du petit colis au transport industriel, nous avons la réponse.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-shadow border border-moroccan-gold/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${service.color} text-white p-3 rounded-xl shrink-0`}>
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-deep-brown">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-moroccan-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-moroccan-red font-bold">{service.priceFrom}</span>
                  <Link
                    href="/devis"
                    className="text-sm font-medium text-moroccan-gold hover:text-moroccan-red transition-colors flex items-center gap-1"
                  >
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-moroccan-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
            Besoin d'un service sur mesure ?
          </h2>
          <p className="text-gray-200 mb-8">
            Contactez notre équipe commerciale pour un devis personnalisé adapté à vos besoins spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="bg-moroccan-gold text-deep-brown px-8 py-4 rounded-xl font-semibold hover:bg-moroccan-gold-light transition-colors">
              Obtenir un devis
            </Link>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone size={20} /> {phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
