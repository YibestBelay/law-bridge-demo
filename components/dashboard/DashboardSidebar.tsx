'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Bot,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react'

interface User {
  name: string
  avatar: string
  email: string
}

interface DashboardSidebarProps {
  user: User
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', badge: null },
  { icon: FolderOpen, label: 'My Cases', href: '/dashboard/cases', badge: null },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: 3 },
  { icon: Bot, label: 'AI Chat History', href: '/dashboard/chat-history', badge: null },
  { icon: User, label: 'Profile Settings', href: '/settings', badge: null },
  { icon: CreditCard, label: 'Payment History', href: '/dashboard/payments', badge: null },
  { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/support', badge: null }
]

export default function DashboardSidebar({
  user,
  sidebarOpen,
  setSidebarOpen
}: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 lg:z-auto transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-navy">LawBridge Ethiopia</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
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

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

