'use client'

import type { SettingsSection } from '@/app/settings/page'

interface MobileNavProps {
  activeSection: SettingsSection
  onSectionChange: (section: SettingsSection) => void
}

const navItems = [
  { id: 'personal' as SettingsSection, label: 'Profile', icon: '👤' },
  { id: 'security' as SettingsSection, label: 'Security', icon: '🔒' },
  { id: 'payment' as SettingsSection, label: 'Payment', icon: '💳' },
  { id: 'notifications' as SettingsSection, label: 'Alerts', icon: '📧' }
]

export default function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                isActive ? 'text-navy' : 'text-gray-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

