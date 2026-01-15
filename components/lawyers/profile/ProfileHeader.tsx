'use client'

import { Check, Star, MapPin, Share2, Bookmark } from 'lucide-react'
import Link from 'next/link'

interface Lawyer {
  id: string
  name: string
  photo: string
  title: string
  rating: number
  reviews: number
  location: string
  memberSince: string
  verified: boolean
  topRated: boolean
  fastResponse: boolean
  casesHandled: number
}

interface ProfileHeaderProps {
  lawyer: Lawyer
  saved: boolean
  onSave: () => void
}

export default function ProfileHeader({ lawyer, saved, onSave }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Side - Photo and Badges */}
      <div className="flex-shrink-0">
        <div className="relative inline-block">
          <div className="w-48 h-48 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-7xl shadow-lg">
            {lawyer.photo}
          </div>
          {lawyer.verified && (
            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2 shadow-lg">
              <Check className="text-white" size={20} />
            </div>
          )}
        </div>

        {/* Badge Collection */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
          {lawyer.verified && (
            <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1" title="Verified Lawyer">
              🎖️ Verified
            </div>
          )}
          {lawyer.topRated && (
            <div className="px-3 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-semibold flex items-center gap-1" title="Top Rated Lawyer">
              ⭐ Top Rated
            </div>
          )}
          {lawyer.fastResponse && (
            <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1" title="Fast Response Time">
              ⚡ Fast Response
            </div>
          )}
          <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1" title="Cases Handled">
            🏆 {lawyer.casesHandled}+ Cases Handled
          </div>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
              {lawyer.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{lawyer.title}</p>

            {/* Rating */}
            <Link href="#reviews" className="inline-flex items-center gap-2 mb-3 group">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${
                      i < Math.floor(lawyer.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    size={20}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-navy">{lawyer.rating}</span>
              <span className="text-gray-600">({lawyer.reviews.toLocaleString()} reviews)</span>
              <span className="text-blue-600 text-sm group-hover:underline">View all</span>
            </Link>

            {/* Location and Member Since */}
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{lawyer.location}</span>
              </div>
              <div className="text-sm">
                Member since {lawyer.memberSince}
              </div>
            </div>
          </div>

          {/* Share and Save */}
          <div className="flex gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Share"
              title="Share profile"
            >
              <Share2 className="text-gray-600" size={20} />
            </button>
            <button
              onClick={onSave}
              className={`p-2 rounded-lg transition-colors ${
                saved
                  ? 'bg-gold/20 text-gold'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Save"
              title={saved ? 'Remove from saved' : 'Save profile'}
            >
              <Bookmark className={saved ? 'fill-current' : ''} size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
