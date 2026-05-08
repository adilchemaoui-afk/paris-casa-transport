'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'
const company = process.env.COMPANY_NAME || 'Paris Casa Transport'
const email = 'contact@pariscasa-transport.com'

export function Footer() {
  return (
    <footer className="bg-deep-brown text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-serif font-bold text-moroccan-gold mb-4">{company}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Transport premium de marchandises entre le Maroc et la France. Fiabilité, sécurité et délais respectés.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-moroccan-gold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-moroccan-gold transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="hover:text-moroccan-gold transition-colors">Services</Link></li>
              <li><Link href="/devis" className="hover:text-moroccan-gold transition-colors">Devis</Link></li>
              <li><Link href="/contact" className="hover:text-moroccan-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-moroccan-gold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-moroccan-gold transition-colors">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-moroccan-gold transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-moroccan-gold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-moroccan-gold transition-colors">
                <Phone size={16} /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-moroccan-gold transition-colors">
                <Mail size={16} /> {email}
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Paris, France & Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {company}. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
