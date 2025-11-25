'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'

interface NewMessageModalProps {
  onClose: () => void
}

const recentLawyers = [
  { id: '1', name: 'Dr. Abebe Bekele', title: 'Family Law Attorney', avatar: 'AB' },
  { id: '2', name: 'Sara Haile', title: 'Property Law Attorney', avatar: 'SH' },
  { id: '3', name: 'David Tesfaye', title: 'Contract Law Attorney', avatar: 'DT' }
]

const activeCases = [
  { id: 'LC-2401', title: 'Family Law Consultation' },
  { id: 'LC-2387', title: 'Property Case' },
  { id: 'LC-2365', title: 'Contract Review' }
]

export default function NewMessageModal({ onClose }: NewMessageModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<string>('general')
  const [message, setMessage] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy">Start New Conversation</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Search/Select Lawyer */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Select Lawyer
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a lawyer..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentLawyers.map((lawyer) => (
                <button
                  key={lawyer.id}
                  onClick={() => setSelectedLawyer(lawyer.id)}
                  className={`w-full flex items-center gap-3 p-3 border-2 rounded-lg transition-colors ${
                    selectedLawyer === lawyer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {lawyer.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{lawyer.name}</p>
                    <p className="text-sm text-gray-600">{lawyer.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Case */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Select Case (if applicable)
            </label>
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General inquiry</option>
              {activeCases.map((caseItem) => (
                <option key={caseItem.id} value={caseItem.id}>
                  {caseItem.title} (#{caseItem.id})
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle start conversation
                onClose()
              }}
              disabled={!selectedLawyer}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

