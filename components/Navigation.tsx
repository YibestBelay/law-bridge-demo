'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-navy">LawBridge</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-700 hover:text-navy px-3 py-2 text-sm font-medium">Home</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-navy px-3 py-2 text-sm font-medium">How It Works</a>
              <a href="/lawyers" className="text-gray-700 hover:text-navy px-3 py-2 text-sm font-medium">Lawyers</a>
              <a href="#about" className="text-gray-700 hover:text-navy px-3 py-2 text-sm font-medium">About</a>
              <a href="/chat" className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green/90">
                Try AI Free
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-navy"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a href="#home" className="text-gray-700 hover:text-navy block px-3 py-2 text-base font-medium">Home</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-navy block px-3 py-2 text-base font-medium">How It Works</a>
            <a href="/lawyers" className="text-gray-700 hover:text-navy block px-3 py-2 text-base font-medium">Lawyers</a>
            <a href="#about" className="text-gray-700 hover:text-navy block px-3 py-2 text-base font-medium">About</a>
            <button className="w-full text-left bg-green text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-green/90">
              Try AI Free
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

