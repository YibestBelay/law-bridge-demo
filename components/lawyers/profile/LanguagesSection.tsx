'use client'

interface Language {
  name: string
  flag: string
  level: string
}

interface LanguagesSectionProps {
  languages: Language[]
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-navy mb-6">Languages</h2>
      <div className="flex flex-wrap gap-4">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg"
          >
            <span className="text-2xl">{lang.flag}</span>
            <div>
              <div className="font-semibold text-gray-900">{lang.name}</div>
              <div className="text-sm text-gray-600">{lang.level}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

