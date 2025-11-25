'use client'

import { MessageSquare } from 'lucide-react'

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        <button className="flex flex-col items-center gap-1 text-navy">
          <MessageSquare size={20} />
          <span className="text-xs font-medium">Messages</span>
        </button>
      </div>
    </nav>
  )
}

