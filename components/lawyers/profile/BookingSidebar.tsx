'use client'

import { Check, Clock, Shield, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Lawyer {
  id: string
  name: string
  pricing: {
    consultation: number
    hourly: number
  }
  availability: {
    status: string
    responseTime: string
    lastActive: string
  }
}

interface SimilarLawyer {
  id: string
  name: string
  photo: string
  specialization: string
  rating: number
}

interface BookingSidebarProps {
  lawyer: Lawyer
  similarLawyers: SimilarLawyer[]
}

export default function BookingSidebar({ lawyer, similarLawyers }: BookingSidebarProps) {
  const statusConfig = {
    now: { emoji: '🟢', text: 'Available Today', color: 'text-green-600' },
    week: { emoji: '🟡', text: 'Available This Week', color: 'text-yellow-600' },
    any: { emoji: '⚪', text: 'Any Time', color: 'text-gray-600' }
  }

  const status = statusConfig[lawyer.availability.status as keyof typeof statusConfig] || statusConfig.any

  return (
    <>
      {/* Booking Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-4">
        <h3 className="text-xl font-bold text-navy mb-6">Book Consultation</h3>

        {/* Pricing */}
        <div className="space-y-3 mb-6">
          <div>
            <p className="text-sm text-gray-600">Initial Consultation</p>
            <p className="text-2xl font-bold text-navy">
              {lawyer.pricing.consultation.toLocaleString()} ETB
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Hourly Rate</p>
            <p className="text-xl font-bold text-navy">
              {lawyer.pricing.hourly.toLocaleString()} ETB/hour
            </p>
          </div>
        </div>

        {/* Availability Status */}
        <div className={`mb-6 p-3 rounded-lg bg-gray-50 ${status.color}`}>
          <div className="font-semibold">{status.emoji} {status.text}</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-lg font-semibold transition-colors">
            Request Consultation
          </button>
          <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-navy hover:text-navy transition-colors">
            Send Message
          </button>
        </div>

        {/* Payment Methods */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Payment Methods</p>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">Chapa</div>
            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">Telebirr</div>
            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">PayPal</div>
          </div>
        </div>
      </div>

      {/* Response Time Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Usually responds in {lawyer.availability.responseTime}
            </p>
            <p className="text-xs text-gray-600">
              Active on LawBridge {lawyer.availability.lastActive}
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Safety */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Trust & Safety</h4>
        <div className="space-y-2">
          {[
            { icon: Check, text: 'Identity Verified', color: 'text-green-600' },
            { icon: Check, text: 'License Verified', color: 'text-green-600' },
            { icon: Check, text: 'Background Checked', color: 'text-green-600' },
            { icon: Lock, text: 'Secure Payments', color: 'text-blue-600' },
            { icon: Shield, text: 'Privacy Protected', color: 'text-purple-600' }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Icon className={`${item.color} flex-shrink-0`} size={16} />
                <span className="text-gray-700">{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Similar Lawyers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Similar Lawyers</h4>
        <div className="space-y-4">
          {similarLawyers.map(lawyer => (
            <Link
              key={lawyer.id}
              href={`/lawyers/${lawyer.id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                {lawyer.photo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-navy truncate">
                  {lawyer.name}
                </p>
                <p className="text-xs text-gray-600 truncate">{lawyer.specialization}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-semibold text-gray-900">{lawyer.rating}</span>
                  <span className="text-xs text-yellow-400">★</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Report Link */}
      <div className="text-center pt-4">
        <button className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 mx-auto">
          <AlertCircle size={14} />
          Report this profile
        </button>
      </div>
    </>
  )
}

