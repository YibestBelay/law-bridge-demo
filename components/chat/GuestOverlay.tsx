'use client'

import { X } from 'lucide-react'
import { openAuthModal } from '@/lib/authModalEvents'

interface GuestOverlayProps {
  onClose: () => void
  onSignIn: () => void
}

export default function GuestOverlay({ onClose, onSignIn }: GuestOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">Continue the Conversation</h2>
          <p className="text-gray-600">
            Sign in to ask unlimited questions and save your chat history
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              openAuthModal('signin')
              onSignIn()
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              openAuthModal('signup')
              onSignIn()
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-navy px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Free to sign up • No credit card required
        </p>
      </div>
    </div>
  )
}

