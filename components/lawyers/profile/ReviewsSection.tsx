'use client'

import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'

interface Review {
  id: string
  clientInitials: string
  rating: number
  date: string
  text: string
  caseType?: string
  helpful: number
}

interface RatingBreakdown {
  [key: number]: {
    count: number
    percentage: number
  }
}

interface ReviewsSectionProps {
  reviews: Review[]
  ratingBreakdown: RatingBreakdown
  totalReviews: number
}

export default function ReviewsSection({
  reviews,
  ratingBreakdown,
  totalReviews
}: ReviewsSectionProps) {
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 'recent'>('all')
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true
    if (filter === 'recent') return true // Sort by date
    return review.rating === filter
  })

  const toggleExpand = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews)
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId)
    } else {
      newExpanded.add(reviewId)
    }
    setExpandedReviews(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const shouldTruncate = (text: string) => text.length > 150

  return (
    <section id="reviews" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-navy">
          What Clients Say ({totalReviews.toLocaleString()} reviews)
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
        {[
          { value: 'all', label: 'All' },
          { value: 5, label: '5 Star' },
          { value: 4, label: '4 Star' },
          { value: 3, label: '3 Star' },
          { value: 'recent', label: 'Recent' }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === tab.value
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const data = ratingBreakdown[rating]
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{rating} ⭐</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-20 text-right">
                  {data.count} ({data.percentage}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {filteredReviews.map(review => {
          const isExpanded = expandedReviews.has(review.id)
          const needsTruncation = shouldTruncate(review.text)
          const displayText = isExpanded || !needsTruncation
            ? review.text
            : review.text.substring(0, 150) + '...'

          return (
            <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
              <div className="flex gap-4">
                {/* Client Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {review.clientInitials}
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                            size={16}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(review.date)}
                        {review.caseType && (
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                            {review.caseType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 leading-relaxed">{displayText}</p>
                  {needsTruncation && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                      <ThumbsUp size={16} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-navy hover:text-navy transition-colors">
          Load More Reviews
        </button>
      </div>
    </section>
  )
}
