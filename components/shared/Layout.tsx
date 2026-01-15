'use client'

import Navigation from './Navigation'
import AuthModalContainer from '../auth/AuthModalContainer'

interface LayoutProps {
  children: React.ReactNode
  showNav?: boolean
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNav && <Navigation />}
      <main className={showNav ? 'pt-16' : ''}>
        {children}
      </main>
      <AuthModalContainer />
    </div>
  )
}

