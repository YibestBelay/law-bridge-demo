'use client'

import { useState } from 'react'

export default function Notifications() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [quietHours, setQuietHours] = useState(false)

  const emailSettings = [
    { label: 'New case responses from lawyers', checked: true },
    { label: 'Messages from lawyers', checked: true },
    { label: 'Case status updates', checked: true },
    { label: 'Payment confirmations', checked: true },
    { label: 'Platform news and updates', checked: true },
    { label: 'Marketing and promotions', checked: false },
    { label: 'Security alerts', checked: true }
  ]

  const pushSettings = [
    { label: 'New messages (instant)', checked: true },
    { label: 'Case updates', checked: true },
    { label: 'Payment reminders', checked: true },
    { label: 'Daily summary', checked: false }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Notification Preferences</h1>
        <p className="text-gray-600">Choose how you want to be notified</p>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {emailEnabled && (
            <div className="space-y-2">
              {emailSettings.map((setting, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={setting.checked}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{setting.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Push Notifications</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 mb-4">Enable notifications in your browser settings</p>
          {pushEnabled && (
            <div className="space-y-2">
              {pushSettings.map((setting, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={setting.checked}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{setting.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">SMS Notifications</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 mb-4">Standard SMS rates may apply</p>
          {smsEnabled && (
            <div className="space-y-2 opacity-50">
              <label className="flex items-center gap-2 cursor-not-allowed">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-gray-500">Urgent case updates</span>
              </label>
              <label className="flex items-center gap-2 cursor-not-allowed">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-gray-500">Appointment reminders</span>
              </label>
              <label className="flex items-center gap-2 cursor-not-allowed">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span className="text-gray-500">Payment alerts</span>
              </label>
            </div>
          )}
        </div>

        {/* Email Digest Frequency */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Digest Frequency</h2>
          <div className="space-y-2">
            {[
              'Real-time (as they happen)',
              'Daily digest (once per day)',
              'Weekly digest (every Monday)',
              'Monthly summary'
            ].map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  defaultChecked={index === 0}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Do Not Disturb</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={quietHours}
                onChange={(e) => setQuietHours(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {quietHours && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input type="time" defaultValue="22:00" className="px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input type="time" defaultValue="08:00" className="px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">You'll still receive urgent security alerts</p>
            </div>
          )}
        </div>

        {/* Test Notification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Test Notification</h2>
          <p className="text-sm text-gray-600 mb-4">Send a sample notification to verify your settings</p>
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400">
            Test Notification
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Reset to Defaults
          </a>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Save Notification Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

