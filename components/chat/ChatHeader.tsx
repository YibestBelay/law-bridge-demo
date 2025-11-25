'use client'

import { Bot, Info, X, AlertCircle, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ChatHeaderProps {
  isGuest: boolean
  questionsRemaining: number
  onDismissBanner: () => void
}

export default function ChatHeader({
  isGuest,
  questionsRemaining,
  onDismissBanner
}: ChatHeaderProps) {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showBanner, setShowBanner] = useState(isGuest && questionsRemaining > 0)

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 group"
                title="Return to Home"
              >
                <ArrowLeft className="text-gray-600 group-hover:text-navy" size={20} />
                <span className="hidden sm:inline text-sm text-gray-600 group-hover:text-navy font-medium">Home</span>
              </Link>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-navy">AI Legal Assistant</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="AI Information"
            >
              <Info className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Guest Banner */}
          {showBanner && isGuest && questionsRemaining > 0 && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-blue-600" size={18} />
                <p className="text-sm text-blue-900">
                  You have <span className="font-semibold">{questionsRemaining}</span> question{questionsRemaining !== 1 ? 's' : ''} remaining. Sign in for unlimited access
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBanner(false)
                  onDismissBanner()
                }}
                className="p-1 hover:bg-blue-100 rounded transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} className="text-blue-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowInfoModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy">About AI Legal Assistant</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-navy mb-2">Capabilities:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Answer questions about Ethiopian law</li>
                  <li>Provide information from official legal documents</li>
                  <li>Explain legal procedures and regulations</li>
                  <li>Available 24/7 for instant responses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2">Limitations:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Provides general information only</li>
                  <li>Not a substitute for professional legal advice</li>
                  <li>Cannot represent you in legal matters</li>
                  <li>For complex cases, consult a licensed lawyer</li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <button className="w-full bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Find a Lawyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

