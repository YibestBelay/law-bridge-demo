'use client'

import { MessageCircle, Search } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-green to-green/90 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Legal Help?
        </h2>
        <p className="text-xl text-green-50 mb-8">
          Start your journey to justice today. Choose the option that works best for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/chat" className="bg-white hover:bg-gray-100 text-green px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all">
            <MessageCircle size={24} />
            Try AI Free
          </a>
          <a href="/lawyers" className="bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all">
            <Search size={24} />
            Consult a Lawyer
          </a>
        </div>
      </div>
    </section>
  )
}

