'use client'

export default function PerformanceInsights() {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-navy mb-4">Your Performance</h2>

      {/* Response Time Trend */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">Response Time</span>
          <span className="text-xs text-gray-600">Last 30 days</span>
        </div>
        <div className="h-24 flex items-end gap-1">
          {[1.2, 1.3, 1.1, 1.4, 1.2, 1.5, 1.3].map((hours, index) => {
            const maxHours = 2
            const height = ((maxHours - hours) / maxHours) * 100
            return (
              <div
                key={index}
                className="flex-1 bg-blue-600 rounded-t hover:bg-blue-700 transition-colors"
                style={{ height: `${height}%` }}
                title={`${hours} hours`}
              />
            )
          })}
        </div>
        <div className="text-xs text-gray-600 mt-1">Average: 1.3 hours</div>
      </div>

      {/* Case Completion Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">Case Completion Rate</span>
          <span className="text-sm font-bold text-green-600">94%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ width: '94%' }}
          />
        </div>
      </div>

      {/* Client Satisfaction */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">Client Satisfaction</span>
          <span className="text-sm font-bold text-yellow-600">4.9/5.0</span>
        </div>
        <div className="h-16 flex items-end gap-1">
          {[85, 90, 88, 92, 95, 94, 96].map((percentage, index) => (
            <div
              key={index}
              className="flex-1 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors"
              style={{ height: `${percentage}%` }}
              title={`${percentage}%`}
            />
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div>
            <div className="text-sm font-semibold text-blue-900 mb-1">Performance Tip</div>
            <p className="text-xs text-blue-800">
              Respond within 1 hour to boost your ranking and get more requests.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
