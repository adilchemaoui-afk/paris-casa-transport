'use client'

import Link from 'next/link'
import { Phone, Menu, X, MapPin, FileText, MessageSquare, Home, Truck } from 'lucide-react'
import { useState } from 'react'

const phone = process.env.COMMERCIAL_PHONE || '0753256897'
const company = process.env.COMPANY_NAME || 'Paris Casa Livraison'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/services', label: 'Services', icon: Truck },
    { href: '/devis', label: 'Devis', icon: FileText },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-deep-brown via-deep-brown to-moroccan-red text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-moroccan-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <MapPin size={20} className="text-deep-brown" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-serif font-bold tracking-tight">
                {company}
              </span>
              <span className="text-[10px] text-moroccan-gold tracking-widest uppercase -mt-1 hidden lg:block">
                Transport Maroc–France
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-moroccan-gold font-semibold hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-moroccan-gold/20 rounded-full flex items-center justify-center">
                <Phone size={14} className="text-moroccan-gold" />
              </div>
              <span className="text-sm">{phone.replace(/(\d{2})(?=\d)/g, '$1 ')}</span>
            </a>
            <Link
              href="/devis"
              className="bg-moroccan-gold text-deep-brown px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-lg"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-deep-brown border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span className="font-medium">{link.label}</span>
              </Link>
            )
          })}
          <div className="border-t border-white/10 pt-3 mt-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 px-4 py-3 text-moroccan-gold font-semibold"
            >
              <Phone size={18} />
              {phone.replace(/(\d{2})(?=\d)/g, '$1 ')}
            </a>
            <Link
              href="/devis"
              className="block bg-moroccan-gold text-deep-brown text-center py-3 rounded-xl font-semibold mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
