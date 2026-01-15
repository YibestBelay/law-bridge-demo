'use client'

import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  rating: number
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Kebede T.',
    location: 'Addis Ababa',
    rating: 5,
    quote: 'The AI assistant helped me understand my employment rights quickly. When I needed a lawyer, I found an excellent one through the platform. Highly recommended!',
    avatar: '👤'
  },
  {
    name: 'Marta H.',
    location: 'Dire Dawa',
    rating: 5,
    quote: 'As a small business owner, I needed legal advice for contracts. LawBridge connected me with a great corporate lawyer at an affordable price. The process was smooth and professional.',
    avatar: '👤'
  },
  {
    name: 'Yonas M.',
    location: 'Bahir Dar',
    rating: 5,
    quote: 'I was facing a property dispute and didn\'t know where to start. The free AI assistant gave me initial guidance, and then I hired a lawyer who helped me resolve the issue successfully.',
    avatar: '👤'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-navy">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}, Ethiopia</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={20}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

