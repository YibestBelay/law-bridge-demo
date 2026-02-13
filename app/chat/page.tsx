'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/shared/Layout'
import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatHeader from '@/components/chat/ChatHeader'
import WelcomeState from '@/components/chat/WelcomeState'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'
import MobileChatHistory from '@/components/chat/MobileChatHistory'

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
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  // Disable guest mode since auth is removed
  const isGuest = false
  const [questionsRemaining, setQuestionsRemaining] = useState(999)
  const [showGuestOverlay, setShowGuestOverlay] = useState(false)
  const [showHistorySheet, setShowHistorySheet] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeChat = chats.find(chat => chat.id === activeChatId)

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


  /* ---------------- RENDER ---------------- */
  return (
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
            onDismissBanner={() => { }}
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
  )
}
