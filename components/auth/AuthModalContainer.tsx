'use client'

import { useEffect, useState } from 'react'
import AuthModal from './AuthModal'
import type { AuthModalMode } from '@/lib/authModalEvents'

export default function AuthModalContainer() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AuthModalMode>('signin')

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<AuthModalMode>
      setMode(custom.detail || 'signin')
      setOpen(true)
    }
    window.addEventListener('lawbridge-auth-open', handler)
    return () => window.removeEventListener('lawbridge-auth-open', handler)
  }, [])

  return <AuthModal open={open} mode={mode} onClose={() => setOpen(false)} />
}

