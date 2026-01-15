'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import FilterSection from './FilterSection'

interface FilterState {
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

interface Specialization {
  name: string
  count: number
}

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  specializations: Specialization[]
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  specializations
}: FilterSidebarProps) {
  const [showMoreSpecializations, setShowMoreSpecializations] = useState(false)
  const displayedSpecializations = showMoreSpecializations 
    ? specializations 
    : specializations.slice(0, 5)

  const locations = [
    'All locations',
    'Addis Ababa',
    'Dire Dawa',
    'Mekelle',
    'Bahir Dar',
    'Hawassa'
  ]

  const experienceOptions = [
    { value: '0-2', label: '0-2 years', count: 78 },
    { value: '3-5', label: '3-5 years', count: 145 },
    { value: '6-10', label: '6-10 years', count: 189 },
    { value: '10+', label: '10+ years', count: 88 }
  ]

  const badgeOptions = [
    { value: 'verified', label: 'Verified', count: 'all' },
    { value: 'topRated', label: 'Top Rated', count: 67 },
    { value: 'fastResponse', label: 'Fast Response', count: 234 },
    { value: 'risingStar', label: 'Rising Star', count: 45 }
  ]

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleSpecialization = (spec: string) => {
    const updated = filters.specializations.includes(spec)
      ? filters.specializations.filter(s => s !== spec)
      : [...filters.specializations, spec]
    updateFilter('specializations', updated)
  }

  const toggleExperience = (exp: string) => {
    const updated = filters.experience.includes(exp)
      ? filters.experience.filter(e => e !== exp)
      : [...filters.experience, exp]
    updateFilter('experience', updated)
  }

  const toggleBadge = (badge: string) => {
    const updated = filters.badges.includes(badge)
      ? filters.badges.filter(b => b !== badge)
      : [...filters.badges, badge]
    updateFilter('badges', updated)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Specialization */}
        <FilterSection title="Specialization">
          <div className="space-y-3">
            {displayedSpecializations.map((spec) => (
              <label key={spec.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.specializations.includes(spec.name)}
                    onChange={() => toggleSpecialization(spec.name)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-navy">{spec.name}</span>
                </div>
                <span className="text-xs text-gray-500">({spec.count})</span>
              </label>
            ))}
            {specializations.length > 5 && (
              <button
                onClick={() => setShowMoreSpecializations(!showMoreSpecializations)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                {showMoreSpecializations ? (
                  <>
                    Show less <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection title="Location">
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => updateFilter('priceMax', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Max"
              />
            </div>
            <div className="text-sm text-gray-600 text-center">
              {filters.priceMin.toLocaleString()} ETB - {filters.priceMax.toLocaleString()} ETB per hour
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={filters.priceMax}
              onChange={(e) => updateFilter('priceMax', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <div className="space-y-2">
            {[
              { value: 'now', label: 'Available Now' },
              { value: 'week', label: 'Available This Week' },
              { value: 'any', label: 'Any Time' }
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={filters.availability === option.value}
                  onChange={(e) => updateFilter('availability', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating">
          <div className="space-y-3">
            {[
              { value: 5, label: '5 stars', count: 145 },
              { value: 4, label: '4+ stars', count: 320 },
              { value: 3, label: '3+ stars', count: 456 }
            ].map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.rating === option.value}
                    onChange={() => updateFilter('rating', filters.rating === option.value ? 0 : option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-navy">{option.label}</span>
                </div>
                <span className="text-xs text-gray-500">({option.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Experience */}
        <FilterSection title="Experience">
          <div className="space-y-3">
            {experienceOptions.map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.experience.includes(option.value)}
                    onChange={() => toggleExperience(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-navy">{option.label}</span>
                </div>
                <span className="text-xs text-gray-500">({option.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Badges */}
        <FilterSection title="Badges">
          <div className="space-y-3">
            {badgeOptions.map(option => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.badges.includes(option.value)}
                    onChange={() => toggleBadge(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-navy">{option.label}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({option.count === 'all' ? 'all' : option.count})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      <button
        onClick={() => {}}
        className="w-full mt-6 bg-navy hover:bg-navy/90 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}

