'use client'

import { useState } from 'react'
import { Plus, Search, Pin } from 'lucide-react'

interface Conversation {
  id: string
  lawyer: {
    id: string
    name: string
    title: string
    avatar: string
    status: 'online' | 'away' | 'offline'
    verified: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  caseId?: string
  pinned: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (conversation: Conversation) => void
  onNewMessage: () => void
  activeFilter: 'all' | 'active' | 'archived' | 'unread'
  onFilterChange: (filter: 'all' | 'active' | 'archived' | 'unread') => void
}

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-400'
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onNewMessage,
  activeFilter,
  onFilterChange
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(conv => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        conv.lawyer.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
      )
    }
    return true
  })

  const pinnedConversations = filteredConversations.filter(c => c.pinned)
  const regularConversations = filteredConversations.filter(c => !c.pinned)

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  const activeCount = conversations.filter(c => c.caseId).length

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy">Messages</h2>
            <button
              onClick={onNewMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 mb-4">No messages yet</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              Find a Lawyer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy">Messages</h2>
          <button
            onClick={onNewMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="New Message"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-4 pb-2 border-b flex gap-2 overflow-x-auto">
        {[
          { id: 'all' as const, label: 'All Messages' },
          { id: 'active' as const, label: 'Active Cases', badge: activeCount },
          { id: 'archived' as const, label: 'Archived' },
          { id: 'unread' as const, label: 'Unread', badge: unreadCount }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.label}
            {filter.badge && filter.badge > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {filter.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Conversations */}
        {pinnedConversations.length > 0 && (
          <div className="p-2">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2">PINNED</p>
            {pinnedConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                isSelected={selectedId === conv.id}
                onClick={() => onSelect(conv)}
              />
            ))}
          </div>
        )}

        {/* Regular Conversations */}
        {regularConversations.length > 0 && (
          <div className="p-2">
            {pinnedConversations.length > 0 && (
              <p className="text-xs font-semibold text-gray-500 px-2 mb-2">ALL MESSAGES</p>
            )}
            {regularConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                isSelected={selectedId === conv.id}
                onClick={() => onSelect(conv)}
              />
            ))}
          </div>
        )}

        {filteredConversations.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No conversations found
          </div>
        )}
      </div>
    </div>
  )
}

function ConversationCard({
  conversation,
  isSelected,
  onClick
}: {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg mb-1 text-left transition-colors ${
        isSelected
          ? 'bg-blue-50 border-l-4 border-blue-600'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
            {conversation.lawyer.avatar}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${statusColors[conversation.lawyer.status]} rounded-full border-2 border-white`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {conversation.lawyer.name}
              </h3>
              {conversation.pinned && (
                <Pin className="text-gray-400" size={14} />
              )}
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {conversation.timestamp}
            </span>
          </div>

          <p className="text-sm text-gray-600 truncate mb-1">
            {conversation.lastMessage}
          </p>

          <div className="flex items-center gap-2">
            {conversation.caseId && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                #{conversation.caseId}
              </span>
            )}
            {conversation.unreadCount > 0 && (
              <span className="ml-auto bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

