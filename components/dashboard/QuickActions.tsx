'use client'

import { Search, MessageCircle, FileText, Phone } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    icon: Search,
    label: 'Find a Lawyer',
    href: '/lawyers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: MessageCircle,
    label: 'Ask AI Assistant',
    href: '/chat',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: FileText,
    label: 'Submit New Case',
    href: '/submit-case',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Phone,
    label: 'Contact Support',
    href: '/dashboard/support',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

export default function QuickActions() {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-navy mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className={`p-4 ${action.bgColor} rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={action.color} size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-navy text-center">
                {action.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

