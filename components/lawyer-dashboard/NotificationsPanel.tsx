'use client'

import { Bell, MessageSquare, DollarSign, Star, Calendar, X, Check } from 'lucide-react'

interface Notification {
  id: string
  type: 'request' | 'message' | 'payment' | 'review' | 'reminder'
  message: string
  timestamp: string
  unread: boolean
}

interface NotificationsPanelProps {
  notifications: Notification[]
}

const notificationIcons = {
  request: Bell,
  message: MessageSquare,
  payment: DollarSign,
  review: Star,
  reminder: Calendar
}

const notificationColors = {
  request: 'text-orange-600 bg-orange-100',
  message: 'text-blue-600 bg-blue-100',
  payment: 'text-green-600 bg-green-100',
  review: 'text-yellow-600 bg-yellow-100',
  reminder: 'text-purple-600 bg-purple-100'
}

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Notifications</h2>
        {unreadCount > 0 && (
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 mb-6">
        {notifications.map((notification) => {
          const Icon = notificationIcons[notification.type]
          const colorClass = notificationColors[notification.type]

          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.unread
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </div>
                <button className="flex-shrink-0 p-1 hover:bg-gray-100 rounded">
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Profile Completeness */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Profile Completeness</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${85 * 2.513} 251.3`}
                className="text-blue-600"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-navy">85%</span>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Profile photo added</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Credentials verified</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Bio written</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
            <span>Add case examples</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
            <span>Update availability</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center">
          Complete your profile to get 40% more requests
        </p>
      </div>

      {/* Platform Updates */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">📢</span>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">What's New</h4>
            <p className="text-xs text-gray-600 mb-2">
              New feature: Schedule consultations directly from your dashboard.
            </p>
            <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
