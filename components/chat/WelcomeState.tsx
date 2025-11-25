'use client'

import { Bot, Scale } from 'lucide-react'

interface WelcomeStateProps {
  onQuestionClick: (question: string) => void
}

const suggestedQuestions = [
  "What are tenant rights in Ethiopia?",
  "How do I register a business?",
  "What is the legal marriage age?",
  "Explain employment termination laws"
]

export default function WelcomeState({ onQuestionClick }: WelcomeStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* AI Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Scale className="text-white" size={40} />
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
          Hello! I'm your AI legal assistant
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
          Ask me anything about Ethiopian law
        </p>

        {/* Suggested Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(question)}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl text-left hover:border-blue-400 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Bot className="text-blue-600" size={20} />
                </div>
                <p className="text-sm font-medium text-gray-900 flex-1">
                  {question}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

