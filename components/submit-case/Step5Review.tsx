'use client'

import { useState } from 'react'
import { CaseFormData } from '@/app/submit-case/page'
import { Edit, Check } from 'lucide-react'

interface Step5ReviewProps {
  formData: CaseFormData
  onEdit: (step: number) => void
  onSubmit: () => void
  onBack: () => void
  onSaveDraft: () => void
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

export default function Step5Review({
  formData,
  onEdit,
  onSubmit,
  onBack,
  onSaveDraft
}: Step5ReviewProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'details', 'documents', 'budget'])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleSubmit = () => {
    if (!agreedToTerms || !agreedToDisclaimer) {
      alert('Please agree to the terms and disclaimer to continue')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit()
    }, 1500)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Review Your Case Submission</h2>
        <p className="text-gray-600">
          Please review all details before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Category Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <span className="font-semibold text-gray-900">Case Category</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {categoryNames[formData.category || ''] || 'Not selected'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(1)
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Edit size={16} className="text-gray-600" />
              </button>
            </div>
          </button>
        </div>

        {/* Details Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <span className="font-semibold text-gray-900">Case Details</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(2)
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Edit size={16} className="text-gray-600" />
            </button>
          </button>
          {expandedSections.includes('details') && (
            <div className="p-4 pt-0 border-t border-gray-200 space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Title:</span>
                <p className="text-gray-900">{formData.caseTitle || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <p className="text-gray-900 line-clamp-3">
                  {formData.description || 'Not provided'}
                </p>
              </div>
              {formData.issueStartDate && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Issue Start Date:</span>
                  <p className="text-gray-900">{new Date(formData.issueStartDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('documents')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📎</span>
              <span className="font-semibold text-gray-900">Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {formData.documents.length} document{formData.documents.length !== 1 ? 's' : ''} attached
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(3)
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Edit size={16} className="text-gray-600" />
              </button>
            </div>
          </button>
          {expandedSections.includes('documents') && formData.documents.length > 0 && (
            <div className="p-4 pt-0 border-t border-gray-200 space-y-2">
              {formData.documents.map((file, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {file.name} ({formatFileSize(file.size)})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Budget Section */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('budget')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <span className="font-semibold text-gray-900">Budget & Preferences</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(4)
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Edit size={16} className="text-gray-600" />
            </button>
          </button>
          {expandedSections.includes('budget') && (
            <div className="p-4 pt-0 border-t border-gray-200 space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Budget:</span>{' '}
                <span className="text-gray-900">
                  {formData.budgetMin > 0
                    ? `${formData.budgetMin.toLocaleString()} - ${formData.budgetMax.toLocaleString()} ETB`
                    : 'Flexible'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Payment:</span>{' '}
                <span className="text-gray-900 capitalize">{formData.paymentPreference}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Urgency:</span>{' '}
                <span className="text-gray-900 capitalize">{formData.urgency}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms & Consent */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            <span className="text-red-500">*</span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToDisclaimer}
            onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I understand that LawBridge Ethiopia is a platform connecting clients with lawyers, and the platform is not providing legal advice
            <span className="text-red-500">*</span>
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Send me updates about my case and relevant legal resources via email
          </span>
        </label>
      </div>

      {/* Estimated Matching */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
        <p className="text-sm text-blue-900">⏱️ You should receive responses from interested lawyers within 24-48 hours</p>
        <p className="text-sm text-blue-900">📧 We'll notify you via email and platform notifications</p>
        <p className="text-sm text-blue-900">💬 You can review lawyer profiles and choose who to hire</p>
      </div>

      {/* Payment Information */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
        <p className="text-sm text-green-900">💳 Payment is only required after you select and confirm a lawyer</p>
        <p className="text-sm text-green-900">🔒 All payments are secure and protected</p>
        <p className="text-sm text-green-900">✅ Platform fee: 10% added to lawyer's quoted price</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
        >
          Back to Budget
        </button>
        <div className="flex gap-3">
          <button
            onClick={onSaveDraft}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={!agreedToTerms || !agreedToDisclaimer || isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              agreedToTerms && agreedToDisclaimer && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Case
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

