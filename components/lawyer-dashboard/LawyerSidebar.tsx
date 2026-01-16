'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Calendar,
  DollarSign,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Check,
  Star,
  ExternalLink
} from 'lucide-react'

interface Lawyer {
  name: string
  title: string
  avatar: string
  rating: number
  reviews: number
  verified: boolean
}

interface LawyerSidebarProps {
  lawyer: Lawyer
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/lawyer-dashboard', badge: null },
  { icon: FolderOpen, label: 'My Cases', href: '/lawyer-dashboard/cases', badge: null },
  { icon: Briefcase, label: 'Consultation Requests', href: '/lawyer-dashboard/requests', badge: 5 },
  { icon: MessageSquare, label: 'Messages', href: '/lawyer-dashboard/messages', badge: 8 },
  { icon: Calendar, label: 'Calendar', href: '/lawyer-dashboard/calendar', badge: null },
  { icon: DollarSign, label: 'Earnings & Payments', href: '/lawyer-dashboard/earnings', badge: null },
  { icon: User, label: 'Profile Management', href: '/lawyer-dashboard/profile', badge: null },
  { icon: Settings, label: 'Settings', href: '/lawyer-dashboard/settings', badge: null }
]

export default function LawyerSidebar({
  lawyer,
  sidebarOpen,
  setSidebarOpen
}: LawyerSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed xl:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 xl:z-auto transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo and Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-navy">LawBridge</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="xl:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                {lawyer.avatar}
              </div>
              {lawyer.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <Check className="text-white" size={12} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{lawyer.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-sm font-semibold text-gray-900">{lawyer.rating}</span>
                <span className="text-xs text-gray-500">({lawyer.reviews})</span>
              </div>
            </div>
          </div>

          <Link
            href={`/lawyers/1`}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>View Public Profile</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-navy font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            href="/lawyer-dashboard/help"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <HelpCircle size={20} />
            <span>Help Center</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
