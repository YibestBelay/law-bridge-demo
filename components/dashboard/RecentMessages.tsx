'use client'

import Link from 'next/link'
import { ArrowRight, Reply } from 'lucide-react'

interface Message {
  id: string
  lawyer: {
    name: string
    photo: string
  }
  snippet: string
  timestamp: string
  unread: boolean
}

interface RecentMessagesProps {
  messages: Message[]
}

export default function RecentMessages({ messages }: RecentMessagesProps) {
  if (messages.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Recent Messages</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-600">
            Your inbox is empty. Start a conversation with a lawyer.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Recent Messages</h2>
        <Link
          href="/messages"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View All
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg">
                {message.lawyer.photo}
              </div>
              {message.unread && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{message.lawyer.name}</h3>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate mb-2">{message.snippet}</p>
              <Link
                href="/messages"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Reply size={14} />
                Reply
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

