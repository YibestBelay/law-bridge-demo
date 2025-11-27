'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { CaseFormData } from '@/app/submit-case/page'

interface SaveDraftModalProps {
  formData: CaseFormData
  onClose: () => void
  onSave: () => void
}

const categoryNames: Record<string, string> = {
  criminal: 'Criminal Law',
  family: 'Family Law',
  business: 'Business & Commercial',
  property: 'Property & Real Estate',
  labor: 'Labor & Employment',
  tax: 'Tax Law',
  immigration: 'Immigration',
  civil: 'Civil Litigation',
  other: 'Other'
}

export default function SaveDraftModal({
  formData,
  onClose,
  onSave
}: SaveDraftModalProps) {
  const [draftName, setDraftName] = useState(() => {
    const category = formData.category ? categoryNames[formData.category] : 'Case'
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    return `Draft - ${category} - ${date}`
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => {
        onSave()
        onClose()
      }, 1500)
    }, 1000)
  }

  if (saved) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Draft Saved!</h3>
            <p className="text-gray-600">Find it in Dashboard &gt; My Cases</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-navy">Save Your Progress</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Your case will be saved and you can continue later from your dashboard
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Give your draft a name (optional)
          </label>
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Draft name"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  )
}

