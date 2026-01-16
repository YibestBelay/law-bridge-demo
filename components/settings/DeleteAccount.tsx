'use client'

import { useState } from 'react'
import { AlertTriangle, Download, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function DeleteAccount() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [understood, setUnderstood] = useState(false)
  const [password, setPassword] = useState('')
  const [reason, setReason] = useState('')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Delete Account</h1>
        <p className="text-gray-600">Permanently delete your account and all data</p>
      </div>

      {/* Warning Card */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-lg font-bold text-red-900 mb-3">Deleting your account is permanent</h2>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• All your personal information will be deleted</li>
              <li>• Active cases will be cancelled</li>
              <li>• Chat history will be removed</li>
              <li>• You will lose access to all services</li>
              <li>• This action cannot be undone</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Before You Go */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Before You Go</h2>
        <p className="text-sm text-gray-600 mb-4">Consider these alternatives:</p>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
            <span className="text-2xl">⏸️</span>
            <div>
              <p className="font-semibold text-gray-900">Deactivate temporarily</p>
              <p className="text-sm text-gray-600">Take a break without losing your data</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
            <Download className="text-gray-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Download your data first</p>
              <p className="text-sm text-gray-600">Get a copy of all your information</p>
            </div>
          </button>
          <Link
            href="/dashboard/support"
            className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
          >
            <MessageCircle className="text-gray-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Contact support for issues</p>
              <p className="text-sm text-gray-600">We're here to help resolve any problems</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Delete Process */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Delete Process</h2>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="text-gray-700">I understand this action is permanent</span>
          </label>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Why are you leaving? (optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a reason</option>
              <option>Found another service</option>
              <option>Too expensive</option>
              <option>Privacy concerns</option>
              <option>Not useful</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Additional feedback (optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us more about your experience..."
            />
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={!understood}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <AlertTriangle className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-navy mb-2 text-center">Are you absolutely sure?</h3>
            <p className="text-gray-600 mb-6 text-center">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Enter your password to confirm
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Your password"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={!password}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

