'use client'

import { Calendar, Clock, Video, CalendarX } from 'lucide-react'

interface Appointment {
  id: string
  date: string
  time: string
  lawyer: {
    name: string
    photo: string
  }
  caseType: string
  meetingLink: string
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export default function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Upcoming Appointments</h2>
        <div className="text-center py-8">
          <CalendarX className="mx-auto text-gray-400 mb-2" size={48} />
          <p className="text-gray-600 text-sm">No upcoming appointments</p>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-navy mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{formatDate(appointment.date)}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} />
                    {appointment.time}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {appointment.lawyer.photo}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{appointment.lawyer.name}</div>
                <div className="text-sm text-gray-600">{appointment.caseType}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={appointment.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <Video size={16} />
                Join Meeting
              </a>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:border-navy hover:text-navy transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

