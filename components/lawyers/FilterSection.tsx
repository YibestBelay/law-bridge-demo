'use client'

interface FilterSectionProps {
  title: string
  children: React.ReactNode
}

export default function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  )
}

