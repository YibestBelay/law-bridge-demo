'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageCircle, Search, User, LogOut } from 'lucide-react'
import { openAuthModal } from '@/lib/authModalEvents'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/lawyers', label: 'Find Lawyers' },
    { href: '/chat', label: 'AI Assistant' },
    { href: '/dashboard', label: 'Dashboard' }
  ]

  const isDashboardPage = pathname.startsWith('/dashboard') || pathname.startsWith('/lawyer-dashboard') || pathname.startsWith('/settings') || pathname.startsWith('/messages')
  const isChatPage = pathname.startsWith('/chat')
  const isLawyerPage = pathname.startsWith('/lawyers') && !pathname.startsWith('/lawyers/')

  // Hide navigation on certain pages (like chat, messages) or show minimal version
  if (isChatPage || pathname.startsWith('/messages')) {
    return null // Or return minimal nav
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      isScrolled || isDashboardPage
        ? 'bg-white/95 backdrop-blur-sm shadow-md'
        : 'bg-white/95 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-navy to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <span className="text-xl font-bold text-navy hidden sm:block">LawBridge</span>
            <span className="text-xs text-gray-500 hidden md:block">Ethiopia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '/chat' || link.href === '/lawyers') {
                    e.preventDefault()
                    openAuthModal(link.href === '/chat' ? 'signin' : 'signup')
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-navy font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {pathname.startsWith('/dashboard') || pathname.startsWith('/lawyer-dashboard') ? (
              <>
                <Link
                  href="/messages"
                  className="relative p-2 text-gray-600 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                <Link
                  href="/settings"
                  className="p-2 text-gray-600 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User size={20} />
                </Link>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-4 py-2 bg-green hover:bg-green/90 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Try AI Free</span>
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-gold hover:bg-gold/90 text-navy rounded-lg text-sm font-semibold transition-colors"
                >
                  Find Lawyer
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {pathname.startsWith('/dashboard') || pathname.startsWith('/lawyer-dashboard') ? (
              <Link
                href="/messages"
                className="relative p-2 text-gray-600"
              >
                <MessageCircle size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
            ) : null}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-navy"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setIsOpen(false)
                  if (link.href === '/chat' || link.href === '/lawyers') {
                    e.preventDefault()
                    openAuthModal(link.href === '/chat' ? 'signin' : 'signup')
                  }
                }}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-navy font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!(pathname.startsWith('/dashboard') || pathname.startsWith('/lawyer-dashboard')) && (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openAuthModal('signin')
                  }}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-800 rounded-lg text-base font-semibold text-center hover:bg-gray-50"
                >
                  Sign In / Register
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openAuthModal('signin')
                  }}
                  className="w-full px-4 py-3 bg-green text-white rounded-lg text-base font-semibold text-center"
                >
                  Try AI Assistant Free
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openAuthModal('signup')
                  }}
                  className="w-full px-4 py-3 bg-gold text-navy rounded-lg text-base font-semibold text-center"
                >
                  Find a Lawyer
                </button>
              </>
            )}
            {(pathname.startsWith('/dashboard') || pathname.startsWith('/lawyer-dashboard')) && (
              <>
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Settings
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

