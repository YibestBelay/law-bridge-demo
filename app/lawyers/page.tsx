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

/* ---------------- MOCK DATA ---------------- */

const mockLawyers: Lawyer[] = [ /* unchanged */ ]

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
  /* ---------------- PAGE STATE ---------------- */
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

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      if (filters.search) {
        const s = filters.search.toLowerCase()
        if (
          !lawyer.name.toLowerCase().includes(s) &&
          !lawyer.specialization.toLowerCase().includes(s) &&
          !lawyer.location.toLowerCase().includes(s)
        ) return false
      }

      if (
        filters.specializations.length &&
        !filters.specializations.includes(lawyer.specialization)
      ) return false

      if (
        filters.location !== 'All locations' &&
        lawyer.location !== filters.location
      ) return false

      if (lawyer.price < filters.priceMin || lawyer.price > filters.priceMax)
        return false

      if (
        filters.availability !== 'any' &&
        lawyer.available !== filters.availability
      ) return false

      if (filters.rating && lawyer.rating < filters.rating)
        return false

      if (filters.experience.length) {
        const match = filters.experience.some(exp => {
          if (exp === '0-2') return lawyer.experience <= 2
          if (exp === '3-5') return lawyer.experience >= 3 && lawyer.experience <= 5
          if (exp === '6-10') return lawyer.experience >= 6 && lawyer.experience <= 10
          if (exp === '10+') return lawyer.experience > 10
          return false
        })
        if (!match) return false
      }

      if (filters.badges.length) {
        const match = filters.badges.some(badge => {
          if (badge === 'verified') return lawyer.verified
          if (badge === 'topRated') return lawyer.topRated
          if (badge === 'fastResponse') return lawyer.fastResponse
          if (badge === 'risingStar') return lawyer.risingStar
          return false
        })
        if (!match) return false
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

  /* ---------------- PAGE ---------------- */
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-navy flex items-center gap-1">
                <Home size={16} />
                Home
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 font-medium">Find a Lawyer</span>
            </nav>

            <h1 className="text-3xl font-bold text-navy mb-2">
              Find Your Legal Expert
            </h1>
            <p className="text-gray-600 mb-6">
              500+ verified lawyers ready to help you
            </p>

            <SearchBar
              value={filters.search}
              onChange={(value) =>
                setFilters({ ...filters, search: value })
              }
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
          <aside className="hidden lg:block w-1/4">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              specializations={specializations}
            />
          </aside>

          <main className="flex-1">
            <ResultsHeader
              count={filteredLawyers.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onSortChange={() => {}}
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

        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-navy text-white px-6 py-3 rounded-full"
        >
          Filters
        </button>

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
