'use client'

import { Send, Mic, Paperclip } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  isGuest?: boolean
}

export default function ChatInput({ onSend, disabled, isGuest }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [draft, setDraft] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Load draft from localStorage
    const savedDraft = localStorage.getItem('lawbridge-chat-draft')
    if (savedDraft) {
      setDraft(savedDraft)
      setMessage(savedDraft)
    }
  }, [])

  useEffect(() => {
    // Auto-save draft
    if (message) {
      localStorage.setItem('lawbridge-chat-draft', message)
    } else {
      localStorage.removeItem('lawbridge-chat-draft')
    }
  }, [message])

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
      localStorage.removeItem('lawbridge-chat-draft')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          {/* Attach File Button (Disabled for guests) */}
          <button
            disabled
            className="p-2 text-gray-400 cursor-not-allowed relative group"
            title="Available for lawyers only"
            aria-label="Attach file (Available for lawyers only)"
          >
            <Paperclip size={20} />
            {isGuest && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Available for lawyers only
              </div>
            )}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={"Ask about Ethiopian law, regulations, or legal procedures..."}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm"
              style={{ minHeight: '48px', maxHeight: '200px' }}
            />
            {disabled && (
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                Sign in to continue
              </div>
            )}
          </div>

          {/* Microphone Button (Optional) */}
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Voice input"
            title="Voice input (Coming soon)"
          >
            <Mic size={20} />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

