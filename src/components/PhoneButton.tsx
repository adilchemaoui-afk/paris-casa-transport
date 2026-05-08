'use client'

import { Phone } from 'lucide-react'

const phone = process.env.COMMERCIAL_PHONE || '+33 6 12 34 56 78'

export function PhoneButton() {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, '')}`}
      className="fixed bottom-6 right-6 z-50 bg-moroccan-green text-white p-4 rounded-full shadow-xl shadow-moroccan-green/30 hover:scale-110 transition-transform lg:hidden"
      aria-label="Appeler le commercial"
    >
      <Phone size={24} />
    </a>
  )
}
