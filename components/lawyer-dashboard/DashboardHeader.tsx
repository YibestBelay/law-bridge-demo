'use client'

import { Menu } from 'lucide-react'

interface Lawyer {
  name: string
  title: string
}

interface DashboardHeaderProps {
  lawyer: Lawyer
  available: boolean
  onAvailableChange: (available: boolean) => void
  onMenuClick: () => void
}

export default function DashboardHeader({
  lawyer,
  available,
  onAvailableChange,
  onMenuClick
}: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="xl:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy">
              Welcome back, {lawyer.title} {lawyer.name}!
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-sm text-gray-600">{currentDate}</p>
              <span className="text-green-600 font-medium text-sm">🟢 Your profile is active</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">Available for new cases</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => onAvailableChange(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-14 h-7 rounded-full transition-colors ${
                  available ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    available ? 'transform translate-x-7' : ''
                  }`}
                />
              </div>
            </div>
          </label>
        </div>
      </div>
    </header>
  )
}
