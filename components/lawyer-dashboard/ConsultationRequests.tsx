'use client'

import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'

interface Request {
  id: string
  clientName: string
  clientInitials: string
  caseType: string
  summary: string
  budget: number
  urgency: 'urgent' | 'normal' | 'flexible'
  posted: string
}

interface ConsultationRequestsProps {
  requests: Request[]
}

const urgencyConfig = {
  urgent: { emoji: '🔴', text: 'Urgent', color: 'text-red-600' },
  normal: { emoji: '🟡', text: 'Normal', color: 'text-yellow-600' },
  flexible: { emoji: '🟢', text: 'Flexible', color: 'text-green-600' }
}

export default function ConsultationRequests({ requests }: ConsultationRequestsProps) {
  if (requests.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">New Consultation Requests</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-gray-600">
            You're all caught up! Relax or update your profile.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-navy">New Consultation Requests</h2>
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {requests.length}
          </span>
        </div>
        <Link
          href="/lawyer-dashboard/requests"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const urgency = urgencyConfig[request.urgency]
          return (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {request.clientInitials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.clientName}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      {request.caseType}
                    </span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${urgency.color}`}>
                  {urgency.emoji} {urgency.text}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{request.summary}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-gray-600">Budget: </span>
                  <span className="font-semibold text-gray-900">
                    {request.budget.toLocaleString()} ETB
                  </span>
                </div>
                <span className="text-xs text-gray-500">Posted: {request.posted}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Check size={16} />
                  Accept
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                  <X size={16} />
                  Decline
                </button>
              </div>

              <a
                href="#"
                className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-3"
              >
                View Full Details
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

