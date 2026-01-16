'use client'

import { useEffect, useState } from 'react'
import { Users, Briefcase, Heart, Clock } from 'lucide-react'

interface Stat {
  icon: typeof Users
  value: number
  suffix: string
  label: string
  color: string
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Verified Lawyers',
    color: 'text-blue-400'
  },
  {
    icon: Briefcase,
    value: 10000,
    suffix: '+',
    label: 'Cases Handled',
    color: 'text-green-400'
  },
  {
    icon: Heart,
    value: 95,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'text-red-400'
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Available Support',
    color: 'text-yellow-400'
  }
]

export default function Statistics() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => ({ ...s, currentValue: 0 })))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const timers = stats.map((stat, index) => {
      const increment = stat.value / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        setAnimatedStats(prev => {
          const updated = [...prev]
          updated[index] = {
            ...updated[index],
            currentValue: Math.min(
              Math.floor(increment * currentStep),
              stat.value
            )
          }
          return updated
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, interval)

      return timer
    })

    return () => {
      timers.forEach(timer => clearInterval(timer))
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-navy to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {animatedStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                    <Icon className={stat.color} size={32} />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2">
                  {stat.currentValue}{stat.suffix}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

