'use client'

import { Check, Star, Download, Calendar, DollarSign, FileText, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

interface Conversation {
  id: string
  lawyer: {
    id: string
    name: string
    title: string
    avatar: string
    status: 'online' | 'away' | 'offline'
    verified: boolean
  }
  caseId?: string
}

interface CaseDetailsSidebarProps {
  conversation: Conversation
}

const mockDocuments = [
  { name: 'Property_Deed.pdf', date: 'Nov 1, 2024', size: '2.3 MB' },
  { name: 'Contract_Agreement.pdf', date: 'Nov 1, 2024', size: '1.8 MB' },
  { name: 'Court_Notice.docx', date: 'Oct 30, 2024', size: '456 KB' }
]

const milestones = [
  { status: 'completed', label: 'Consultation requested', date: 'Nov 1' },
  { status: 'completed', label: 'Lawyer accepted', date: 'Nov 1' },
  { status: 'completed', label: 'Payment processed', date: 'Nov 2' },
  { status: 'current', label: 'In review', date: 'Current' },
  { status: 'pending', label: 'Case resolution', date: 'Pending' }
]

export default function CaseDetailsSidebar({ conversation }: CaseDetailsSidebarProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Lawyer Profile Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4">
            {conversation.lawyer.avatar}
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{conversation.lawyer.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{conversation.lawyer.title}</p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
            ))}
            <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
            <span className="text-xs text-gray-500">(248)</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {conversation.lawyer.verified && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                ✓ Verified
              </span>
            )}
            <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-semibold rounded">
              ⭐ Top Rated
            </span>
          </div>
          <Link
            href={`/lawyers/${conversation.lawyer.id}`}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm"
          >
            View Full Profile
          </Link>
        </div>
      </div>

      {/* Case Information */}
      {conversation.caseId && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Case Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Case ID:</span>
              <span className="font-semibold text-gray-900 ml-2">#{conversation.caseId}</span>
            </div>
            <div>
              <span className="text-gray-600">Case type:</span>
              <span className="font-semibold text-gray-900 ml-2">Family Law</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                In Progress
              </span>
            </div>
            <div>
              <span className="text-gray-600">Submitted:</span>
              <span className="font-semibold text-gray-900 ml-2">Nov 1, 2024</span>
            </div>
            <div>
              <span className="text-gray-600">Last updated:</span>
              <span className="font-semibold text-gray-900 ml-2">2 hours ago</span>
            </div>
            <Link
              href={`/dashboard/cases/${conversation.caseId}`}
              className="block w-full text-center px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-4"
            >
              View Full Case
            </Link>
          </div>
        </div>
      )}

      {/* Consultation Details */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Consultation Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Budget:</span>
            <span className="font-semibold text-gray-900">5,000 ETB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Payment status:</span>
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              <Check size={16} />
              Paid
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Consultation type:</span>
            <span className="font-semibold text-gray-900">Hourly</span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-600">Hours used:</span>
              <span className="font-semibold text-gray-900">2.5 / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
          <a href="#" className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3">
            View Invoice
          </a>
        </div>
      </div>

      {/* Attached Documents */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Shared Files</h3>
          <span className="text-xs text-gray-500">({mockDocuments.length})</span>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {mockDocuments.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
              <FileText className="text-gray-400" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Download className="text-gray-600" size={16} />
              </button>
            </div>
          ))}
        </div>
        <a href="#" className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3">
          View All Files
        </a>
      </div>

      {/* Case Milestones */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Case Milestones</h3>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pl-6">
              {index < milestones.length - 1 && (
                <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
              )}
              <div className="flex items-start gap-3">
                <div className={`relative z-10 flex-shrink-0 w-4 h-4 rounded-full ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-300'
                } flex items-center justify-center`}>
                  {milestone.status === 'completed' && (
                    <Check className="text-white" size={10} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{milestone.label}</p>
                  <p className="text-xs text-gray-500">{milestone.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors text-sm">
            Update Case Status
          </button>
          <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors text-sm">
            Request Document
          </button>
          <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors text-sm">
            Schedule Meeting
          </button>
          <button className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm">
            End Consultation
          </button>
        </div>
      </div>

      {/* Safety & Support */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-700">Report an issue</a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-700">Contact support</a>
          <a href="#" className="block text-sm text-blue-600 hover:text-blue-700">View guidelines</a>
        </div>
      </div>

      {/* Privacy Reminder */}
      <div className="text-center p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          🔒 Messages are encrypted and secure
        </p>
      </div>
    </div>
  )
}

