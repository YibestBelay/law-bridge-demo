'use client'

import { Check } from 'lucide-react'

interface ProgressStepperProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const steps = [
  { number: 1, label: 'Category', icon: '1⃣' },
  { number: 2, label: 'Details', icon: '2⃣' },
  { number: 3, label: 'Documents', icon: '3⃣' },
  { number: 4, label: 'Budget', icon: '4⃣' },
  { number: 5, label: 'Review', icon: '5⃣' }
]

export default function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <div className="w-full">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep
          const isFuture = step.number > currentStep

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => onStepClick(step.number)}
                  disabled={isFuture}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white scale-110'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${isFuture ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-sm">{step.number}</span>
                  )}
                </button>
                <span
                  className={`mt-2 text-xs font-medium hidden md:block ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className={`h-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Current Step Label */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}
        </p>
      </div>
    </div>
  )
}

