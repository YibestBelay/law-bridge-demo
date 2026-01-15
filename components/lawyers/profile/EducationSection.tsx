'use client'

import { Check } from 'lucide-react'

interface Education {
  degree: string
  institution: string
  year: string
}

interface EducationSectionProps {
  education: Education[]
  licenseNumber: string
}

export default function EducationSection({ education, licenseNumber }: EducationSectionProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-6">Education & Certifications</h2>
      
      {/* Timeline */}
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="relative pl-8 pb-6 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{edu.year}</span>
                <div className="flex items-center gap-1 text-green-600">
                  <Check size={16} />
                  <span className="text-xs">Verified</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* License Number */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">License Number</p>
            <p className="font-semibold text-gray-900">{licenseNumber}</p>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Check size={20} />
            <span className="text-sm font-medium">Verified</span>
          </div>
        </div>
      </div>
    </section>
  )
}

