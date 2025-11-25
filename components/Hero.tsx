'use client'

import { MessageCircle, Search } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative pt-16 bg-gradient-to-br from-navy via-blue-700 to-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Access Justice, Anytime, Anywhere in Ethiopia
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Free AI legal guidance + Connect with verified Ethiopian lawyers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="/chat" className="bg-green hover:bg-green/90 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all">
                <MessageCircle size={24} />
                Try AI Assistant Free
              </a>
              <a href="/lawyers" className="bg-gold hover:bg-gold/90 text-navy px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all">
                <Search size={24} />
                Find a Lawyer
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-100">Verified Lawyers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm text-blue-100">Consultations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-blue-100">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">⚖️</div>
                    <div className="text-xl font-semibold">Ethiopian Legal Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

