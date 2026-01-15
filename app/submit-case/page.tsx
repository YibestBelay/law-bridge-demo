'use client'

import { useState } from 'react'
import Layout from '@/components/shared/Layout'
import ProgressStepper from '@/components/submit-case/ProgressStepper'
import Step1Category from '@/components/submit-case/Step1Category'
import Step2Details from '@/components/submit-case/Step2Details'
import Step3Documents from '@/components/submit-case/Step3Documents'
import Step4Budget from '@/components/submit-case/Step4Budget'
import Step5Review from '@/components/submit-case/Step5Review'
import SaveDraftModal from '@/components/submit-case/SaveDraftModal'
import SuccessPage from '@/components/submit-case/SuccessPage'

export interface CaseFormData {
  category: string | null
  caseTitle: string
  description: string
  issueStartDate: string
  legalActionTaken: string
  caseNumber: string
  otherParties: string
  preferredLanguage: string
  additionalNotes: string
  documents: File[]
  budgetMin: number
  budgetMax: number
  paymentPreference: string
  urgency: string
  lawyerPreferences: string[]
  locationPreference: string
  additionalRequirements: string
}

const initialFormData: CaseFormData = {
  category: null,
  caseTitle: '',
  description: '',
  issueStartDate: '',
  legalActionTaken: 'no',
  caseNumber: '',
  otherParties: '',
  preferredLanguage: 'Both',
  additionalNotes: '',
  documents: [],
  budgetMin: 2000,
  budgetMax: 10000,
  paymentPreference: 'flexible',
  urgency: 'moderate',
  lawyerPreferences: [],
  locationPreference: 'Any location',
  additionalRequirements: ''
}

export default function SubmitCasePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CaseFormData>(initialFormData)
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [caseId, setCaseId] = useState<string | null>(null)

  const updateFormData = (data: Partial<CaseFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleSubmit = () => {
    // Simulate submission
    const newCaseId = `LC-${Date.now().toString().slice(-4)}`
    setCaseId(newCaseId)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <SuccessPage caseId={caseId!} />
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">Submit Your Case</h1>
              <p className="text-gray-600">We'll help you find the right lawyer</p>
            </div>
            <button
              onClick={() => setShowDraftModal(true)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Save as Draft
            </button>
          </div>

          {/* Progress Stepper */}
          <ProgressStepper
            currentStep={currentStep}
            onStepClick={goToStep}
          />
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {currentStep === 1 && (
            <Step1Category
              selectedCategory={formData.category}
              onSelect={(category) => updateFormData({ category })}
              onNext={nextStep}
              onCancel={() => window.history.back()}
            />
          )}

          {currentStep === 2 && (
            <Step2Details
              formData={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
              onSaveDraft={() => setShowDraftModal(true)}
            />
          )}

          {currentStep === 3 && (
            <Step3Documents
              documents={formData.documents}
              onUpdate={(documents) => updateFormData({ documents })}
              onNext={nextStep}
              onBack={prevStep}
              onSaveDraft={() => setShowDraftModal(true)}
            />
          )}

          {currentStep === 4 && (
            <Step4Budget
              formData={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
              onSaveDraft={() => setShowDraftModal(true)}
            />
          )}

          {currentStep === 5 && (
            <Step5Review
              formData={formData}
              onEdit={goToStep}
              onSubmit={handleSubmit}
              onBack={prevStep}
              onSaveDraft={() => setShowDraftModal(true)}
            />
          )}
        </div>
      </div>

      {/* Save Draft Modal */}
      {showDraftModal && (
        <SaveDraftModal
          formData={formData}
          onClose={() => setShowDraftModal(false)}
          onSave={() => {
            setShowDraftModal(false)
            // Handle save logic
          }}
        />
      )}
      </div>
    </Layout>
  )
}

