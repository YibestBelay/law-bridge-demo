'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import LawBridgeAuth from './LawBridgeAuth'
import type { AuthModalMode } from '@/lib/authModalEvents'

interface AuthModalProps {
  open: boolean
  mode: AuthModalMode
  onClose: () => void
}

export default function AuthModal({ open, mode, onClose }: AuthModalProps) {
  useEffect(() => {
    if (open) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = ''
    }

    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto scrollbar-hide"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute bg-blue-500 top-4 right-4 p-2 rounded-lg text-gray-100 hover:bg-black/40 transition-colors z-[110]"
          aria-label="Close authentication"
        >
          <X size={20} />
        </button>
        <LawBridgeAuth initialMode={mode} />
      </div>
    </div>
  )
}

