'use client'

import { DollarSign, Briefcase, Bell, Clock, Star, TrendingUp } from 'lucide-react'

interface Metrics {
  totalEarnings: number
  earningsTrend: number
  activeCases: number
  inProgress: number
  pending: number
  newRequests: number
  responseRate: number
  avgResponse: string
  clientRating: number
  ratingTrend: number
}

interface PerformanceMetricsProps {
  metrics: Metrics
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const cards = [
    {
      icon: DollarSign,
      title: 'Total Earnings',
      value: `${metrics.totalEarnings.toLocaleString()} ETB`,
      trend: `↑ +${metrics.earningsTrend}% from last month`,
      trendColor: 'text-green-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Briefcase,
      title: 'Active Cases',
      value: metrics.activeCases.toString(),
      subtitle: `${metrics.inProgress} in progress, ${metrics.pending} pending`,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Bell,
      title: 'New Requests',
      value: metrics.newRequests.toString(),
      subtitle: 'Requires attention',
      link: 'Review Now',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      badge: true
    },
    {
      icon: Clock,
      title: 'Response Rate',
      value: `${metrics.responseRate}%`,
      subtitle: `Avg: ${metrics.avgResponse}`,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Star,
      title: 'Client Rating',
      value: `${metrics.clientRating}/5.0`,
      subtitle: `Based on 248 reviews`,
      trend: `↑ +${metrics.ratingTrend}`,
      trendColor: 'text-green-600',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 ${card.bgColor} rounded-lg`}>
                <Icon className={card.iconColor} size={20} />
              </div>
              {card.badge && (
                <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {metrics.newRequests}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-navy mb-1">{card.value}</div>
            <div className="text-xs text-gray-600 mb-2">{card.title}</div>
            {card.subtitle && (
              <div className="text-xs text-gray-500 mb-1">{card.subtitle}</div>
            )}
            {card.trend && (
              <div className={`text-xs font-medium ${card.trendColor} flex items-center gap-1`}>
                <TrendingUp size={12} />
                {card.trend}
              </div>
            )}
            {card.link && (
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                {card.link}
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
