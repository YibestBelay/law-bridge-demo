'use client'

import { X, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Chat {
  id: string
  title: string
  messages: any[]
  createdAt: Date
  updatedAt: Date
}

interface MobileChatHistoryProps {
  isOpen: boolean
  onClose: () => void
  chats: Chat[]
  activeChatId: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
}

export default function MobileChatHistory({
  isOpen,
  onClose,
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat
}: MobileChatHistoryProps) {
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 md:hidden max-h-[80vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy">Chat History</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onNewChat}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="New Chat"
            >
              <Plus size={20} className="text-navy" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">
              No chat history yet. Start a new conversation!
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => {
                const firstMessage = chat.messages.find((m: any) => m.role === 'user')
                const snippet = firstMessage?.content.substring(0, 50) || 'New Chat'
                const isActive = chat.id === activeChatId

                return (
                  <div
                    key={chat.id}
                    className={`relative p-3 rounded-lg ${
                      isActive
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => setHoveredChatId(chat.id)}
                    onMouseLeave={() => setHoveredChatId(null)}
                    onClick={() => {
                      onSelectChat(chat.id)
                      onClose()
                    }}
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

                    {(hoveredChatId === chat.id || isActive) && (
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
      </div>
    </>
  )
}

