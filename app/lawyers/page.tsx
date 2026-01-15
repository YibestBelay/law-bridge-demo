'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import Layout from '@/components/shared/Layout'
import FilterSidebar from '@/components/lawyers/FilterSidebar'
import SearchBar from '@/components/lawyers/SearchBar'
import ResultsHeader from '@/components/lawyers/ResultsHeader'
import LawyerCard from '@/components/lawyers/LawyerCard'
import Pagination from '@/components/lawyers/Pagination'
import EmptyState from '@/components/lawyers/EmptyState'
import LoadingState from '@/components/lawyers/LoadingState'
import MobileFiltersSheet from '@/components/lawyers/MobileFiltersSheet'

export interface Lawyer {
  id: string
  name: string
  photo: string
  specialization: string
  location: string
  rating: number
  reviews: number
  experience: number
  price: number
  available: 'now' | 'week' | 'any'
  verified: boolean
  topRated: boolean
  fastResponse: boolean
  risingStar: boolean
  cases: number
  responseTime: string
  successRate: number
}

export interface FilterState {
  search: string
  specializations: string[]
  location: string
  priceMin: number
  priceMax: number
  availability: string
  rating: number
  experience: string[]
  badges: string[]
}

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Alemayehu Bekele',
    photo: '👨‍💼',
    specialization: 'Criminal Law',
    location: 'Addis Ababa',
    rating: 4.9,
    reviews: 127,
    experience: 12,
    price: 2500,
    available: 'now',
    verified: true,
    topRated: true,
    fastResponse: true,
    risingStar: false,
    cases: 145,
    responseTime: '2hrs',
    successRate: 94
  },
  {
    id: '2',
    name: 'Meron Tadesse',
    photo: '👩‍💼',
    specialization: 'Family Law',
    location: 'Dire Dawa',
    rating: 4.8,
    reviews: 98,
    experience: 8,
    price: 1800,
    available: 'week',
    verified: true,
    topRated: true,
    fastResponse: false,
    risingStar: false,
    cases: 112,
    responseTime: '4hrs',
    successRate: 91
  },
  {
    id: '3',
    name: 'Yonas Gebremariam',
    photo: '👨‍💼',
    specialization: 'Business & Commercial',
    location: 'Addis Ababa',
    rating: 4.9,
    reviews: 156,
    experience: 15,
    price: 3500,
    available: 'now',
    verified: true,
    topRated: true,
    fastResponse: true,
    risingStar: false,
    cases: 189,
    responseTime: '1hr',
    successRate: 96
  },
  {
    id: '4',
    name: 'Selamawit Hailu',
    photo: '👩‍💼',
    specialization: 'Immigration Law',
    location: 'Mekelle',
    rating: 4.7,
    reviews: 89,
    experience: 6,
    price: 1500,
    available: 'any',
    verified: true,
    topRated: false,
    fastResponse: true,
    risingStar: true,
    cases: 78,
    responseTime: '3hrs',
    successRate: 88
  },
  {
    id: '5',
    name: 'Tewodros Assefa',
    photo: '👨‍💼',
    specialization: 'Property & Real Estate',
    location: 'Bahir Dar',
    rating: 4.8,
    reviews: 112,
    experience: 10,
    price: 2200,
    available: 'now',
    verified: true,
    topRated: false,
    fastResponse: true,
    risingStar: false,
    cases: 134,
    responseTime: '2hrs',
    successRate: 92
  },
  {
    id: '6',
    name: 'Hanna Mekonnen',
    photo: '👩‍💼',
    specialization: 'Labor & Employment',
    location: 'Hawassa',
    rating: 4.6,
    reviews: 76,
    experience: 5,
    price: 1600,
    available: 'week',
    verified: true,
    topRated: false,
    fastResponse: false,
    risingStar: true,
    cases: 95,
    responseTime: '5hrs',
    successRate: 89
  },
  {
    id: '7',
    name: 'Daniel Getachew',
    photo: '👨‍💼',
    specialization: 'Tax Law',
    location: 'Addis Ababa',
    rating: 4.9,
    reviews: 143,
    experience: 11,
    price: 2800,
    available: 'now',
    verified: true,
    topRated: true,
    fastResponse: true,
    risingStar: false,
    cases: 167,
    responseTime: '1.5hrs',
    successRate: 95
  },
  {
    id: '8',
    name: 'Bethelhem Tesfaye',
    photo: '👩‍💼',
    specialization: 'Criminal Law',
    location: 'Addis Ababa',
    rating: 4.7,
    reviews: 101,
    experience: 7,
    price: 1900,
    available: 'any',
    verified: true,
    topRated: false,
    fastResponse: true,
    risingStar: true,
    cases: 108,
    responseTime: '3hrs',
    successRate: 90
  },
  {
    id: '9',
    name: 'Michael Yohannes',
    photo: '👨‍💼',
    specialization: 'Business & Commercial',
    location: 'Dire Dawa',
    rating: 4.8,
    reviews: 124,
    experience: 9,
    price: 2400,
    available: 'now',
    verified: true,
    topRated: true,
    fastResponse: false,
    risingStar: false,
    cases: 152,
    responseTime: '4hrs',
    successRate: 93
  }
]

