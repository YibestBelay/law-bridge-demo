'use client'

interface Availability {
  status: string
  responseTime: string
  lastActive: string
}

interface AvailabilitySectionProps {
  availability: Availability
}

export default function AvailabilitySection({ availability }: AvailabilitySectionProps) {
  const statusConfig = {
    now: { emoji: '🟢', text: 'Available Now', color: 'text-green-600' },
    week: { emoji: '🟡', text: 'Available This Week', color: 'text-yellow-600' },
    any: { emoji: '⚪', text: 'Any Time', color: 'text-gray-600' }
  }

  const status = statusConfig[availability.status as keyof typeof statusConfig] || statusConfig.any

  // Mock calendar data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const calendarDays = Array.from({ length: 7 }, (_, i) => ({
    day: days[i],
    available: Math.random() > 0.3
  }))

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-6">Availability</h2>
      
      {/* Status */}
      <div className="mb-6">
        <div className={`text-lg font-semibold mb-2 ${status.color}`}>
          {status.emoji} {status.text}
        </div>
        <p className="text-sm text-gray-600">
          Usually responds in {availability.responseTime}
        </p>
      </div>

      {/* Mini Calendar */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">This Week</h3>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-1">{day.day}</div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                day.available
                  ? 'bg-green-100 text-green-700 font-semibold'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Time Slots</h3>
        <div className="flex flex-wrap gap-2">
          {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time, index) => (
            <button
              key={index}
              className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

