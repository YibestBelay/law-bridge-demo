'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FolderOpen, Briefcase, MessageSquare } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/lawyer-dashboard' },
  { icon: FolderOpen, label: 'Cases', href: '/lawyer-dashboard/cases' },
  { icon: Briefcase, label: 'Requests', href: '/lawyer-dashboard/requests' },
  { icon: MessageSquare, label: 'Messages', href: '/lawyer-dashboard/messages' }
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                isActive ? 'text-navy' : 'text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

