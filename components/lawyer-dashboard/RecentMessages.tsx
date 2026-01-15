'use client'

import Link from 'next/link'
import { ArrowRight, Reply } from 'lucide-react'

interface Message {
  id: string
  client: {
    name: string
    initials: string
  }
  snippet: string
  timestamp: string
  unread: boolean
}

interface RecentMessagesProps {
  messages: Message[]
}

export default function RecentMessages({ messages }: RecentMessagesProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Recent Client Messages</h2>
        <Link
          href="/lawyer-dashboard/messages"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View All Messages
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                {message.client.initials}
              </div>
              {message.unread && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{message.client.name}</h3>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.snippet}</p>
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                <Reply size={14} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

