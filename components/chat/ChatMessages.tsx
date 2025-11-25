'use client'

import { Bot, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'system' ? (
            <div className="flex justify-center">
              <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-lg text-sm max-w-md text-center">
                {message.content}
              </div>
            </div>
          ) : message.role === 'assistant' ? (
            <div className="flex gap-3 max-w-3xl">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="text-blue-600" size={18} />
                </div>
              </div>
              <div className="flex-1 group">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-block">
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-900">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-900">{children}</li>,
                        code: ({ children, className }) => {
                          const isInline = !className
                          return isInline ? (
                            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900">
                              {children}
                            </code>
                          ) : (
                            <code className="block bg-gray-200 p-3 rounded-lg text-sm font-mono text-gray-900 overflow-x-auto">
                              {children}
                            </code>
                          )
                        },
                        a: ({ href, children }) => (
                          <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    aria-label="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check className="text-green-600" size={14} />
                    ) : (
                      <Copy className="text-gray-500" size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="max-w-3xl flex flex-col items-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          )}

          {/* Disclaimer after AI response */}
          {message.role === 'assistant' && (
            <div className="mt-4 max-w-3xl">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <span className="text-amber-600 text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm text-amber-900">
                    This is general information. For legal advice, consult a licensed lawyer.
                  </p>
                  <button className="mt-2 text-sm font-semibold text-amber-700 hover:text-amber-900 underline">
                    Find a Lawyer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex gap-3 max-w-3xl">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="text-blue-600" size={18} />
            </div>
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
    </div>
  )
}