const specializations = [
  { name: 'Criminal Law', count: 124 },
  { name: 'Family Law', count: 89 },
  { name: 'Business & Commercial', count: 156 },
  { name: 'Property & Real Estate', count: 78 },
  { name: 'Labor & Employment', count: 92 },
  { name: 'Tax Law', count: 45 },
  { name: 'Immigration', count: 34 }
]

export default function LawyersPage() {
  const [lawyers] = useState<Lawyer[]>(mockLawyers)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    specializations: [],
    location: 'All locations',
    priceMin: 500,
    priceMax: 5000,
    availability: 'any',
    rating: 0,
    experience: [],
    badges: []
  })

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (
          !lawyer.name.toLowerCase().includes(searchLower) &&
          !lawyer.specialization.toLowerCase().includes(searchLower) &&
          !lawyer.location.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Specialization filter
      if (filters.specializations.length > 0 && !filters.specializations.includes(lawyer.specialization)) {
        return false
      }

      // Location filter
      if (filters.location !== 'All locations' && lawyer.location !== filters.location) {
        return false
      }

      // Price filter
      if (lawyer.price < filters.priceMin || lawyer.price > filters.priceMax) {
        return false
      }

      // Availability filter
      if (filters.availability !== 'any' && lawyer.available !== filters.availability) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && lawyer.rating < filters.rating) {
        return false
      }

      // Experience filter
      if (filters.experience.length > 0) {
        const matchesExperience = filters.experience.some(exp => {
          if (exp === '0-2') return lawyer.experience >= 0 && lawyer.experience <= 2
          if (exp === '3-5') return lawyer.experience >= 3 && lawyer.experience <= 5
          if (exp === '6-10') return lawyer.experience >= 6 && lawyer.experience <= 10
          if (exp === '10+') return lawyer.experience > 10
          return false
        })
        if (!matchesExperience) return false
      }

      // Badges filter
      if (filters.badges.length > 0) {
        const matchesBadge = filters.badges.some(badge => {
          if (badge === 'verified') return lawyer.verified
          if (badge === 'topRated') return lawyer.topRated
          if (badge === 'fastResponse') return lawyer.fastResponse
          if (badge === 'risingStar') return lawyer.risingStar
          return false
        })
        if (!matchesBadge) return false
      }

      return true
    })
  }, [lawyers, filters])

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLawyers = filteredLawyers.slice(startIndex, startIndex + itemsPerPage)

  const clearFilters = () => {
    setFilters({
      search: '',
      specializations: [],
      location: 'All locations',
      priceMin: 500,
      priceMax: 5000,
      availability: 'any',
      rating: 0,
      experience: [],
      badges: []
    })
    setCurrentPage(1)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-navy flex items-center gap-1">
              <Home size={16} />
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Find a Lawyer</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            Find Your Legal Expert
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            500+ verified lawyers ready to help you
          </p>

          {/* Search Bar */}
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-1/4">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              specializations={specializations}
            />
          </aside>

          {/* Results Area */}
          <main className="flex-1 lg:w-3/4">
            <ResultsHeader
              count={filteredLawyers.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSortChange={(sort) => {
                // Implement sorting logic
                console.log('Sort by:', sort)
              }}
            />

            {loading ? (
              <LoadingState viewMode={viewMode} />
            ) : paginatedLawyers.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} />
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'
                  : 'space-y-4 mb-8'
                }>
                  {paginatedLawyers.map(lawyer => (
                    <LawyerCard
                      key={lawyer.id}
                      lawyer={lawyer}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-navy text-white px-6 py-3 rounded-full shadow-lg font-semibold z-40"
      >
        Filters
      </button>

      {/* Mobile Filters Sheet */}
      <MobileFiltersSheet
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
        specializations={specializations}
      />
      </div>
    </Layout>
  )
}

