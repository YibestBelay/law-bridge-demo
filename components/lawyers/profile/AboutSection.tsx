'use client'

import { useState } from 'react'

interface Lawyer {
  name: string
  bio: string
  specializations: string[]
}

interface AboutSectionProps {
  lawyer: Lawyer
}

export default function AboutSection({ lawyer }: AboutSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const bioWords = lawyer.bio.split(' ')
  const shouldTruncate = bioWords.length > 50
  const displayBio = expanded || !shouldTruncate
    ? lawyer.bio
    : bioWords.slice(0, 50).join(' ') + '...'

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-4">
        About {lawyer.name}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
        {displayBio}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      {/* Specializations Tags */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {lawyer.specializations.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

