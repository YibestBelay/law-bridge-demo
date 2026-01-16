'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EarningsOverview() {
  const earnings = {
    total: 15450,
    completed: 12300,
    ongoing: 3150,
    platformFee: 1545
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Earnings This Month</h2>
        <Link
          href="/lawyer-dashboard/earnings"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View Detailed Report
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="text-4xl font-bold text-navy mb-6">
        {earnings.total.toLocaleString()} ETB
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Completed Cases</span>
          <span className="font-semibold text-gray-900">{earnings.completed.toLocaleString()} ETB</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Ongoing Cases</span>
          <span className="font-semibold text-gray-900">{earnings.ongoing.toLocaleString()} ETB</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <span className="text-sm text-gray-600">Platform Fee (10%)</span>
          <span className="font-semibold text-red-600">-{earnings.platformFee.toLocaleString()} ETB</span>
        </div>
      </div>

      {/* Simple Bar Chart Representation */}
      <div className="space-y-2">
        <div className="text-xs text-gray-600 mb-2">Earnings by Week</div>
        <div className="flex items-end gap-2 h-24">
          {[3500, 4200, 3800, 3950].map((amount, index) => {
            const maxAmount = 5000
            const height = (amount / maxAmount) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs text-gray-500 mt-1">W{index + 1}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
