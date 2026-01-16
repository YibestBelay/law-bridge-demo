'use client'

interface AreaOfPractice {
  name: string
  icon: string
}

interface SpecializationsSectionProps {
  areasOfPractice: AreaOfPractice[]
}

export default function SpecializationsSection({ areasOfPractice }: SpecializationsSectionProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-6">Areas of Practice</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {areasOfPractice.map((area, index) => (
          <button
            key={index}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left group"
          >
            <div className="text-3xl mb-2">{area.icon}</div>
            <div className="font-semibold text-gray-900 group-hover:text-navy">
              {area.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
