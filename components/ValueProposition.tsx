'use client'

import { Bot, Briefcase, Clock, Shield, Star, CreditCard, MessageCircle, ArrowRight } from 'lucide-react'

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Assistant Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-xl">
                <Bot className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-navy">Free AI Legal Assistant</h2>
            </div>
            
            <p className="text-gray-600 text-lg mb-6">
              Ask questions about Ethiopian law, get instant answers trained on official legal documents
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Clock className="text-green" size={20} />
                <span className="text-gray-700">Available 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="text-green" size={20} />
                <span className="text-gray-700">Based on Ethiopian law</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="text-green" size={20} />
                <span className="text-gray-700">No registration needed</span>
              </li>
            </ul>
            
            <a href="/chat" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
              Start Chatting
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Lawyer Marketplace Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gold/20 p-4 rounded-xl">
                <Briefcase className="text-gold" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-navy">Hire Verified Lawyers</h2>
            </div>
            
            <p className="text-gray-600 text-lg mb-6">
              Connect directly with licensed Ethiopian lawyers for consultations and representation
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <Shield className="text-gold" size={20} />
                <span className="text-gray-700">Verified professionals</span>
              </li>
              <li className="flex items-center gap-3">
                <CreditCard className="text-gold" size={20} />
                <span className="text-gray-700">Secure payments</span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="text-gold" size={20} />
                <span className="text-gray-700">Rated by clients</span>
              </li>
            </ul>
            
            <a href="/lawyers" className="w-full bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all">
              Browse Lawyers
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

