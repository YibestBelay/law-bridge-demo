'use client'

interface LoadingStateProps {
  viewMode: 'grid' | 'list'
}

export default function LoadingState({ viewMode }: LoadingStateProps) {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="text-center mb-4">
        <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-12 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  )

  return (
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
      : 'space-y-4'
    }>
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

