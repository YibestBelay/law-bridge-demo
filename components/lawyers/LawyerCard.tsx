'use client'

import { Check, Star, MapPin, Briefcase, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Lawyer } from '@/app/lawyers/page'

interface LawyerCardProps {
  lawyer: Lawyer
  viewMode: 'grid' | 'list'
}

export default function LawyerCard({ lawyer, viewMode }: LawyerCardProps) {
  const availabilityConfig = {
    now: { emoji: '🟢', text: 'Available Now', color: 'text-green-600' },
    week: { emoji: '🟡', text: 'Available This Week', color: 'text-yellow-600' },
    any: { emoji: '⚪', text: 'Any Time', color: 'text-gray-600' }
  }

  const availability = availabilityConfig[lawyer.available]

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl">
                {lawyer.photo}
              </div>
              {lawyer.verified && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <Check className="text-white" size={12} />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {lawyer.topRated && (
                <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
                  Top Rated
                </span>
              )}
              {lawyer.fastResponse && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Fast Response
                </span>
              )}
              {lawyer.risingStar && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Rising Star
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-navy mb-1">{lawyer.name}</h3>
            <p className="text-gray-600 mb-2">{lawyer.specialization}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${
                      i < Math.floor(lawyer.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    size={16}
                  />
                ))}
                <span className="font-semibold ml-1">{lawyer.rating}</span>
                <span className="text-gray-500">({lawyer.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {lawyer.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={14} />
                {lawyer.experience} years
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
              <span>Cases: {lawyer.cases}</span>
              <span>Response: {lawyer.responseTime}</span>
              <span>Success: {lawyer.successRate}%</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex-shrink-0 flex flex-col items-end justify-between">
            <div className="text-right mb-4">
              <div className="text-2xl font-bold text-navy mb-2">
                {lawyer.price.toLocaleString()} ETB/hour
              </div>
              <div className={`text-sm font-medium ${availability.color}`}>
                {availability.emoji} {availability.text}
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/lawyers/${lawyer.id}`}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-navy hover:text-navy transition-colors"
              >
                View Profile
              </Link>
              <button className="px-4 py-2 bg-gold hover:bg-gold/90 text-navy rounded-lg font-semibold transition-colors">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all">
      {/* Top Section - Photo and Badges */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-5xl mx-auto">
            {lawyer.photo}
          </div>
          {lawyer.verified && (
            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
              <Check className="text-white" size={14} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {lawyer.topRated && (
            <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
              Top Rated
            </span>
          )}
          {lawyer.fastResponse && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              Fast Response
            </span>
          )}
          {lawyer.risingStar && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
              Rising Star
            </span>
          )}
        </div>
      </div>

      {/* Middle Section - Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-navy mb-1">{lawyer.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{lawyer.specialization}</p>

        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`${
                i < Math.floor(lawyer.rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
              size={16}
            />
          ))}
          <span className="font-semibold ml-1 text-sm">{lawyer.rating}</span>
          <span className="text-gray-500 text-sm">({lawyer.reviews})</span>
        </div>

        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
          <MapPin size={14} />
          {lawyer.location}
        </div>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
          <Briefcase size={14} />
          {lawyer.experience} years
        </div>

        {/* Stats Row */}
        <div className="flex justify-around text-xs text-gray-600 py-3 border-t border-b border-gray-100">
          <div>
            <div className="font-semibold text-gray-900">{lawyer.cases}</div>
            <div>Cases</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{lawyer.responseTime}</div>
            <div>Response</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{lawyer.successRate}%</div>
            <div>Success</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Price and Actions */}
      <div className="text-center">
        <div className="text-2xl font-bold text-navy mb-2">
          {lawyer.price.toLocaleString()} ETB/hour
        </div>
        <div className={`text-sm font-medium mb-4 ${availability.color}`}>
          {availability.emoji} {availability.text}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/lawyers/${lawyer.id}`}
            className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-navy hover:text-navy transition-colors"
          >
            View Profile
          </Link>
          <button className="w-full px-4 py-2 bg-gold hover:bg-gold/90 text-navy rounded-lg font-semibold transition-colors">
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

