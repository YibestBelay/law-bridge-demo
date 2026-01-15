'use client'

import { Grid, List } from 'lucide-react'

interface ResultsHeaderProps {
  count: number
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onSortChange: (sort: string) => void
}

export default function ResultsHeader({
  count,
  viewMode,
  onViewModeChange,
  onSortChange
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="text-gray-700">
        Showing <span className="font-semibold text-navy">{count}</span> lawyers
      </div>

      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-600 hover:text-navy'
            }`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-600 hover:text-navy'
            }`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="recommended">Sort by: Recommended</option>
          <option value="rating">Sort by: Rating</option>
          <option value="price">Sort by: Price</option>
          <option value="experience">Sort by: Experience</option>
        </select>
      </div>
    </div>
  )
}

