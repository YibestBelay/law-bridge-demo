'use client'

import { Home, MessageCircle, Search, User } from 'lucide-react'

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <a href="#home" className="flex flex-col items-center gap-1 text-gray-600 hover:text-navy transition-colors">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </a>
        <a href="#ai-assistant" className="flex flex-col items-center gap-1 text-gray-600 hover:text-navy transition-colors">
          <MessageCircle size={20} />
          <span className="text-xs">AI Chat</span>
        </a>
        <a href="#lawyers" className="flex flex-col items-center gap-1 text-gray-600 hover:text-navy transition-colors">
          <Search size={20} />
          <span className="text-xs">Lawyers</span>
        </a>
        <a href="#profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-navy transition-colors">
          <User size={20} />
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </nav>
  )
}

