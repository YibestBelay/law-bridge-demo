'use client'

import { BookOpen, FileText, GraduationCap, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    icon: BookOpen,
    label: 'Ethiopian Law Library',
    href: '/resources/law-library',
    color: 'text-blue-600'
  },
  {
    icon: FileText,
    label: 'Common Legal Forms',
    href: '/resources/forms',
    color: 'text-green-600'
  },
  {
    icon: GraduationCap,
    label: 'Legal Education Center',
    href: '/resources/education',
    color: 'text-purple-600'
  },
  {
    icon: HelpCircle,
    label: 'Frequently Asked Questions',
    href: '/resources/faq',
    color: 'text-orange-600'
  }
]

export default function HelpfulResources() {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-navy mb-4">Legal Resources</h2>
      <ul className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon
          return (
            <li key={index}>
              <Link
                href={resource.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Icon className={`${resource.color} flex-shrink-0`} size={20} />
                <span className="text-sm text-gray-700 group-hover:text-navy">
                  {resource.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

