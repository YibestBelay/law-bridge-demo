'use client'

import { useState } from 'react'
import { CaseFormData } from '@/app/submit-case/page'

interface Step4BudgetProps {
  formData: CaseFormData
  onUpdate: (data: Partial<CaseFormData>) => void
  onNext: () => void
  onBack: () => void
  onSaveDraft: () => void
}

const budgetPresets = [
  { min: 1000, max: 3000, label: '1,000-3,000 ETB' },
  { min: 3000, max: 7000, label: '3,000-7,000 ETB' },
  { min: 7000, max: 15000, label: '7,000-15,000 ETB' },
  { min: 15000, max: 50000, label: '15,000+ ETB' }
]

export default function Step4Budget({
  formData,
  onUpdate,
  onNext,
  onBack,
  onSaveDraft
}: Step4BudgetProps) {
  const [flexibleBudget, setFlexibleBudget] = useState(false)
  const [matchingLawyers, setMatchingLawyers] = useState(23)

  const handleBudgetChange = (min: number, max: number) => {
    onUpdate({ budgetMin: min, budgetMax: max })
    // Simulate matching lawyers calculation
    setMatchingLawyers(Math.floor(Math.random() * 30) + 15)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Set Your Budget & Preferences</h2>
        <p className="text-gray-600">
          Help us match you with lawyers within your budget
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget Range */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What is your budget for this case?
          </h3>
          
          {!flexibleBudget ? (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Min: {formData.budgetMin.toLocaleString()} ETB</span>
                  <span className="text-sm text-gray-600">Max: {formData.budgetMax.toLocaleString()} ETB</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={formData.budgetMin}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value), formData.budgetMax)}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={formData.budgetMax}
                    onChange={(e) => handleBudgetChange(formData.budgetMin, parseInt(e.target.value))}
                    className="flex-1"
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-bold text-navy">
                    {formData.budgetMin.toLocaleString()} - {formData.budgetMax.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {budgetPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleBudgetChange(preset.min, preset.max)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      formData.budgetMin === preset.min && formData.budgetMax === preset.max
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={flexibleBudget}
              onChange={(e) => {
                setFlexibleBudget(e.target.checked)
                if (e.target.checked) {
                  onUpdate({ budgetMin: 0, budgetMax: 0 })
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm not sure yet / Flexible</span>
          </label>
        </div>

        {/* Payment Preference */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How would you like to pay?
          </h3>
          <div className="space-y-3">
            {[
              { value: 'hourly', label: 'Hourly Rate', desc: 'Pay for time spent', icon: '⏱️' },
              { value: 'flat', label: 'Flat Fee', desc: 'One-time payment for entire service', icon: '💰' },
              { value: 'flexible', label: 'Flexible', desc: 'Open to lawyer\'s recommendation', icon: '🔄' }
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
              >
                <input
                  type="radio"
                  name="paymentPreference"
                  value={option.value}
                  checked={formData.paymentPreference === option.value}
                  onChange={(e) => onUpdate({ paymentPreference: e.target.value })}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How urgent is your case?
          </h3>
          <div className="space-y-3">
            {[
              { value: 'urgent', label: 'Urgent', desc: 'Need help within 24-48 hours', emoji: '🔴' },
              { value: 'moderate', label: 'Moderate', desc: 'Need help within 1 week', emoji: '🟡' },
              { value: 'flexible', label: 'Flexible', desc: 'Can wait for the right match', emoji: '🟢' }
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={(e) => onUpdate({ urgency: e.target.value })}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.emoji}</span>
                    <span className="font-semibold text-gray-900">{option.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Urgent cases may have priority pricing
          </p>
        </div>

        {/* Lawyer Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lawyer Preferences (optional)
          </h3>
          <div className="space-y-2">
            {[
              'Top-rated lawyers only (4.5+ stars)',
              'Fast response time (responds within hours)',
              'Experienced (5+ years)',
              'Specialized in my case type',
              'Available for in-person meetings',
              `Speaks ${formData.preferredLanguage}`
            ].map((pref, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.lawyerPreferences.includes(pref)}
                  onChange={(e) => {
                    const newPrefs = e.target.checked
                      ? [...formData.lawyerPreferences, pref]
                      : formData.lawyerPreferences.filter(p => p !== pref)
                    onUpdate({ lawyerPreferences: newPrefs })
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Preference */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Do you prefer a lawyer in a specific location?
          </h3>
          <select
            value={formData.locationPreference}
            onChange={(e) => onUpdate({ locationPreference: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Any location</option>
            <option>Addis Ababa</option>
            <option>Dire Dawa</option>
            <option>Mekelle</option>
            <option>Bahir Dar</option>
            <option>Hawassa</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Online consultations available regardless of location
          </p>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Additional Requirements
          </label>
          <textarea
            value={formData.additionalRequirements}
            onChange={(e) => onUpdate({ additionalRequirements: e.target.value })}
            placeholder="Any specific requirements or questions for potential lawyers?"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Matching Indicator */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900">
            🎯 Based on your preferences, approximately {matchingLawyers} lawyers match your criteria
          </p>
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
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  )
}

