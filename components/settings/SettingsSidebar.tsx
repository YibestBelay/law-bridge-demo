'use client'

import { X } from 'lucide-react'
import type { SettingsSection } from '@/app/settings/page'

interface SettingsSidebarProps {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const menuItems = [
  { id: 'personal' as SettingsSection, label: 'Personal Information', icon: '👤' },
  { id: 'security' as SettingsSection, label: 'Security & Privacy', icon: '🔒' },
  { id: 'payment' as SettingsSection, label: 'Payment Methods', icon: '💳' },
  { id: 'notifications' as SettingsSection, label: 'Notifications', icon: '📧' },
  { id: 'language' as SettingsSection, label: 'Language & Region', icon: '🌐' },
  { id: 'delete' as SettingsSection, label: 'Delete Account', icon: '🗑️' }
]

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
  sidebarOpen,
  setSidebarOpen
}: SettingsSidebarProps) {
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
        } transition-transform duration-300 ease-in-out h-screen overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">Account Settings</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onSectionChange(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-blue-50 text-navy font-semibold border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

