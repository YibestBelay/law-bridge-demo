'use client'

import { useEffect, useState } from 'react'
import AuthModal from './AuthModal'
import type { AuthModalMode } from '@/lib/authModalEvents'

export default function AuthModalContainer() {
  const [open, setOpen] = useState(true) // Set to true to show by default
  const [mode, setMode] = useState<AuthModalMode>('signin')

  useEffect(() => {
    const openHandler = (event: Event) => {
      const custom = event as CustomEvent<AuthModalMode>
      setMode(custom.detail || 'signin')
      setOpen(true)
    }
    const closeHandler = () => {
      setOpen(false)
    }
    window.addEventListener('lawbridge-auth-open', openHandler)
    window.addEventListener('lawbridge-auth-close', closeHandler)
    return () => {
      window.removeEventListener('lawbridge-auth-open', openHandler)
      window.removeEventListener('lawbridge-auth-close', closeHandler)
    }
  }, [])

  return <AuthModal open={open} mode={mode} onClose={() => setOpen(false)} />
}

