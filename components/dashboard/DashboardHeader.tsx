'use client'

import Link from 'next/link'
import { Menu, Plus } from 'lucide-react'

interface DashboardHeaderProps {
  userName: string
  onMenuClick: () => void
}

export default function DashboardHeader({ userName, onMenuClick }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy">
              Welcome back, {userName}!
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {currentDate} • {currentTime}
            </p>
          </div>
        </div>

        <Link
          href="/submit-case"
          className="flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Consultation</span>
        </Link>
      </div>
    </header>
  )
}

