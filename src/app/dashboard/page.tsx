'use client'

import { useState, useEffect } from 'react'
import { Eye, Mail, Phone, User, Calendar, Package, MapPin, Euro, Shield, CheckCircle, Clock, AlertCircle, Lock } from 'lucide-react'

type Contact = {
  id: string
  full_name: string
  email: string
  phone: string
  message: string
  status: string
  created_at: string
}

type Quote = {
  id: string
  full_name: string
  email: string
  phone: string
  company_name?: string
  shipment_type: string
  origin_city: string
  destination_city: string
  estimated_price: number
  currency: string
  status: string
  created_at: string
  urgent: boolean
  fragile: boolean
}

export default function DashboardPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [tab, setTab] = useState<'contacts' | 'quotes'>('contacts')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { 'x-dashboard-password': password }
      })
      if (!res.ok) throw new Error('Mot de passe incorrect')
      setAuthenticated(true)
      localStorage.setItem('dashboard_pw', password)
      loadData(password)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadData(pw: string) {
    setLoading(true)
    try {
      const [cRes, qRes] = await Promise.all([
        fetch('/api/admin/contacts', { headers: { 'x-dashboard-password': pw } }),
        fetch('/api/admin/quotes', { headers: { 'x-dashboard-password': pw } })
      ])
      const cData = await cRes.json()
      const qData = await qRes.json()
      setContacts(cData.contacts || [])
      setQuotes(qData.quotes || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_pw')
    if (saved) {
      setPassword(saved)
      setAuthenticated(true)
      loadData(saved)
    }
  }, [])

  async function updateContactStatus(id: string, status: string) {
    const pw = localStorage.getItem('dashboard_pw') || password
    const res = await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-dashboard-password': pw },
      body: JSON.stringify({ id, status })
    })
    if (res.ok) loadData(pw)
  }

  async function updateQuoteStatus(id: string, status: string) {
    const pw = localStorage.getItem('dashboard_pw') || password
    const res = await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-dashboard-password': pw },
      body: JSON.stringify({ id, status })
    })
    if (res.ok) loadData(pw)
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString('fr-FR')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-moroccan-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-deep-brown">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2">Paris Casa Livraison</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-moroccan-red focus:outline-none"
            />
            {error && <div className="text-red-600 text-sm flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}
            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-moroccan-red text-white py-3 rounded-xl font-semibold hover:bg-moroccan-red-light transition-colors disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-deep-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-moroccan-gold" />
            <h1 className="text-xl font-serif font-bold">Dashboard — Paris Casa Livraison</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{contacts.length} contacts</span>
            </div>
            <div className="flex items-center gap-2">
              <Package size={16} />
              <span>{quotes.length} devis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab('contacts')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              tab === 'contacts'
                ? 'bg-moroccan-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Mail size={18} className="inline mr-2" />
            Contacts ({contacts.length})
          </button>
          <button
            onClick={() => setTab('quotes')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              tab === 'quotes'
                ? 'bg-moroccan-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package size={18} className="inline mr-2" />
            Devis ({quotes.length})
          </button>
        </div>

        {loading && <div className="text-center py-12 text-gray-500">Chargement...</div>}
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 mb-6">{error}</div>}

        {tab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Nom</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Message</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-moroccan-red" />
                          <span className="font-medium">{c.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-moroccan-red hover:underline">
                            <Mail size={14} /> {c.email}
                          </a>
                          <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-moroccan-red">
                            <Phone size={14} /> {c.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-gray-700 truncate">{c.message}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(c.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status}
                          onChange={(e) => updateContactStatus(c.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                            c.status === 'new'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : c.status === 'read'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : c.status === 'replied'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          <option value="new">Nouveau</option>
                          <option value="read">Lu</option>
                          <option value="replied">Répondu</option>
                          <option value="archived">Archivé</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                        Aucun contact pour le moment
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'quotes' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Client</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Trajet</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Estimation</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-moroccan-red" />
                          <div>
                            <div className="font-medium">{q.full_name}</div>
                            {q.company_name && <div className="text-xs text-gray-500">{q.company_name}</div>}
                            {q.urgent && <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded mt-1"><AlertCircle size={12} /> Urgent</span>}
                            {q.fragile && <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 ml-1"><Shield size={12} /> Fragile</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <a href={`mailto:${q.email}`} className="flex items-center gap-1 text-moroccan-red hover:underline text-xs">
                            <Mail size={12} /> {q.email}
                          </a>
                          <a href={`tel:${q.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-moroccan-red text-xs">
                            <Phone size={12} /> {q.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-gray-700">
                          <MapPin size={14} className="text-moroccan-green" />
                          <span>{q.origin_city} → {q.destination_city}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{q.shipment_type}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 font-semibold text-moroccan-red">
                          <Euro size={14} />
                          {q.estimated_price?.toFixed(2)} {q.currency}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(q.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                            q.status === 'new'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : q.status === 'pending'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : q.status === 'accepted'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : q.status === 'rejected'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          <option value="new">Nouveau</option>
                          <option value="pending">En attente</option>
                          <option value="accepted">Accepté</option>
                          <option value="rejected">Refusé</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {quotes.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                        Aucun devis pour le moment
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
