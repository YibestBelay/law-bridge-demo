'use client'

import { useState } from 'react'
import { CaseFormData } from '@/app/submit-case/page'

interface Step2DetailsProps {
  formData: CaseFormData
  onUpdate: (data: Partial<CaseFormData>) => void
  onNext: () => void
  onBack: () => void
  onSaveDraft: () => void
}

export default function Step2Details({
  formData,
  onUpdate,
  onNext,
  onBack,
  onSaveDraft
}: Step2DetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.caseTitle.trim()) {
      newErrors.caseTitle = 'Case title is required'
    }
    
    if (formData.description.length < 200) {
      newErrors.description = `Description must be at least 200 characters (currently ${formData.description.length})`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Tell us about your case</h2>
        <p className="text-gray-600">
          Provide as much detail as possible to help lawyers understand your situation
        </p>
      </div>

      <div className="space-y-6">
        {/* Case Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Case Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.caseTitle}
            onChange={(e) => onUpdate({ caseTitle: e.target.value })}
            placeholder="e.g., Property ownership dispute"
            maxLength={100}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.caseTitle ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">Keep it brief and descriptive</p>
            <p className="text-xs text-gray-500">{formData.caseTitle.length}/100</p>
          </div>
          {errors.caseTitle && (
            <p className="text-sm text-red-600 mt-1">{errors.caseTitle}</p>
          )}
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe your situation, what happened, when it happened, parties involved, and what outcome you're seeking..."
            rows={8}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              Include dates, locations, and relevant background information
            </p>
            <p className={`text-xs ${
              formData.description.length < 200 ? 'text-red-600' : 'text-gray-500'
            }`}>
              {formData.description.length}/200 minimum
            </p>
          </div>
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Issue Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            When did this issue start?
          </label>
          <input
            type="date"
            value={formData.issueStartDate}
            onChange={(e) => onUpdate({ issueStartDate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Legal Action Taken */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Has legal action been taken already?
          </label>
          <div className="space-y-2">
            {[
              { value: 'no', label: 'No, not yet' },
              { value: 'ongoing', label: 'Yes, case is ongoing' },
              { value: 'resolved', label: 'Yes, case was resolved' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="legalAction"
                  value={option.value}
                  checked={formData.legalActionTaken === option.value}
                  onChange={(e) => onUpdate({ legalActionTaken: e.target.value })}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          {(formData.legalActionTaken === 'ongoing' || formData.legalActionTaken === 'resolved') && (
            <div className="mt-4">
              <input
                type="text"
                value={formData.caseNumber}
                onChange={(e) => onUpdate({ caseNumber: e.target.value })}
                placeholder="Case number or reference (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Other Parties */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Who are the other parties involved?
          </label>
          <textarea
            value={formData.otherParties}
            onChange={(e) => onUpdate({ otherParties: e.target.value })}
            placeholder="List names or descriptions of other parties"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Preferred communication language
          </label>
          <select
            value={formData.preferredLanguage}
            onChange={(e) => onUpdate({ preferredLanguage: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Amharic">Amharic</option>
            <option value="English">English</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
            placeholder="Any other information we should know?"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onSaveDraft}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Save as Draft
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

