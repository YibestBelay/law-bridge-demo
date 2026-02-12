'use client'

import { useState } from 'react'
import Layout from '@/components/shared/Layout'
import ConversationList from '@/components/messages/ConversationList'
import ChatArea from '@/components/messages/ChatArea'
import CaseDetailsSidebar from '@/components/messages/CaseDetailsSidebar'
import MobileCaseDetails from '@/components/messages/MobileCaseDetails'
import NewMessageModal from '@/components/messages/NewMessageModal'
import MobileNav from '@/components/messages/MobileNav'

export interface Conversation {
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

interface Message {
  id: string
  sender: 'lawyer' | 'client' | 'system'
  content: string
  timestamp: Date
  read: boolean
  attachments?: Array<{
    name: string
    type: string
    size: number
    url: string
  }>
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    lawyer: {
      id: 'lawyer1',
      name: 'Dr. Abebe Bekele',
      title: 'Family Law Attorney',
      avatar: 'AB',
      status: 'online',
      verified: true
    },
    lastMessage: "I've reviewed your documents and would like to discuss the next steps...",
    timestamp: '2 hours ago',
    unreadCount: 3,
    caseId: 'LC-2401',
    pinned: true
  },
  {
    id: '2',
    lawyer: {
      id: 'lawyer2',
      name: 'Sara Haile',
      title: 'Property Law Attorney',
      avatar: 'SH',
      status: 'away',
      verified: true
    },
    lastMessage: 'The property documents are ready for review.',
    timestamp: '1 day ago',
    unreadCount: 0,
    caseId: 'LC-2387',
    pinned: false
  },
  {
    id: '3',
    lawyer: {
      id: 'lawyer3',
      name: 'David Tesfaye',
      title: 'Contract Law Attorney',
      avatar: 'DT',
      status: 'offline',
      verified: true
    },
    lastMessage: 'Thank you for your payment. I will begin work on your contract...',
    timestamp: '3 days ago',
    unreadCount: 1,
    caseId: 'LC-2365',
    pinned: false
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'system',
    content: 'Dr. Abebe accepted your consultation request',
    timestamp: new Date('2024-11-01T10:00:00'),
    read: true
  },
  {
    id: '2',
    sender: 'lawyer',
    content: 'Hello! Thank you for choosing me for your family law case. I\'ve reviewed your initial information and I\'m ready to help you.',
    timestamp: new Date('2024-11-01T10:05:00'),
    read: true
  },
  {
    id: '3',
    sender: 'client',
    content: 'Thank you! I appreciate your quick response. I have some documents I\'d like to share with you.',
    timestamp: new Date('2024-11-01T10:10:00'),
    read: true
  },
  {
    id: '4',
    sender: 'lawyer',
    content: 'Please go ahead and upload them. I\'ll review them and get back to you with my analysis.',
    timestamp: new Date('2024-11-01T10:12:00'),
    read: true
  },
  {
    id: '5',
    sender: 'system',
    content: 'Document uploaded: Property_Deed.pdf',
    timestamp: new Date('2024-11-01T10:15:00'),
    read: true
  },
  {
    id: '6',
    sender: 'lawyer',
    content: 'I\'ve reviewed your documents and would like to discuss the next steps. Can we schedule a call for tomorrow?',
    timestamp: new Date('2024-11-02T08:30:00'),
    read: false
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [showCaseDetails, setShowCaseDetails] = useState(true)
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'archived' | 'unread'>('all')

  const [showConversationList, setShowConversationList] = useState(false)

  return (
    <Layout showNav={false}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Left Sidebar - Conversation List */}
        <div className={`${showConversationList || !selectedConversation ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 border-r bg-white overflow-hidden flex flex-col absolute lg:relative z-40 lg:z-auto h-full`}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConversation?.id ?? null}
            onSelect={(conv) => {
              setSelectedConversation(conv)
              setShowConversationList(false)
            }}
            onNewMessage={() => setShowNewMessageModal(true)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedConversation ? (
            <ChatArea
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={(content) => {
                const newMessage: Message = {
                  id: Date.now().toString(),
                  sender: 'client',
                  content,
                  timestamp: new Date(),
                  read: false
                }
                setMessages([...messages, newMessage])
              }}
              onToggleCaseDetails={() => setShowCaseDetails(!showCaseDetails)}
              onBack={() => setShowConversationList(true)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-gray-600">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Case Details (Desktop) */}
        {showCaseDetails && selectedConversation && (
          <div className="hidden lg:block w-1/4 border-l bg-white overflow-y-auto">
            <CaseDetailsSidebar conversation={selectedConversation} />
          </div>
        )}

        {/* Mobile Case Details Bottom Sheet */}
        {selectedConversation && (
          <MobileCaseDetails
            isOpen={showCaseDetails}
            onClose={() => setShowCaseDetails(false)}
            conversation={selectedConversation}
          />
        )}

        {/* New Message Modal */}
        {showNewMessageModal && (
          <NewMessageModal onClose={() => setShowNewMessageModal(false)} />
        )}

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Mobile FAB for New Message */}
        {selectedConversation && (
          <button
            onClick={() => setShowNewMessageModal(true)}
            className="lg:hidden fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40"
            aria-label="New Message"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </Layout>
  )
}

