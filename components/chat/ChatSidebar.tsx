'use client'

import { Trash2, Plus, User, Crown } from 'lucide-react'
import { useState } from 'react'

interface Chat {
  id: string
  title: string
  messages: any[]
  createdAt: Date
  updatedAt: Date
}

interface ChatSidebarProps {
  chats: Chat[]
  activeChatId: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
  isGuest: boolean
}

export default function ChatSidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isGuest
}: ChatSidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy">Chat History</h2>
          <button
            onClick={onNewChat}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="New Chat"
          >
            <Plus size={20} className="text-navy" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No chat history yet. Start a new conversation!
          </div>
        ) : (
          <div className="p-2">
            {chats.map((chat) => {
              const firstMessage = chat.messages.find(m => m.role === 'user')
              const snippet = firstMessage?.content.substring(0, 50) || 'New Chat'
              const isActive = chat.id === activeChatId

              return (
                <div
                  key={chat.id}
                  className={`relative p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-100 border border-blue-300'
                      : 'hover:bg-gray-100'
                  }`}
                  onMouseEnter={() => setHoveredChatId(chat.id)}
                  onMouseLeave={() => setHoveredChatId(null)}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="pr-8">
                    <p className={`text-sm font-medium mb-1 truncate ${
                      isActive ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {chat.title || snippet}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatDate(chat.updatedAt)}</span>
                      <span>•</span>
                      <span>{chat.messages.length} messages</span>
                    </div>
                  </div>

                  {hoveredChatId === chat.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteChat(chat.id)
                      }}
                      className="absolute top-3 right-3 p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                      aria-label="Delete chat"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t bg-gray-50">
        {isGuest ? (
          <div className="bg-gradient-to-r from-gold/20 to-gold/10 p-4 rounded-lg border border-gold/30">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-gold" />
              <span className="text-sm font-semibold text-navy">Guest User</span>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              Sign in to save your chat history and get unlimited access
            </p>
            <button className="w-full bg-gold hover:bg-gold/90 text-navy px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Crown size={16} />
              Upgrade
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">User</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

