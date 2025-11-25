'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Shield, ArrowRight } from 'lucide-react'

interface Lawyer {
  id: number
  name: string
  specialization: string
  rating: number
  reviews: number
  experience: number
  image: string
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: 'Alemayehu Bekele',
    specialization: 'Corporate Law',
    rating: 4.9,
    reviews: 127,
    experience: 12,
    image: '👨‍💼'
  },
  {
    id: 2,
    name: 'Meron Tadesse',
    specialization: 'Family Law',
    rating: 4.8,
    reviews: 98,
    experience: 8,
    image: '👩‍💼'
  },
  {
    id: 3,
    name: 'Yonas Gebremariam',
    specialization: 'Criminal Law',
    rating: 4.9,
    reviews: 156,
    experience: 15,
    image: '👨‍💼'
  },
  {
    id: 4,
    name: 'Selamawit Hailu',
    specialization: 'Immigration Law',
    rating: 4.7,
    reviews: 89,
    experience: 6,
    image: '👩‍💼'
  },
  {
    id: 5,
    name: 'Tewodros Assefa',
    specialization: 'Property Law',
    rating: 4.8,
    reviews: 112,
    experience: 10,
    image: '👨‍💼'
  },
  {
    id: 6,
    name: 'Hanna Mekonnen',
    specialization: 'Employment Law',
    rating: 4.9,
    reviews: 134,
    experience: 9,
    image: '👩‍💼'
  }
]

export default function FeaturedLawyers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const getLawyersPerView = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth >= 1024) return 4
    if (window.innerWidth >= 640) return 2
    return 1
  }

  const [lawyersPerView, setLawyersPerView] = useState(4)

  useEffect(() => {
    const updateLawyersPerView = () => {
      setLawyersPerView(getLawyersPerView())
    }
    updateLawyersPerView()
    window.addEventListener('resize', updateLawyersPerView)
    return () => window.removeEventListener('resize', updateLawyersPerView)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, lawyers.length - lawyersPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, lawyers.length - lawyersPerView)
      return prev === 0 ? maxIndex : prev - 1
    })
  }

  const visibleLawyers = lawyers.slice(currentIndex, currentIndex + lawyersPerView)

  return (
    <section id="lawyers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          Meet Our Top-Rated Lawyers
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          {lawyers.length > lawyersPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="text-navy" size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                aria-label="Next"
              >
                <ChevronRight className="text-navy" size={24} />
              </button>
            </>
          )}

          {/* Lawyers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-5xl mb-4 border-4 border-white shadow-lg">
                    {lawyer.image}
                  </div>

                  {/* Name and Verification */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-navy">{lawyer.name}</h3>
                    <Shield className="text-green" size={20} />
                  </div>

                  {/* Specialization */}
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {lawyer.specialization}
                  </span>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
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
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {lawyer.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({lawyer.reviews} reviews)
                    </span>
                  </div>

                  {/* Experience */}
                  <p className="text-sm text-gray-600 mb-4">
                    {lawyer.experience} years of experience
                  </p>

                  {/* View Profile Button */}
                  <button className="w-full bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
                    View Profile
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          {lawyers.length > lawyersPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(lawyers.length / lawyersPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * lawyersPerView)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / lawyersPerView) === index
                      ? 'bg-navy w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

