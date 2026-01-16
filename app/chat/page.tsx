'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/shared/Layout'
import { openAuthModal } from '@/lib/authModalEvents'
import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatHeader from '@/components/chat/ChatHeader'
import WelcomeState from '@/components/chat/WelcomeState'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'
import GuestOverlay from '@/components/chat/GuestOverlay'
import MobileChatHistory from '@/components/chat/MobileChatHistory'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
import { User } from '@supabase/supabase-js'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isGuest, setIsGuest] = useState(true)
  const [questionsRemaining, setQuestionsRemaining] = useState(2)
  const [showGuestOverlay, setShowGuestOverlay] = useState(false)
  const [showHistorySheet, setShowHistorySheet] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeChat = chats.find(chat => chat.id === activeChatId)

  /* ---------------- AUTH SESSION RESTORE ---------------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setIsGuest(!data.user)
      setAuthLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setIsGuest(!session?.user)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  /* ---------------- LOAD CHAT HISTORY ---------------- */
  useEffect(() => {
    const savedChats = localStorage.getItem('lawbridge-chats')
    if (savedChats) {
      const parsed = JSON.parse(savedChats)
      setChats(
        parsed.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
      )
    }
  }, [])

  /* ---------------- SAVE CHAT HISTORY ---------------- */
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('lawbridge-chats', JSON.stringify(chats))
    }
  }, [chats])

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  /* ---------------- CHAT ACTIONS ---------------- */
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setChats([newChat, ...chats])
    setActiveChatId(newChat.id)
    setMessages([])
  }

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId)
    const chat = chats.find(c => c.id === chatId)
    if (chat) setMessages(chat.messages)
    setShowHistorySheet(false)
  }

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(c => c.id !== chatId))
    if (activeChatId === chatId) {
      setActiveChatId(null)
      setMessages([])
    }
  }

  const sendMessage = async (content: string) => {
    if (isGuest && messages.length === 0) {
      openAuthModal('signin')
      setShowGuestOverlay(true)
      return
    }

    if (isGuest && questionsRemaining <= 0) {
      setShowGuestOverlay(true)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'system',
          content: "You've reached your question limit. Please sign in to continue",
          timestamp: new Date(),
        },
      ])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    if (activeChatId) {
      setChats(chats.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? content.slice(0, 50) : chat.title,
              updatedAt: new Date(),
            }
          : chat
      ))
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.slice(0, 50),
        messages: [userMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setChats([newChat, ...chats])
      setActiveChatId(newChat.id)
    }

    if (isGuest) setQuestionsRemaining(q => q - 1)

    setIsTyping(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a sample AI response to your question: "${content}".`,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  /* ---------------- AUTH LOADING STATE ---------------- */
  if (authLoading) {
    return (
      <Layout showNav={false}>
        <div className="min-h-screen flex flex-1 items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    )
  }

  /* ---------------- RENDER ---------------- */
  return user ? (
    <Layout showNav={false}>
      <div className="flex flex-1 bg-gray-50 overflow-hidden">
        <div className="hidden md:block w-1/4 border-r bg-white">
          <ChatSidebar
            chats={chats}
            activeChatId={activeChatId}
            onNewChat={createNewChat}
            onSelectChat={selectChat}
            onDeleteChat={deleteChat}
            isGuest={isGuest}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <ChatHeader
            isGuest={isGuest}
            questionsRemaining={questionsRemaining}
            onDismissBanner={() => {}}
          />

          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <WelcomeState onQuestionClick={sendMessage} />
            ) : (
              <ChatMessages messages={messages} isTyping={isTyping} />
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            onSend={sendMessage}
            disabled={isGuest && questionsRemaining <= 0}
            isGuest={isGuest}
          />
        </div>

        {showGuestOverlay && (
          <GuestOverlay
            onClose={() => setShowGuestOverlay(false)}
            onSignIn={() => setShowGuestOverlay(false)}
          />
        )}

        <MobileChatHistory
          isOpen={showHistorySheet}
          onClose={() => setShowHistorySheet(false)}
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={createNewChat}
          onSelectChat={selectChat}
          onDeleteChat={deleteChat}
        />
      </div>
    </Layout>
  ) : (
    <Layout showNav={false}>
      <div className="flex flex-1 h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="bg-navy text-white px-6 py-3 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    </Layout>
  )
}
