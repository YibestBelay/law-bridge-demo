'use client'

import { FolderOpen, Clock, DollarSign, MessageCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface OverviewData {
  activeCases: number
  pendingConsultations: number
  totalSpent: number
  aiQueries: number
}

interface OverviewCardsProps {
  data: OverviewData
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const cards = [
    {
      icon: FolderOpen,
      number: data.activeCases,
      label: 'Active Cases',
      trend: '+1 this week',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/dashboard/cases'
    },
    {
      icon: Clock,
      number: data.pendingConsultations,
      label: 'Pending Requests',
      status: 'Awaiting response',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      href: '/dashboard/cases'
    },
    {
      icon: DollarSign,
      number: `${data.totalSpent.toLocaleString()} ETB`,
      label: 'Total Spent',
      link: 'View history',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/dashboard/payments'
    },
    {
      icon: MessageCircle,
      number: data.aiQueries,
      label: 'AI Questions Asked',
      link: 'View history',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/dashboard/chat-history'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Link
            key={index}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-lg`}>
                <Icon className={card.color} size={24} />
              </div>
              <ArrowUpRight className="text-gray-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{card.number}</div>
            <div className="text-sm text-gray-600 mb-2">{card.label}</div>
            {card.trend && (
              <div className="text-xs text-green-600 font-medium">{card.trend}</div>
            )}
            {card.status && (
              <div className="text-xs text-yellow-600 font-medium">{card.status}</div>
            )}
            {card.link && (
              <div className="text-xs text-blue-600 font-medium hover:underline">
                {card.link}
              </div>
            )}
          </Link>
        )
      })}
    </div>
  )
}

