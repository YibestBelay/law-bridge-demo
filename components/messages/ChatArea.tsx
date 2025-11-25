'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Video, Info, MoreVertical, Paperclip, Smile, Mic, Send, Check, CheckCheck } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

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
  caseId?: string
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

interface ChatAreaProps {
  conversation: Conversation
  messages: Message[]
  onSendMessage: (content: string) => void
  onToggleCaseDetails: () => void
  onBack?: () => void
}

export default function ChatArea({
  conversation,
  messages,
  onSendMessage,
  onToggleCaseDetails,
  onBack
}: ChatAreaProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  const groupedMessages = messages.reduce((groups, msg) => {
    const date = formatDate(msg.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(msg)
    return groups
  }, {} as Record<string, Message[]>)

  const statusText = conversation.lawyer.status === 'online'
    ? 'Active now'
    : conversation.lawyer.status === 'away'
    ? 'Away'
    : 'Offline'

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
              {conversation.lawyer.avatar}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${
              conversation.lawyer.status === 'online' ? 'bg-green-500' :
              conversation.lawyer.status === 'away' ? 'bg-yellow-500' :
              'bg-gray-400'
            } rounded-full border-2 border-white`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{conversation.lawyer.name}</h3>
              {conversation.lawyer.verified && (
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  ✓ Verified
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{conversation.lawyer.title}</p>
            <p className={`text-xs ${
              conversation.lawyer.status === 'online' ? 'text-green-600' : 'text-gray-500'
            }`}>
              {conversation.lawyer.status === 'online' ? '🟢' : '⚫'} {statusText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Phone className="text-gray-600" size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Video className="text-gray-600" size={20} />
          </button>
          <button
            onClick={onToggleCaseDetails}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Info className="text-gray-600" size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="text-gray-600" size={20} />
          </button>
        </div>
      </div>

      {/* Case Banner */}
      {conversation.caseId && (
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Case #{conversation.caseId}: Family Law Consultation
              </p>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
                View Full Case Details →
              </a>
            </div>
            <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
              In Progress
            </span>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-xs font-medium text-gray-600">{date}</span>
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <p className="text-sm text-gray-500 italic">{msg.content}</p>
                  </div>
                )
              }

              const isClient = msg.sender === 'client'

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  {!isClient && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {conversation.lawyer.avatar}
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[70%] ${isClient ? 'items-end' : 'items-start'}`}>
                    {!isClient && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {conversation.lawyer.name}
                        </span>
                        {conversation.lawyer.verified && (
                          <span className="text-xs text-green-600">✓ Verified Lawyer</span>
                        )}
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isClient
                          ? 'bg-blue-600 text-white rounded-tr-sm'
                          : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong>{children}</strong>,
                            em: ({ children }) => <em>{children}</em>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-1">{children}</ol>,
                            a: ({ href, children }) => (
                              <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            )
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 mt-1 ${isClient ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                      {isClient && (
                        <span className="text-blue-600">
                          {msg.read ? <CheckCheck size={14} /> : <Check size={14} />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {conversation.lawyer.avatar}
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white pb-20 lg:pb-4">
        <div className="flex items-end gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Paperclip className="text-gray-600" size={20} />
            <input type="file" multiple className="hidden" />
          </label>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Smile className="text-gray-600" size={20} />
          </button>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ minHeight: '48px', maxHeight: '200px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          🔒 End-to-end encrypted
        </div>
      </div>
    </div>
  )
}

