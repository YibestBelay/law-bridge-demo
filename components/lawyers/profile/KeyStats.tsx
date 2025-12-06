'use client'

import { Briefcase, TrendingUp, Clock, Award } from 'lucide-react'

interface Lawyer {
  casesHandled: number
  successRate: number
  avgResponse: string
  experience: number
}

interface KeyStatsProps {
  lawyer: Lawyer
}

export default function KeyStats({ lawyer }: KeyStatsProps) {
  const stats = [
    {
      icon: Briefcase,
      label: 'Total Cases',
      value: lawyer.casesHandled.toLocaleString(),
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: `${lawyer.successRate}%`,
      color: 'text-green-600'
    },
    {
      icon: Clock,
      label: 'Avg Response',
      value: lawyer.avgResponse,
      color: 'text-purple-600'
    },
    {
      icon: Award,
      label: 'Experience',
      value: `${lawyer.experience} years`,
      color: 'text-gold'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-gray-100 rounded-lg`}>
                <Icon className={stat.color} size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

