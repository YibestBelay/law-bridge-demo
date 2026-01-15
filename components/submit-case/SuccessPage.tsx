'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Mail, MessageSquare, Check, Share2, Bot } from 'lucide-react'

interface SuccessPageProps {
  caseId: string
}

export default function SuccessPage({ caseId }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="text-green-600" size={64} />
          </div>
          <h1 className="text-4xl font-bold text-navy mb-3">Case Successfully Submitted!</h1>
          <p className="text-xl text-gray-600 mb-4">
            We're finding the best lawyers for your case
          </p>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
            Case ID: #{caseId}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-navy mb-4">What Happens Next?</h2>
          <div className="space-y-4">
            {[
              {
                icon: Clock,
                title: 'Lawyers will review your case',
                desc: 'Within 24 hours'
              },
              {
                icon: Mail,
                title: "You'll receive proposals",
                desc: 'Compare profiles and quotes'
              },
              {
                icon: Check,
                title: 'Choose your lawyer',
                desc: 'Review and hire the best match'
              },
              {
                icon: MessageSquare,
                title: 'Start working together',
                desc: 'Communicate and resolve your case'
              }
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Link
            href="/dashboard/cases"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-center transition-colors"
          >
            View My Cases
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/lawyers"
              className="block border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold text-center hover:border-gray-400 transition-colors"
            >
              Browse Lawyers Now
            </Link>
            <Link
              href="/dashboard"
              className="block text-gray-600 hover:text-gray-900 px-6 py-3 rounded-lg font-medium text-center"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
              <Share2 size={20} />
              Share Case
            </button>
            <Link
              href="/chat"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-300 text-blue-700 px-4 py-3 rounded-lg font-semibold hover:border-blue-400 transition-colors"
            >
              <Bot size={20} />
              Ask AI Assistant
            </Link>
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">
            Have questions while you wait?
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            📨 Confirmation sent to your email: user@example.com
          </p>
        </div>
      </div>
    </div>
  )
}

