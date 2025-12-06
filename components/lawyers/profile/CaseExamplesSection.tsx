'use client'

interface Case {
  type: string
  description: string
  outcome: string
  year: string
}

interface CaseExamplesSectionProps {
  cases: Case[]
}

export default function CaseExamplesSection({ cases }: CaseExamplesSectionProps) {
  const outcomeColors = {
    Won: 'bg-green-100 text-green-700',
    Settled: 'bg-blue-100 text-blue-700',
    Lost: 'bg-red-100 text-red-700'
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-6">Notable Cases</h2>
      <div className="space-y-4 mb-4">
        {cases.map((caseItem, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                {caseItem.type}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  outcomeColors[caseItem.outcome as keyof typeof outcomeColors] || 'bg-gray-100 text-gray-700'
                }`}>
                  {caseItem.outcome}
                </span>
                <span className="text-xs text-gray-500">{caseItem.year}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{caseItem.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 italic">
        All cases anonymized for client privacy
      </p>
    </section>
  )
}

