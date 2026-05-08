'use client'

import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'
const company = process.env.COMPANY_NAME || 'Paris Casa Transport'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-moroccan-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-serif font-bold text-moroccan-red">
              {company}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-moroccan-red transition-colors">
              Services
            </Link>
            <Link href="/devis" className="text-sm font-medium text-gray-700 hover:text-moroccan-red transition-colors">
              Devis
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-moroccan-red transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-moroccan-red font-semibold">
              <Phone size={18} />
              <span>{phone}</span>
            </a>
            <Link
              href="/devis"
              className="bg-moroccan-red text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-moroccan-red-light transition-colors shadow-lg shadow-moroccan-red/20"
            >
              Obtenir mon devis
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/services" className="block text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/devis" className="block text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Devis</Link>
          <Link href="/contact" className="block text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-moroccan-red font-semibold pt-2">
            <Phone size={18} /> {phone}
          </a>
          <Link href="/devis" className="block bg-moroccan-red text-white text-center py-3 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
            Obtenir mon devis
          </Link>
        </div>
      )}
    </header>
  )
}
