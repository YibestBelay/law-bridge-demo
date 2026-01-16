'use client'

import { Shield, DollarSign, Lock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All lawyers on our platform are verified and licensed to practice in Ethiopia. We conduct thorough background checks to ensure quality and trustworthiness.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: DollarSign,
    title: 'Affordable Access',
    description: 'We believe legal help should be accessible to everyone. Our platform offers competitive pricing and free AI assistance to reduce legal costs.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    description: 'Your data and conversations are encrypted and protected. We follow strict privacy policies to ensure your legal information remains confidential.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-navy mb-4">
          Why Choose LawBridge?
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          We're committed to making legal services accessible, affordable, and trustworthy for all Ethiopians
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-4 rounded-xl ${feature.bgColor} mb-4`}>
                  <Icon className={feature.color} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

