'use client'

import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

interface Lawyer {
  id: string
  name: string
  photo: string
  specialization: string
  rating: number
}

interface RecommendedLawyersProps {
  lawyers: Lawyer[]
}

export default function RecommendedLawyers({ lawyers }: RecommendedLawyersProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Lawyers You May Need</h2>
        <Link
          href="/lawyers"
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {lawyers.map((lawyer) => (
          <Link
            key={lawyer.id}
            href={`/lawyers/${lawyer.id}`}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg flex-shrink-0">
              {lawyer.photo}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-navy truncate">
                {lawyer.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">{lawyer.specialization}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-sm font-semibold text-gray-900">{lawyer.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

