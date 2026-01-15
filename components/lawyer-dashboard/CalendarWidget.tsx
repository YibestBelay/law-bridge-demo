'use client'

import Link from 'next/link'
import { Calendar as CalendarIcon, Clock, Video, ArrowRight } from 'lucide-react'

const appointments = [
  {
    time: '10:00 AM',
    title: 'Consultation with John D.',
    type: 'consultation'
  },
  {
    time: '2:00 PM',
    title: 'Court appearance (Case #LC-2401)',
    type: 'court'
  },
  {
    time: '4:30 PM',
    title: 'Client meeting (virtual)',
    type: 'virtual'
  }
]

export default function CalendarWidget() {
  const today = new Date()
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const currentDay = today.getDate()

  // Simple calendar grid (first 7 days of month)
  const days = Array.from({ length: 7 }, (_, i) => i + 1)

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Today's Schedule</h2>
        <Link
          href="/lawyer-dashboard/calendar"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View Full Calendar
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Mini Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">{currentMonth}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-xs text-gray-500 font-medium py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <div
              key={day}
              className={`text-center text-sm py-2 rounded ${
                day === currentDay
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Appointments</h3>
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <Clock className="text-blue-600" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-900 mb-1">
                {appointment.time}
              </div>
              <div className="text-sm text-gray-700">{appointment.title}</div>
              {appointment.type === 'virtual' && (
                <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                  <Video size={12} />
                  Virtual
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

