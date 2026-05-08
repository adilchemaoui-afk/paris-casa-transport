import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PhoneButton } from '@/components/PhoneButton'

export const metadata: Metadata = {
  title: 'Paris Casa Transport | Transport de marchandises Maroc-France',
  description: 'Transport premium de marchandises entre le Maroc et la France. Devis rapide, fiabilité garantie, délais respectés.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <PhoneButton />
      </body>
    </html>
  )
}
