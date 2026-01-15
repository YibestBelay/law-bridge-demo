'use client'

import { useState } from 'react'

export default function LanguageRegion() {
  const [autoDetectTimezone, setAutoDetectTimezone] = useState(true)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Language & Region</h1>
        <p className="text-gray-600">Customize your language and regional preferences</p>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Display Language
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>🇪🇹 አማርኛ (Amharic)</option>
            <option>🇬🇧 English</option>
            <option>🇬🇧 English (US)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Some content may not be available in all languages</p>
        </div>

        {/* Time Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Time Zone
          </label>
          <select
            disabled={autoDetectTimezone}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option>(GMT+3:00) East Africa Time - Addis Ababa</option>
          </select>
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoDetectTimezone}
              onChange={(e) => setAutoDetectTimezone(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Automatically detect time zone</span>
          </label>
        </div>

        {/* Date Format */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Date Format</h2>
          <div className="space-y-2">
            {[
              { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY (04/11/2024)' },
              { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY (11/04/2024)' },
              { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD (2024-11-04)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateFormat"
                  value={option.value}
                  defaultChecked={option.value === 'dd/mm/yyyy'}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Format */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Time Format</h2>
          <div className="space-y-2">
            {[
              { value: '12', label: '12-hour (3:30 PM)' },
              { value: '24', label: '24-hour (15:30)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timeFormat"
                  value={option.value}
                  defaultChecked={option.value === '12'}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Currency */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Preferred Currency Display
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>ETB (Ethiopian Birr)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Payments are processed in ETB</p>
        </div>

        {/* Number Format */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Number Format</h2>
          <div className="space-y-2">
            {[
              { value: 'international', label: '1,234.56 (International)' },
              { value: 'european', label: '1.234,56 (European)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="numberFormat"
                  value={option.value}
                  defaultChecked={option.value === 'international'}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Save Regional Settings
          </button>
        </div>
      </div>
    </div>
  )
}

