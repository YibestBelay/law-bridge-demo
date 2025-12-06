'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Eye, MessageSquare } from 'lucide-react'

interface Case {
  id: string
  client: string
  caseType: string
  status: string
  deadline: string
  hasDeadline: boolean
}

interface ActiveCasesTableProps {
  cases: Case[]
}

const statusFilters = ['All', 'In Progress', 'Pending', 'Awaiting Payment']

const statusColors = {
  'Document Review': 'bg-blue-100 text-blue-700',
  'Awaiting Client': 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-green-100 text-green-700',
  'Court Prep': 'bg-purple-100 text-purple-700',
  'Pending': 'bg-gray-100 text-gray-700'
}

export default function ActiveCasesTable({ cases }: ActiveCasesTableProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  if (cases.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Active Cases</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-600">
            Ready for new cases? Make sure your profile is complete.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">Active Cases</h2>
        <Link
          href="/lawyer-dashboard/cases"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          Manage All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Case ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Case Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
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
                <td className="py-4 px-4 text-sm text-gray-900">{caseItem.client}</td>
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
                <td className="py-4 px-4 text-sm text-gray-600">
                  {caseItem.hasDeadline ? (
                    <span className={caseItem.deadline.includes('day') ? 'text-orange-600 font-medium' : ''}>
                      {caseItem.deadline}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {caseItem.status === 'Awaiting Client' ? (
                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      <MessageSquare size={14} />
                      Message
                    </button>
                  ) : (
                    <Link
                      href={`/lawyer-dashboard/cases/${caseItem.id}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye size={14} />
                      {caseItem.status === 'Document Review' ? 'Update' : 'View'}
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
            <div>
              <div className="font-semibold text-gray-900">{caseItem.client}</div>
              <div className="text-sm text-gray-600">{caseItem.caseType}</div>
            </div>
            {caseItem.hasDeadline && (
              <div className="text-sm text-gray-600">
                Deadline: <span className="font-medium text-orange-600">{caseItem.deadline}</span>
              </div>
            )}
            {caseItem.status === 'Awaiting Client' ? (
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                <MessageSquare size={16} />
                Message Client
              </button>
            ) : (
              <Link
                href={`/lawyer-dashboard/cases/${caseItem.id}`}
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

