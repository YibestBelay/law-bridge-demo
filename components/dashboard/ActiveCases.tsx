'use client'

import Link from 'next/link'
import { ArrowRight, Eye, CreditCard } from 'lucide-react'

interface Case {
  id: string
  lawyer: {
    name: string
    photo: string
  }
  caseType: string
  status: string
  lastUpdate: string
}

interface ActiveCasesProps {
  cases: Case[]
}

const statusColors = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Pending Review': 'bg-yellow-100 text-yellow-700',
  'Waiting Payment': 'bg-orange-100 text-orange-700',
  'Completed': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700'
}

export default function ActiveCases({ cases }: ActiveCasesProps) {
  if (cases.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Active Cases</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-600 mb-4">
            No active cases yet. Start by finding a lawyer or asking the AI assistant.
          </p>
          <Link
            href="/lawyers"
            className="inline-block bg-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy/90 transition-colors"
          >
            Find a Lawyer
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Active Cases</h2>
        <Link
          href="/dashboard/cases"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Case ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lawyer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Case Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Update</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span className="font-mono text-sm font-semibold text-gray-900">
                    #{caseItem.id}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm">
                      {caseItem.lawyer.photo}
                    </div>
                    <span className="text-sm text-gray-900">{caseItem.lawyer.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{caseItem.caseType}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[caseItem.status as keyof typeof statusColors] ||
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {caseItem.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{caseItem.lastUpdate}</td>
                <td className="py-4 px-4">
                  {caseItem.status === 'Waiting Payment' ? (
                    <button className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                      <CreditCard size={14} />
                      Pay Now
                    </button>
                  ) : (
                    <Link
                      href={`/dashboard/cases/${caseItem.id}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-gray-900">
                #{caseItem.id}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  statusColors[caseItem.status as keyof typeof statusColors] ||
                  'bg-gray-100 text-gray-700'
                }`}
              >
                {caseItem.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {caseItem.lawyer.photo}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{caseItem.lawyer.name}</div>
                <div className="text-sm text-gray-600">{caseItem.caseType}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Last update: {caseItem.lastUpdate}</div>
            {caseItem.status === 'Waiting Payment' ? (
              <button className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                <CreditCard size={16} />
                Pay Now
              </button>
            ) : (
              <Link
                href={`/dashboard/cases/${caseItem.id}`}
                className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                <Eye size={16} />
                View Case
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

