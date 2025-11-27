'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface Step1CategoryProps {
  selectedCategory: string | null
  onSelect: (category: string) => void
  onNext: () => void
  onCancel: () => void
}

const categories = [
  {
    id: 'criminal',
    name: 'Criminal Law',
    icon: '⚖️',
    description: 'Defense, charges, investigations',
    color: 'from-red-400 to-red-600'
  },
  {
    id: 'family',
    name: 'Family Law',
    icon: '👨‍👩‍👧‍👦',
    description: 'Divorce, custody, adoption',
    color: 'from-pink-400 to-pink-600'
  },
  {
    id: 'business',
    name: 'Business & Commercial',
    icon: '🏢',
    description: 'Contracts, partnerships',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'property',
    name: 'Property & Real Estate',
    icon: '🏠',
    description: 'Buying, selling, disputes',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'labor',
    name: 'Labor & Employment',
    icon: '💼',
    description: 'Wrongful termination, contracts',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'tax',
    name: 'Tax Law',
    icon: '💰',
    description: 'Tax issues, audits, planning',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'immigration',
    name: 'Immigration',
    icon: '✈️',
    description: 'Visas, citizenship, documentation',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    id: 'civil',
    name: 'Civil Litigation',
    icon: '📄',
    description: 'Lawsuits, disputes',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📚',
    description: 'Describe your needs',
    color: 'from-gray-400 to-gray-600'
  }
]

export default function Step1Category({
  selectedCategory,
  onSelect,
  onNext,
  onCancel
}: Step1CategoryProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">
          What type of legal help do you need?
        </h2>
        <p className="text-gray-600">
          Choose the category that best matches your situation
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`relative p-6 border-2 rounded-xl text-left transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
              <div className={`text-4xl mb-3 w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          )
        })}
      </div>

      {/* AI Assistant Link */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          Not sure? Use AI Assistant to help
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <span>🤖</span>
          Ask AI Assistant
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            selectedCategory
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

