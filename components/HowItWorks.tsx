'use client'

import { useState } from 'react'
import { MessageSquare, Sparkles, Users, FileText, Search, CheckCircle, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'ai' | 'lawyer'>('ai')

  const aiSteps = [
    {
      icon: MessageSquare,
      title: 'Ask Your Question',
      description: 'Type your legal question in plain language about Ethiopian law'
    },
    {
      icon: Sparkles,
      title: 'Get Instant Answer',
      description: 'Receive AI-powered answers based on official Ethiopian legal documents'
    },
    {
      icon: Users,
      title: 'Consult Lawyer if Needed',
      description: 'Connect with verified lawyers for complex cases or representation'
    }
  ]

  const lawyerSteps = [
    {
      icon: Search,
      title: 'Browse & Select Lawyer',
      description: 'Search by specialization, location, and ratings to find the right lawyer'
    },
    {
      icon: FileText,
      title: 'Submit Your Case',
      description: 'Share your case details securely and schedule a consultation'
    },
    {
      icon: CheckCircle,
      title: 'Get Professional Help',
      description: 'Receive expert legal advice and representation from verified professionals'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-navy mb-4">
          Simple, Fast, Affordable Legal Help
        </h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Using AI Assistant
          </button>
          <button
            onClick={() => setActiveTab('lawyer')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'lawyer'
                ? 'bg-gold text-navy shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hiring a Lawyer
          </button>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {(activeTab === 'ai' ? aiSteps : lawyerSteps).map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < (activeTab === 'ai' ? aiSteps : lawyerSteps).length - 1 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-300 z-0">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="text-gray-400" size={20} />
                      </div>
                    </div>
                  )}
                  
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    {/* Number Circle */}
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 ${
                      activeTab === 'ai' ? 'bg-blue-600' : 'bg-gold'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <div className={`inline-flex p-4 rounded-xl mb-4 ${
                        activeTab === 'ai' ? 'bg-blue-100' : 'bg-gold/20'
                      }`}>
                        <Icon className={activeTab === 'ai' ? 'text-blue-600' : 'text-gold'} size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

