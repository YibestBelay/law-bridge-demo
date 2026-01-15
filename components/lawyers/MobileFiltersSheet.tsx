'use client'

import { X } from 'lucide-react'
import FilterSidebar from './FilterSidebar'
import { FilterState } from '@/app/lawyers/page'

interface Specialization {
  name: string
  count: number
}

interface MobileFiltersSheetProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  specializations: Specialization[]
}

export default function MobileFiltersSheet({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  specializations
}: MobileFiltersSheetProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 lg:hidden max-h-[90vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterSidebar
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearFilters={onClearFilters}
            specializations={specializations}
          />
        </div>
      </div>
    </>
  )
}

