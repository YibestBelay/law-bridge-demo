'use client'

import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  onClearFilters: () => void
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <SearchX className="text-gray-400" size={48} />
      </div>
      <h3 className="text-2xl font-bold text-navy mb-2">No lawyers found</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        No lawyers found matching your filters. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-navy hover:bg-navy/90 text-white rounded-lg font-semibold transition-colors"
      >
        Clear Filters
      </button>
    </div>
  )
}
